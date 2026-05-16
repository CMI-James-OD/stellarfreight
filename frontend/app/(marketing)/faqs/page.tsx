import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HeroImageBackdrop } from "@/components/marketing/PagePattern";
import { faqs } from "@/content/marketing";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Common questions about StellarFreight and our Stellar blockchain payment system.",
};

export default function FaqsPage() {
  return (
    <>
      <main>
        {/* Header */}
        <section className="relative overflow-hidden border-b border-border dark:border-white/[0.07] bg-background py-16 md:py-24">
          <HeroImageBackdrop src="/images/page-heroes/team.jpg" alt="Support team reviewing shipment questions together" />
          <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-30" />
          <div className="relative mx-auto max-w-7xl px-4 md:px-6">
            <Badge variant="stellar" className="mb-4">FAQ</Badge>
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight md:text-5xl">
              Everything you need to know
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Questions about StellarFreight, Stellar payments, and how escrow works? We have answers.
            </p>
          </div>
        </section>

        {/* Accordion */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="rounded-lg border border-border dark:border-white/[0.07] bg-card px-4"
                >
                  <AccordionTrigger className="text-sm font-medium md:text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Still need help */}
            <div className="mt-12 rounded-xl border border-border dark:border-white/[0.07] bg-muted/30 p-6 text-center">
              <MessageCircle className="mx-auto mb-3 h-8 w-8 text-stellar" />
              <h3 className="font-semibold">Still have questions?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Our support team typically responds within 2 business hours.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <Link href={"/support" as Route}>
                  <Button size="sm">Contact Support</Button>
                </Link>
                <Link href={"/why-stellar" as Route}>
                  <Button variant="outline" size="sm">Learn About Stellar</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}




