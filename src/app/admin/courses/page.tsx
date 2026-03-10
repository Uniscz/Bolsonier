import { deleteCourse, saveCourse } from "@/app/admin/actions";
import { AdminForm } from "@/components/admin-form";
import { AdminTable } from "@/components/admin-table";
import { prisma } from "@/lib/prisma";

function linesFromJson(value: unknown) {
  return Array.isArray(value) ? value.map((item) => (typeof item === "string" ? item : "")).filter(Boolean).join("\n") : "";
}

function faqFromJson(value: unknown) {
  return Array.isArray(value)
    ? value
        .map((item) => {
          const entry = item as { q?: string; a?: string };
          return entry.q && entry.a ? `${entry.q}::${entry.a}` : "";
        })
        .filter(Boolean)
        .join("\n")
    : "";
}

export default async function AdminCoursesPage() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <>
      <form action={saveCourse}>
        <AdminForm
          title="Novo curso"
          description="Use linhas separadas para módulos e bônus. FAQ deve usar o formato pergunta::resposta."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <input name="title" className="input-base" placeholder="Título" required />
            <input name="slug" className="input-base" placeholder="slug-do-curso" required />
          </div>
          <textarea name="excerpt" className="input-base min-h-24" placeholder="Resumo curto" required />
          <textarea name="description" className="input-base min-h-32" placeholder="Descrição completa" required />
          <div className="grid gap-4 md:grid-cols-3">
            <select name="status" className="input-base">
              <option value="AVAILABLE">AVAILABLE</option>
              <option value="PREORDER">PREORDER</option>
              <option value="WAITLIST">WAITLIST</option>
              <option value="DRAFT">DRAFT</option>
            </select>
            <input name="priceLabel" className="input-base" placeholder="Rótulo de preço" />
            <input name="thumbnailUrl" className="input-base" placeholder="URL da thumbnail" />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <input name="ctaLabel" className="input-base" placeholder="CTA label" />
            <input name="ctaHref" className="input-base" placeholder="CTA href" />
            <input name="waitlistUrl" className="input-base" placeholder="URL da lista de espera" />
          </div>
          <textarea name="modules" className="input-base min-h-28" placeholder="Um módulo por linha" />
          <textarea name="bonuses" className="input-base min-h-28" placeholder="Um bônus por linha" />
          <textarea name="faq" className="input-base min-h-28" placeholder="pergunta::resposta" />
          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <input type="checkbox" name="featured" />
            Destaque
          </label>
        </AdminForm>
      </form>

      <AdminTable
        title="Cursos cadastrados"
        columns={["Título", "Status", "Destaque", "Ações"]}
        rows={courses.map((course) => [
          course.title,
          course.status,
          course.featured ? "Sim" : "Não",
          <form key={course.id} action={deleteCourse}>
            <input type="hidden" name="id" value={course.id} />
            <button className="text-sm text-red-300">Remover</button>
          </form>
        ])}
      />

      <div className="grid gap-5">
        {courses.map((course) => (
          <form key={course.id} action={saveCourse}>
            <input type="hidden" name="id" value={course.id} />
            <AdminForm title={`Editar · ${course.title}`}>
              <div className="grid gap-4 md:grid-cols-2">
                <input name="title" className="input-base" defaultValue={course.title} required />
                <input name="slug" className="input-base" defaultValue={course.slug} required />
              </div>
              <textarea name="excerpt" className="input-base min-h-24" defaultValue={course.excerpt} required />
              <textarea name="description" className="input-base min-h-32" defaultValue={course.description} required />
              <div className="grid gap-4 md:grid-cols-3">
                <select name="status" className="input-base" defaultValue={course.status}>
                  <option value="AVAILABLE">AVAILABLE</option>
                  <option value="PREORDER">PREORDER</option>
                  <option value="WAITLIST">WAITLIST</option>
                  <option value="DRAFT">DRAFT</option>
                </select>
                <input name="priceLabel" className="input-base" defaultValue={course.priceLabel || ""} />
                <input name="thumbnailUrl" className="input-base" defaultValue={course.thumbnailUrl || ""} />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <input name="ctaLabel" className="input-base" defaultValue={course.ctaLabel || ""} />
                <input name="ctaHref" className="input-base" defaultValue={course.ctaHref || ""} />
                <input name="waitlistUrl" className="input-base" defaultValue={course.waitlistUrl || ""} />
              </div>
              <textarea name="modules" className="input-base min-h-28" defaultValue={linesFromJson(course.modules)} />
              <textarea name="bonuses" className="input-base min-h-28" defaultValue={linesFromJson(course.bonuses)} />
              <textarea name="faq" className="input-base min-h-28" defaultValue={faqFromJson(course.faq)} />
              <label className="flex items-center gap-2 text-sm text-zinc-300">
                <input type="checkbox" name="featured" defaultChecked={course.featured} />
                Destaque
              </label>
            </AdminForm>
          </form>
        ))}
      </div>
    </>
  );
}
