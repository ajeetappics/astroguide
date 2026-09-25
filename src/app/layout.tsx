import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inria_Serif, Ingrid_Darling } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import StoreProvider from "@/store/StoreProvider";
import { Toaster } from "react-hot-toast";
import { PopupProvider } from "./components/popup/PopupContext";
import Popup from "./components/popup/Popup";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import SchemaScript from "./schema/SchemaScript";
import { organizationSchema, websiteSchema, serviceSchema } from "./schema/staticSchemas";
import { fetchPoojaToggle } from "@/services/appConfig/appConfigService";
import { PoojaConfigProvider } from "./context/PoojaConfigContext";

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

const SITE_URL = process.env.NEXT_PUBLIC_URL || 'https://astroguide-three.vercel.app';

export const metadata: Metadata = {
  title: "Online Astrology Consultation & Kundali | Balaji Astro Guide",
  description: "Balaji Astro Guide is India's premier online astrology platform for accurate Kundali predictions and expert consultation with verified Vedic astrologers.",
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
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    copyright: "balajiastroguide.com",
    googlebot: "index,follow",
  },
  alternates: {
    canonical: `${SITE_URL}`,
    languages: {
      "en-US": "en-US",
    },
  },
  openGraph: {
    title: "Online Astrology Consultation & Kundali | Balaji Astro Guide",
    description: "Chat with certified astrologers online for love, marriage, career, and life guidance. Accurate predictions, instant responses, and affordable astrology consultations.",
    url: `${SITE_URL}`,
    siteName: "Balaji Astro Guide",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://storage.googleapis.com/astro-vani-storage/admin/1789712859319-asto_logo.png",
        width: 1200,
        height: 630,
        alt: "Balaji Astro Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Astrology Consultation & Kundali | Balaji Astro Guide",
    description: "Consult verified Vedic astrologers online on Balaji Astro Guide for accurate predictions and remedies 24/7.",
    images: ["https://storage.googleapis.com/astro-vani-storage/admin/1789712859319-asto_logo.png"],
  },
};

// Next.js 16: themeColor should be in viewport export (not metadata)
export const viewport: Viewport = {
  themeColor: "#F0DF20",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isPoojaEnabled = await fetchPoojaToggle();

  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var nav = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
                var isReload = (nav && nav.type === 'reload') || (window.performance && window.performance.navigation && window.performance.navigation.type === 1);
                if (isReload) {
                  if ('scrollRestoration' in history) {
                    history.scrollRestoration = 'manual';
                  }
                  window.scrollTo(0, 0);
                  window.addEventListener('load', function() {
                    window.scrollTo(0, 0);
                    setTimeout(function() {
                      if ('scrollRestoration' in history) {
                        history.scrollRestoration = 'auto';
                      }
                    }, 100);
                  });
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inriaSerif.variable} ${ingridDarling.variable} ${helvetica.variable} antialiased`}
        suppressHydrationWarning
      >
        <SchemaScript schema={[organizationSchema, websiteSchema, serviceSchema]} />
        <StoreProvider>
          <PoojaConfigProvider initialEnabled={isPoojaEnabled}>
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
              <ScrollToTop />
            </PopupProvider>
          </PoojaConfigProvider>
        </StoreProvider >
      </body>
    </html>
  );
}
