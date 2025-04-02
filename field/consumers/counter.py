import orjson
import asyncio

from field.consumers import ConsumerBase


class CounterConsumer(ConsumerBase):
    def __init__(self):
        super().__init__()

        self.consumer_name = "consumer:counter"

    async def action_message(self, pipeline, message_id: str, message):
        payload_wrapper = orjson.loads(message["message"])["subscribe"]
        payload = payload_wrapper["data"]["payload"]
        msg_type = payload["msg"]["type"]
        await pipeline.hincrby("field:message_counter", msg_type, 1)
        await pipeline.xack("field:stream", self.consumer_name, message_id)

    async def run(self):
        # Reset the original consumer group and delete the counter
        await self.redis.delete("field:message_counter")
        await self.redis.xgroup_destroy("field:stream", self.consumer_name)

        # Create a consumer group
        await self.ensure_group_exists()

        # iterate through the redis stream
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
                await self.action_message(pipe, message_id, message)

            await pipe.execute()


if __name__ == "__main__":
    consumer = CounterConsumer()
    asyncio.run(consumer.main())
