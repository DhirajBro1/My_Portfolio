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
  verification: {
    other: {
      "trustburn-site-verification": ["8f3624842143cdca9bac04f34297cf3c"],
    },
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
        {/* 🌟 Ahrefs Analytics */}
        <Script
          id="ahrefs-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var ahrefs_analytics_script = document.createElement('script');
              ahrefs_analytics_script.async = true;
              ahrefs_analytics_script.src = 'https://analytics.ahrefs.com/analytics.js';
              ahrefs_analytics_script.setAttribute('data-key', '${process.env.NEXT_PUBLIC_AHREFS_DATA_KEY || process.env.AHREFS_DATA_KEY}');
              document.getElementsByTagName('head')[0].appendChild(ahrefs_analytics_script);
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