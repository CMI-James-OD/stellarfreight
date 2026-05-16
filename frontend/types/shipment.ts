export type ShipmentStatus = "processed" | "shipped" | "en_route" | "arrived";

export interface PartyDetails {
  name: string;
  phone: string;
  email: string;
}

export interface ShipmentRecord {
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
  status: ShipmentStatus;
  shipping_date: string;
  arrival_date: string;
  current_location_time: string | null;
  created_at: string;
  updated_at: string;
}