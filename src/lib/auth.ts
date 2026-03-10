import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

type SessionPayload = {
  role: "admin" | "court";
  subject: string;
  name?: string;
};

const encoder = new TextEncoder();

function getSecret(kind: "admin" | "court") {
  const value =
    kind === "admin"
      ? process.env.ADMIN_JWT_SECRET || "dev-admin-secret"
      : process.env.COURT_JWT_SECRET || "dev-court-secret";
  return encoder.encode(value);
}

export async function verifyAdminPassword(password: string) {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (hash) return bcrypt.compare(password, hash);
  return password === (process.env.ADMIN_PASSWORD || "");
}

async function signSession(payload: SessionPayload) {
  const secret = getSecret(payload.role === "admin" ? "admin" : "court");

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(payload.role === "admin" ? "7d" : "30d")
    .sign(secret);
}

export async function createAdminSession(subject: string) {
  const token = await signSession({ role: "admin", subject });
  const cookieStore = await cookies();
  cookieStore.set("bs_admin", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/"
  });
}

export async function createCourtSession(subject: string, name: string) {
  const token = await signSession({ role: "court", subject, name });
  const cookieStore = await cookies();
  cookieStore.set("bs_court", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/"
  });
}

export async function clearSession(kind: "admin" | "court") {
  const cookieStore = await cookies();
  cookieStore.delete(kind === "admin" ? "bs_admin" : "bs_court");
}

async function verifyToken(token: string, kind: "admin" | "court") {
  const secret = getSecret(kind);
  const verified = await jwtVerify(token, secret);
  return verified.payload as unknown as SessionPayload;
}

export async function getAdminSession() {
  const token = (await cookies()).get("bs_admin")?.value;
  if (!token) return null;

  try {
    const payload = await verifyToken(token, "admin");
    return payload.role === "admin" ? payload : null;
  } catch {
    return null;
  }
}

export async function getCourtSession() {
  const token = (await cookies()).get("bs_court")?.value;
  if (!token) return null;

  try {
    const payload = await verifyToken(token, "court");
    return payload.role === "court" ? payload : null;
  } catch {
    return null;
  }
}

export function generateCourtIdentity(name: string) {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return `court-${normalized}-${Math.random().toString(36).slice(2, 8)}`;
}
