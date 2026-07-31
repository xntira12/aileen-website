import "./globals.css";
import Providers from "@/components/Providers";

const SITE_URL = "https://www.aileensolutions.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aileen Solutions | Digital Process & Automation",
    template: "%s | Aileen Solutions",
  },
  description:
    "Aileen Solutions — บริษัทที่ปรึกษาด้าน Digital Transformation ครบวงจร ให้บริการ Process Automation, AI Solutions, Software Development และ Quality Management สำหรับองค์กรไทยและนานาชาติ",
  keywords: [
    "Digital Transformation",
    "Process Automation",
    "AI Solutions",
    "Software Development",
    "Quality Management",
    "Aileen Solutions",
    "บริษัทซอฟต์แวร์",
    "ระบบอัตโนมัติ",
    "ที่ปรึกษา IT",
    "RPA",
  ],
  authors: [{ name: "Aileen Solutions", url: SITE_URL }],
  creator: "Aileen Solutions",
  publisher: "Aileen Solutions",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    alternateLocale: "en_US",
    url: SITE_URL,
    siteName: "Aileen Solutions",
    title: "Aileen Solutions | Digital Process & Automation",
    description:
      "ยกระดับการทำงานทั้งองค์กรด้วย Digital Process & Automation พร้อม AI และ Software Solutions ที่เชื่อถือได้",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aileen Solutions — Simplify Work, Amplify Value",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aileen Solutions | Digital Process & Automation",
    description:
      "ยกระดับการทำงานทั้งองค์กรด้วย Digital Process & Automation พร้อม AI และ Software Solutions",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="32x32" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
