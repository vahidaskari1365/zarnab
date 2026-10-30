import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "zarnab_admin";
const SESSION_PAYLOAD = "zarnab-admin-session-v1";

function secret(): string {
  return process.env.ADMIN_SECRET || process.env.DATABASE_URL || "zarnab-local-secret";
}

export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || "zarnab1405";
}

export function sessionToken(): string {
  return createHmac("sha256", secret()).update(SESSION_PAYLOAD).digest("hex");
}

export function verifyPassword(input: string): boolean {
  const expected = adminPassword();
  const a = Buffer.from(input.padEnd(64, "\0"));
  const b = Buffer.from(expected.padEnd(64, "\0"));
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const expected = sessionToken();
  if (token.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
}

export const ADMIN_COOKIE = COOKIE_NAME;
