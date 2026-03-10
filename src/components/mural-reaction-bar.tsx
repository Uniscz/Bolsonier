"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const emojis = ["🔥", "👑", "🕯️", "⚖️"] as const;

export function MuralReactionBar({
  postId,
  counts,
  canReact
}: {
  postId: string;
  counts: Record<string, number>;
  canReact: boolean;
}) {
  const [loadingEmoji, setLoadingEmoji] = useState<string | null>(null);
  const router = useRouter();

  async function react(emoji: string) {
    if (!canReact) return;
    setLoadingEmoji(emoji);
    await fetch("/api/mural/reactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ postId, emoji })
    });
    setLoadingEmoji(null);
    router.refresh();
  }

  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {emojis.map((emoji) => (
        <button
          key={emoji}
          type="button"
          onClick={() => react(emoji)}
          disabled={!canReact || loadingEmoji === emoji}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-sm text-zinc-200 transition hover:border-white/30 hover:bg-white/5 disabled:opacity-50"
        >
          <span>{emoji}</span>
          <span>{counts[emoji] || 0}</span>
        </button>
      ))}
    </div>
  );
}
