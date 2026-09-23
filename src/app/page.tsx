import React from 'react';
import type { Metadata } from 'next';
import MainBanner from './components/mainbanner/MainBanner';
import ServicesSection from './components/servicesSection/ServicesSection';
import BlogSection from './components/BlogSection/BlogSection';
import BrowseCategory from './components/BrowseCategory/BrowseCategory';
import AstrologerSection from './components/AstrologerSection/AstrologerSection';
import CelebritySpotlight from './components/CelebritySpotlight/CelebritySpotlight';
import PoojaSection from './components/PoojaSection/PoojaSection';
import SpellSection from './components/SpellSection/SpellSection';
import DailyHoroscope from './components/DailyHoroscope/DailyHoroscope';
import HowItWorks from './components/worksection/HowItWorks';
import Testimonials from './components/clientreview/Testimonials';
import PersonalizedServices from './components/personalizedservices/PersonalizedServices';
import TrustSection from './components/TrustSection/TrustSection';
import { fetchPoojaToggle } from '@/services/appConfig/appConfigService';

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
    "Balaji Astro Guide"
  ],
  alternates: {
    canonical: `${SITE_URL}`
  },
  openGraph: {
    title: "Online Astrology Consultation & Kundali | Balaji Astro Guide",
    description: "Connect with verified Vedic astrologers online for accurate Kundali predictions, love, marriage, career, and life guidance on Balaji Astro Guide.",
    url: `${SITE_URL}`,
    siteName: "Balaji Astro Guide",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://storage.googleapis.com/astro-vani-storage/admin/1789712859319-asto_logo.png",
        width: 1200,
        height: 630,
        alt: "Balaji Astro Guide - Online Astrology Platform"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Astrology Consultation & Kundali | Balaji Astro Guide",
    description: "Connect with verified Vedic astrologers online on Balaji Astro Guide for accurate predictions and remedies 24/7.",
    images: ["https://storage.googleapis.com/astro-vani-storage/admin/1789712859319-asto_logo.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  }
};

async function page() {
  const isPoojaEnabled = await fetchPoojaToggle();

  return (
    <main>
      <MainBanner />
      <ServicesSection />
      <AstrologerSection />
      <CelebritySpotlight />
      <BrowseCategory />
      {isPoojaEnabled && <PoojaSection />}
      {isPoojaEnabled && <SpellSection />}
      <DailyHoroscope />
      <HowItWorks />
      <PersonalizedServices />
      <Testimonials />
      <BlogSection />
      <TrustSection />
    </main>
  );
}

export default page;
