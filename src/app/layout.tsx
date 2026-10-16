import type { Metadata } from "next";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-700.css";
import "@fontsource/manrope/latin-800.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "./globals.css";
import { siteConfig } from "@/lib/content";

const title = "Jornada do Zero à Fluência | Aprenda Inglês com Teacher Murilo";
const description =
  "Conheça a Jornada do Zero à Fluência e aprenda inglês com aulas organizadas, conteúdos práticos e acompanhamento durante sua evolução.";
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl ?? "http://localhost:3000"),
  title,
  description,
  ...(siteConfig.siteUrl
    ? {
        metadataBase: new URL(siteConfig.siteUrl),
        alternates: { canonical: "/" },
      }
    : {}),
  openGraph: {
    title,
    description,
    type: "website",
    locale: "pt_BR",
    siteName: siteConfig.courseName,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: {
    index: Boolean(siteConfig.checkoutUrl && siteConfig.priceConfirmed),
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
