import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";

const SITE_NAME = "Bolsonier Studios";
const OBRA_TITLE = "A Bastilha de Bolsonier";
const OBRA_CREATOR = "André Luiz de Almeida";
const OBRA_YEAR = "2026";
const IMDB_URL = "https://www.imdb.com/title/tt40604167/";
const POSTER_PATH = "/og-default.png";

const defaultDescription =
  "A Bastilha de Bolsonier é uma série dramática brasileira criada por André Luiz de Almeida. Conheça personagens, atos, cronologia e o universo oficial da obra.";

export function buildMetadata({
  title,
  description = defaultDescription,
  pathname = "/",
  image = POSTER_PATH
}: {
  title: string;
  description?: string;
  pathname?: string;
  image?: string;
}): Metadata {
  const fullTitle = `${title} | ${OBRA_TITLE}`;
  const url = absoluteUrl(pathname);
  const imageUrl = absoluteUrl(image);

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "pt_BR",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${OBRA_TITLE} — Poster oficial`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl]
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
    name: SITE_NAME,
    url: absoluteUrl("/"),
    logo: absoluteUrl(POSTER_PATH),
    sameAs: [
      "https://www.instagram.com/euinelegivel/",
      "https://www.tiktok.com/@euinelegivel",
      "https://www.facebook.com/profile.php?id=61573541386906"
    ],
    description: defaultDescription
  };
}

export function buildTVSeriesSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    name: OBRA_TITLE,
    alternateName: "Bastilha de Bolsonier",
    description:
      "Série dramática brasileira de intriga política e aristocrática, ambientada em uma corte ficcional onde poder, herança, desejo e ruína se entrelaçam.",
    url: absoluteUrl("/obra/a-bastilha-de-bolsonier"),
    image: absoluteUrl(POSTER_PATH),
    datePublished: OBRA_YEAR,
    inLanguage: "pt-BR",
    countryOfOrigin: {
      "@type": "Country",
      name: "Brazil"
    },
    genre: ["Drama", "Political Drama", "Aristocratic Drama"],
    creator: {
      "@type": "Person",
      name: OBRA_CREATOR
    },
    productionCompany: {
      "@type": "Organization",
      name: SITE_NAME,
      url: absoluteUrl("/")
    },
    sameAs: [
      IMDB_URL,
      "https://www.instagram.com/euinelegivel/",
      "https://www.tiktok.com/@euinelegivel",
      "https://www.facebook.com/profile.php?id=61573541386906"
    ]
  };
}

export { OBRA_TITLE, OBRA_CREATOR, OBRA_YEAR, IMDB_URL, SITE_NAME, POSTER_PATH };
