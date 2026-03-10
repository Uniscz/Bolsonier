import Link from "next/link";
import { ArrowRight, Sparkles, Theater, GraduationCap, MessageSquareQuote } from "lucide-react";
import { CtaBanner } from "@/components/cta-banner";
import { FeatureCard, StatCard } from "@/components/cards";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/metadata";
import { getSection } from "@/lib/queries";
import { prisma } from "@/lib/prisma";

export const metadata = buildMetadata({
  title: "Home",
  pathname: "/"
});

export default async function HomePage() {
  const hero = await getSection("home", "hero");
  const manifesto = await getSection("home", "manifesto");
  const mentoria = await getSection("home", "mentoria");
  const coursesSection = await getSection("home", "courses");

  const [projects, courses, testimonials, episodes] = await Promise.all([
    prisma.project.findMany({
      where: { featured: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      take: 3
    }),
    prisma.course.findMany({
      where: { featured: true },
      take: 2
    }),
    prisma.testimonial.findMany({
      where: { featured: true },
      orderBy: { sortOrder: "asc" },
      take: 3
    }),
    prisma.episode.findMany({
      where: { featured: true },
      orderBy: { publishedAt: "desc" },
      take: 2
    })
  ]);

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-studio-grid bg-[length:32px_32px] opacity-[0.07]" />
        <div className="container-shell relative section-space grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <Reveal>
            <div className="max-w-4xl">
              <div className="kicker">{hero?.eyebrow}</div>
              <h1 className="display-title mt-5 max-w-4xl">{hero?.title}</h1>
              <p className="body-lg mt-6 max-w-2xl text-zinc-300">{hero?.body}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={hero?.ctaHref || "/bastilha"} className="btn-primary">
                  {hero?.ctaLabel || "Explorar"}
                </Link>
                <Link href="/sobre" className="btn-secondary">
                  Ler posicionamento
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="panel overflow-hidden p-6 md:p-8">
              <div className="kicker">Direção de presença</div>
              <div className="mt-5 grid gap-5">
                <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex items-start gap-4">
                    <Sparkles className="mt-1 h-5 w-5 text-amber-400" />
                    <div>
                      <div className="text-sm font-semibold">Assinatura visual</div>
                      <p className="mt-2 text-sm leading-6 text-zinc-400">
                        Linguagem forte, atmosfera e direção de projeto com consistência.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex items-start gap-4">
                    <Theater className="mt-1 h-5 w-5 text-violet-400" />
                    <div>
                      <div className="text-sm font-semibold">Universos narrativos</div>
                      <p className="mt-2 text-sm leading-6 text-zinc-400">
                        Projetos que funcionam como obra, comunidade e plataforma de expansão.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex items-start gap-4">
                    <GraduationCap className="mt-1 h-5 w-5 text-emerald-400" />
                    <div>
                      <div className="text-sm font-semibold">Produtos de monetização</div>
                      <p className="mt-2 text-sm leading-6 text-zinc-400">
                        Mentoria, cursos e formatos pensados para crescer sem perder identidade.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid gap-6 lg:grid-cols-3">
          <StatCard
            label="Posicionamento"
            value="Marca"
            description="A produtora organiza visão, estética e produto sob o mesmo eixo."
          />
          <StatCard
            label="Bastilha"
            value="Universo"
            description="A ala premium do site opera como obra, arquivo, comunidade e ritmo de lançamento."
          />
          <StatCard
            label="Monetização"
            value="Ecossistema"
            description="Mentoria, cursos e páginas comerciais integradas sem diluir a assinatura."
          />
        </div>
      </section>

      <section className="section-space border-t border-white/5">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <SectionHeading
              eyebrow={manifesto?.eyebrow}
              title={manifesto?.title || ""}
              body={manifesto?.body || ""}
            />
          </Reveal>
          <Reveal className="grid gap-5">
            <FeatureCard
              kicker="Produtora"
              title="Institucional sem ser frio"
              body="Estrutura séria, linguagem clara e presença visual suficiente para não parecer template."
            />
            <FeatureCard
              kicker="Criador"
              title="Visão autoral sem virar abstração"
              body="Tudo aqui aponta para obra, produto e continuidade, não para pose vazia."
            />
          </Reveal>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Núcleos principais"
            title="Três frentes que se alimentam entre si"
            body="Bolsonier Studios não é só um site institucional. É a base de uma marca autoral que trabalha narrativa, formação e comunidade."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <FeatureCard
              kicker="Autoridade criativa"
              title="Direção estética e linguagem"
              body="Projetos, identidade visual, universo e clareza de marca."
              href="/sobre"
            />
            <FeatureCard
              kicker="Monetização"
              title="Mentoria e cursos"
              body="Produtos educacionais com presença adulta e proposta séria."
              href="/mentoria"
            />
            <FeatureCard
              kicker="Comunidade"
              title="Bastilha de Bolsonier"
              body="Ala premium da marca com atos, personagens, cronologia e um mural vivo."
              href="/bastilha"
            />
          </div>
        </div>
      </section>

      <section className="section-space border-t border-white/5">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Bastilha em destaque"
            title="O universo interno que move tensão, leitura e retorno"
            body="A Bastilha funciona como obra central e como motor de retenção. Episódios, personagens e o Salão dos Rumores formam um circuito vivo."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <FeatureCard
              kicker="Bastilha de Bolsonier"
              title="Entrar na ala premium"
              body="Conheça a obra, leia a cronologia, navegue pelos personagens e acompanhe o que o público está teorizando agora."
              href="/bastilha"
              className="min-h-[260px]"
            />
            <div className="grid gap-5">
              {episodes.map((episode) => (
                <FeatureCard
                  key={episode.id}
                  kicker={episode.actLabel || episode.series}
                  title={episode.title}
                  body={episode.summary}
                  href="/episodios"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow={mentoria?.eyebrow}
                title={mentoria?.title || ""}
                body={mentoria?.body || ""}
              />
              <div className="mt-8">
                <Link href={mentoria?.ctaHref || "/mentoria"} className="btn-primary">
                  {mentoria?.ctaLabel || "Ver mentoria"}
                </Link>
              </div>
            </div>
            <div className="panel p-6">
              <div className="kicker">Estrutura da sessão</div>
              <ul className="mt-4 grid gap-4 text-sm text-zinc-300">
                <li>Leitura de posicionamento e linguagem</li>
                <li>Arquitetura de presença, oferta e ecossistema</li>
                <li>Direção prática com prioridade de execução</li>
                <li>Sem promessa vazia, com crítica útil de verdade</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space border-t border-white/5">
        <div className="container-shell">
          <SectionHeading
            eyebrow={coursesSection?.eyebrow}
            title={coursesSection?.title || ""}
            body={coursesSection?.body || ""}
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {courses.map((course) => (
              <FeatureCard
                key={course.id}
                kicker={course.status}
                title={course.title}
                body={course.excerpt}
                href={`/cursos/${course.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Projetos"
            title="Núcleos em operação, pesquisa e próximos lançamentos"
            body="O site já nasce preparado para conviver com frentes diferentes sem perder coerência institucional."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <FeatureCard
                key={project.id}
                kicker={project.launchLabel || project.status}
                title={project.title}
                body={project.summary}
                href={`/projetos/${project.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space border-t border-white/5">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Feedbacks"
            title="Prova social com leitura qualitativa, não com exibicionismo"
            body="Validação aqui entra como percepção de transformação, clareza e resultado percebido."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="panel p-6">
                <MessageSquareQuote className="h-5 w-5 text-zinc-500" />
                <p className="mt-5 text-base leading-7 text-zinc-200">“{testimonial.quote}”</p>
                <div className="mt-6 text-sm text-zinc-400">
                  {testimonial.name}
                  {testimonial.role ? ` · ${testimonial.role}` : ""}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/feedbacks" className="inline-flex items-center gap-2 text-sm font-medium text-white">
              Ver página completa <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="Próximo passo"
        title="Entre na Bastilha, conheça a mentoria ou abra uma conversa profissional."
        body="O site já foi pensado como ecossistema. Agora ele precisa operar como vitrine, núcleo narrativo e ponto de contato qualificado."
        primaryLabel="Entrar na Bastilha"
        primaryHref="/bastilha"
        secondaryLabel="Abrir contato"
        secondaryHref="/contato"
      />
    </>
  );
}
