import math
import json
from collections import defaultdict
from field.constants import MAX_MESSAGES
from field import connections


redis = connections.new_redis()

# set counters
type_count = defaultdict(lambda: 0)
total_bytes = 0

# get message count
msgcount = redis.xlen("field:stream")

# message iteration
for message_id, redis_message in redis.xrange("field:stream"):
    message = json.loads(redis_message["message"])
    payload = message["subscribe"]

    # stat counting
    message_type = payload["data"]["payload"]["msg"]["type"]
    type_count[message_type] += 1
    total_bytes += len(redis_message["message"])

stats = {
    "message_types": type_count,
    "message_count": msgcount,
    "remaining_messages": MAX_MESSAGES - msgcount,
    "message_avg_size": math.ceil(total_bytes / msgcount),
    "total_bytes": total_bytes,
}

print(json.dumps(stats, indent=4))
