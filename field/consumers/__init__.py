import signal
import asyncio
from typing import List, Tuple
from field import connections

import redis


class ConsumerBase:
    def __init__(self):
        self.redis = connections.new_async_redis()
        self.consumer_name = ""
        self.running = True

        self.queue = asyncio.Queue(maxsize=10)
        self.tasks: List[asyncio.Task] = []

    def _signal_handler(self, signum, frame):
        print(f"Received signal {signum}, shutting down...")
        self.running = False

    async def ensure_group_exists(self):
        if not self.consumer_name:
            raise ValueError("Consumer name is not defined for consumer.")

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

    async def get_consumer_group(self, count: int = 15) -> Tuple[str, List[dict]]:
        if not self.consumer_name:
            raise ValueError("Consumer name is not defined for consumer.")

        # try to get pending messages first
        redis_messages = await self.redis.xreadgroup(
            self.consumer_name,
            self.consumer_name + ":0",
            {"field:stream": "0"},
            count=5,
        )

        if not redis_messages[0][1]:
            # try to get messages from xpending too
            redis_messages = await self.redis.xreadgroup(
                self.consumer_name,
                self.consumer_name + ":0",
                {"field:stream": ">"},
                count=count,
            )

        # HACK: Return empty list if no messages
        if not redis_messages:
            return "field:stream", []

        return redis_messages[0]

    async def run(self):
        raise NotImplementedError

    async def main(self):
        # Register signal handlers
        signal.signal(signal.SIGINT, self._signal_handler)
        signal.signal(signal.SIGTERM, self._signal_handler)

        try:
            await self.run()
        except Exception as e:
            print(f"Error in consumer: {e}")
            self.running = False
            raise

        print("Waiting for own tasks to complete.")
        await asyncio.gather(*self.tasks)
