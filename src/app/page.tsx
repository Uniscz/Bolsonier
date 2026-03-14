import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { HeroVideo } from "@/components/hero-video";
import { Reveal } from "@/components/reveal";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "A Bastilha de Bolsonier | Série dramática brasileira | Bolsonier Studios",
  description:
    "A Bastilha de Bolsonier é uma série dramática brasileira criada por André Luiz de Almeida. Conheça personagens, atos, cronologia e o universo oficial da obra.",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://www.bolsonier.art"
  }
};

export default async function HomePage() {
  const [characters, episodes] = await Promise.all([
    prisma.bastilhaCharacter.findMany({
      orderBy: { sortOrder: "asc" },
      take: 4
    }),
    prisma.episode.findMany({
      where: { featured: true },
      orderBy: { publishedAt: "asc" },
      take: 3
    })
  ]);
  const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <HeroVideo
        videoSrc="https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/YHSdAwMaGoGhkPOV.mp4"
        posterSrc="https://files.manuscdn.com/user_upload_by_module/session_file/310519663381721525/YVKlrWYXrTsKodOt.png"
      />

      {/* ── SINOPSE ──────────────────────────────────────────── */}
      <section className="section-space border-t" style={{ borderColor: "rgb(var(--border))" }}>
        <div className="container-shell">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <Reveal>
              <div className="kicker mb-6">A obra</div>
              <h1
                className="font-display"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  fontWeight: 300,
                  lineHeight: 1.15,
                  letterSpacing: "-0.015em",
                  color: "rgb(var(--foreground))"
                }}
              >
                Uma corte erguida sobre poder, herança, desejo e ruína.
              </h1>
            </Reveal>
            <Reveal className="delay-200">
              <p className="body-lg mb-8">
                Na Bastilha de Bolsonier, o poder não se proclama, administra-se. Entre alianças frágeis, silêncios calculados e vínculos corroídos pela ambição, cada gesto possui valor de ameaça e cada ausência pode adquirir peso de sentença.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/bastilha" className="btn-primary">Entrar na Bastilha</Link>
                <Link href="/bastilha/personagens" className="btn-secondary">Ver personagens</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── BLOCO INSTITUCIONAL ──────────────────────────────── */}
      <section className="section-space border-t" style={{ borderColor: "rgb(var(--border))" }}>
        <div className="container-shell">
          <Reveal>
            <div
              className="grid gap-10 lg:grid-cols-[1fr_1px_1fr] items-start"
            >
              {/* Texto institucional */}
              <div>
                <div className="kicker mb-6">Identificação oficial</div>
                <h2
                  className="font-display mb-6"
                  style={{
                    fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                    fontWeight: 300,
                    lineHeight: 1.2,
                    color: "rgb(var(--foreground))"
                  }}
                >
                  A Bastilha de Bolsonier
                </h2>
                <p className="body-lg mb-4" style={{ color: "rgb(var(--muted))" }}>
                  Websérie dramática brasileira criada por <strong style={{ color: "rgb(var(--foreground))", fontWeight: 400 }}>André Luiz de Almeida</strong> e produzida por <strong style={{ color: "rgb(var(--foreground))", fontWeight: 400 }}>Bolsonier Studios</strong>. Um projeto audiovisual autoral de estética aristocrática, intriga política e dramaturgia de câmara, situado no Brasil, com estreia em 2026.
                </p>
                <Link href="/obra/a-bastilha-de-bolsonier" className="btn-ghost mt-2 inline-flex">
                  Página oficial da obra
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Divisor vertical */}
              <div
                className="hidden lg:block h-full w-px self-stretch"
                style={{ background: "rgb(var(--border))" }}
              />

              {/* Ficha da obra */}
              <div>
                <div className="kicker mb-6">Ficha da obra</div>
                <dl className="grid gap-3">
                  {[
                    { label: "Título oficial", value: "A Bastilha de Bolsonier" },
                    { label: "Formato", value: "Websérie / Série dramática" },
                    { label: "Criador", value: "André Luiz de Almeida" },
                    { label: "Estúdio", value: "Bolsonier Studios" },
                    { label: "País", value: "Brasil" },
                    { label: "Idioma", value: "Português" },
                    { label: "Ano", value: "2026" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-baseline gap-4 py-2 border-b"
                      style={{ borderColor: "rgba(168,138,80,0.08)" }}
                    >
                      <dt
                        className="flex-shrink-0 text-xs uppercase"
                        style={{ letterSpacing: "0.12em", color: "rgb(var(--subtle))", minWidth: "120px" }}
                      >
                        {item.label}
                      </dt>
                      <dd
                        className="font-display text-sm"
                        style={{ color: "rgb(var(--foreground))", fontWeight: 300 }}
                      >
                        {item.value}
                      </dd>
                    </div>
                  ))}
                  <div
                    className="flex items-baseline gap-4 py-2"
                  >
                    <dt
                      className="flex-shrink-0 text-xs uppercase"
                      style={{ letterSpacing: "0.12em", color: "rgb(var(--subtle))", minWidth: "120px" }}
                    >
                      IMDb
                    </dt>
                    <dd>
                      <a
                        href="https://www.imdb.com/title/tt40604167/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-display text-sm transition-colors"
                        style={{ color: "rgb(var(--gold))", fontWeight: 300, letterSpacing: "0.02em" }}
                        onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.75")}
                        onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
                      >
                        tt40604167 ↗
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PERSONAGENS EM DESTAQUE ───────────────────────────── */}
      <section className="section-space border-t" style={{ borderColor: "rgb(var(--border))" }}>
        <div className="container-shell">
          <Reveal>
            <div className="mb-12 flex items-end justify-between gap-4">
              <div>
                <div className="kicker mb-4">Elenco</div>
                <h2 className="headline-md">As presenças que sustentam a corte</h2>
              </div>
              <Link href="/bastilha/personagens" className="btn-ghost hidden sm:inline-flex">
                Ver todos
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </Reveal>
          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: "rgb(var(--border))" }}>
            {characters.length > 0 ? characters.map((char, i) => (
              <Reveal key={char.id} className={`delay-${(i % 4) * 100}`}>
                <Link href="/bastilha/personagens" className="group block">
                  <div
                    className="relative overflow-hidden"
                    style={{ background: "rgb(var(--panel))", aspectRatio: "3/4" }}
                  >
                    {char.imageUrl ? (
                      <img
                        src={char.imageUrl}
                        alt={`${char.name} — personagem de A Bastilha de Bolsonier`}
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
                        <span className="font-display text-xs" style={{ color: "rgba(168,138,80,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                          {char.name.split(" ")[0]}
                        </span>
                      </div>
                    )}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(to top, rgba(8,7,6,0.9) 0%, transparent 50%)" }}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="kicker-muted mb-1">{char.allegiance}</div>
                      <div className="font-display text-lg" style={{ color: "rgb(var(--foreground))", fontWeight: 300 }}>
                        {char.name}
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            )) : (
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="media-slot"
                  style={{ aspectRatio: "3/4", background: "rgb(var(--panel))" }}
                >
                  <span className="font-display text-2xl" style={{ color: "rgba(168,138,80,0.2)", fontWeight: 300 }}>{romanNumerals[i]}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── ATOS EM DESTAQUE ─────────────────────────────────── */}
      <section className="section-space border-t" style={{ borderColor: "rgb(var(--border))" }}>
        <div className="container-shell">
          <Reveal>
            <div className="mb-12 flex items-end justify-between gap-4">
              <div>
                <div className="kicker mb-4">Atos</div>
                <h2 className="headline-md">A biblioteca viva da Bastilha</h2>
              </div>
              <Link href="/episodios" className="btn-ghost hidden sm:inline-flex">
                Ver todos os atos
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {episodes.length > 0 ? episodes.map((ep, i) => (
              <Reveal key={ep.id} className={`delay-${i * 100}`}>
                <Link href="/episodios" className="group block act-card">
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: "9/16", maxHeight: "340px" }}
                  >
                    {ep.thumbnailUrl ? (
                      <img
                        src={ep.thumbnailUrl}
                        alt={`${ep.title} — ${ep.actLabel || ep.series} de A Bastilha de Bolsonier`}
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
                      style={{ background: "linear-gradient(to top, rgba(8,7,6,0.95) 0%, rgba(8,7,6,0.3) 50%, transparent 100%)" }}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <div className="act-number mb-2">{ep.actLabel || ep.series}</div>
                      <h3 className="headline-sm mb-2" style={{ color: "rgb(var(--foreground))" }}>{ep.title}</h3>
                      <p className="tension-line line-clamp-2">{ep.summary}</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            )) : (
              Array.from({ length: 3 }).map((_, i) => (
                <Reveal key={i} className={`delay-${i * 100}`}>
                  <div className="act-card">
                    <div
                      className="media-slot"
                      style={{ aspectRatio: "9/16", maxHeight: "340px", background: "rgb(var(--panel))" }}
                    >
                      <span className="font-display text-2xl" style={{ color: "rgba(168,138,80,0.2)", fontWeight: 300 }}>
                        {romanNumerals[i]}
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── CRONOLOGIA ───────────────────────────────────────── */}
      <section className="section-space border-t" style={{ borderColor: "rgb(var(--border))" }}>
        <div className="container-shell">
          <Reveal>
            <div className="mb-12">
              <div className="kicker mb-4">Cronologia</div>
              <h2 className="headline-md">A ordem dos acontecimentos</h2>
            </div>
          </Reveal>
          <div className="grid gap-px" style={{ background: "rgb(var(--border))" }}>
            {[
              { num: "I", title: "A fundação do poder ilegítimo", desc: "Todo poder que se sustenta sobre silêncio começa por apagar os registros de sua própria origem." },
              { num: "II", title: "O primeiro pacto de conveniência", desc: "A aliança que funda a Bastilha não nasce da lealdade, mas do cálculo recíproco de duas ambições que se reconhecem." },
              { num: "III", title: "A entrada da ameaça lateral", desc: "Quando uma presença externa começa a ser lida como alternativa, o centro perde sua naturalidade." },
              { num: "IV", title: "A fissura interna", desc: "O primeiro sinal de ruptura não é o conflito aberto, mas a mudança de tom nas conversas privadas." },
              { num: "V", title: "O reposicionamento das lealdades", desc: "Cada personagem recalcula sua posição quando percebe que o centro não é mais seguro." },
              { num: "VI", title: "A crise de representação", desc: "O momento em que a fachada já não é suficiente para conter o que acontece nos bastidores." },
              { num: "VII", title: "A disputa pela narrativa", desc: "Quem controla a versão dos fatos controla o destino. Todos os personagens convergem para o mesmo centro de desgaste." },
              { num: "VIII", title: "A morte como desfecho cerimonial", desc: "A ruína atinge sua forma suprema quando o poder tenta sobreviver à própria decomposição." },
            ].map((item, i) => (
              <Reveal key={i} className={`delay-${i * 100}`}>
                <div
                  className="group flex items-start gap-6 p-6 transition-colors"
                  style={{ background: "rgb(var(--panel))" }}
                >
                  <div
                    className="flex-shrink-0 w-12 h-12 border flex items-center justify-center"
                    style={{ borderColor: "rgba(168,138,80,0.2)" }}
                  >
                    <span className="font-display text-sm" style={{ color: "rgb(var(--gold-dim))", fontWeight: 300 }}>{item.num}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="headline-sm mb-2" style={{ color: "rgb(var(--foreground))" }}>{item.title}</h3>
                    <p className="body-md">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8">
            <Link href="/bastilha/cronologia" className="btn-secondary">
              Abrir cronologia completa
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── ONDE ACOMPANHAR ──────────────────────────────────── */}
      <section className="section-space border-t" style={{ borderColor: "rgb(var(--border))" }}>
        <div className="container-shell">
          <Reveal>
            <div className="mb-12">
              <div className="kicker mb-4">Presença oficial</div>
              <h2 className="headline-md">Onde acompanhar a obra</h2>
              <p className="body-lg mt-4 max-w-2xl" style={{ color: "rgb(var(--muted))" }}>
                A Bastilha de Bolsonier circula em múltiplos domínios. Cada plataforma é um ponto de entrada distinto para o universo da obra.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3" style={{ background: "rgb(var(--border))" }}>
            {[
              {
                href: "/obra/a-bastilha-de-bolsonier",
                label: "Site oficial",
                desc: "Página institucional completa da obra, com ficha, personagens, atos e universo narrativo.",
                external: false,
                tag: "Oficial"
              },
              {
                href: "https://www.imdb.com/title/tt40604167/",
                label: "IMDb",
                desc: "Registro oficial da obra na base de dados cinematográfica internacional.",
                external: true,
                tag: "Base de dados"
              },
              {
                href: "https://www.tiktok.com/@euinelegivel",
                label: "TikTok",
                desc: "Atos, fragmentos e aparições da Bastilha em circulação pública.",
                external: true,
                tag: "Plataforma"
              },
              {
                href: "https://www.instagram.com/euinelegivel/",
                label: "Instagram",
                desc: "Imagens, retratos e registros visuais do universo da obra.",
                external: true,
                tag: "Plataforma"
              },
              {
                href: "https://www.facebook.com/profile.php?id=61573541386906",
                label: "Facebook",
                desc: "Circulação e repercussão pública dos episódios e eventos da corte.",
                external: true,
                tag: "Plataforma"
              },
            ].map((item) => (
              <Reveal key={item.href}>
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="group block p-8 transition-colors h-full"
                  style={{ background: "rgb(var(--panel))" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(168,138,80,0.04)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgb(var(--panel))")}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <span
                      className="text-xs uppercase"
                      style={{ letterSpacing: "0.15em", color: "rgb(var(--subtle))" }}
                    >
                      {item.tag}
                    </span>
                    {item.external && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.3, flexShrink: 0 }}>
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    )}
                  </div>
                  <div
                    className="font-display text-xl mb-3 transition-colors group-hover:text-gold"
                    style={{ color: "rgb(var(--foreground))", fontWeight: 300 }}
                  >
                    {item.label}
                  </div>
                  <p className="body-md text-sm" style={{ color: "rgb(var(--muted))" }}>
                    {item.desc}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SALÃO DOS RUMORES CTA ─────────────────────────────── */}
      <section className="section-space">
        <div className="container-shell">
          <Reveal>
            <div
              className="relative overflow-hidden p-10 md:p-16"
              style={{
                border: "1px solid rgba(168,138,80,0.2)",
                background: "linear-gradient(135deg, rgba(168,138,80,0.05) 0%, rgba(90,28,32,0.08) 50%, rgb(var(--panel)) 100%)"
              }}
            >
              <div className="relative z-10 max-w-2xl">
                <div className="kicker mb-6">Comunidade</div>
                <h2 className="headline-xl mb-6">
                  O Salão dos Rumores está aberto.
                </h2>
                <p className="body-lg mb-8">
                  Teorias, suspeitas, comentários e a enquete semanal. O espaço de leitura pública da Bastilha, onde o público se torna parte da narrativa.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/bastilha/mural" className="btn-primary">Entrar no Salão</Link>
                  <Link href="/bastilha" className="btn-secondary">Conhecer a Bastilha</Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
