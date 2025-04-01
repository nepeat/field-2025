import redis
import json
import asyncio

from field.consumers import ConsumerBase


class CounterConsumer(ConsumerBase):
    CONSUMER_NAME = "consumer:counter"

    async def action_message(self, message_id: str, message):
        payload_wrapper = json.loads(message["message"])["subscribe"]
        payload = payload_wrapper["data"]["payload"]
        msg_type = payload["msg"]["type"]
        await self.redis.hincrby("field:message_counter", msg_type, 1)
        await self.redis.xack("field:stream", self.CONSUMER_NAME, message_id)

    async def main(self):
        # Create a consumer group
        try:
            await self.redis.xgroup_create(
                "field:stream",
                self.CONSUMER_NAME,
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
                    count=10,
                )

            if not redis_messages or not redis_messages[0][1]:
                print("No messages, sleeping")
                await asyncio.sleep(1)
                continue

            # process the messages
            stream_name, messages = redis_messages[0]

            for message_id, message in messages:
                tasks.append(self.action_message(message_id, message))

            await asyncio.gather(*tasks)
            tasks.clear()


if __name__ == "__main__":
    consumer = CounterConsumer()
    asyncio.run(consumer.main())
