import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";
import { createShipment, listShipments } from "@/lib/shipments/repository";
import { shipmentFormSchema } from "@/lib/shipment/schema";
import { createShipmentId, createTrackingCode } from "@/lib/shipment/utils";

export async function GET() {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const shipments = await listShipments();
  return NextResponse.json(shipments);
}

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const parsed = shipmentFormSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Please fill all required shipment fields." }, { status: 400 });
  }

  const shipment = await createShipment({
    ...parsed.data,
    tracking_code: createTrackingCode(),
    shipment_id: createShipmentId(),
  });

  return NextResponse.json(shipment, { status: 201 });
}
