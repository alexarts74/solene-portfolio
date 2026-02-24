import type { Metadata } from "next";
import { collections } from "@/lib/data/collections";
import { siteContent } from "@/lib/data/site-content";
import CollectionCard from "@/components/ui/CollectionCard";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import AnimateGrid from "@/components/ui/AnimateGrid";

export const metadata: Metadata = {
  title: "Collections",
  description: "Photography collections by Solenne Brianchon.",
};

export default function CollectionsPage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="mx-auto max-w-3xl text-center mb-16">
        {siteContent.artistStatement.map((p, i) => (
          <AnimateOnScroll key={i} animation="animate-fade-up" delay={i * 80}>
            <p
              className={`text-sm leading-relaxed text-muted ${
                i === 0 ? "text-foreground italic text-base" : "mt-4"
              }`}
            >
              {p}
            </p>
          </AnimateOnScroll>
        ))}
      </div>

      <AnimateGrid
        animation="animate-fade-up"
        staggerMs={120}
        className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {collections.map((collection) => (
          <CollectionCard key={collection.slug} collection={collection} />
        ))}
      </AnimateGrid>
    </div>
  );
}
