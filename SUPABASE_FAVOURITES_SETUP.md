# QueueZero favourites setup

The latest version stores customer favourites in Supabase so favourites belong to the signed-in account and are scoped to the selected store.

For an existing QueueZero Supabase database, open **Supabase → SQL Editor** and run `supabase-favorites-migration.sql` once.

For a fresh database, the same table is already included in `supabase-schema.sql`.

After that, deploy the application normally. The product-heart button saves/removes the favourite and the **Your Favourites** section on the store shopping page shows the saved products for that store.
