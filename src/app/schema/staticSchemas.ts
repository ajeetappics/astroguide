const SITE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

// Get base URL without trailing slash and without /API
const getBaseUrl = () => {
  const url = SITE_URL.replace(/\/$/, ''); // Remove trailing slash
  return url.replace(/\/API$/, ''); // Remove /API if present
};

const BASE_URL = getBaseUrl();

// Organization Schema
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Balaji Astro Guide',
  alternateName: 'Astrovani',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`, // Update with your actual logo URL
  description: 'Get expert astrological guidance and personalized horoscope readings from verified astrologers',
  sameAs: [
    // Add your social media links here
    'https://www.facebook.com/share/1bQRiuyNEy/?mibextid=wwXIfr',
    // 'https://www.twitter.com/yourhandle',
    'https://www.instagram.com/astrovaniofficial',
    'https://www.youtube.com/@astrovanibybalaji',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    // Add your contact information
    // telephone: '+91-XXXXXXXXXX',
    // email: 'support@astrovani.com',
  },
};

// WebSite Schema
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Balaji Astro Guide',
  url: BASE_URL,
  description: 'Expert astrological guidance and personalized horoscope readings',
  publisher: {
    '@type': 'Organization',
    name: 'Balaji Astro Guide',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

// Service Schema (for astrology services)
export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Astrology Consultation',
  provider: {
    '@type': 'Organization',
    name: 'Balaji Astro Guide',
  },
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  description: 'Professional astrology services including horoscope reading, kundli analysis, and personalized astrological guidance',
};

// Breadcrumb Schema (for navigation)
export const getBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

// WebPage Schema
export const getWebPageSchema = (pageName: string, description?: string, url?: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageName,
    url: url || BASE_URL,
    description: description || `Balaji Astro Guide - ${pageName}`,
    publisher: {
      '@type': 'Organization',
      name: 'Balaji Astro Guide',
    },
  };
};

// faqSchema for FAQ page

// Validation function to ensure schema integrity
export const validateSchema = (schema: any): boolean => {
  if (typeof schema !== 'object' || schema === null) {
    return false;
  }
  
  // Ensure schema has required @context or @type for JSON-LD
  if (!schema['@context'] && !schema['@type']) {
    return false;
  }
  
  // Check for prototype pollution attempts
  const dangerousKeys = ['__proto__', 'constructor', 'prototype'];
  if (dangerousKeys.some(key => key in schema)) {
    return false;
  }
  
  return true;
};

// Validate all exported schemas in development mode
if (process.env.NODE_ENV === 'development') {
  [organizationSchema, websiteSchema, serviceSchema].forEach((schema, index) => {
    if (!validateSchema(schema)) {
      console.warn(`Schema at index ${index} may be invalid or unsafe`);
    }
  });
}