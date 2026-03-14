import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function parseLines(value: FormDataEntryValue | null): string[] {
  if (!value || typeof value !== "string") return [];
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function parseFaqLines(value: FormDataEntryValue | null) {
  if (!value || typeof value !== "string") return [];
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [q, a] = line.split("::");
      return { q: q?.trim() ?? "", a: a?.trim() ?? "" };
    })
    .filter((item) => item.q && item.a);
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium"
  }).format(new Date(date));
}

export function absoluteUrl(pathname = "/") {
  // Usa a variável de ambiente se definida, senão usa o domínio real de produção
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.bolsonier.art";
  return new URL(pathname, siteUrl).toString();
}
