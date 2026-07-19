import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://altechweb.com.br"),
  title: {
    default: "AL Tech | Estúdio de Desenvolvimento Digital",
    template: "%s | AL Tech",
  },
  description:
    "Site oficial da AL Tech: desenvolvimento de sistemas, websites premium, plataformas web, ERPs, dashboards, portais governamentais, automações, APIs e infraestrutura cloud.",
  applicationName: "AL Tech",
  keywords: [
    "AL Tech",
    "desenvolvimento web",
    "sistemas empresariais",
    "sistemas governamentais",
    "dashboards",
    "automações",
    "cloud",
    "infraestrutura",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "AL Tech" }],
  creator: "AL Tech",
  publisher: "AL Tech",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "AL Tech",
    title: "AL Tech | Estúdio de Desenvolvimento Digital",
    description:
      "Desenvolvimento premium de sistemas, websites, plataformas web, ERPs, dashboards e portais digitais.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "AL Tech estúdio premium de desenvolvimento digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AL Tech | Estúdio de Desenvolvimento Digital",
    description:
      "Sistemas, websites e produtos digitais premium para negócios que precisam crescer.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
