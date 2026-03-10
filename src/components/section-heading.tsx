type SectionHeadingProps = {
  eyebrow?: string | null;
  title: string;
  body?: string | null;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left"
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <div className="kicker">{eyebrow}</div> : null}
      <h2 className="headline-md mt-4">{title}</h2>
      {body ? <p className="body-lg mt-5 text-zinc-300">{body}</p> : null}
    </div>
  );
}
