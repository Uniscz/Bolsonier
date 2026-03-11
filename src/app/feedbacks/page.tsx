import { MessageSquareQuote } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { buildMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Feedbacks",
  pathname: "/feedbacks"
});

export default async function FeedbacksPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: [{ featured: "desc" }, { sortOrder: "asc" }]
  });

  return (
    <>
      <PageHero
        eyebrow="Feedbacks"
        title="Prova social com refinamento e leitura qualitativa."
        body="A validação aqui não depende de números gritando. Ela aparece como clareza, estrutura, transformação e percepção de valor."
      />
      <section className="section-space">
        <div className="container-shell grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.id} className="panel p-6">
              <MessageSquareQuote className="h-5 w-5 text-subtle" />
              <p className="mt-5 text-base leading-7 text-zinc-200">“{testimonial.quote}”</p>
              <div className="mt-6 text-sm text-muted">
                {testimonial.name}
                {testimonial.role ? ` · ${testimonial.role}` : ""}
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.18em] text-subtle">
                {testimonial.sourceLabel || testimonial.category}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
