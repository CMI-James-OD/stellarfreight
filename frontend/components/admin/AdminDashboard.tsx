"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { countries, statusOptions } from "@/lib/shipment/constants";
import { shipmentFormSchema, type ShipmentFormValues } from "@/lib/shipment/schema";
import { toShipmentStatusLabel } from "@/lib/shipment/utils";
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
  const router = useRouter();
  const [shipments, setShipments] = useState<ShipmentRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingShipment, setEditingShipment] = useState<ShipmentRecord | null>(null);
  const [formValues, setFormValues] = useState<ShipmentFormValues>(initialForm);

  const fetchShipments = useCallback(async () => {
    const response = await fetch("/api/admin/shipments", { cache: "no-store" });
    if (!response.ok) {
      const result = (await response.json().catch(() => null)) as { error?: string } | null;
      toast.error(result?.error ?? "Unable to load shipments.");
      return;
    }
    setShipments((await response.json()) as ShipmentRecord[]);
  }, []);

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
      const response = await fetch(`/api/admin/shipments/${editingShipment.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null;
        toast.error(result?.error ?? "Unable to update shipment.");
        return;
      }
      toast.success("Shipment updated.");
    } else {
      const response = await fetch("/api/admin/shipments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null;
        toast.error(result?.error ?? "Unable to create shipment.");
        return;
      }
      toast.success("Shipment created.");
    }

    setIsModalOpen(false);
    await fetchShipments();
  };

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/admin/shipments/${id}`, { method: "DELETE" });
    if (!response.ok) {
      const result = (await response.json().catch(() => null)) as { error?: string } | null;
      toast.error(result?.error ?? "Unable to delete shipment.");
      return;
    }
    toast.success("Shipment deleted.");
    await fetchShipments();
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  };

  const selectClass =
    "h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-stellar/40 dark:border-white/[0.1] dark:bg-card";

  const statusBadgeClass: Record<string, string> = {
    processed: "bg-blue-500/10 text-blue-500 ring-1 ring-blue-500/20",
    shipped: "bg-stellar/10 text-stellar ring-1 ring-stellar/20",
    en_route: "bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20",
    arrived: "bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20",
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Manage all StellarFreight shipments
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
          <Button size="sm" onClick={openCreateModal}>
            + New Shipment
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <Input
          placeholder="Search by tracking code, sender or receiver…"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card dark:border-white/[0.07]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50 dark:border-white/[0.07]">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tracking</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sender</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Receiver</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredShipments.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  No shipments found.
                </td>
              </tr>
            ) : (
              filteredShipments.map((shipment) => (
                <tr
                  key={shipment.id}
                  className="border-b border-border last:border-0 transition-colors hover:bg-muted/30 dark:border-white/[0.07]"
                >
                  <td className="px-4 py-3 font-mono text-xs font-medium">{shipment.tracking_code}</td>
                  <td className="px-4 py-3 text-sm">{shipment.sender_name}</td>
                  <td className="px-4 py-3 text-sm">{shipment.receiver_name}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadgeClass[shipment.status] ?? "bg-muted text-muted-foreground"}`}>
                      {toShipmentStatusLabel(shipment.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditModal(shipment)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        className="bg-destructive/90 text-destructive-foreground hover:bg-destructive"
                        onClick={() => void handleDelete(shipment.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Shipment count */}
      <p className="mt-3 text-xs text-muted-foreground">
        {filteredShipments.length} shipment{filteredShipments.length !== 1 ? "s" : ""} shown
      </p>

      {/* Create / Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <form className="grid gap-3" onSubmit={handleSubmit}>
            <h2 className="text-lg font-semibold">
              {editingShipment ? "Edit Shipment" : "Create Shipment"}
            </h2>

            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sender</p>
            <Input placeholder="Sender name" value={formValues.sender_name} onChange={(e) => setFormValues((p) => ({ ...p, sender_name: e.target.value }))} required />
            <Input placeholder="Sender email" type="email" value={formValues.sender_email} onChange={(e) => setFormValues((p) => ({ ...p, sender_email: e.target.value }))} required />
            <Input placeholder="Sender phone" value={formValues.sender_phone} onChange={(e) => setFormValues((p) => ({ ...p, sender_phone: e.target.value }))} required />

            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Receiver</p>
            <Input placeholder="Receiver name" value={formValues.receiver_name} onChange={(e) => setFormValues((p) => ({ ...p, receiver_name: e.target.value }))} required />
            <Input placeholder="Receiver email" type="email" value={formValues.receiver_email} onChange={(e) => setFormValues((p) => ({ ...p, receiver_email: e.target.value }))} required />
            <Input placeholder="Receiver phone" value={formValues.receiver_phone} onChange={(e) => setFormValues((p) => ({ ...p, receiver_phone: e.target.value }))} required />

            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cargo</p>
            <Input placeholder="Content description" value={formValues.content_name} onChange={(e) => setFormValues((p) => ({ ...p, content_name: e.target.value }))} required />
            <Input placeholder="Custom clearance fee" value={formValues.custom_clearance_fee} onChange={(e) => setFormValues((p) => ({ ...p, custom_clearance_fee: e.target.value }))} required />
            <Input placeholder="Weight (kg)" type="number" value={formValues.weight_kg ?? ""} onChange={(e) => setFormValues((p) => ({ ...p, weight_kg: e.target.value === "" ? null : Number(e.target.value) }))} />

            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Route &amp; Status</p>
            <select className={selectClass} value={formValues.status} onChange={(e) => setFormValues((p) => ({ ...p, status: e.target.value as ShipmentFormValues["status"] }))}>
              {statusOptions.map((s) => <option key={s} value={s}>{toShipmentStatusLabel(s)}</option>)}
            </select>
            <select className={selectClass} value={formValues.country_from_code} onChange={(e) => { const c = countries.find((x) => x.code === e.target.value); setFormValues((p) => ({ ...p, country_from_code: e.target.value, country_from_name: c?.name ?? p.country_from_name })); }}>
              {countries.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
            </select>
            <select className={selectClass} value={formValues.country_to_code} onChange={(e) => { const c = countries.find((x) => x.code === e.target.value); setFormValues((p) => ({ ...p, country_to_code: e.target.value, country_to_name: c?.name ?? p.country_to_name })); }}>
              {countries.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
            </select>

            <Button type="submit" className="mt-1">
              {editingShipment ? "Update Shipment" : "Create Shipment"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
