import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/reveal";
import { buildMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Personagens",
  pathname: "/bastilha/personagens"
});

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
                      <span className="media-slot-label text-center px-4">
                        [PORTRAIT_{char.name.toUpperCase().split(" ")[0]}_MASTER]
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
              <h2 className="headline-sm mb-4" style={{ color: "rgb(var(--foreground))" }}>
                Os vínculos que movem a corte
              </h2>
              <p className="body-lg">
                As relações entre os personagens — laços de sangue, desejo, lealdade e rivalidade — serão documentadas neste espaço à medida que os atos avançam.
              </p>
              <div className="mt-6 grid gap-3 text-sm" style={{ color: "rgb(var(--muted))" }}>
                <div className="flex items-center justify-center gap-3">
                  <span style={{ color: "rgb(var(--gold-dim))" }}>—</span>
                  <span>[RELAÇÃO: Jairene e Alexandra]</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span style={{ color: "rgb(var(--gold-dim))" }}>—</span>
                  <span>[RELAÇÃO: Nicolau e Luísa]</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span style={{ color: "rgb(var(--gold-dim))" }}>—</span>
                  <span>[RELAÇÃO: Trumpetti e Jairene]</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
