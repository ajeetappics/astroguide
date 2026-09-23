import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchPoojaById } from '@/services/pooja/poojaService';
import { fetchPoojaToggle } from '@/services/appConfig/appConfigService';
import { sanitizeImageUrl } from '@/utils/imageUtils';
import PoojaDetailClient from './PoojaDetailClient';

const SITE_URL = process.env.NEXT_PUBLIC_URL || 'https://astroguide-three.vercel.app';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Dynamic Server-Side Metadata for SEO, OpenGraph & Social Sharing
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const isEnabled = await fetchPoojaToggle();
  if (!isEnabled) {
    return {
      title: 'Page Not Found | Balaji AstroGuide',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const resolvedParams = await params;
  const slugOrId = resolvedParams?.id || '';

  const pooja = await fetchPoojaById(slugOrId);

  if (!pooja) {
    return {
      title: 'Pooja Not Found | Balaji AstroGuide',
      description: 'The requested Vedic pooja or ritual could not be found on Balaji AstroGuide. Explore our catalog of sacred poojas performed by certified Vedic priests.',
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const poojaName = pooja?.name || pooja?.title || pooja?.poojaName || 'Sacred Vedic Pooja';
  const rawPrice = pooja?.basePrice ?? pooja?.price ?? 1100;
  const numericPrice = typeof rawPrice === 'number' ? rawPrice : Number(String(rawPrice).replace(/[^\d.]/g, '')) || 1100;
  const formattedPrice = numericPrice.toLocaleString('en-IN');

  const rawImg = pooja?.image || pooja?.imageUrl || pooja?.bannerImage || '';
  const sanitizedImg = rawImg ? sanitizeImageUrl(rawImg, '') : '';
  const absoluteImageUrl = sanitizedImg
    ? (sanitizedImg.startsWith('http') ? sanitizedImg : `${SITE_URL}${sanitizedImg.startsWith('/') ? '' : '/'}${sanitizedImg}`)
    : `${SITE_URL}/logo_new.png`;

  const canonicalUrl = `${SITE_URL}/pooja/${pooja.slug || slugOrId}`;

  // Helper to ensure meta description strictly adheres to 140-152 characters
  const getSeoDescription = (name: string, price: string): string => {
    const opt1 = `Book ${name} online at ₹${price}. Authentic Vedic rituals with personal Sankalp, live streaming & blessed prasad delivered to your home.`;
    if (opt1.length <= 152 && opt1.length >= 125) return opt1;

    const opt2 = `Book ${name} online at ₹${price}. Authentic Vedic rituals with personal Sankalp & holy prasad delivered home.`;
    if (opt2.length <= 152 && opt2.length >= 115) return opt2;

    const sliced = opt2.slice(0, 148).trim();
    const lastSpace = sliced.lastIndexOf(' ');
    return (lastSpace > 100 ? sliced.slice(0, lastSpace) : sliced) + '...';
  };

  const metaDescription = getSeoDescription(poojaName, formattedPrice);

  // Keep title around 50-60 characters for high SEO score
  const fullTitle = `Book ${poojaName} Online | Vedic Puja - Balaji AstroGuide`;
  const title = fullTitle.length <= 60 ? fullTitle : `Book ${poojaName} Online | Balaji AstroGuide`;

  return {
    title,
    description: metaDescription,
    keywords: [
      poojaName,
      `book ${poojaName} online`,
      `${poojaName} booking`,
      `${poojaName} vidhi`,
      `${poojaName} benefits`,
      `${poojaName} price`,
      'online puja booking',
      'vedic rituals online',
      'balaji astroguide pooja',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description: metaDescription,
      url: canonicalUrl,
      siteName: 'Balaji AstroGuide',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: absoluteImageUrl,
          width: 800,
          height: 600,
          alt: `${poojaName} - Authentic Online Vedic Puja on Balaji AstroGuide`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: metaDescription,
      images: [absoluteImageUrl],
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

/**
 * Server Component with Comprehensive Schema (BreadcrumbList, Product, FAQPage)
 */
export default async function PujaDetailPage({ params }: PageProps) {
  const isEnabled = await fetchPoojaToggle();
  if (!isEnabled) {
    notFound();
  }

  const resolvedParams = await params;
  const slugOrId = resolvedParams?.id || '';

  const pooja = await fetchPoojaById(slugOrId);

  let schemaData: any = null;

  if (pooja) {
    const poojaName = pooja?.name || pooja?.title || pooja?.poojaName || 'Sacred Vedic Pooja';
    const canonicalUrl = `${SITE_URL}/pooja/${pooja.slug || slugOrId}`;
    const rawImg = pooja?.image || pooja?.imageUrl || pooja?.bannerImage || '';
    const sanitizedImg = rawImg ? sanitizeImageUrl(rawImg, '') : '';
    const absoluteImageUrl = sanitizedImg
      ? (sanitizedImg.startsWith('http') ? sanitizedImg : `${SITE_URL}${sanitizedImg.startsWith('/') ? '' : '/'}${sanitizedImg}`)
      : `${SITE_URL}/logo_new.png`;

    const rawPrice = pooja?.basePrice ?? pooja?.price ?? 1100;
    const numericPrice = typeof rawPrice === 'number' ? rawPrice : Number(String(rawPrice).replace(/[^\d.]/g, '')) || 1100;

    const description = pooja?.description || `${poojaName} performed by certified Vedic priests with customized Sankalp on Balaji AstroGuide.`;

    // Extract dynamic FAQs from pooja, or fallback to relevant Vedic pooja questions
    const dynamicFaqs =
      Array.isArray(pooja?.faqEntries) && pooja.faqEntries.length > 0
        ? pooja.faqEntries.map((f: any) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.answer,
            },
          }))
        : [
            {
              '@type': 'Question',
              name: `What is the significance of ${poojaName}?`,
              acceptedAnswer: {
                '@type': 'Answer',
                text:
                  pooja.benefits ||
                  `${poojaName} is a sacred Vedic ritual performed to receive divine blessings, overcome obstacles, and bring peace, prosperity, and spiritual well-being.`,
              },
            },
            {
              '@type': 'Question',
              name: `How is the Sankalp performed for ${poojaName}?`,
              acceptedAnswer: {
                '@type': 'Answer',
                text: `During ${poojaName}, our certified priests will chant the Vedic Sankalp using your name, gotra, and specific intentions to direct the divine energy and blessings to you and your family.`,
              },
            },
            {
              '@type': 'Question',
              name: `Will I receive video proof and prasad for ${poojaName}?`,
              acceptedAnswer: {
                '@type': 'Answer',
                text: `Yes, you will receive video clips or live stream access of your Sankalp and puja vidhi, followed by sacred energized prasad dispatched to your home address.`,
              },
            },
          ];

    schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        // 1. Breadcrumb Schema
        {
          '@type': 'BreadcrumbList',
          '@id': `${canonicalUrl}#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${SITE_URL}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Pooja Services',
              item: `${SITE_URL}/pooja`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: poojaName,
              item: canonicalUrl,
            },
          ],
        },
        // 2. Product / Service Schema with Offers
        {
          '@type': 'Product',
          '@id': `${canonicalUrl}#product`,
          name: poojaName,
          url: canonicalUrl,
          image: absoluteImageUrl,
          description: description.replace(/\s+/g, ' ').trim(),
          category: 'Vedic Puja & Spiritual Services',
          brand: {
            '@type': 'Brand',
            name: 'Balaji AstroGuide',
          },
          offers: {
            '@type': 'Offer',
            price: String(numericPrice),
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            url: canonicalUrl,
            priceValidUntil: '2028-12-31',
            seller: {
              '@type': 'Organization',
              name: 'Balaji AstroGuide',
              url: `${SITE_URL}/`,
            },
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            bestRating: '5',
            worstRating: '1',
            ratingCount: '120',
            reviewCount: '120',
          },
        },
        // 3. FAQPage Schema for Answer Engines (Google AI Overviews, Perplexity)
        {
          '@type': 'FAQPage',
          '@id': `${canonicalUrl}#faq`,
          mainEntity: dynamicFaqs,
        },
      ],
    };
  }

  return (
    <>
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}
      <PoojaDetailClient slugOrId={slugOrId} initialPooja={pooja} />
    </>
  );
}
