from typing import List, Tuple
from field import connections

import redis


class ConsumerBase:
    def __init__(self):
        self.redis = connections.new_async_redis()
        self.consumer_name = ""
        self.running = True

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

    async def main(self):
        raise NotImplementedError
