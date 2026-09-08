import type { Metadata } from "next";
import { Suspense } from "react";
import { SEED_BIKES } from "@/lib/bikes";
import { ContactForm } from "@/components/ContactForm";
import { SHOP } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact and test rides",
  description: "Book a test ride, ask about a bike, or book a repair. We reply during opening hours.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1fr_320px]">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Get in touch</h1>
        <p className="mt-2 max-w-xl text-ink-2">
          Test rides are free and take about twenty minutes. Bring ID, wear whatever you would normally ride in.
        </p>
        <div className="mt-6">
          <Suspense fallback={<div className="card p-6 text-sm text-ink-2">Loading form</div>}>
            <ContactForm bikes={SEED_BIKES} />
          </Suspense>
        </div>
      </div>
      <aside className="card h-fit p-5 text-sm">
        <h2 className="font-semibold">Or just come by</h2>
        <address className="mt-2 not-italic leading-6">
          {SHOP.street}
          <br />
          {SHOP.city}
          <br />
          <a href={`tel:${SHOP.phone.replace(/\D/g, "")}`} className="underline">
            {SHOP.phone}
          </a>
        </address>
        <dl className="mt-4 leading-6">
          {SHOP.hours.map(([d, h]) => (
            <div key={d} className="flex justify-between gap-4 border-t border-line py-1">
              <dt>{d}</dt>
              <dd className="text-ink-2">{h}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </div>
  );
}
