import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import AstrologersListing from '@/app/components/AstrologerListing/AstrologersListing';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const formattedCategory = decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1);

  return {
    title: `Best ${formattedCategory} Astrologers Online | Balaji AstroGuide`,
    description: `Consult top verified ${formattedCategory} Astrologers on Balaji AstroGuide. Instant consultations, accurate horoscope reading, and Vedic remedies.`,
    alternates: {
      canonical: `/astrologers/category/${decodedCategory.toLowerCase()}`
    },
    openGraph: {
      title: `Best ${formattedCategory} Astrologers Online | Balaji AstroGuide`,
      description: `Talk to verified ${formattedCategory} Astrologers for marriage, career, love, and life guidance.`
    }
  };
}

export default async function AstrologerCategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFFDF9]" />}>
      <AstrologersListing initialCategory={decodedCategory} />
    </Suspense>
  );
}
