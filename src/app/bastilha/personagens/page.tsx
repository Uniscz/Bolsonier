import { PageHero } from "@/components/page-hero";
import { buildMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Personagens da Bastilha",
  pathname: "/bastilha/personagens"
});

export default async function BastilhaPersonagensPage() {
  const characters = await prisma.bastilhaCharacter.findMany({
    orderBy: { sortOrder: "asc" }
  });

  return (
    <>
      <PageHero
        eyebrow="Personagens"
        title="As presenças que fazem a temperatura da Bastilha subir."
        body="Cada personagem organiza poder, afeto, aparência, rito ou ameaça. O dossiê serve como mapa de leitura."
      />
      <section className="section-space">
        <div className="container-shell grid gap-5 lg:grid-cols-2">
          {characters.map((character) => (
            <article key={character.id} className="panel p-6">
              <div className="kicker">{character.allegiance || "Bastilha"}</div>
              <h2 className="mt-4 font-display text-3xl font-semibold">{character.name}</h2>
              {character.title ? <p className="mt-2 text-zinc-400">{character.title}</p> : null}
              <p className="mt-4 text-sm leading-6 text-zinc-300">{character.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
