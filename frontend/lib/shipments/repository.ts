import { prisma } from "@/lib/db/client";
import type { ShipmentFormValues } from "@/lib/shipment/schema";
import type { ShipmentRecord } from "@/types/shipment";

function toShipmentRecord(shipment: {
  id: string;
  tracking_code: string;
  shipment_id: string;
  sender_name: string;
  sender_phone: string;
  sender_email: string;
  receiver_name: string;
  receiver_phone: string;
  receiver_email: string;
  content_name: string;
  country_from_code: string;
  country_from_name: string;
  country_to_code: string;
  country_to_name: string;
  country_current_code: string | null;
  country_current_name: string | null;
  custom_clearance_fee: string;
  weight_kg: number | null;
  status: ShipmentRecord["status"];
  shipping_date: Date;
  arrival_date: Date;
  current_location_time: Date | null;
  created_at: Date;
  updated_at: Date;
}): ShipmentRecord {
  return {
    ...shipment,
    shipping_date: shipment.shipping_date.toISOString(),
    arrival_date: shipment.arrival_date.toISOString(),
    current_location_time: shipment.current_location_time?.toISOString() ?? null,
    created_at: shipment.created_at.toISOString(),
    updated_at: shipment.updated_at.toISOString(),
  };
}

function toShipmentData(values: ShipmentFormValues) {
  return {
    ...values,
    shipping_date: new Date(values.shipping_date),
    arrival_date: new Date(values.arrival_date),
    current_location_time: values.current_location_time ? new Date(values.current_location_time) : null,
  };
}

export async function listShipments(): Promise<ShipmentRecord[]> {
  const shipments = await prisma.shipment.findMany({ orderBy: { created_at: "desc" } });
  return shipments.map(toShipmentRecord);
}

export async function findShipmentByTrackingCode(trackingCode: string): Promise<ShipmentRecord | null> {
  const shipment = await prisma.shipment.findUnique({ where: { tracking_code: trackingCode } });
  return shipment ? toShipmentRecord(shipment) : null;
}

export async function createShipment(values: ShipmentFormValues & { tracking_code: string; shipment_id: string }): Promise<ShipmentRecord> {
  const shipment = await prisma.shipment.create({
    data: {
      ...toShipmentData(values),
      tracking_code: values.tracking_code,
      shipment_id: values.shipment_id,
    },
  });

  return toShipmentRecord(shipment);
}

export async function updateShipment(id: string, values: ShipmentFormValues): Promise<ShipmentRecord> {
  const shipment = await prisma.shipment.update({
    where: { id },
    data: toShipmentData(values),
  });

  return toShipmentRecord(shipment);
}

export async function deleteShipment(id: string): Promise<void> {
  await prisma.shipment.delete({ where: { id } });
}
