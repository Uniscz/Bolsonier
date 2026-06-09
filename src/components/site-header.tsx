"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/colecoes", label: "Coleções" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(0,0,0,0.92)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="container-shell">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo-full.png"
              alt="BOLSONIER STORE"
              width={220}
              height={66}
              className="h-10 md:h-12 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://www.instagram.com/euinelegivel/"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              Instagram
            </a>
            <Link href="/colecoes" className="btn-primary" style={{ padding: "0.6rem 1.4rem", fontSize: "0.6rem" }}>
              Ver Coleção
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <span className="block h-px w-6 bg-white transition-all" style={{ transform: menuOpen ? "rotate(45deg) translateY(4px)" : "none" }} />
            <span className="block h-px w-6 bg-white transition-all" style={{ opacity: menuOpen ? 0 : 1 }} />
            <span className="block h-px w-6 bg-white transition-all" style={{ transform: menuOpen ? "rotate(-45deg) translateY(-4px)" : "none" }} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t" style={{ borderColor: "rgba(255,255,255,0.08)", background: "#000" }}>
          <div className="container-shell py-6 flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link" style={{ fontSize: "0.85rem" }} onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <Link href="/colecoes" className="btn-primary w-full justify-center" onClick={() => setMenuOpen(false)}>
                Ver Coleção
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
