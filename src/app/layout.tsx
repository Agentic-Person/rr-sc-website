import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ChatWidget from "@/components/ChatWidget";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Restoration Roofing SC | Charleston's Trusted Roofing Experts",
    template: "%s | Restoration Roofing SC",
  },
  description:
    "Family-owned roofing contractor serving Charleston, Mount Pleasant & the Lowcountry. 24/7 emergency service, free estimates, insurance claim experts.",
  metadataBase: new URL("https://www.restorationroofingsc.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Restoration Roofing SC",
  },
  twitter: {
    card: "summary_large_image",
  },
  other: {
    "geo.region": "US-SC",
    "geo.placename": "Mount Pleasant",
    "geo.position": "32.8468;-79.8203",
    ICBM: "32.8468, -79.8203",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfair.variable}`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <ChatWidget />
          <ScrollToTop />
        </ThemeProvider>

        {/* Roofle RoofQuote PRO Slideout Widget — React 19 hoists async <script> to <head> per Roofle install guide */}
        <link rel="preconnect" href="https://app.roofle.com" />
        <link rel="dns-prefetch" href="https://app.roofle.com" />
        <script
          async
          src="https://app.roofle.com/roof-quote-pro-widget.js?id=zco42W_V9MeL04LBXPBx9"
        />

        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "G-0LZW0PD82B"}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "G-0LZW0PD82B"}');
          `}
        </Script>
      </body>
    </html>
  );
}
