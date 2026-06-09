import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.bolsonier.art"
  ),
  title: {
    default: "BOLSONIER STORE — Boutique Streetwear | São Paulo",
    template: "%s — BOLSONIER STORE",
  },
  description:
    "Boutique Streetwear de raiz brasileira e atitude global. Luxury Counterfeit. Ironia Elegante. Vandalismo Refinado. Feito no Brasil. EST. 24.",
  keywords: ["Bolsonier Store", "streetwear brasileiro", "boutique streetwear", "moda urbana São Paulo"],
  authors: [{ name: "Bolsonier Store" }],
  creator: "Bolsonier Store",
  publisher: "Bolsonier Store",
  openGraph: {
    title: "BOLSONIER STORE — Boutique Streetwear",
    description: "Boutique Streetwear de raiz brasileira e atitude global.",
    url: "/",
    siteName: "Bolsonier Store",
    locale: "pt_BR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
      </head>
      <body className={`${fontSans.variable} font-sans bg-black text-white`}>
        <div className="min-h-screen flex flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
