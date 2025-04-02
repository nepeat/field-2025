# field-2025 @ nepeat
Various scripts, slurpers, and consumers to data mine and archive the state of Reddit's April Fools 2025 Field game.

## misc jobs
- `watch -n 14400 python util/get_tokenv2.py` - Needed to refresh the tokenv2 to hit the GQL endpoints
- `watch -n 1 python util/stats.py` - Helpful to keep track of the MQ topics
- `python field/consumers/grid.py` - Grid consumer is not yet in Docker due to odd CephFS deps on my end
- `docker compose logs -f --tail=500` - Keep an eye on the pods

## re docs

## partitions (p) + deltas (d)
- URL example https://webview.devvit.net/a1/field-app/px_0__py_0/t5_2rbc9/p/24/10
    - https://webview.devvit.net (static prefix)
    - ${pathPrefix} ("platform/a1/field-app", client strips "platform" prefix)
    - px_{partitionXY.x}_py_{partitionXY.y} (x + y)
    - ${subredditId}
    - "d" if kind == "deltas" else "p"
    - ${challengeNumber}
    - ${sequenceNumber}