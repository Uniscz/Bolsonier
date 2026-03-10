import { markContact } from "@/app/admin/actions";
import { AdminTable } from "@/components/admin-table";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function AdminContactsPage() {
  const contacts = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <AdminTable
      title="Contatos recebidos"
      description="Listagem básica de contatos enviados pelo formulário."
      columns={["Data", "Nome", "E-mail", "Tipo", "Mensagem", "Status"]}
      rows={contacts.map((contact) => [
        formatDate(contact.createdAt),
        contact.name,
        contact.email,
        contact.type,
        <div key={contact.id} className="max-w-sm text-sm text-zinc-300">
          {contact.message}
        </div>,
        <form key={`${contact.id}-status`} action={markContact} className="flex items-center gap-2">
          <input type="hidden" name="id" value={contact.id} />
          <select name="status" defaultValue={contact.status} className="input-base min-w-[120px]">
            <option value="novo">novo</option>
            <option value="lido">lido</option>
            <option value="respondido">respondido</option>
          </select>
          <button className="text-xs uppercase tracking-[0.16em] text-white">Salvar</button>
        </form>
      ])}
    />
  );
}
