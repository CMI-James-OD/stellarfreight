"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/lib/shipment/auth-schema";
import { createClient } from "@/lib/supabase/client";

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
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword(parsed.data);
    setIsLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Logged in successfully.");
    router.push("/admin/dashboard");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-20 flex w-full max-w-md flex-col gap-4 rounded-xl border bg-white p-6 shadow-sm">
      <h1 className="text-xl font-semibold">Admin Login</h1>
      <Input type="email" placeholder="admin@company.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
      <Input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required />
      <Button type="submit" disabled={isLoading}>{isLoading ? "Signing in..." : "Sign In"}</Button>
    </form>
  );
}
