"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteContent } from "@/lib/data/site-content";

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <footer className="border-t border-border/50 py-8 px-6">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
        <p>&copy; {new Date().getFullYear()} {siteContent.name}</p>
        <div className="flex items-center gap-6">
          <a
            href={siteContent.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Instagram
          </a>
          <a
            href={`mailto:${siteContent.email}`}
            className="hover:text-foreground transition-colors"
          >
            {siteContent.email}
          </a>
          <Link
            href="/contact"
            className="hover:text-foreground transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
