import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/reveal";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Personagens | A Bastilha de Bolsonier",
  description:
    "Dossiê completo dos personagens de A Bastilha de Bolsonier — Jairene de Bolsonier, Luísa Ignácia de Silvene, Alexandra de Moraes y Valença, Don Trumpetti Vittorio, Nicoletty Vittoria Trumpetti di Bolsonier, Domitila Rousselle Alcântara de Hylteon, Nicolau de Hylteon e Érienne de Hylteon.",
  openGraph: {
    title: "Personagens | A Bastilha de Bolsonier",
    description:
      "Dossiê completo dos personagens de A Bastilha de Bolsonier — série dramática brasileira criada por André Luiz de Almeida.",
    url: "/bastilha/personagens",
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "A Bastilha de Bolsonier — Personagens" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Personagens | A Bastilha de Bolsonier",
    description: "Dossiê completo dos personagens de A Bastilha de Bolsonier.",
    images: ["/og-default.png"]
  },
  alternates: { canonical: "/bastilha/personagens" }
};

const characterDescriptions: Record<string, string> = {
  "jairene-de-bolsonier": "Governa por presença, cálculo e autoridade de linhagem.",
  "luisa-ignacia-de-silvene": "Habituada a ler o desvio antes que ele se converta em escândalo.",
  "alexandra-de-moraes-y-valenca": "Presença jurídica e glacial, cercada de conveniência e ambiguidade estratégica.",
  "don-trumpetti-vittorio": "Oscilando entre prestígio remanescente, decadência íntima e vulnerabilidade pública.",
  "nicolau-de-hylteon": "Sua simples reentrada restitui à corte aquilo que ela mais teme: memória.",
  "nicoletty-vittoria-trumpetti-di-bolsonier": "Associada à linhagem, ao escândalo e à instabilidade dos vínculos.",
};

export default async function PersonagensPage() {
  const characters = await prisma.bastilhaCharacter.findMany({
    orderBy: { sortOrder: "asc" }
  });

  const allCharacters = characters.length > 0 ? characters : [
    { id: "1", name: "Jairene de Bolsonier", slug: "jairene-de-bolsonier", title: "Soberana da Bastilha", allegiance: "Casa Bolsonier", summary: "Governa por presença, cálculo e autoridade de linhagem.", imageUrl: null, featured: true, sortOrder: 1 },
    { id: "2", name: "Luísa Ignácia de Silvene", slug: "luisa-ignacia-de-silvene", title: "Observadora da corte", allegiance: "Casa Silvene", summary: "Habituada a ler o desvio antes que ele se converta em escândalo.", imageUrl: null, featured: true, sortOrder: 2 },
    { id: "3", name: "Alexandra de Moraes y Valença", slug: "alexandra-de-moraes-y-valenca", title: "Jurisdição pessoal", allegiance: "Valença", summary: "Presença jurídica e glacial, cercada de conveniência e ambiguidade estratégica.", imageUrl: null, featured: true, sortOrder: 3 },
    { id: "4", name: "Don Trumpetti Vittorio", slug: "don-trumpetti-vittorio", title: "Heráldica do excesso", allegiance: "Corte externa", summary: "Oscilando entre prestígio remanescente, decadência íntima e vulnerabilidade pública.", imageUrl: null, featured: false, sortOrder: 4 },
    { id: "5", name: "Nicolau de Hylteon", slug: "nicolau-de-hylteon", title: "O desterrado", allegiance: "Casa Hylteon", summary: "Sua simples reentrada restitui à corte aquilo que ela mais teme: memória.", imageUrl: null, featured: false, sortOrder: 5 },
    { id: "6", name: "Nicoletty Vittoria Trumpetti di Bolsonier", slug: "nicoletty-vittoria-trumpetti-di-bolsonier", title: "Identidade incendiária", allegiance: "Linhagem dupla", summary: "Associada à linhagem, ao escândalo e à instabilidade dos vínculos.", imageUrl: null, featured: false, sortOrder: 6 },
    { id: "7", name: "Érienne de Hylteon", slug: "erienne-de-hylteon", title: "Correntes invisíveis", allegiance: "Casa Hylteon", summary: "Ligada às correntes invisíveis que movem o destino da casa sem jamais se anunciar por inteiro.", imageUrl: null, featured: false, sortOrder: 7 },
    { id: "8", name: "Domitila Rousselle Alcântara de Hylteon", slug: "domitila-rousselle-alcantara-de-hylteon", title: "Gravidade ancestral", allegiance: "Casa Hylteon", summary: "Em cuja compostura sobrevivem tradição, vigilância e memória de sangue.", imageUrl: null, featured: false, sortOrder: 8 },
  ];

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        className="section-space border-b"
        style={{ borderColor: "rgb(var(--border))" }}
      >
        <div className="container-shell">
          <Reveal>
            <div className="kicker mb-6">Dossiê de elenco</div>
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
              As presenças que<br />
              <em style={{ fontStyle: "italic", color: "rgb(var(--gold))" }}>sustentam a corte</em>
            </h1>
            <p className="body-lg max-w-2xl">
              Cada figura disputa não apenas posição, mas sobrevivência simbólica. Na Bastilha, cair em desgraça é forma superior de execução.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── GRID DE PERSONAGENS ───────────────────────────────── */}
      <section className="section-space">
        <div className="container-shell">
          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" style={{ background: "rgb(var(--border))" }}>
            {allCharacters.map((char, i) => (
              <Reveal key={char.id} className={`delay-${(i % 4) * 100}`}>
                <div
                  className="group relative overflow-hidden"
                  style={{ background: "rgb(var(--panel))", aspectRatio: "3/4" }}
                >
                  {/* Retrato */}
                  {char.imageUrl ? (
                    <img
                      src={char.imageUrl}
                      alt={char.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                      style={{ background: "rgb(var(--surface))" }}
                    >
                      <div
                        className="h-20 w-20 border flex items-center justify-center"
                        style={{ borderColor: "rgba(168,138,80,0.2)" }}
                      >
                        <span
                          className="font-display text-3xl"
                          style={{ color: "rgba(168,138,80,0.25)", fontWeight: 300 }}
                        >
                          {char.name.charAt(0)}
                        </span>
                      </div>
                      <span
                        className="font-display text-xs text-center px-4"
                        style={{ color: "rgba(168,138,80,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}
                      >
                        {char.name.split(" ")[0]}
                      </span>
                    </div>
                  )}

                  {/* Overlay permanente */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(8,7,6,0.95) 0%, rgba(8,7,6,0.3) 40%, transparent 70%)"
                    }}
                  />

                  {/* Info */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="kicker-muted mb-1">{char.allegiance}</div>
                    <div
                      className="font-display text-xl mb-1"
                      style={{ color: "rgb(var(--foreground))", fontWeight: 300, lineHeight: 1.2 }}
                    >
                      {char.name}
                    </div>
                    {char.title && (
                      <div
                        className="text-xs italic mb-2"
                        style={{ color: "rgb(var(--gold))", letterSpacing: "0.05em" }}
                      >
                        {char.title}
                      </div>
                    )}
                    <p
                      className="body-md text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ lineHeight: 1.6 }}
                    >
                      {char.summary}
                    </p>
                  </div>

                  {/* Borda dourada no hover */}
                  <div
                    className="absolute inset-0 border opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ borderColor: "rgba(168,138,80,0.25)" }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ELENCO CENTRAL — SEMÂNTICO PARA SEO ─────────────── */}
      <section className="sr-only" aria-label="Elenco central de A Bastilha de Bolsonier">
        <h2>Personagens centrais de A Bastilha de Bolsonier</h2>
        <ul>
          <li><strong>Jairene de Bolsonier</strong> — Soberana da Bastilha. Governa por presença, cálculo e autoridade de linhagem.</li>
          <li><strong>Luísa Ignácia de Silvene</strong> — Observadora da corte. Habituada a ler o desvio antes que ele se converta em escândalo.</li>
          <li><strong>Alexandra de Moraes y Valença</strong> — Jurisdição pessoal. Presença jurídica e glacial, cercada de conveniência e ambiguidade estratégica.</li>
          <li><strong>Don Trumpetti Vittorio</strong> — Heráldica do excesso. Oscilando entre prestígio remanescente, decadência íntima e vulnerabilidade pública.</li>
          <li><strong>Nicoletty Vittoria Trumpetti di Bolsonier</strong> — Identidade incendiária. Associada à linhagem, ao escândalo e à instabilidade dos vínculos.</li>
          <li><strong>Domitila Rousselle Alcântara de Hylteon</strong> — Gravidade ancestral. Em cuja compostura sobrevivem tradição, vigilância e memória de sangue.</li>
          <li><strong>Nicolau de Hylteon</strong> — O desterrado. Sua simples reentrada restitui à corte aquilo que ela mais teme: memória.</li>
          <li><strong>Érienne de Hylteon</strong> — Correntes invisíveis. Ligada às correntes que movem o destino da casa sem jamais se anunciar por inteiro.</li>
        </ul>
      </section>

      {/* ── NOTA SOBRE RELAÇÕES ───────────────────────────────── */}
      <section
        className="section-space border-t"
        style={{ borderColor: "rgb(var(--border))" }}
      >
        <div className="container-shell">
          <Reveal>
            <div
              className="panel-gold p-10 max-w-3xl mx-auto text-center"
            >
              <div className="kicker mb-4">Relações</div>
              <h2 className="headline-sm mb-8" style={{ color: "rgb(var(--foreground))" }}>
                Os vínculos que movem a corte
              </h2>
              <div className="mt-2 grid gap-8 text-left">
                <div>
                  <div className="text-sm font-medium mb-2" style={{ color: "rgb(var(--gold))" }}>Jairene de Bolsonier e Alexandra de Moraes y Valença</div>
                  <p className="body-md text-sm" style={{ color: "rgb(var(--muted))" }}>Entre a soberania de linhagem e a autoridade de interpretação, subsiste uma aliança funcional atravessada por cálculo, vigilância e conveniência recíproca. Jairene necessita de ordem. Alexandra necessita de centralidade. Nenhuma das duas ignora que, em circunstâncias adequadas, a outra poderia converter-se de apoio indispensável em ameaça juridicamente elegante.</p>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2" style={{ color: "rgb(var(--gold))" }}>Nicolau de Hylteon e Luísa Ignácia de Silvene</div>
                  <p className="body-md text-sm" style={{ color: "rgb(var(--muted))" }}>Há entre ambos uma forma de reconhecimento que antecede a fala e excede o protocolo. Luísa compreende o que Nicolau representa para a memória da casa. Nicolau, por sua vez, sabe que a inteligência de Luísa opera menos por exibição do que por leitura precisa do desvio. O vínculo não se declara, mas produz efeitos de confiança, cautela e entendimento mútuo.</p>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2" style={{ color: "rgb(var(--gold))" }}>Don Trumpetti Vittorio e Jairene de Bolsonier</div>
                  <p className="body-md text-sm" style={{ color: "rgb(var(--muted))" }}>A relação se sustenta sobre prestígio, aparência de solidez e utilidade recíproca, mas já apresenta sinais visíveis de erosão simbólica. Onde antes havia composição estratégica, agora se insinua desconforto, diferença de ritmo e perda de autoridade conjunta. Permanecem unidos menos por harmonia do que pelo custo público da dissolução.</p>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2" style={{ color: "rgb(var(--gold))" }}>Nicoletty Vittoria Trumpetti di Bolsonier e a corte</div>
                  <p className="body-md text-sm" style={{ color: "rgb(var(--muted))" }}>Nicoletty não ocupa apenas um lugar de sangue ou aliança. Sua mera presença desloca leituras, reabre comparações e introduz instabilidade no regime de aparências da Bastilha. Em torno dela, a corte hesita entre acolhimento, cálculo e temor.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
