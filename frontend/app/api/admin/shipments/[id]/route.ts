import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth/session";
import { deleteShipment, updateShipment } from "@/lib/shipments/repository";
import { shipmentFormSchema } from "@/lib/shipment/schema";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const parsed = shipmentFormSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Please fill all required shipment fields." }, { status: 400 });
  }

  const { id } = await params;
  const shipment = await updateShipment(id, parsed.data);
  return NextResponse.json(shipment);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  await deleteShipment(id);
  return NextResponse.json({ ok: true });
}
