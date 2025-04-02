import asyncio

from field import model


async def main():
    async with model.engine.begin() as conn:
        await conn.run_sync(model.Base.metadata.create_all)


if __name__ == "__main__":
    asyncio.run(main())
