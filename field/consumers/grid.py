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
    def __init__(self):
        super().__init__()

        self.consumer_name = "consumer:grid"

        # setup http client
        transport = httpx.AsyncHTTPTransport(
            retries=5,
            http2=True,
        )
        self.http = httpx.AsyncClient(
            transport=transport,
            http2=True,
        )

        # hold only 1000 urls
        self.urls_seen = LRU(1000)

    def get_url(
        self,
        field: Field,
        partition_x: int,
        partition_y: int,
        challenge_number: int,
        sequence_number: int,
        kind: str,
    ):
        if kind == "deltas":
            kind_short = "d"
        else:
            kind_short = "p"

        result = f"{DEVVIT_BASE}/a1/field-app/px_{partition_x}__py_{partition_y}/{field.subreddit_id}/{kind_short}/{challenge_number}/{sequence_number}"

        return result

    async def download_grid(
        self,
        field: Field,
        partition_x: int,
        partition_y: int,
        challenge_number: int,
        sequence_number: int,
        kind: str,
        message_id: str,
    ):
        url = self.get_url(
            field,
            partition_x,
            partition_y,
            challenge_number,
            sequence_number,
            kind,
        )
        if url in self.urls_seen and self.urls_seen[url]:
            await self.redis.xack("field:stream", self.consumer_name, message_id)
            return
        self.urls_seen[url] = True

        download_dir = os.path.join(
            f"/mnt/data/field/px_{partition_x}_py_{partition_y}",
            str(field.subreddit_id),
            kind,
            str(challenge_number),
        )
        os.makedirs(download_dir, exist_ok=True)

        download_path = os.path.join(
            download_dir,
            str(sequence_number),
        )

        print(f"Downloading {url} to {download_path}")
        resp = await self.http.get(url)
        # we can retry again in the pending queue
        if resp.status_code in [503]:
            print(f"Got {resp.status_code} for {url}, retrying later")
            self.urls_seen[url] = False
            return
        resp.raise_for_status()

        async with aiofiles.open(download_path, "wb") as f:
            await f.write(resp.content)

        # ack & flag
        await self.redis.xack("field:stream", self.consumer_name, message_id)

    async def processor(self):
        while self.running or not self.queue.empty():
            data_tuple = await self.queue.get()
            message_id: str = data_tuple[0]
            message: dict = data_tuple[1]

            field = ALL_FIELDS[message["field"]]
            payload_wrapper = json.loads(message["message"])["subscribe"]
            payload = payload_wrapper["data"]["payload"]
            msg_type = payload["msg"]["type"]
            if msg_type != "PartitionUpdate":
                await self.redis.xack("field:stream", self.consumer_name, message_id)
                continue

            partition_msg = payload["msg"]["key"]
            sequence_number = partition_msg["sequenceNumber"]
            challenge_number = partition_msg["challengeNumber"]
            kind = partition_msg["kind"]

            partition_xy = partition_msg["partitionXY"]
            partition_x = partition_xy["x"]
            partition_y = partition_xy["y"]

            await self.download_grid(
                field,
                partition_x,
                partition_y,
                challenge_number,
                sequence_number,
                kind,
                message_id,
            )

        if not self.running:
            self.queue.shutdown()

    async def run(self):
        await self.ensure_group_exists()

        # iterate through the redis stream
        tasks = []
        for x in range(0, 4):
            tasks.append(asyncio.create_task(self.processor()))

        while self.running:
            stream_name, messages = await self.get_consumer_group(
                count=15,
            )

            if not messages:
                print("No messages, sleeping")
                await asyncio.sleep(1)
                continue

            for message_id, message in messages:
                await self.queue.put((message_id, message))


if __name__ == "__main__":
    consumer = GridConsumer()
    asyncio.run(consumer.main())
