import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, Zap, Globe, ShieldCheck, Users } from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "About",
  description:
    "Trustway Freight is a Stellar-powered logistics platform on a mission to eliminate the friction of cross-border freight payments.",
};

const values = [
  {
    icon: Zap,
    title: "Speed above all",
    description:
      "Logistics runs on time. Payment delays kill deals, stall dispatches, and destroy trust. We built Stellar payments into our core because a 5-second confirmation is not a luxury — it's a requirement.",
  },
  {
    icon: Globe,
    title: "Borderless by design",
    description:
      "We believe a small business in Nairobi should access the same global shipping lanes as a Fortune 500 company in New York. Stellar's open network makes that possible without a bank account.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent by default",
    description:
      "Every payment on our platform is recorded on the Stellar ledger. You don't have to trust us — you can verify every transaction yourself, any time.",
  },
  {
    icon: Users,
    title: "Built for operators",
    description:
      "We're built by people who've worked in freight and felt the pain of wire transfers, SWIFT delays, and unexplained fee deductions. This platform is what we wish had existed.",
  },
];

const milestones = [
  { year: "2022", event: "Founded with a mission to modernise cross-border freight payments." },
  { year: "2023", event: "Launched first Stellar payment integration for ocean freight clients." },
  {
    year: "2024",
    event: "Deployed Soroban smart-contract escrow for automatic payment release on delivery.",
  },
  {
    year: "2025",
    event: "Reached 2.4M+ processed shipments across 180 countries on the Stellar network.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-background py-16 md:py-24">
          <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-30" />
          <div className="pointer-events-none absolute -top-20 right-1/3 h-64 w-64 rounded-full bg-stellar/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 md:px-6">
            <Badge variant="stellar" className="mb-4 gap-1.5">
              Our Story
            </Badge>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
              We started because freight payments{" "}
              <span className="gradient-text">were broken.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              International shipping is one of the oldest industries on earth. Its payment
              infrastructure — SWIFT wires, correspondent banks, hidden FX markups — was designed in
              the 1970s. We built Trustway to change that, with Stellar at the centre.
            </p>
          </div>
        </section>

        {/* Visual banner */}
        <section className="relative h-56 md:h-72 w-full overflow-hidden">
          <Image
            src="/images/whychooseus.jpg"
            alt="Cargo logistics operations"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-center text-2xl font-bold text-white md:text-4xl">
              Built by freight operators, for freight operators.
            </p>
          </div>
        </section>

        {/* The problem we solve */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-4 md:px-6">
            <h2 className="text-2xl font-bold md:text-3xl">The problem we set out to solve</h2>
            <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed">
              <p>
                When a shipper in Lagos books a container to Rotterdam, they face a payment journey
                that involves multiple banks, 3–5 business days of clearing time, fees that eat
                3–8% of the transaction value, and zero transparency into where the money is at
                any given moment.
              </p>
              <p>
                Meanwhile the cargo sits at the port waiting for &quot;payment confirmation&quot;.
                The carrier won&apos;t release until funds arrive. The shipper has already paid but
                can&apos;t prove it fast enough. Deals fall apart. Relationships break down.
              </p>
              <p>
                Smaller businesses suffer most. They can&apos;t negotiate better SWIFT rates. They
                don&apos;t have USD bank accounts. They&apos;re effectively locked out of global
                trade finance.
              </p>
              <p className="font-medium text-foreground">
                This is the problem Trustway was built to solve — using the Stellar network as our
                payment foundation.
              </p>
            </div>
          </div>
        </section>

        <Separator />

        {/* Values */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="mb-10 text-2xl font-bold md:text-3xl">What we stand for</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <Card key={v.title} className="p-6">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-stellar/10 text-stellar ring-1 ring-stellar/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-2 font-semibold">{v.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{v.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4 md:px-6">
            <h2 className="mb-10 text-2xl font-bold md:text-3xl">Milestones</h2>
            <div className="space-y-6">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stellar/10 text-xs font-bold text-stellar ring-1 ring-stellar/30">
                      {m.year.slice(2)}
                    </div>
                    {i < milestones.length - 1 && (
                      <div className="mt-1 w-px flex-1 bg-border" />
                    )}
                  </div>
                  <div className="pb-6">
                    <span className="text-xs font-medium text-muted-foreground">{m.year}</span>
                    <p className="mt-1 text-sm leading-relaxed">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-2xl px-4 text-center md:px-6">
            <h2 className="text-2xl font-bold md:text-3xl">
              Join the movement to better freight payments
            </h2>
            <p className="mt-3 text-muted-foreground">
              Explore our Stellar integration or reach out to our team.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href={"/why-stellar" as Route}>
                <Button className="gap-2">
                  Why Stellar <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={"/support" as Route}>
                <Button variant="outline">Get in Touch</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
