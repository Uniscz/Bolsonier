type AdminFormProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  actionLabel?: string;
};

export function AdminForm({ title, description, children, actionLabel = "Salvar" }: AdminFormProps) {
  return (
    <div className="panel p-6">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold">{title}</h2>
        {description ? <p className="mt-2 text-sm text-zinc-400">{description}</p> : null}
      </div>
      <div className="grid gap-4">{children}</div>
      <div className="mt-6">
        <button type="submit" className="btn-primary">
          {actionLabel}
        </button>
      </div>
    </div>
  );
}
