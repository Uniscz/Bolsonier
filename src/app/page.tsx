import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { HeroVideo } from "@/components/hero-video";
import { Reveal } from "@/components/reveal";

export const dynamic = "force-dynamic";

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
              <h2
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
              </h2>
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

      {/* ── PERSONAGENS EM DESTAQUE ───────────────────────────── */}
      <section className="section-space">
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
                  {/* Thumbnail slot */}
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: "9/16", maxHeight: "340px" }}
                  >
                    {ep.thumbnailUrl ? (
                      <img
                        src={ep.thumbnailUrl}
                        alt={ep.title}
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
                      style={{ aspectRatio: "9/16", maxHeight: "340px" }}
                    >
                      <span className="font-display text-lg" style={{ color: "rgba(168,138,80,0.2)", fontWeight: 300 }}>
                            {romanNumerals[i]}
                          </span>
                    </div>
                    <div className="p-5">
                      <div className="act-number mb-2">ATO {romanNumerals[i]}</div>
                    </div>
                  </div>
                </Reveal>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── CRONOLOGIA PREVIEW ───────────────────────────────── */}
      <section className="section-space border-t" style={{ borderColor: "rgb(var(--border))" }}>
        <div className="container-shell">
          <Reveal>
            <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-end">
              <div>
                <div className="kicker mb-4">Dossiê</div>
                <h2 className="headline-md">A linha da queda</h2>
              </div>
              <p className="body-lg">
                Uma linha de acontecimentos, viradas e mudanças de percepção para orientar quem entra agora e para aprofundar quem já acompanha.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-px" style={{ background: "rgb(var(--border))" }}>
            {[
              { num: "I", title: "Consolidação da ordem aparente", desc: "A Bastilha se apresenta como casa de prestígio, disciplina e autoridade simbólica." },
              { num: "IV", title: "Erosão dos vínculos", desc: "Lealdades cedem à suspeita, à vaidade e à necessidade de preservação individual." },
              { num: "VII", title: "Convergência das hostilidades", desc: "Múltiplas forças adversas passam a orbitar o mesmo centro de desgaste." },
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
                    <div className="headline-sm mb-2" style={{ color: "rgb(var(--foreground))" }}>{item.title}</div>
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

      {/* ── SALÃO DOS RUMORES CTA ─────────────────────────────── */}
      {/* ── CIRCULAÇÃO PÚBLICA ─────────────────────────────── */}
      <section className="section-space border-t" style={{ borderColor: "rgb(var(--border))" }}>
        <div className="container-shell">
          <Reveal>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-xl">
                <div className="kicker mb-4">Circulação pública</div>
                <p className="body-lg" style={{ color: "rgb(var(--muted))" }}>
                  A Bastilha não se encerra neste domínio. Seus atos, ecos e repercussões seguem em circulação pública nas plataformas da casa.
                </p>
              </div>
              <div className="flex flex-col gap-3 flex-shrink-0">
                {[
                  { href: "https://www.tiktok.com/@euinelegivel", label: "TikTok" },
                  { href: "https://www.instagram.com/euinelegivel/", label: "Instagram" },
                  { href: "https://www.facebook.com/profile.php?id=61573541386906", label: "Facebook" },
                ].map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                    style={{ color: "rgb(var(--muted))" }}
                  >
                    <div
                      className="h-px w-5 flex-shrink-0 transition-all duration-300 group-hover:w-8"
                      style={{ background: "rgb(var(--gold-dim))" }}
                    />
                    <span
                      className="text-sm transition-colors group-hover:text-gold"
                      style={{ letterSpacing: "0.08em" }}
                    >
                      {s.label}
                    </span>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.35 }}>
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

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
