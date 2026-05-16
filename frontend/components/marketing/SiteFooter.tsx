import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import { Zap, Globe, Twitter, Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  Platform: [
    { label: "Track Shipment", href: "/track" },
    { label: "Book a Shipment", href: "/book" },
    { label: "Services", href: "/services" },
    { label: "Contact & Quotes", href: "/contact" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Team", href: "/team" },
    { label: "Policy", href: "/policy" },
    { label: "FAQs", href: "/faqs" },
  ],
  Stellar: [
    { label: "Why Stellar", href: "/why-stellar" },
    { label: "Support", href: "/support" },
    { label: "Stellar.org", href: "https://stellar.org", external: true },
  ],
};

export function SiteFooter() {
  return (
    <footer className="relative h-auto border-t border-border bg-primary text-white transition-colors duration-500 md:h-[60vh] md:[clip-path:polygon(0%_0,100%_0%,100%_100%,0_100%)]">
      <div
        className="relative h-auto w-full md:fixed md:bottom-0 md:h-[60vh]"
        style={{
          backgroundImage: "url(/images/footer-pattern.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-black/60" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 md:px-6">
        {/* Top row */}
        <div className="grid gap-10 md:grid-cols-5">
          {/* Brand column */}
          <div className="md:col-span-2">
            <Link href={"/" as Route} className="flex items-center gap-2.5 w-fit">
              <div className="relative h-8 w-8 shrink-0">
                <Image src="/images/logo-color.svg" alt="StellarFreight logo" fill className="object-contain" />
              </div>
              <span className="text-base font-semibold">
                Stellar<span className="text-stellar">Freight</span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-300">
              Enterprise logistics powered by the Stellar blockchain. Ship globally,
              settle instantly, pay nothing in fees.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Badge variant="stellar" className="gap-1.5">
                <Zap className="h-3 w-3" />
                Stellar Network
              </Badge>
              <Badge variant="outline" className="gap-1.5">
                <Globe className="h-3 w-3" />
                Cross-Border Ready
              </Badge>
            </div>

            <div className="mt-5 flex gap-3">
              <a
                href="https://twitter.com/stellarorg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/20 text-zinc-300 transition-colors hover:border-white/40 hover:text-white"
              >
                <Twitter className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/20 text-zinc-300 transition-colors hover:border-white/40 hover:text-white"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-300">
                {group}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-zinc-300 transition-colors hover:text-white"
                      >
                        {link.label}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <Link
                        href={link.href as Route}
                        className="text-sm text-zinc-300 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-white/15" />

        {/* Bottom row */}
        <div className="flex flex-col items-start justify-between gap-4 text-xs text-zinc-300 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} StellarFreight. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-stellar animate-pulse" />
            <span>Stellar-integrated payment workflow</span>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}


