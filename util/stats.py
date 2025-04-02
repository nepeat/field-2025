import json
from collections import defaultdict
from field.constants import MAX_MESSAGES
from field import connections


redis = connections.new_redis()

# set counters
type_count = defaultdict(lambda: 0)

# get message count
msgcount = redis.xlen("field:stream")

stats = {
    "message_types": redis.hgetall("field:message_counter"),
    "message_count": msgcount,
    "remaining_messages": MAX_MESSAGES - msgcount,
    "consumers": {},
}

# add consumer group info
for group in redis.xinfo_groups("field:stream"):
    cloned_group = group.copy()
    cloned_group.pop("name")
    stats["consumers"][group["name"]] = cloned_group

print(json.dumps(stats, indent=4))
