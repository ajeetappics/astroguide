import { NextResponse } from 'next/server';
import { staticUrls } from '../sitemap.xml/staticSitemaps';

const SITE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

export async function GET() {
  const staticUrlsXml = staticUrls.map(({ loc, lastmod, changefreq, priority }) => {
    // Make sure we append SITE_URL if loc is a relative path
    const absoluteLoc = loc.startsWith('http') ? loc : `${SITE_URL}${loc}`;
    return `
    <url>
      <loc>${absoluteLoc}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>`;
  }).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/api/sitemap-style"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrlsXml}
</urlset>`;

  return new NextResponse(sitemap.trim(), {
    headers: { 'Content-Type': 'application/xml' },
  });
}
