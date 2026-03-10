import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-12">
      <div className="container-shell grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-4">
          <div className="font-display text-xl font-semibold">Bolsonier Studios</div>
          <p className="max-w-md text-sm leading-6 text-zinc-400">
            Produtora criativa autoral para narrativas, direção visual, IA aplicada e
            estruturas prontas para crescer como obra, presença e negócio.
          </p>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold text-white">Explorar</div>
          <div className="grid gap-2 text-sm text-zinc-400">
            <Link href="/bastilha">Bastilha de Bolsonier</Link>
            <Link href="/mentoria">Mentoria</Link>
            <Link href="/cursos">Cursos</Link>
            <Link href="/projetos">Projetos</Link>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold text-white">Institucional</div>
          <div className="grid gap-2 text-sm text-zinc-400">
            <Link href="/sobre">Sobre</Link>
            <Link href="/feedbacks">Feedbacks</Link>
            <Link href="/contato">Contato</Link>
            <Link href="/admin/login">Admin</Link>
          </div>
        </div>
      </div>
      <div className="container-shell mt-8 border-t border-white/5 pt-6 text-xs uppercase tracking-[0.18em] text-zinc-500">
        © {year} Bolsonier Studios. Sistema autoral em expansão.
      </div>
    </footer>
  );
}
