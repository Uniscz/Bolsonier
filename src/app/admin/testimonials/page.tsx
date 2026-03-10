import { deleteTestimonial, saveTestimonial } from "@/app/admin/actions";
import { AdminForm } from "@/components/admin-form";
import { AdminTable } from "@/components/admin-table";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }]
  });

  return (
    <>
      <form action={saveTestimonial}>
        <AdminForm title="Novo feedback" description="Depoimentos e comentários que reforçam a percepção de valor.">
          <div className="grid gap-4 md:grid-cols-2">
            <input name="name" className="input-base" placeholder="Nome" required />
            <input name="role" className="input-base" placeholder="Cargo ou contexto" />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <input name="category" className="input-base" placeholder="Categoria" required />
            <input name="sourceLabel" className="input-base" placeholder="Origem" />
            <input name="sortOrder" type="number" className="input-base" placeholder="Ordem" />
          </div>
          <textarea name="quote" className="input-base min-h-32" placeholder="Depoimento" required />
          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <input type="checkbox" name="featured" />
            Destaque
          </label>
        </AdminForm>
      </form>

      <AdminTable
        title="Feedbacks cadastrados"
        columns={["Nome", "Categoria", "Destaque", "Ações"]}
        rows={testimonials.map((testimonial) => [
          testimonial.name,
          testimonial.category,
          testimonial.featured ? "Sim" : "Não",
          <form key={testimonial.id} action={deleteTestimonial}>
            <input type="hidden" name="id" value={testimonial.id} />
            <button className="text-sm text-red-300">Remover</button>
          </form>
        ])}
      />

      <div className="grid gap-5">
        {testimonials.map((testimonial) => (
          <form key={testimonial.id} action={saveTestimonial}>
            <input type="hidden" name="id" value={testimonial.id} />
            <AdminForm title={`Editar · ${testimonial.name}`}>
              <div className="grid gap-4 md:grid-cols-2">
                <input name="name" className="input-base" defaultValue={testimonial.name} required />
                <input name="role" className="input-base" defaultValue={testimonial.role || ""} />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <input name="category" className="input-base" defaultValue={testimonial.category} required />
                <input name="sourceLabel" className="input-base" defaultValue={testimonial.sourceLabel || ""} />
                <input name="sortOrder" type="number" className="input-base" defaultValue={testimonial.sortOrder} />
              </div>
              <textarea name="quote" className="input-base min-h-32" defaultValue={testimonial.quote} required />
              <label className="flex items-center gap-2 text-sm text-zinc-300">
                <input type="checkbox" name="featured" defaultChecked={testimonial.featured} />
                Destaque
              </label>
            </AdminForm>
          </form>
        ))}
      </div>
    </>
  );
}
