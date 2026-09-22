import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Sora, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-sora",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "MapsAI",
  url: "https://mapsai.site",
  description:
    "An AI-powered place discovery platform that helps users find and explore places using natural language.",
  applicationCategory: "TravelApplication",
  operatingSystem: "Web",
  author: {
    "@type": "Person",
    name: "Kylan1940",
    url: "https://github.com/Kylan1940",
  },
};

export const metadata: Metadata = {
  title: "MapsAI",
  description: "An AI-powered place discovery platform that helps users find and explore any locations using natural language.",
  keywords: [
    "MapsAI",
    "aplikasi web",
    "kecerdasan buatan",
    "bahasa natural",
    "pencarian tempat",
    "lokasi",
    "ulasan",
    "rating",
    "jarak",
    "harga",
  ],
  authors: [{ name: "Kylan1940", url: "github.com/Kylan1940" }],
  creator: "Kylan1940",
  alternates: {
    canonical: "https://mapsai.site",
  },
  openGraph: {
    type: "website",
    url: "https://mapsai.site",
    siteName: "MapsAI",
    title: "MapsAI - AI-Powered Place Discovery",
    description:
      "Discover places using natural language with AI-powered search and interactive maps.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MapsAI - AI-Powered Place Discovery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MapsAI - AI-Powered Place Discovery",
    description:
      "Discover places using natural language with AI-powered search and interactive maps.",
    images: ["/og-image.png"],
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        {children}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WFFYCKYK3P"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag() {
              window.dataLayer.push(arguments);
            }

            window.gtag = gtag;

            gtag('js', new Date());
            gtag('config', 'G-WFFYCKYK3P');
          `}
        </Script>
      </body>
    </html>
  );
}