import asyncio

from field import connections


class ConsumerBase:
    def __init__(self):
        self.redis = connections.new_async_redis()

    async def main(self):
        raise NotImplementedError


class GridConsumer(ConsumerBase):
    async def main(self):
        last_marker = self.redis.get("consumer:grid:last_marker")
        if last_marker is None:
            last_marker = "0-0"

        # iterate through the redis stream
        while True:
            # get the next 100 messages
            messages = self.redis.xread({"field:stream": last_marker}, count=100)
            if len(messages) == 0:
                break

            # process the messages
            for message_id, message in messages[0][1]:
                # do something with the message
                print(message)
                # save the marker
                last_marker = message_id
                # await self.redis.set("consumer:grid:last_marker", last_marker)


if __name__ == "__main__":
    consumer = GridConsumer()
    asyncio.run(consumer.main())
