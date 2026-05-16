import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import { ArrowRight, Zap } from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { services, coreBenefits } from "@/content/marketing";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Trucking, air freight, ocean freight, courier, warehousing and more — all powered by Stellar blockchain payments.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="relative overflow-hidden border-b border-border bg-background py-16 md:py-24">
          <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-30" />
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-stellar/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 md:px-6">
            <Badge variant="stellar" className="mb-4 gap-1.5">
              <Zap className="h-3 w-3" />
              Stellar-Powered
            </Badge>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
              Every freight mode.{" "}
              <span className="gradient-text">One payment rail.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              From a single parcel to a full container ship, every Trustway shipment settles via
              the Stellar network — instantly, cheaply, and with full on-chain visibility.
            </p>
          </div>
        </section>

        {/* Services grid */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {services.map((svc) => (
                <Card
                  key={svc.title}
                  className="overflow-hidden p-0 flex flex-col transition-all hover:shadow-md hover:border-stellar/30"
                >
                  <div className="relative h-44 w-full shrink-0">
                    <Image src={svc.image} alt={svc.alt} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {svc.highlight && (
                      <Badge variant="success" className="absolute left-3 top-3 text-[10px]">
                        {svc.highlight}
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-2 font-semibold">{svc.title}</h3>
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                      {svc.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-xs font-medium text-stellar">
                      <Zap className="h-3 w-3" />
                      Stellar payments accepted
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Stellar callout */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                What Stellar payment means for your freight
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {coreBenefits.map((b) => (
                <Card key={b.title} className="p-6">
                  <h3 className="mb-3 font-semibold text-stellar">{b.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{b.body}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-2xl px-4 text-center md:px-6">
            <h2 className="text-2xl font-bold md:text-3xl">Ready to ship?</h2>
            <p className="mt-3 text-muted-foreground">
              Get a quote and pay with USDC or XLM in seconds.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href={"/track" as Route}>
                <Button className="gap-2">
                  Track Existing Shipment <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={"/support" as Route}>
                <Button variant="outline">Contact Support</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
