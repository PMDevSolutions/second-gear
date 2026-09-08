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

All bike data is sample data. The shop, its address, phone number and prices are fictional. Listing photos are Unsplash stock chosen to match each listing's type and color; they are not photos of the exact models named.

## Photo credits

All photos are used under the [Unsplash License](https://unsplash.com/license).

| File | Photographer | Source |
|---|---|---|
| `kXP41LVdcv0.jpg` | KBO Bike | https://unsplash.com/photos/kXP41LVdcv0 |
| `msIweXufPUs.jpg` | KBO Bike | https://unsplash.com/photos/msIweXufPUs |
| `GWWYRsZhC0o.jpg` | KBO Bike | https://unsplash.com/photos/GWWYRsZhC0o |
| `bPmQguvBMLs.jpg` | KBO Bike | https://unsplash.com/photos/bPmQguvBMLs |
| `6s20Vsn5gSY.jpg` | KBO Bike | https://unsplash.com/photos/6s20Vsn5gSY |
| `jf5DYcgW02c.jpg` | Velotric Ebike | https://unsplash.com/photos/jf5DYcgW02c |
| `qZ1KmFjfQq8.jpg` | Geo Chierchia | https://unsplash.com/photos/qZ1KmFjfQq8 |
| `9AFUBP9kIUU.jpg` | KBO Bike | https://unsplash.com/photos/9AFUBP9kIUU |
| `tEW5Ytb11ss.jpg` | KBO Bike | https://unsplash.com/photos/tEW5Ytb11ss |
| `7cU_P3tkMBw.jpg` | Tom Ru | https://unsplash.com/photos/7cU_P3tkMBw |
| `wSoO8iNYtoU.jpg` | Sven Brandsma | https://unsplash.com/photos/wSoO8iNYtoU |
| `pFBJVWy6Mlg.jpg` | Jørgen Larsen | https://unsplash.com/photos/pFBJVWy6Mlg |
| `nfBUBGOhhuM.jpg` | Himiway Bikes | https://unsplash.com/photos/nfBUBGOhhuM |
| `9VDYrR191qg.jpg` | Haberdoedas | https://unsplash.com/photos/9VDYrR191qg |
| `B2_ZKX46890.jpg` | Haberdoedas | https://unsplash.com/photos/B2_ZKX46890 |
| `jvNc-dwIISg.jpg` | Himiway Bikes | https://unsplash.com/photos/jvNc-dwIISg |
| `Go4eeazV3LE.jpg` | Himiway Bikes | https://unsplash.com/photos/Go4eeazV3LE |
| `jyoTLVMv9So.jpg` | Julian Hochgesang | https://unsplash.com/photos/jyoTLVMv9So |
| `T0eAoLwZB88.jpg` | James Hoey | https://unsplash.com/photos/T0eAoLwZB88 |
| `v-LAxH7JSzI.jpg` | camera obscura | https://unsplash.com/photos/v-LAxH7JSzI |
