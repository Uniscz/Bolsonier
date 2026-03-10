import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { buildMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";

type SearchParams = {
  series?: string;
  season?: string;
};

export const metadata = buildMetadata({
  title: "Episódios",
  pathname: "/episodios"
});

export default async function EpisodiosPage({
  searchParams
}: {
  searchParams: SearchParams;
}) {
  const seriesFilter = searchParams.series;
  const seasonFilter = searchParams.season ? Number(searchParams.season) : undefined;

  const [episodes, seriesList] = await Promise.all([
    prisma.episode.findMany({
      where: {
        ...(seriesFilter ? { series: seriesFilter } : {}),
        ...(seasonFilter ? { season: seasonFilter } : {})
      },
      orderBy: [{ publishedAt: "desc" }]
    }),
    prisma.episode.findMany({
      distinct: ["series"],
      select: { series: true }
    })
  ]);

  return (
    <>
      <PageHero
        eyebrow="Biblioteca"
        title="Episódios, atos e peças em circulação."
        body="Uma biblioteca pensada para suportar múltiplos projetos, temporadas, atos e formatos."
      >
        <div className="grid gap-2 text-sm text-zinc-400">
          <div>Filtros por projeto e temporada.</div>
          <div>Link externo ou embed.</div>
          <div>Estrutura pronta para crescer.</div>
        </div>
      </PageHero>

      <section className="section-space">
        <div className="container-shell grid gap-5 lg:grid-cols-[260px_1fr]">
          <aside className="panel h-fit p-6">
            <div className="kicker">Filtros</div>
            <div className="mt-4 grid gap-3 text-sm">
              <Link href="/episodios" className="text-zinc-300">
                Todos
              </Link>
              {seriesList.map((item) => (
                <Link
                  key={item.series}
                  href={`/episodios?series=${encodeURIComponent(item.series)}`}
                  className="text-zinc-400 hover:text-white"
                >
                  {item.series}
                </Link>
              ))}
            </div>
          </aside>

          <div className="grid gap-5">
            {episodes.map((episode) => (
              <article key={episode.id} className="panel p-6">
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-zinc-500">
                  <span>{episode.series}</span>
                  {episode.actLabel ? <span>{episode.actLabel}</span> : null}
                  {episode.season ? <span>Temporada {episode.season}</span> : null}
                </div>
                <h2 className="mt-4 font-display text-3xl font-semibold">{episode.title}</h2>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-300">{episode.summary}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {episode.externalUrl ? (
                    <Link href={episode.externalUrl} target="_blank" className="btn-primary">
                      Assistir fora do site
                    </Link>
                  ) : null}
                  <span className="inline-flex items-center rounded-full border border-white/10 px-4 py-3 text-sm text-zinc-400">
                    {new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(
                      episode.publishedAt
                    )}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
