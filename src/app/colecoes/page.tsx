import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coleções — BOLSONIER STORE",
  description: "Explore as coleções da BOLSONIER STORE. O Pix É Nosso e muito mais. Boutique Streetwear de raiz brasileira.",
};

const products = [
  { id: 1, src: "/model-1.png", name: "Oversized T-Shirt Black", collection: "O Pix É Nosso", tag: "Masculino" },
  { id: 2, src: "/model-2.png", name: "Oversized T-Shirt Forest Green", collection: "O Pix É Nosso", tag: "Feminino" },
  { id: 3, src: "/model-3.png", name: "Oversized T-Shirt Green", collection: "O Pix É Nosso", tag: "Feminino" },
  { id: 4, src: "/model-4.png", name: "Coleção Completa — Todas as Cores", collection: "O Pix É Nosso", tag: "Coleção" },
  { id: 5, src: "/model-5.png", name: "Editorial São Paulo", collection: "O Pix É Nosso", tag: "Editorial" },
];

export default function ColecoesPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative flex items-end overflow-hidden"
        style={{ background: "#000", paddingTop: "80px", minHeight: "50vh" }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ overflow: "hidden" }}
        >
          <div
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: "clamp(6rem, 22vw, 22rem)",
              lineHeight: 1,
              color: "rgba(255,255,255,0.03)",
              userSelect: "none",
              whiteSpace: "nowrap",
            }}
          >
            COLEÇÕES
          </div>
        </div>
        <div className="container-shell relative z-10 pb-16">
          <div className="kicker mb-4">Boutique Streetwear</div>
          <h1
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: "clamp(3rem, 10vw, 9rem)",
              lineHeight: 0.9,
              color: "#fff",
            }}
          >
            COLE<span style={{ color: "#FF0066" }}>ÇÕES</span>
          </h1>
        </div>
      </section>

      {/* Ticker */}
      <div className="ticker-wrap" style={{ background: "#FF0066", padding: "0.55rem 0" }}>
        <div className="ticker-track">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="ticker-item" style={{ color: "#fff" }}>
              O PIX É NOSSO &nbsp;·&nbsp; BOLSONIER STORE &nbsp;·&nbsp; BOUTIQUE STREETWEAR &nbsp;·&nbsp; SAO PAULO / BRASIL &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Collection label */}
      <section className="section-space" style={{ background: "#000" }}>
        <div className="container-shell">
          <div className="flex items-center gap-6 mb-12">
            <div>
              <div className="kicker mb-2">Coleção Atual</div>
              <h2
                style={{
                  fontFamily: "Bebas Neue, sans-serif",
                  fontSize: "clamp(2rem, 6vw, 5rem)",
                  lineHeight: 0.95,
                  color: "#fff",
                }}
              >
                O PIX É NOSSO
              </h2>
            </div>
            <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.08)" }} />
            <span className="badge-pink">EST. 24</span>
          </div>

          {/* Products grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
            {products.map((product) => (
              <div
                key={product.id}
                className="relative overflow-hidden group cursor-pointer"
                style={{ background: "#0a0a0a", aspectRatio: "3/4" }}
              >
                <Image
                  src={product.src}
                  alt={product.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)" }}
                >
                  <div className="kicker-muted mb-1">{product.collection}</div>
                  <div className="text-white font-semibold text-sm tracking-wide mb-2">{product.name}</div>
                  <span className="badge-pink">{product.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-space" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container-shell text-center">
          <div className="kicker-green mb-6">Em Breve</div>
          <h2
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: "clamp(2rem, 6vw, 5rem)",
              lineHeight: 0.95,
              color: "#fff",
              marginBottom: "1.5rem",
            }}
          >
            NOVAS PEÇAS<br />
            <span style={{ color: "#A6FF00" }}>CHEGANDO</span>
          </h2>
          <p className="body-lg max-w-lg mx-auto mb-10">
            Fique por dentro das novidades. Siga a BOLSONIER STORE no Instagram para ser o primeiro a saber.
          </p>
          <a
            href="https://www.instagram.com/euinelegivel/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-green"
          >
            Seguir no Instagram
          </a>
        </div>
      </section>
    </>
  );
}
