from field.connections import new_redis

import httpx

redis = new_redis()

# there has to be a better way to get this cookie that isn't extracting it from the browser
# however since this is an april fools project, this is not worth the effort
reddit_token = redis.get("cookie:reddit_session")
if not reddit_token:
    raise Exception("cookie:reddit_token is not set")

session = httpx.Client(
    headers={
        "User-Agent": "u/nepeat field2025 tokenv2getter",
    },
)
resp = session.get(
    "https://www.reddit.com/",
    cookies={
        "reddit_session": reddit_token,
    },
)

print("status code", resp.status_code)
print(resp.cookies)
tokenv2 = resp.cookies["token_v2"]
if not tokenv2:
    raise Exception("did not get tokenv2")

redis.set("cookie:tokenv2", tokenv2)
