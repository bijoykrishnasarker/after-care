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
stripe listen --forward-to localhost:3000/api/webhook/stripe
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

## 9. Stripe live (production)

Two API keys alone are **not enough**. You also need a **webhook signing secret**.

### Required env vars

| Variable | Where to get it |
|----------|-----------------|
| `STRIPE_SECRET_KEY` | Stripe → Developers → API keys → Secret key (`sk_live_...`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Same page → Publishable key (`pk_live_...`) |
| `STRIPE_WEBHOOK_SECRET` | Stripe → Developers → Webhooks → endpoint → Signing secret (`whsec_...`) |

### Create the webhook (Stripe Dashboard)

1. Go to https://dashboard.stripe.com/webhooks
2. **Add endpoint**
3. URL: `https://YOUR-DOMAIN.vercel.app/api/webhook/stripe`
4. Events: select **`payment_intent.succeeded`**
5. Copy the **Signing secret** → `STRIPE_WEBHOOK_SECRET` in Vercel and `.env.local`

Without the webhook, payments can succeed but **portal access email will not be granted**.

### Local webhook testing

```powershell
stripe listen --forward-to localhost:3000/api/webhook/stripe
```

Use the `whsec_...` from the CLI output in `.env.local` while testing locally.

### Check configuration

```text
GET /api/health/stripe
```

Returns `ok: true` when all three Stripe env vars are set.

### Vercel env vars (production)

Set these in Vercel → Project → Settings → Environment Variables:

```env
APP_URL=https://YOUR-DOMAIN.vercel.app
AUTH_SECRET=long-random-secret
MONGODB_URI=mongodb+srv://...
MONGODB_DB_NAME=aftercare
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
EMAIL_FROM=Aftercare <you@yourdomain.com>
CRON_SECRET=long-random-secret
PORTAL_DEMO_ACCESS=false
NEXT_PUBLIC_PORTAL_DEMO=false
```

Redeploy after saving env vars.

### Stripe account checklist

- [ ] Business details submitted (live payments enabled)
- [ ] Live API keys created
- [ ] Webhook endpoint added with `payment_intent.succeeded`
- [ ] Resend domain verified (for portal emails)
- [ ] MongoDB Atlas allows `0.0.0.0/0` (Vercel IPs)

Price charged at checkout: **$48.88 USD** (`4888` cents in `src/lib/checkout.ts`).

## 10. Decline test

Use card `4000 0000 0000 0002` to test failed payment.
