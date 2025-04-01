import json
import asyncio
import requests
import os.path

from field import connections
from field.fields import ALL_FIELDS, Field


class ConsumerBase:
    def __init__(self):
        self.redis = connections.new_async_redis()

    async def main(self):
        raise NotImplementedError


class GridConsumer(ConsumerBase):
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

        result = f"https://webview.devvit.net/a1/field-app/px_0__py_0/{field.subreddit_id}/{kind_short}/{challenge_number}/{sequence_number}"

        return result

    async def download_grid(
        self,
        field: Field,
        challenge_number: int,
        sequence_number: int,
        kind: str,
    ):
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

        url = self.get_url(field, challenge_number, sequence_number, kind)
        print(f"Downloading {url} to {download_path}")
        with open(download_path, "wb") as f:
            resp = requests.get(url)
            resp.raise_for_status()
            f.write(resp.content)

    async def main(self):
        last_marker = await self.redis.get("consumer:grid:last_marker")
        if last_marker is None:
            last_marker = "0-0"

        # iterate through the redis stream
        while True:
            # get the next 100 messages
            messages = await self.redis.xread({"field:stream": last_marker}, count=100)
            if len(messages) == 0:
                break

            # process the messages
            for message_id, message in messages[0][1]:
                field = ALL_FIELDS[message["field"]]
                payload_wrapper = json.loads(message["message"])["subscribe"]
                payload = payload_wrapper["data"]["payload"]
                msg_type = payload["msg"]["type"]
                if msg_type != "PartitionUpdate":
                    continue

                partition_msg = payload["msg"]["key"]
                sequence_number = partition_msg["sequenceNumber"]
                challenge_number = partition_msg["challengeNumber"]
                kind = partition_msg["kind"]
                await self.download_grid(
                    field,
                    challenge_number,
                    sequence_number,
                    kind,
                )
                # save the marker
                last_marker = message_id
                # await self.redis.set("consumer:grid:last_marker", last_marker)


if __name__ == "__main__":
    consumer = GridConsumer()
    asyncio.run(consumer.main())
