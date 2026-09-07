# QueueZero visual asset integration

This checkout includes the submitted, normalized visual assets under `public/assets/`.

## Asset counts
- 60 product masters: `public/assets/products/`
- 8 city images: `public/assets/cities/`
- 47 store logos: `public/assets/store-logos/`

## Code wiring
- `lib/data.ts` maps each product to `/assets/products/<product-id>.png`.
- Each city maps to its `/assets/cities/<city-id>.png` image.
- Each store maps to `/assets/store-logos/store-<store-number>.png`.
- Product cards and product detail modal render images using contain behavior.
- City and store selectors use fixed media boxes so images cannot displace text or controls.
- Store-product API responses preserve the product image instead of clearing it.

## Rendering contract
Keep responsive image containers dimensionally stable and render masters with `object-fit: contain` (or the platform equivalent). Do not switch these product/logo assets to `cover` when complete visibility is required.


Responsive sizing update: visual masters are tightly cropped to their visible content and the UI uses contain-style responsive boxes, so the same asset can expand into available space without stretching or clipping.
