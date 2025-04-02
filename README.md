# field-2025 @ nepeat
Various scripts, slurpers, and consumers to data mine and archive the state of Reddit's April Fools 2025 Field game.

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