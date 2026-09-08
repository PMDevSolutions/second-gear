import type { Metadata } from "next";
import { SEED_BIKES, getBike } from "@/lib/bikes";
import { BikeDetail } from "@/components/BikeDetail";
import { formatPrice } from "@/lib/format";

export const dynamicParams = false;

export function generateStaticParams() {
  return SEED_BIKES.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/bikes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const bike = getBike(slug);
  if (!bike) return { title: "Bike listing" };
  return {
    title: `${bike.year} ${bike.brand} ${bike.model}, ${formatPrice(bike.price)}`,
    description: bike.summary,
  };
}

export default async function BikePage({ params }: PageProps<"/bikes/[slug]">) {
  const { slug } = await params;
  return <BikeDetail slug={slug} seed={SEED_BIKES} />;
}
