from functools import lru_cache
import os
import asyncio
import glob


from sqlalchemy.sql import select

from field.model import sm, sm_autocommit, FieldPartitionUpdate


@lru_cache(maxsize=128)
def get_files(path):
    print("Listing files in", path)
    files = glob.glob(path + "/*")
    return files


async def main():
    db = sm()
    db_update = sm_autocommit()
    partitions = await db.stream_scalars(
        select(FieldPartitionUpdate).filter(FieldPartitionUpdate.has_file == False)  # noqa: E712
    )

    async for partition in partitions.yield_per(1024 * 10):
        # update the object's db session
        partition = await db_update.merge(partition, load=False)

        # list all files in the directory
        download_dir = os.path.join(
            f"/mnt/data/field/px_{partition.partition_x}_py_{partition.partition_y}",
            str(partition.subredditId),
            partition.kind,
            str(partition.challengeNumber),
        )

        download_path = os.path.join(
            download_dir,
            str(partition.sequenceNumber),
        )
        files_list = get_files(download_dir)

        # check if the file is in the list
        if download_path in files_list:
            partition.has_file = True
        else:
            print("Did not find file for ", partition.url)


if __name__ == "__main__":
    asyncio.run(main())
