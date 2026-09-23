import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PoojaListingClient from './PoojaListingClient';
import { fetchPoojaToggle } from '@/services/appConfig/appConfigService';

const SITE_URL = process.env.NEXT_PUBLIC_URL || 'https://astroguide-three.vercel.app';

export async function generateMetadata(): Promise<Metadata> {
  const isEnabled = await fetchPoojaToggle();
  if (!isEnabled) {
    return {
      title: "Page Not Found | Balaji AstroGuide",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: "Online Puja Booking | Sacred Vedic Pujas & Havans - Balaji AstroGuide",
    description: "Book authentic online Vedic pujas & havans with certified priests. Get personal Sankalp, live streaming, and blessed prasad delivered to your home.",
    keywords: [
      "online puja booking",
      "book pooja online",
      "vedic havan online",
      "e-puja services",
      "online pandit for puja",
      "vedic rituals online",
      "rudrabhishek puja",
      "ganesh puja online",
      "mahamrityunjaya jaap",
      "navgraha shanti puja",
      "kaal sarp dosh puja",
      "personalized sankalp pooja",
      "balaji astroguide pooja"
    ],
    alternates: {
      canonical: `${SITE_URL}/pooja`
    },
    openGraph: {
      title: "Online Puja Booking | Sacred Vedic Pujas & Havans - Balaji AstroGuide",
      description: "Perform authentic online Vedic pujas & rituals with top certified priests. Complete video and holy prasad delivered to your doorstep.",
      url: `${SITE_URL}/pooja`,
      siteName: "Balaji AstroGuide",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/images/pooja-hero-banner.jpg`,
          width: 1200,
          height: 630,
          alt: "Book Online Puja & Sacred Vedic Havans - Balaji AstroGuide"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "Online Puja Booking | Sacred Vedic Pujas & Havans - Balaji AstroGuide",
      description: "Book authentic online Vedic pujas, havans, and rituals performed by certified expert priests.",
      images: [`${SITE_URL}/images/pooja-hero-banner.jpg`]
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
}

const poojaPageSchema = {
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
          "name": "Pooja Services",
          "item": `${SITE_URL}/pooja`
        }
      ]
    },
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/pooja#webpage`,
      "url": `${SITE_URL}/pooja`,
      "name": "Online Puja Booking | Sacred Vedic Pujas & Havans - Balaji AstroGuide",
      "description": "Book authentic online Vedic pujas, havans, and rituals conducted by certified priests at holy pilgrimage temples.",
      "isPartOf": {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "name": "Balaji AstroGuide",
        "url": `${SITE_URL}/`
      },
      "about": {
        "@type": "Service",
        "name": "Online Vedic Puja & Ritual Services",
        "serviceType": "Vedic Pujas, Havans, Jaap, Dosha Nivaran Rituals",
        "provider": {
          "@type": "Organization",
          "name": "Balaji AstroGuide",
          "url": `${SITE_URL}/`
        },
        "areaServed": "IN",
        "availableChannel": {
          "@type": "ServiceChannel",
          "serviceUrl": `${SITE_URL}/pooja`,
          "name": "Online Vedic Rituals & Prasad Delivery"
        }
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How can I book an online pooja on Balaji AstroGuide?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Select your desired pooja service, enter your name, gotra, and birth details for Sankalp, choose your auspicious date, and complete the booking. Our verified Vedic priests will conduct the ritual with strict adherence to Vedic scriptures."
          }
        },
        {
          "@type": "Question",
          "name": "Who performs the poojas booked on Balaji AstroGuide?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "All pujas are performed by experienced, certified Vedic pandits and acharyas from renowned pilgrim centers including Kashi (Varanasi), Haridwar, Ujjain, and Ayodhya."
          }
        },
        {
          "@type": "Question",
          "name": "Will I receive prasad after the online pooja is completed?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, consecrated holy prasad, energized sacred thread (raksha sutra), and divine tokens from the puja are securely packed and dispatched to your registered address."
          }
        },
        {
          "@type": "Question",
          "name": "Can I include my family members' names in the Sankalp?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. You can include your and your family members' names, gotra, and specific intentions during the booking process so that the priests chant personalized sankalps on your behalf."
          }
        },
        {
          "@type": "Question",
          "name": "How do I participate or watch my pooja ritual?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You will receive video footage or a live streaming link showing your personalized Sankalp recitation and key ceremonial moments performed by the priests."
          }
        }
      ]
    }
  ]
};

export default async function PujasPage() {
  const isEnabled = await fetchPoojaToggle();
  if (!isEnabled) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(poojaPageSchema) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-[#FFFDF9]" />}>
        <PoojaListingClient />
      </Suspense>
    </>
  );
}
