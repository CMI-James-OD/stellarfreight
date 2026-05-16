"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import { Menu, X, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems } from "@/content/marketing";
import { ThemeToggle } from "@/components/marketing/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    let scrollStopTimer: ReturnType<typeof setTimeout> | null = null;

    const handler = () => {
      const currentY = window.scrollY;
      const diff = Math.abs(currentY - lastScrollY);

      if (diff < 8) {
        return;
      }

      setScrolled(currentY > 12);
      if (currentY < 96) {
        setShowHeader(true);
      } else if (currentY > lastScrollY && diff > 14) {
        setShowHeader(false);
      } else if (currentY < lastScrollY) {
        setShowHeader(true);
      }
      setLastScrollY(currentY);

      if (scrollStopTimer) clearTimeout(scrollStopTimer);
      scrollStopTimer = setTimeout(() => setShowHeader(true), 180);
    };

    window.addEventListener("scroll", handler, { passive: true });
    return () => {
      window.removeEventListener("scroll", handler);
      if (scrollStopTimer) clearTimeout(scrollStopTimer);
    };
  }, [lastScrollY]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        showHeader ? "translate-y-0" : "-translate-y-full",
        scrolled
          ? "border-b border-white/[0.07] bg-background/60 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent backdrop-blur-none",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href={"/" as Route} className="flex items-center gap-2.5 group">
          <div className="relative h-8 w-8 shrink-0">
            <Image
              src="/images/logo-color.svg"
              alt="StellarFreight logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-base font-semibold tracking-tight">
            Stellar<span className="text-stellar">Freight</span>
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
          <Link
            href={"/admin" as Route}
            className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Admin
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
      <AnimatePresence>
        {open && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="border-t border-border/50 dark:border-white/[0.07] bg-background/98 backdrop-blur-md md:hidden"
        >
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
                <span className="inline-flex h-8 w-full items-center justify-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">
                  Admin
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
