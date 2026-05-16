"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import { Menu, X, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { navItems } from "@/content/marketing";
import { ThemeToggle } from "@/components/marketing/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/95 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-background/80 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href={"/" as Route} className="flex items-center gap-2.5 group">
          <div className="relative h-8 w-8 shrink-0">
            <Image
              src="/images/logo-color.svg"
              alt="Trustway Freight logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-base font-semibold tracking-tight">
            Trustway
            <span className="text-stellar"> Freight</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href as Route}
                className={cn(
                  "relative rounded-md px-3 py-1.5 text-sm transition-colors",
                  active
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Link href={"/track" as Route}>
            <Button variant="outline" size="sm" className="border-border bg-transparent">
              Track Cargo
            </Button>
          </Link>
          <Link href={"/admin" as Route}>
            <Button size="sm">Admin</Button>
          </Link>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card transition-colors hover:bg-muted"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border/60 bg-background/98 backdrop-blur-md md:hidden">
          <div className="mx-auto flex w-full max-w-7xl flex-col px-4 py-4">
            {/* Stellar badge */}
            <div className="mb-3">
              <Badge variant="stellar" className="text-xs">
                <Zap className="h-3 w-3" />
                Powered by Stellar Network
              </Badge>
            </div>

            <nav className="flex flex-col gap-0.5">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href as Route}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-md px-3 py-2.5 text-sm transition-colors",
                      active
                        ? "bg-primary/8 font-medium text-primary"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-4 flex gap-2 border-t border-border/60 pt-4">
              <Link href={"/track" as Route} className="flex-1">
                <Button variant="outline" className="w-full" size="sm">
                  Track Cargo
                </Button>
              </Link>
              <Link href={"/admin" as Route} className="flex-1">
                <Button className="w-full" size="sm">
                  Admin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
