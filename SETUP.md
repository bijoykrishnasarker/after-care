# Aftercare — Stripe, Webhook, Email, Portal Setup

## 1. Create `.env.local`

Copy from `.env.example` and fill in values:

```env
APP_URL=http://localhost:3000
AUTH_SECRET=use-a-long-random-string-here

MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB_NAME=aftercare

STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

RESEND_API_KEY=re_...
EMAIL_FROM=Aftercare <onboarding@resend.dev>
```

Get Stripe test keys: https://dashboard.stripe.com/test/apikeys

## 1b. MongoDB Atlas

1. Create a free cluster: https://www.mongodb.com/atlas
2. Database Access → create a user + password
3. Network Access → allow your IP (or `0.0.0.0/0` for dev)
4. Connect → Drivers → copy the connection string
5. Add to `.env.local`:

```env
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB_NAME=aftercare
```

Paid portal access is stored in the `access_grants` collection.

If `MONGODB_URI` is missing in development, access grants are kept in memory until the server restarts.

## 2. Start the app

```powershell
cd "d:\After Care\after-care"
npm run dev
```

Open: http://localhost:3000

## 3. Start Stripe webhook listener (new terminal)

Install Stripe CLI: https://stripe.com/docs/stripe-cli

```powershell
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the `whsec_...` secret into `.env.local` as `STRIPE_WEBHOOK_SECRET`, then restart `npm run dev`.

## 4. Test payment

1. Go to http://localhost:3000/checkout
2. Email: your real email (for portal access)
3. Test card: `4242 4242 4242 4242`
4. Expiry: any future date, CVC: `123`
5. Complete purchase

## 5. What happens after pay

1. Stripe sends webhook → access saved
2. Email sent with portal magic link (or logged in terminal if no Resend key)
3. Thank-you page → Enter Portal
4. Portal → 7 rooms → audio player

## 5b. Lead magnet funnel

- Page: http://localhost:3000/lead-magnet
- Email capture → welcome email with PDF link
- Place PDF at `public/downloads/aftercare-guide.pdf`

## 5c. Email nurture (production)

Set `CRON_SECRET` in Vercel env. Daily cron hits:

`/api/cron/email-nurture`

Sends follow-up emails on day 2 and day 5 after lead signup.

## 5d. Analytics & pixels

Add to `.env.local` when client provides IDs:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=1234567890
NEXT_PUBLIC_TIKTOK_PIXEL_ID=XXXXXXXX
```

## 6. Portal login without email link

Go to http://localhost:3000/portal and enter the same checkout email.

**Local demo (no payment):** In development, any email works on `/portal`. You can also set `PORTAL_DEMO_ACCESS=true` in `.env.local`. Set `PORTAL_DEMO_ACCESS=false` before production deploy.

## 7. Audio files

Add room audio files under `public/audio/{roomSlug}/` (see `public/audio/README.md`):

```
public/audio/collapse/01.mp3
public/audio/withdrawal/01.mp3
public/audio/ghost/01.mp3
public/audio/mirror/01.mp3
public/audio/frequency/01.mp3
public/audio/exit/01.mp3
public/audio/arrival/01.mp3
```

Then register them in `src/lib/room-tracks.ts`.

## 8. Decline test

Use card `4000 0000 0000 0002` to test failed payment.
