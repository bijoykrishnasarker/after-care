# Aftercare

Premium emotional recovery product — landing, Stripe checkout, member portal with seven audio rooms.

## Stack

- Next.js 16 (App Router)
- TypeScript, Tailwind CSS v4
- Stripe, MongoDB, Resend

## Run locally

```powershell
cd after-care
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and fill in keys. See `SETUP.md` for Stripe webhook, MongoDB, and email.

## Routes

| Path | Purpose |
|------|---------|
| `/` | Landing |
| `/lead-magnet` | Free guide capture |
| `/checkout` | Purchase |
| `/portal` | Member login |
| `/portal/architecture` | Room hub |

## Audio assets

Drop MP3s in `public/audio/{room}/` and list them in `src/lib/room-tracks.ts`.

Lead magnet PDF: `public/downloads/aftercare-guide.pdf`

## Deploy

Vercel recommended. Set all env vars from `.env.example`, disable demo access in production (`PORTAL_DEMO_ACCESS=false`).
