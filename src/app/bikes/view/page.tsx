import type { Metadata } from "next";
import { Suspense } from "react";
import { SEED_BIKES } from "@/lib/bikes";
import { BikeViewer } from "@/components/BikeViewer";

export const metadata: Metadata = { title: "Bike listing", robots: { index: false } };

// Client-rendered viewer for bikes added through the owner page. Those have no
// prerendered route on a static host, so the slug travels in the query string.
export default function BikeViewPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-16 text-sm text-ink-2">Loading listing</div>}>
      <BikeViewer seed={SEED_BIKES} />
    </Suspense>
  );
}
