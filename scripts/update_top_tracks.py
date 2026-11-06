#!/usr/bin/env python3
"""Fetch my top 5 Last.fm tracks (last 7 days) and publish them to Vercel Blob.

Last.fm scrobbles your Spotify plays, and its read API needs only an API key
(no OAuth, no Premium). Run daily by .github/workflows/update-top-tracks.yml.
Last.fm failures never upload. An upload timeout can have an uncertain outcome.

Required env vars (GitHub Actions secrets):
    LASTFM_API_KEY   your Last.fm API key
    LASTFM_USER      your Last.fm username
    BLOB_READ_WRITE_TOKEN  a Vercel Blob read-write token

Output: public Blob at music/top-tracks.json
"""
import json
import os
import sys

import requests
from vercel.blob import sync as blob

API_URL = "https://ws.audioscrobbler.com/2.0/"
PERIOD = "7day"
LIMIT = 5
OUTPUT_PATH = "music/top-tracks.json"
CACHE_CONTROL_MAX_AGE = 300


def main() -> int:
    api_key = os.environ.get("LASTFM_API_KEY")
    user = os.environ.get("LASTFM_USER")
    blob_token = os.environ.get("BLOB_READ_WRITE_TOKEN")
    if not (api_key and user and blob_token):
        print(
            "ERROR: LASTFM_API_KEY, LASTFM_USER, and BLOB_READ_WRITE_TOKEN must all be set.",
            file=sys.stderr,
        )
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

    if not isinstance(data, dict):
        raise ValueError("Invalid response")
    if "error" in data:
        print("ERROR: Last.fm API error; "
              "leaving Blob unchanged.", file=sys.stderr)
        return 1

    toptracks = data.get("toptracks")
    if not isinstance(toptracks, dict):
        raise ValueError("Invalid toptracks")
    items = toptracks.get("track")
    if not isinstance(items, list) or not items:
        print("ERROR: Last.fm returned no tracks; leaving Blob unchanged.", file=sys.stderr)
        return 1

    tracks = [
        {
            "name": t["name"],
            "artist": t["artist"]["name"],
        }
        for t in items[:LIMIT]
    ]

    if not isinstance(items, list) or any(
        not isinstance(value, str) or not value.strip()
        for track in tracks for value in track.values()
    ):
        raise ValueError("Invalid track data")
    tracks = [{key: value.strip() for key, value in track.items()} for track in tracks]

    payload = json.dumps(tracks, indent=2, ensure_ascii=False).encode("utf-8")
    uploaded = blob.put_blob(
        OUTPUT_PATH,
        payload,
        access="public",
        content_type="application/json; charset=utf-8",
        allow_overwrite=True,
        cache_control_max_age=CACHE_CONTROL_MAX_AGE,
    )
    print(f"Published {len(tracks)} tracks to {uploaded.url}")
    for t in tracks:
        print(f"  - {t['name']} - {t['artist']}")
    return 0


def run() -> int:
    try:
        return main()
    except Exception:
        print("ERROR: Music refresh failed. If upload began, verify the stored object before retrying.", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(run())
