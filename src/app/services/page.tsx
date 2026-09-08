import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PHOTOS, photoSrc } from "@/lib/photos";
import { SHOP } from "@/components/Footer";

export const metadata: Metadata = {
  title: "E-bike repairs and maintenance",
  description: "Diagnostics, tune-ups, brakes, battery testing and motor work for every e-bike brand. Quote before we start, most jobs back in two days.",
};

const services = [
  { name: "Tune-up", price: "$89", body: "Shifting, brakes, wheel true, bolt torque check, firmware update where the brand allows it. Recommended every 1,000 miles." },
  { name: "Battery health test", price: "$45", body: "Load test with a written report of remaining capacity and realistic range. Free if you go on to buy a bike from us." },
  { name: "Brake service", price: "from $60", body: "Pads and bleed for hydraulic systems, cables and pads for mechanical. Rotors extra if needed." },
  { name: "Flat fix and tire swap", price: "from $25", body: "Tubes, tubeless conversion, or puncture-resistant tires. Hub motor wheels are no problem." },
  { name: "Motor and controller diagnostics", price: "$75 / hr", body: "Error codes, cut-outs, sensor faults, wiring. We tell you what is wrong and what it costs before any repair." },
  { name: "Full overhaul", price: "from $249", body: "Every bearing, cable, and consumable checked or replaced. For a bike you plan to keep another five years." },
];

const steps = [
  ["Drop off or book", "Walk in during opening hours or book a slot online. Tell us what the bike is doing."],
  ["We diagnose", "Usually same day. You get a written quote by text or email."],
  ["You approve", "Nothing gets replaced until you say yes. No surprise line items."],
  ["Pick up", "Most jobs are ready in two working days. Parts orders can add a few."],
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Repairs and maintenance</h1>
        <p className="mt-2 text-ink-2">
          We work on every e-bike brand, including the online-only ones. Diagnose first, quote second, repair only with your say-so.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href="/contact?topic=repair" className="btn btn-accent">
            Book a repair
          </Link>
          <a href={`tel:${SHOP.phone.replace(/\D/g, "")}`} className="btn btn-secondary">
            Call {SHOP.phone}
          </a>
        </div>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
        <Image src={photoSrc(PHOTOS.workshop.file)} alt={PHOTOS.workshop.alt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
      </div>
      </div>

      <section aria-labelledby="prices" className="mt-10">
        <h2 id="prices" className="text-xl font-semibold">
          Services and starting prices
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.name} className="card flex flex-col p-4">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-semibold">{s.name}</h3>
                <p className="shrink-0 font-semibold tabular-nums">{s.price}</p>
              </div>
              <p className="mt-2 text-sm text-ink-2">{s.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-ink-2">Prices are labor. Parts are quoted separately and always before we fit them.</p>
      </section>

      <section aria-labelledby="how" className="mt-12">
        <h2 id="how" className="text-xl font-semibold">
          How it works
        </h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-4">
          {steps.map(([t, b], i) => (
            <li key={t} className="card p-4">
              <p className="text-sm font-semibold text-forest-2">Step {i + 1}</p>
              <h3 className="mt-1 font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-ink-2">{b}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="visit" className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="card p-5">
          <h2 id="visit" className="text-xl font-semibold">
            Find us
          </h2>
          <address className="mt-2 not-italic leading-7">
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
          <dl className="mt-4 text-sm leading-6">
            {SHOP.hours.map(([d, h]) => (
              <div key={d} className="flex justify-between gap-4 border-t border-line py-1">
                <dt>{d}</dt>
                <dd className="text-ink-2">{h}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="card flex flex-col justify-between bg-forest p-5 text-white">
          <div>
            <h2 className="text-xl font-semibold">Thinking about a different bike?</h2>
            <p className="mt-2 text-sm text-moss">
              Sometimes a repair quote is the moment to upgrade. We take trade-ins against anything on the floor, and every bike we sell has
              been through this same bench.
            </p>
          </div>
          <Link href="/bikes" className="btn btn-accent mt-5 self-start">
            See bikes for sale
          </Link>
        </div>
      </section>
    </div>
  );
}
