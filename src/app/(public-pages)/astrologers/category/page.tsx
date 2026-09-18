import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import AstrologerCategoriesHub from '@/app/components/AstrologerListing/AstrologerCategoriesHub';

export const metadata: Metadata = {
  title: "All Astrology Consultation Categories | Astrovani",
  description: "Browse all astrology categories including Marriage, Love, Career, Finance, Business, Health, and more. Consult India's top verified astrologers online.",
  alternates: {
    canonical: "/astrologers/category"
  },
  openGraph: {
    title: "All Astrology Consultation Categories | Astrovani",
    description: "Find verified astrologers by specialization: Love, Marriage, Career, Business, Wealth, and Vedic remedies.",
    url: "/astrologers/category"
  }
};

export default function AstrologerCategoryIndexPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFFDF9]" />}>
      <AstrologerCategoriesHub />
    </Suspense>
  );
}
