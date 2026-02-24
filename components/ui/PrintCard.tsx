import Image from "next/image";
import Link from "next/link";
import type { Print } from "@/lib/types";

export default function PrintCard({ print }: { print: Print }) {
  return (
    <Link
      href={`/prints/${print.slug}`}
      className="group block"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
        <Image
          src={print.photo}
          alt={print.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-light text-foreground">{print.title}</h3>
        <p className="text-sm text-muted mt-1">
          {print.format} — {print.price}&nbsp;&euro;
        </p>
      </div>
    </Link>
  );
}
