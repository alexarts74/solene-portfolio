import type { Project } from "@/lib/types";
import manifest from "./photo-manifest.json";

const photoManifest = manifest as Record<
  string,
  { width: number; height: number; blurDataURL: string }
>;

function makePhoto(src: string, alt: string) {
  const meta = photoManifest[src];
  return {
    src,
    thumbSrc: src.replace(/\/([^/]+)$/, "/thumbs/$1"),
    alt,
    width: meta?.width ?? 2400,
    height: meta?.height ?? 1600,
    blurDataURL: meta?.blurDataURL,
  };
}

export const projects: Project[] = [
  {
    slug: "ecume",
    title: '"Ecume" exhibition',
    subtitle:
      "6 days of surf photography exhibition at the Galerie du Pop Up, Paris, France",
    date: "September 2025",
    description: [
      "Was lucky enough to exhibit my work at the Galerie du Pop Up from the 25th to the 30th of September 2025.",
      'A serie called "Ecume", an artistic surf photography collection, shot in Anglet this summer.',
      "Through my art, I highlighted the correlation between surf and photography in terms of practice, commitment and difficulties, expressing my own photographer journey, fighting between passion and challenges.",
    ],
    coverPhoto: "/photos/projects/ecume/ecume-1.jpg",
    photos: Array.from({ length: 9 }, (_, i) =>
      makePhoto(
        `/photos/projects/ecume/ecume-${i + 1}.jpg`,
        `Ecume exhibition photo ${i + 1}`
      )
    ),
  },
  {
    slug: "volcom-x-nikon",
    title: "Volcom x Nikon",
    subtitle:
      '3rd prize award at the Volcom x Nikon Photo contest, "Street photography" category',
    date: "November 2025",
    description: [
      '3rd prize award at the Volcom x Nikon Photo contest in Paris, "Street photography" category, November 2025.',
      "Shot taken at Place de la République, with my Olympus OMD EM-5, 20mm lens.",
      "My message was simple: Place de la République is a world on its own, a symbol of rebellion, resistance, political statements and French history.",
      "So alive, so energetic, hosting people from everywhere, doing everything or nothing, all together in this chaotic beauty.",
    ],
    coverPhoto: "/photos/projects/volcom-x-nikon/volcomxnikon-1.jpg",
    photos: Array.from({ length: 6 }, (_, i) =>
      makePhoto(
        `/photos/projects/volcom-x-nikon/volcomxnikon-${i + 1}.jpg`,
        `Volcom x Nikon photo ${i + 1}`
      )
    ),
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
