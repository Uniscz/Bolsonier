import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Contato",
  pathname: "/contato"
});

export default function ContatoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Conversa profissional com contexto, clareza e objetivo."
        body="Projetos, mentoria, imprensa, parcerias e novos movimentos da produtora entram por aqui."
      >
        <div className="grid gap-3 text-sm text-muted">
          <p>Cliente</p>
          <p>Parceria</p>
          <p>Imprensa</p>
          <p>Geral</p>
        </div>
      </PageHero>

      <section className="section-space">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div className="panel p-6">
              <div className="kicker">Orientação</div>
              <p className="mt-4 text-sm leading-6 text-foreground/80">
                Quanto mais claro for o contexto, mais útil será a resposta. Diga
                objetivo, estágio do projeto e o tipo de apoio desejado.
              </p>
            </div>
            <div className="panel p-6">
              <div className="kicker">Canais</div>
              <div className="mt-4 grid gap-3 text-sm text-foreground/80">
                <a href={process.env.NEXT_PUBLIC_INSTAGRAM_URL} target="_blank">
                  Instagram
                </a>
                <a href={process.env.NEXT_PUBLIC_TIKTOK_URL} target="_blank">
                  TikTok
                </a>
                <a href={process.env.NEXT_PUBLIC_YOUTUBE_URL} target="_blank">
                  YouTube
                </a>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
