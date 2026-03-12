"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type MobileMenuProps = {
  links: { href: string; label: string }[];
  socialLinks?: { href: string; label: string }[];
};

export function MobileMenu({ links, socialLinks }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((state) => !state)}
        className="inline-flex h-10 w-10 items-center justify-center border"
        style={{ borderColor: "rgb(var(--border))", background: "transparent" }}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
      >
        {open
          ? <X className="h-4 w-4" style={{ color: "rgb(var(--foreground))" }} />
          : <Menu className="h-4 w-4" style={{ color: "rgb(var(--muted))" }} />
        }
      </button>
      {open ? (
        <div
          className="absolute left-4 right-4 top-20 border p-5 shadow-glow"
          style={{
            borderColor: "rgb(var(--border))",
            background: "rgba(8,7,6,0.98)",
            backdropFilter: "blur(20px)"
          }}
        >
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="nav-link px-3 py-3 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {socialLinks && socialLinks.length > 0 && (
            <div
              className="mt-4 pt-4 border-t"
              style={{ borderColor: "rgba(168,138,80,0.1)" }}
            >
              <div
                className="px-3 pb-2 text-xs uppercase tracking-[0.18em]"
                style={{ color: "rgb(var(--subtle))" }}
              >
                Acompanhar a corte
              </div>
              <div className="flex flex-col gap-0.5">
                {socialLinks.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 text-sm"
                    style={{ color: "rgb(var(--muted))" }}
                  >
                    <span style={{ letterSpacing: "0.04em" }}>{s.label}</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.35 }}>
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
