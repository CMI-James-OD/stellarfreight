import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, Zap, CheckCircle2, ExternalLink, ShieldCheck, Lock, Eye, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { HeroImageBackdrop } from "@/components/marketing/PagePattern";
import {
  paymentComparison,
  paymentFlow,
  technicalIntegration,
  roadmapItems,
  stellarBenefits,
} from "@/content/marketing";

export const metadata: Metadata = {
  title: "Why Stellar",
  description:
    "The detailed case for why StellarFreight chose Stellar as its payment backbone — speed, cost, financial inclusion, and Soroban smart contracts.",
};

const inclusionPoints = [
  "Many businesses remain underserved by traditional banking rails — Stellar requires only a wallet address",
  "Small logistics operators in emerging markets gain access to global shipping lanes",
  "No correspondent bank required for cross-border settlement",
  "Local fiat on-ramps via Stellar anchors bring any currency onto the network",
  "Mobile-first wallets work in regions with limited banking infrastructure",
];

export default function WhyStellarPage() {
  return (
    <>
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border dark:border-white/[0.07] bg-background py-16 md:py-24">
          <HeroImageBackdrop src="/images/page-heroes/cargo-neutral.jpg" alt="Cargo vessel representing cross-border freight settlement" />
          <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-30" />
          <div className="pointer-events-none absolute -top-20 left-1/3 h-80 w-80 rounded-full bg-stellar/15 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-1/2 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 md:px-6">
            <Badge variant="stellar" className="mb-4 gap-1.5">
              <Zap className="h-3 w-3" />
              Our Payment Philosophy
            </Badge>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
              We didn&apos;t pick Stellar because it&apos;s crypto.
              <br />
              <span className="gradient-text-stellar">
                We picked it because it works.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              StellarFreight is running cross-border shipment workflows in pilot operations. Stellar
              helps remove traditional payment bottlenecks and improves operational visibility.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={"/track" as Route}>
                <Button className="gap-2">
                  Ship with Stellar <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="https://stellar.org" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                  Stellar.org <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* The story */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="text-2xl font-bold md:text-3xl">The honest reason we chose Stellar</h2>
            <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed">
              <p>
                When we started evaluating payment rails for cross-border logistics, we looked at
                traditional options first: SWIFT, local bank integrations, FX aggregators. The
                verdict was unanimous — they were all too slow, too expensive, and too opaque.
              </p>
              <p>
                We then looked at general-purpose blockchains. They were fast in theory but
                unpredictable in fee cost. A $50 transaction fee during network congestion is
                unacceptable when you&apos;re processing thousands of freight payments a day.
              </p>
              <p>
                Stellar was different. It was designed from the ground up as an open, low-cost
                financial infrastructure for moving value globally. Its consensus protocol achieves
                rapid finality with predictable low transaction costs.
                It has a thriving anchor ecosystem for fiat on/off ramps. It has Soroban — a
                production-ready smart contract platform built directly into the network.
              </p>
              <p className="font-medium text-foreground">
                That&apos;s not a blockchain pitch. That&apos;s an engineering decision. Stellar is
                simply the best tool for this job.
              </p>
            </div>
          </div>
        </section>

        <Separator />

        {/* Benefits detail */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="mb-10 text-center text-2xl font-bold md:text-3xl">
              What Stellar delivers, quantified
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stellarBenefits.map((b) => {
                const Icon = b.icon;
                return (
                  <Card key={b.title} className="p-6 hover:stellar-glow transition-shadow">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-stellar/10 text-stellar ring-1 ring-stellar/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="mb-1 text-3xl font-bold gradient-text-stellar">{b.stat}</div>
                    <div className="mb-3 text-xs text-muted-foreground">{b.statLabel}</div>
                    <h3 className="mb-2 font-semibold">{b.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{b.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
              Traditional banking vs Stellar: the comparison
            </h2>
            <div className="overflow-hidden rounded-xl border border-border dark:border-white/[0.07]">
              <div className="grid grid-cols-3 divide-x divide-border border-b border-border dark:border-white/[0.07] bg-muted/50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span>Category</span>
                <span className="text-center">Traditional</span>
                <span className="text-center text-stellar">Stellar Network</span>
              </div>
              {paymentComparison.map((row, i) => (
                <div
                  key={row.category}
                  className={`grid grid-cols-3 divide-x divide-border px-4 py-4 text-sm ${
                    i % 2 === 0 ? "bg-background" : "bg-muted/20"
                  } border-b border-border`}
                >
                  <span className="font-medium">{row.category}</span>
                  <span className="text-center text-muted-foreground">{row.traditional}</span>
                  <span className="text-center font-medium text-stellar">{row.stellar}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Payment flow */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="mb-3 text-2xl font-bold md:text-3xl">
              How a StellarFreight payment flows on Stellar
            </h2>
            <p className="mb-8 text-muted-foreground">
              End-to-end from booking to delivery, entirely on-chain.
            </p>
            <ol className="space-y-4">
              {paymentFlow.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stellar/10 text-xs font-bold text-stellar ring-1 ring-stellar/30">
                    {i + 1}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Technical integration */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mb-10">
              <Badge variant="stellar" className="mb-3">Technical Stack</Badge>
              <h2 className="text-2xl font-bold md:text-3xl">
                Stellar primitives we use
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                We don&apos;t use Stellar as a simple payment address. We use the full breadth of
                the protocol.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {technicalIntegration.map((tech) => (
                <Card key={tech.title} className="p-6">
                  <h3 className="mb-2 font-semibold text-stellar">{tech.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {tech.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Financial inclusion */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Badge variant="stellar" className="mb-4">Financial Inclusion</Badge>
            <h2 className="mb-3 text-2xl font-bold md:text-3xl">
              Opening global trade to the unbanked
            </h2>
            <p className="mb-8 text-muted-foreground leading-relaxed">
              Stellar&apos;s mission is to connect people to low-cost financial services regardless
              of where they are. That mission aligns perfectly with what we&apos;re trying to do in
              logistics. Here&apos;s what it means in practice:
            </p>
            <ul className="space-y-3">
              {inclusionPoints.map((point) => (
                <li key={point} className="flex gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-stellar" />
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Security & Trust */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Badge variant="stellar" className="mb-4 gap-1.5">
              <ShieldCheck className="h-3 w-3" />
              Security &amp; Trust
            </Badge>
            <h2 className="mb-3 text-2xl font-bold md:text-3xl">
              You shouldn&apos;t have to trust us.{" "}
              <span className="gradient-text-stellar">You can verify us.</span>
            </h2>
            <p className="mb-10 max-w-2xl text-muted-foreground">
              The Stellar blockchain is our trust infrastructure. Every payment claim we make can be
              independently verified by anyone, anytime, on the public ledger.
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              {[
                {
                  Icon: ShieldCheck,
                  title: "Soroban Smart Escrow",
                  description:
                    "Every payment is held in a Soroban smart contract on the Stellar blockchain. Funds cannot be released until a verified delivery event is recorded. No human can override this — it's code, not policy.",
                  detail:
                    "Smart contract address is disclosed at booking time. You can verify the escrow on the Stellar ledger independently.",
                },
                {
                  Icon: Eye,
                  title: "Full On-Chain Transparency",
                  description:
                    "Every transaction — booking confirmation, payment lock, delivery event, fund release — is recorded on the Stellar public ledger. There's no StellarFreight-internal database you have to trust.",
                  detail:
                    "Payment hashes are available in your shipment dashboard and via the public Stellar Horizon API.",
                },
                {
                  Icon: Lock,
                  title: "Non-Custodial Architecture",
                  description:
                    "We never hold your funds. Payments go directly into the Soroban escrow contract. We don't control private keys and we cannot access locked funds under any circumstances.",
                  detail:
                    "Our smart contracts are open source and audited by independent security researchers.",
                },
                {
                  Icon: FileText,
                  title: "Verified-Only Claims",
                  description:
                    "We don't make unverifiable performance claims. Every metric on this website can be independently verified on the Stellar network.",
                  detail:
                    "Settlement benchmarks are measured against live Stellar ledger data, not marketing estimates.",
                },
              ].map(({ Icon, title, description, detail }) => (
                <Card key={title} className="p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-stellar/10 text-stellar ring-1 ring-stellar/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 font-semibold">{title}</h3>
                  <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
                  <div className="rounded-md bg-muted/50 px-3 py-2.5 text-xs text-muted-foreground">
                    {detail}
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-stellar/30 bg-stellar/5 p-6">
              <h3 className="mb-3 font-semibold">Verify any payment yourself</h3>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                Every StellarFreight shipment payment has an associated Stellar transaction hash. Paste it
                into any Stellar block explorer — Stellar Expert or the Horizon API — and see the exact
                payment state, escrow contract, and delivery event yourself.
              </p>
              <div className="flex flex-wrap gap-2">
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
                  className="inline-flex items-center gap-1.5 rounded-md border border-border dark:border-white/[0.07] bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Horizon API ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Badge variant="outline" className="mb-4">What&apos;s Next</Badge>
            <h2 className="mb-8 text-2xl font-bold md:text-3xl">Our Stellar roadmap</h2>

            <div className="space-y-4">
              {roadmapItems.map((item) => (
                <div
                  key={item.quarter}
                  className={`rounded-xl border p-5 ${
                    item.done
                      ? "border-stellar/30 bg-stellar/5"
                      : "border-border dark:border-white/[0.07] bg-card"
                  }`}
                >
                  <div className="mb-1 flex items-center gap-2">
                    <Badge variant={item.done ? "stellar" : "outline"} className="text-[10px]">
                      {item.quarter}
                    </Badge>
                    {item.done && (
                      <Badge variant="success" className="text-[10px]">Shipped</Badge>
                    )}
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 text-center md:px-6">
            <h2 className="text-2xl font-bold md:text-3xl">
              Convinced? Let&apos;s move some freight.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Your first Stellar-settled shipment is one tracking code away.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href={"/track" as Route}>
                <Button className="gap-2">
                  Track a Shipment <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={"/contact" as Route}>
                <Button variant="outline">Get in Touch</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}





