"use client";

import { useSearchParams } from "next/navigation";
import type { Bike } from "@/lib/types";
import { BikeDetail } from "./BikeDetail";

export function BikeViewer({ seed }: { seed: Bike[] }) {
  const slug = useSearchParams().get("slug") ?? "";
  return <BikeDetail slug={slug} seed={seed} />;
}
