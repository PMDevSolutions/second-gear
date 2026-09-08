import type { Metadata } from "next";
import { SEED_BIKES } from "@/lib/bikes";
import { BikeBrowser } from "@/components/BikeBrowser";

export const metadata: Metadata = {
  title: "Used e-bikes for sale",
  description: "Every bike is inspected, battery load-tested, and comes with a 30-day warranty. Filter by type, frame size, and budget.",
};

export default function BikesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Used e-bikes for sale</h1>
        <p className="mt-2 text-ink-2">
          Every bike here has been through our bench: battery load-tested, brakes and drivetrain checked, faults fixed before listing. The
          range figure on each card is what we measured on assist level 2, not the number from the brochure.
        </p>
      </div>
      <BikeBrowser seed={SEED_BIKES} />
    </div>
  );
}
