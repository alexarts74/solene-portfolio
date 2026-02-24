import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { collections, getGallery } from "@/lib/data/collections";
import PhotoGrid from "@/components/ui/PhotoGrid";

interface Props {
  params: Promise<{ collection: string; gallery: string }>;
}

export async function generateStaticParams() {
  const params: { collection: string; gallery: string }[] = [];
  for (const c of collections) {
    for (const g of c.galleries) {
      params.push({ collection: c.slug, gallery: g.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { collection: cSlug, gallery: gSlug } = await params;
  const result = getGallery(cSlug, gSlug);
  if (!result) return {};
  return {
    title: `${result.gallery.title} — ${result.collection.title}`,
    description: `${result.gallery.title} photography by Solenne Brianchon.`,
  };
}

export default async function GalleryPage({ params }: Props) {
  const { collection: cSlug, gallery: gSlug } = await params;
  const result = getGallery(cSlug, gSlug);
  if (!result) notFound();

  const { collection, gallery } = result;

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <Link
            href={`/collections/${collection.slug}`}
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            &larr; {collection.title}
          </Link>
        </div>

        <h1 className="text-2xl font-light tracking-wide mb-2">
          {gallery.title}
        </h1>
        <p className="text-sm text-muted mb-8">
          {gallery.photos.length} photos
        </p>

        <PhotoGrid photos={gallery.photos} />
      </div>
    </div>
  );
}
