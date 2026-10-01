import { NextRequest, NextResponse } from "next/server";
import { createAdminToken } from "../../../lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { password } = body as { password?: string };

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const token = createAdminToken();
  const res = NextResponse.json({ success: true });

  res.cookies.set("admin_token", token, {
    httpOnly: true, // JS se access nahi ho sakta, XSS se safe
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365 * 15, 
  });

  return res;
}