import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(_: Request, { params }: { params: Promise<{ trackingCode: string }> }) {
  const { trackingCode } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("shipments")
    .select("*")
    .eq("tracking_code", trackingCode)
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Shipment not found." }, { status: 404 });

  return NextResponse.json(data);
}