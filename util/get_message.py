import json
from field import connections


redis = connections.new_redis()

# get message count
seen = set()

# message iteration
for message_id, redis_message in redis.xrange("field:stream"):
    message = json.loads(redis_message["message"])
    payload = message["subscribe"]

    # stat counting
    message_type = payload["data"]["payload"]["msg"]["type"]
    if message_type in seen:
        continue

    # print
    print(redis_message["message"])
    seen.add(message_type)
