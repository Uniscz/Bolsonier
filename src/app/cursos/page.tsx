import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { buildMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";

export const metadata = buildMetadata({
  title: "Cursos",
  pathname: "/cursos"
});

export default async function CursosPage() {
  const courses = await prisma.course.findMany({
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }]
  });

  return (
    <>
      <PageHero
        eyebrow="Cursos"
        title="Formação com direção, linguagem e função."
        body="Cursos pensados para transformar repertório criativo em sistema de produção, identidade e produto."
      >
        <p className="text-sm leading-6 text-zinc-400">
          Estrutura preparada para disponível, pré-venda, lista de espera e páginas individuais.
        </p>
      </PageHero>

      <section className="section-space">
        <div className="container-shell grid gap-5 lg:grid-cols-2">
          {courses.map((course) => (
            <div key={course.id} className="panel p-6">
              <div className="kicker">{course.status}</div>
              <h2 className="mt-4 font-display text-3xl font-semibold">{course.title}</h2>
              <p className="mt-4 text-sm leading-6 text-zinc-300">{course.excerpt}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={`/cursos/${course.slug}`} className="btn-primary">
                  Ver curso
                </Link>
                {course.priceLabel ? (
                  <span className="inline-flex items-center rounded-full border border-white/10 px-4 py-3 text-sm text-zinc-300">
                    {course.priceLabel}
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
