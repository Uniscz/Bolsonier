import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";

const defaultDescription =
  "Produtora criativa autoral para séries narrativas, direção visual, imagens realistas, vídeo cinematográfico e educação aplicada.";

export function buildMetadata({
  title,
  description = defaultDescription,
  pathname = "/"
}: {
  title: string;
  description?: string;
  pathname?: string;
}): Metadata {
  const fullTitle = `${title} | Bolsonier Studios`;
  const url = absoluteUrl(pathname);

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "Bolsonier Studios",
      type: "website",
      locale: "pt_BR"
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description
    },
    alternates: {
      canonical: url
    }
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Bolsonier Studios",
    url: absoluteUrl("/"),
    logo: absoluteUrl("/og-default.png"),
    sameAs: [
      process.env.NEXT_PUBLIC_INSTAGRAM_URL,
      process.env.NEXT_PUBLIC_TIKTOK_URL,
      process.env.NEXT_PUBLIC_YOUTUBE_URL
    ].filter(Boolean),
    description: defaultDescription
  };
}
