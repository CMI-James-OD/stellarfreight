"use client";

import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroImageBackdrop({ src, alt }: { src: string; alt: string }) {
  return (
    <>
      <Image src={src} alt={alt} fill priority sizes="100vw" className="object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/72 to-white/10 dark:from-slate-950/95 dark:via-slate-950/76 dark:to-slate-950/10" />
    </>
  );
}

export function PageHero({
  badge,
  title,
  description,
  imageSrc,
  imageAlt,
}: {
  badge: string;
  title: ReactNode;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden border-b border-border bg-background py-16 md:py-24"
    >
      {imageSrc && (
        <HeroImageBackdrop src={imageSrc} alt={imageAlt ?? ""} />
      )}
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-stellar/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <Badge variant="stellar" className="mb-4">
          {badge}
        </Badge>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{description}</p>
      </div>
    </motion.section>
  );
}

export function SectionBlock({
  children,
  muted = false,
  className,
}: {
  children: ReactNode;
  muted?: boolean;
  className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(muted ? "bg-muted/30 py-16 md:py-24" : "py-16 md:py-24", className)}
    >
      {children}
    </motion.section>
  );
}

export function TrustClarityBlock({
  title,
  now,
  next,
}: {
  title: string;
  now: string;
  next: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="rounded-xl border border-stellar/30 bg-stellar/5 p-6"
    >
      <h3 className="mb-3 font-semibold text-stellar">{title}</h3>
      <p className="mb-2 text-sm leading-relaxed text-muted-foreground">
        <span className="font-medium text-foreground">Available now:</span> {now}
      </p>
      <p className="text-sm leading-relaxed text-muted-foreground">
        <span className="font-medium text-foreground">Next up:</span> {next}
      </p>
    </motion.div>
  );
}

export function PageCta({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: Route;
  secondaryLabel: string;
  secondaryHref: Route;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="py-16 md:py-20"
    >
      <div className="mx-auto max-w-2xl px-4 text-center md:px-6">
        <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
        <p className="mt-3 text-muted-foreground">{description}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href={primaryHref}>
            <Button className="gap-2">
              {primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={secondaryHref}>
            <Button variant="outline">{secondaryLabel}</Button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
