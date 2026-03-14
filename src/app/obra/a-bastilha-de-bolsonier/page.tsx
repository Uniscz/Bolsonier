import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/reveal";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "A Bastilha de Bolsonier | Página oficial da obra",
  description:
    "Página oficial de A Bastilha de Bolsonier — série dramática brasileira criada por André Luiz de Almeida e produzida por Bolsonier Studios. Sinopse, ficha técnica, personagens, atos e universo narrativo.",
  openGraph: {
    title: "A Bastilha de Bolsonier | Página oficial da obra",
    description:
      "Página oficial de A Bastilha de Bolsonier — série dramática brasileira criada por André Luiz de Almeida e produzida por Bolsonier Studios.",
    url: "/obra/a-bastilha-de-bolsonier",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "A Bastilha de Bolsonier — Poster oficial"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "A Bastilha de Bolsonier | Página oficial da obra",
    description:
      "Página oficial de A Bastilha de Bolsonier — série dramática brasileira criada por André Luiz de Almeida.",
    images: ["/og-default.png"]
  },
  alternates: {
    canonical: "/obra/a-bastilha-de-bolsonier"
  }
};

const fichaData = [
  { label: "Título oficial", value: "A Bastilha de Bolsonier" },
  { label: "Formato", value: "Websérie / Série dramática" },
  { label: "Criador", value: "André Luiz de Almeida" },
  { label: "Estúdio", value: "Bolsonier Studios" },
  { label: "País", value: "Brasil" },
  { label: "Idioma", value: "Português" },
  { label: "Ano", value: "2026" },
  { label: "Gênero", value: "Drama político, intriga aristocrática" },
];

const staticCharacters = [
  { name: "Jairene de Bolsonier", title: "Soberana da Bastilha", allegiance: "Casa Bolsonier", summary: "Governa por presença, cálculo e autoridade de linhagem. Na Bastilha, sua palavra não é lei porque é proclamada, mas porque é acatada antes de ser dita." },
  { name: "Luísa Ignácia de Silvene", title: "Observadora da corte", allegiance: "Casa Silvene", summary: "Habituada a ler o desvio antes que ele se converta em escândalo. Sua inteligência opera menos por exibição do que por leitura precisa do que não se diz." },
  { name: "Alexandra de Moraes y Valença", title: "Jurisdição pessoal", allegiance: "Valença", summary: "Presença jurídica e glacial, cercada de conveniência e ambiguidade estratégica. Necessita de centralidade tanto quanto Jairene necessita de ordem." },
  { name: "Don Trumpetti Vittorio", title: "Heráldica do excesso", allegiance: "Corte externa", summary: "Oscilando entre prestígio remanescente, decadência íntima e vulnerabilidade pública. A aliança com a Bastilha já apresenta sinais visíveis de erosão simbólica." },
  { name: "Nicoletty Vittoria Trumpetti di Bolsonier", title: "Identidade incendiária", allegiance: "Linhagem dupla", summary: "Sua mera presença desloca leituras, reabre comparações e introduz instabilidade no regime de aparências da Bastilha." },
  { name: "Domitila Rousselle Alcântara de Hylteon", title: "Gravidade ancestral", allegiance: "Casa Hylteon", summary: "Em cuja compostura sobrevivem tradição, vigilância e memória de sangue." },
  { name: "Nicolau de Hylteon", title: "O desterrado", allegiance: "Casa Hylteon", summary: "Sua simples reentrada restitui à corte aquilo que ela mais teme: memória. Cada aparição sua recoloca em circulação perguntas que a Bastilha julgava encerradas." },
  { name: "Érienne de Hylteon", title: "Correntes invisíveis", allegiance: "Casa Hylteon", summary: "Ligada às correntes invisíveis que movem o destino da casa sem jamais se anunciar por inteiro." },
];

const atos = [
  { num: "I", title: "A fundação do poder ilegítimo", desc: "Todo poder que se sustenta sobre silêncio começa por apagar os registros de sua própria origem." },
  { num: "II", title: "O primeiro pacto de conveniência", desc: "A aliança que funda a Bastilha não nasce da lealdade, mas do cálculo recíproco de duas ambições que se reconhecem." },
  { num: "III", title: "A entrada da ameaça lateral", desc: "Quando uma presença externa começa a ser lida como alternativa, o centro perde sua naturalidade." },
  { num: "IV", title: "A fissura interna", desc: "O primeiro sinal de ruptura não é o conflito aberto, mas a mudança de tom nas conversas privadas." },
  { num: "V", title: "O reposicionamento das lealdades", desc: "Cada personagem recalcula sua posição quando percebe que o centro não é mais seguro." },
  { num: "VI", title: "A crise de representação", desc: "O momento em que a fachada já não é suficiente para conter o que acontece nos bastidores." },
  { num: "VII", title: "A disputa pela narrativa", desc: "Quem controla a versão dos fatos controla o destino. Todos os personagens convergem para o mesmo centro de desgaste." },
  { num: "VIII", title: "A morte como desfecho cerimonial", desc: "A ruína atinge sua forma suprema quando o poder tenta sobreviver à própria decomposição." },
  { num: "IX", title: "O arquivo da queda", desc: "O que resta após o colapso não é silêncio, mas a versão que sobreviveu a todos os que tentaram suprimi-la." },
];

export default async function ObraPage() {
  const [dbCharacters, dbEpisodes] = await Promise.all([
    prisma.bastilhaCharacter.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.episode.findMany({ orderBy: { publishedAt: "asc" } })
  ]);

  const characters = dbCharacters.length > 0 ? dbCharacters : staticCharacters;
  const episodes = dbEpisodes;

  return (
    <>
      {/* ── HERO INSTITUCIONAL ───────────────────────────────── */}
      <section
        className="section-space border-b"
        style={{
          borderColor: "rgb(var(--border))",
          background: "linear-gradient(to bottom, rgba(168,138,80,0.04) 0%, transparent 60%)"
        }}
      >
        <div className="container-shell">
          <Reveal>
            <div className="kicker mb-6">Página oficial da obra</div>
            <h1
              className="font-display mb-6"
              style={{
                fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: "rgb(var(--foreground))"
              }}
            >
              A Bastilha<br />
              <em style={{ fontStyle: "italic", color: "rgb(var(--gold))" }}>de Bolsonier</em>
            </h1>
            <p
              className="body-lg max-w-2xl"
              style={{ color: "rgb(var(--muted))" }}
            >
              Série dramática brasileira. Uma corte ficcional onde poder, herança, desejo e ruína se entrelaçam em intriga política de câmara.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── SINOPSE OFICIAL ──────────────────────────────────── */}
      <section className="section-space border-b" style={{ borderColor: "rgb(var(--border))" }}>
        <div className="container-shell">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr] lg:items-start">
            {/* Poster */}
            <Reveal>
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: "2/3",
                  background: "rgb(var(--surface))",
                  border: "1px solid rgba(168,138,80,0.15)"
                }}
              >
                <img
                  src="/og-default.png"
                  alt="A Bastilha de Bolsonier — Poster oficial da série dramática brasileira"
                  className="h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(8,7,6,0.6) 0%, transparent 50%)" }}
                />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div
                    className="font-display text-xs uppercase"
                    style={{ letterSpacing: "0.2em", color: "rgb(var(--gold-dim))" }}
                  >
                    Bolsonier Studios — 2026
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Sinopse + Ficha */}
            <div>
              <Reveal>
                <div className="kicker mb-6">Sinopse oficial</div>
                <h2
                  className="font-display mb-6"
                  style={{
                    fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                    fontWeight: 300,
                    lineHeight: 1.2,
                    color: "rgb(var(--foreground))"
                  }}
                >
                  Na Bastilha de Bolsonier, o poder não se proclama. Administra-se.
                </h2>
                <p className="body-lg mb-4" style={{ color: "rgb(var(--muted))" }}>
                  Entre alianças frágeis, silêncios calculados e vínculos corroídos pela ambição, cada gesto possui valor de ameaça e cada ausência pode adquirir peso de sentença. A série acompanha a dinâmica interna de uma corte ficcional brasileira, onde a luta pelo poder se trava não em batalhas abertas, mas em conversas privadas, reposicionamentos sutis e disputas pela versão legítima dos fatos.
                </p>
                <p className="body-lg mb-8" style={{ color: "rgb(var(--muted))" }}>
                  Uma obra de dramaturgia aristocrática, intriga política e estética cinematográfica, criada por André Luiz de Almeida e produzida por Bolsonier Studios.
                </p>
              </Reveal>

              <Reveal className="delay-200">
                <div className="kicker mb-6">Ficha da obra</div>
                <dl className="grid gap-0">
                  {fichaData.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-baseline gap-4 py-3 border-b"
                      style={{ borderColor: "rgba(168,138,80,0.08)" }}
                    >
                      <dt
                        className="flex-shrink-0 text-xs uppercase"
                        style={{ letterSpacing: "0.12em", color: "rgb(var(--subtle))", minWidth: "130px" }}
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
                  <div className="flex items-baseline gap-4 py-3">
                    <dt
                      className="flex-shrink-0 text-xs uppercase"
                      style={{ letterSpacing: "0.12em", color: "rgb(var(--subtle))", minWidth: "130px" }}
                    >
                      IMDb
                    </dt>
                    <dd>
                      <a
                        href="https://www.imdb.com/title/tt40604167/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-display text-sm transition-opacity hover:opacity-75"
                        style={{ color: "rgb(var(--gold))", fontWeight: 300 }}
                      >
                        Acessar registro oficial ↗
                      </a>
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── PERSONAGENS CENTRAIS ─────────────────────────────── */}
      <section className="section-space border-b" style={{ borderColor: "rgb(var(--border))" }}>
        <div className="container-shell">
          <Reveal>
            <div className="mb-12 flex items-end justify-between gap-4">
              <div>
                <div className="kicker mb-4">Elenco central</div>
                <h2 className="headline-md">Personagens da obra</h2>
              </div>
              <Link href="/bastilha/personagens" className="btn-ghost hidden sm:inline-flex">
                Dossiê completo
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </Reveal>

          {/* Lista semântica de personagens — visível para buscadores */}
          <div className="grid gap-px sm:grid-cols-2" style={{ background: "rgb(var(--border))" }}>
            {characters.map((char: any, i: number) => (
              <Reveal key={char.id || char.name} className={`delay-${(i % 2) * 100}`}>
                <article
                  className="group p-6 transition-colors"
                  style={{ background: "rgb(var(--panel))" }}
                >
                  <div className="flex gap-5 items-start">
                    {char.imageUrl ? (
                      <div
                        className="flex-shrink-0 overflow-hidden"
                        style={{ width: "64px", aspectRatio: "3/4" }}
                      >
                        <img
                          src={char.imageUrl}
                          alt={`${char.name} — personagem de A Bastilha de Bolsonier`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className="flex-shrink-0 flex items-center justify-center border"
                        style={{
                          width: "64px",
                          aspectRatio: "3/4",
                          borderColor: "rgba(168,138,80,0.15)",
                          background: "rgb(var(--surface))"
                        }}
                      >
                        <span className="font-display text-lg" style={{ color: "rgba(168,138,80,0.3)", fontWeight: 300 }}>
                          {char.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="kicker-muted mb-1">{char.allegiance}</div>
                      <h3
                        className="font-display text-lg mb-1"
                        style={{ color: "rgb(var(--foreground))", fontWeight: 300, lineHeight: 1.2 }}
                      >
                        {char.name}
                      </h3>
                      {char.title && (
                        <div
                          className="text-xs italic mb-2"
                          style={{ color: "rgb(var(--gold))", letterSpacing: "0.04em" }}
                        >
                          {char.title}
                        </div>
                      )}
                      <p className="body-md text-xs" style={{ color: "rgb(var(--muted))", lineHeight: 1.6 }}>
                        {char.summary}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ATOS / EPISÓDIOS ─────────────────────────────────── */}
      <section className="section-space border-b" style={{ borderColor: "rgb(var(--border))" }}>
        <div className="container-shell">
          <Reveal>
            <div className="mb-12 flex items-end justify-between gap-4">
              <div>
                <div className="kicker mb-4">Estrutura narrativa</div>
                <h2 className="headline-md">Atos da série</h2>
                <p className="body-lg mt-4 max-w-2xl" style={{ color: "rgb(var(--muted))" }}>
                  A Bastilha de Bolsonier é composta por 9 atos, cada um correspondendo a uma fase distinta da queda e reconfiguração do poder na corte.
                </p>
              </div>
              <Link href="/episodios" className="btn-ghost hidden sm:inline-flex">
                Ver todos
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </Reveal>

          {episodes.length > 0 ? (
            <div className="grid gap-px" style={{ background: "rgb(var(--border))" }}>
              {episodes.map((ep: any, i: number) => (
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
                          alt={`${ep.title} — ${ep.actLabel || ep.series} de A Bastilha de Bolsonier`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div
                          className="h-full w-full flex items-center justify-center"
                          style={{ background: "rgb(var(--surface))" }}
                        >
                          <span className="font-display text-xs" style={{ color: "rgba(168,138,80,0.3)", fontWeight: 300 }}>
                            {ep.actLabel}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="act-number mb-2">{ep.actLabel || ep.series}</div>
                      <h3
                        className="font-display text-xl mb-2"
                        style={{ color: "rgb(var(--foreground))", fontWeight: 300 }}
                      >
                        {ep.title}
                      </h3>
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
          ) : (
            <div className="grid gap-px" style={{ background: "rgb(var(--border))" }}>
              {atos.map((ato, i) => (
                <Reveal key={ato.num} className={`delay-${(i % 3) * 100}`}>
                  <article
                    className="group flex items-start gap-6 p-6 transition-colors"
                    style={{ background: "rgb(var(--panel))" }}
                  >
                    <div
                      className="flex-shrink-0 w-12 h-12 border flex items-center justify-center"
                      style={{ borderColor: "rgba(168,138,80,0.2)" }}
                    >
                      <span className="font-display text-sm" style={{ color: "rgb(var(--gold-dim))", fontWeight: 300 }}>
                        {ato.num}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="act-number mb-2">Ato {ato.num}</div>
                      <h3
                        className="font-display text-lg mb-2"
                        style={{ color: "rgb(var(--foreground))", fontWeight: 300 }}
                      >
                        {ato.title}
                      </h3>
                      <p className="body-md text-sm" style={{ color: "rgb(var(--muted))" }}>{ato.desc}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── UNIVERSO NARRATIVO ───────────────────────────────── */}
      <section className="section-space border-b" style={{ borderColor: "rgb(var(--border))" }}>
        <div className="container-shell">
          <Reveal>
            <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
              <div>
                <div className="kicker mb-6">Universo narrativo</div>
                <h2
                  className="font-display mb-6"
                  style={{
                    fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                    fontWeight: 300,
                    lineHeight: 1.2,
                    color: "rgb(var(--foreground))"
                  }}
                >
                  Uma corte que opera por lógica própria
                </h2>
                <p className="body-lg mb-4" style={{ color: "rgb(var(--muted))" }}>
                  A Bastilha de Bolsonier não é uma alegoria direta nem uma sátira convencional. É uma obra de dramaturgia de câmara situada em uma corte ficcional brasileira, onde as regras do poder são ao mesmo tempo reconhecíveis e radicalmente estilizadas.
                </p>
                <p className="body-lg mb-4" style={{ color: "rgb(var(--muted))" }}>
                  A estética aristocrática e cinematográfica da obra não é ornamento, mas linguagem. Cada escolha visual, cada título de personagem, cada nome de lugar carrega peso semântico e contribui para a construção de um universo coerente e autoral.
                </p>
                <p className="body-lg" style={{ color: "rgb(var(--muted))" }}>
                  O universo da Bastilha se expande progressivamente: personagens ganham profundidade ao longo dos atos, alianças se formam e se desfazem, e o espectador é convidado a participar da leitura da corte através do Salão dos Rumores.
                </p>
              </div>
              <div>
                <div className="kicker mb-6">Cronologia da obra</div>
                <Link href="/bastilha/cronologia" className="btn-ghost mb-8 inline-flex">
                  Ver cronologia completa
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
                <div className="grid gap-3">
                  {[
                    { href: "/bastilha", label: "A Bastilha", desc: "Universo, lore e estrutura da corte" },
                    { href: "/bastilha/personagens", label: "Personagens", desc: "Dossiê completo do elenco" },
                    { href: "/episodios", label: "Atos", desc: "Biblioteca completa dos episódios" },
                    { href: "/bastilha/mural", label: "Salão dos Rumores", desc: "Espaço de participação pública" },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group flex items-center justify-between p-4 border transition-colors"
                      style={{
                        borderColor: "rgba(168,138,80,0.1)",
                        background: "rgb(var(--panel))"
                      }}
                    >
                      <div>
                        <div className="font-display text-sm mb-0.5" style={{ color: "rgb(var(--foreground))", fontWeight: 300 }}>
                          {link.label}
                        </div>
                        <div className="text-xs" style={{ color: "rgb(var(--subtle))" }}>{link.desc}</div>
                      </div>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.35, flexShrink: 0 }}>
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ONDE ACOMPANHAR ──────────────────────────────────── */}
      <section className="section-space">
        <div className="container-shell">
          <Reveal>
            <div className="mb-12">
              <div className="kicker mb-4">Presença oficial</div>
              <h2 className="headline-md">Onde acompanhar</h2>
            </div>
          </Reveal>
          <div className="flex flex-wrap gap-4">
            {[
              { href: "https://www.imdb.com/title/tt40604167/", label: "IMDb", tag: "Base de dados" },
              { href: "https://www.tiktok.com/@euinelegivel", label: "TikTok", tag: "Plataforma" },
              { href: "https://www.instagram.com/euinelegivel/", label: "Instagram", tag: "Plataforma" },
              { href: "https://www.facebook.com/profile.php?id=61573541386906", label: "Facebook", tag: "Plataforma" },
            ].map((s) => (
              <Reveal key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group px-6 py-4 border transition-colors"
                  style={{
                    borderColor: "rgba(168,138,80,0.15)",
                    background: "rgb(var(--panel))"
                  }}
                >
                  <div>
                    <div className="text-xs uppercase mb-1" style={{ letterSpacing: "0.12em", color: "rgb(var(--subtle))" }}>
                      {s.tag}
                    </div>
                    <div className="font-display text-base transition-colors group-hover:text-gold" style={{ color: "rgb(var(--foreground))", fontWeight: 300 }}>
                      {s.label}
                    </div>
                  </div>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.3, marginLeft: "8px" }}>
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
