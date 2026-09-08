import type { Metadata } from "next";
import { SEED_BIKES } from "@/lib/bikes";
import { InventoryManager } from "@/components/admin/InventoryManager";

export const metadata: Metadata = { title: "Inventory (owner)", robots: { index: false } };

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-forest-2">Owner area</p>
        <h1 className="text-3xl font-semibold tracking-tight">Inventory</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-2">
          Concept only: there is no login and changes are saved in this browser, but every edit here shows up on the public bike pages in
          the same browser so the flow can be tried end to end. In production this sits behind a login and writes to the shop database.
        </p>
      </div>
      <InventoryManager seed={SEED_BIKES} />
    </div>
  );
}
