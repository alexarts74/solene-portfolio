import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { collections, getCollection } from "@/lib/data/collections";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

interface Props {
  params: Promise<{ collection: string }>;
}

export async function generateStaticParams() {
  return collections.map((c) => ({ collection: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { collection: slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};
  return {
    title: collection.title,
    description: `${collection.title} — photography by Solenne Brianchon.`,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { collection: slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="mx-auto max-w-7xl">
        <AnimateOnScroll animation="animate-fade-up">
          <h1 className="text-2xl font-light tracking-wide text-center mb-12">
            {collection.title}
          </h1>
        </AnimateOnScroll>

        <div className="space-y-16">
          {collection.galleries.map((gallery, i) => (
            <AnimateOnScroll key={gallery.slug} animation="animate-fade-up" delay={i * 100}>
            <Link
              key={gallery.slug}
              href={`/collections/${collection.slug}/${gallery.slug}`}
              className="block group"
            >
              <h2 className="text-lg font-light text-muted group-hover:text-foreground transition-colors mb-4">
                {gallery.title}
                <span className="text-sm text-muted/50 ml-3">
                  {gallery.photos.length} photos
                </span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {gallery.photos.slice(0, 4).map((photo) => (
                  <div
                    key={photo.src}
                    className="relative aspect-square overflow-hidden rounded-sm"
                  >
                    <Image
                      src={photo.thumbSrc}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      placeholder={photo.blurDataURL ? "blur" : "empty"}
                      blurDataURL={photo.blurDataURL}
                    />
                  </div>
                ))}
              </div>
            </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
}
