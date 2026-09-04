import React from 'react';
import { Metadata } from 'next';
import commonService from '@/services/comman/comman';
import StaticPageComponent from '@/app/components/StaticPageComponent/StaticPageComponent';

const PAGE_SLUG = 'refund_policy';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await commonService.fetchStaticPage(PAGE_SLUG);
    const pageData = response.data;

    const description = pageData.content
      ? pageData.content.replace(/<[^>]*>/g, '').substring(0, 155) + '...'
      : 'Understand the terms and conditions for refunds on Balaji Astro Guide.';

    return {
      title: `${pageData.title} | Balaji Astro Guide`,
      description: description,
    };
  } catch (error) {
    console.error(`Failed to fetch metadata for ${PAGE_SLUG}:`, error);
    return {
      title: 'Refund Policy | Balaji Astro Guide',
      description: 'Review the refund policy for Balaji Astro Guide services.',
    };
  }
}

export default function RefundPolicyPage() {
  return (
    <StaticPageComponent
      slug={PAGE_SLUG}
      defaultTitle="Refund Policy"
    />
  );
}