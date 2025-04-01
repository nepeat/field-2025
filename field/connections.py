import os
from redis import Redis
from redis.asyncio import Redis as AsyncRedis


def new_redis() -> Redis:
    return Redis(
        host=os.environ.get("REDIS_HOST", "localhost"),
        port=int(os.environ.get("REDIS_PORT", "6379")),
        db=int(os.environ.get("REDIS_DB", "0")),
        password=os.environ.get("REDIS_PASSWORD", None),
        decode_responses=True,  # type: ignore
    )


def new_async_redis() -> AsyncRedis:
    return AsyncRedis(
        host=os.environ.get("REDIS_HOST", "localhost"),
        port=int(os.environ.get("REDIS_PORT", "6379")),
        db=int(os.environ.get("REDIS_DB", "0")),
        password=os.environ.get("REDIS_PASSWORD", None),
        decode_responses=True,  # type: ignore
    )
