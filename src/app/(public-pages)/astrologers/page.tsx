import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import AstrologersListing from '@/app/components/AstrologerListing/AstrologersListing';

const SITE_URL = process.env.NEXT_PUBLIC_URL || 'https://astroguide-three.vercel.app';

export const metadata: Metadata = {
  title: "Talk to Best Astrologers Online | Top Vedic Astrologers Consultation - Balaji AstroGuide",
  description: "Consult India's top verified astrologers online via call or chat on Balaji AstroGuide. Get accurate predictions for Love, Marriage, Career & Finance 24/7.",
  keywords: [
    "astrologers online",
    "talk to astrologer",
    "chat with astrologer",
    "best astrologers in india",
    "vedic astrology consultation",
    "kundali matching online",
    "astrology prediction",
    "online jyotish",
    "top astrologer consultation",
    "marriage astrology",
    "career astrologer",
    "Balaji AstroGuide"
  ],
  alternates: {
    canonical: `${SITE_URL}/astrologers`
  },
  openGraph: {
    title: "Talk to Best Astrologers Online | Top Vedic Astrologers Consultation - Balaji AstroGuide",
    description: "Consult India's top verified astrologers online via call or chat on Balaji AstroGuide. Instant consultations, accurate horoscope reading, and Vedic remedies.",
    url: `${SITE_URL}/astrologers`,
    siteName: "Balaji AstroGuide",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/premium-astro-bg.jpg`,
        width: 1200,
        height: 630,
        alt: "Talk to Best Astrologers Online - Balaji AstroGuide"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Talk to Best Astrologers Online | Top Vedic Astrologers Consultation - Balaji AstroGuide",
    description: "Consult India's top verified astrologers online via call or chat on Balaji AstroGuide. Get accurate predictions for Love, Marriage, Career, and Finance.",
    images: [`${SITE_URL}/images/premium-astro-bg.jpg`]
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
    },
  },
};

const astrologerPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `${SITE_URL}/`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Astrologers",
          "item": `${SITE_URL}/astrologers`
        }
      ]
    },
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/astrologers#webpage`,
      "url": `${SITE_URL}/astrologers`,
      "name": "Talk to Best Astrologers Online | Top Vedic Astrologers Consultation - Balaji AstroGuide",
      "description": "Consult India's top verified astrologers online via call or chat on Balaji AstroGuide. Get accurate predictions for Love, Marriage, Career & Finance 24/7.",
      "isPartOf": {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "name": "Balaji AstroGuide",
        "url": `${SITE_URL}/`
      },
      "about": {
        "@type": "Service",
        "name": "Online Astrology Consultation",
        "serviceType": "Vedic Astrology, Tarot Reading, Numerology, Horoscope Analysis",
        "provider": {
          "@type": "Organization",
          "name": "Balaji AstroGuide",
          "url": `${SITE_URL}/`
        },
        "areaServed": "IN",
        "availableChannel": {
          "@type": "ServiceChannel",
          "serviceUrl": `${SITE_URL}/astrologers`,
          "name": "Online Chat & Call"
        }
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How can I consult an astrologer online on Balaji AstroGuide?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can browse our directory of verified astrologers, view their specialization, experience, ratings, and language preferences, and connect with them instantly through chat or call consultation."
          }
        },
        {
          "@type": "Question",
          "name": "Are the astrologers on Balaji AstroGuide verified?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, every astrologer on Balaji AstroGuide undergoes a rigorous verification and interview process by senior Vedic scholars before being onboarded."
          }
        },
        {
          "@type": "Question",
          "name": "What details are required for an accurate horoscope reading?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To get an accurate Kundali reading, you will need to provide your Date of Birth, exact Time of Birth, and Place of Birth. If birth time is unknown, palmistry and Prashna Kundali techniques can be used."
          }
        },
        {
          "@type": "Question",
          "name": "Can online astrologers help with marriage and relationship problems?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our marriage and relationship experts specialize in Kundali Milan (horoscope matching), delay in marriage remedies, relationship compatibility, and resolving marital discord through Vedic remedies."
          }
        },
        {
          "@type": "Question",
          "name": "Is my personal information and consultation confidential?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. Balaji AstroGuide ensures 100% privacy and confidentiality. Your personal details, birth chart, and chat history are never shared with third parties."
          }
        }
      ]
    }
  ]
};

interface PageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AstrologersPage({ searchParams }: PageProps) {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const categoryParam = typeof resolvedParams?.category === 'string' ? resolvedParams.category : "All";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(astrologerPageSchema) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-[#FFFDF9]" />}>
        <AstrologersListing initialCategory={categoryParam} />
      </Suspense>
    </>
  );
}
