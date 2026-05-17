import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  origin: z.string().min(2),
  destination: z.string().min(2),
  cargoType: z.string().min(2),
  message: z.string().optional(),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  // In production this would dispatch an email via SendGrid / Resend / etc.
  console.log("[/api/contact] Quote request received:", {
    name: parsed.data.name,
    email: parsed.data.email,
    origin: parsed.data.origin,
    destination: parsed.data.destination,
    cargoType: parsed.data.cargoType,
    message: parsed.data.message ?? "(no message)",
  });

  return NextResponse.json(
    {
      success: true,
      message: "Quote request received. We'll respond within one business day.",
    },
    { status: 200 },
  );
}
