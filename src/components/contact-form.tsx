"use client";

import { useState } from "react";

type FormState = {
  status: "idle" | "loading" | "success" | "error";
  message?: string;
};

export function ContactForm() {
  const [state, setState] = useState<FormState>({ status: "idle" });

  async function handleSubmit(formData: FormData) {
    setState({ status: "loading" });

    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: { "Content-Type": "application/json" }
    });

    const result = await response.json();

    if (!response.ok) {
      setState({ status: "error", message: result.error || "Não foi possível enviar." });
      return;
    }

    setState({ status: "success", message: "Mensagem enviada com sucesso." });
  }

  return (
    <form
      action={handleSubmit}
      className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span>Nome</span>
          <input name="name" className="input-base" placeholder="Seu nome" required />
        </label>
        <label className="grid gap-2 text-sm">
          <span>E-mail</span>
          <input
            type="email"
            name="email"
            className="input-base"
            placeholder="voce@email.com"
            required
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span>Empresa ou projeto</span>
          <input name="company" className="input-base" placeholder="Opcional" />
        </label>
        <label className="grid gap-2 text-sm">
          <span>Categoria</span>
          <select name="type" className="input-base">
            <option value="CLIENT">Cliente</option>
            <option value="PARTNERSHIP">Parceria</option>
            <option value="PRESS">Imprensa</option>
            <option value="GENERAL">Geral</option>
          </select>
        </label>
      </div>

      <label className="grid gap-2 text-sm">
        <span>Mensagem</span>
        <textarea
          name="message"
          className="input-base min-h-40"
          placeholder="Conte seu contexto, objetivo e o tipo de projeto que deseja construir."
          required
        />
      </label>

      <button type="submit" className="btn-primary w-full sm:w-fit">
        {state.status === "loading" ? "Enviando..." : "Enviar mensagem"}
      </button>

      {state.message ? (
        <p
          className={`text-sm ${state.status === "success" ? "text-green-400" : "text-red-400"}`}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
