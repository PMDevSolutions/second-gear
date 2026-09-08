"use client";

import Link from "next/link";
import { useState } from "react";
import type { Bike } from "@/lib/types";
import { RIDER_HEIGHT } from "@/lib/types";
import { useInventory } from "@/lib/store";
import { relatedBikes } from "@/lib/bikes";
import { formatMiles, formatPrice } from "@/lib/format";
import { BikePhoto } from "./BikePhoto";
import { BikeCard } from "./BikeCard";
import { ConditionBadge, StatusBadge } from "./Badges";

export function BikeDetail({ slug, seed }: { slug: string; seed: Bike[] }) {
  const { bikes, hydrated } = useInventory(seed);
  const bike = bikes.find((b) => b.slug === slug);
  const [photo, setPhoto] = useState(0);

  if (!bike) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold">{hydrated ? "That bike is no longer listed." : "Loading listing"}</h1>
        {hydrated && (
          <p className="mt-2 text-ink-2">
            It may have sold. <Link href="/bikes" className="underline">See what is in stock now.</Link>
          </p>
        )}
      </div>
    );
  }

  const sold = bike.status === "sold";
  const primary = [
    { label: "Real-world range", value: `~${bike.rangeMiles} mi`, note: "Measured on assist level 2" },
    { label: "Battery health", value: `${bike.batteryHealth}%`, note: `${bike.batteryWh} Wh pack, load-tested` },
    { label: "Fits riders", value: bike.riderFit ?? RIDER_HEIGHT[bike.frameSize], note: bike.riderFit ? "One-size frame" : `Size ${bike.frameSize} frame` },
    { label: "Ridden", value: formatMiles(bike.miles), note: `${bike.year} model` },
  ];
  const specs: [string, string][] = [
    ["Motor", bike.motor],
    ["Assist up to", `${bike.topAssistMph} mph`],
    ["Battery", `${bike.batteryWh} Wh, ${bike.batteryHealth}% of rated capacity`],
    ["Frame size", bike.riderFit ? `One size (${bike.riderFit})` : `${bike.frameSize} (${RIDER_HEIGHT[bike.frameSize]})`],
    ["Type", bike.category],
    ["Color", bike.color],
    ["Model year", String(bike.year)],
    ["Odometer", formatMiles(bike.miles)],
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 pb-28 md:pb-10">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-ink-2">
        <Link href="/bikes" className="underline">
          Bikes for sale
        </Link>{" "}
        / {bike.brand} {bike.model}
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <section aria-label="Photos">
          <div className="card relative aspect-[4/3] overflow-hidden">
            <BikePhoto bike={bike} index={photo} priority sizes="(min-width: 1024px) 640px, 100vw" />
          </div>
          {bike.photos.length > 1 && (
          <ul className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-7">
            {bike.photos.map((_, i) => (
              <li key={i}>
                <button
                  type="button"
                  aria-label={`Show photo ${i + 1}`}
                  aria-current={photo === i}
                  onClick={() => setPhoto(i)}
                  className={`relative block aspect-[4/3] w-full overflow-hidden rounded-lg border-2 ${photo === i ? "border-forest" : "border-transparent"}`}
                >
                  <BikePhoto bike={bike} index={i} sizes="120px" />
                </button>
              </li>
            ))}
          </ul>
          )}
          {bike.photos[0] && (
            <p className="mt-2 text-xs text-ink-2">
              Photo: {bike.photos[photo]?.credit ?? bike.photos[0].credit} via{" "}
              <a href={bike.photos[photo]?.source ?? bike.photos[0].source} className="underline" rel="noreferrer">
                Unsplash
              </a>
            </p>
          )}
        </section>

        <section aria-labelledby="bike-title">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={bike.status} />
            <ConditionBadge condition={bike.condition} />
            <span className="text-sm text-ink-2">{bike.category}</span>
          </div>
          <h1 id="bike-title" className="mt-2 text-3xl font-semibold tracking-tight">
            <span className="block text-base font-medium uppercase tracking-wide text-ink-2">{bike.brand}</span>
            {bike.model}
          </h1>
          <p className="mt-3 text-3xl font-semibold tabular-nums">{formatPrice(bike.price)}</p>
          <p className="mt-3 text-ink-2">{bike.summary}</p>

          <dl className="mt-6 grid grid-cols-2 gap-3">
            {primary.map((p) => (
              <div key={p.label} className="card p-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-ink-2">{p.label}</dt>
                <dd className="mt-1 text-lg font-semibold leading-tight">{p.value}</dd>
                <dd className="text-xs text-ink-2">{p.note}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 hidden gap-2 md:flex">
            {sold ? (
              <Link href="/bikes" className="btn btn-primary">
                See similar bikes
              </Link>
            ) : (
              <>
                <Link href={`/contact?topic=test-ride&bike=${bike.slug}`} className="btn btn-accent">
                  Book a test ride
                </Link>
                <Link href={`/contact?topic=question&bike=${bike.slug}`} className="btn btn-secondary">
                  Ask about this bike
                </Link>
              </>
            )}
          </div>
          <p className="mt-3 text-xs text-ink-2">30-day parts and labor warranty on every bike we sell. Free first tune-up at 100 miles.</p>
        </section>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        <section aria-labelledby="specs" className="md:col-span-1">
          <h2 id="specs" className="text-lg font-semibold">
            Full specs
          </h2>
          <dl className="card mt-3 divide-y divide-line text-sm">
            {specs.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 px-4 py-2.5">
                <dt className="text-ink-2">{k}</dt>
                <dd className="text-right font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section aria-labelledby="inspection">
          <h2 id="inspection" className="text-lg font-semibold">
            What we checked
          </h2>
          <ul className="card mt-3 space-y-2 p-4 text-sm">
            {bike.inspection.map((i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden="true" className="mt-0.5 text-forest">
                  ✓
                </span>
                {i}
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="included">
          <h2 id="included" className="text-lg font-semibold">
            Comes with
          </h2>
          <ul className="card mt-3 space-y-2 p-4 text-sm">
            {bike.included.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </section>
      </div>

      <section aria-labelledby="related" className="mt-12">
        <h2 id="related" className="text-lg font-semibold">
          Similar bikes in stock
        </h2>
        <ul className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {relatedBikes(bike, bikes).map((b) => (
            <li key={b.id}>
              <BikeCard bike={b} />
            </li>
          ))}
        </ul>
      </section>

      {!sold && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 p-3 backdrop-blur md:hidden">
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                {bike.brand} {bike.model}
              </p>
              <p className="text-sm tabular-nums text-ink-2">{formatPrice(bike.price)}</p>
            </div>
            <Link href={`/contact?topic=question&bike=${bike.slug}`} className="btn btn-secondary">
              Ask
            </Link>
            <Link href={`/contact?topic=test-ride&bike=${bike.slug}`} className="btn btn-accent">
              Test ride
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
