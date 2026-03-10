import { deletePoll, deleteWallPost, savePoll, saveWallPost } from "@/app/admin/actions";
import { AdminForm } from "@/components/admin-form";
import { AdminTable } from "@/components/admin-table";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

function linesFromOptions(options: { label: string }[]) {
  return options.map((option) => option.label).join("\n");
}

export default async function AdminWallPage() {
  const [posts, polls] = await Promise.all([
    prisma.wallPost.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.poll.findMany({
      orderBy: { createdAt: "desc" },
      include: { options: { orderBy: { sortOrder: "asc" } } }
    })
  ]);

  return (
    <>
      <form action={saveWallPost}>
        <AdminForm title="Nova postagem do mural" description="Atualizações editoriais e destaques do Salão dos Rumores.">
          <div className="grid gap-4 md:grid-cols-3">
            <select name="kind" className="input-base">
              <option value="UPDATE">UPDATE</option>
              <option value="THEORY">THEORY</option>
              <option value="COMMENT">COMMENT</option>
            </select>
            <input name="authorName" className="input-base" placeholder="Autor" />
            <input name="authorKey" className="input-base" placeholder="Chave do autor" />
          </div>
          <input name="title" className="input-base" placeholder="Título opcional" />
          <textarea name="body" className="input-base min-h-32" placeholder="Texto do post" required />
          <div className="flex flex-wrap gap-6 text-sm text-zinc-300">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="pinned" />
              Fixado
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="featured" />
              Destaque
            </label>
          </div>
        </AdminForm>
      </form>

      <AdminTable
        title="Posts do mural"
        columns={["Data", "Tipo", "Autor", "Título", "Ações"]}
        rows={posts.map((post) => [
          formatDate(post.createdAt),
          post.kind,
          post.authorName,
          post.title || "Sem título",
          <form key={post.id} action={deleteWallPost}>
            <input type="hidden" name="id" value={post.id} />
            <button className="text-sm text-red-300">Remover</button>
          </form>
        ])}
      />

      <div className="grid gap-5">
        {posts.map((post) => (
          <form key={post.id} action={saveWallPost}>
            <input type="hidden" name="id" value={post.id} />
            <AdminForm title={`Editar post · ${post.title || post.authorName}`}>
              <div className="grid gap-4 md:grid-cols-3">
                <select name="kind" className="input-base" defaultValue={post.kind}>
                  <option value="UPDATE">UPDATE</option>
                  <option value="THEORY">THEORY</option>
                  <option value="COMMENT">COMMENT</option>
                </select>
                <input name="authorName" className="input-base" defaultValue={post.authorName} />
                <input name="authorKey" className="input-base" defaultValue={post.authorKey} />
              </div>
              <input name="title" className="input-base" defaultValue={post.title || ""} />
              <textarea name="body" className="input-base min-h-32" defaultValue={post.body} required />
              <div className="flex flex-wrap gap-6 text-sm text-zinc-300">
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="pinned" defaultChecked={post.pinned} />
                  Fixado
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="featured" defaultChecked={post.featured} />
                  Destaque
                </label>
              </div>
            </AdminForm>
          </form>
        ))}
      </div>

      <form action={savePoll}>
        <AdminForm title="Nova enquete" description="Uma enquete semanal com voto único por visitante autenticado.">
          <input name="title" className="input-base" placeholder="Título da enquete" required />
          <input name="description" className="input-base" placeholder="Descrição" />
          <textarea name="options" className="input-base min-h-28" placeholder="Uma opção por linha" required />
          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <input type="checkbox" name="isActive" defaultChecked />
            Enquete ativa
          </label>
        </AdminForm>
      </form>

      <AdminTable
        title="Enquetes publicadas"
        columns={["Título", "Opções", "Status", "Ações"]}
        rows={polls.map((poll) => [
          poll.title,
          poll.options.map((option) => option.label).join(", "),
          poll.isActive ? "Ativa" : "Inativa",
          <form key={poll.id} action={deletePoll}>
            <input type="hidden" name="id" value={poll.id} />
            <button className="text-sm text-red-300">Remover</button>
          </form>
        ])}
      />

      <div className="grid gap-5">
        {polls.map((poll) => (
          <form key={poll.id} action={savePoll}>
            <input type="hidden" name="id" value={poll.id} />
            <AdminForm title={`Editar enquete · ${poll.title}`}>
              <input name="title" className="input-base" defaultValue={poll.title} required />
              <input name="description" className="input-base" defaultValue={poll.description || ""} />
              <textarea name="options" className="input-base min-h-28" defaultValue={linesFromOptions(poll.options)} required />
              <label className="flex items-center gap-2 text-sm text-zinc-300">
                <input type="checkbox" name="isActive" defaultChecked={poll.isActive} />
                Enquete ativa
              </label>
            </AdminForm>
          </form>
        ))}
      </div>
    </>
  );
}
