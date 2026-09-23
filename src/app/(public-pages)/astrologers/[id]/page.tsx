import React from 'react';
import type { Metadata } from 'next';
import { fetchAstrologerById, fetchAstrologerFeedbacks } from '@/services/astrologer/astrologerService';
import { sanitizeImageUrl } from '@/utils/imageUtils';
import AstrologerDetailClient from './AstrologerDetailClient';

const SITE_URL = process.env.NEXT_PUBLIC_URL || 'https://astroguide-three.vercel.app';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Dynamic Server-Side Metadata for SEO, AEO & Social Sharing
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const astroId = resolvedParams?.id || '';

  const astro = await fetchAstrologerById(astroId);

  if (!astro) {
    return {
      title: 'Astrologer Not Found | Balaji AstroGuide',
      description: 'The requested astrologer profile could not be found on Balaji AstroGuide. Browse India’s top verified Vedic astrologers.',
      robots: {
        index: false,
        follow: true
      }
    };
  }

  const astroName = astro.fullName || 'Astrologer';
  const experience = astro.experience ? `${astro.experience} years` : '5+ years';
  const expertise = Array.isArray(astro.expertise)
    ? astro.expertise.map((e: any) => (typeof e === 'string' ? e : e?.expertiseName)).filter(Boolean).slice(0, 3).join(', ')
    : 'Vedic Astrology, Kundali & Relationship Guidance';

  const languages = Array.isArray(astro.languages)
    ? astro.languages.map((l: any) => (typeof l === 'string' ? l : l?.languageName)).filter(Boolean).join(', ')
    : 'Hindi, English';

  const price =
    astro.chat?.offerPricePerMinute ||
    astro.call?.offerPricePerMinute ||
    astro.chat?.ratePerMinute ||
    astro.call?.ratePerMinute ||
    20;

  const canonicalUrl = `${SITE_URL}/astrologers/${astro.slug || astroId}`;
  const rawProfileImg =
    astro.profileImg ||
    astro.profileImage ||
    astro.astroProfileImg ||
    astro.imageUrl ||
    astro.image ||
    astro.avatar ||
    (Array.isArray(astro.photos) && astro.photos[0]) ||
    '';
  const profileImage = sanitizeImageUrl(rawProfileImg, `${SITE_URL}/images/astro-1.jpg`);

  const title = `Consult ${astroName} Online (${experience} Exp) - Top Astrologer | Balaji AstroGuide`;
  const description = `Consult ${astroName} on Balaji AstroGuide. ${experience} of experience in ${expertise}. Languages: ${languages}. Verified client reviews. Instant consultation via Chat & Call at ₹${price}/min.`;

  return {
    title,
    description,
    keywords: [
      astroName,
      `consult ${astroName}`,
      `${astroName} astrologer`,
      `${astroName} Balaji AstroGuide`,
      `${astroName} reviews`,
      'online astrologer consultation',
      'vedic astrologer online',
      'kundali matching',
      'horoscope reading'
    ],
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Balaji AstroGuide',
      locale: 'en_IN',
      type: 'profile',
      images: [
        {
          url: profileImage,
          width: 800,
          height: 800,
          alt: `${astroName} - Verified Astrologer on Balaji AstroGuide`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [profileImage]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    }
  };
}

/**
 * Server Component with Comprehensive AEO & GEO Structured Schema
 */
export default async function AstrologerDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const astroId = resolvedParams?.id || '';

  const astro = await fetchAstrologerById(astroId);
  const targetId = astro?._id || astro?.id || astroId;
  const initialFeedbacks = astro ? await fetchAstrologerFeedbacks(targetId, 1, 10) : null;

  let schemaData: any = null;

  if (astro) {
    const astroName = astro.fullName || 'Astrologer';
    const slug = astro.slug || astroId;
    const pageUrl = `${SITE_URL}/astrologers/${slug}`;
    const rawProfileImg =
      astro.profileImg ||
      astro.profileImage ||
      astro.astroProfileImg ||
      astro.imageUrl ||
      astro.image ||
      astro.avatar ||
      (Array.isArray(astro.photos) && astro.photos[0]) ||
      '';
    const imageUrl = sanitizeImageUrl(rawProfileImg, `${SITE_URL}/images/astro-1.jpg`);

    const expertiseList = Array.isArray(astro.expertise)
      ? astro.expertise.map((e: any) => (typeof e === 'string' ? e : e?.expertiseName)).filter(Boolean)
      : ['Vedic Astrology', 'Kundali Matching', 'Horoscope Analysis'];

    const languagesList = Array.isArray(astro.languages)
      ? astro.languages.map((l: any) => (typeof l === 'string' ? l : l?.languageName)).filter(Boolean)
      : ['Hindi', 'English'];

    const consultationPrice =
      astro.chat?.offerPricePerMinute ||
      astro.call?.offerPricePerMinute ||
      astro.chat?.ratePerMinute ||
      astro.call?.ratePerMinute ||
      20;

    const rawFeedbacks = Array.isArray(initialFeedbacks)
      ? initialFeedbacks
      : initialFeedbacks?.sessionFeedbacks || initialFeedbacks?.feedbacks || initialFeedbacks?.data?.sessionFeedbacks || [];

    const totalReviews =
      initialFeedbacks?.pagination?.totalDocs ?? initialFeedbacks?.data?.pagination?.totalDocs ?? rawFeedbacks.length;

    const ratingVal =
      initialFeedbacks?.averageRating ??
      initialFeedbacks?.data?.averageRating ??
      astro.averageRating ??
      (rawFeedbacks.length > 0
        ? (rawFeedbacks.reduce((acc: number, curr: any) => acc + (Number(curr.rating) || 5), 0) / rawFeedbacks.length).toFixed(1)
        : '5.0');

    const bioText =
      astro.profileBio ||
      astro.bio ||
      astro.about ||
      `${astroName} is an accomplished Vedic Astrologer on Balaji AstroGuide with ${astro.experience || 5} years of experience specializing in ${expertiseList.join(', ')}.`;

    // Multi-Layer Schema Graph optimized for Answer Engines (Google AI Overviews, Perplexity, Copilot, ChatGPT)
    schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        // 1. Breadcrumb Schema
        {
          '@type': 'BreadcrumbList',
          '@id': `${pageUrl}#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${SITE_URL}/`
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Astrologers',
              item: `${SITE_URL}/astrologers`
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: astroName,
              item: pageUrl
            }
          ]
        },
        // 2. ProfilePage Schema
        {
          '@type': 'ProfilePage',
          '@id': `${pageUrl}#profilepage`,
          url: pageUrl,
          name: `Consult ${astroName} Online | Balaji AstroGuide`,
          description: `Verified profile of ${astroName}, expert Vedic Astrologer on Balaji AstroGuide offering consultation for Love, Career, Marriage and Life.`,
          breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
          mainEntity: { '@id': `${pageUrl}#person` }
        },
        // 3. Person (Astrologer) Schema
        {
          '@type': 'Person',
          '@id': `${pageUrl}#person`,
          name: astroName,
          url: pageUrl,
          image: imageUrl,
          jobTitle: 'Vedic Astrologer & Spiritual Counselor',
          description: bioText,
          knowsAbout: expertiseList,
          knowsLanguage: languagesList,
          worksFor: {
            '@type': 'Organization',
            name: 'Balaji AstroGuide',
            url: `${SITE_URL}/`,
            logo: `${SITE_URL}/logo.png`
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: String(ratingVal),
            bestRating: '5',
            worstRating: '1',
            ratingCount: totalReviews > 0 ? String(totalReviews) : '1',
            reviewCount: totalReviews > 0 ? String(totalReviews) : '1'
          },
          makesOffer: {
            '@type': 'Offer',
            price: String(consultationPrice),
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            name: `Online Astrology Consultation with ${astroName}`,
            category: 'Astrology Services',
            priceValidUntil: '2028-12-31',
            seller: {
              '@type': 'Organization',
              name: 'Balaji AstroGuide'
            }
          }
        },
        // 4. FAQPage Schema (Answer Engine Optimization)
        {
          '@type': 'FAQPage',
          '@id': `${pageUrl}#faq`,
          mainEntity: [
            {
              '@type': 'Question',
              name: `Who is ${astroName} and what are their astrological specializations?`,
              acceptedAnswer: {
                '@type': 'Answer',
                text: `${astroName} is a verified astrologer on Balaji AstroGuide with ${astro.experience || 5} years of experience in ${expertiseList.join(', ')}. They specialize in horoscope analysis, birth chart reading, career guidance, love & marriage compatibility, and effective Vedic remedies.`
              }
            },
            {
              '@type': 'Question',
              name: `How can I consult ${astroName} online on Balaji AstroGuide?`,
              acceptedAnswer: {
                '@type': 'Answer',
                text: `You can consult ${astroName} directly on Balaji AstroGuide via Chat or Call. Click the "Connect Now" button on this page, choose your preferred consultation mode, and connect instantly for real-time guidance.`
              }
            },
            {
              '@type': 'Question',
              name: `What languages does ${astroName} speak?`,
              acceptedAnswer: {
                '@type': 'Answer',
                text: `${astroName} offers astrology consultations in ${languagesList.join(', ')}, ensuring you can discuss your concerns comfortably in your preferred language.`
              }
            },
            {
              '@type': 'Question',
              name: `What are the consultation fees for ${astroName}?`,
              acceptedAnswer: {
                '@type': 'Answer',
                text: `Consultations with ${astroName} start at ₹${consultationPrice}/minute. Balaji AstroGuide offers transparent per-minute pricing with instant wallet recharge and no hidden charges.`
              }
            },
            {
              '@type': 'Question',
              name: `What information is required for an accurate reading from ${astroName}?`,
              acceptedAnswer: {
                '@type': 'Answer',
                text: `For an accurate Kundali and astrological reading, please provide your exact Date of Birth, Time of Birth, and Place of Birth. If birth time is unknown, ${astroName} can also guide you through Prashna Kundali (Horary Astrology) or Tarot reading.`
              }
            },
            {
              '@type': 'Question',
              name: `Is my consultation with ${astroName} confidential?`,
              acceptedAnswer: {
                '@type': 'Answer',
                text: `Yes, 100%. All consultations with ${astroName} on Balaji AstroGuide are strictly private, confidential, and protected with end-to-end encryption. Your personal details and birth data are never shared.`
              }
            }
          ]
        }
      ]
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
      <AstrologerDetailClient
        astroId={astroId}
        initialAstro={astro}
        initialFeedbacks={initialFeedbacks}
      />
    </>
  );
}
