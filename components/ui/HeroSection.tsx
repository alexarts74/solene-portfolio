import { siteContent } from "@/lib/data/site-content";

export default function HeroSection() {
  return (
    <section className="relative flex h-screen items-center justify-center px-6 overflow-hidden">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.2em] uppercase text-foreground">
          {siteContent.name}
        </h1>
        <p className="mt-4 text-sm sm:text-base tracking-[0.15em] text-muted uppercase">
          {siteContent.subtitle}
        </p>
        <p className="mt-2 text-sm tracking-wide text-muted/70">
          {siteContent.tagline}
        </p>
      </div>
    </section>
  );
}
