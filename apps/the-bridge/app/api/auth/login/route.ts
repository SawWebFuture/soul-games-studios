import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const username = String(body.username ?? "");
  const password = String(body.password ?? "");

  if (username !== "Scott" || password !== "Startrek") {
    return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("bridge_auth", "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
