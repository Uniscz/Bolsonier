import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/reveal";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Atos | A Bastilha de Bolsonier",
  description:
    "Biblioteca completa dos atos de A Bastilha de Bolsonier — série dramática brasileira criada por André Luiz de Almeida. 9 atos de intriga política e dramaturgia aristocrática.",
  openGraph: {
    title: "Atos | A Bastilha de Bolsonier",
    description:
      "Biblioteca completa dos atos de A Bastilha de Bolsonier — série dramática brasileira criada por André Luiz de Almeida.",
    url: "/episodios",
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "A Bastilha de Bolsonier — Atos" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Atos | A Bastilha de Bolsonier",
    description: "Biblioteca completa dos atos de A Bastilha de Bolsonier.",
    images: ["/og-default.png"]
  },
  alternates: { canonical: "/episodios" }
};

const actsFallback = [
  { id: "1", title: "O Peso do Nome", actLabel: "Ato I", series: "A Bastilha de Bolsonier", summary: "A Bastilha se apresenta. A soberana recebe. A corte observa. Ninguém é inocente.", thumbnailUrl: null, videoUrl: null, externalUrl: null, featured: true, publishedAt: new Date() },
  { id: "2", title: "O Que Não Se Diz", actLabel: "Ato II", series: "A Bastilha de Bolsonier", summary: "O silêncio começa a custar mais do que a palavra. Alianças se formam sem declaração.", thumbnailUrl: null, videoUrl: null, externalUrl: null, featured: true, publishedAt: new Date() },
  { id: "3", title: "A Visita do Desterrado", actLabel: "Ato III", series: "A Bastilha de Bolsonier", summary: "Nicolau retorna. A corte finge indiferença. A soberana não consegue.", thumbnailUrl: null, videoUrl: null, externalUrl: null, featured: true, publishedAt: new Date() },
  { id: "4", title: "Jurisdição Pessoal", actLabel: "Ato IV", series: "A Bastilha de Bolsonier", summary: "Alexandra impõe sua leitura dos fatos. Ninguém ousa contradizê-la diretamente.", thumbnailUrl: null, videoUrl: null, externalUrl: null, featured: false, publishedAt: new Date() },
  { id: "5", title: "Heráldica do Excesso", actLabel: "Ato V", series: "A Bastilha de Bolsonier", summary: "Trumpetti chega. A corte sorri. Bastidores fervem.", thumbnailUrl: null, videoUrl: null, externalUrl: null, featured: false, publishedAt: new Date() },
  { id: "6", title: "Correntes Invisíveis", actLabel: "Ato VI", series: "A Bastilha de Bolsonier", summary: "Érienne move peças que ninguém vê. O equilíbrio começa a ceder.", thumbnailUrl: null, videoUrl: null, externalUrl: null, featured: false, publishedAt: new Date() },
  { id: "7", title: "A Disputa pela Narrativa", actLabel: "Ato VII", series: "A Bastilha de Bolsonier", summary: "Quem controla a versão dos fatos controla o destino. Todos convergem para o mesmo centro de desgaste.", thumbnailUrl: null, videoUrl: null, externalUrl: null, featured: false, publishedAt: new Date() },
  { id: "8", title: "A Morte como Desfecho Cerimonial", actLabel: "Ato VIII", series: "A Bastilha de Bolsonier", summary: "A ruína atinge sua forma suprema quando o poder tenta sobreviver à própria decomposição.", thumbnailUrl: null, videoUrl: null, externalUrl: null, featured: false, publishedAt: new Date() },
  { id: "9", title: "O Arquivo da Queda", actLabel: "Ato IX", series: "A Bastilha de Bolsonier", summary: "O que resta após o colapso não é silêncio, mas a versão que sobreviveu a todos os que tentaram suprimi-la.", thumbnailUrl: null, videoUrl: null, externalUrl: null, featured: false, publishedAt: new Date() },
];

export default async function EpisodiosPage() {
  const dbEpisodes = await prisma.episode.findMany({
    orderBy: { publishedAt: "asc" }
  });
  const episodes = dbEpisodes.length > 0 ? dbEpisodes : actsFallback;
  const featured = episodes.filter((e: any) => e.featured);
  const rest = episodes.filter((e: any) => !e.featured);

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="section-space border-b" style={{ borderColor: "rgb(var(--border))" }}>
        <div className="container-shell">
          <Reveal>
            <div className="kicker mb-6">Biblioteca</div>
            <h1
              className="font-display mb-6"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                fontWeight: 300,
                lineHeight: 1.06,
                letterSpacing: "-0.02em",
                color: "rgb(var(--foreground))"
              }}
            >
              Atos da<br />
              <em style={{ fontStyle: "italic", color: "rgb(var(--gold))" }}>Bastilha</em>
            </h1>
            <p className="body-lg max-w-2xl">
              Cada ato é um capítulo da queda. A biblioteca viva de <strong style={{ fontWeight: 400 }}>A Bastilha de Bolsonier</strong>, onde o poder se revela e se desfaz em 9 episódios de dramaturgia política e aristocrática.
            </p>
          </Reveal>
          {/* Índice semântico dos atos — legível para buscadores */}
          <Reveal className="delay-200">
            <div className="mt-10 flex flex-wrap gap-2">
              {episodes.map((ep: any) => (
                <span
                  key={ep.id}
                  className="text-xs border px-3 py-1.5"
                  style={{
                    borderColor: "rgba(168,138,80,0.2)",
                    color: "rgb(var(--subtle))",
                    letterSpacing: "0.08em"
                  }}
                >
                  {ep.actLabel}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ATOS EM DESTAQUE ─────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="section-space">
          <div className="container-shell">
            <Reveal>
              <div className="kicker mb-8">Em destaque</div>
            </Reveal>
            <div className="grid gap-5 md:grid-cols-3">
              {featured.slice(0, 3).map((ep: any, i: number) => (
                <Reveal key={ep.id} className={`delay-${i * 100}`}>
                  <article className="group act-card">
                    <div
                      className="relative overflow-hidden"
                      style={{ aspectRatio: "9/16", maxHeight: "380px" }}
                    >
                      {ep.thumbnailUrl ? (
                        <img
                          src={ep.thumbnailUrl}
                          alt={`${ep.title} — ${ep.actLabel} de A Bastilha de Bolsonier`}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div
                          className="h-full w-full flex items-center justify-center"
                          style={{ background: "rgb(var(--surface))" }}
                        >
                          <span className="font-display text-lg" style={{ color: "rgba(168,138,80,0.25)", fontWeight: 300 }}>
                            {ep.actLabel || ep.series}
                          </span>
                        </div>
                      )}
                      <div
                        className="absolute inset-0"
                        style={{ background: "linear-gradient(to top, rgba(8,7,6,0.98) 0%, rgba(8,7,6,0.2) 55%, transparent 100%)" }}
                      />
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <div className="act-number mb-2">{ep.actLabel || ep.series}</div>
                        <h2
                          className="font-display text-2xl mb-3"
                          style={{ color: "rgb(var(--foreground))", fontWeight: 300, lineHeight: 1.2 }}
                        >
                          {ep.title}
                        </h2>
                        <p className="tension-line text-sm line-clamp-3">{ep.summary}</p>
                        {ep.externalUrl && (
                          <a
                            href={ep.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary mt-4 inline-flex"
                            style={{ padding: "0.5rem 1.25rem", fontSize: "0.65rem" }}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                              <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                            Assistir
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TODOS OS ATOS ─────────────────────────────────────── */}
      {rest.length > 0 && (
        <section className="section-space border-t" style={{ borderColor: "rgb(var(--border))" }}>
          <div className="container-shell">
            <Reveal>
              <div className="kicker mb-4">Biblioteca completa</div>
              <p className="body-lg mb-8" style={{ maxWidth: "48rem", color: "rgb(var(--muted))" }}>
                Arquivo progressivo dos atos já públicos, organizados segundo a ordem de revelação e agravamento da queda.
              </p>
            </Reveal>
            <div className="grid gap-px" style={{ background: "rgb(var(--border))" }}>
              {rest.map((ep: any, i: number) => (
                <Reveal key={ep.id} className={`delay-${(i % 3) * 100}`}>
                  <article
                    className="group flex gap-5 p-5 transition-colors"
                    style={{ background: "rgb(var(--panel))" }}
                  >
                    <div
                      className="flex-shrink-0 overflow-hidden"
                      style={{ width: "80px", aspectRatio: "9/16" }}
                    >
                      {ep.thumbnailUrl ? (
                        <img
                          src={ep.thumbnailUrl}
                          alt={`${ep.title} — ${ep.actLabel} de A Bastilha de Bolsonier`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div
                          className="h-full w-full flex items-center justify-center"
                          style={{ background: "rgb(var(--surface))" }}
                        >
                          <span
                            className="font-display text-xs"
                            style={{ color: "rgba(168,138,80,0.3)", fontWeight: 300 }}
                          >
                            {ep.actLabel}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="act-number mb-1">{ep.actLabel || ep.series}</div>
                      <h2
                        className="font-display text-xl mb-2"
                        style={{ color: "rgb(var(--foreground))", fontWeight: 300 }}
                      >
                        {ep.title}
                      </h2>
                      <p className="tension-line text-sm line-clamp-2">{ep.summary}</p>
                    </div>
                    {ep.externalUrl && (
                      <div className="flex-shrink-0 flex items-center">
                        <a
                          href={ep.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-ghost"
                        >
                          Assistir
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </a>
                      </div>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ÍNDICE SEMÂNTICO COMPLETO ─────────────────────────── */}
      <section className="section-space border-t" style={{ borderColor: "rgb(var(--border))" }}>
        <div className="container-shell">
          <Reveal>
            <div className="kicker mb-6">Estrutura da série</div>
            <h2 className="headline-sm mb-8" style={{ color: "rgb(var(--foreground))" }}>
              A Bastilha de Bolsonier — 9 atos
            </h2>
            <p className="body-md mb-8" style={{ color: "rgb(var(--muted))", maxWidth: "48rem" }}>
              A série <strong style={{ fontWeight: 400 }}>A Bastilha de Bolsonier</strong> é composta por 9 atos, cada um correspondendo a uma fase distinta da queda e reconfiguração do poder na corte. Criada por <strong style={{ fontWeight: 400 }}>André Luiz de Almeida</strong> e produzida por <strong style={{ fontWeight: 400 }}>Bolsonier Studios</strong>, 2026.
            </p>
            <ol className="grid gap-2">
              {episodes.map((ep: any) => (
                <li
                  key={ep.id}
                  className="flex items-baseline gap-4 py-2 border-b"
                  style={{ borderColor: "rgba(168,138,80,0.06)" }}
                >
                  <span
                    className="flex-shrink-0 font-display text-xs"
                    style={{ color: "rgb(var(--gold-dim))", minWidth: "60px", letterSpacing: "0.08em" }}
                  >
                    {ep.actLabel}
                  </span>
                  <span
                    className="font-display text-sm"
                    style={{ color: "rgb(var(--foreground))", fontWeight: 300 }}
                  >
                    {ep.title}
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>
    </>
  );
}
