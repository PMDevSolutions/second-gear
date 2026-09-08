import type { Bike } from "@/lib/types";

// Placeholder artwork. Real listings would use photos from the shop's own
// inspection; the hue keeps cards visually distinct in the meantime.
export function BikePhoto({
  bike,
  index = 0,
  className = "",
  priority = false,
}: {
  bike: Pick<Bike, "brand" | "model" | "hue" | "category">;
  index?: number;
  className?: string;
  priority?: boolean;
}) {
  const light = `hsl(${bike.hue} 40% 92%)`;
  const mid = `hsl(${bike.hue} 35% 70%)`;
  const dark = `hsl(${bike.hue} 35% 28%)`;
  const label = index === 0 ? "" : `Photo ${index + 1}`;
  return (
    <svg
      viewBox="0 0 400 300"
      role="img"
      aria-label={`${bike.brand} ${bike.model}${label ? `, ${label.toLowerCase()}` : ""}`}
      className={`block h-full w-full ${className}`}
      data-priority={priority ? "true" : undefined}
    >
      <defs>
        <linearGradient id={`g-${bike.hue}-${index}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={light} />
          <stop offset="1" stopColor={mid} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#g-${bike.hue}-${index})`} />
      <g fill="none" stroke={dark} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" transform={`translate(${index * 6} 0)`}>
        <circle cx="110" cy="205" r="58" />
        <circle cx="290" cy="205" r="58" />
        <path d="M110 205 L165 110 L245 110 L290 205 M165 110 L200 205 L110 205 M245 110 L228 78 L252 78 M200 205 L245 110" />
        <path d="M150 88 L182 88" strokeWidth="11" />
      </g>
      <rect x="170" y="128" width="46" height="18" rx="5" fill={dark} opacity="0.85" />
      {label && (
        <text x="20" y="34" fontSize="18" fontFamily="system-ui, sans-serif" fill={dark} opacity="0.7">
          {label}
        </text>
      )}
    </svg>
  );
}
