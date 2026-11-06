# Last.fm top-tracks setup (one time)

The "music" column on the About page shows your top five tracks from the last
seven days. A daily GitHub Action (`.github/workflows/update-top-tracks.yml`)
runs `scripts/update_top_tracks.py`, which calls Last.fm's `user.getTopTracks`
with `period=7day` and overwrites one small JSON file in a public Vercel Blob
store. It never commits to this repository, so regular music updates do not
trigger portfolio deployments. The committed `data/v2/top-tracks.json` remains
the display fallback if the Blob is unavailable.

Last.fm is used instead of the Spotify API because Spotify's `me/top/tracks`
endpoint requires the account owner to have Premium. Last.fm's read API needs
only an API key: no OAuth and no Premium.

## 1. Scrobble Spotify to Last.fm

1. Create a free account at <https://www.last.fm/join> and note the username.
2. Connect Spotify at <https://www.last.fm/settings/applications>.

Last.fm needs some listening history. An empty result preserves the previous
list; one to five valid tracks can be published.

## 2. Get a Last.fm API key

1. Go to <https://www.last.fm/api/account/create> and create an API account.
   Any app name and description are fine; the callback URL can be blank.
2. Copy the API key.

## 3. Create a public Vercel Blob store

In the Vercel project that hosts this portfolio, open **Storage**, choose
**Create Storage** > **Blob**, and make a **Public** store (for example,
`portfolio-music`). Public read access is appropriate because the file contains
only the same track names and artists shown on the public site. Do not use a
private store: the browser reads this JSON directly.

Creating a store connected to the project provides a `BLOB_READ_WRITE_TOKEN`.
Keep that token secret.

## 4. Add GitHub repository secrets

In the GitHub repository, open **Settings** > **Secrets and variables** >
**Actions** > **New repository secret**, then add:

| Secret name | Value |
| --- | --- |
| `LASTFM_API_KEY` | The Last.fm API key only |
| `BLOB_READ_WRITE_TOKEN` | The Vercel Blob read-write token |

The username is public, so it remains `LASTFM_USER: timothyou` in the workflow.
If it changes, update that workflow value.

## 5. Publish the first file and configure the site

1. In GitHub, open **Actions** > **Update top tracks** > **Run workflow**.
   On success, its log prints the public Blob URL ending in
   `music/top-tracks.json`.
2. In the Vercel project, add `NEXT_PUBLIC_MUSIC_DATA_URL` for the Production
   environment with that URL. This value is public; it must not be the
   read-write token.
3. Redeploy the current portfolio once so the browser bundle includes the URL.
   Later daily workflow runs update only the Blob and do not redeploy the site.

## 6. Test it locally

```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -r scripts/requirements.txt
LASTFM_API_KEY=your_key LASTFM_USER=your_username \
  BLOB_READ_WRITE_TOKEN=your_blob_token \
  python scripts/update_top_tracks.py
```

It prints the returned tracks and the public Blob URL. Do not run this against a
production store unless you intend to replace its current public list.

## Notes

- Last.fm errors or invalid tracks prevent uploads and preserve the last good
  list. If an upload response is lost, the write outcome can be uncertain;
  inspect the public object before retrying. No repository commit is made.
- Blob cache lifetime is five minutes, so an overwritten file may remain cached
  for up to five minutes. The About page fetches when opened; an already-open
  page needs a reload or navigation away and back to show newer tracks.
- To change cadence, edit the workflow `cron` line.
- `period` is `7day`. Other options are `1month`, `3month`, `6month`,
  `12month`, and `overall`.
