import { NextResponse } from "next/server";
import { getCourtSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { wallReactionSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const session = await getCourtSession();

  if (!session) {
    return NextResponse.json({ error: "Entre no salão para reagir." }, { status: 401 });
  }

  const body = await request.json();
  const parsed = wallReactionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  }

  await prisma.wallReaction.upsert({
    where: {
      postId_authorKey_emoji: {
        postId: parsed.data.postId,
        authorKey: session.subject,
        emoji: parsed.data.emoji
      }
    },
    update: {},
    create: {
      postId: parsed.data.postId,
      authorKey: session.subject,
      emoji: parsed.data.emoji
    }
  });

  return NextResponse.json({ ok: true });
}
