import datetime
import asyncio
import logging

import orjson

from sqlalchemy.dialects.postgresql import insert

from field import model
from field.consumers import ConsumerBase

log = logging.getLogger(__name__)


class DatabaseIngestConsumer(ConsumerBase):
    def __init__(self):
        super().__init__()

        self.consumer_name = "consumer:db_ingest"

    def get_reddit_id(self, message: dict):
        payload_wrapper = message["subscribe"]
        return payload_wrapper["id"]

    async def run(self):
        # Create a consumer group
        await self.ensure_group_exists()

        # iterate through the redis stream
        while self.running:
            stream_name, messages = await self.get_consumer_group(
                count=1024,
            )

            if not messages:
                log.info("No messages, sleeping")
                await asyncio.sleep(1)
                continue

            payloads = []
            acks = []

            log.info(f"Processing batch of {len(messages)} messages.")

            for message_id, message in messages:
                acks.append(message_id)
                decoded_message = orjson.loads(message["message"])
                message_kind = decoded_message["subscribe"]["data"]["payload"]["msg"][
                    "type"
                ]
                payloads.append(
                    {
                        "reddit_id": self.get_reddit_id(decoded_message),
                        "kind": message_kind,
                        "field": message["field"],
                        "timestamp": datetime.datetime.fromtimestamp(
                            float(message["ts"])
                        ),
                        "backend_message": decoded_message,
                    }
                )

            statement = insert(model.FieldMessage).values(payloads)
            statement = statement.on_conflict_do_nothing()

            await self.db.execute(statement)
            await self.db.commit()
            await self.redis.xack(stream_name, self.consumer_name, *acks)


if __name__ == "__main__":
    consumer = DatabaseIngestConsumer()
    asyncio.run(consumer.main())
