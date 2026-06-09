import Link from "next/link";
import Image from "next/image";

const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="border-t" style={{ borderColor: "rgba(255,255,255,0.08)", background: "#000" }}>
      {/* Ticker */}
      <div className="ticker-wrap" style={{ background: "#FF0066", padding: "0.55rem 0" }}>
        <div className="ticker-track">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="ticker-item" style={{ color: "#fff" }}>
              BOLSONIER STORE &nbsp;·&nbsp; BOUTIQUE STREETWEAR &nbsp;·&nbsp; O PIX É NOSSO &nbsp;·&nbsp; EST. 24 &nbsp;·&nbsp; SAO PAULO / BRASIL &nbsp;·&nbsp; LUXURY COUNTERFEIT &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="container-shell py-16">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="space-y-5">
            <Image src="/logo-full.png" alt="BOLSONIER STORE" width={200} height={60} className="h-10 w-auto object-contain" />
            <p className="body-md max-w-xs">
              Boutique Streetwear de raiz brasileira e atitude global. Luxury Counterfeit. Ironia Elegante. Vandalismo Refinado.
            </p>
            <div className="flex items-center gap-3">
              <span className="badge-pink">EST. 24</span>
              <span className="badge-green">SAO PAULO</span>
            </div>
          </div>

          {/* Coleções */}
          <div className="space-y-4">
            <div className="kicker-muted">Coleções</div>
            <div className="flex flex-col gap-2.5">
              <Link href="/colecoes" className="body-md hover:text-white transition-colors">O Pix É Nosso</Link>
              <Link href="/colecoes" className="body-md hover:text-white transition-colors">Novas Chegadas</Link>
              <Link href="/colecoes" className="body-md hover:text-white transition-colors">Mais Vendidos</Link>
            </div>
          </div>

          {/* Institucional */}
          <div className="space-y-4">
            <div className="kicker-muted">Institucional</div>
            <div className="flex flex-col gap-2.5">
              <Link href="/sobre" className="body-md hover:text-white transition-colors">Sobre</Link>
              <Link href="/contato" className="body-md hover:text-white transition-colors">Contato</Link>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <div className="kicker-muted">Redes Sociais</div>
            <div className="flex flex-col gap-2.5">
              <a href="https://www.instagram.com/euinelegivel/" target="_blank" rel="noopener noreferrer" className="body-md hover:text-white transition-colors flex items-center gap-2">
                Instagram
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.4 }}><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
              </a>
              <a href="https://www.tiktok.com/@euinelegivel" target="_blank" rel="noopener noreferrer" className="body-md hover:text-white transition-colors flex items-center gap-2">
                TikTok
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.4 }}><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <p className="body-md text-xs">
            © {year} BOLSONIER STORE. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2">
            <span className="body-md text-xs">INDEPENDENT BRAND</span>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
            <span className="body-md text-xs">LIMITED MENTALITY</span>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
            <span className="body-md text-xs" style={{ color: "#A6FF00" }}>NO PERMISSION NEEDED</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
