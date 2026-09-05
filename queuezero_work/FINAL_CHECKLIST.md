# QueueZero — Vercel + Supabase college-demo checklist

## Before deployment

- [ ] Create a Supabase project.
- [ ] Run `supabase-schema.sql` once in Supabase SQL Editor.
- [ ] Put the project in GitHub.
- [ ] Do not commit `.env`, `.env.local`, or Supabase secret keys.

## Vercel

- [ ] Import the GitHub repository into Vercel.
- [ ] Framework: Next.js.
- [ ] Build command: `npm run build`.
- [ ] Add `SUPABASE_URL`.
- [ ] Add `SUPABASE_SECRET_KEY`.
- [ ] Redeploy after environment variables are present.

## Functional test

- [ ] Register a new account.
- [ ] Login.
- [ ] Select a city.
- [ ] Select a store.
- [ ] Search/filter products.
- [ ] Add products to cart.
- [ ] Increase/decrease/remove cart items.
- [ ] Select pickup and delivery modes.
- [ ] Start a demo payment.
- [ ] Complete a demo payment.
- [ ] Verify the order is created.
- [ ] Verify inventory decreases.
- [ ] Verify order history.
- [ ] Logout.
- [ ] Login again and verify the account still works.
- [ ] Open `/api/health` and confirm it responds.
