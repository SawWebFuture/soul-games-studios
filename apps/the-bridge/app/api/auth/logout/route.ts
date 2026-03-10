import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const redirectUrl = new URL("/login", url.origin);
  const res = NextResponse.redirect(redirectUrl);
  res.cookies.set("bridge_auth", "", { path: "/", maxAge: 0 });
  return res;
}
