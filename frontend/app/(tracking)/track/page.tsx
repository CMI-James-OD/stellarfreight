"use client";
import Link from "next/link";
import { ArrowRight, Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function TrackPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-30" />
      <div className="pointer-events-none absolute -top-24 right-10 h-64 w-64 rounded-full bg-stellar/15 blur-3xl" />

      <div className="mx-auto w-full max-w-7xl px-4 py-20 md:px-6">
        <div className="mx-auto max-w-3xl">
          <Card className="overflow-hidden p-0">
            <div className="border-b border-border bg-muted/30 p-6 md:p-8">
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Track Shipment</h1>
              <p className="mt-3 text-muted-foreground">
                Enter your tracking code to view the current status, route updates, and shipment details.
              </p>
            </div>

            <div className="p-6 md:p-8">
              <form
                className="space-y-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  const form = event.currentTarget;
                  const input = form.elements.namedItem("trackingCode") as HTMLInputElement | null;
                  if (input?.value) window.location.href = `/track/${input.value.trim()}`;
                }}
              >
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    name="trackingCode"
                    placeholder="TWL123456789"
                    required
                    className="h-12 bg-background pl-9"
                  />
                </div>
                <Button className="h-12 w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  Find Shipment
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>

              <div className="mt-6 flex items-center gap-2 rounded-lg border border-stellar/25 bg-stellar/5 p-3 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-stellar" />
                Tracking updates are tied to verified shipment events.
              </div>

              <div className="mt-6">
                <Link href="/" className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
                  Return Home
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
