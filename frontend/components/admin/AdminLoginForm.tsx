"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { Lock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { loginSchema } from "@/lib/shipment/auth-schema";

export function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error("Please provide a valid email and password.");
      return;
    }

    setIsLoading(true);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    setIsLoading(false);

    if (!response.ok) {
      const result = (await response.json().catch(() => null)) as { error?: string } | null;
      toast.error(result?.error ?? "Unable to sign in.");
      return;
    }

    toast.success("Logged in successfully.");
    router.push("/admin/dashboard");
    router.refresh();
  };

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-stellar/10 ring-2 ring-stellar/20">
            <Lock className="h-5 w-5 text-stellar" />
          </div>
          <Badge variant="stellar" className="mb-3 gap-1.5">
            <Zap className="h-3 w-3" />
            Admin Portal
          </Badge>
          <h1 className="text-2xl font-bold tracking-tight">Sign in to StellarFreight</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Restricted to authorised administrators only.
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-border bg-card p-6 shadow-sm dark:border-white/[0.07]"
        >
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Email address</label>
              <Input
                type="email"
                placeholder="admin@stellarfreight.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <Separator className="my-2" />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in…" : "Sign In"}
            </Button>
          </div>
        </form>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          Having trouble? Contact{" "}
          <a href="mailto:support@stellarfreight.com" className="text-stellar hover:underline">
            support@stellarfreight.com
          </a>
        </p>
      </div>
    </section>
  );
}
