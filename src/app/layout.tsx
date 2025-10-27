import type { Metadata } from "next";
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
  title: "GD Scent Journey - 지드래곤을 향한 나의 감정",
  description: "G-DRAGON에 대한 당신의 감정을 분석하고, 그에 맞는 향을 추천해드립니다. 쿠데타부터 무제까지, GD의 음악 세계를 향으로 경험하세요.",
  keywords: ["G-DRAGON", "지드래곤", "권지용", "향수", "감정 분석", "AI", "음악", "BIGBANG"],
  authors: [{ name: "GD Scent Journey Team" }],
  openGraph: {
    title: "GD Scent Journey - 지드래곤을 향한 나의 감정",
    description: "G-DRAGON에 대한 당신의 감정을 향으로 표현합니다",
    url: "https://gd-scent.com",
    siteName: "GD Scent Journey",
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: "#D4AF37",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="gd-background" />
        {children}
      </body>
    </html>
  );
}
