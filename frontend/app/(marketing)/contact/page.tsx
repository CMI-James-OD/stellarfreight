import type { Metadata } from "next";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { HeroImageBackdrop } from "@/components/marketing/PagePattern";

export const metadata: Metadata = {
  title: "Contact & Quotes",
  description: "Request a freight quote or get in touch with the StellarFreight team.",
};

const contactMethods = [
  { icon: Mail, label: "Email Us", value: "support@stellarfreight.com", note: "Business-hours response queue" },
  { icon: MessageSquare, label: "Live Chat", value: "Available in your dashboard", note: "Fast response during business hours" },
  { icon: Phone, label: "Stellar Payment Queries", value: "stellar@stellarfreight.com", note: "Priority queue - include your tx hash" },
];

export default function ContactPage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-border dark:border-white/[0.07] bg-background py-16 md:py-20">
        <HeroImageBackdrop src="/images/page-heroes/team.jpg" alt="StellarFreight support team" />
        <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <Badge variant="stellar" className="mb-4">Contact &amp; Quotes</Badge>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight md:text-5xl">Get in touch or request a quote</h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">Whether you have a shipment ready to go or just want to know more, we respond quickly and without the runaround.</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {contactMethods.map((m) => {
              const Icon = m.icon;
              return (
                <Card key={m.label} className="p-5">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-stellar/10 text-stellar ring-1 ring-stellar/20"><Icon className="h-4 w-4" /></div>
                  <h3 className="mb-1 font-semibold text-sm">{m.label}</h3>
                  <p className="text-sm font-medium">{m.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{m.note}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <Card className="p-6 md:p-8">
            <h2 className="mb-1 text-lg font-semibold">Request a Freight Quote</h2>
            <p className="mb-6 text-sm text-muted-foreground">Fill in the details below and we will respond with a Stellar-settled quote within one business day.</p>
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5"><label className="text-sm font-medium">Your Name</label><Input placeholder="Full name" /></div>
                <div className="space-y-1.5"><label className="text-sm font-medium">Email Address</label><Input type="email" placeholder="you@company.com" /></div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5"><label className="text-sm font-medium">Origin</label><Input placeholder="City or country" /></div>
                <div className="space-y-1.5"><label className="text-sm font-medium">Destination</label><Input placeholder="City or country" /></div>
              </div>
              <div className="space-y-1.5"><label className="text-sm font-medium">Cargo Type</label><Input placeholder="e.g. General cargo, hazardous goods, perishables" /></div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Message</label>
                <textarea rows={4} placeholder="Any other details - weight estimate, timeline, special requirements..." className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-stellar/30 dark:border-white/[0.1] dark:bg-card" />
              </div>
              <Separator />
              <Button className="w-full" size="lg">Send Quote Request</Button>
              <p className="text-center text-xs text-muted-foreground">We aim to respond within one business day. For urgent shipments, email <a href="mailto:support@stellarfreight.com" className="text-stellar hover:underline">support@stellarfreight.com</a> directly.</p>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
