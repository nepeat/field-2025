import redis
import json
import asyncio

from field.consumers import ConsumerBase


class CounterConsumer(ConsumerBase):
    def __init__(self):
        super().__init__()

        self.consumer_name = "consumer:counter"

    async def action_message(self, pipeline, message_id: str, message):
        payload_wrapper = json.loads(message["message"])["subscribe"]
        payload = payload_wrapper["data"]["payload"]
        msg_type = payload["msg"]["type"]
        await pipeline.hincrby("field:message_counter", msg_type, 1)
        await pipeline.xack("field:stream", self.consumer_name, message_id)

    async def main(self):
        # Reset the original consumer group and delete the counter
        await self.redis.delete("field:message_counter")
        await self.redis.xgroup_destroy("field:stream", self.consumer_name)

        # Create a consumer group
        try:
            await self.redis.xgroup_create(
                "field:stream",
                self.consumer_name,
                "0",
                mkstream=False,
            )
        except redis.exceptions.ResponseError as e:
            if e.args[0] != "BUSYGROUP Consumer Group name already exists":
                raise e

        # iterate through the redis stream
        tasks = []

        while True:
            pipe = self.redis.pipeline()
            stream_name, messages = await self.get_consumer_group(
                count=500,
            )

            if not messages:
                print("No messages, sleeping")
                await asyncio.sleep(1)
                continue

            for message_id, message in messages:
                tasks.append(self.action_message(pipe, message_id, message))

            await asyncio.gather(*tasks)
            await pipe.execute()
            tasks.clear()


if __name__ == "__main__":
    consumer = CounterConsumer()
    asyncio.run(consumer.main())
