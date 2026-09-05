# QueueZero — Real E-Commerce Flow

## Customer flow
1. `/login` — strict registration/login gate.
2. `/city` — strict city selection.
3. `/store` — strict store selection limited to that city.
4. `/` — store-specific bright e-commerce catalog.
5. `/cart` — dedicated cart review and quantity control.
6. `/payment/<sessionId>` — separate payment window.
7. Payment success — server commits order, reduces store stock, and generates a QR exit pass in the payment window.

## Important behavior
- Register once. Existing users can log in repeatedly.
- Duplicate email or phone registration is rejected server-side.
- City and store are stored in secure HTTP-only cookies and are cleared on login/logout.
- Product assortment is derived from store type; fashion stores do not expose supermarket products.
- Different stores get different deterministic assortments within their department.
- Customer-facing stock is only `N available`; replenishment state is backend-only.
- Cart quantity controls allow multiple units of the same SKU while never exceeding current store stock.
- Inventory is validated both when creating the payment session and again immediately before the order is committed.
- When an SKU reaches zero, the backend schedules automatic replenishment after the configured delay.
- No customer scan feature is exposed. The exit pass QR is for the store gate to validate.

## Local run
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

## Production note
The included backend uses a persistent JSON file for zero-setup local/demo operation. For real multi-user online production, move the same repositories/service logic to PostgreSQL (and a real cache/queue if needed) and replace the simulated payment action with a verified Razorpay/Stripe webhook flow.

## Vercel + Supabase (college demo)

The project is now prepared to use Supabase PostgreSQL for runtime data instead of the local JSON database. See `VERCEL_SUPABASE_DEPLOY.md` and `supabase-schema.sql`.
