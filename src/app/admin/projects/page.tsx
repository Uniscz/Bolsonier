import { deleteProject, saveProject } from "@/app/admin/actions";
import { AdminForm } from "@/components/admin-form";
import { AdminTable } from "@/components/admin-table";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }]
  });

  return (
    <>
      <form action={saveProject}>
        <AdminForm title="Novo projeto" description="Gerencie projetos atuais, futuros e em desenvolvimento.">
          <div className="grid gap-4 md:grid-cols-2">
            <input name="title" className="input-base" placeholder="Título" required />
            <input name="slug" className="input-base" placeholder="slug-do-projeto" required />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <input name="category" className="input-base" placeholder="Categoria" required />
            <select name="status" className="input-base">
              <option value="LIVE">LIVE</option>
              <option value="DEVELOPMENT">DEVELOPMENT</option>
              <option value="UPCOMING">UPCOMING</option>
              <option value="ARCHIVED">ARCHIVED</option>
            </select>
          </div>
          <input name="launchLabel" className="input-base" placeholder="Selo de lançamento" />
          <input name="summary" className="input-base" placeholder="Resumo" required />
          <textarea name="body" className="input-base min-h-32" placeholder="Descrição" required />
          <div className="grid gap-4 md:grid-cols-4">
            <input name="coverImage" className="input-base" placeholder="URL da imagem" />
            <input name="accent" className="input-base" placeholder="Accent" />
            <input name="sortOrder" className="input-base" type="number" placeholder="Ordem" />
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input type="checkbox" name="featured" />
              Destaque
            </label>
          </div>
        </AdminForm>
      </form>

      <AdminTable
        title="Projetos cadastrados"
        columns={["Título", "Status", "Categoria", "Destaque", "Ações"]}
        rows={projects.map((project) => [
          project.title,
          project.status,
          project.category,
          project.featured ? "Sim" : "Não",
          <form key={project.id} action={deleteProject}>
            <input type="hidden" name="id" value={project.id} />
            <button className="text-sm text-red-300">Remover</button>
          </form>
        ])}
      />

      <div className="grid gap-5">
        {projects.map((project) => (
          <form key={project.id} action={saveProject}>
            <input type="hidden" name="id" value={project.id} />
            <AdminForm title={`Editar · ${project.title}`}>
              <div className="grid gap-4 md:grid-cols-2">
                <input name="title" className="input-base" defaultValue={project.title} required />
                <input name="slug" className="input-base" defaultValue={project.slug} required />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <input name="category" className="input-base" defaultValue={project.category} required />
                <select name="status" className="input-base" defaultValue={project.status}>
                  <option value="LIVE">LIVE</option>
                  <option value="DEVELOPMENT">DEVELOPMENT</option>
                  <option value="UPCOMING">UPCOMING</option>
                  <option value="ARCHIVED">ARCHIVED</option>
                </select>
              </div>
              <input name="launchLabel" className="input-base" defaultValue={project.launchLabel || ""} />
              <input name="summary" className="input-base" defaultValue={project.summary} required />
              <textarea name="body" className="input-base min-h-32" defaultValue={project.body} required />
              <div className="grid gap-4 md:grid-cols-4">
                <input name="coverImage" className="input-base" defaultValue={project.coverImage || ""} />
                <input name="accent" className="input-base" defaultValue={project.accent || ""} />
                <input name="sortOrder" className="input-base" type="number" defaultValue={project.sortOrder} />
                <label className="flex items-center gap-2 text-sm text-zinc-300">
                  <input type="checkbox" name="featured" defaultChecked={project.featured} />
                  Destaque
                </label>
              </div>
            </AdminForm>
          </form>
        ))}
      </div>
    </>
  );
}
