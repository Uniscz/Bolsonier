import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/reveal";
import { buildMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Cronologia",
  pathname: "/bastilha/cronologia"
});

const timelineFallback = [
  { id: "1", slug: "i", dateLabel: "I", title: "A fundação da aparência", body: "A Bastilha se apresenta como casa de prestígio, disciplina e autoridade simbólica.", important: true, sortOrder: 1 },
  { id: "2", slug: "ii", dateLabel: "II", title: "As primeiras tensões de convivência", body: "Convivência, hierarquia e ressentimento passam a coexistir sob crescente desconforto.", important: false, sortOrder: 2 },
  { id: "3", slug: "iii", dateLabel: "III", title: "O retorno do que não havia sido encerrado", body: "Figuras antes afastadas retornam e restituem à casa conflitos jamais extintos.", important: true, sortOrder: 3 },
  { id: "4", slug: "iv", dateLabel: "IV", title: "A corrosão dos vínculos", body: "Lealdades cedem à suspeita, à vaidade e à necessidade de preservação individual.", important: false, sortOrder: 4 },
  { id: "5", slug: "v", dateLabel: "V", title: "O salão como cena de constrangimento", body: "Os salões convertem-se em palco de sinais cada vez menos disfarçáveis de colapso.", important: true, sortOrder: 5 },
  { id: "6", slug: "vi", dateLabel: "VI", title: "A suspeita sobre filiação e herança", body: "A legitimidade de certos vínculos passa a ser observada com inquietação jurídica e moral.", important: false, sortOrder: 6 },
  { id: "7", slug: "vii", dateLabel: "VII", title: "A convergência das forças adversas", body: "Múltiplas forças adversas passam a orbitar o mesmo centro de desgaste.", important: true, sortOrder: 7 },
  { id: "8", slug: "viii", dateLabel: "VIII", title: "A morte como rito final da decomposição", body: "A ruína atinge sua forma suprema quando o poder tenta sobreviver à própria decomposição.", important: true, sortOrder: 8 },
];

export default async function CronologiaPage() {
  const dbTimeline = await prisma.timelineEvent.findMany({
    orderBy: { sortOrder: "asc" }
  });

  const timeline = dbTimeline.length > 0 ? dbTimeline : timelineFallback;

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        className="section-space border-b"
        style={{ borderColor: "rgb(var(--border))" }}
      >
        <div className="container-shell">
          <Reveal>
            <div className="kicker mb-6">Dossiê</div>
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
              A linha<br />
              <em style={{ fontStyle: "italic", color: "rgb(var(--gold))" }}>da queda</em>
            </h1>
            <p className="body-lg max-w-2xl">
              Uma linha de acontecimentos, viradas e mudanças de percepção para orientar quem entra agora e para aprofundar quem já acompanha.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── INFOGRÁFICO ──────────────────────────────────────── */}
      <section className="py-12 border-b" style={{ borderColor: "rgb(var(--border))" }}>
        <div className="container-shell">
          <div className="kicker mb-4">Infográfico central</div>
          <h2 className="headline-sm mb-4" style={{ color: "rgb(var(--foreground))" }}>
            Linha da queda da Bastilha
          </h2>
          <p className="body-lg" style={{ maxWidth: "48rem" }}>
            Da ordem aparente ao desfecho cerimonial, a Bastilha percorre um trajeto em que etiqueta, filiação, rumor e prestígio deixam de funcionar como garantias de estabilidade e passam a operar como instrumentos da própria ruína.
          </p>
        </div>
      </section>

      {/* ── LINHA DO TEMPO ───────────────────────────────────── */}
      <section className="section-space">
        <div className="container-shell max-w-4xl">
          <div className="relative">
            {/* Linha vertical */}
            <div
              className="absolute left-6 top-0 bottom-0 w-px hidden md:block"
              style={{ background: "linear-gradient(to bottom, transparent, rgb(var(--border-gold)), transparent)" }}
            />

            <div className="grid gap-0">
              {timeline.map((event, i) => (
                <Reveal key={event.id} className={`delay-${(i % 4) * 100}`}>
                  <div
                    className="group relative flex gap-8 py-8 border-b"
                    style={{ borderColor: "rgb(var(--border))" }}
                  >
                    {/* Número do ato */}
                    <div
                      className="flex-shrink-0 hidden md:flex w-12 h-12 border items-center justify-center"
                      style={{
                        borderColor: event.important ? "rgba(168,138,80,0.4)" : "rgba(168,138,80,0.15)",
                        background: event.important ? "rgba(168,138,80,0.08)" : "transparent"
                      }}
                    >
                      <span
                        className="font-display text-sm"
                        style={{
                          color: event.important ? "rgb(var(--gold))" : "rgb(var(--gold-dim))",
                          fontWeight: 300
                        }}
                      >
                        {event.dateLabel}
                      </span>
                    </div>

                    {/* Conteúdo */}
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="kicker-muted md:hidden">{event.dateLabel}</span>
                        {event.important && (
                          <span className="badge-gold">Marco</span>
                        )}
                      </div>

                      <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-start">
                        <div>
                          <h2
                            className="font-display text-2xl mb-3"
                            style={{
                              color: "rgb(var(--foreground))",
                              fontWeight: 300,
                              letterSpacing: "-0.01em"
                            }}
                          >
                            {event.title}
                          </h2>
                          <p className="body-lg" style={{ fontSize: "0.9rem" }}>{event.body}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* ── CLÁUSULA DE LEITURA ──────────────────────────── */}
          <Reveal>
            <div
              className="mt-16 border-t pt-12"
              style={{ borderColor: "rgb(var(--border-gold))" }}
            >
              <div className="kicker mb-4">Cláusula de leitura</div>
              <p
                className="font-display text-xl"
                style={{
                  color: "rgb(var(--muted))",
                  fontWeight: 300,
                  fontStyle: "italic",
                  lineHeight: 1.6,
                  maxWidth: "40rem"
                }}
              >
                Na Bastilha, os acontecimentos não se sucedem apenas no tempo. Eles se acumulam em dignidade ferida, leitura pública e perda gradual de imunidade simbólica.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
