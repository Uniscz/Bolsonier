import { NextResponse } from "next/server";
import { createCourtSession, generateCourtIdentity } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const name = String(body?.name || "").trim();

  if (name.length < 3) {
    return NextResponse.json({ error: "Escolha um nome com pelo menos 3 caracteres." }, { status: 400 });
  }

  const subject = generateCourtIdentity(name);
  await createCourtSession(subject, name);

  return NextResponse.json({ ok: true });
}
