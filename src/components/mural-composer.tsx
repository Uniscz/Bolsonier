"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function MuralComposer({ authorName }: { authorName: string }) {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [kind, setKind] = useState("THEORY");
  const [error, setError] = useState("");
  const router = useRouter();

  async function submit() {
    const response = await fetch("/api/mural/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, body, kind })
    });
    const result = await response.json();

    if (!response.ok) {
      setError(result.error || "Não foi possível publicar.");
      return;
    }

    setTitle("");
    setBody("");
    setKind("THEORY");
    setError("");
    router.refresh();
  }

  return (
    <div className="panel p-6">
      <div className="kicker">Publicar no salão</div>
      <h3 className="mt-3 font-display text-2xl font-semibold">Falando como {authorName}</h3>
      <div className="mt-5 grid gap-4">
        <input
          className="input-base"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Título opcional"
        />
        <select className="input-base" value={kind} onChange={(event) => setKind(event.target.value)}>
          <option value="THEORY">Teoria</option>
          <option value="COMMENT">Comentário</option>
          <option value="UPDATE">Atualização</option>
        </select>
        <textarea
          className="input-base min-h-32"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Qual leitura você faria dessa cena, desse personagem ou desse ato?"
        />
        <button type="button" className="btn-primary w-full sm:w-fit" onClick={submit}>
          Publicar
        </button>
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
      </div>
    </div>
  );
}
