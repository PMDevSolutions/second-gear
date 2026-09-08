"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { Bike } from "./types";

// Mock persistence layer. The public site and the admin concept both read
// through this hook, so edits made in /admin show up in the storefront in the
// same browser. Swap the localStorage calls for API calls and the components
// do not need to change.
const KEY = "second-gear:inventory:v1";
const EVENT = "second-gear:inventory-change";

let cache: { raw: string | null; seed: Bike[]; bikes: Bike[] } | null = null;

function readRaw(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function snapshot(seed: Bike[]): Bike[] {
  const raw = readRaw();
  if (!cache || cache.raw !== raw || cache.seed !== seed) {
    let bikes = seed;
    if (raw) {
      try {
        bikes = JSON.parse(raw) as Bike[];
      } catch {
        bikes = seed;
      }
    }
    cache = { raw, seed, bikes };
  }
  return cache.bikes;
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

function write(bikes: Bike[] | null) {
  try {
    if (bikes) localStorage.setItem(KEY, JSON.stringify(bikes));
    else localStorage.removeItem(KEY);
  } catch {
    // storage unavailable; in-memory cache below still updates the UI
    cache = { raw: bikes ? JSON.stringify(bikes) : null, seed: cache?.seed ?? [], bikes: bikes ?? cache?.seed ?? [] };
  }
  window.dispatchEvent(new Event(EVENT));
}

export function useInventory(seed: Bike[]) {
  const bikes = useSyncExternalStore(
    subscribe,
    () => snapshot(seed),
    () => seed,
  );
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const update = useCallback((next: Bike[]) => write(next), []);
  const reset = useCallback(() => write(null), []);

  return { bikes, hydrated, update, reset };
}
