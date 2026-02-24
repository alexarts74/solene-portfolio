import type { Print } from "@/lib/types";

export const prints: Print[] = Array.from({ length: 9 }, (_, i) => ({
  slug: `ecume-${i + 1}`,
  title: `Ecume ${String(i + 1).padStart(2, "0")}`,
  photo: `/photos/projects/ecume/ecume-${i + 1}.jpg`,
  format: "30x40 cm",
  paper: "Fine art Hahnemühle",
  edition: "Unique edition (1/1)",
  price: 150,
  description:
    'Fine art print from the "Ecume" collection — artistic surf photography shot in Anglet, France.',
}));

export function getPrint(slug: string): Print | undefined {
  return prints.find((p) => p.slug === slug);
}
