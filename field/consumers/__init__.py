from field import connections


class ConsumerBase:
    def __init__(self):
        self.redis = connections.new_async_redis()

    async def main(self):
        raise NotImplementedError
