import { shipmentStatusValues } from "@/lib/shipment/schema";

const shipmentStatusLabels: Record<(typeof shipmentStatusValues)[number], string> = {
  processed: "Processed",
  shipped: "Shipped",
  en_route: "En Route",
  arrived: "Arrived",
};

export function toShipmentStatusLabel(status: (typeof shipmentStatusValues)[number]): string {
  return shipmentStatusLabels[status];
}

export function createTrackingCode(): string {
  const randomDigits = Math.floor(100000000 + Math.random() * 900000000);
  return `TWL${randomDigits}`;
}

export function createShipmentId(): string {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}