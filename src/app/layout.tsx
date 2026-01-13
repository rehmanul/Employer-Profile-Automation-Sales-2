import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "ProfilPro - Automatische Unternehmensprofile & Stellenanzeigen",
  description: "Erstellen Sie professionelle Unternehmensprofile und Stellenanzeigen in Minuten mit KI-gestützter Automatisierung. Perfekt für Arbeitgeber und Recruiter.",
  keywords: ["Stellenanzeigen", "Unternehmensprofile", "Recruiting", "HR", "Automatisierung", "KI"],
  authors: [{ name: "ProfilPro" }],
  openGraph: {
    title: "ProfilPro - Automatische Unternehmensprofile & Stellenanzeigen",
    description: "Erstellen Sie professionelle Unternehmensprofile und Stellenanzeigen in Minuten.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body style={{ fontFamily: 'var(--font-sans)' }}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
