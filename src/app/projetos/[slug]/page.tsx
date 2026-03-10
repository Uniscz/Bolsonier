import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { buildMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const project = await prisma.project.findUnique({ where: { slug: params.slug } });
  if (!project) return buildMetadata({ title: "Projeto" });
  return buildMetadata({
    title: project.title,
    description: project.summary,
    pathname: `/projetos/${project.slug}`
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug }
  });

  if (!project) notFound();

  return (
    <>
      <PageHero
        eyebrow={project.category}
        title={project.title}
        body={project.summary}
      >
        <div className="space-y-3 text-sm text-zinc-300">
          <div>Status: {project.status}</div>
          {project.launchLabel ? <div>{project.launchLabel}</div> : null}
        </div>
      </PageHero>

      <section className="section-space">
        <div className="container-shell max-w-4xl">
          <div className="panel p-6 md:p-8">
            <div className="kicker">Descrição</div>
            <p className="mt-5 text-base leading-8 text-zinc-300">{project.body}</p>
          </div>
        </div>
      </section>
    </>
  );
}
