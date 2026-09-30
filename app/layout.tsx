import type { Metadata, Viewport } from "next";
import "@fontsource/pixelify-sans/400.css";
import "@fontsource-variable/fredoka";
import "./globals.css";
import FlowerCursor from "@/components/FlowerCursor";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#e2c7eb",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://cerencetinyurek.com"),
  title: "Ceren's Portfolio",
  description: "Ceren Çetinyürek's biomedical engineering portfolio featuring medical devices, biomaterials, tissue engineering, and research projects.",
  keywords: [
    "Ceren Çetinyürek",
    "biomedical engineer",
    "biomedical engineering portfolio",
    "medical devices",
    "biomaterials",
    "tissue engineering",
    "jawbone regeneration",
    "MRI classification",
    "medical device management",
    "biomedical research",
    "medtech",
  ],
  alternates: {
    canonical: "https://cerencetinyurek.com",
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon.ico" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon_io/favicon.ico",
    apple: [{ url: "/favicon_io/apple-touch-icon-v2.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/favicon_io/site.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://cerencetinyurek.com",
    siteName: "Ceren's Portfolio",
    title: "Ceren's Portfolio",
    description: "Ceren Çetinyürek's biomedical engineering portfolio featuring medical devices, biomaterials, tissue engineering, and research projects.",
  },
  twitter: {
    card: "summary",
    title: "Ceren's Portfolio",
    description: "Ceren Çetinyürek's biomedical engineering portfolio featuring medical devices, biomaterials, tissue engineering, and research projects.",
  },
};

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ceren Çetinyürek",
  url: "https://cerencetinyurek.com",
  jobTitle: "Biomedical Engineer",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head>
    <link rel="preload" href="/images/bg-liquified-mobile.webp" as="image" type="image/webp" media="(max-width: 768px)" />
  </head><body suppressHydrationWarning>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData).replace(/</g, "\\u003c") }} />
    {children}<FlowerCursor />
  </body></html>;
}
