import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import { Zap, ArrowRight, CheckCircle2, Quote, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  heroStats,
  workflowSteps,
  stellarBenefits,
  services,
  testimonials,
  paymentComparison,
  partnerLogos,
} from "@/content/marketing";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <section className="relative min-h-[88vh] overflow-hidden bg-background flex items-center">
          {/* Hero background image */}
          <Image
            src="/images/hero.jpg"
            alt="Cargo ship at sea"
            fill
            priority
            className="object-cover object-center"
          />
          {/* dark overlay + orange radial glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,hsl(24_90%_53%_/_0.18),transparent_50%)]" />

          <div className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-20 md:px-6 md:pb-32 md:pt-28">
            <div className="mx-auto max-w-4xl text-center">
              <Badge variant="stellar" className="mb-6 inline-flex gap-1.5 px-3 py-1 text-xs">
                <Zap className="h-3 w-3" />
                Now live on the Stellar Network
              </Badge>

              <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
                Global Freight.{" "}
                <span className="gradient-text">Instant Payments.</span>
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-white/80 md:text-xl">
                Trustway Logistics combines enterprise-grade shipment management with{" "}
                <strong className="text-white">Stellar blockchain payments</strong> — delivering
                5-second settlement, near-zero fees, and smart-contract escrow for every cargo
                movement worldwide.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link href={"/track" as Route}>
                  <Button size="lg" className="gap-2">
                    Track Your Shipment
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href={"/why-stellar" as Route}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                  >
                    Why Stellar?
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
                {heroStats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-white/20 bg-black/30 px-4 py-2.5 backdrop-blur-sm"
                  >
                    <span className="block text-lg font-bold text-white">{s.value}</span>
                    <span className="text-xs text-white/70">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Partners bar ── */}
        <section className="border-y border-border bg-muted/40">
          <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
            <p className="mb-4 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Trusted & Tested Partners
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {partnerLogos.map((p) => (
                <div key={p.alt} className="relative h-10 w-24 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0">
                  <Image src={p.src} alt={p.alt} fill className="object-contain" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it Works ── */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mb-12 text-center">
              <Badge variant="stellar" className="mb-4">Payment Flow</Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                From booking to delivery —{" "}
                <span className="gradient-text-stellar">all on-chain</span>
              </h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Every payment step is recorded on the Stellar ledger. No black box, no missing
                wire, no calls to the bank.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-4">
              {workflowSteps.map((step) => (
                <div key={step.step} className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-stellar/40 bg-stellar/10 text-stellar">
                    <span className="text-xl font-bold">{step.step}</span>
                  </div>
                  <Badge variant="outline" className="mb-3 text-[10px]">
                    {step.tag}
                  </Badge>
                  <h3 className="mb-2 font-semibold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Stellar Benefits ── */}
        <section className="bg-muted/30 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mb-12 text-center">
              <Badge variant="stellar" className="mb-4">The Stellar Advantage</Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Built for logistics from the ground up
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-muted-foreground md:text-lg">
                Every other payment rail was designed for retail or banking. Stellar was purpose-built
                for fast, cheap, borderless value transfer.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stellarBenefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <Card key={benefit.title} className="group p-6 transition-shadow hover:shadow-md hover:stellar-glow">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-stellar/10 ring-1 ring-stellar/20 text-stellar">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="mb-1 text-2xl font-bold">{benefit.stat}</div>
                    <div className="mb-3 text-xs text-muted-foreground">{benefit.statLabel}</div>
                    <h3 className="mb-2 font-semibold text-sm">{benefit.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {benefit.description}
                    </p>
                  </Card>
                );
              })}
            </div>

            <div className="mt-10 text-center">
              <Link href={"/why-stellar" as Route}>
                <Button variant="outline" className="gap-2">
                  Full Stellar story <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Comparison Table ── */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-4 md:px-6">
            <div className="mb-10 text-center">
              <Badge variant="stellar" className="mb-4">Traditional vs Stellar</Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                The numbers don&apos;t lie
              </h2>
            </div>

            <div className="overflow-hidden rounded-xl border border-border">
              <div className="grid grid-cols-3 border-b border-border bg-muted/50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span>Category</span>
                <span className="text-center">Traditional</span>
                <span className="text-center text-stellar">Stellar</span>
              </div>
              {paymentComparison.map((row, i) => (
                <div
                  key={row.category}
                  className={`grid grid-cols-3 px-4 py-3.5 text-sm ${i % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                >
                  <span className="font-medium">{row.category}</span>
                  <span className="text-center text-muted-foreground">{row.traditional}</span>
                  <span className="text-center font-medium text-stellar">{row.stellar}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services Grid ── */}
        <section className="bg-muted/30 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mb-12 text-center">
              <Badge variant="outline" className="mb-4">What We Ship</Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Every freight mode. One payment rail.
              </h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Whether it&apos;s a container ship or a courier envelope, every Trustway shipment
                settles on Stellar.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {services.slice(0, 8).map((svc) => (
                <Card
                  key={svc.title}
                  className="overflow-hidden p-0 transition-all hover:shadow-md hover:border-stellar/30"
                >
                  {/* service photo */}
                  <div className="relative h-36 w-full">
                    <Image
                      src={svc.image}
                      alt={svc.alt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {svc.highlight && (
                      <Badge variant="success" className="absolute left-3 top-3 text-[10px]">
                        {svc.highlight}
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="mb-1 font-semibold text-sm">{svc.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground line-clamp-3">
                      {svc.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link href={"/services" as Route}>
                <Button className="gap-2">
                  View all services <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mb-12 text-center">
              <Badge variant="outline" className="mb-4">From Our Customers</Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Heard around the world
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <Card key={t.name} className="flex flex-col p-6">
                  <Quote className="mb-4 h-5 w-5 text-stellar/60" />
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <Separator className="my-4" />
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.title}</p>
                  <p className="mt-1 text-xs">{t.country}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative overflow-hidden bg-foreground py-20 md:py-28 dark:bg-card">
          <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-10" />
          <div className="pointer-events-none absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-stellar/10 to-transparent" />

          <div className="relative mx-auto max-w-3xl px-4 text-center md:px-6">
            <Badge variant="stellar" className="mb-6">
              <Zap className="h-3 w-3" />
              Start shipping on Stellar today
            </Badge>

            <h2 className="text-3xl font-bold tracking-tight text-background md:text-5xl dark:text-foreground">
              Ship globally without the banking tax.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-background/70 dark:text-muted-foreground">
              Every day you wait is another 3–8% lost to bank fees and 3-day payment delays stalling
              your operations. Join the logistics operators already moving freight on Stellar.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href={"/track" as Route}>
                <Button
                  size="lg"
                  className="gap-2 bg-background text-foreground hover:bg-background/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
                >
                  Track a Shipment <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={"/why-stellar" as Route}>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-background/30 text-background hover:bg-background/10 dark:border-border dark:text-foreground dark:hover:bg-muted"
                >
                  Read Our Stellar Story
                </Button>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-background/60 dark:text-muted-foreground">
              {["No credit card required", "USDC & XLM accepted", "180+ countries", "Soroban escrow on every order"].map(
                (item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-stellar" />
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
