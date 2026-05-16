import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";
import { createAdminSession } from "@/lib/auth/session";
import { verifyPassword } from "@/lib/auth/password";
import { loginSchema } from "@/lib/shipment/auth-schema";

export async function POST(request: Request) {
  const parsed = loginSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 400 });
  }

  const user = await prisma.adminUser.findUnique({ where: { email: parsed.data.email } });
  const isValidPassword = user ? await verifyPassword(parsed.data.password, user.password_hash) : false;

  if (!user || !isValidPassword) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  await createAdminSession(user.id);
  return NextResponse.json({ ok: true });
}
