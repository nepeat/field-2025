import redis
import aiofiles
import json
import asyncio
import httpx
import os.path
from lru import LRU


from field.constants import DEVVIT_BASE
from field.consumers import ConsumerBase
from field.fields import ALL_FIELDS, Field


class GridConsumer(ConsumerBase):
    CONSUMER_NAME = "consumer:grid"

    def __init__(self):
        super().__init__()

        transport = httpx.AsyncHTTPTransport(
            retries=5,
            http2=True,
        )
        self.http = httpx.AsyncClient(
            transport=transport,
            http2=True,
        )

        # hold only 10000 urls
        self.urls_seen = LRU(10000)

    def get_url(
        self,
        field: Field,
        challenge_number: int,
        sequence_number: int,
        kind: str,
    ):
        if kind == "deltas":
            kind_short = "d"
        else:
            kind_short = "p"

        result = f"{DEVVIT_BASE}/a1/field-app/px_0__py_0/{field.subreddit_id}/{kind_short}/{challenge_number}/{sequence_number}"

        return result

    async def download_grid(
        self,
        field: Field,
        challenge_number: int,
        sequence_number: int,
        kind: str,
        message_id: str,
    ):
        url = self.get_url(field, challenge_number, sequence_number, kind)
        if url in self.urls_seen:
            await self.redis.xack("field:stream", "consumer:grid", message_id)
            return
        self.urls_seen[url] = True

        download_dir = os.path.join(
            "/mnt/data/field",
            str(field.subreddit_id),
            str(challenge_number),
        )
        os.makedirs(download_dir, exist_ok=True)

        download_path = os.path.join(
            download_dir,
            str(sequence_number),
        )

        print(f"Downloading {url} to {download_path}")
        resp = await self.http.get(url)
        resp.raise_for_status()

        async with aiofiles.open(download_path, "wb") as f:
            await f.write(resp.content)

        await self.redis.xack("field:stream", "consumer:grid", message_id)

    async def main(self):
        # Create a consumer group
        try:
            await self.redis.xgroup_create(
                "field:stream",
                "consumer:grid",
                "0",
                mkstream=False,
            )
        except redis.exceptions.ResponseError as e:
            if e.args[0] != "BUSYGROUP Consumer Group name already exists":
                raise e

        # iterate through the redis stream
        tasks = []

        while True:
            # try to get pending messages first
            redis_messages = await self.redis.xreadgroup(
                self.CONSUMER_NAME,
                self.CONSUMER_NAME + ":0",
                {"field:stream": "0"},
                count=5,
            )

            # try get 5 unclaimed messages for the group
            if not redis_messages[0][1]:
                redis_messages = await self.redis.xreadgroup(
                    self.CONSUMER_NAME,
                    self.CONSUMER_NAME + ":0",
                    {"field:stream": ">"},
                    count=5,
                )

            if not redis_messages[0][1]:
                print("No messages, sleeping")
                await asyncio.sleep(1)
                continue

            # process the messages
            stream_name, messages = redis_messages[0]

            for message_id, message in messages:
                field = ALL_FIELDS[message["field"]]
                payload_wrapper = json.loads(message["message"])["subscribe"]
                payload = payload_wrapper["data"]["payload"]
                msg_type = payload["msg"]["type"]
                if msg_type != "PartitionUpdate":
                    await self.redis.xack("field:stream", "consumer:grid", message_id)
                    continue

                partition_msg = payload["msg"]["key"]
                sequence_number = partition_msg["sequenceNumber"]
                challenge_number = partition_msg["challengeNumber"]
                kind = partition_msg["kind"]
                tasks.append(
                    self.download_grid(
                        field,
                        challenge_number,
                        sequence_number,
                        kind,
                        message_id,
                    )
                )

            await asyncio.gather(*tasks)
            tasks.clear()


if __name__ == "__main__":
    consumer = GridConsumer()
    asyncio.run(consumer.main())
