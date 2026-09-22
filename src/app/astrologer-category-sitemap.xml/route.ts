import { NextResponse } from 'next/server';

const SITE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

export async function GET() {
  const currentDate = new Date().toISOString().split('T')[0];
  let dynamicUrlsXml = '';

  // Main Category Hub Page
  dynamicUrlsXml += `
    <url>
      <loc>${SITE_URL}/astrologers/category</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>`;

  // Individual Category URLs
  const categories = [
    'love',
    'marriage',
    'career',
    'education',
    'health',
    'finance',
    'business',
    'wealth',
    'legal',
    'remedies',
    'parent',
  ];

  for (const cat of categories) {
    dynamicUrlsXml += `
    <url>
      <loc>${SITE_URL}/astrologers/category/${cat}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`;
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/api/sitemap-style"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${dynamicUrlsXml}
</urlset>`;

  return new NextResponse(sitemap.trim(), {
    headers: { 'Content-Type': 'application/xml' },
  });
}
