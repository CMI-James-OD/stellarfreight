"use client";
import Link from "next/link";

export default function TrackPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Track Shipment</h1>
      <p className="mt-2 text-slate-600">Use your tracking code to view live shipment status.</p>
      <form className="mt-8 grid gap-3" onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const input = form.elements.namedItem("trackingCode") as HTMLInputElement | null;
        if (input?.value) window.location.href = `/track/${input.value.trim()}`;
      }}>
        <input name="trackingCode" className="h-11 rounded-md border px-3" placeholder="TWL123456789" required />
        <button className="h-11 rounded-md bg-orange-500 font-medium text-white">Find Shipment</button>
      </form>
      <div className="mt-8">
        <Link href="/" className="text-sm text-slate-600 underline">Return Home</Link>
      </div>
    </main>
  );
}
