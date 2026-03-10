import { redirect } from "next/navigation";
import { createAdminSession, getAdminSession, verifyAdminPassword } from "@/lib/auth";

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) redirect("/admin");

  async function login(formData: FormData) {
    "use server";

    const password = String(formData.get("password") || "");
    const isValid = await verifyAdminPassword(password);

    if (!isValid) {
      redirect("/admin/login");
    }

    await createAdminSession(process.env.ADMIN_EMAIL || "admin");
    redirect("/admin");
  }

  return (
    <section className="section-space">
      <div className="container-shell flex justify-center">
        <form action={login} className="panel w-full max-w-md p-8">
          <div className="kicker">Admin</div>
          <h1 className="mt-4 font-display text-4xl font-semibold">Entrar no painel</h1>
          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Acesso restrito à edição de conteúdo, mural e dados institucionais.
          </p>

          <div className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm">
              <span>Senha</span>
              <input
                name="password"
                type="password"
                className="input-base"
                placeholder="Sua senha"
                required
              />
            </label>
          </div>

          <div className="mt-6">
            <button type="submit" className="btn-primary w-full">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
