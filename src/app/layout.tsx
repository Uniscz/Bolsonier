import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildOrganizationSchema, buildTVSeriesSchema } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/utils";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"]
});
const fontDisplay = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "A Bastilha de Bolsonier | Série dramática brasileira | Bolsonier Studios",
    template: "%s — A Bastilha de Bolsonier"
  },
  description:
    "A Bastilha de Bolsonier é uma série dramática brasileira criada por André Luiz de Almeida. Conheça personagens, atos, cronologia e o universo oficial da obra.",
  keywords: [
    "A Bastilha de Bolsonier",
    "Bastilha de Bolsonier",
    "série dramática brasileira",
    "websérie brasileira",
    "André Luiz de Almeida",
    "Bolsonier Studios",
    "drama político",
    "série aristocrática"
  ],
  authors: [{ name: "André Luiz de Almeida" }],
  creator: "André Luiz de Almeida",
  publisher: "Bolsonier Studios",
  openGraph: {
    title: "A Bastilha de Bolsonier | Série dramática brasileira | Bolsonier Studios",
    description:
      "A Bastilha de Bolsonier é uma série dramática brasileira criada por André Luiz de Almeida. Conheça personagens, atos, cronologia e o universo oficial da obra.",
    url: absoluteUrl("/"),
    siteName: "Bolsonier Studios",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: absoluteUrl("/og-default.png"),
        width: 1200,
        height: 630,
        alt: "A Bastilha de Bolsonier — Poster oficial"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "A Bastilha de Bolsonier | Série dramática brasileira | Bolsonier Studios",
    description:
      "A Bastilha de Bolsonier é uma série dramática brasileira criada por André Luiz de Almeida. Conheça personagens, atos, cronologia e o universo oficial da obra.",
    images: [absoluteUrl("/og-default.png")]
  },
  alternates: {
    canonical: absoluteUrl("/")
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = buildOrganizationSchema();
  const tvSchema = buildTVSeriesSchema();

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontDisplay.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(tvSchema) }}
        />
        <div className="min-h-screen">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
