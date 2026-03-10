import Link from "next/link";
import { CtaBanner } from "@/components/cta-banner";
import { PageHero } from "@/components/page-hero";
import { buildMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Mentoria",
  pathname: "/mentoria"
});

export default async function MentoriaPage() {
  const mentorship = await prisma.mentorshipOffer.findFirst({
    where: { featured: true }
  });

  if (!mentorship) {
    return null;
  }

  const deliverables = Array.isArray(mentorship.deliverables)
    ? (mentorship.deliverables as string[])
    : [];
  const differentiators = Array.isArray(mentorship.differentiators)
    ? (mentorship.differentiators as string[])
    : [];

  return (
    <>
      <PageHero eyebrow="Mentoria" title={mentorship.title} body={mentorship.summary}>
        <div className="space-y-4 text-sm text-zinc-300">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">Formato</div>
            <p className="mt-2">{mentorship.format}</p>
          </div>
          <Link href={mentorship.ctaHref} className="btn-primary">
            {mentorship.ctaLabel}
          </Link>
        </div>
      </PageHero>

      <section className="section-space">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="kicker">Para quem é</div>
            <h2 className="headline-md mt-4">Criadores que já têm potência, mas ainda não têm sistema.</h2>
          </div>
          <p className="body-lg">{mentorship.audience}</p>
        </div>
      </section>

      <section className="section-space border-t border-white/5">
        <div className="container-shell grid gap-5 lg:grid-cols-2">
          <div className="panel p-6">
            <div className="kicker">O que você recebe</div>
            <ul className="mt-5 grid gap-4 text-sm text-zinc-300">
              {deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="panel p-6">
            <div className="kicker">Diferenciais</div>
            <ul className="mt-5 grid gap-4 text-sm text-zinc-300">
              {differentiators.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid gap-5 lg:grid-cols-3">
          <div className="panel p-6">
            <div className="kicker">Diagnóstico</div>
            <h3 className="mt-4 font-display text-2xl font-semibold">Ler o problema certo</h3>
            <p className="mt-4 text-sm leading-6 text-zinc-400">
              Antes de falar em conteúdo, o trabalho é identificar o desalinhamento entre presença, oferta e identidade.
            </p>
          </div>
          <div className="panel p-6">
            <div className="kicker">Direção</div>
            <h3 className="mt-4 font-display text-2xl font-semibold">Definir o eixo</h3>
            <p className="mt-4 text-sm leading-6 text-zinc-400">
              O resultado precisa ser claro o suficiente para orientar visual, narrativa, produto e comunicação.
            </p>
          </div>
          <div className="panel p-6">
            <div className="kicker">Execução</div>
            <h3 className="mt-4 font-display text-2xl font-semibold">Agir com prioridade</h3>
            <p className="mt-4 text-sm leading-6 text-zinc-400">
              Nada de documento bonito sem consequência. O plano sai ordenado para entrar em prática.
            </p>
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="Pronto para alinhar presença e produto"
        title="A mentoria foi desenhada para quem precisa de uma leitura crítica útil, não de mais ruído."
        body="A próxima etapa pode ser uma conversa inicial com contexto, objetivo e momento atual do projeto."
        primaryLabel={mentorship.ctaLabel}
        primaryHref={mentorship.ctaHref}
        secondaryLabel="Falar com a produtora"
        secondaryHref="/contato"
      />
    </>
  );
}
