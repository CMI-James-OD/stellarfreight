import { coreBenefits, paymentFlow, roadmapItems } from "@/content/marketing";
import { Card } from "@/components/ui/card";

interface MarketingTemplateProps {
  title: string;
  subtitle: string;
  body: string;
}

export function MarketingTemplate({ title, subtitle, body }: MarketingTemplateProps) {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 md:px-6">
      <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-muted p-8 md:p-12">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Stellar-First Logistics</p>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">{subtitle}</p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {coreBenefits.map((item) => (
          <Card key={item.title} className="p-5">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
          </Card>
        ))}
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold">Stellar Payment Workflow</h3>
          <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
            {paymentFlow.map((step, index) => (
              <li key={step}><span className="mr-2 font-semibold text-foreground">{index + 1}.</span>{step}</li>
            ))}
          </ol>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold">Roadmap Transparency</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {roadmapItems.map((item) => (
              <li key={item.quarter}>- {item.title}</li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="mt-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold">Operational Story</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p>
        </Card>
      </section>
    </main>
  );
}