import { cookies } from "next/headers";
import { randomBytes, createHash } from "node:crypto";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth/constants";
import { prisma } from "@/lib/db/client";

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

function hashToken(token: string): string {
  return createHash("sha256")
    .update(`${process.env.ADMIN_SESSION_SECRET ?? "development-session-secret"}:${token}`)
    .digest("hex");
}

function getCookieOptions(expires: Date) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    expires,
  };
}

export async function createAdminSession(userId: string): Promise<void> {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

  await prisma.adminSession.create({
    data: {
      token_hash: hashToken(token),
      user_id: userId,
      expires_at: expiresAt,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, getCookieOptions(expiresAt));
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (token) {
    await prisma.adminSession.deleteMany({ where: { token_hash: hashToken(token) } });
  }

  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function getCurrentAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await prisma.adminSession.findUnique({
    where: { token_hash: hashToken(token) },
    include: { user: true },
  });

  if (!session || session.expires_at <= new Date()) {
    if (session) {
      await prisma.adminSession.delete({ where: { id: session.id } });
    }
    return null;
  }

  return session;
}

export async function requireAdminSession() {
  const session = await getCurrentAdminSession();
  if (!session) return null;
  return session;
}
