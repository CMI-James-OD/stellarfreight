"use client";

import dynamic from "next/dynamic";

const LegacyMarketingApp = dynamic(
  () => import("@/components/legacy/LegacyMarketingApp").then((mod) => mod.LegacyMarketingApp),
  { ssr: false },
);

export default function LegacyMarketingMount() {
  return <LegacyMarketingApp />;
}
