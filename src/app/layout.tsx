import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildOrganizationSchema } from "@/lib/metadata";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const fontDisplay = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Bolsonier Studios",
  description:
    "Produtora criativa autoral para universos narrativos, direção visual, IA aplicada e produtos com identidade real."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = buildOrganizationSchema();

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontDisplay.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
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
