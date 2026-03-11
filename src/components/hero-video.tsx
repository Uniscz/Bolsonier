"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

interface HeroVideoProps {
  videoSrc?: string;
  posterSrc?: string;
}

export function HeroVideo({ videoSrc, posterSrc }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // autoplay blocked — poster fallback is shown
      });
    }
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "100svh", background: "rgb(var(--background))" }}
    >
      {/* Background gradient overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(168,138,80,0.04) 0%, transparent 70%)"
        }}
      />

      {/* Desktop: composição híbrida — vídeo 9:16 central + laterais com gradiente */}
      <div className="relative z-10 flex h-full min-h-[100svh] items-center">
        <div className="container-shell w-full">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-12">

            {/* Coluna esquerda — texto */}
            <div className="order-2 lg:order-1 animate-fade-up">
              <div className="kicker mb-6">Bolsonier Studios apresenta</div>
              <h1
                className="font-display mb-6"
                style={{
                  fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                  fontWeight: 300,
                  lineHeight: 1.04,
                  letterSpacing: "-0.025em",
                  color: "rgb(var(--foreground))"
                }}
              >
                Bastilha de<br />
                <em style={{ fontStyle: "italic", color: "rgb(var(--gold))" }}>Bolsonier</em>
              </h1>
              <p
                className="body-lg mb-8 max-w-sm"
                style={{ fontSize: "0.95rem" }}
              >
                Uma corte erguida sobre poder, herança, desejo e ruína.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/bastilha" className="btn-primary">
                  Entrar na Bastilha
                </Link>
                <Link href="/bastilha/personagens" className="btn-secondary">
                  Ver personagens
                </Link>
              </div>

              {/* Tagline */}
              <div
                className="mt-10 pt-8 border-t"
                style={{ borderColor: "rgb(var(--border))" }}
              >
                <p
                  className="font-display text-sm italic"
                  style={{ color: "rgb(var(--muted))", letterSpacing: "0.02em" }}
                >
                  Toda linhagem guarda um crime.<br />
                  Toda corte exige um sacrifício.
                </p>
              </div>
            </div>

            {/* Coluna central — vídeo 9:16 */}
            <div
              className="order-1 lg:order-2 mx-auto animate-fade-in"
              style={{ width: "min(280px, 42vw)", flexShrink: 0 }}
            >
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: "9/16",
                  border: "1px solid rgba(168,138,80,0.2)",
                  boxShadow: "0 0 80px rgba(168,138,80,0.08), 0 40px 120px rgba(0,0,0,0.8)"
                }}
              >
                {videoSrc ? (
                  <video
                    ref={videoRef}
                    src={videoSrc}
                    poster={posterSrc}
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : posterSrc ? (
                  <img
                    src={posterSrc}
                    alt="Bastilha de Bolsonier"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div
                    className="h-full w-full flex flex-col items-center justify-center gap-4"
                    style={{ background: "rgb(var(--surface))" }}
                  >
                    <div
                      className="h-20 w-20 border flex items-center justify-center"
                      style={{ borderColor: "rgba(168,138,80,0.2)" }}
                    >
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        style={{ color: "rgba(168,138,80,0.4)" }}
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                    <span className="media-slot-label">[VIDEO_HERO_9x16]</span>
                    <span className="media-slot-label" style={{ fontSize: "0.55rem" }}>poster fallback: [POSTER_HERO]</span>
                  </div>
                )}

                {/* Overlay gradiente inferior */}
                <div
                  className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                  style={{
                    background: "linear-gradient(to top, rgba(8,7,6,0.7) 0%, transparent 100%)"
                  }}
                />
              </div>
            </div>

            {/* Coluna direita — navegação rápida */}
            <div className="order-3 hidden lg:flex flex-col gap-6 animate-fade-up delay-300">
              <div className="kicker-muted mb-2">Universo</div>
              {[
                { href: "/bastilha/personagens", label: "Personagens", desc: "O elenco da corte" },
                { href: "/bastilha/cronologia", label: "Cronologia", desc: "A linha da queda" },
                { href: "/episodios", label: "Atos", desc: "A biblioteca viva" },
                { href: "/bastilha/mural", label: "Salão dos Rumores", desc: "Teorias e suspeitas" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-start gap-3"
                >
                  <div
                    className="mt-1 h-px w-4 flex-shrink-0 transition-all duration-300 group-hover:w-6"
                    style={{ background: "rgb(var(--gold-dim))", marginTop: "0.6rem" }}
                  />
                  <div>
                    <div
                      className="text-sm font-medium transition-colors group-hover:text-gold"
                      style={{ color: "rgb(var(--foreground))", letterSpacing: "0.04em" }}
                    >
                      {item.label}
                    </div>
                    <div className="body-md text-xs mt-0.5">{item.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-fade-in delay-400 hidden md:block"
      >
        <div
          className="flex flex-col items-center gap-2"
          style={{ color: "rgb(var(--subtle))" }}
        >
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Descer
          </span>
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="1" y="1" width="10" height="18" rx="5" />
            <circle cx="6" cy="5" r="1.5" fill="currentColor" stroke="none">
              <animate attributeName="cy" values="5;13;5" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      </div>
    </section>
  );
}
