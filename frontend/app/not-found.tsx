import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/marketing/Navbar";
import { SiteFooter } from "@/components/marketing/SiteFooter";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-20">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-stellar/10 ring-2 ring-stellar/20">
            <Package className="h-7 w-7 text-stellar" />
          </div>
          <Badge variant="stellar" className="mb-4">404 — Not Found</Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            This page got lost at sea.
          </h1>
          <p className="mt-4 max-w-md mx-auto text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
            Let&apos;s get you back on course.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href={"/" as Route}>
              <Button className="gap-2">
                Back to Home <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href={"/track" as Route}>
              <Button variant="outline">Track a Shipment</Button>
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
