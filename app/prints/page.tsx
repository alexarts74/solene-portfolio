import type { Metadata } from "next";
import { prints } from "@/lib/data/prints";
import PrintCard from "@/components/ui/PrintCard";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import AnimateGrid from "@/components/ui/AnimateGrid";

export const metadata: Metadata = {
  title: "Prints",
  description:
    'Fine art prints from the "Ecume" collection by Solenne Brianchon.',
};

export default function PrintsPage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <AnimateOnScroll animation="animate-fade-up" className="mx-auto max-w-3xl text-center mb-12">
        <h1 className="text-2xl font-light tracking-wide mb-4">Prints</h1>
        <p className="text-sm text-muted leading-relaxed">
          A selection of fine art prints from the &ldquo;Ecume&rdquo;
          collection. Each print is a unique edition, printed on Hahnemühle fine
          art paper. For custom formats and framing options, please{" "}
          <a
            href="/contact"
            className="text-foreground underline underline-offset-4"
          >
            contact me
          </a>
          .
        </p>
      </AnimateOnScroll>

      <AnimateGrid
        animation="animate-fade-up"
        staggerMs={100}
        className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
      >
        {prints.map((print) => (
          <PrintCard key={print.slug} print={print} />
        ))}
      </AnimateGrid>
    </div>
  );
}
