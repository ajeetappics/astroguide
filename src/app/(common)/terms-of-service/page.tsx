import React from 'react';
import { Metadata } from 'next';
import commonService from '@/services/comman/comman';
import StaticPageComponent from '@/app/components/StaticPageComponent/StaticPageComponent';

const PAGE_SLUG = 'terms_conditions';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await commonService.fetchStaticPage(PAGE_SLUG);
    const pageData = response.data;

    const description = pageData.content
      ? pageData.content.replace(/<[^>]*>/g, '').substring(0, 155) + '...'
      : 'Read the terms and conditions for using the Balaji Astro Guide platform.';

    return {
      title: `${pageData.title} | Balaji Astro Guide`,
      description: description,
    };
  } catch (error) {
    console.error(`Failed to fetch metadata for ${PAGE_SLUG}:`, error);
    return {
      title: 'Terms of Service | Balaji Astro Guide',
      description: 'Review the terms of service for the Balaji Astro Guide platform.',
    };
  }
}

export default function TermsOfServicePage() {
  return (
    <StaticPageComponent
      slug={PAGE_SLUG}
      defaultTitle="Terms of Service"
    />
  );
}
