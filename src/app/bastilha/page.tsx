import Link from "next/link";
import { CtaBanner } from "@/components/cta-banner";
import { FeatureCard } from "@/components/cards";
import { PageHero } from "@/components/page-hero";
import { buildMetadata } from "@/lib/metadata";
import { getSection } from "@/lib/queries";
import { prisma } from "@/lib/prisma";

export const metadata = buildMetadata({
  title: "Bastilha de Bolsonier",
  pathname: "/bastilha"
});

export default async function BastilhaPage() {
  const intro = await getSection("bastilha", "intro");
  const [characters, timeline, episodes, pinnedPosts] = await Promise.all([
    prisma.bastilhaCharacter.findMany({
      orderBy: { sortOrder: "asc" },
      take: 3
    }),
    prisma.timelineEvent.findMany({
      orderBy: { sortOrder: "asc" },
      take: 3
    }),
    prisma.episode.findMany({
      where: { series: "Bastilha de Bolsonier" },
      orderBy: { publishedAt: "desc" },
      take: 3
    }),
    prisma.wallPost.findMany({
      where: { pinned: true },
      orderBy: { createdAt: "desc" },
      take: 2
    })
  ]);

  return (
    <>
      <PageHero
        eyebrow={intro?.eyebrow || "Universo interno"}
        title={intro?.title || ""}
        body={intro?.body || ""}
      >
        <div className="space-y-4 text-sm text-zinc-300">
          <div>Sinopse, personagens, cronologia e teorias do público.</div>
          <Link href="/bastilha/mural" className="btn-primary">
            {intro?.ctaLabel || "Entrar no mural"}
          </Link>
        </div>
      </PageHero>

      <section className="section-space">
        <div className="container-shell grid gap-5 lg:grid-cols-2">
          <FeatureCard
            kicker="Sinopse"
            title="Uma obra que trata o rumor como motor de cena"
            body="Bastilha de Bolsonier cruza cerimônia, ironia, poder, aparência e leitura pública em uma narrativa onde o silêncio também age."
          />
          <FeatureCard
            kicker="Experiência"
            title="Não é só acompanhar episódios"
            body="É entrar em um universo que organiza personagens, contexto, teorias e retorno contínuo."
          />
        </div>
      </section>

      <section className="section-space border-t border-white/5">
        <div className="container-shell">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="kicker">Personagens</div>
              <h2 className="headline-md mt-4">Presenças que sustentam o salão</h2>
            </div>
            <Link href="/bastilha/personagens" className="text-sm text-zinc-300">
              Ver todos
            </Link>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {characters.map((character) => (
              <FeatureCard
                key={character.id}
                kicker={character.allegiance || "Bastilha"}
                title={character.name}
                body={character.summary}
                href="/bastilha/personagens"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="panel p-6">
            <div className="kicker">Cronologia</div>
            <div className="mt-5 grid gap-5">
              {timeline.map((item) => (
                <div key={item.id}>
                  <div className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                    {item.dateLabel}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{item.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/bastilha/cronologia" className="btn-secondary">
                Abrir dossiê
              </Link>
            </div>
          </div>

          <div className="panel p-6">
            <div className="kicker">Atualizações e rumores em destaque</div>
            <div className="mt-5 grid gap-5">
              {pinnedPosts.map((post) => (
                <div key={post.id} className="rounded-[1.5rem] border border-white/10 p-5">
                  <div className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                    {post.kind}
                  </div>
                  {post.title ? <h3 className="mt-2 text-lg font-semibold">{post.title}</h3> : null}
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{post.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/bastilha/mural" className="btn-secondary">
                Ir para o Salão dos Rumores
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space border-t border-white/5">
        <div className="container-shell">
          <div className="kicker">Atos e episódios</div>
          <h2 className="headline-md mt-4">Biblioteca viva da Bastilha</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {episodes.map((episode) => (
              <FeatureCard
                key={episode.id}
                kicker={episode.actLabel || episode.series}
                title={episode.title}
                body={episode.summary}
                href="/episodios"
              />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="Comunidade"
        title="O Salão dos Rumores transforma o público em parte da leitura."
        body="Teorias, comentários, reações e enquete semanal ajudam a manter o universo vivo entre um ato e outro."
        primaryLabel="Entrar no Salão dos Rumores"
        primaryHref="/bastilha/mural"
        secondaryLabel="Ver personagens"
        secondaryHref="/bastilha/personagens"
      />
    </>
  );
}
