import json
import asyncio
import logging
import os
from gql import gql, Client
from gql.transport.websockets import WebsocketsTransport

from field import connections

if 'DEBUG' in os.environ:
    logging.basicConfig(level=logging.DEBUG)
else:
    logging.basicConfig(level=logging.INFO)

def get_token() -> str:
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
            }
        )

        self.redis = connections.new_async_redis()

    async def main(self):
        variables = {
            "input": {
                "channel": {
                    "teamOwner": "DEV_PLATFORM",
                    "category": "DEV_PLATFORM_APP_EVENTS",
                    "tag": "field-app:d705e66b-39d3-4568-b08b-b11655c064c3:channel"
                }
            }
        }

        async with Client(
            transport=self.transport,
            fetch_schema_from_transport=False,
        ) as client:
            async for result in client.subscribe(SUBSCRIBE_QUERY, variable_values=variables):
                await self.redis.xadd(
                    "field:stream",
                    {"message": json.dumps(result)},
                    maxlen=10_000_000,
                    approximate=True,
                )
                print(result)

if __name__ == "__main__":
    client = FieldClient()
    asyncio.run(client.main())