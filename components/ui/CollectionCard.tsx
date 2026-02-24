import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/lib/types";

export default function CollectionCard({
  collection,
}: {
  collection: Collection;
}) {
  const totalPhotos = collection.galleries.reduce(
    (acc, g) => acc + g.photos.length,
    0
  );

  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-sm"
    >
      {collection.coverPhoto ? (
        <Image
          src={collection.coverPhoto}
          alt={collection.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <div className="absolute inset-0 bg-border" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h2 className="text-xl font-light tracking-wide text-white">
          {collection.title}
        </h2>
        <p className="text-sm text-white/60 mt-1">
          {totalPhotos} photos
        </p>
      </div>
    </Link>
  );
}
