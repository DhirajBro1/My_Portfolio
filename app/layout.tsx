import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://dhirojpandit.com.np"),
  title: {
    default: "Dhiraj Pandit | Full-Stack Developer",
    template: "%s | Dhiraj Pandit",
  },
  description:
    "Dhiraj Pandit's portfolio - a full-stack developer from Urlabari, Nepal building web apps with Next.js, React, TypeScript, Node.js, and MongoDB.",
  authors: [{ name: "Dhiraj Pandit" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dhiraj Pandit | Full-Stack Developer",
    description:
      "Dhiraj Pandit's portfolio - a full-stack developer from Urlabari, Nepal building web apps with Next.js, React, TypeScript, Node.js, and MongoDB.",
    type: "website",
    url: "/",
    siteName: "Dhiraj Pandit",
    images: [
      {
        url: "/Dhiraj.jpeg",
        width: 1200,
        height: 1200,
        alt: "Portrait of Dhiraj Pandit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhiraj Pandit | Full-Stack Developer",
    description:
      "Dhiraj Pandit's portfolio - a full-stack developer from Urlabari, Nepal building web apps with Next.js, React, TypeScript, Node.js, and MongoDB.",
    images: ["/Dhiraj.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#2563eb" />
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <a
          href="#main-content"
          className="absolute left-4 top-4 -translate-y-16 rounded-full border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm text-[var(--foreground)] shadow-sm transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}