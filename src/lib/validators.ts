import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Informe seu nome."),
  email: z.string().email("Informe um e-mail válido."),
  company: z.string().optional(),
  type: z.enum(["PARTNERSHIP", "CLIENT", "PRESS", "GENERAL"]).default("GENERAL"),
  message: z.string().min(20, "Escreva uma mensagem com mais contexto.")
});

export const wallPostSchema = z.object({
  title: z.string().max(80).optional(),
  body: z.string().min(12).max(700),
  kind: z.enum(["THEORY", "COMMENT", "UPDATE"]).default("COMMENT")
});

export const wallReactionSchema = z.object({
  postId: z.string().min(1),
  emoji: z.enum(["🔥", "👑", "🕯️", "⚖️"])
});

export const wallVoteSchema = z.object({
  pollId: z.string().min(1),
  optionId: z.string().min(1)
});

export const adminSectionSchema = z.object({
  page: z.string().min(1),
  key: z.string().min(1),
  eyebrow: z.string().optional(),
  title: z.string().min(2),
  body: z.string().min(10),
  ctaLabel: z.string().optional(),
  ctaHref: z.string().optional(),
  order: z.coerce.number().int().default(0)
});
