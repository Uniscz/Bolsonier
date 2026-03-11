import Link from "next/link";

export function CtaBanner({
  eyebrow,
  title,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref
}: {
  eyebrow: string;
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-white/[0.04] via-white/[0.03] to-white/[0.01] p-8 shadow-glow md:p-12">
          <div className="kicker">{eyebrow}</div>
          <h2 className="headline-md mt-4 max-w-3xl">{title}</h2>
          <p className="body-lg mt-5 max-w-2xl">{body}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={primaryHref} className="btn-primary">
              {primaryLabel}
            </Link>
            {secondaryHref && secondaryLabel ? (
              <Link href={secondaryHref} className="btn-secondary">
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
