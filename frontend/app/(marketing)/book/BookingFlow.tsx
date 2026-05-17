"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, CreditCard, CheckCircle2, Zap, Copy, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { countries } from "@/lib/shipment/constants";
import type { Route } from "next";

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3;

interface BookingResult {
  trackingCode: string;
  shipmentId: string;
  stellarPaymentAddress: string;
  estimatedArrival: string;
}

interface FormState {
  sender_name: string;
  sender_phone: string;
  sender_email: string;
  receiver_name: string;
  receiver_phone: string;
  receiver_email: string;
  content_name: string;
  country_from_code: string;
  country_to_code: string;
  weight_kg: string;
}

const EMPTY_FORM: FormState = {
  sender_name: "",
  sender_phone: "",
  sender_email: "",
  receiver_name: "",
  receiver_phone: "",
  receiver_email: "",
  content_name: "",
  country_from_code: "",
  country_to_code: "",
  weight_kg: "",
};

// ─── Step indicator ───────────────────────────────────────────────────────────

const steps = [
  { step: 1 as Step, label: "Cargo Details", icon: Package },
  { step: 2 as Step, label: "Stellar Payment", icon: CreditCard },
  { step: 3 as Step, label: "Confirmation", icon: CheckCircle2 },
];

function StepIndicator({ current }: { current: Step }) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((s, i) => {
        const Icon = s.icon;
        const active = s.step === current;
        const done = s.step < current;
        return (
          <div key={s.step} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ring-2 transition-colors ${
                  active
                    ? "bg-stellar text-white ring-stellar"
                    : done
                      ? "bg-stellar/20 text-stellar ring-stellar/40"
                      : "bg-muted text-muted-foreground ring-border"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <span
                className={`text-xs font-medium ${active ? "text-stellar" : done ? "text-stellar/70" : "text-muted-foreground"}`}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && <div className="mx-3 mb-5 h-px flex-1 bg-border" />}
          </div>
        );
      })}
    </div>
  );
}

// ─── Select helper ────────────────────────────────────────────────────────────

const selectClass =
  "h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:ring-2 focus:ring-stellar/40 dark:border-white/[0.1] dark:bg-card";

// ─── Main component ───────────────────────────────────────────────────────────

export function BookingFlow() {
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BookingResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          weight_kg: form.weight_kg ? parseFloat(form.weight_kg) : null,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        const msg =
          typeof json?.error === "string"
            ? json.error
            : "Booking failed. Please check your details and try again.";
        toast.error(msg);
        return;
      }

      setResult(json as BookingResult);
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (!result) return;
    navigator.clipboard.writeText(result.stellarPaymentAddress).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleReset() {
    setForm(EMPTY_FORM);
    setResult(null);
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const estimatedArrivalLabel = result
    ? new Date(result.estimatedArrival).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <>
      {/* Step indicator */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <StepIndicator current={step} />
        </div>
      </section>

      {/* Step content */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          {/* ── Step 1: Cargo & Party Details ── */}
          {step === 1 && (
            <Card className="p-6 md:p-8">
              <h2 className="mb-1 text-lg font-semibold">Step 1: Cargo Details</h2>
              <p className="mb-6 text-sm text-muted-foreground">
                Tell us about your shipment. All fields marked * are required.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Origin & Destination */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Origin Country *</label>
                    <select
                      required
                      value={form.country_from_code}
                      onChange={(e) => set("country_from_code", e.target.value)}
                      className={selectClass}
                    >
                      <option value="" disabled>
                        Select origin
                      </option>
                      {countries.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Destination Country *</label>
                    <select
                      required
                      value={form.country_to_code}
                      onChange={(e) => set("country_to_code", e.target.value)}
                      className={selectClass}
                    >
                      <option value="" disabled>
                        Select destination
                      </option>
                      {countries.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Cargo description */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Cargo Description *</label>
                  <Input
                    required
                    placeholder="e.g. Electronic components, 3 pallets"
                    value={form.content_name}
                    onChange={(e) => set("content_name", e.target.value)}
                  />
                </div>

                {/* Weight */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Estimated Weight (kg)</label>
                  <Input
                    type="number"
                    min="0.1"
                    step="0.1"
                    placeholder="e.g. 850"
                    value={form.weight_kg}
                    onChange={(e) => set("weight_kg", e.target.value)}
                  />
                </div>

                <Separator />

                {/* Sender details */}
                <h3 className="text-sm font-semibold">Sender Details</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Full Name *</label>
                    <Input
                      required
                      placeholder="Sender name"
                      value={form.sender_name}
                      onChange={(e) => set("sender_name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Phone *</label>
                    <Input
                      required
                      type="tel"
                      placeholder="+1 555 000 0000"
                      value={form.sender_phone}
                      onChange={(e) => set("sender_phone", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Email Address *</label>
                  <Input
                    required
                    type="email"
                    placeholder="sender@company.com"
                    value={form.sender_email}
                    onChange={(e) => set("sender_email", e.target.value)}
                  />
                </div>

                <Separator />

                {/* Receiver details */}
                <h3 className="text-sm font-semibold">Receiver Details</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Full Name *</label>
                    <Input
                      required
                      placeholder="Receiver name"
                      value={form.receiver_name}
                      onChange={(e) => set("receiver_name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Phone *</label>
                    <Input
                      required
                      type="tel"
                      placeholder="+1 555 000 0000"
                      value={form.receiver_phone}
                      onChange={(e) => set("receiver_phone", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Email Address *</label>
                  <Input
                    required
                    type="email"
                    placeholder="receiver@company.com"
                    value={form.receiver_email}
                    onChange={(e) => set("receiver_email", e.target.value)}
                  />
                </div>

                <Separator />

                {/* Stellar info callout */}
                <div className="rounded-xl border border-stellar/30 bg-stellar/5 p-4">
                  <div className="flex items-start gap-3">
                    <Zap className="mt-0.5 h-4 w-4 shrink-0 text-stellar" />
                    <div>
                      <p className="text-sm font-medium text-stellar">Stellar Payment — Next Step</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        After submitting your cargo details, a unique Stellar payment address will be
                        generated for your order. Pay in USDC or XLM from any Stellar-compatible wallet
                        and your shipment is dispatched on-chain.
                      </p>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full gap-2" size="lg" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating your booking…
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4" />
                      Continue to Payment
                    </>
                  )}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  By continuing you agree to our{" "}
                  <a href="/policy" className="text-stellar hover:underline">
                    Payment Policy
                  </a>
                  .
                </p>
              </form>
            </Card>
          )}

          {/* ── Step 2: Stellar Payment ── */}
          {step === 2 && result && (
            <Card className="p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stellar/10 text-stellar ring-2 ring-stellar/30">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Step 2: Send Payment</h2>
                  <p className="text-sm text-muted-foreground">
                    Your Stellar payment address has been generated.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Payment address */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Your Stellar Payment Address
                  </label>
                  <div className="flex items-center gap-2 rounded-lg border border-stellar/30 bg-stellar/5 p-3">
                    <code className="flex-1 break-all font-mono text-xs text-foreground">
                      {result.stellarPaymentAddress}
                    </code>
                    <button
                      onClick={handleCopy}
                      className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-stellar/10 hover:text-stellar"
                      title="Copy address"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {copied && (
                    <p className="mt-1 text-xs text-green-600 dark:text-green-400">
                      Address copied to clipboard!
                    </p>
                  )}
                </div>

                {/* Instructions */}
                <div className="rounded-xl border border-border dark:border-white/[0.07] bg-muted/30 p-5 space-y-3">
                  <h3 className="text-sm font-semibold">Payment Instructions</h3>
                  <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                    <li>Open your Stellar-compatible wallet (e.g. Lobstr, Solar, Freighter).</li>
                    <li>Send USDC or XLM to the address shown above.</li>
                    <li>Your shipment status will update automatically once payment confirms on-chain — usually within seconds.</li>
                    <li>Save your tracking code below for real-time updates.</li>
                  </ol>
                </div>

                {/* Tracking code preview */}
                <div className="rounded-xl border border-border dark:border-white/[0.07] p-5">
                  <p className="mb-2 text-sm font-medium">Your Tracking Code</p>
                  <code className="text-xl font-mono font-bold tracking-widest text-stellar">
                    {result.trackingCode}
                  </code>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Save this — you can track your shipment at any time.
                  </p>
                </div>

                {/* Stellar Expert link */}
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`https://stellar.expert/explorer/public/account/${result.stellarPaymentAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-stellar/30 bg-background px-3 py-1.5 text-xs font-medium text-stellar transition-colors hover:bg-stellar/10"
                  >
                    View on Stellar Expert ↗
                  </a>
                </div>

                <Button className="w-full gap-2" size="lg" onClick={() => setStep(3)}>
                  <CheckCircle2 className="h-4 w-4" />
                  I&apos;ve Sent Payment — Continue
                </Button>
              </div>
            </Card>
          )}

          {/* ── Step 3: Confirmation ── */}
          {step === 3 && result && (
            <Card className="p-6 md:p-8 text-center">
              <div className="mb-6 flex flex-col items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-green-500 ring-2 ring-green-500/30">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Booking Confirmed!</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Your shipment has been registered on StellarFreight.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Tracking code */}
                <div className="rounded-xl border border-border dark:border-white/[0.07] bg-muted/30 p-5">
                  <p className="mb-2 text-sm font-medium text-muted-foreground">Tracking Code</p>
                  <code className="text-3xl font-mono font-bold tracking-widest text-stellar">
                    {result.trackingCode}
                  </code>
                </div>

                {/* Estimated arrival */}
                <div className="rounded-xl border border-border dark:border-white/[0.07] bg-muted/30 p-5">
                  <p className="mb-1 text-sm font-medium text-muted-foreground">Estimated Arrival</p>
                  <p className="text-lg font-semibold">{estimatedArrivalLabel}</p>
                </div>

                {/* Info */}
                <div className="rounded-xl border border-stellar/30 bg-stellar/5 p-4 text-left">
                  <div className="flex items-start gap-3">
                    <Zap className="mt-0.5 h-4 w-4 shrink-0 text-stellar" />
                    <p className="text-xs text-muted-foreground">
                      Your shipment is now in our system with status{" "}
                      <span className="font-medium text-foreground">Processed</span>. It will
                      advance to <span className="font-medium text-foreground">Shipped</span> once
                      your Stellar payment is confirmed on-chain.
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={`/track/${result.trackingCode}` as Route}
                    className="flex-1"
                  >
                    <Button className="w-full gap-2" size="lg">
                      <Package className="h-4 w-4" />
                      Track Your Shipment
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={handleReset}
                  >
                    Book Another Shipment
                  </Button>
                </div>

                <Badge variant="stellar" className="gap-1.5">
                  <Zap className="h-3 w-3" />
                  Powered by Stellar
                </Badge>
              </div>
            </Card>
          )}
        </div>
      </section>
    </>
  );
}
