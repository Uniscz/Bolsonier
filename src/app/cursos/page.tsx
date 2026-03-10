import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { buildMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Cursos",
  description: "Conheça nossos cursos disponíveis.",
  pathname: "/cursos"
});

export default async function CoursesPage() {
  // Busca todos os cursos no banco de dados para listar
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <>
      <PageHero 
        eyebrow="Cursos" 
        title="Nossos Cursos" 
        body="Escolha o melhor treinamento para você e comece a aprender hoje mesmo." 
      />
      
      <section className="section-space">
        <div className="container-shell">
          {courses.length === 0 ? (
            <p className="text-zinc-400">Nenhum curso encontrado no momento.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <div key={course.id} className="panel p-6 flex flex-col">
                  <h3 className="text-lg font-bold text-white mb-2">{course.title}</h3>
                  <p className="text-sm text-zinc-400 mb-4 flex-grow">
                    {course.excerpt || course.description}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center">
                    <span className="text-sm text-zinc-300 font-medium">
                      {course.priceLabel || course.status}
                    </span>
                    {/* Aqui é onde ele clica e vai para a página dinâmica [slug] */}
                    <Link href={`/cursos/${course.slug}`} className="btn-primary text-sm py-2 px-4">
                      Ver detalhes
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
