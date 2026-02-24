import type { Metadata } from "next";
import { siteContent } from "@/lib/data/site-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Solenne Brianchon — French photographer based in Paris.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-light tracking-wide text-center mb-12">
          About
        </h1>

        <div className="space-y-6">
          {siteContent.bio.map((p, i) => (
            <p
              key={i}
              className={`text-sm leading-relaxed ${
                i === 0 ? "text-foreground text-base" : "text-muted"
              }`}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
