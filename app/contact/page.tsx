import type { Metadata } from "next";
import { Suspense } from "react";
import { siteContent } from "@/lib/data/site-content";
import ContactForm from "@/components/ui/ContactForm";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Solenne Brianchon for photography projects and collaborations.",
};

export default function ContactPage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="mx-auto max-w-lg">
        <AnimateOnScroll animation="animate-fade-up">
          <h1 className="text-2xl font-light tracking-wide text-center mb-4">
            {siteContent.contact.heading}
          </h1>
          <p className="text-sm text-muted text-center mb-12">
            {siteContent.contact.description}
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll animation="animate-fade-up" delay={100}>
          <Suspense>
            <ContactForm />
          </Suspense>
        </AnimateOnScroll>

        <AnimateOnScroll animation="animate-fade-in" delay={200}>
          <div className="mt-16 pt-8 border-t border-border/50 flex flex-col items-center gap-3 text-sm text-muted">
            <a
              href={siteContent.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Instagram — {siteContent.instagramHandle}
            </a>
            <a
              href={`mailto:${siteContent.email}`}
              className="hover:text-foreground transition-colors"
            >
              {siteContent.email}
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  );
}
