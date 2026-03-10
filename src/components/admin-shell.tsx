import Link from "next/link";
import { LayoutDashboard, FolderKanban, MessageSquare, Users, Video, BookOpen, Clock3, Mail } from "lucide-react";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/sections", label: "Seções", icon: FolderKanban },
  { href: "/admin/projects", label: "Projetos", icon: FolderKanban },
  { href: "/admin/courses", label: "Cursos", icon: BookOpen },
  { href: "/admin/episodes", label: "Episódios", icon: Video },
  { href: "/admin/testimonials", label: "Feedbacks", icon: MessageSquare },
  { href: "/admin/bastilha", label: "Bastilha", icon: Users },
  { href: "/admin/contacts", label: "Contatos", icon: Mail },
  { href: "/admin/wall", label: "Mural", icon: Clock3 }
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-shell section-space grid gap-8 lg:grid-cols-[240px_1fr]">
      <aside className="panel h-fit p-4">
        <div className="mb-4 px-3 py-2">
          <div className="text-sm font-semibold">Painel Bolsonier</div>
          <div className="mt-1 text-xs uppercase tracking-[0.22em] text-zinc-500">Admin</div>
        </div>
        <nav className="grid gap-1">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="space-y-8">{children}</div>
    </div>
  );
}
