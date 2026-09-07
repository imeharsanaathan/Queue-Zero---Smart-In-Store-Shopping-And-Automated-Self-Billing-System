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


## Requested-fix verification

- [x] Logo shows the Queue Zero company wordmark beside a bright Q + single lightning symbol, with the lightning pointed at both top and bottom.
- [x] Header category buttons change the live catalog filter and scroll to the store catalog.
- [x] Categories supported: All Categories, Best Sellers, Electronics, Groceries, Fashion, Home & Kitchen, Beauty, Toys & More.
- [x] Category results are limited to the selected store's actual assortment.
- [x] UPI panel looks like a realistic UPI QR scanner with scan frame, corner guides, scan line, merchant/amount details, and UPI app labels.
- [x] UPI scanner is demo-only: it does not require camera permission, real scanning, a UPI VPA, or a live payment gateway.
- [x] Profile → My orders navigates to `/orders`.
- [x] Orders page loads the signed-in customer's recent paid orders from `qz_orders`, newest first.
- [x] Order list shows order id, store, date/time, mode, paid status, line items, and total.
- [ ] Run `npm run typecheck` and `npm run build` before deployment (not runnable here because dependencies are not installed).

## Verification note
Requested-fix source checks passed for the modified logo, store category filtering, demo-only UPI scanner, and My Orders navigation/data query. Full Next.js typecheck/build was not executed because this archive does not contain installed `node_modules`.

- [x] Cart checkout heading is now "Cart checkout" only; the Quick delivery button/control was removed.
