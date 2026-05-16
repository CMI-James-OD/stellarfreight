import { Card } from "@/components/ui/card";

const faqItems = [
  {
    q: "Why is Stellar the primary payment rail?",
    a: "Stellar aligns with operational needs for low-friction cross-border settlement and clear transaction visibility."
  },
  {
    q: "Are payment claims guaranteed?",
    a: "No superlative guarantees are made. We publish verified-only claims and clearly label roadmap capabilities."
  },
  {
    q: "Can logistics teams audit payment states?",
    a: "Yes. The payment lifecycle is designed to map to shipment milestones for improved support and reconciliation."
  }
];

export function FaqSection() {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
      <div className="mt-4 grid gap-3">
        {faqItems.map((item) => (
          <Card key={item.q} className="p-0">
            <details className="group p-5">
              <summary className="cursor-pointer list-none font-medium">{item.q}</summary>
              <p className="mt-3 text-sm text-muted-foreground">{item.a}</p>
            </details>
          </Card>
        ))}
      </div>
    </section>
  );
}