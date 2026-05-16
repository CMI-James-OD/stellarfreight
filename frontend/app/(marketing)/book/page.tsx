import type { Metadata } from "next";
import { Zap, Package, CreditCard, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { HeroImageBackdrop } from "@/components/marketing/PagePattern";

export const metadata: Metadata = {
  title: "Book a Shipment",
  description: "Book your cross-border freight with StellarFreight. Pay via Stellar USDC or XLM and get instant dispatch confirmation.",
};

const steps = [
  { step: 1, label: "Cargo Details", icon: Package },
  { step: 2, label: "Stellar Payment", icon: CreditCard },
  { step: 3, label: "Confirmation", icon: CheckCircle2 },
];

export default function BookPage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-border dark:border-white/[0.07] bg-background py-16 md:py-20">
        <HeroImageBackdrop src="/images/page-heroes/cargo-neutral.jpg" alt="Cargo ready for dispatch" />
        <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <Badge variant="stellar" className="mb-4 gap-1.5"><Zap className="h-3 w-3" />Stellar-Powered Booking</Badge>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight md:text-5xl">Book a Shipment</h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">Submit your cargo details, pay instantly via the Stellar network, and your shipment is cleared for dispatch the moment payment confirms on-chain.</p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const active = s.step === 1;
              return (
                <div key={s.step} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ring-2 transition-colors ${active ? "bg-stellar text-white ring-stellar" : "bg-muted text-muted-foreground ring-border"}`}><Icon className="h-4 w-4" /></div>
                    <span className={`text-xs font-medium ${active ? "text-stellar" : "text-muted-foreground"}`}>{s.label}</span>
                  </div>
                  {i < steps.length - 1 && <div className="mx-3 mb-5 h-px flex-1 bg-border" />}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <Card className="p-6 md:p-8">
            <h2 className="mb-1 text-lg font-semibold">Step 1: Cargo Details</h2>
            <p className="mb-6 text-sm text-muted-foreground">Tell us about your shipment. All fields are required.</p>
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5"><label className="text-sm font-medium">Origin Country</label><Input placeholder="e.g. Nigeria" /></div>
                <div className="space-y-1.5"><label className="text-sm font-medium">Destination Country</label><Input placeholder="e.g. Netherlands" /></div>
              </div>
              <div className="space-y-1.5"><label className="text-sm font-medium">Cargo Description</label><Input placeholder="e.g. Electronic components, 3 pallets" /></div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5"><label className="text-sm font-medium">Estimated Weight (kg)</label><Input type="number" placeholder="e.g. 850" /></div>
                <div className="space-y-1.5"><label className="text-sm font-medium">Freight Mode</label><Input placeholder="e.g. Ocean Freight, Air, Road" /></div>
              </div>
              <Separator />
              <h3 className="text-sm font-semibold">Sender Details</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5"><label className="text-sm font-medium">Full Name</label><Input placeholder="Sender name" /></div>
                <div className="space-y-1.5"><label className="text-sm font-medium">Email Address</label><Input type="email" placeholder="sender@company.com" /></div>
              </div>
              <h3 className="text-sm font-semibold">Receiver Details</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5"><label className="text-sm font-medium">Full Name</label><Input placeholder="Receiver name" /></div>
                <div className="space-y-1.5"><label className="text-sm font-medium">Email Address</label><Input type="email" placeholder="receiver@company.com" /></div>
              </div>
              <Separator />
              <div className="rounded-xl border border-stellar/30 bg-stellar/5 p-4">
                <div className="flex items-start gap-3"><Zap className="mt-0.5 h-4 w-4 shrink-0 text-stellar" /><div><p className="text-sm font-medium text-stellar">Stellar Payment - Next Step</p><p className="mt-1 text-xs text-muted-foreground">After submitting your cargo details, a unique Stellar payment address and Soroban escrow contract will be generated for your order. You will pay in USDC or XLM from any Stellar-compatible wallet.</p></div></div>
              </div>
              <Button className="w-full gap-2" size="lg">Continue to Payment</Button>
              <p className="text-center text-xs text-muted-foreground">By continuing you agree to our <a href="/policy" className="text-stellar hover:underline">Payment Policy</a>.</p>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
