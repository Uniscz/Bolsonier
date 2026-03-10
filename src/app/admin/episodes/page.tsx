import { deleteEpisode, saveEpisode } from "@/app/admin/actions";
import { AdminForm } from "@/components/admin-form";
import { AdminTable } from "@/components/admin-table";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

export default async function AdminEpisodesPage() {
  const episodes = await prisma.episode.findMany({
    orderBy: { publishedAt: "desc" }
  });

  return (
    <>
      <form action={saveEpisode}>
        <AdminForm title="Novo episódio" description="Biblioteca para atos, temporadas e peças institucionais.">
          <div className="grid gap-4 md:grid-cols-2">
            <input name="title" className="input-base" placeholder="Título" required />
            <input name="slug" className="input-base" placeholder="slug-do-episodio" required />
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            <input name="series" className="input-base" placeholder="Série" required />
            <input name="season" type="number" className="input-base" placeholder="Temporada" />
            <input name="actLabel" className="input-base" placeholder="Ato" />
            <input name="category" className="input-base" placeholder="Categoria" />
          </div>
          <textarea name="summary" className="input-base min-h-24" placeholder="Resumo" required />
          <div className="grid gap-4 md:grid-cols-3">
            <input name="thumbnailUrl" className="input-base" placeholder="URL da thumbnail" />
            <input name="externalUrl" className="input-base" placeholder="URL externa" />
            <input name="embedUrl" className="input-base" placeholder="URL de embed" />
          </div>
          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <input type="checkbox" name="featured" />
            Destaque
          </label>
        </AdminForm>
      </form>

      <AdminTable
        title="Episódios cadastrados"
        columns={["Título", "Série", "Ato", "Destaque", "Ações"]}
        rows={episodes.map((episode) => [
          episode.title,
          episode.series,
          episode.actLabel || "—",
          episode.featured ? "Sim" : "Não",
          <form key={episode.id} action={deleteEpisode}>
            <input type="hidden" name="id" value={episode.id} />
            <button className="text-sm text-red-300">Remover</button>
          </form>
        ])}
      />

      <div className="grid gap-5">
        {episodes.map((episode) => (
          <form key={episode.id} action={saveEpisode}>
            <input type="hidden" name="id" value={episode.id} />
            <AdminForm title={`Editar · ${episode.title}`}>
              <div className="grid gap-4 md:grid-cols-2">
                <input name="title" className="input-base" defaultValue={episode.title} required />
                <input name="slug" className="input-base" defaultValue={episode.slug} required />
              </div>
              <div className="grid gap-4 md:grid-cols-4">
                <input name="series" className="input-base" defaultValue={episode.series} required />
                <input name="season" type="number" className="input-base" defaultValue={episode.season || ""} />
                <input name="actLabel" className="input-base" defaultValue={episode.actLabel || ""} />
                <input name="category" className="input-base" defaultValue={episode.category || ""} />
              </div>
              <textarea name="summary" className="input-base min-h-24" defaultValue={episode.summary} required />
              <div className="grid gap-4 md:grid-cols-3">
                <input name="thumbnailUrl" className="input-base" defaultValue={episode.thumbnailUrl || ""} />
                <input name="externalUrl" className="input-base" defaultValue={episode.externalUrl || ""} />
                <input name="embedUrl" className="input-base" defaultValue={episode.embedUrl || ""} />
              </div>
              <label className="flex items-center gap-2 text-sm text-zinc-300">
                <input type="checkbox" name="featured" defaultChecked={episode.featured} />
                Destaque
              </label>
            </AdminForm>
          </form>
        ))}
      </div>
    </>
  );
}
