import type { Photo } from "./types";

// Unsplash photos (Unsplash License). Credits are also listed in README.md.
const u = (id: string) => `https://unsplash.com/photos/${id}`;

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Public URL for a photo file, including the deployment base path. */
export const photoSrc = (file: string) => `${BASE}/photos/${file}`;

export const PHOTOS = {
  kboRiding: { file: "kXP41LVdcv0.jpg", alt: "Rider on a white and black commuter e-bike on a city street", credit: "KBO Bike", source: u("kXP41LVdcv0") },
  kboBattery: { file: "msIweXufPUs.jpg", alt: "Hand resting on the battery of a white and black e-bike", credit: "KBO Bike", source: u("msIweXufPUs") },
  stepThruSea: { file: "GWWYRsZhC0o.jpg", alt: "Rider on a light blue step-through e-bike beside the sea", credit: "KBO Bike", source: u("GWWYRsZhC0o") },
  stepThruStanding: { file: "bPmQguvBMLs.jpg", alt: "Person standing with a light blue step-through e-bike on a coastal path", credit: "KBO Bike", source: u("bPmQguvBMLs") },
  stepThruBench: { file: "6s20Vsn5gSY.jpg", alt: "Light blue step-through e-bike parked beside a bench", credit: "KBO Bike", source: u("6s20Vsn5gSY") },
  tealStepThru: { file: "jf5DYcgW02c.jpg", alt: "Rider on a teal step-through e-bike in front of a shop", credit: "Velotric Ebike", source: u("jf5DYcgW02c") },
  blackUrban: { file: "qZ1KmFjfQq8.jpg", alt: "Matte black urban e-bike against a white wall", credit: "Geo Chierchia", source: u("qZ1KmFjfQq8") },
  darkGravel: { file: "9AFUBP9kIUU.jpg", alt: "Dark commuter e-bike parked on a gravel road at sunset", credit: "KBO Bike", source: u("9AFUBP9kIUU") },
  darkRiding: { file: "tEW5Ytb11ss.jpg", alt: "Rider on a dark commuter e-bike on a dirt road at sunset", credit: "KBO Bike", source: u("tEW5Ytb11ss") },
  orangeBox: { file: "7cU_P3tkMBw.jpg", alt: "Front-loading cargo e-bike with an orange box", credit: "Tom Ru", source: u("7cU_P3tkMBw") },
  brownBox: { file: "wSoO8iNYtoU.jpg", alt: "Front-loading cargo bike with a wooden box and rain cover", credit: "Sven Brandsma", source: u("wSoO8iNYtoU") },
  boxDetail: { file: "pFBJVWy6Mlg.jpg", alt: "Cargo box of a front-loading cargo bike, close up", credit: "Jørgen Larsen", source: u("pFBJVWy6Mlg") },
  blackFolding: { file: "nfBUBGOhhuM.jpg", alt: "Black folding fat-tire e-bike on a concrete floor", credit: "Himiway Bikes", source: u("nfBUBGOhhuM") },
  blueFolding: { file: "9VDYrR191qg.jpg", alt: "Blue and white folding bicycle, folded", credit: "Haberdoedas", source: u("9VDYrR191qg") },
  blueFoldingDetail: { file: "B2_ZKX46890.jpg", alt: "Close-up of the hinge on a folded bicycle", credit: "Haberdoedas", source: u("B2_ZKX46890") },
  blackFat: { file: "jvNc-dwIISg.jpg", alt: "Black fat-tire e-bike on rocky ground", credit: "Himiway Bikes", source: u("jvNc-dwIISg") },
  whiteFat: { file: "Go4eeazV3LE.jpg", alt: "White and red fat-tire e-bike in a mountain meadow", credit: "Himiway Bikes", source: u("Go4eeazV3LE") },
  redMtb: { file: "jyoTLVMv9So.jpg", alt: "Red full-suspension e-mountain bike beside a river", credit: "Julian Hochgesang", source: u("jyoTLVMv9So") },
  hardtailBags: { file: "T0eAoLwZB88.jpg", alt: "Blue hardtail mountain bike with bikepacking bags on a rock", credit: "James Hoey", source: u("T0eAoLwZB88") },
  workshop: { file: "v-LAxH7JSzI.jpg", alt: "Workshop wall with hand tools above a workbench", credit: "camera obscura", source: u("v-LAxH7JSzI") },
} satisfies Record<string, Photo>;

export const ALL_PHOTOS: Photo[] = Object.values(PHOTOS);
