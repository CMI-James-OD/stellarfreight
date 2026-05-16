import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth/constants";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin/dashboard") && !request.cookies.has(ADMIN_SESSION_COOKIE)) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
