import { describe, expect, it } from "vitest";
import { createShipmentId, createTrackingCode, toShipmentStatusLabel } from "@/lib/shipment/utils";

describe("shipment utils", () => {
  it("creates TWL tracking code", () => {
    expect(createTrackingCode()).toMatch(/^TWL\d{9}$/);
  });

  it("creates numeric shipment id", () => {
    expect(createShipmentId()).toMatch(/^\d{10}$/);
  });

  it("maps status labels", () => {
    expect(toShipmentStatusLabel("en_route")).toBe("En Route");
  });
});