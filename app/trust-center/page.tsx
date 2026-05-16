import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { ShieldCheck, Lock, Eye, FileText, ArrowRight, Zap } from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Trust Center",
  description:
    "How Trustway Logistics protects your payments, data, and shipments using the Stellar blockchain and Soroban smart contracts.",
};

const trustPillars = [
  {
    icon: ShieldCheck,
    title: "Soroban Smart Escrow",
    description:
      "Every payment is held in a Soroban smart contract on the Stellar blockchain. Funds cannot be released until a verified delivery event is recorded. No human can override this — it&apos;s code, not policy.",
    detail: "Smart contract address is disclosed at booking time. You can verify the escrow on the Stellar ledger independently.",
  },
  {
    icon: Eye,
    title: "Full On-Chain Transparency",
    description:
      "Every transaction — booking confirmation, payment lock, delivery event, fund release — is recorded on the Stellar public ledger. There&apos;s no Trustway-internal database you have to trust.",
    detail: "Payment hashes are available in your shipment dashboard and via the public Stellar horizon API.",
  },
  {
    icon: Lock,
    title: "Non-Custodial Architecture",
    description:
      "We never hold your funds. Payments go directly into the Soroban escrow contract. We don&apos;t control private keys and we cannot access locked funds under any circumstances.",
    detail: "Our smart contracts are open source and audited by independent security researchers.",
  },
  {
    icon: FileText,
    title: "Verified-Only Claims",
    description:
      "We don&apos;t make unverifiable performance claims. Every statistic on this website — settlement time, fee costs, country coverage — can be independently verified on the Stellar network.",
    detail: "Settlement benchmarks are measured against live Stellar ledger data, not marketing estimates.",
  },
];

const securityPoints = [
  "SOC 2 Type II compliant data handling for all shipment records",
  "TLS 1.3 encryption on all API endpoints",
  "Stellar-based payment addresses rotated per shipment for privacy",
  "No plaintext storage of wallet addresses or payment references",
  "Supabase row-level security on all admin data access",
  "Incident response SLA: P0 acknowledged within 1 hour",
];

export default function TrustCenterPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="relative overflow-hidden border-b border-border bg-background py-16 md:py-24">
          <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-30" />
          <div className="pointer-events-none absolute right-0 -top-10 h-64 w-64 rounded-full bg-stellar/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 md:px-6">
            <Badge variant="stellar" className="mb-4 gap-1.5">
              <ShieldCheck className="h-3 w-3" />
              Trust Center
            </Badge>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
              You shouldn&apos;t have to trust us.{" "}
              <span className="gradient-text-stellar">You can verify us.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              The Stellar blockchain is our trust infrastructure. Every payment claim we make can
              be independently verified by anyone, anytime, on the public ledger.
            </p>
          </div>
        </section>

        {/* Trust pillars */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="mb-10 text-2xl font-bold md:text-3xl">
              How we protect every transaction
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {trustPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <Card key={pillar.title} className="p-6">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-stellar/10 text-stellar ring-1 ring-stellar/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-2 font-semibold">{pillar.title}</h3>
                    <p
                      className="mb-3 text-sm leading-relaxed text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: pillar.description.replace(/&apos;/g, "'") }}
                    />
                    <div className="rounded-md bg-muted/50 px-3 py-2.5 text-xs text-muted-foreground">
                      {pillar.detail}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Security checklist */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-4 md:px-6">
            <h2 className="mb-8 text-2xl font-bold md:text-3xl">Security practices</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {securityPoints.map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                  <Zap className="mt-0.5 h-4 w-4 shrink-0 text-stellar" />
                  <p className="text-sm text-muted-foreground">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Verify yourself */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4 md:px-6">
            <h2 className="mb-5 text-2xl font-bold md:text-3xl">Verify any payment yourself</h2>
            <div className="rounded-xl border border-stellar/30 bg-stellar/5 p-6">
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                Every Trustway shipment payment has an associated Stellar transaction hash. You
                can paste that hash into any Stellar block explorer — Stellar Expert, Horizon API,
                or Stellar Laboratory — and see the exact payment state, escrow contract, and
                delivery event yourself.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We welcome this. Our goal is to build a logistics platform where trust is earned
                through verifiability, not just through promises.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="https://stellar.expert"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-stellar/30 bg-background px-3 py-1.5 text-xs font-medium text-stellar transition-colors hover:bg-stellar/10"
                >
                  Stellar Expert ↗
                </a>
                <a
                  href="https://horizon.stellar.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Horizon API ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-2xl px-4 text-center md:px-6">
            <h2 className="text-2xl font-bold md:text-3xl">
              Questions about how we protect your payments?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Our team is happy to walk through the smart contract architecture in detail.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href={"/support" as Route}>
                <Button className="gap-2">
                  Contact Security Team <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={"/why-stellar" as Route}>
                <Button variant="outline">Read the Full Stellar Story</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
