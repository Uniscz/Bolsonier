import { deleteSection, saveSection } from "@/app/admin/actions";
import { AdminForm } from "@/components/admin-form";
import { AdminTable } from "@/components/admin-table";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

export default async function AdminSectionsPage() {
  const sections = await prisma.siteSection.findMany({
    orderBy: [{ page: "asc" }, { order: "asc" }]
  });

  return (
    <>
      <form action={saveSection}>
        <AdminForm
          title="Nova seção institucional"
          description="Edite hero, manifesto, blocos da home e introduções de páginas."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <input name="page" className="input-base" placeholder="Página. Ex.: home" required />
            <input name="key" className="input-base" placeholder="Chave. Ex.: hero" required />
          </div>
          <input name="eyebrow" className="input-base" placeholder="Eyebrow" />
          <input name="title" className="input-base" placeholder="Título" required />
          <textarea name="body" className="input-base min-h-32" placeholder="Texto" required />
          <div className="grid gap-4 md:grid-cols-3">
            <input name="ctaLabel" className="input-base" placeholder="CTA label" />
            <input name="ctaHref" className="input-base" placeholder="CTA href" />
            <input name="order" type="number" className="input-base" placeholder="Ordem" />
          </div>
        </AdminForm>
      </form>

      <AdminTable
        title="Seções cadastradas"
        columns={["Página", "Chave", "Título", "Ações"]}
        rows={sections.map((section) => [
          section.page,
          section.key,
          section.title,
          <form key={section.id} action={deleteSection}>
            <input type="hidden" name="id" value={section.id} />
            <button className="text-sm text-red-300">Remover</button>
          </form>
        ])}
      />

      <div className="grid gap-5">
        {sections.map((section) => (
          <form key={section.id} action={saveSection}>
            <input type="hidden" name="id" value={section.id} />
            <AdminForm title={`Editar · ${section.page}/${section.key}`}>
              <div className="grid gap-4 md:grid-cols-2">
                <input name="page" className="input-base" defaultValue={section.page} required />
                <input name="key" className="input-base" defaultValue={section.key} required />
              </div>
              <input name="eyebrow" className="input-base" defaultValue={section.eyebrow || ""} />
              <input name="title" className="input-base" defaultValue={section.title} required />
              <textarea
                name="body"
                className="input-base min-h-32"
                defaultValue={section.body}
                required
              />
              <div className="grid gap-4 md:grid-cols-3">
                <input name="ctaLabel" className="input-base" defaultValue={section.ctaLabel || ""} />
                <input name="ctaHref" className="input-base" defaultValue={section.ctaHref || ""} />
                <input name="order" type="number" className="input-base" defaultValue={section.order} />
              </div>
            </AdminForm>
          </form>
        ))}
      </div>
    </>
  );
}
