import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="border-t"
      style={{ borderColor: "rgb(var(--border))", paddingTop: "4rem", paddingBottom: "3rem" }}
    >
      <div className="container-shell">
        <div className="mb-12 flex items-center gap-6">
          <hr className="gold-rule flex-1" />
          <span
            className="font-display text-xs"
            style={{ color: "rgb(var(--gold-dim))", letterSpacing: "0.3em", textTransform: "uppercase" }}
          >
            Bastilha de Bolsonier
          </span>
          <hr className="gold-rule flex-1" />
        </div>

        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <div
              className="font-display text-lg"
              style={{ color: "rgb(var(--foreground))", fontWeight: 300, letterSpacing: "0.05em" }}
            >
              Bastilha de Bolsonier
            </div>
            <p className="body-md max-w-xs">
              Toda linhagem guarda um crime. Toda corte exige um sacrifício.
            </p>
          </div>

          <div className="space-y-3">
            <div className="kicker-muted">Universo</div>
            <div className="grid gap-2">
              <Link href="/bastilha" className="body-md hover:text-gold transition-colors">A Bastilha</Link>
              <Link href="/bastilha/personagens" className="body-md hover:text-gold transition-colors">Personagens</Link>
              <Link href="/bastilha/cronologia" className="body-md hover:text-gold transition-colors">Cronologia</Link>
              <Link href="/episodios" className="body-md hover:text-gold transition-colors">Atos</Link>
            </div>
          </div>

          <div className="space-y-3">
            <div className="kicker-muted">Comunidade</div>
            <div className="grid gap-2">
              <Link href="/bastilha/mural" className="body-md hover:text-gold transition-colors">Salão dos Rumores</Link>
            </div>
          </div>

          <div className="space-y-3">
            <div className="kicker-muted">Institucional</div>
            <div className="grid gap-2">
              <Link href="/sobre" className="body-md hover:text-gold transition-colors">Sobre</Link>
              <Link href="/contato" className="body-md hover:text-gold transition-colors">Contato</Link>
              <Link href="/admin/login" className="body-md hover:text-gold transition-colors">Admin</Link>
            </div>
          </div>
        </div>

        <div
          className="mt-12 border-t pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderColor: "rgb(var(--border))" }}
        >
          <span
            className="text-xs uppercase"
            style={{ letterSpacing: "0.2em", color: "rgb(var(--subtle))" }}
          >
            Uma obra autoral de Bolsonier Studios
          </span>
          <span
            className="text-xs"
            style={{ letterSpacing: "0.15em", color: "rgb(var(--subtle))" }}
          >
            © {year}
          </span>
        </div>
      </div>
    </footer>
  );
}
