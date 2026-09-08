import Link from "next/link";
import { Logo } from "./Logo";

export const SHOP = {
  name: "Second Gear",
  street: "3200 O'Donnell St",
  city: "Baltimore, MD 21224",
  phone: "(410) 555-0142",
  email: "hello@secondgear.example",
  hours: [
    ["Tue to Fri", "10am to 6pm"],
    ["Saturday", "9am to 4pm"],
    ["Sun and Mon", "Closed"],
  ],
};

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-sand-2">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Logo /> {SHOP.name}
          </div>
          <p className="mt-3 max-w-md text-sm text-ink-2">
            Inspected used e-bikes with honest battery numbers, and a repair bench that works on every brand. Canton, Baltimore.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-2">Visit</h2>
          <address className="mt-2 text-sm not-italic leading-6">
            {SHOP.street}
            <br />
            {SHOP.city}
            <br />
            <a href={`tel:${SHOP.phone.replace(/\D/g, "")}`} className="underline">
              {SHOP.phone}
            </a>
            <br />
            <a href={`mailto:${SHOP.email}`} className="underline">
              {SHOP.email}
            </a>
          </address>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-2">Hours</h2>
          <dl className="mt-2 text-sm leading-6">
            {SHOP.hours.map(([d, h]) => (
              <div key={d} className="flex justify-between gap-4">
                <dt>{d}</dt>
                <dd className="text-ink-2">{h}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-ink-2">
          <span>Fictional shop built as a design exercise. Prices and specs are sample data.</span>
          <Link href="/admin" className="underline">
            Owner login
          </Link>
        </div>
      </div>
    </footer>
  );
}
