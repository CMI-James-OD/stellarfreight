import { shipmentStatusValues } from "@/lib/shipment/schema";

export const countries = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "NG", name: "Nigeria" },
  { code: "DE", name: "Germany" },
  { code: "AE", name: "United Arab Emirates" },
] as const;

export const statusOptions = shipmentStatusValues;