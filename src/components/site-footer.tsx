import Link from "next/link";

const socialLinks = [
  { href: "https://www.tiktok.com/@euinelegivel", label: "TikTok" },
  { href: "https://www.instagram.com/euinelegivel/", label: "Instagram" },
  { href: "https://www.facebook.com/profile.php?id=61573541386906", label: "Facebook" },
];

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
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <div
              className="font-display text-lg"
              style={{ color: "rgb(var(--foreground))", fontWeight: 300, letterSpacing: "0.05em" }}
            >
              A Bastilha de Bolsonier
            </div>
            <p className="body-md max-w-xs">
              Toda linhagem guarda um crime. Toda corte exige um sacrifício.
            </p>
            <Link
              href="/obra/a-bastilha-de-bolsonier"
              className="body-md text-xs hover:text-gold transition-colors inline-flex items-center gap-2"
              style={{ color: "rgb(var(--subtle))" }}
            >
              Página oficial da obra
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.5 }}>
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
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
              <Link href="/obra/a-bastilha-de-bolsonier" className="body-md hover:text-gold transition-colors">A obra</Link>
              <Link href="/sobre" className="body-md hover:text-gold transition-colors">Sobre</Link>
              <Link href="/contato" className="body-md hover:text-gold transition-colors">Contato</Link>
              <a
                href="https://www.imdb.com/title/tt40604167/"
                target="_blank"
                rel="noopener noreferrer"
                className="body-md hover:text-gold transition-colors flex items-center gap-1.5"
              >
                IMDb
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.35 }}>
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
          </div>
          <div className="space-y-3">
            <div className="kicker-muted">Circulação pública</div>
            <p className="body-md text-xs mb-3" style={{ color: "rgb(var(--subtle))" }}>
              Os atos, rumores e aparições da Bastilha seguem em circulação nas plataformas públicas da casa.
            </p>
            <div className="grid gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="body-md hover:text-gold transition-colors flex items-center gap-2"
                >
                  {s.label}
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.35 }}>
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div
          className="mt-12 border-t pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderColor: "rgb(var(--border))" }}
        >
          <p
            className="text-xs"
            style={{ letterSpacing: "0.08em", color: "rgb(var(--subtle))", maxWidth: "42rem" }}
          >
            A Bastilha de Bolsonier é uma obra audiovisual criada por André Luiz de Almeida e produzida por Bolsonier Studios.
          </p>
          <span
            className="text-xs flex-shrink-0"
            style={{ letterSpacing: "0.15em", color: "rgb(var(--subtle))" }}
          >
            © {year}
          </span>
        </div>
      </div>
    </footer>
  );
}
