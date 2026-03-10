import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { buildMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const course = await prisma.course.findUnique({ where: { slug: params.slug } });
  if (!course) return buildMetadata({ title: "Curso" });
  return buildMetadata({
    title: course.title,
    description: course.excerpt,
    pathname: `/cursos/${course.slug}`
  });
}

export default async function CourseDetailPage({ params }: Props) {
  const course = await prisma.course.findUnique({ where: { slug: params.slug } });

  if (!course) notFound();

  const modules = Array.isArray(course.modules) ? (course.modules as string[]) : [];
  const bonuses = Array.isArray(course.bonuses) ? (course.bonuses as string[]) : [];
  const faq = Array.isArray(course.faq) ? (course.faq as { q: string; a: string }[]) : [];

  const ctaHref = course.ctaHref || course.waitlistUrl || "/contato";

  return (
    <>
      <PageHero eyebrow="Curso" title={course.title} body={course.description}>
        <div className="space-y-4 text-sm text-zinc-300">
          <div>Status: {course.status}</div>
          {course.priceLabel ? <div>{course.priceLabel}</div> : null}
          <Link href={ctaHref} className="btn-primary">
            {course.ctaLabel || "Quero saber mais"}
          </Link>
        </div>
      </PageHero>

      <section className="section-space">
        <div className="container-shell grid gap-5 lg:grid-cols-2">
          <div className="panel p-6">
            <div className="kicker">Módulos</div>
            <ul className="mt-5 grid gap-4 text-sm text-zinc-300">
              {modules.map((module) => (
                <li key={module}>{module}</li>
              ))}
            </ul>
          </div>
          <div className="panel p-6">
            <div className="kicker">Bônus</div>
            <ul className="mt-5 grid gap-4 text-sm text-zinc-300">
              {bonuses.map((bonus) => (
                <li key={bonus}>{bonus}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-space border-t border-white/5">
        <div className="container-shell">
          <div className="max-w-3xl">
            <div className="kicker">Perguntas frequentes</div>
            <h2 className="headline-md mt-4">O que costuma destravar a decisão</h2>
          </div>
          <div className="mt-8 grid gap-5">
            {faq.map((item) => (
              <div key={item.q} className="panel p-6">
                <h3 className="text-lg font-semibold">{item.q}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
