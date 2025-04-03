import datetime
import os
import asyncio

import logging

import aiofiles
import httpx
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import select, func


from field.model import sm, FieldPartitionUpdate


class FileFlushingHandler(logging.FileHandler):
    def emit(self, record):
        super().emit(record)
        self.flush()


log = logging.getLogger(__name__)
log.setLevel(logging.DEBUG)
log.addHandler(
    FileFlushingHandler(
        datetime.datetime.now().strftime("logs/003backfill_%Y-%m-%d_%H-%M-%S.log")
    )
)

transport = httpx.AsyncHTTPTransport(
    retries=5,
    http2=True,
)

http = httpx.AsyncClient(
    transport=transport,
    http2=True,
    headers={"User-Agent": "u/nepeat field2025 grid backfiller"},
)

queue = asyncio.Queue(maxsize=16)


class Ingestor:
    def __init__(
        self,
        db: AsyncSession,
        challenge_number: int,
        subreddit: str,
        x: int,
        y: int,
    ):
        self.db = db
        self.challenge_number = challenge_number
        self.subreddit = subreddit
        self.x = x
        self.y = y

    async def get_save(self, kind: str, index: int) -> bool:
        # create the new object
        new_update = FieldPartitionUpdate(
            partition_x=self.x,
            partition_y=self.y,
            subredditId=self.subreddit,
            kind=kind,
            challengeNumber=self.challenge_number,
            sequenceNumber=index,
            noChange=True,
            pathPrefix="platform/a1/field-app",
            has_file=False,
            is_backfill=True,
        )
        url = new_update.url

        # file paths
        download_dir = os.path.join(
            f"/mnt/data/field/px_{self.x}_py_{self.y}",
            str(self.subreddit),
            kind,
            str(self.challenge_number),
        )
        os.makedirs(download_dir, exist_ok=True)

        download_path = os.path.join(
            download_dir,
            str(index),
        )

        resp = await http.get(url)
        # we can retry again in the pending queue
        if resp.status_code == 200:
            pass
        elif resp.status_code in [503]:
            log.warning(f"Got {resp.status_code} for {url}, retrying")
            await asyncio.sleep(1)
            return False
        elif resp.status_code == 404:
            log.warning(f"Got {resp.status_code} for {url}, skipping")
            return False
        else:
            log.warning(
                f"Got unknown status code {resp.status_code} for {url}, skipping"
            )
            return False

        async with aiofiles.open(download_path, "wb") as f:
            await f.write(resp.content)
            new_update.has_file = True
            self.db.add(new_update)

        log.debug(
            f"backfilled sub={self.subreddit} challenge={self.challenge_number}, x={self.x}, y={self.y}, kind={kind}, index={index}"
        )
        return True

    async def ingest_partition(self, kind: str):
        sequences = list(
            await self.db.scalars(
                select(FieldPartitionUpdate.sequenceNumber)
                .filter(FieldPartitionUpdate.partition_x == self.x)
                .filter(FieldPartitionUpdate.partition_y == self.y)
                .filter(FieldPartitionUpdate.subredditId == self.subreddit)
                .filter(FieldPartitionUpdate.kind == kind)
                .filter(FieldPartitionUpdate.challengeNumber == self.challenge_number)
            )
        )

        # deltas start at 1, partitions at 10
        if kind == "deltas":
            incr_by = 1
        else:
            incr_by = 10

        index = incr_by

        # run the reqs in batches of X
        reqs = []
        while True:
            # ignore already saved sequences
            if index in sequences:
                index += incr_by
                continue

            reqs.append(self.get_save(kind, index))
            if len(reqs) > 15:
                results = await asyncio.gather(*reqs)
                reqs.clear()
                # if all results are false, break out
                if all(not result for result in results):
                    break

                await self.db.commit()

            index += incr_by


async def main():
    db = sm()
    db_update = sm()

    # Get list of unique subreddits first
    subreddits = list(
        await db.scalars(
            select(FieldPartitionUpdate.subredditId).distinct(
                FieldPartitionUpdate.subredditId
            )  # noqa: E712
        )
    )

    for subreddit in subreddits:
        x_max = await db.scalar(
            select(func.max(FieldPartitionUpdate.partition_x)).filter(
                FieldPartitionUpdate.subredditId == subreddit
            )
        )
        y_max = await db.scalar(
            select(func.max(FieldPartitionUpdate.partition_y)).filter(
                FieldPartitionUpdate.subredditId == subreddit
            )
        )
        if not x_max or not y_max:
            raise ValueError("No xy_max found for subreddit " + subreddit)

        challenges = list(
            await db.scalars(
                select(FieldPartitionUpdate.challengeNumber)
                .distinct(FieldPartitionUpdate.challengeNumber)
                .filter(FieldPartitionUpdate.subredditId == subreddit)
            )
        )
        min_challenge = min(challenges)
        max_challenge = max(challenges)

        log.info(subreddit)
        log.info(f"current challenges {min_challenge} - {max_challenge}")
        log.info(f"x 0 - {x_max}")
        log.info(f"y 0 - {y_max}")

        # test: try to get x0y0 scalar, if it exists we can keep going.
        for num_challenge in range(0, max_challenge + 1):
            test_update = FieldPartitionUpdate(
                partition_x=0,
                partition_y=0,
                subredditId=subreddit,
                kind="deltas",
                challengeNumber=num_challenge,
                sequenceNumber=1,
                noChange=True,
                pathPrefix="platform/a1/field-app",
                has_file=False,
            )
            res = await http.get(test_update.url)
            if res.status_code == 200:
                log.info(f"challenge {num_challenge} exists, we can keep going!")
            else:
                log.info(
                    f"challenge {num_challenge} does not exist, got {res.status_code}, skipping!"
                )
                continue

            for x in range(0, x_max + 1):
                for y in range(0, y_max + 1):
                    ingestor = Ingestor(
                        db_update,
                        num_challenge,
                        subreddit,
                        x,
                        y,
                    )
                    # await ingestor.ingest_partition("deltas")
                    await ingestor.ingest_partition("partition")

    await db.close()
    await db_update.close()


if __name__ == "__main__":
    asyncio.run(main())
