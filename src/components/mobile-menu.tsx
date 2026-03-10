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
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open ? (
        <div className="absolute left-4 right-4 top-20 rounded-3xl border border-white/10 bg-zinc-950/98 p-4 shadow-glow">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm text-zinc-200 transition hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/bastilha/mural"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2"
            >
              Entrar no mural
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
