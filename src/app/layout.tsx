import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inria_Serif, Ingrid_Darling } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import StoreProvider from "@/store/StoreProvider";
import { Toaster } from "react-hot-toast";
import { PopupProvider } from "./components/popup/PopupContext";
import Popup from "./components/popup/Popup";
import SchemaScript from "./schema/SchemaScript";
import { organizationSchema, websiteSchema, serviceSchema } from "./schema/staticSchemas";
import SmoothScroll from "./components/layout/SmoothScroll";

const helvetica = {
  variable: "--font-helvetica",
  className: "font-sans",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inriaSerif = Inria_Serif({
  variable: "--font-inria-serif",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const ingridDarling = Ingrid_Darling({
  variable: "--font-ingrid-darling",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Balaji Astro Guide",
  description: "Balaji Astro Guide is the best astrology website for online astrology predictions from the best astrologers of India. Our astrologer can get answers to all your worries",
  keywords: [
    "Talk to astrologer online",
    "Chat with astrologer",
    "Best astrologer near me",
    "Online astrology consultation",
    "Love problem solution astrology",
    "Marriage prediction by date of birth",
    "Career horoscope consultation",
    "Kundli matching online",
    "Instant astrology answers",
    "Best online astrology website in India",
    "My horoscope today",
    "Personal horoscope reading",
    "Accurate kundli reading",
    "Certified Vedic astrologer",
    "Online tarot reading India",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  other: {
    copyright: "balajiastroguide.com",
    googlebot: "index,follow",
  },
  alternates: {
    canonical: "https://balajiastroguide.com",
    languages: {
      "en-US": "en-US",
    },
  },
  openGraph: {
    title: "Talk to Astrologer Online | Accurate Astrology Consultation | Balaji Astro Guide",
    description: "Chat with certified astrologers online for love, marriage, career, and life guidance. Accurate predictions, instant responses, and affordable astrology consultations.",
    url: "https://balajiastroguide.com",
    siteName: "Balaji Astro Guide",
    type: "website",
    images: [
      {
        url: "https://storage.googleapis.com/astro-vani-storage/admin/1763637578154-logo.svg",
        width: 1200,
        height: 630,
        alt: "Balaji Astro Guide",
      },
      {
        url: "https://storage.googleapis.com/astro-vani-storage/admin/1763637578154-logo.svg",
        width: 1200,
        height: 630,
        alt: "Balaji Astro Guide",
      },
    ],
  },
};

// Next.js 16: themeColor should be in viewport export (not metadata)
export const viewport: Viewport = {
  themeColor: "#F0DF20",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inriaSerif.variable} ${ingridDarling.variable} ${helvetica.variable} antialiased`}
        suppressHydrationWarning
      >
        <SchemaScript schema={[organizationSchema, websiteSchema, serviceSchema]} />
        <StoreProvider>
          <SmoothScroll>
            <PopupProvider>
              <Header />
              {children}
              <Toaster
                position="top-right"
                toastOptions={{
                  success: {
                    style: {
                      background: "green",
                      color: "white",
                    },
                  },
                  error: {
                    style: {
                      background: "red",
                      color: "white",
                    },
                  },
                }}
              />
              <Footer />
              <Popup />
            </PopupProvider>
          </SmoothScroll>
        </StoreProvider >
      </body>
    </html>
  );
}
