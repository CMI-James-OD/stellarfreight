"use client";

import { useState } from "react";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface FormState {
  name: string;
  email: string;
  origin: string;
  destination: string;
  cargoType: string;
  message: string;
}

const EMPTY: FormState = {
  name: "",
  email: "",
  origin: "",
  destination: "",
  cargoType: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        const msg =
          typeof json?.error === "string"
            ? json.error
            : "Something went wrong. Please try again.";
        toast.error(msg);
        return;
      }

      toast.success("Quote request sent! We'll be in touch within one business day.");
      setSubmitted(true);
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <Card className="p-6 md:p-8 text-center">
        <div className="mb-5 flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-green-500 ring-2 ring-green-500/30">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Request Sent!</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              We&apos;ll respond with a Stellar-settled quote within one business day.
            </p>
          </div>
        </div>
        <p className="mb-6 text-sm text-muted-foreground">
          Need to send another request?
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setForm(EMPTY);
            setSubmitted(false);
          }}
        >
          Send Another Request
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 md:p-8">
      <h2 className="mb-1 text-lg font-semibold">Request a Freight Quote</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Fill in the details below and we will respond with a Stellar-settled quote within one
        business day.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Your Name *</label>
            <Input
              required
              placeholder="Full name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Email Address *</label>
            <Input
              required
              type="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Origin *</label>
            <Input
              required
              placeholder="City or country"
              value={form.origin}
              onChange={(e) => set("origin", e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Destination *</label>
            <Input
              required
              placeholder="City or country"
              value={form.destination}
              onChange={(e) => set("destination", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Cargo Type *</label>
          <Input
            required
            placeholder="e.g. General cargo, electronics, perishables"
            value={form.cargoType}
            onChange={(e) => set("cargoType", e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Message</label>
          <textarea
            rows={4}
            placeholder="Any other details — weight estimate, timeline, special requirements…"
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:ring-2 focus:ring-stellar/40 dark:border-white/[0.1] dark:bg-card"
          />
        </div>

        <Separator />

        <Button type="submit" className="w-full gap-2" size="lg" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send Quote Request
            </>
          )}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          We aim to respond within one business day. For urgent shipments, email{" "}
          <a
            href="mailto:support@stellarfreight.com"
            className="text-stellar hover:underline"
          >
            support@stellarfreight.com
          </a>{" "}
          directly.
        </p>
      </form>
    </Card>
  );
}
