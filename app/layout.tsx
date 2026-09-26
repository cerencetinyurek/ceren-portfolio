import type { Metadata } from "next";
import "@fontsource/pixelify-sans/400.css";
import "@fontsource-variable/fredoka";
import "./globals.css";
import FlowerCursor from "@/components/FlowerCursor";

export const metadata: Metadata = {
  metadataBase: new URL("https://cerencetinyurek.com"),
  title: "Ceren's Portfolio",
  description: "Biomedical engineer / researcher / maker",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon.ico" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon_io/favicon.ico",
    apple: [{ url: "/favicon_io/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/favicon_io/site.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Ceren's Portfolio",
    title: "Ceren's Portfolio",
    description: "Biomedical engineer / researcher / maker",
  },
  twitter: {
    card: "summary",
    title: "Ceren's Portfolio",
    description: "Biomedical engineer / researcher / maker",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body suppressHydrationWarning>{children}<FlowerCursor /></body></html>;
}
