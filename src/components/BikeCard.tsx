import Link from "next/link";
import type { Bike } from "@/lib/types";
import { formatMiles, formatPrice } from "@/lib/format";
import { BikePhoto } from "./BikePhoto";
import { ConditionBadge, StatusBadge } from "./Badges";

export function BikeCard({ bike }: { bike: Bike }) {
  const sold = bike.status === "sold";
  return (
    <article className={`card group relative flex flex-col overflow-hidden ${sold ? "opacity-70" : ""}`}>
      <div className="relative aspect-[4/3] overflow-hidden bg-sand-2">
        <BikePhoto bike={bike} className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.03]" />
        <div className="absolute left-3 top-3 flex gap-2">
          <StatusBadge status={bike.status} />
        </div>
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium text-ink-2">
          {bike.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-tight">
            <Link href={`/bikes/${bike.slug}`} className="after:absolute after:inset-0 after:content-['']">
              <span className="block text-xs font-medium uppercase tracking-wide text-ink-2">{bike.brand}</span>
              {bike.model}
            </Link>
          </h3>
          <p className="shrink-0 text-lg font-semibold tabular-nums">{formatPrice(bike.price)}</p>
        </div>
        <dl className="grid grid-cols-3 gap-2 text-sm">
          <div>
            <dt className="text-xs text-ink-2">Year</dt>
            <dd className="font-medium">{bike.year}</dd>
          </div>
          <div>
            <dt className="text-xs text-ink-2">Ridden</dt>
            <dd className="font-medium">{formatMiles(bike.miles)}</dd>
          </div>
          <div>
            <dt className="text-xs text-ink-2">Range</dt>
            <dd className="font-medium">~{bike.rangeMiles} mi</dd>
          </div>
        </dl>
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-line pt-3 text-sm">
          <span className="text-ink-2">
            {bike.riderFit ? (
              <span className="font-semibold text-ink">One size</span>
            ) : (
              <>
                Size <span className="font-semibold text-ink">{bike.frameSize}</span>
              </>
            )}
          </span>
          <ConditionBadge condition={bike.condition} />
        </div>
      </div>
    </article>
  );
}
