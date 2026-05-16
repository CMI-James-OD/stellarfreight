import { NextResponse } from "next/server";
import { findShipmentByTrackingCode } from "@/lib/shipments/repository";

export async function GET(_: Request, { params }: { params: Promise<{ trackingCode: string }> }) {
  const { trackingCode } = await params;
  const shipment = await findShipmentByTrackingCode(trackingCode);

  if (!shipment) return NextResponse.json({ error: "Shipment not found." }, { status: 404 });
  return NextResponse.json(shipment);
}
