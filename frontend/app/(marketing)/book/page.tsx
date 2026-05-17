import type { Metadata } from "next";
import { Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { HeroImageBackdrop } from "@/components/marketing/PagePattern";
import { BookingFlow } from "./BookingFlow";

export const metadata: Metadata = {
  title: "Book a Shipment",
  description:
    "Book your cross-border freight with StellarFreight. Pay via Stellar USDC or XLM and get instant dispatch confirmation.",
};

export default function BookPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border dark:border-white/[0.07] bg-background py-16 md:py-20">
        <HeroImageBackdrop
          src="/images/page-heroes/cargo-neutral.jpg"
          alt="Cargo ready for dispatch"
        />
        <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <Badge variant="stellar" className="mb-4 gap-1.5">
            <Zap className="h-3 w-3" />
            Stellar-Powered Booking
          </Badge>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight md:text-5xl">
            Book a Shipment
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Submit your cargo details, pay instantly via the Stellar network, and your shipment is
            cleared for dispatch the moment payment confirms on-chain.
          </p>
        </div>
      </section>

      {/* Interactive booking flow (client component) */}
      <BookingFlow />
    </main>
  );
}
