import json
from collections import defaultdict
from field import connections


redis = connections.new_redis()

msgcount = redis.xlen("field:stream")
print(f"in redis: {msgcount}")


type_count = defaultdict(lambda: 0)
for message_id, message in redis.xrange("field:stream"):
    message = json.loads(message["message"])
    payload = message["subscribe"]

    message_type = payload["data"]["payload"]["msg"]["type"]
    type_count[message_type] += 1

for key, value in type_count.items():
    print(f"{key}: {value}")