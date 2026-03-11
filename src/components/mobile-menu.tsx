"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type MobileMenuProps = {
  links: { href: string; label: string }[];
};

export function MobileMenu({ links }: MobileMenuProps) {
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
        </div>
      ) : null}
    </div>
  );
}
