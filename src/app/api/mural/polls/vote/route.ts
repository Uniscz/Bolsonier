import { NextResponse } from "next/server";
import { getCourtSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { wallVoteSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const session = await getCourtSession();

  if (!session) {
    return NextResponse.json({ error: "Entre no salão para votar." }, { status: 401 });
  }

  const body = await request.json();
  const parsed = wallVoteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  }

  try {
    await prisma.pollVote.create({
      data: {
        pollId: parsed.data.pollId,
        optionId: parsed.data.optionId,
        authorKey: session.subject
      }
    });
  } catch {
    return NextResponse.json({ error: "Você já votou nesta enquete." }, { status: 409 });
  }

  return NextResponse.json({ ok: true });
}
