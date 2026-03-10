import Link from "next/link";
import { MobileMenu } from "@/components/mobile-menu";

const links = [
  { href: "/sobre", label: "Sobre" },
  { href: "/bastilha", label: "Bastilha" },
  { href: "/mentoria", label: "Mentoria" },
  { href: "/cursos", label: "Cursos" },
  { href: "/episodios", label: "Episódios" },
  { href: "/projetos", label: "Projetos" },
  { href: "/feedbacks", label: "Feedbacks" },
  { href: "/contato", label: "Contato" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/55 backdrop-blur-xl">
      <div className="container-shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 font-display text-sm font-semibold">
            BS
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-wide">Bolsonier Studios</div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
              bolsonier.art
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/bastilha/mural" className="btn-secondary">
            Salão dos Rumores
          </Link>
        </div>

        <MobileMenu links={links} />
      </div>
    </header>
  );
}
