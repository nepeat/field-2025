import signal
import asyncio
from typing import List, Tuple
from field import connections, model

import redis


class ConsumerBase:
    def __init__(self, consumer_id: int = 0):
        self.redis = connections.new_async_redis()
        self.db = model.sm()

        self.consumer_name = ""
        self.running = True

        self.queue = asyncio.Queue(maxsize=64)
        self.tasks: List[asyncio.Task] = []

        self._consumer_id: int = consumer_id

    def _signal_handler(self, signum, frame):
        print(f"Received signal {signum}, shutting down...")
        self.running = False

    @property
    def consumer_id(self):
        return f"{self.consumer_name}:{self._consumer_id}"

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

        # get the latest messages first
        redis_messages = await self.redis.xreadgroup(
            self.consumer_name,
            self.consumer_id,
            {"field:stream": ">"},
            count=count,
        )

        # try to get pending messages next
        if not redis_messages or not redis_messages[0][1]:
            redis_messages = await self.redis.xreadgroup(
                self.consumer_name,
                self.consumer_id,
                {"field:stream": "0"},
                count=count,
            )

        # HACK: Return empty list if no messages
        if not redis_messages or not redis_messages[0][1]:
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
