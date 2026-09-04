const SITE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

// Static URLs to add in sitemap
export const staticUrls = [
  {
    loc: `${SITE_URL}/`,  // Home page
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 1.0,
  },
  // {
  //   loc: `${SITE_URL}/login`,
  //   lastmod: new Date().toISOString().split('T')[0],
  //   changefreq: 'monthly',
  //   priority: 0.8,
  // },
  // {
  //   loc: `${SITE_URL}/register`,
  //   lastmod: new Date().toISOString().split('T')[0],
  //   changefreq: 'monthly',
  //   priority: 0.8,
  // },
  // {
  //   loc: `${SITE_URL}/otp`,
  //   lastmod: new Date().toISOString().split('T')[0],
  //   changefreq: 'monthly',
  //   priority: 0.6,
  // },
  // {
  //   loc: `${SITE_URL}/thank-you`,
  //   lastmod: new Date().toISOString().split('T')[0],
  //   changefreq: 'monthly',
  //   priority: 0.5,
  // },
  // {
  //   loc: `${SITE_URL}/contact-us`,
  //   lastmod: new Date().toISOString().split('T')[0],
  //   changefreq: 'monthly',
  //   priority: 0.7,
  // },
  // {
  //   loc: `${SITE_URL}/privacy-policy`,
  //   lastmod: new Date().toISOString().split('T')[0],
  //   changefreq: 'yearly',
  //   priority: 0.5,
  // },
  // {
  //   loc: `${SITE_URL}/refund-policy`,
  //   lastmod: new Date().toISOString().split('T')[0],
  //   changefreq: 'yearly',
  //   priority: 0.5,
  // },
  // {
  //   loc: `${SITE_URL}/terms-of-service`,
  //   lastmod: new Date().toISOString().split('T')[0],
  //   changefreq: 'yearly',
  //   priority: 0.5,
  // },
];

