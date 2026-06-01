# Last.fm top-tracks setup (one time)

The "music" column on the About page shows your top 5 tracks from the last
~4 weeks. A daily GitHub Action (`.github/workflows/update-top-tracks.yml`)
runs `scripts/update_top_tracks.py`, which calls Last.fm's `user.getTopTracks`
(`period=1month`), writes `data/v2/top-tracks.json`, and commits it — Vercel
then auto-redeploys. The display itself is unchanged.

Last.fm is used instead of the Spotify API because Spotify's `me/top/tracks`
endpoint requires the account owner to have **Premium**. Last.fm's read API
needs only an API key — no OAuth, no Premium.

You only need to do the steps below once.

## 1. Scrobble Spotify to Last.fm

1. Create a free account at <https://www.last.fm/join> (note your **username**).
2. Connect Spotify so your plays scrobble automatically:
   Last.fm → **Settings → Applications → Spotify → Connect**
   (<https://www.last.fm/settings/applications>).

> It takes a little listening history before `1month` has 5 tracks. Until then
> the seeded `top-tracks.json` stays in place.

## 2. Get a Last.fm API key

1. Go to <https://www.last.fm/api/account/create> and create an API account
   (any app name/description is fine; callback URL can be blank).
2. Copy the **API key** it gives you.

## 3. Add one GitHub repo secret

Repo → **Settings → Secrets and variables → Actions → New repository secret**:

| Secret name      | Value                                   |
| ---------------- | --------------------------------------- |
| `LASTFM_API_KEY` | your Last.fm API key (the key ONLY)     |

The username isn't sensitive, so it's hardcoded in the workflow
(`LASTFM_USER: timothyou`) rather than stored as a secret. If your username
changes, edit that line in `.github/workflows/update-top-tracks.yml`. Locally,
the script still reads `LASTFM_USER` from the environment.

## 4. Test it

- **Locally:**
  ```bash
  python3 -m venv .venv && source .venv/bin/activate
  pip install -r scripts/requirements.txt
  LASTFM_API_KEY=your_key LASTFM_USER=your_username \
    python scripts/update_top_tracks.py
  ```
  It should print your top 5 and update `data/v2/top-tracks.json`.
- **In CI:** repo → **Actions → "Update top tracks" → Run workflow**. After this
  it runs automatically every day (committing only when the list changes).

## Notes

- On any failure the script exits without writing, so the last good list stays
  and no commit is made.
- To change the cadence, edit the `cron` line in the workflow.
- `period` is `1month` (~4 weeks). Other options: `7day`, `3month`, `6month`,
  `12month`, `overall`.
