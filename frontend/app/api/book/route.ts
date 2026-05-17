import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db/client";
import { createTrackingCode, createShipmentId } from "@/lib/shipment/utils";
import { countries } from "@/lib/shipment/constants";

const bookingSchema = z.object({
  sender_name: z.string().min(2),
  sender_phone: z.string().min(5),
  sender_email: z.string().email(),
  receiver_name: z.string().min(2),
  receiver_phone: z.string().min(5),
  receiver_email: z.string().email(),
  content_name: z.string().min(2),
  country_from_code: z.string().min(2),
  country_to_code: z.string().min(2),
  weight_kg: z.coerce.number().positive().nullable().optional(),
});

function generateStellarAddress(): string {
  const BASE32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let addr = "G";
  for (let i = 0; i < 55; i++) {
    addr += BASE32[Math.floor(Math.random() * BASE32.length)];
  }
  return addr;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;

  const fromCountry = countries.find((c) => c.code === data.country_from_code);
  const toCountry = countries.find((c) => c.code === data.country_to_code);

  if (!fromCountry || !toCountry) {
    return NextResponse.json(
      { error: "Invalid country code. Accepted codes: " + countries.map((c) => c.code).join(", ") },
      { status: 400 },
    );
  }

  const tracking_code = createTrackingCode();
  const shipment_id = createShipmentId();
  const stellarPaymentAddress = generateStellarAddress();

  const now = new Date();
  const shippingDate = new Date(now);
  shippingDate.setDate(shippingDate.getDate() + 1);
  const arrivalDate = new Date(now);
  arrivalDate.setDate(arrivalDate.getDate() + 14);

  try {
    await prisma.shipment.create({
      data: {
        tracking_code,
        shipment_id,
        sender_name: data.sender_name,
        sender_phone: data.sender_phone,
        sender_email: data.sender_email,
        receiver_name: data.receiver_name,
        receiver_phone: data.receiver_phone,
        receiver_email: data.receiver_email,
        content_name: data.content_name,
        country_from_code: fromCountry.code,
        country_from_name: fromCountry.name,
        country_to_code: toCountry.code,
        country_to_name: toCountry.name,
        country_current_code: null,
        country_current_name: null,
        custom_clearance_fee: "0",
        weight_kg: data.weight_kg ?? null,
        status: "processed",
        shipping_date: shippingDate,
        arrival_date: arrivalDate,
        current_location_time: null,
        shipper_wallet_address: stellarPaymentAddress,
        payment_status: "pending",
      },
    });
  } catch (err) {
    console.error("[/api/book] DB error:", err);
    return NextResponse.json({ error: "Failed to create shipment" }, { status: 500 });
  }

  return NextResponse.json(
    {
      trackingCode: tracking_code,
      shipmentId: shipment_id,
      stellarPaymentAddress,
      estimatedArrival: arrivalDate.toISOString(),
    },
    { status: 201 },
  );
}
