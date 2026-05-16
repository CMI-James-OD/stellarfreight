"use client";

import { type FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { countries, statusOptions } from "@/lib/shipment/constants";
import { shipmentFormSchema, type ShipmentFormValues } from "@/lib/shipment/schema";
import { createShipmentId, createTrackingCode, toShipmentStatusLabel } from "@/lib/shipment/utils";
import { createClient } from "@/lib/supabase/client";
import type { ShipmentRecord } from "@/types/shipment";

const initialForm: ShipmentFormValues = {
  sender_name: "",
  sender_phone: "",
  sender_email: "",
  receiver_name: "",
  receiver_phone: "",
  receiver_email: "",
  content_name: "",
  country_from_code: "US",
  country_from_name: "United States",
  country_to_code: "CA",
  country_to_name: "Canada",
  country_current_code: null,
  country_current_name: null,
  custom_clearance_fee: "",
  weight_kg: null,
  status: "processed",
  shipping_date: new Date().toISOString(),
  arrival_date: new Date().toISOString(),
  current_location_time: null,
};

export function AdminDashboard() {
  const [shipments, setShipments] = useState<ShipmentRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingShipment, setEditingShipment] = useState<ShipmentRecord | null>(null);
  const [formValues, setFormValues] = useState<ShipmentFormValues>(initialForm);

  const supabase = useMemo(() => createClient(), []);

  const fetchShipments = useCallback(async () => {
    const { data, error } = await supabase.from("shipments").select("*").order("created_at", { ascending: false });
    if (error) {
      toast.error(error.message);
      return;
    }
    setShipments((data as ShipmentRecord[]) ?? []);
  }, [supabase]);

  useEffect(() => {
    void fetchShipments();
  }, [fetchShipments]);

  const filteredShipments = shipments.filter((shipment) =>
    [shipment.tracking_code, shipment.sender_name, shipment.receiver_name, shipment.content_name]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  const openCreateModal = () => {
    setEditingShipment(null);
    setFormValues(initialForm);
    setIsModalOpen(true);
  };

  const openEditModal = (shipment: ShipmentRecord) => {
    setEditingShipment(shipment);
    setFormValues({
      sender_name: shipment.sender_name,
      sender_phone: shipment.sender_phone,
      sender_email: shipment.sender_email,
      receiver_name: shipment.receiver_name,
      receiver_phone: shipment.receiver_phone,
      receiver_email: shipment.receiver_email,
      content_name: shipment.content_name,
      country_from_code: shipment.country_from_code,
      country_from_name: shipment.country_from_name,
      country_to_code: shipment.country_to_code,
      country_to_name: shipment.country_to_name,
      country_current_code: shipment.country_current_code,
      country_current_name: shipment.country_current_name,
      custom_clearance_fee: shipment.custom_clearance_fee,
      weight_kg: shipment.weight_kg ?? null,
      status: shipment.status,
      shipping_date: shipment.shipping_date,
      arrival_date: shipment.arrival_date,
      current_location_time: shipment.current_location_time,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const parsed = shipmentFormSchema.safeParse(formValues);
    if (!parsed.success) {
      toast.error("Please fill all required shipment fields.");
      return;
    }

    if (editingShipment) {
      const { error } = await supabase.from("shipments").update(parsed.data).eq("id", editingShipment.id);
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Shipment updated.");
    } else {
      const payload = {
        ...parsed.data,
        tracking_code: createTrackingCode(),
        shipment_id: createShipmentId(),
      };
      const { error } = await supabase.from("shipments").insert(payload);
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Shipment created.");
    }

    setIsModalOpen(false);
    await fetchShipments();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("shipments").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Shipment deleted.");
    await fetchShipments();
  };

  return (
    <section className="mx-auto w-full max-w-6xl">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button onClick={openCreateModal}>New Shipment</Button>
      </div>
      <Input placeholder="Search by tracking code or sender" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />

      <div className="mt-4 overflow-x-auto rounded-xl border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3">Tracking</th><th className="p-3">Sender</th><th className="p-3">Receiver</th><th className="p-3">Status</th><th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredShipments.map((shipment) => (
              <tr key={shipment.id} className="border-t">
                <td className="p-3">{shipment.tracking_code}</td>
                <td className="p-3">{shipment.sender_name}</td>
                <td className="p-3">{shipment.receiver_name}</td>
                <td className="p-3">{toShipmentStatusLabel(shipment.status)}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <Button className="bg-slate-700 hover:bg-slate-800" onClick={() => openEditModal(shipment)}>Edit</Button>
                    <Button className="bg-red-500 hover:bg-red-600" onClick={() => void handleDelete(shipment.id)}>Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <form className="grid gap-3" onSubmit={handleSubmit}>
            <h2 className="text-lg font-semibold">{editingShipment ? "Edit Shipment" : "Create Shipment"}</h2>
            <Input placeholder="Sender name" value={formValues.sender_name} onChange={(event) => setFormValues((prev) => ({ ...prev, sender_name: event.target.value }))} required />
            <Input placeholder="Sender email" type="email" value={formValues.sender_email} onChange={(event) => setFormValues((prev) => ({ ...prev, sender_email: event.target.value }))} required />
            <Input placeholder="Sender phone" value={formValues.sender_phone} onChange={(event) => setFormValues((prev) => ({ ...prev, sender_phone: event.target.value }))} required />
            <Input placeholder="Receiver name" value={formValues.receiver_name} onChange={(event) => setFormValues((prev) => ({ ...prev, receiver_name: event.target.value }))} required />
            <Input placeholder="Receiver email" type="email" value={formValues.receiver_email} onChange={(event) => setFormValues((prev) => ({ ...prev, receiver_email: event.target.value }))} required />
            <Input placeholder="Receiver phone" value={formValues.receiver_phone} onChange={(event) => setFormValues((prev) => ({ ...prev, receiver_phone: event.target.value }))} required />
            <Input placeholder="Content" value={formValues.content_name} onChange={(event) => setFormValues((prev) => ({ ...prev, content_name: event.target.value }))} required />
            <Input placeholder="Custom clearance fee" value={formValues.custom_clearance_fee} onChange={(event) => setFormValues((prev) => ({ ...prev, custom_clearance_fee: event.target.value }))} required />
            <Input placeholder="Weight (kg)" type="number" value={formValues.weight_kg ?? ""} onChange={(event) => setFormValues((prev) => ({ ...prev, weight_kg: event.target.value === "" ? null : Number(event.target.value) }))} />
            <select className="h-10 rounded-md border px-3" value={formValues.status} onChange={(event) => setFormValues((prev) => ({ ...prev, status: event.target.value as ShipmentFormValues["status"] }))}>
              {statusOptions.map((status) => <option key={status} value={status}>{toShipmentStatusLabel(status)}</option>)}
            </select>
            <select className="h-10 rounded-md border px-3" value={formValues.country_from_code} onChange={(event) => { const selected = countries.find((country) => country.code === event.target.value); setFormValues((prev) => ({ ...prev, country_from_code: event.target.value, country_from_name: selected?.name ?? prev.country_from_name })); }}>
              {countries.map((country) => <option key={country.code} value={country.code}>{country.name}</option>)}
            </select>
            <select className="h-10 rounded-md border px-3" value={formValues.country_to_code} onChange={(event) => { const selected = countries.find((country) => country.code === event.target.value); setFormValues((prev) => ({ ...prev, country_to_code: event.target.value, country_to_name: selected?.name ?? prev.country_to_name })); }}>
              {countries.map((country) => <option key={country.code} value={country.code}>{country.name}</option>)}
            </select>
            <Button type="submit">{editingShipment ? "Update" : "Create"}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
