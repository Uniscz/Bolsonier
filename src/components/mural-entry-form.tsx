"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function MuralEntryForm() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function submit() {
    setError("");
    const response = await fetch("/api/mural/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error || "Não foi possível criar seu passe da corte.");
      return;
    }

    router.push("/bastilha/mural");
    router.refresh();
  }

  return (
    <div className="panel max-w-xl p-6 md:p-8">
      <div className="kicker">Passe da corte</div>
      <h2 className="mt-4 font-display text-3xl font-semibold">Escolha seu nome de entrada</h2>
      <p className="mt-4 text-sm leading-6 text-muted">
        Leitura pública é livre. Para publicar rumores, teorias e votar, você entra com um nome de exibição.
      </p>

      <div className="mt-6 grid gap-4">
        <input
          className="input-base"
          placeholder="Ex.: Observador do Salão"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <button type="button" onClick={submit} className="btn-primary w-full sm:w-fit">
          Entrar no salão
        </button>
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
      </div>
    </div>
  );
}
