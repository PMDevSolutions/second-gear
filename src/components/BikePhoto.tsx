import Image from "next/image";
import type { Bike, Photo } from "@/lib/types";
import { photoSrc } from "@/lib/photos";

type Props = {
  bike: Pick<Bike, "brand" | "model" | "hue" | "photos">;
  index?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

// Real photo when the listing has one, placeholder line art otherwise (bikes
// added through the owner concept have no upload step yet).
export function BikePhoto({ bike, index = 0, className = "", priority = false, sizes = "(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw" }: Props) {
  const photo: Photo | undefined = bike.photos?.[index] ?? bike.photos?.[0];
  if (photo) {
    return (
      <Image
        src={photoSrc(photo.file)}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
      />
    );
  }
  return <Placeholder bike={bike} index={index} className={className} />;
}

function Placeholder({ bike, index, className }: { bike: Pick<Bike, "brand" | "model" | "hue">; index: number; className: string }) {
  const light = `hsl(${bike.hue} 40% 92%)`;
  const mid = `hsl(${bike.hue} 35% 70%)`;
  const dark = `hsl(${bike.hue} 35% 28%)`;
  return (
    <svg
      viewBox="0 0 400 300"
      role="img"
      aria-label={`${bike.brand} ${bike.model}, photo to come`}
      className={`absolute inset-0 block h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`g-${bike.hue}-${index}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={light} />
          <stop offset="1" stopColor={mid} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#g-${bike.hue}-${index})`} />
      <g fill="none" stroke={dark} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="110" cy="205" r="58" />
        <circle cx="290" cy="205" r="58" />
        <path d="M110 205 L165 110 L245 110 L290 205 M165 110 L200 205 L110 205 M245 110 L228 78 L252 78 M200 205 L245 110" />
        <path d="M150 88 L182 88" strokeWidth="11" />
      </g>
      <rect x="170" y="128" width="46" height="18" rx="5" fill={dark} opacity="0.85" />
      <text x="20" y="34" fontSize="16" fontFamily="system-ui, sans-serif" fill={dark} opacity="0.7">
        Photo to come
      </text>
    </svg>
  );
}
