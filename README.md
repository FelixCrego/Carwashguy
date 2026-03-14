# Generic Multi-Client Detailing Template

This repository is a **client-neutral website template**. Business/location/theme values are now defined in `site-config.js` and `area-config.js`, then consumed by `template-config.js`.

## What was made generic

- Local `assets/` media was removed from source control.
- Runtime mapping now supports placeholders for:
  - business name and legal name
  - phone and email
  - city/state/region and metro references
  - service-area and blog-location mentions
  - logo and image URLs

## Setup for each new customer

1. Open `site-config.js` and `area-config.js`.
2. Replace all `{{...}}` placeholder values with the customer values.
3. Keep `template-config.js` replacement keys as-is (left side) and only customize values (right side).
4. Configure all required image/logo URLs in `site-config.js` branding fields and `template-config.js` media asset mappings.
5. Optionally set default image/logo values for unmapped media.
6. Deploy.

## Notes

- All pages load `site-config.js`, `area-config.js`, `template-config.js`, and `template-engine.js`.
- The template engine applies replacements in:
  - document title and metadata
  - visible text nodes
  - HTML attributes (`href`, `alt`, etc.)
  - image `src` values that previously pointed to `assets/*`
- `assets/.gitkeep` is intentional so the folder exists but contains no client media.
