import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/reveal";

export const dynamic = "force-dynamic";

export default async function BastilhaPage() {
  const [characters, timeline, episodes, pinnedPosts] = await Promise.all([
    prisma.bastilhaCharacter.findMany({ orderBy: { sortOrder: "asc" }, take: 6 }),
    prisma.timelineEvent.findMany({ orderBy: { sortOrder: "asc" }, take: 4 }),
    prisma.episode.findMany({ where: { featured: true }, orderBy: { publishedAt: "desc" }, take: 3 }),
    prisma.wallPost.findMany({ where: { pinned: true }, orderBy: { createdAt: "desc" }, take: 2 })
  ]);

  return (
    <>
      {/* ── HERO DA BASTILHA ──────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "80vh", background: "rgb(var(--background))" }}
      >
        {/* Keyart */}
        <div className="absolute inset-0 z-0">
          <div
            className="h-full w-full"
            style={{ opacity: 0.4 }}
          >
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/fayYxcXQLgALYhXH.jpeg"
              alt="Bastilha de Bolsonière"
              className="h-full w-full object-cover"
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, rgba(8,7,6,0.95) 0%, rgba(8,7,6,0.6) 50%, rgba(8,7,6,0.8) 100%)"
            }}
          />
        </div>

        <div className="relative z-10 container-shell flex items-end min-h-[80vh] pb-16">
          <div className="max-w-2xl animate-fade-up">
            <div className="kicker mb-6">Universo interno</div>
            <h1
              className="font-display mb-6"
              style={{
                fontSize: "clamp(3rem, 6vw, 5.5rem)",
                fontWeight: 300,
                lineHeight: 1.04,
                letterSpacing: "-0.025em",
                color: "rgb(var(--foreground))"
              }}
            >
              Bastilha de<br />
              <em style={{ fontStyle: "italic", color: "rgb(var(--gold))" }}>Bolsonier</em>
            </h1>
            <p className="body-lg mb-8 max-w-xl">
              Na Bastilha de Bolsonier, a ordem jamais se sustenta por inocência, mas por aparência, conveniência e temor.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/bastilha/personagens" className="btn-primary">Ver personagens</Link>
              <Link href="/bastilha/mural" className="btn-secondary">Salão dos Rumores</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SINOPSE EXPANDIDA ─────────────────────────────────── */}
      <section className="section-space border-t" style={{ borderColor: "rgb(var(--border))" }}>
        <div className="container-shell">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr]">
            <Reveal>
              <div className="kicker mb-6">Sinopse</div>
              <h2 className="headline-md mb-6">A ordem que se sustenta pelo temor</h2>

              {/* Trailer */}
              <div
                className="mt-8 overflow-hidden"
                style={{ aspectRatio: "9/16", maxWidth: "240px", border: "1px solid rgba(168,138,80,0.2)" }}
              >
                <video
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/JlkDjASBHeYILUWq.mp4"
                  muted
                  loop
                  playsInline
                  autoPlay
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal className="delay-200">
              <p className="body-lg mb-6">
                Na Bastilha de Bolsonier, a ordem jamais se sustenta por inocência, mas por aparência, conveniência e temor. Sob o verniz da linhagem, da etiqueta e da solenidade, a corte é governada por pactos instáveis, afetos degradados pelo interesse, rivalidades hereditárias e verdades cuja revelação comprometeria não apenas nomes, mas a própria arquitetura moral da casa.
              </p>
              <p className="body-lg mb-6">
                Ali, o prestígio circula como moeda, a intimidade converte-se em instrumento, e a memória serve menos à honra do que ao constrangimento. Entre herdeiros, soberanas, desterrados, jurisdições pessoais e alianças de ocasião, cada figura disputa não apenas posição, mas sobrevivência simbólica.
              </p>
              <p className="body-lg" style={{ color: "rgb(var(--gold))", fontStyle: "italic" }}>
                Na Bastilha, cair em desgraça é forma superior de execução.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PERSONAGENS ──────────────────────────────────────── */}
      <section className="section-space border-t" style={{ borderColor: "rgb(var(--border))" }}>
        <div className="container-shell">
          <Reveal>
            <div className="mb-12 flex items-end justify-between gap-4">
              <div>
                <div className="kicker mb-4">Elenco</div>
                <h2 className="headline-md">As presenças da corte</h2>
              </div>
              <Link href="/bastilha/personagens" className="btn-ghost hidden sm:inline-flex">
                Dossiê completo
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3" style={{ background: "rgb(var(--border))" }}>
            {characters.map((char, i) => (
              <Reveal key={char.id} className={`delay-${(i % 3) * 100}`}>
                <Link href="/bastilha/personagens" className="group block">
                  <div
                    className="relative overflow-hidden"
                    style={{ background: "rgb(var(--panel))", aspectRatio: "3/4" }}
                  >
                    {char.imageUrl ? (
                      <img
                        src={char.imageUrl}
                        alt={char.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className="h-full w-full flex flex-col items-center justify-center gap-3"
                        style={{ background: "rgb(var(--surface))" }}
                      >
                        <div
                          className="h-16 w-16 border flex items-center justify-center"
                          style={{ borderColor: "rgba(168,138,80,0.2)" }}
                        >
                          <span className="font-display text-2xl" style={{ color: "rgba(168,138,80,0.3)", fontWeight: 300 }}>
                            {char.name.charAt(0)}
                          </span>
                        </div>
                        <span className="media-slot-label">[PORTRAIT_{char.name.toUpperCase().split(" ")[0]}_MASTER]</span>
                      </div>
                    )}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(to top, rgba(8,7,6,0.92) 0%, transparent 50%)" }}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="kicker-muted mb-1">{char.allegiance}</div>
                      <div className="font-display text-lg mb-1" style={{ color: "rgb(var(--foreground))", fontWeight: 300 }}>
                        {char.name}
                      </div>
                      {char.title && (
                        <div className="tension-line text-xs">{char.title}</div>
                      )}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CRONOLOGIA + RUMORES ─────────────────────────────── */}
      <section className="section-space border-t" style={{ borderColor: "rgb(var(--border))" }}>
        <div className="container-shell grid gap-8 lg:grid-cols-2">
          {/* Cronologia */}
          <Reveal>
            <div className="panel p-8 h-full">
              <div className="kicker mb-6">Dossiê</div>
              <h2 className="headline-sm mb-8">Cronologia da Bastilha</h2>
              <div className="grid gap-6">
                {timeline.map((event, i) => (
                  <div key={event.id} className="flex gap-4">
                    <div
                      className="flex-shrink-0 w-8 h-8 border flex items-center justify-center"
                      style={{ borderColor: "rgba(168,138,80,0.2)" }}
                    >
                      <span className="font-display text-xs" style={{ color: "rgb(var(--gold-dim))", fontWeight: 300 }}>
                        {["I","II","III","IV","V","VI","VII","VIII"][i] || i+1}
                      </span>
                    </div>
                    <div>
                      <div className="kicker-muted mb-1">{event.dateLabel}</div>
                      <div className="text-sm font-medium mb-1" style={{ color: "rgb(var(--foreground))" }}>{event.title}</div>
                      <p className="body-md text-xs">{event.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/bastilha/cronologia" className="btn-secondary">Abrir dossiê completo</Link>
              </div>
            </div>
          </Reveal>

          {/* Rumores */}
          <Reveal className="delay-200">
            <div className="panel p-8 h-full">
              <div className="kicker mb-6">Comunidade</div>
              <h2 className="headline-sm mb-8">Salão dos Rumores</h2>
              <div className="grid gap-5">
                {pinnedPosts.length > 0 ? pinnedPosts.map((post) => (
                  <div key={post.id} className="rumor-card">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="badge-gold">{post.kind}</span>
                      {post.pinned && <span className="badge-wine">Destaque</span>}
                    </div>
                    {post.title && (
                      <div className="text-sm font-medium mb-2" style={{ color: "rgb(var(--foreground))" }}>{post.title}</div>
                    )}
                    <p className="body-md text-xs">{post.body}</p>
                    <div className="mt-3 text-xs" style={{ color: "rgb(var(--subtle))" }}>Por {post.authorName}</div>
                  </div>
                )) : (
                  <>
                    <div className="rumor-card">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="badge-gold">Rumor em destaque</span>
                      </div>
                      <div className="text-sm font-medium mb-2" style={{ color: "rgb(var(--foreground))" }}>[TÍTULO DO RUMOR]</div>
                      <p className="body-md text-xs">[Conteúdo do rumor em destaque da semana]</p>
                    </div>
                    <div className="rumor-card">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="badge-wine">Suspeita da semana</span>
                      </div>
                      <p className="body-md text-xs">[Teoria ou suspeita em circulação]</p>
                    </div>
                  </>
                )}
              </div>
              <div className="mt-8">
                <Link href="/bastilha/mural" className="btn-primary">Entrar no Salão</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ATOS ─────────────────────────────────────────────── */}
      <section className="section-space border-t" style={{ borderColor: "rgb(var(--border))" }}>
        <div className="container-shell">
          <Reveal>
            <div className="mb-12 flex items-end justify-between gap-4">
              <div>
                <div className="kicker mb-4">Biblioteca</div>
                <h2 className="headline-md">Atos e episódios</h2>
              </div>
              <Link href="/episodios" className="btn-ghost hidden sm:inline-flex">
                Ver todos
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {episodes.map((ep, i) => (
              <Reveal key={ep.id} className={`delay-${i * 100}`}>
                <Link href="/episodios" className="group block act-card">
                  <div className="relative overflow-hidden" style={{ aspectRatio: "9/16", maxHeight: "320px" }}>
                    {ep.thumbnailUrl ? (
                      <img src={ep.thumbnailUrl} alt={ep.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="h-full w-full media-slot">
                        <span className="media-slot-label">[THUMB_{ep.actLabel?.replace(" ", "_").toUpperCase() || "ATO"}]</span>
                      </div>
                    )}
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,7,6,0.95) 0%, rgba(8,7,6,0.2) 60%, transparent 100%)" }} />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <div className="act-number mb-2">{ep.actLabel || ep.series}</div>
                      <h3 className="headline-sm mb-2" style={{ color: "rgb(var(--foreground))" }}>{ep.title}</h3>
                      <p className="tension-line line-clamp-2 text-xs">{ep.summary}</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
