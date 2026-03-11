"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type PollCardProps = {
  poll: {
    id: string;
    title: string;
    description: string | null;
    options: { id: string; label: string; votes: number }[];
  };
  canVote: boolean;
};

export function PollCard({ poll, canVote }: PollCardProps) {
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function vote(optionId: string) {
    const response = await fetch("/api/mural/polls/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ pollId: poll.id, optionId })
    });
    const result = await response.json();

    if (!response.ok) {
      setMessage(result.error || "Não foi possível registrar seu voto.");
      return;
    }

    setMessage("Voto registrado.");
    router.refresh();
  }

  return (
    <div className="panel p-6">
      <div className="kicker">Enquete da semana</div>
      <h3 className="mt-3 font-display text-2xl font-semibold">{poll.title}</h3>
      {poll.description ? <p className="mt-3 text-sm text-muted">{poll.description}</p> : null}
      <div className="mt-5 grid gap-3">
        {poll.options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => vote(option.id)}
            disabled={!canVote}
            className="flex items-center justify-between rounded-sm border border-border px-4 py-3 text-left transition hover:border-white/30 hover:bg-panel disabled:opacity-50"
          >
            <span>{option.label}</span>
            <span className="text-sm text-muted">{option.votes} votos</span>
          </button>
        ))}
      </div>
      {!canVote ? (
        <p className="mt-4 text-sm text-subtle">Entre com seu passe da corte para votar.</p>
      ) : null}
      {message ? <p className="mt-4 text-sm text-foreground/80">{message}</p> : null}
    </div>
  );
}
