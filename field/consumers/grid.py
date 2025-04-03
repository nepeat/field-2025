import aiofiles
import json
import asyncio
import httpx
import os.path
from lru import LRU

from aiolimiter import AsyncLimiter

from sqlalchemy.dialects.postgresql import insert

from field.consumers import ConsumerBase
from field.fields import ALL_FIELDS, Field
from field.model import FieldPartitionUpdate, sm_autocommit


class GridConsumer(ConsumerBase):
    def __init__(self, consumer_id: int):
        super().__init__(consumer_id)

        self.consumer_name = "consumer:grid"

        # setup http client
        transport = httpx.AsyncHTTPTransport(
            retries=5,
            http2=True,
        )
        self.http = httpx.AsyncClient(
            transport=transport,
            http2=True,
            headers={"User-Agent": "u/nepeat field2025 grid backfiller"},
        )

        # hold only 1000 urls
        self.urls_seen = LRU(1000)

        # limit to 10 qps
        self.fetch_limit = AsyncLimiter(30, 1)

        # set db to not require commits
        self.db = sm_autocommit()

    async def download_grid(
        self,
        field: Field,
        partition: FieldPartitionUpdate,
        message_id: str,
    ):
        url = partition.url
        if url in self.urls_seen and self.urls_seen[url]:
            await self.redis.xack("field:stream", self.consumer_name, message_id)
            return
        self.urls_seen[url] = True

        # make sure the download dir exists
        download_dir = os.path.join(
            f"/mnt/data/field/px_{partition.partition_x}_py_{partition.partition_y}",
            str(field.subreddit_id),
            partition.kind,
            str(partition.challengeNumber),
        )
        os.makedirs(download_dir, exist_ok=True)

        download_path = os.path.join(
            download_dir,
            str(partition.sequenceNumber),
        )

        # check if the file exists and is larger than 0 bytes
        try:
            # file_exists = os.path.getsize(download_path) > 0
            file_exists = False
        except FileNotFoundError:
            file_exists = False

        if not file_exists:
            print(f"Downloading {url} to {download_path}")
            await self.fetch_limit.acquire()
            resp = await self.http.get(url)
            # we can retry again in the pending queue
            if resp.status_code in [503]:
                print(f"Got {resp.status_code} for {url}, retrying later")
                self.urls_seen[url] = False
                return
            resp.raise_for_status()

            async with aiofiles.open(download_path, "wb") as f:
                await f.write(resp.content)
        else:
            print(f"Skipping download for {url} as it exists.")

        # save this to the DB
        partition.has_file = True
        statement = (
            insert(FieldPartitionUpdate)
            .values(partition.to_dict())
            .on_conflict_do_nothing()
        )
        await self.db.execute(statement)

        # ack & flag
        await self.redis.xack("field:stream", self.consumer_name, message_id)

    async def processor(self):
        while self.running or not self.queue.empty():
            data_tuple = await self.queue.get()
            message_id: str = data_tuple[0]
            message: dict = data_tuple[1]

            field = ALL_FIELDS[message["field"]]
            payload_wrapper = json.loads(message["message"])["subscribe"]
            payload = payload_wrapper["data"]["payload"]
            msg_type = payload["msg"]["type"]
            if msg_type != "PartitionUpdate":
                await self.redis.xack("field:stream", self.consumer_name, message_id)
                continue

            partition_msg = payload["msg"]["key"]
            partition = FieldPartitionUpdate.from_payload(partition_msg)

            await self.download_grid(
                field,
                partition,
                message_id,
            )

        if not self.running:
            self.queue.shutdown()

    async def run(self):
        await self.ensure_group_exists()

        # iterate through the redis stream
        tasks = []
        for x in range(0, 16):
            tasks.append(asyncio.create_task(self.processor()))

        while self.running:
            stream_name, messages = await self.get_consumer_group(
                count=64,
            )

            if not messages:
                print("No messages, sleeping")
                await asyncio.sleep(1)
                continue

            for message_id, message in messages:
                await self.queue.put((message_id, message))


if __name__ == "__main__":
    consumer_id = int(os.environ.get("CONSUMER_ID", "0"))

    consumer = GridConsumer(consumer_id)
    asyncio.run(consumer.main())
