## YouTube Clone (Next.js + Tailwind)

A modern YouTube-like app built with Next.js App Router, Tailwind CSS, SSR, dark mode, search, categories, and mock data. Includes streaming proxy and downloadable MP4 samples (ads-free). YouTube videos are embedded via the IFrame API (no download for YouTube sources).

### Features
- Responsive UI with Tailwind
- Home: categories, search, trending list, load-more (infinite) client section
- Watch page: embedded player (YouTube IFrame or MP4 via proxy), metadata, related, download (MP4 only)
- API routes: `/api/stream`, `/api/download`, `/api/videos` (pagination)
- Dark mode toggle
- SSR pages (App Router)

### Getting Started
1. Install deps:
```bash
npm i # or pnpm i or yarn
```
2. Run dev:
```bash
npm run dev
```
3. Open `http://localhost:3000`

### Notes
- MP4 items are streamed via `/api/stream` to avoid CORS issues and support range requests for seeking.
- Only MP4 items are downloadable. Respect platform terms for other sources.
- Update `data/videos.json` to add or modify entries.

### YouTube API (optional, for real-time data)
Set an API key to enable Trending and YouTube-powered search:
```bash
# powershell
$env:NEXT_PUBLIC_YOUTUBE_API_KEY = "your-api-key"
npm run dev
```
Or add `YOUTUBE_API_KEY` in your environment.


