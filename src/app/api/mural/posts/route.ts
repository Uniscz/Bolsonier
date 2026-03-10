import { NextResponse } from "next/server";
import { getCourtSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { wallPostSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const session = await getCourtSession();

  if (!session) {
    return NextResponse.json({ error: "Entre no salão para publicar." }, { status: 401 });
  }

  const body = await request.json();
  const parsed = wallPostSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  }

  const post = await prisma.wallPost.create({
    data: {
      ...parsed.data,
      authorKey: session.subject,
      authorName: session.name || "Visitante da Corte"
    }
  });

  return NextResponse.json({ ok: true, id: post.id });
}
