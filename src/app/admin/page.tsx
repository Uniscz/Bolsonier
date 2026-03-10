import { logoutAdmin } from "@/app/admin/actions";
import { AdminTable } from "@/components/admin-table";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const [projects, courses, contacts, posts] = await Promise.all([
    prisma.project.count(),
    prisma.course.count(),
    prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 5
    }),
    prisma.wallPost.findMany({
      orderBy: { createdAt: "desc" },
      take: 5
    })
  ]);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="kicker">Painel</div>
          <h1 className="mt-3 font-display text-4xl font-semibold">Resumo operacional</h1>
        </div>
        <form action={logoutAdmin}>
          <button className="btn-secondary">Sair</button>
        </form>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="panel p-6">
          <div className="kicker">Projetos</div>
          <div className="mt-4 font-display text-4xl font-semibold">{projects}</div>
        </div>
        <div className="panel p-6">
          <div className="kicker">Cursos</div>
          <div className="mt-4 font-display text-4xl font-semibold">{courses}</div>
        </div>
        <div className="panel p-6">
          <div className="kicker">Contatos recentes</div>
          <div className="mt-4 font-display text-4xl font-semibold">{contacts.length}</div>
        </div>
      </div>

      <AdminTable
        title="Mensagens recentes"
        columns={["Data", "Nome", "E-mail", "Categoria", "Status"]}
        rows={contacts.map((contact) => [
          formatDate(contact.createdAt),
          contact.name,
          contact.email,
          contact.type,
          contact.status
        ])}
      />

      <AdminTable
        title="Atividade do mural"
        columns={["Data", "Autor", "Tipo", "Título"]}
        rows={posts.map((post) => [
          formatDate(post.createdAt),
          post.authorName,
          post.kind,
          post.title || "Sem título"
        ])}
      />
    </>
  );
}
