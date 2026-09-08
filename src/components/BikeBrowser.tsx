"use client";

import { useMemo, useState } from "react";
import type { Bike, Category, FrameSize } from "@/lib/types";
import { CATEGORIES, FRAME_SIZES, RIDER_HEIGHT } from "@/lib/types";
import { useInventory } from "@/lib/store";
import { formatPrice } from "@/lib/format";
import { BikeCard } from "./BikeCard";

type Sort = "newest" | "price-asc" | "price-desc" | "miles-asc";

const PRICE_STEPS = [1000, 1500, 2500, 4000];

export function BikeBrowser({ seed }: { seed: Bike[] }) {
  const { bikes } = useInventory(seed);
  const [category, setCategory] = useState<Category | "All">("All");
  const [sizes, setSizes] = useState<FrameSize[]>([]);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [showSold, setShowSold] = useState(false);
  const [sort, setSort] = useState<Sort>("newest");
  const [query, setQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bikes
      .filter((b) => showSold || b.status !== "sold")
      .filter((b) => category === "All" || b.category === category)
      .filter((b) => sizes.length === 0 || sizes.includes(b.frameSize))
      .filter((b) => maxPrice === null || b.price <= maxPrice)
      .filter((b) => !q || `${b.brand} ${b.model} ${b.category} ${b.color}`.toLowerCase().includes(q))
      .sort((a, b) => {
        switch (sort) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "miles-asc":
            return a.miles - b.miles;
          default:
            return b.addedAt.localeCompare(a.addedAt);
        }
      });
  }, [bikes, category, sizes, maxPrice, showSold, sort, query]);

  const activeCount = (category !== "All" ? 1 : 0) + sizes.length + (maxPrice !== null ? 1 : 0) + (showSold ? 1 : 0);

  const clear = () => {
    setCategory("All");
    setSizes([]);
    setMaxPrice(null);
    setShowSold(false);
    setQuery("");
  };

  const toggleSize = (s: FrameSize) => setSizes((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  const filters = (
    <div className="flex flex-col gap-6">
      <fieldset>
        <legend className="text-sm font-semibold">Type</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {(["All", ...CATEGORIES] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={`rounded-full border px-3 py-1.5 text-sm ${
                category === c ? "border-forest bg-forest text-white" : "border-line bg-white hover:bg-sand-2"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold">Frame size</legend>
        <p className="mt-1 text-xs text-ink-2">Pick by rider height. Not sure? We size you in the shop.</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {FRAME_SIZES.map((s) => (
            <label
              key={s}
              className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                sizes.includes(s) ? "border-forest bg-moss/40" : "border-line bg-white"
              }`}
            >
              <input type="checkbox" className="accent-forest" checked={sizes.includes(s)} onChange={() => toggleSize(s)} />
              <span>
                <span className="font-semibold">{s}</span>
                <span className="block text-xs text-ink-2">{RIDER_HEIGHT[s]}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold">Budget</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {PRICE_STEPS.map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={maxPrice === p}
              onClick={() => setMaxPrice(maxPrice === p ? null : p)}
              className={`rounded-full border px-3 py-1.5 text-sm ${
                maxPrice === p ? "border-forest bg-forest text-white" : "border-line bg-white hover:bg-sand-2"
              }`}
            >
              Under {formatPrice(p)}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" className="accent-forest" checked={showSold} onChange={(e) => setShowSold(e.target.checked)} />
        Include recently sold
      </label>

      {activeCount > 0 && (
        <button type="button" onClick={clear} className="self-start text-sm font-medium text-ember underline">
          Clear filters
        </button>
      )}
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            className="btn btn-secondary flex-1"
            aria-expanded={filtersOpen}
            aria-controls="filters"
            onClick={() => setFiltersOpen((v) => !v)}
          >
            Filters{activeCount > 0 ? ` (${activeCount})` : ""}
          </button>
          <select aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="field flex-1">
            <option value="newest">Newest first</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="miles-asc">Fewest miles</option>
          </select>
        </div>
        <div id="filters" className={`${filtersOpen ? "block" : "hidden"} card mt-3 p-4 lg:mt-0 lg:block`}>
          {filters}
        </div>
      </aside>

      <section aria-live="polite">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <label className="flex flex-1 items-center gap-2">
            <span className="sr-only">Search bikes</span>
            <input
              type="search"
              placeholder="Search brand or model"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="field max-w-sm"
            />
          </label>
          <div className="hidden items-center gap-3 lg:flex">
            <p className="text-sm text-ink-2">
              {results.length} {results.length === 1 ? "bike" : "bikes"}
            </p>
            <select aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="field w-auto">
              <option value="newest">Newest first</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="miles-asc">Fewest miles</option>
            </select>
          </div>
        </div>

        {results.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="font-semibold">Nothing matches those filters right now.</p>
            <p className="mt-1 text-sm text-ink-2">
              Stock turns over every week. Clear a filter, or tell us what you are after and we will let you know when one comes in.
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <button type="button" onClick={clear} className="btn btn-secondary">
                Clear filters
              </button>
              <a href="/contact?topic=wanted" className="btn btn-primary">
                Ask us to watch for one
              </a>
            </div>
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((b) => (
              <li key={b.id}>
                <BikeCard bike={b} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
