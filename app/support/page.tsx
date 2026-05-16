import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { Mail, MessageCircle, Clock, Zap, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Support",
  description: "Get help with your Trustway shipment or Stellar payment.",
};

const channels = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Detailed queries, documentation requests, account issues.",
    contact: "support@trustwayfreight.com",
    sla: "Response within 4 business hours",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Quick questions about active shipments or payment status.",
    contact: "Available in your shipment dashboard",
    sla: "Typically under 5 minutes",
  },
  {
    icon: Zap,
    title: "Stellar Payment Issues",
    description: "Escrow questions, on-chain transaction queries, wallet issues.",
    contact: "stellar@trustwayfreight.com",
    sla: "Response within 2 hours",
  },
];

const quickLinks = [
  { label: "Track a shipment", href: "/track" },
  { label: "Read our FAQs", href: "/faqs" },
  { label: "Why Stellar payments?", href: "/why-stellar" },
  { label: "Trust Center", href: "/trust-center" },
  { label: "Payment policy", href: "/policy" },
];

export default function SupportPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="border-b border-border bg-background py-14 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Badge variant="stellar" className="mb-4">Support</Badge>
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight md:text-5xl">
              We&apos;re here to help
            </h1>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">
              Whether it&apos;s a shipment question or a Stellar payment issue, our team responds fast.
            </p>
          </div>
        </section>

        {/* Channels */}
        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-5 sm:grid-cols-3">
              {channels.map((ch) => {
                const Icon = ch.icon;
                return (
                  <Card key={ch.title} className="p-6">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-stellar/10 text-stellar ring-1 ring-stellar/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-2 font-semibold">{ch.title}</h3>
                    <p className="mb-3 text-sm text-muted-foreground">{ch.description}</p>
                    <p className="mb-1 text-sm font-medium">{ch.contact}</p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {ch.sla}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quick links */}
        <section className="bg-muted/30 py-14 md:py-20">
          <div className="mx-auto max-w-4xl px-4 md:px-6">
            <h2 className="mb-6 text-xl font-bold">Quick links</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href as Route}
                  className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-sm transition-colors hover:border-stellar/30 hover:bg-stellar/5"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Stellar-specific note */}
        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-3xl px-4 md:px-6">
            <div className="rounded-xl border border-stellar/30 bg-stellar/5 p-6">
              <div className="mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4 text-stellar" />
                <h3 className="font-semibold text-stellar">Stellar Payment Support</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                For on-chain payment queries, please have your Stellar transaction hash ready. You
                can find this in your shipment confirmation email or by looking up your wallet
                address on{" "}
                <a
                  href="https://stellar.expert"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stellar hover:underline"
                >
                  stellar.expert
                </a>
                . Providing the transaction hash dramatically reduces our resolution time.
              </p>
              <Button size="sm" variant="stellar" className="mt-4">
                Contact Stellar Support
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
