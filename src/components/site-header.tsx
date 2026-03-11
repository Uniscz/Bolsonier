import Link from "next/link";
import { MobileMenu } from "@/components/mobile-menu";

const links = [
  { href: "/", label: "Home" },
  { href: "/bastilha", label: "Bastilha" },
  { href: "/bastilha/personagens", label: "Personagens" },
  { href: "/bastilha/cronologia", label: "Cronologia" },
  { href: "/episodios", label: "Atos" },
];

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ borderColor: "rgb(var(--border))", backgroundColor: "rgba(8,7,6,0.92)", backdropFilter: "blur(20px)" }}
    >
      <div className="container-shell flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="flex h-8 w-8 items-center justify-center border"
            style={{ borderColor: "rgba(168,138,80,0.3)", background: "rgba(168,138,80,0.06)" }}
          >
            <span className="font-display text-xs" style={{ color: "rgb(var(--gold))", letterSpacing: "0.05em" }}>B</span>
          </div>
          <span
            className="font-display text-base hidden sm:block"
            style={{ color: "rgb(var(--foreground))", letterSpacing: "0.06em", fontWeight: 300 }}
          >
            Bastilha de Bolsonier
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/bastilha/mural"
            className="hidden md:inline-flex btn-secondary"
            style={{ padding: "0.5rem 1.25rem", fontSize: "0.65rem" }}
          >
            Salão dos Rumores
          </Link>
          <MobileMenu links={[...links, { href: "/bastilha/mural", label: "Salão dos Rumores" }]} />
        </div>
      </div>
    </header>
  );
}
