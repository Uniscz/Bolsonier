import { PageHero } from "@/components/page-hero";
import { MuralEntryForm } from "@/components/mural-entry-form";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Entrar no Salão dos Rumores",
  pathname: "/bastilha/mural/entrar"
});

export default function MuralEntryPage() {
  return (
    <>
      <PageHero
        eyebrow="Salão dos Rumores"
        title="Entre com um nome de exibição e passe a interagir com a corte."
        body="Leitura é pública. Participação acontece por meio de um passe simples da comunidade, pensado para manter a experiência rápida."
      />
      <section className="section-space">
        <div className="container-shell">
          <MuralEntryForm />
        </div>
      </section>
    </>
  );
}
