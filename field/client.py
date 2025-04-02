import sys
import time
import json
import asyncio
import logging
import os
from gql import gql, Client
from gql.transport.websockets import WebsocketsTransport
from gql.transport.websockets import log as websockets_logger

from field import connections
from field.constants import MAX_MESSAGES
from field.fields import ALL_FIELDS

if "DEBUG" in os.environ:
    logging.basicConfig(level=logging.DEBUG)
else:
    logging.basicConfig(level=logging.INFO)
    websockets_logger.setLevel(logging.WARNING)


def get_token() -> str:
    redis = connections.new_redis()
    redis_token = redis.get("cookie:tokenv2")
    if redis_token:
        return redis_token

    # TODO: how do get reddit token
    with open("token.txt", "r") as f:
        return f.read().strip()


SUBSCRIBE_QUERY = gql("""
subscription SubscribeSubscription($input: SubscribeInput!) {
    subscribe(input: $input) {
    id
    ... on BasicMessage {
        data {
        ... on DevPlatformAppMessageData {
            payload
        }
        }
    }
    }
}""")


class FieldClient:
    def __init__(self):
        self.transport = WebsocketsTransport(
            url="wss://gql-realtime.reddit.com/query",
            headers={
                "Origin": "https://www.reddit.com",
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
            },
            init_payload={
                "Authorization": f"Bearer {get_token()}",
            },
        )

        self.redis = connections.new_async_redis()

    async def main(self, current_field: str):
        if current_field not in ALL_FIELDS:
            raise ValueError(f"Unknown field: {current_field}")
        field = ALL_FIELDS[current_field]

        variables = {
            "input": {
                "channel": {
                    "teamOwner": "DEV_PLATFORM",
                    "category": "DEV_PLATFORM_APP_EVENTS",
                    "tag": f"field-app:{field.socket_id}:channel",
                }
            }
        }

        async with Client(
            transport=self.transport,
            fetch_schema_from_transport=False,
        ) as client:
            async for result in client.subscribe(
                SUBSCRIBE_QUERY, variable_values=variables
            ):
                redis_payload = {
                    "message": json.dumps(result),
                    "field": current_field,
                    "ts": str(time.time()),
                }

                await self.redis.xadd(
                    "field:stream",
                    redis_payload,
                    maxlen=MAX_MESSAGES,
                    approximate=True,
                )
                print(result)


if __name__ == "__main__":
    print("args", sys.argv)

    # arg1: field
    if len(sys.argv) > 1:
        current_field = sys.argv[1]
    else:
        current_field = "field"

    client = FieldClient()
    asyncio.run(client.main(current_field))
