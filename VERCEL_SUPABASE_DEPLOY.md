# QueueZero — Vercel + Supabase college deployment

This package keeps the QueueZero UI and API behavior and moves runtime persistence from `data/queuezero-db.json` to Supabase PostgreSQL.

## 1. Create Supabase project

Create a project at https://supabase.com/.

Open **SQL Editor** and run the complete contents of `supabase-schema.sql` once.

The app automatically initializes inventory rows from `lib/data.ts` the first time a store is opened, so there is no separate seed command.

## 2. Get Supabase credentials

In Supabase, open **Settings → API Keys** and copy:

- Project URL → `SUPABASE_URL`
- The server-side secret key (`sb_secret_...`) → `SUPABASE_SECRET_KEY`

Keep the secret key server-only. Do not prefix it with `NEXT_PUBLIC_` and do not commit it to GitHub.

Legacy projects can use `SUPABASE_SERVICE_ROLE_KEY` as a fallback.

## 3. Push this project to GitHub

Commit the project source. Do not commit `.env`, `.env.local`, or real Supabase keys.

## 4. Import the GitHub repository into Vercel

Choose **Add New → Project** in Vercel and import the repository.

Keep the framework as **Next.js**.

Build command:

```bash
npm run build
```

No Docker setup is required.

## 5. Add Vercel environment variables

Project → Settings → Environment Variables:

```text
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SECRET_KEY=sb_secret_...
```

Add them to the Production environment (and Preview too if you want preview deployments to work).

Redeploy after adding or changing environment variables.

## 6. Test the application

Test this sequence on the public Vercel URL:

1. Register
2. Login
3. Select city
4. Select store
5. Browse/search/filter products
6. Add, increase, decrease and remove cart items
7. Choose pickup or delivery
8. Start demo payment
9. Complete demo payment
10. Confirm order history
11. Confirm inventory decreases
12. Logout and login again
13. Open `/api/health`

## Payment note

The current QueueZero payment flow is a simulated/demo payment action. It does not charge real cards or UPI accounts, which is appropriate for a college project demonstration.


### If Vercel previously failed on TypeScript
This version includes the Supabase client typing fix and a local declaration for canvas-confetti so the production build can complete on Vercel.
