import {
  deleteCharacter,
  deleteTimelineEvent,
  saveCharacter,
  saveTimelineEvent
} from "@/app/admin/actions";
import { AdminForm } from "@/components/admin-form";
import { AdminTable } from "@/components/admin-table";
import { prisma } from "@/lib/prisma";

export default async function AdminBastilhaPage() {
  const [characters, timeline] = await Promise.all([
    prisma.bastilhaCharacter.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.timelineEvent.findMany({ orderBy: { sortOrder: "asc" } })
  ]);

  return (
    <>
      <form action={saveCharacter}>
        <AdminForm title="Novo personagem" description="Dossiê de personagens do universo interno.">
          <div className="grid gap-4 md:grid-cols-2">
            <input name="name" className="input-base" placeholder="Nome" required />
            <input name="slug" className="input-base" placeholder="slug" required />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <input name="title" className="input-base" placeholder="Título" />
            <input name="allegiance" className="input-base" placeholder="Aliança" />
            <input name="sortOrder" type="number" className="input-base" placeholder="Ordem" />
          </div>
          <input name="imageUrl" className="input-base" placeholder="Imagem" />
          <textarea name="summary" className="input-base min-h-28" placeholder="Resumo" required />
          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <input type="checkbox" name="featured" />
            Destaque
          </label>
        </AdminForm>
      </form>

      <AdminTable
        title="Personagens cadastrados"
        columns={["Nome", "Aliança", "Destaque", "Ações"]}
        rows={characters.map((character) => [
          character.name,
          character.allegiance || "—",
          character.featured ? "Sim" : "Não",
          <form key={character.id} action={deleteCharacter}>
            <input type="hidden" name="id" value={character.id} />
            <button className="text-sm text-red-300">Remover</button>
          </form>
        ])}
      />

      <div className="grid gap-5">
        {characters.map((character) => (
          <form key={character.id} action={saveCharacter}>
            <input type="hidden" name="id" value={character.id} />
            <AdminForm title={`Editar personagem · ${character.name}`}>
              <div className="grid gap-4 md:grid-cols-2">
                <input name="name" className="input-base" defaultValue={character.name} required />
                <input name="slug" className="input-base" defaultValue={character.slug} required />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <input name="title" className="input-base" defaultValue={character.title || ""} />
                <input name="allegiance" className="input-base" defaultValue={character.allegiance || ""} />
                <input name="sortOrder" type="number" className="input-base" defaultValue={character.sortOrder} />
              </div>
              <input name="imageUrl" className="input-base" defaultValue={character.imageUrl || ""} />
              <textarea name="summary" className="input-base min-h-28" defaultValue={character.summary} required />
              <label className="flex items-center gap-2 text-sm text-zinc-300">
                <input type="checkbox" name="featured" defaultChecked={character.featured} />
                Destaque
              </label>
            </AdminForm>
          </form>
        ))}
      </div>

      <form action={saveTimelineEvent}>
        <AdminForm title="Novo evento da cronologia" description="Linha histórica e dossiê do universo.">
          <div className="grid gap-4 md:grid-cols-3">
            <input name="title" className="input-base" placeholder="Título" required />
            <input name="slug" className="input-base" placeholder="slug" required />
            <input name="dateLabel" className="input-base" placeholder="Rótulo temporal" required />
          </div>
          <textarea name="body" className="input-base min-h-28" placeholder="Descrição" required />
          <div className="grid gap-4 md:grid-cols-2">
            <input name="sortOrder" type="number" className="input-base" placeholder="Ordem" />
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input type="checkbox" name="important" />
              Evento importante
            </label>
          </div>
        </AdminForm>
      </form>

      <AdminTable
        title="Eventos da cronologia"
        columns={["Título", "Data", "Importante", "Ações"]}
        rows={timeline.map((event) => [
          event.title,
          event.dateLabel,
          event.important ? "Sim" : "Não",
          <form key={event.id} action={deleteTimelineEvent}>
            <input type="hidden" name="id" value={event.id} />
            <button className="text-sm text-red-300">Remover</button>
          </form>
        ])}
      />

      <div className="grid gap-5">
        {timeline.map((event) => (
          <form key={event.id} action={saveTimelineEvent}>
            <input type="hidden" name="id" value={event.id} />
            <AdminForm title={`Editar evento · ${event.title}`}>
              <div className="grid gap-4 md:grid-cols-3">
                <input name="title" className="input-base" defaultValue={event.title} required />
                <input name="slug" className="input-base" defaultValue={event.slug} required />
                <input name="dateLabel" className="input-base" defaultValue={event.dateLabel} required />
              </div>
              <textarea name="body" className="input-base min-h-28" defaultValue={event.body} required />
              <div className="grid gap-4 md:grid-cols-2">
                <input name="sortOrder" type="number" className="input-base" defaultValue={event.sortOrder} />
                <label className="flex items-center gap-2 text-sm text-zinc-300">
                  <input type="checkbox" name="important" defaultChecked={event.important} />
                  Evento importante
                </label>
              </div>
            </AdminForm>
          </form>
        ))}
      </div>
    </>
  );
}
