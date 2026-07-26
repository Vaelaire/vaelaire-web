import type { Metadata } from "next";
import { EB_Garamond, Inter } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vaelaire | Curated Hospitality",
    template: "%s | Vaelaire",
  },
  description: "Where heritage meets horizon. Discover extraordinary stays in Lagos, Portugal.",
  keywords: ["luxury hotel", "Lagos Portugal", "boutique hotel", "Algarve accommodation"],
  authors: [{ name: "Vaelaire" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stayatvaelaire.com",
    siteName: "Vaelaire",
    title: "Vaelaire | Curated Hospitality",
    description: "Where heritage meets horizon. Discover extraordinary stays in Lagos, Portugal.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaelaire | Curated Hospitality",
    description: "Where heritage meets horizon. Discover extraordinary stays in Lagos, Portugal.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ebGaramond.variable} ${inter.variable}`}>
      <body className="font-functional">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
