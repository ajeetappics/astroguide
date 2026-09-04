import React from 'react';
import { Metadata } from 'next';
import commonService from '@/services/comman/comman';
import StaticPageComponent from '@/app/components/StaticPageComponent/StaticPageComponent';

// Define the slug for this page
const PAGE_SLUG = 'privacy_policy';

// =========================================================================
// --- DYNAMIC METADATA FUNCTION ---
// =========================================================================
export async function generateMetadata(): Promise<Metadata> {
  try {
    // Fetch the page data on the server
    const response = await commonService.fetchStaticPage(PAGE_SLUG);
    const pageData = response.data;

    // Extract a short, clean description from the HTML content for the meta tag.
    // This removes HTML tags and truncates the text.
    const description = pageData.content
      ? pageData.content.replace(/<[^>]*>/g, '').substring(0, 155) + '...'
      : 'Learn about our commitment to protecting your personal information at Balaji Astro Guide.';

    return {
      title: `${pageData.title} | Balaji Astro Guide`, // e.g., "Privacy Policy | Balaji Astro Guide"
      description: description,
    };
  } catch (error) {
    // Fallback metadata in case the API call fails
    console.error(`Failed to fetch metadata for ${PAGE_SLUG}:`, error);
    return {
      title: 'Privacy Policy | Balaji Astro Guide',
      description: 'Review the privacy policy for Balaji Astro Guide services.',
    };
  }
}

// =========================================================================
// --- PAGE COMPONENT (Client Component Wrapper) ---
// =========================================================================
export default function PrivacyPolicyPage() {
  return (
    <StaticPageComponent
      slug={PAGE_SLUG}
      defaultTitle="Privacy Policy"
    />
  );
}
