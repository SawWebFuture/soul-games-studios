import { cookies } from "next/headers";

export const AUTH_COOKIE = "bridge_auth";

export function isAuthed() {
  return cookies().get(AUTH_COOKIE)?.value === "1";
}
