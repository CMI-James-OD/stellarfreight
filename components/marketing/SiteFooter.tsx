import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import { Zap, Globe, Twitter, Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  Platform: [
    { label: "Track Shipment", href: "/track" },
    { label: "Our Services", href: "/services" },
    { label: "Pricing", href: "/services" },
    { label: "Parcel Guide", href: "/parcel" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/team" },
    { label: "Support", href: "/support" },
    { label: "Policy", href: "/policy" },
  ],
  Stellar: [
    { label: "Why Stellar", href: "/why-stellar" },
    { label: "Trust Center", href: "/trust-center" },
    { label: "FAQs", href: "/faqs" },
    { label: "Stellar.org", href: "https://stellar.org", external: true },
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-6">
        {/* Top row */}
        <div className="grid gap-10 md:grid-cols-5">
          {/* Brand column */}
          <div className="md:col-span-2">
            <Link href={"/" as Route} className="flex items-center gap-2.5 w-fit">
              <div className="relative h-8 w-8 shrink-0">
                <Image src="/images/logo-color.svg" alt="Trustway Freight logo" fill className="object-contain" />
              </div>
              <span className="text-base font-semibold">
                Trustway<span className="text-stellar"> Freight</span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
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
                180+ Countries
              </Badge>
            </div>

            <div className="mt-5 flex gap-3">
              <a
                href="https://twitter.com/stellarorg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-stellar/40 hover:text-stellar"
              >
                <Twitter className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-stellar/40 hover:text-stellar"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
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
                        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <Link
                        href={link.href as Route}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
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

        <Separator className="my-8" />

        {/* Bottom row */}
        <div className="flex flex-col items-start justify-between gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Trustway Freight. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-stellar animate-pulse" />
            <span>Stellar mainnet — live payments</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
