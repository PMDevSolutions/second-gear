import Image from "next/image";
import Link from "next/link";
import { PHOTOS } from "@/lib/photos";
import { SEED_BIKES, availableBikes } from "@/lib/bikes";
import { BikeCard } from "@/components/BikeCard";
import { SHOP } from "@/components/Footer";

const promises = [
  { title: "Battery numbers you can trust", body: "Every pack is load-tested. We list the measured capacity and the range we actually got, not the brochure figure." },
  { title: "Fixed before it is listed", body: "Brakes, drivetrain, firmware, torque checks. If a bike needed parts, we fitted them and wrote it on the listing." },
  { title: "30 days, no arguments", body: "Parts and labor warranty on every bike we sell, plus a free first tune-up at 100 miles." },
];

export default function HomePage() {
  const featured = availableBikes(SEED_BIKES)
    .filter((b) => b.status === "available")
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt))
    .slice(0, 6);

  return (
    <>
      <section className="border-b border-line bg-sand-2">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[1.1fr_1fr] md:items-center md:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-forest-2">Used e-bikes, Canton, Baltimore</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
              Good e-bikes, second time around.
            </h1>
            <p className="mt-4 max-w-lg text-lg text-ink-2">
              Inspected, battery-tested, and priced straight. Usually 15 to 25 bikes on the floor. Come ride one before you decide.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/bikes" className="btn btn-primary">
                See what is in stock
              </Link>
              <Link href="/services" className="btn btn-secondary">
                Book a repair
              </Link>
            </div>
            <p className="mt-4 text-sm text-ink-2">
              {SHOP.street}, open Tue to Sat.{" "}
              <a href={`tel:${SHOP.phone.replace(/\D/g, "")}`} className="underline">
                {SHOP.phone}
              </a>
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line md:aspect-[5/4]">
            <Image src={`/photos/${PHOTOS.stepThruSea.file}`} alt={PHOTOS.stepThruSea.alt} fill priority sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section aria-label="What you get" className="border-b border-line bg-white">
        <ul className="mx-auto grid max-w-6xl gap-4 px-4 py-8 md:grid-cols-3">
          {promises.map((p) => (
            <li key={p.title}>
              <h2 className="font-semibold">{p.title}</h2>
              <p className="mt-1 text-sm text-ink-2">{p.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="latest" className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 id="latest" className="text-2xl font-semibold tracking-tight">
              Just landed
            </h2>
            <p className="mt-1 text-sm text-ink-2">The newest bikes on the floor. Stock changes weekly.</p>
          </div>
          <Link href="/bikes" className="text-sm font-medium underline">
            All bikes
          </Link>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((b) => (
            <li key={b.id}>
              <BikeCard bike={b} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="repairs" className="border-t border-line bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 id="repairs" className="text-2xl font-semibold tracking-tight">
              Repairs for any e-bike, not just ours
            </h2>
            <p className="mt-3 text-ink-2">
              Bosch, Shimano, Bafang, hub motors, the direct-to-consumer brands the big shops turn away. Diagnose first, quote before we
              touch anything, most jobs back within two days.
            </p>
            <Link href="/services" className="btn btn-primary mt-5">
              Services and prices
            </Link>
          </div>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            {[
              ["Tune-up", "$89"],
              ["Battery health test", "$45"],
              ["Brake service", "from $60"],
              ["Diagnostics", "$75 / hr"],
            ].map(([k, v]) => (
              <div key={k} className="card p-4">
                <dt className="text-ink-2">{k}</dt>
                <dd className="mt-1 text-xl font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
