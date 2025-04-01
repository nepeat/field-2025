import json
import asyncio

from field import connections
from field.fields import ALL_FIELDS, Field


class ConsumerBase:
    def __init__(self):
        self.redis = connections.new_async_redis()

    async def main(self):
        raise NotImplementedError


class GridConsumer(ConsumerBase):
    def get_url(self, field: Field, challenge_number: int, sequence_number: int):
        result = f"https://webview.devvit.net/a1/field-app/px_0__py_0/{field.subreddit_id}/p/{challenge_number}/45620"

        return result

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
                url = self.get_url(field, challenge_number, sequence_number)
                print(url)
                # save the marker
                last_marker = message_id
                # await self.redis.set("consumer:grid:last_marker", last_marker)


if __name__ == "__main__":
    consumer = GridConsumer()
    asyncio.run(consumer.main())
