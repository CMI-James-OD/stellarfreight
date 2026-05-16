import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { Navbar } from "@/components/marketing/Navbar";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Policy",
  description: "Trustway Freight privacy policy, terms of use, and payment policy.",
};

const sections = [
  {
    title: "1. Data We Collect",
    content:
      "We collect shipment details (origin, destination, cargo type), contact information, and Stellar wallet addresses you provide during booking. We do not store private keys, seed phrases, or payment card numbers. All shipment data is stored in a Supabase Postgres database with row-level security.",
  },
  {
    title: "2. How We Use Your Data",
    content:
      "Shipment data is used to process, track, and deliver your freight. Contact information is used for shipment status notifications. Stellar wallet addresses are used solely to generate escrow contracts and verify payment. We do not sell your data to third parties.",
  },
  {
    title: "3. Stellar Payment Policy",
    content:
      "Payments are processed via the Stellar network using Soroban smart contracts. Funds are held in a non-custodial escrow and automatically released upon verified delivery. We have no ability to reverse confirmed on-chain transactions. Disputed payments are resolved via our support process — the on-chain record serves as the authoritative source.",
  },
  {
    title: "4. Escrow and Refunds",
    content:
      "If a shipment cannot be completed, the Soroban escrow contract is configured to return funds to the originating Stellar address. Refund processing time depends on Stellar ledger confirmation (typically under 10 seconds). Partial refunds for partial deliveries are handled case-by-case through support.",
  },
  {
    title: "5. Data Retention",
    content:
      "Shipment records are retained for 7 years to comply with trade documentation requirements. On-chain transaction records are permanent by virtue of the Stellar ledger's immutable history. You may request deletion of personal contact data by contacting support@trustwayfreight.com.",
  },
  {
    title: "6. Security",
    content:
      "All data in transit is encrypted with TLS 1.3. Database access is controlled via Supabase row-level security policies. Stellar payment addresses are rotated per shipment. We undergo annual penetration testing and maintain a responsible disclosure programme.",
  },
  {
    title: "7. Third-Party Integrations",
    content:
      "We integrate with the Stellar network (payment settlement), Circle (USDC), and Supabase (database). We use Stellar anchors for fiat on/off ramp services in supported markets. These third parties have their own privacy policies which we encourage you to review.",
  },
  {
    title: "8. Contact",
    content:
      "For any policy questions or data requests, contact: policy@trustwayfreight.com. For security disclosures: security@trustwayfreight.com. We aim to respond to all policy inquiries within 5 business days.",
  },
];

export default function PolicyPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="border-b border-border bg-background py-14 md:py-20">
          <div className="mx-auto max-w-4xl px-4 md:px-6">
            <Badge variant="outline" className="mb-4">Legal</Badge>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Privacy & Policy
            </h1>
            <p className="mt-4 text-muted-foreground">
              Last updated: January 2025
            </p>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-4xl space-y-8 px-4 md:px-6">
            {sections.map((s, i) => (
              <div key={s.title}>
                <h2 className="mb-3 text-lg font-semibold">{s.title}</h2>
                <p className="text-sm leading-7 text-muted-foreground">{s.content}</p>
                {i < sections.length - 1 && <Separator className="mt-8" />}
              </div>
            ))}

            <div className="mt-10 rounded-xl border border-stellar/30 bg-stellar/5 p-5">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">A note on blockchain transparency:</strong>{" "}
                Payment records on the Stellar ledger are publicly visible by design. Your wallet
                address and transaction amounts are part of the public ledger. If you require
                payment privacy, please contact us to discuss confidential transaction options via
                Stellar&apos;s memo-encrypted pathways.
              </p>
            </div>

            <div className="text-center">
              <Link href={"/support" as Route} className="text-sm text-stellar hover:underline">
                Questions about this policy? Contact Support →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
