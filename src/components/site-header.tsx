"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { MobileMenu } from "@/components/mobile-menu";

const links = [
  { href: "/", label: "Home" },
  { href: "/bastilha", label: "Bastilha" },
  { href: "/bastilha/personagens", label: "Personagens" },
  { href: "/bastilha/cronologia", label: "Cronologia" },
  { href: "/episodios", label: "Atos" },
];

const socialLinks = [
  { href: "https://www.tiktok.com/@euinelegivel", label: "TikTok" },
  { href: "https://www.instagram.com/euinelegivel/", label: "Instagram" },
  { href: "https://www.facebook.com/profile.php?id=61573541386906", label: "Facebook" },
];

function CourtDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative hidden md:block">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="nav-link flex items-center gap-1.5"
        style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
        aria-expanded={open}
      >
        <span>Acompanhar a corte</span>
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            opacity: 0.5
          }}
        >
          <path d="M1 2.5L4 5.5L7 2.5" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-3 min-w-[160px] border py-2"
          style={{
            borderColor: "rgba(168,138,80,0.15)",
            background: "rgba(8,7,6,0.98)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.6)"
          }}
        >
          <div
            className="px-4 pb-2 mb-1 border-b"
            style={{ borderColor: "rgba(168,138,80,0.1)" }}
          >
            <span
              className="text-xs uppercase tracking-[0.18em]"
              style={{ color: "rgb(var(--subtle))" }}
            >
              Plataformas da casa
            </span>
          </div>
          {socialLinks.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 text-sm transition-colors"
              style={{ color: "rgb(var(--muted))" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgb(var(--gold))")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgb(var(--muted))")}
            >
              <span style={{ letterSpacing: "0.04em" }}>{s.label}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.4 }}>
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

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
          <CourtDropdown />
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/bastilha/mural"
            className="hidden md:inline-flex btn-secondary"
            style={{ padding: "0.5rem 1.25rem", fontSize: "0.65rem" }}
          >
            Salão dos Rumores
          </Link>
          <MobileMenu
            links={[...links, { href: "/bastilha/mural", label: "Salão dos Rumores" }]}
            socialLinks={socialLinks}
          />
        </div>
      </div>
    </header>
  );
}
