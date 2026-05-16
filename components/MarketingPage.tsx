interface MarketingPageProps {
  title: string;
  body: string;
}

export function MarketingPage({ title, body }: MarketingPageProps) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-6 py-14">
      <h1 className="text-4xl font-semibold">{title}</h1>
      <p className="mt-6 rounded-xl border bg-white p-6 text-slate-700">{body}</p>
    </main>
  );
}