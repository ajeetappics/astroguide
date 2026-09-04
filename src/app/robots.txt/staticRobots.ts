const SITE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

// Get base URL without trailing slash and without /API
const getBaseUrl = () => {
  const url = SITE_URL.replace(/\/$/, ''); // Remove trailing slash
  return url.replace(/\/API$/, ''); // Remove /API if present
};

// Static robots.txt rules
export const robotsRules = {
  userAgent: '*',
  allow: [
    '/',
    // '/login',
    // '/register',
    // '/otp',
    '/contact-us',
    '/privacy-policy',
    '/refund-policy',
    '/terms-of-service',
    // '/thank-you',
  ],
  disallow: [
    '/information',
    '/welcome',
    '/api/',
    '/login',
    '/register',
    '/otp',
    '/thank-you',
    '/*?utm_source',
    '/*?utm_medium',
    '/*?utm_campaign',
    '/*?dd',
    '/*?catid',
    '/*?pageid',
    '/cdn-cgi/challenge-platform/'
  ],
  // crawlDelay: 1,
  sitemap: `${getBaseUrl()}/sitemap.xml`,
};

