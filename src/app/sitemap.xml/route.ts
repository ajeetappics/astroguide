import { NextResponse } from 'next/server';
import { fetchPoojaToggle } from '@/services/appConfig/appConfigService';

const SITE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

export async function GET() {
  const isPoojaEnabled = await fetchPoojaToggle();
  const currentDate = new Date().toISOString().split('T')[0];

  const sitemaps = [
    `${SITE_URL}/sitemap-pages.xml`,
    `${SITE_URL}/sitemap-blog.xml`,
    `${SITE_URL}/astrologer-sitemap.xml`,
    `${SITE_URL}/astrologer-category-sitemap.xml`,
  ];

  if (isPoojaEnabled) {
    sitemaps.push(`${SITE_URL}/pooja-sitemap.xml`);
  }

  const sitemapsXml = sitemaps.map((loc) => `  <sitemap>
    <loc>${loc}</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>`).join('\n');

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/api/sitemap-style"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapsXml}
</sitemapindex>`;

  return new NextResponse(sitemapIndex.trim(), {
    headers: { 'Content-Type': 'application/xml' },
  });
}
