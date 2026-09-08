# Second Gear: design and build notes

A fictional used e-bike shop in Canton, Baltimore, built as a UI/UX assessment. Two connected parts: a storefront for the 5 to 30 bikes on the floor, and a small service site for repairs and maintenance. This document explains the decisions; the code is the proof.

Live prototype: https://pmdevsolutions.github.io/second-gear/
Repository: https://github.com/PMDevSolutions/second-gear

## The one-sentence brief I gave myself

Someone shopping for a used e-bike has three questions, in this order: will it fit me, how far will it really go, and can I trust that it is not about to die. Every layout decision below serves those three questions before anything else.

## Site structure

Five public pages and one owner page.

- **Home.** Not a brochure. It exists to route people: the newest six bikes for the browser, a repair price grid for the person whose bike is broken, and the shop's address and hours because a used bike shop is a physical place people need to find. One photo of someone actually riding sits beside the headline, and three short trust promises sit directly under it, because for a used-goods business the promises are the product.
- **Bikes for sale.** The core page. Filters on the left (type, frame size by rider height, budget, include sold), search and sort above the grid, cards in a three-column grid that collapses to one.
- **Bike detail.** Photos left, decision panel right, everything else below the fold. Detail is where the sale happens, so the two calls to action (book a test ride, ask a question) are visible without scrolling on every screen size.
- **Repairs and service.** Service list with starting prices, a four-step "how it works," find-us block, and a deliberate cross-link to the bikes for sale, because a big repair quote is often the moment someone decides to upgrade.
- **Contact.** One form that adapts to the reason for contact instead of five separate forms. The bike detail page passes the bike and the intent through the query string, so "Book a test ride" on the Trek lands on a form that already knows it is about the Trek.
- **Owner inventory (/admin).** Concept level: list, add, edit, remove, change status. See "Admin" below.

Navigation is three items plus one accent button. Bikes and repairs are the two businesses; contact is the one thing both need. The accent button is always "Book a test ride" because that is the highest-value action on the site and the one a shop would most want people to take.

## What is prominent and what stays secondary

Cards show exactly what someone needs to decide whether to click: brand and model, price, year, miles ridden, real-world range, frame size, and a condition badge. Category and status ride on the photo as small chips. Everything else waits for the detail page. I tried adding motor and battery capacity to the card and it made every card read like a spec sheet, so they went.

On the detail page the "at a glance" tiles answer the three questions from the brief: range as we measured it, battery health as a percentage of rated capacity, who the frame fits, and how far it has been ridden. Price and the calls to action are next to them. Motor, assist speed, color, and the full spec table are below the fold, along with the inspection checklist and what is included in the box.

Two things get more space than a typical listing because they are what makes buying used scary:

- **Battery health** is shown as a measured percentage everywhere, with the note "load-tested." A used e-bike is a used battery with a bike attached, and no competitor in this segment leads with the number.
- **What we checked** is a per-bike list, not a generic "fully inspected" badge. Specific beats reassuring.

Sold bikes stay visible behind an "include recently sold" filter with the card dimmed. Hiding them makes a small inventory look smaller and removes a useful price reference. Reserved bikes show an "On hold" badge and keep both calls to action, since a hold falls through often enough that being next in line is worth asking for.

## Frame size by height, not by letter

Nobody shopping used knows whether they are an M or an L. Every size filter and every size mention on the site pairs the letter with a rider height range, and the filter copy says "not sure, we size you in the shop." The cargo bike uses a single size and the listing text says so.

## UI/UX principles I leaned on

- **Progressive disclosure.** Card, then glance tiles, then full specs. Each layer answers one more question.
- **Consistent decision panel.** The price, the four tiles, and the two buttons sit in the same place on every bike so a shopper comparing three tabs is not hunting.
- **Honest empty states.** Zero results says stock turns over weekly and offers to watch for one, and links to the contact form with that intent preset. An empty state on a small inventory is a common outcome and should be a lead, not a dead end.
- **One primary action per screen.** Accent color is reserved for it. Secondary actions are outlined.
- **Trust in the copy.** Plain sentences, no exclamation points, wear called out in the listing summary. The voice is the shop owner talking, because it is a small shop.
- **Accessibility as default.** Skip link, visible focus rings, real form labels, `aria-pressed` on toggle filters, live region on the results count, keyboard-operable gallery thumbnails, colors checked for contrast, motion only under `motion-safe`.

## Mobile

Designed mobile first and then given room on desktop, because the person standing in a different shop comparing prices is on a phone.

- Filters collapse behind a single "Filters (n)" button with sort beside it. The count badge tells you filters are active even when the panel is closed.
- The detail page gets a fixed bottom bar with the bike name, the price, and the two calls to action. Scrolling through photos and specs never moves the decision out of reach. The bar disappears on sold bikes because there is nothing to act on.
- Cards go single column, tiles go two-up, spec tables stay as key-value rows rather than becoming a horizontal scroll.
- The header collapses to a menu that includes the test ride button, so the primary action is never hidden.
- Touch targets are 40px or larger. The photo thumbnails are the smallest and still clear that.

## Admin concept

The owner page is intentionally simple: a filterable list with inline status change, and one form for both add and edit. Status is a dropdown on the list row because "mark as sold" is the edit that happens most, and it should not require opening a form.

It is a concept, so there is no login and no server. But it is wired to the same in-browser store the public pages read from, so the full loop can be tried: add a bike in /admin, see it appear on the storefront, mark it sold, watch it dim. The store module is small on purpose; swapping `localStorage` for API calls is a one-file change and none of the components would notice.

The form asks for battery health and tested range as separate fields from battery size, because the whole site's trust story depends on the owner recording the measured numbers, and the form should make that the path of least resistance.

## Tech stack and why

Next.js 16 (App Router), TypeScript, Tailwind CSS 4. No component library and no animation library. The brief is about UI/UX judgment, so I wanted every visual decision to be one I made rather than one a library made for me. The site is a static export deployed to GitHub Pages by a GitHub Actions workflow on every push. Bike pages are prerendered from the seed data and hydrate a small client component for the gallery and the store overlay; bikes added through the owner page open in a client-rendered viewer instead, since a static host cannot mint new routes. Data is local JSON via a typed module; there is no mock API server because it would add moving parts without changing anything a user sees.

## Trade-offs and things I would do next

- **Photos are stock.** Every listing uses an Unsplash photo chosen to match the type and color of the bike, credited on the listing and in the README. They are not photos of the exact models named, and I renamed the sample listings to match what the photos show rather than the other way round. Nothing is AI-generated. A bike added through the owner page gets placeholder line art until there is an upload step.
- **Prices and specs are sample data.** Typical for the models named, but illustrative.
- **No map.** A static address and hours were enough for the prototype. A real build would embed a map on the service and contact pages.
- **Search is client-side substring matching.** Fine for 30 bikes, would need indexing at 300.
- **The contact form does not send.** It shows a success state and says so.
- **The browser overlay wins over the seed.** Once the owner page has saved anything, that copy is what the site shows in that browser, so a code change to the sample data will not appear until "Reset sample data" is pressed. Correct for a prototype, and exactly why real data belongs on a server.
- **Next:** real photo uploads in the admin form, a compare tray for two or three bikes, a "notify me" list keyed to type and size, and a trade-in estimate flow on the service page.
