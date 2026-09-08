export type Category = "Commuter" | "Cargo" | "Folding" | "Mountain" | "Fat tire";
export type FrameSize = "S" | "M" | "L" | "XL";
export type Condition = "Excellent" | "Very good" | "Good" | "Fair";
export type Status = "available" | "reserved" | "sold";

export interface Photo {
  file: string; // filename under /public/photos
  alt: string;
  credit: string; // photographer, Unsplash license
  source: string; // Unsplash photo page
}

export interface Bike {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  miles: number;
  category: Category;
  frameSize: FrameSize;
  riderFit?: string; // overrides the size-chart range, e.g. one-size cargo frames
  condition: Condition;
  batteryWh: number;
  batteryHealth: number; // percent of original capacity, from our test
  rangeMiles: number; // realistic range on assist level 2, from our test
  motor: string;
  topAssistMph: number;
  color: string;
  status: Status;
  photos: Photo[]; // empty for bikes added through the owner page (uses placeholder art)
  summary: string;
  inspection: string[];
  included: string[];
  hue: number; // placeholder photo tint until real photos are added
  addedAt: string; // ISO date
}

export const CATEGORIES: Category[] = ["Commuter", "Cargo", "Folding", "Mountain", "Fat tire"];
export const FRAME_SIZES: FrameSize[] = ["S", "M", "L", "XL"];
export const CONDITIONS: Condition[] = ["Excellent", "Very good", "Good", "Fair"];
export const STATUSES: Status[] = ["available", "reserved", "sold"];

export const RIDER_HEIGHT: Record<FrameSize, string> = {
  S: "5'0\" to 5'5\"",
  M: "5'5\" to 5'10\"",
  L: "5'10\" to 6'2\"",
  XL: "6'2\" and up",
};
