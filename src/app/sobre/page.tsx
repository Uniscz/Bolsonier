import { CtaBanner } from "@/components/cta-banner";
import { PageHero } from "@/components/page-hero";
import { FeatureCard } from "@/components/cards";
import { buildMetadata } from "@/lib/metadata";
import { getSection } from "@/lib/queries";
export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Sobre",
  pathname: "/sobre"
});

export default async function SobrePage() {
  const intro = await getSection("sobre", "intro");

  return (
    <>
      <PageHero
        eyebrow={intro?.eyebrow || "Sobre"}
        title={intro?.title || ""}
        body={intro?.body || ""}
      >
        <p className="text-sm leading-6 text-muted">
          A marca principal é Bolsonier Studios. O criador por trás é Deh. O objetivo
          não é parecer portfólio. É operar como casa de projetos autorais com
          presença institucional real.
        </p>
      </PageHero>

      <section className="section-space">
        <div className="container-shell grid gap-5 lg:grid-cols-3">
          <FeatureCard
            kicker="Visão"
            title="Criar com assinatura"
            body="Cada projeto precisa sustentar presença, memória e possibilidade de expansão."
          />
          <FeatureCard
            kicker="Método"
            title="Narrativa + direção + sistema"
            body="Estética, dramaturgia e estrutura comercial pensadas desde o início."
          />
          <FeatureCard
            kicker="Postura"
            title="Profissional sem burocracia"
            body="Um discurso adulto, claro e forte, sem depender de frases corporativas vazias."
          />
        </div>
      </section>

      <section className="section-space border-t border-border">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="kicker">Manifesto da produtora</div>
            <h2 className="headline-md mt-4">A marca existe para organizar potência.</h2>
          </div>
          <div className="space-y-5 text-base leading-7 text-foreground/80">
            <p>
              Bolsonier Studios organiza projetos que poderiam facilmente se perder entre
              boa estética e nenhuma estrutura. O foco aqui é o contrário: dar eixo,
              materialidade e continuidade.
            </p>
            <p>
              A produtora nasce no ponto em que narrativa, inteligência artificial,
              direção visual e produto deixam de ser frentes separadas. O que interessa é
              a construção de presença com densidade, não o efeito passageiro.
            </p>
            <p>
              Isso vale para séries, imagens, vídeo, mentoria, cursos e novos núcleos da
              marca. Tudo precisa parecer parte do mesmo organismo, mesmo quando muda de
              formato.
            </p>
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="Contato"
        title="Se o interesse é construir projeto com linguagem, densidade e possibilidade real de expansão, a entrada se faz por interlocução clara."
        body="Parcerias, imprensa, desenvolvimento autoral, consultoria criativa e frentes comerciais são recebidos sob o mesmo princípio: forma, direção e propósito."
        primaryLabel="Ir para contato"
        primaryHref="/contato"
      />
    </>
  );
}
