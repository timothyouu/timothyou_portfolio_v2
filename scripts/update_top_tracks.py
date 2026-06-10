#!/usr/bin/env python3
"""Fetch my top 5 Last.fm tracks (last 7 days) and write them to JSON.

Last.fm scrobbles your Spotify plays, and its read API needs only an API key
(no OAuth, no Premium). Run daily by .github/workflows/update-top-tracks.yml.
On ANY failure it exits non-zero WITHOUT touching the JSON, so the last good
list stays in place and the Action simply skips its commit.

Required env vars (GitHub Actions secrets):
    LASTFM_API_KEY   your Last.fm API key
    LASTFM_USER      your Last.fm username

Output: data/v2/top-tracks.json  ->  [{ "name": ..., "artist": ... }, ...]
"""
import json
import os
import sys
from pathlib import Path

import requests

API_URL = "https://ws.audioscrobbler.com/2.0/"
PERIOD = "7day"
LIMIT = 5
OUTPUT_PATH = Path(__file__).resolve().parent.parent / "data" / "v2" / "top-tracks.json"


def main() -> int:
    api_key = os.environ.get("LASTFM_API_KEY")
    user = os.environ.get("LASTFM_USER")
    if not (api_key and user):
        print("ERROR: LASTFM_API_KEY and LASTFM_USER must both be set.", file=sys.stderr)
        return 1

    resp = requests.get(
        API_URL,
        params={
            "method": "user.gettoptracks",
            "user": user,
            "period": PERIOD,
            "limit": LIMIT,
            "api_key": api_key,
            "format": "json",
        },
        timeout=30,
    )
    resp.raise_for_status()
    data = resp.json()

    if "error" in data:
        print(f"ERROR: Last.fm API error {data['error']}: {data.get('message')}; "
              "leaving JSON unchanged.", file=sys.stderr)
        return 1

    items = data.get("toptracks", {}).get("track", [])
    if not items:
        print("ERROR: Last.fm returned no tracks; leaving JSON unchanged.", file=sys.stderr)
        return 1

    tracks = [
        {
            "name": t["name"],
            "artist": t["artist"]["name"],
        }
        for t in items[:LIMIT]
    ]

    OUTPUT_PATH.write_text(
        json.dumps(tracks, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(f"Wrote {len(tracks)} tracks to {OUTPUT_PATH}")
    for t in tracks:
        print(f"  - {t['name']} — {t['artist']}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:  # noqa: BLE001 — keep last good list on any error
        print(f"ERROR: {exc}; leaving JSON unchanged.", file=sys.stderr)
        raise SystemExit(1)
