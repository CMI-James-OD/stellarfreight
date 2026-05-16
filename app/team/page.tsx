import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { teamMembers } from "@/content/marketing";

export const metadata: Metadata = {
  title: "Our Team",
  description: "The people behind Trustway Freight's Stellar-powered logistics platform.",
};

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="relative overflow-hidden border-b border-border bg-background py-16 md:py-24">
          <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-30" />
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-stellar/10 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 md:px-6">
            <Badge variant="stellar" className="mb-4">Our Team</Badge>
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight md:text-5xl">
              The people who move freight{" "}
              <span className="gradient-text">on Stellar.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              A team that has lived the freight industry and built what we wish had existed.
            </p>
          </div>
        </section>

        {/* Team grid */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member) => (
                <Card key={member.name} className="overflow-hidden p-0">
                  <div className="relative h-64 w-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="font-semibold text-white">{member.name}</p>
                      <p className="text-xs text-white/80">{member.position}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-muted/30 py-16 md:py-20">
          <div className="mx-auto max-w-2xl px-4 text-center md:px-6">
            <h2 className="text-2xl font-bold">Want to join the team?</h2>
            <p className="mt-3 text-muted-foreground">
              We&apos;re building the future of logistics payments on Stellar. Come work with us.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href={"/support" as Route}>
                <Button className="gap-2">
                  Get in Touch <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={"/about" as Route}>
                <Button variant="outline">Our Story</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
