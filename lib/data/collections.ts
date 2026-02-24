import type { Collection, Photo } from "@/lib/types";
import manifest from "./photo-manifest.json";

const photoManifest = manifest as Record<
  string,
  { width: number; height: number; blurDataURL: string }
>;

function makePhotos(
  dir: string,
  filenames: string[],
  altPrefix: string
): Photo[] {
  return filenames.map((f, i) => {
    const src = `/photos/${dir}/${f}`;
    const meta = photoManifest[src];
    return {
      src,
      thumbSrc: `/photos/${dir}/thumbs/${f}`,
      alt: `${altPrefix} ${i + 1}`,
      width: meta?.width ?? 2400,
      height: meta?.height ?? 1600,
      blurDataURL: meta?.blurDataURL,
    };
  });
}

export const collections: Collection[] = [
  {
    slug: "street-architecture",
    title: "Street & Architecture",
    coverPhoto:
      "/photos/street-architecture/street-photo/portrait_madeline-solennebrianchon-39.jpg",
    galleries: [
      {
        slug: "street-photo",
        title: "Street Photo",
        photos: makePhotos(
          "street-architecture/street-photo",
          [
            "00011251-010.jpg",
            "portrait_madeline-solennebrianchon-39.jpg",
          ],
          "Street photo"
        ),
      },
    ],
  },
  {
    slug: "travel",
    title: "Travel",
    coverPhoto: "/photos/travel/asia-vietnam/vietnam-01.jpg",
    galleries: [
      {
        slug: "asia-vietnam",
        title: "Asia — Vietnam",
        photos: makePhotos(
          "travel/asia-vietnam",
          Array.from({ length: 53 }, (_, i) =>
            `vietnam-${String(i + 1).padStart(2, "0")}.jpg`
          ),
          "Vietnam"
        ),
      },
      {
        slug: "australia-new-zealand",
        title: "Australia & New Zealand",
        photos: makePhotos(
          "travel/australia-new-zealand",
          [
            "australie_nz-01.jpg",
            "australie_nz-02.jpg",
            "australie_nz-03.jpg",
            "australie_nz-04.jpg",
            "australie_nz-06.jpg",
            "australie_nz-07.jpg",
            "australie_nz-08.jpg",
            "australie_nz-09.jpg",
            "australie_nz-10.jpg",
            "australie_nz-12.jpg",
            "australie_nz-13.jpg",
            "australie_nz-14.jpg",
            "australie_nz-16.jpg",
            "australie_nz-17.jpg",
            "australie_nz-18.jpg",
            "australie_nz-19.jpg",
            "australie_nz-20.jpg",
            "australie_nz-21.jpg",
            "australie_nz-22.jpg",
            "australie_nz-23.jpg",
            "australie_nz-24.jpg",
            "australie_nz-25.jpg",
            "australie_nz-26.jpg",
            "australie_nz-27.jpg",
            "australie_nz-29.jpg",
            "australie_nz-30.jpg",
            "australie_nz-31.jpg",
            "australie_nz-32.jpg",
            "australie_nz-33.jpg",
            "australie_nz-34.jpg",
            "australie_nz-35.jpg",
            "australie_nz-37.jpg",
            "australie_nz-39.jpg",
            "australie_nz-40.jpg",
          ],
          "Australia & New Zealand"
        ),
      },
      {
        slug: "france",
        title: "France",
        photos: makePhotos(
          "travel/france",
          [
            "_1010160.jpg",
            "_1010161.jpg",
            "p1010163.jpg",
            "p1010165.jpg",
            "p1010167.jpg",
            "p1010169.jpg",
            "p1010170.jpg",
            "p1010174.jpg",
            "p1010175.jpg",
            "p1010176.jpg",
            "p1010185.jpg",
            "p1010192.jpg",
            "p1010197.jpg",
            "p1010198.jpg",
            "p1010205.jpg",
            "p1010207.jpg",
            "p1010218.jpg",
            "p1010231.jpg",
            "p1010237.jpg",
            "p1010244.jpg",
            "p1010248.jpg",
            "p1010254.jpg",
            "p1010263-2.jpg",
            "p1010263.jpg",
            "p1010269.jpg",
            "p1010270.jpg",
            "p1010273.jpg",
            "p1010277.jpg",
            "p1010281.jpg",
            "p1010282.jpg",
            "p1010286.jpg",
            "p1010296.jpg",
            "p1010298.jpg",
            "p1010299.jpg",
            "p1010305.jpg",
            "p1010308.jpg",
            "p1010316.jpg",
            "p1010321.jpg",
            "p1010323.jpg",
            "p1010328.jpg",
            "p1010329.jpg",
            "p1010330.jpg",
            "p1010331.jpg",
            "p1010340.jpg",
            "p1010343.jpg",
            "p1010345.jpg",
            "p1010355.jpg",
            "p1010387-2.jpg",
            "p1010387.jpg",
            "p1010392.jpg",
            "p1010395.jpg",
            "p1010435.jpg",
            "p1010437.jpg",
            "p1010440.jpg",
            "p1010441.jpg",
            "p1010462.jpg",
            "p1010463.jpg",
            "p1010466.jpg",
            "p1010469.jpg",
            "p1010474.jpg",
            "p1010476.jpg",
            "p1010478.jpg",
          ],
          "France"
        ),
      },
    ],
  },
  {
    slug: "portraits",
    title: "Portraits",
    coverPhoto:
      "/photos/portraits/bremond-capela/portrait-of-valdrin-thaqi_hd-courtesy-of-bremond-capela-and-valdrin-thaqi-credits-photo_-solenne-brianchon-34.jpg",
    galleries: [
      {
        slug: "bremond-capela",
        title: "Bremond Capela — Artist Portraits",
        photos: makePhotos(
          "portraits/bremond-capela",
          [
            "portrait-of-valdrin-thaqi_hd-courtesy-of-bremond-capela-and-valdrin-thaqi-credits-photo_-solenne-brianchon-34.jpg",
            "portrait-of-valdrin-thaqi_hd-courtesy-of-bremond-capela-and-valdrin-thaqi-credits-photo_-solenne-brianchon-40.jpg",
            "portrait-of-valdrin-thaqi_hd-courtesy-of-bremond-capela-and-valdrin-thaqi-credits-photo_-solenne-brianchon-48.jpg",
            "portrait_blake_daniels_sbrianchon-09.jpg",
            "portrait_blake_daniels_sbrianchon-10.jpg",
            "portrait_blake_daniels_sbrianchon-20.jpg",
            "shooting_louise_portrait-08.jpg",
            "shooting_louise_portrait-12.jpg",
            "shooting_louise_portrait-13.jpg",
          ],
          "Artist portrait"
        ),
      },
      {
        slug: "louis-mondonnet",
        title: "Louis Mondonnet",
        photos: makePhotos(
          "portraits/louis-mondonnet",
          [
            "image-10.jpg",
            "img_0243-2.jpg",
            "img_0259-2.jpg",
            "p1012684.jpg",
          ],
          "Louis Mondonnet"
        ),
      },
      {
        slug: "friends",
        title: "Friends Portraits",
        photos: makePhotos(
          "portraits/friends",
          ["mehdi-1.jpg", "mehdi-2.jpg", "mehdi-3.jpg"],
          "Friends portrait"
        ),
      },
    ],
  },
  {
    slug: "lifestyle-commercial",
    title: "Lifestyle & Commercial",
    coverPhoto:
      "/photos/lifestyle-commercial/romeo-stendman/expo_r_stendman-01.jpg",
    galleries: [
      {
        slug: "romeo-stendman",
        title: "Romeo Stendman — Exhibition",
        photos: makePhotos(
          "lifestyle-commercial/romeo-stendman",
          Array.from({ length: 14 }, (_, i) =>
            `expo_r_stendman-${String(i + 1).padStart(2, "0")}.jpg`
          ),
          "Romeo Stendman exhibition"
        ),
      },
      {
        slug: "cecile-mollon-deschamps",
        title: "Cécile Mollon Deschamps — Website",
        photos: makePhotos(
          "lifestyle-commercial/cecile-mollon-deschamps",
          [
            "c-cile_md-01.jpg",
            "c-cile_md-03.jpg",
            "c-cile_md-04.jpg",
            "c-cile_md-05.jpg",
            "c-cile_md-09.jpg",
            "c-cile_md-12.jpg",
            "c-cile_md-15.jpg",
            "c-cile_md-16.jpg",
            "c-cile_md-17.jpg",
            "c-cile_md-18.jpg",
            "c-cile_md-19.jpg",
            "c-cile_md-20.jpg",
          ],
          "Cécile Mollon Deschamps"
        ),
      },
    ],
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getGallery(
  collectionSlug: string,
  gallerySlug: string
): { collection: Collection; gallery: import("@/lib/types").Gallery } | undefined {
  const collection = getCollection(collectionSlug);
  if (!collection) return undefined;
  const gallery = collection.galleries.find((g) => g.slug === gallerySlug);
  if (!gallery) return undefined;
  return { collection, gallery };
}
