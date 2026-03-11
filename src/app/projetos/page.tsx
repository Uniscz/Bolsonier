import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { buildMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Projetos",
  pathname: "/projetos"
});

export default async function ProjetosPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }]
  });

  return (
    <>
      <PageHero
        eyebrow="Projetos"
        title="Atuais, em desenvolvimento e próximos lançamentos."
        body="Uma visão clara dos núcleos que já existem, dos que estão nascendo e do que a produtora está preparando."
      />
      <section className="section-space">
        <div className="container-shell grid gap-5 lg:grid-cols-2">
          {projects.map((project) => (
            <article key={project.id} className="panel p-6">
              <div className="kicker">{project.launchLabel || project.status}</div>
              <h2 className="mt-4 font-display text-3xl font-semibold">{project.title}</h2>
              <p className="mt-4 text-sm leading-6 text-foreground/80">{project.summary}</p>
              <div className="mt-6 flex items-center gap-3 text-sm text-subtle">
                <span>{project.category}</span>
              </div>
              <div className="mt-6">
                <Link href={`/projetos/${project.slug}`} className="btn-primary">
                  Abrir projeto
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
