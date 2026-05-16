import { z } from "zod";

export const shipmentStatusValues = ["processed", "shipped", "en_route", "arrived"] as const;

export const shipmentFormSchema = z.object({
  sender_name: z.string().min(2),
  sender_phone: z.string().min(5),
  sender_email: z.string().email(),
  receiver_name: z.string().min(2),
  receiver_phone: z.string().min(5),
  receiver_email: z.string().email(),
  content_name: z.string().min(2),
  country_from_code: z.string().min(2),
  country_from_name: z.string().min(2),
  country_to_code: z.string().min(2),
  country_to_name: z.string().min(2),
  country_current_code: z.string().nullable(),
  country_current_name: z.string().nullable(),
  custom_clearance_fee: z.string().min(1),
  weight_kg: z.coerce.number().positive().nullable(),
  status: z.enum(shipmentStatusValues),
  shipping_date: z.string().datetime(),
  arrival_date: z.string().datetime(),
  current_location_time: z.string().datetime().nullable(),
});

export type ShipmentFormValues = z.infer<typeof shipmentFormSchema>;