import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prints, getPrint } from "@/lib/data/prints";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return prints.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const print = getPrint(slug);
  if (!print) return {};
  return {
    title: `${print.title} — Print`,
    description: print.description,
  };
}

export default async function PrintDetailPage({ params }: Props) {
  const { slug } = await params;
  const print = getPrint(slug);
  if (!print) notFound();

  const contactSubject = encodeURIComponent(
    `Print inquiry: ${print.title}`
  );

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/prints"
          className="text-sm text-muted hover:text-foreground transition-colors"
        >
          &larr; All prints
        </Link>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
            <Image
              src={print.photo}
              alt={print.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-light tracking-wide">
              {print.title}
            </h1>
            <p className="text-sm text-muted mt-4 leading-relaxed">
              {print.description}
            </p>

            <div className="mt-8 space-y-3 text-sm">
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span className="text-muted">Format</span>
                <span className="text-foreground">{print.format}</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span className="text-muted">Paper</span>
                <span className="text-foreground">{print.paper}</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span className="text-muted">Edition</span>
                <span className="text-foreground">{print.edition}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-muted">Price</span>
                <span className="text-foreground text-lg">
                  {print.price}&nbsp;&euro;
                </span>
              </div>
            </div>

            <Link
              href={`/contact?subject=${contactSubject}`}
              className="mt-8 block text-center py-3 text-sm tracking-wide uppercase bg-foreground text-background rounded-sm hover:bg-accent transition-colors"
            >
              Contact to purchase
            </Link>

            <p className="text-xs text-muted/60 mt-4 text-center">
              Payment by bank transfer or PayPal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
