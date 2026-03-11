import { SectionHeading } from "@/components/section-heading";

export function PageHero({
  eyebrow,
  title,
  body,
  children
}: {
  eyebrow?: string;
  title: string;
  body: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="section-space border-b" style={{ borderColor: "rgb(var(--border))" }}>
      <div className="container-shell grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
        <SectionHeading eyebrow={eyebrow} title={title} body={body} />
        {children ? <div className="panel p-6">{children}</div> : null}
      </div>
    </section>
  );
}
