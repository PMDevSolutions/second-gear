import type { Condition, Status } from "@/lib/types";

const conditionTone: Record<Condition, string> = {
  Excellent: "bg-moss text-forest",
  "Very good": "bg-moss/70 text-forest",
  Good: "bg-sand-2 text-ink",
  Fair: "bg-ember-2 text-ember",
};

export function ConditionBadge({ condition }: { condition: Condition }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${conditionTone[condition]}`}>
      {condition}
    </span>
  );
}

export function StatusBadge({ status }: { status: Status }) {
  if (status === "available") return null;
  const tone = status === "sold" ? "bg-ink text-white" : "bg-ember text-white";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${tone}`}>
      {status === "sold" ? "Sold" : "On hold"}
    </span>
  );
}
