import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { Mail, MessageCircle, Clock, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageCta, PageHero, SectionBlock, TrustClarityBlock } from "@/components/marketing/PagePattern";

export const metadata: Metadata = {
  title: "Support",
  description: "Get help with your StellarFreight shipment or Stellar payment.",
};

const channels = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Detailed queries, documentation requests, account issues.",
    contact: "support@stellarfreight.com",
    sla: "Business-hours response queue",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Quick questions about active shipments or payment status.",
    contact: "Available in your shipment dashboard",
    sla: "Fast-response support during business hours",
  },
  {
    icon: Zap,
    title: "Stellar Payment Issues",
    description: "Escrow questions, on-chain transaction queries, wallet issues.",
    contact: "stellar@stellarfreight.com",
    sla: "Priority review queue",
  },
];

const quickLinks = [
  { label: "Track a shipment", href: "/track" },
  { label: "Read our FAQs", href: "/faqs" },
  { label: "Why Stellar payments?", href: "/why-stellar" },
  { label: "Payment policy", href: "/policy" },
];

export default function SupportPage() {
  return (
    <main>
      <PageHero
        badge="Support"
        title={<>We&apos;re here to help</>}
        description="Whether it&apos;s a shipment question or a Stellar payment issue, our team helps you move forward quickly."
        imageSrc="/images/page-heroes/team.jpg"
        imageAlt="Support conversation and payment help visual"
      />

      <SectionBlock>
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
      </SectionBlock>

      <SectionBlock muted>
        <div className="mx-auto max-w-7xl px-4 md:px-6">
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
      </SectionBlock>

      <SectionBlock>
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <TrustClarityBlock
            title="Support clarity"
            now="Shipment and payment support is active for current product flows, including tracking and escrow-related guidance."
            next="We are expanding support coverage as more shipping corridors and payment options are rolled out."
          />
          <Button size="sm" variant="stellar" className="mt-4">
            Contact Stellar Support
          </Button>
          <p className="mt-3 text-sm text-muted-foreground">
            For on-chain payment queries, include your transaction hash from{" "}
            <a href="https://stellar.expert" target="_blank" rel="noopener noreferrer" className="text-stellar hover:underline">
              stellar.expert
            </a>
            .
          </p>
        </div>
      </SectionBlock>

      <PageCta
        title="Need direct support now?"
        description="Reach the team, then continue tracking with your shipment code."
        primaryLabel="Track Shipment"
        primaryHref={"/track" as Route}
        secondaryLabel="Read FAQs"
        secondaryHref={"/faqs" as Route}
      />
    </main>
  );
}





