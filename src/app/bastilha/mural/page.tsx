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
        <div className="space-y-4 text-sm text-foreground/80">
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

      {/* ── BLOCOS PÚBLICOS ─────────────────────────────────── */}
      <section className="section-space border-b" style={{ borderColor: "rgb(var(--border))" }}>
        <div className="container-shell">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="panel p-6">
              <div className="kicker mb-4">Rumor aberto</div>
              <h2 className="font-display text-xl mb-4" style={{ color: "rgb(var(--foreground))", fontWeight: 300 }}>Quem perdeu o controle da leitura pública?</h2>
              <p className="body-md text-sm" style={{ color: "rgb(var(--muted))" }}>A hipótese dominante entre os frequentadores do salão sustenta que a Bastilha já não administra o próprio clima. O que antes era contido por cerimônia agora vaza por gesto, silêncio e reposicionamento de figuras centrais.</p>
            </div>
            <div className="panel p-6">
              <div className="kicker mb-4">Enquete da semana</div>
              <h2 className="font-display text-xl mb-4" style={{ color: "rgb(var(--foreground))", fontWeight: 300 }}>A atual crise da Bastilha decorre de quê?</h2>
              <div className="grid gap-2 text-sm" style={{ color: "rgb(var(--muted))" }}>
                <div className="flex items-center gap-2"><span style={{ color: "rgb(var(--gold-dim))" }}>—</span>Da erosão interna dos vínculos</div>
                <div className="flex items-center gap-2"><span style={{ color: "rgb(var(--gold-dim))" }}>—</span>Do retorno de memórias mal encerradas</div>
                <div className="flex items-center gap-2"><span style={{ color: "rgb(var(--gold-dim))" }}>—</span>Da disputa por filiação e herança</div>
                <div className="flex items-center gap-2"><span style={{ color: "rgb(var(--gold-dim))" }}>—</span>Da incapacidade da corte de conter o rumor</div>
              </div>
            </div>
            <div className="panel p-6">
              <div className="kicker mb-4">Despacho do salão</div>
              <p className="body-md text-sm" style={{ color: "rgb(var(--muted))" }}>Este espaço recolhe impressões, suspeitas e leituras estratégicas do público. Nada aqui produz sentença. Mas quase tudo antecipa o que a corte tentará negar depois.</p>
            </div>
          </div>
        </div>
      </section>

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
                <p className="mt-4 text-sm leading-6 text-muted">
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
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-subtle">
                    <span>{post.kind}</span>
                    {post.pinned ? <span>Destaque</span> : null}
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                  {post.title ? <h2 className="mt-4 text-2xl font-semibold">{post.title}</h2> : null}
                  <p className="mt-4 text-sm leading-7 text-foreground/80">{post.body}</p>
                  <div className="mt-5 text-sm text-subtle">Por {post.authorName}</div>
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
