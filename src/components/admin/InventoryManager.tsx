"use client";

import Link from "next/link";
import { useState } from "react";
import type { Bike, Status } from "@/lib/types";
import { CATEGORIES, CONDITIONS, FRAME_SIZES, STATUSES } from "@/lib/types";
import { useInventory } from "@/lib/store";
import { formatMiles, formatPrice, slugify } from "@/lib/format";
import { bikeHref } from "@/lib/bikes";
import { BikePhoto } from "../BikePhoto";

type Draft = Omit<Bike, "id" | "slug" | "addedAt" | "hue" | "photos" | "inspection" | "included"> & {
  inspectionText: string;
  includedText: string;
};

const emptyDraft = (): Draft => ({
  brand: "",
  model: "",
  year: new Date().getFullYear() - 1,
  price: 0,
  miles: 0,
  category: "Commuter",
  frameSize: "M",
  condition: "Very good",
  batteryWh: 500,
  batteryHealth: 90,
  rangeMiles: 30,
  motor: "",
  topAssistMph: 20,
  color: "",
  status: "available",
  summary: "",
  inspectionText: "",
  includedText: "Charger",
});

const toDraft = (b: Bike): Draft => ({
  ...b,
  inspectionText: b.inspection.join("\n"),
  includedText: b.included.join("\n"),
});

const lines = (s: string) => s.split("\n").map((l) => l.trim()).filter(Boolean);

export function InventoryManager({ seed }: { seed: Bike[] }) {
  const { bikes, hydrated, update, reset } = useInventory(seed);
  const [editing, setEditing] = useState<Bike | "new" | null>(null);
  const [draft, setDraft] = useState<Draft>(emptyDraft());
  const [filter, setFilter] = useState<Status | "all">("all");

  const open = (target: Bike | "new") => {
    setEditing(target);
    setDraft(target === "new" ? emptyDraft() : toDraft(target));
  };

  const close = () => setEditing(null);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const { inspectionText, includedText, ...rest } = draft;
    const base = { ...rest, inspection: lines(inspectionText), included: lines(includedText) };
    if (editing === "new") {
      const id = `b${Date.now().toString(36)}`;
      const bike: Bike = {
        ...base,
        id,
        slug: slugify(`${base.brand} ${base.model} ${base.year} ${id.slice(-4)}`),
        hue: Math.floor(Math.random() * 360),
        photos: [],
        addedAt: new Date().toISOString().slice(0, 10),
      };
      update([bike, ...bikes]);
    } else if (editing) {
      update(bikes.map((b) => (b.id === editing.id ? { ...editing, ...base } : b)));
    }
    close();
  };

  const remove = (bike: Bike) => {
    if (window.confirm(`Remove the ${bike.year} ${bike.brand} ${bike.model} from the site? This cannot be undone.`)) {
      update(bikes.filter((b) => b.id !== bike.id));
    }
  };

  const setStatus = (bike: Bike, status: Status) => update(bikes.map((b) => (b.id === bike.id ? { ...b, status } : b)));

  const visible = bikes.filter((b) => filter === "all" || b.status === filter);
  const counts = STATUSES.map((s) => [s, bikes.filter((b) => b.status === s).length] as const);

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setDraft((d) => ({ ...d, [k]: v }));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={filter === "all"}
            onClick={() => setFilter("all")}
            className={`rounded-full border px-3 py-1.5 text-sm ${filter === "all" ? "border-forest bg-forest text-white" : "border-line bg-white"}`}
          >
            All ({bikes.length})
          </button>
          {counts.map(([s, n]) => (
            <button
              key={s}
              type="button"
              aria-pressed={filter === s}
              onClick={() => setFilter(s)}
              className={`rounded-full border px-3 py-1.5 text-sm capitalize ${filter === s ? "border-forest bg-forest text-white" : "border-line bg-white"}`}
            >
              {s} ({n})
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={reset} className="btn btn-secondary">
            Reset sample data
          </button>
          <button type="button" onClick={() => open("new")} className="btn btn-primary">
            Add a bike
          </button>
        </div>
      </div>

      {!hydrated ? (
        <p className="mt-6 text-sm text-ink-2">Loading inventory</p>
      ) : (
        <ul className="mt-5 grid gap-3">
          {visible.map((b) => (
            <li key={b.id} className="card grid grid-cols-[72px_1fr] items-center gap-3 p-3 sm:grid-cols-[96px_1fr_auto]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <BikePhoto bike={b} sizes="96px" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold">
                  {b.year} {b.brand} {b.model}
                </p>
                <p className="text-sm text-ink-2">
                  {formatPrice(b.price)} · {formatMiles(b.miles)} · Size {b.frameSize} · {b.condition}
                </p>
                <label className="mt-1 inline-flex items-center gap-2 text-sm">
                  <span className="sr-only">Status for {b.model}</span>
                  <select value={b.status} onChange={(e) => setStatus(b, e.target.value as Status)} className="field w-auto py-1 text-sm capitalize">
                    {STATUSES.map((s) => (
                      <option key={s} value={s} className="capitalize">
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="col-span-2 flex gap-2 sm:col-span-1">
                <Link href={bikeHref(b.slug)} className="btn btn-secondary py-1.5 text-sm">
                  View
                </Link>
                <button type="button" onClick={() => open(b)} className="btn btn-secondary py-1.5 text-sm">
                  Edit
                </button>
                <button type="button" onClick={() => remove(b)} className="btn py-1.5 text-sm text-ember hover:bg-ember-2">
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-0 sm:items-center sm:p-4" onClick={close}>
          <form
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-title"
            onClick={(e) => e.stopPropagation()}
            onSubmit={save}
            className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white p-5 sm:rounded-2xl"
          >
            <div className="flex items-center justify-between">
              <h2 id="edit-title" className="text-lg font-semibold">
                {editing === "new" ? "Add a bike" : `Edit ${editing.brand} ${editing.model}`}
              </h2>
              <button type="button" onClick={close} className="btn btn-secondary py-1.5 text-sm">
                Cancel
              </button>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Field label="Brand">
                <input className="field" required value={draft.brand} onChange={(e) => set("brand", e.target.value)} />
              </Field>
              <Field label="Model">
                <input className="field" required value={draft.model} onChange={(e) => set("model", e.target.value)} />
              </Field>
              <Field label="Year">
                <input className="field" type="number" min={2010} max={2030} required value={draft.year} onChange={(e) => set("year", +e.target.value)} />
              </Field>
              <Field label="Price (USD)">
                <input className="field" type="number" min={1} required value={draft.price || ""} onChange={(e) => set("price", +e.target.value)} />
              </Field>
              <Field label="Miles ridden">
                <input className="field" type="number" min={0} value={draft.miles} onChange={(e) => set("miles", +e.target.value)} />
              </Field>
              <Field label="Color">
                <input className="field" value={draft.color} onChange={(e) => set("color", e.target.value)} />
              </Field>
              <Field label="Type">
                <select className="field" value={draft.category} onChange={(e) => set("category", e.target.value as Draft["category"])}>
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Frame size">
                <select className="field" value={draft.frameSize} onChange={(e) => set("frameSize", e.target.value as Draft["frameSize"])}>
                  {FRAME_SIZES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </Field>
              <Field label="Rider height override (one-size frames only)">
                <input className="field" placeholder={"e.g. 4'11\" to 6'5\""} value={draft.riderFit ?? ""} onChange={(e) => set("riderFit", e.target.value || undefined)} />
              </Field>
              <Field label="Condition">
                <select className="field" value={draft.condition} onChange={(e) => set("condition", e.target.value as Draft["condition"])}>
                  {CONDITIONS.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Status">
                <select className="field capitalize" value={draft.status} onChange={(e) => set("status", e.target.value as Status)}>
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Battery (Wh)">
                <input className="field" type="number" min={100} value={draft.batteryWh} onChange={(e) => set("batteryWh", +e.target.value)} />
              </Field>
              <Field label="Battery health (% of rated)">
                <input className="field" type="number" min={0} max={100} value={draft.batteryHealth} onChange={(e) => set("batteryHealth", +e.target.value)} />
              </Field>
              <Field label="Tested range (miles)">
                <input className="field" type="number" min={1} value={draft.rangeMiles} onChange={(e) => set("rangeMiles", +e.target.value)} />
              </Field>
              <Field label="Assist up to (mph)">
                <input className="field" type="number" min={10} max={28} value={draft.topAssistMph} onChange={(e) => set("topAssistMph", +e.target.value)} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Motor">
                  <input className="field" placeholder="e.g. Bosch Performance Line mid-drive" value={draft.motor} onChange={(e) => set("motor", e.target.value)} />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Listing summary (two sentences, mention any wear)">
                  <textarea className="field" rows={2} required value={draft.summary} onChange={(e) => set("summary", e.target.value)} />
                </Field>
              </div>
              <Field label="What we checked (one per line)">
                <textarea className="field" rows={4} value={draft.inspectionText} onChange={(e) => set("inspectionText", e.target.value)} />
              </Field>
              <Field label="Comes with (one per line)">
                <textarea className="field" rows={4} value={draft.includedText} onChange={(e) => set("includedText", e.target.value)} />
              </Field>
            </div>

            <p className="mt-3 text-xs text-ink-2">Photos: in the real build this form would accept uploads here. The prototype uses placeholder artwork.</p>

            <div className="mt-4 flex justify-end gap-2">
              <button type="button" onClick={close} className="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {editing === "new" ? "Add bike" : "Save changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1 text-sm font-medium">
      {label}
      {children}
    </label>
  );
}
