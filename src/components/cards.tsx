import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function FeatureCard({
  title,
  body,
  kicker,
  href,
  className
}: {
  title: string;
  body: string;
  kicker?: string;
  href?: string;
  className?: string;
}) {
  const content = (
    <div className={cn("panel h-full p-6 transition hover:border-white/20 hover:bg-white/[0.04]", className)}>
      {kicker ? <div className="kicker">{kicker}</div> : null}
      <h3 className="mt-4 font-display text-2xl font-semibold">{title}</h3>
      <p className="mt-4 text-sm leading-6 text-foreground/80">{body}</p>
      {href ? (
        <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white">
          Explorar <ArrowRight className="h-4 w-4" />
        </div>
      ) : null}
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}

export function StatCard({
  label,
  value,
  description
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="panel p-6">
      <div className="text-xs uppercase tracking-[0.22em] text-subtle">{label}</div>
      <div className="mt-4 font-display text-3xl font-semibold">{value}</div>
      <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
    </div>
  );
}
