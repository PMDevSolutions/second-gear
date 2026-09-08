# Second Gear

Prototype storefront and service site for a fictional used e-bike shop, built as a UI/UX assessment. See [DECISIONS.md](./DECISIONS.md) for the design rationale.

## Run it

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000.

- `/` home
- `/bikes` inventory with filters
- `/bikes/<slug>` bike detail
- `/services` repairs and maintenance
- `/contact` adaptive contact form
- `/admin` owner inventory concept (no login, saves to this browser)

## Stack

Next.js 16, React 19, TypeScript, Tailwind CSS 4. No backend; inventory is a typed seed module plus a `localStorage` overlay so admin edits show up on the public pages in the same browser.

## Notes

Photos are placeholder artwork and all bike data is sample data. The shop, its address, phone number and prices are fictional.
