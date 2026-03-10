import { PageHero } from "@/components/page-hero";
import { buildMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";

export const metadata = buildMetadata({
  title: "Cronologia da Bastilha",
  pathname: "/bastilha/cronologia"
});

export default async function BastilhaCronologiaPage() {
  const timeline = await prisma.timelineEvent.findMany({
    orderBy: { sortOrder: "asc" }
  });

  return (
    <>
      <PageHero
        eyebrow="Dossiê"
        title="Cronologia e eixo de leitura da Bastilha."
        body="Uma linha de acontecimentos, viradas e mudanças de percepção para orientar quem entra agora e para aprofundar quem já acompanha."
      />
      <section className="section-space">
        <div className="container-shell max-w-4xl">
          <div className="grid gap-5">
            {timeline.map((event) => (
              <article key={event.id} className="panel p-6 md:p-8">
                <div className="kicker">{event.dateLabel}</div>
                <h2 className="mt-4 font-display text-3xl font-semibold">{event.title}</h2>
                <p className="mt-4 text-base leading-7 text-zinc-300">{event.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
