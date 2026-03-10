import { cookies } from "next/headers";

export const AUTH_COOKIE = "bridge_auth";

export async function isAuthed() {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE)?.value === "1";
}
