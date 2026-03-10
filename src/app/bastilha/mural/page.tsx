import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { MuralComposer } from "@/components/mural-composer";
import { MuralReactionBar } from "@/components/mural-reaction-bar";
import { PollCard } from "@/components/poll-card";
import { buildMetadata } from "@/lib/metadata";
import { getCourtSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Salão dos Rumores",
  pathname: "/bastilha/mural"
});

export default async function BastilhaMuralPage() {
  const session = await getCourtSession();
  const [posts, activePoll] = await Promise.all([
    prisma.wallPost.findMany({
      include: { reactions: true },
      orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
      take: 30
    }),
    prisma.poll.findFirst({
      where: { isActive: true },
      include: {
        options: {
          orderBy: { sortOrder: "asc" },
          include: { votes: true }
        }
      }
    })
  ]);

  return (
    <>
      <PageHero
        eyebrow="Bastilha"
        title="Salão dos Rumores"
        body="O espaço de leitura pública da Bastilha. Aqui entram teorias, reações, comentários e a enquete que ajuda a mover o clima entre os atos."
      >
        <div className="space-y-4 text-sm text-zinc-300">
          <div>
            {session
              ? `Você está no salão como ${session.name}.`
              : "Leitura pública liberada. Interação mediante passe da corte."}
          </div>
          {!session ? (
            <Link href="/bastilha/mural/entrar" className="btn-primary">
              Criar passe da corte
            </Link>
          ) : null}
        </div>
      </PageHero>

      <section className="section-space">
        <div className="container-shell grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            {session ? (
              <MuralComposer authorName={session.name || "Visitante da Corte"} />
            ) : (
              <div className="panel p-6">
                <div className="kicker">Participação</div>
                <h2 className="mt-3 font-display text-2xl font-semibold">
                  Leu, observou e quer reagir?
                </h2>
                <p className="mt-4 text-sm leading-6 text-zinc-400">
                  Crie um passe rápido para publicar teorias, comentar e votar na enquete semanal.
                </p>
                <div className="mt-6">
                  <Link href="/bastilha/mural/entrar" className="btn-primary">
                    Entrar agora
                  </Link>
                </div>
              </div>
            )}

            {activePoll ? (
              <PollCard
                canVote={Boolean(session)}
                poll={{
                  id: activePoll.id,
                  title: activePoll.title,
                  description: activePoll.description,
                  options: activePoll.options.map((option) => ({
                    id: option.id,
                    label: option.label,
                    votes: option.votes.length
                  }))
                }}
              />
            ) : null}
          </div>

          <div className="grid gap-5">
            {posts.map((post) => {
              const counts = post.reactions.reduce<Record<string, number>>((acc, reaction) => {
                acc[reaction.emoji] = (acc[reaction.emoji] || 0) + 1;
                return acc;
              }, {});

              return (
                <article key={post.id} className="panel p-6">
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-zinc-500">
                    <span>{post.kind}</span>
                    {post.pinned ? <span>Destaque</span> : null}
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                  {post.title ? <h2 className="mt-4 text-2xl font-semibold">{post.title}</h2> : null}
                  <p className="mt-4 text-sm leading-7 text-zinc-300">{post.body}</p>
                  <div className="mt-5 text-sm text-zinc-500">Por {post.authorName}</div>
                  <MuralReactionBar
                    postId={post.id}
                    counts={counts}
                    canReact={Boolean(session)}
                  />
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
