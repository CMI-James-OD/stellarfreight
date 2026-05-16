import { notFound } from "next/navigation";
import Link from "next/link";
import { toShipmentStatusLabel } from "@/lib/shipment/utils";
import type { ShipmentRecord } from "@/types/shipment";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

async function getShipment(trackingCode: string): Promise<ShipmentRecord | null> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/shipments/${trackingCode}`, {
    cache: "no-store",
  });

  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Failed to fetch shipment.");
  return (await response.json()) as ShipmentRecord;
}

export default async function TrackingDetailsPage({ params }: { params: Promise<{ trackingCode: string }> }) {
  const { trackingCode } = await params;
  const shipment = await getShipment(trackingCode);

  if (!shipment) notFound();

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-4 py-10 md:px-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">Tracking #{shipment.tracking_code}</h1>
        <Badge variant="stellar">{toShipmentStatusLabel(shipment.status)}</Badge>
      </div>
      <Card className="mt-6 grid gap-4 p-6 md:grid-cols-2">
        <p><span className="font-semibold">Status:</span> {toShipmentStatusLabel(shipment.status)}</p>
        <p><span className="font-semibold">Shipment ID:</span> {shipment.shipment_id}</p>
        <p><span className="font-semibold">Sender:</span> {shipment.sender_name}</p>
        <p><span className="font-semibold">Receiver:</span> {shipment.receiver_name}</p>
        <p><span className="font-semibold">From:</span> {shipment.country_from_name}</p>
        <p><span className="font-semibold">To:</span> {shipment.country_to_name}</p>
        <p><span className="font-semibold">Content:</span> {shipment.content_name}</p>
        <p><span className="font-semibold">Fee:</span> {shipment.custom_clearance_fee}</p>
      </Card>
      <div className="mt-6">
        <Link href="/track" className="text-sm text-muted-foreground underline">
          Track another shipment
        </Link>
      </div>
    </main>
  );
}
