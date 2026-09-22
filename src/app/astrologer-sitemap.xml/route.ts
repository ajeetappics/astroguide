import { NextResponse } from 'next/server';

const SITE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://preprod.api.astrovani-balaji.store';

export async function GET() {
  const currentDate = new Date().toISOString().split('T')[0];
  let dynamicUrlsXml = '';

  // Main astrologer listing page
  dynamicUrlsXml += `
    <url>
      <loc>${SITE_URL}/astrologers</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.9</priority>
    </url>`;

  try {
    // Fetch astrologers from backend API
    const res = await fetch(`${API_URL}/user/astroList?page=1&limit=1000`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const json = await res.json();
      const astrologers = Array.isArray(json?.data)
        ? json.data
        : Array.isArray(json)
        ? json
        : [];

      dynamicUrlsXml += astrologers
        .map((astro: any) => {
          const slugOrId = astro.slug || astro._id || astro.id;
          if (!slugOrId) return '';
          const loc = `${SITE_URL}/astrologers/${slugOrId}`
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
          const rawDate = astro.updatedAt || astro.createdAt || currentDate;
          const lastmod = String(rawDate).split('T')[0];

          return `
    <url>
      <loc>${loc}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>`;
        })
        .join('');
    }
  } catch (error) {
    console.error('Error fetching astrologers for sitemap:', error);
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
