import type { Metadata } from "next";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { HeroImageBackdrop } from "@/components/marketing/PagePattern";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact & Quotes",
  description: "Request a freight quote or get in touch with the StellarFreight team.",
};

const contactMethods = [
  {
    icon: Mail,
    label: "Email Us",
    value: "support@stellarfreight.com",
    note: "Business-hours response queue",
  },
  {
    icon: MessageSquare,
    label: "Live Chat",
    value: "Available in your dashboard",
    note: "Fast response during business hours",
  },
  {
    icon: Phone,
    label: "Stellar Payment Queries",
    value: "stellar@stellarfreight.com",
    note: "Priority queue — include your tx hash",
  },
];

export default function ContactPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border dark:border-white/[0.07] bg-background py-16 md:py-20">
        <HeroImageBackdrop
          src="/images/page-heroes/team.jpg"
          alt="StellarFreight support team"
        />
        <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <Badge variant="stellar" className="mb-4">
            Contact &amp; Quotes
          </Badge>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight md:text-5xl">
            Get in touch or request a quote
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Whether you have a shipment ready to go or just want to know more, we respond quickly
            and without the runaround.
          </p>
        </div>
      </section>

      {/* Contact method cards */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {contactMethods.map((m) => {
              const Icon = m.icon;
              return (
                <Card key={m.label} className="p-5">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-stellar/10 text-stellar ring-1 ring-stellar/20">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="mb-1 font-semibold text-sm">{m.label}</h3>
                  <p className="text-sm font-medium">{m.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{m.note}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote form (client component) */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
