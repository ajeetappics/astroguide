import { NextResponse } from 'next/server';

const SITE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://preprod.api.astrovani-balaji.store';

export async function GET() {
  const currentDate = new Date().toISOString().split('T')[0];
  let dynamicUrlsXml = '';

  // Main Pooja listing page
  dynamicUrlsXml += `
    <url>
      <loc>${SITE_URL}/pooja</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.9</priority>
    </url>`;

  try {
    // Fetch poojas from backend API
    const res = await fetch(`${API_URL}/user/pooja?page=1&limit=1000`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const json = await res.json();
      let poojas: any[] = [];

      if (Array.isArray(json?.data)) {
        poojas = json.data;
      } else if (Array.isArray(json?.data?.docs)) {
        poojas = json.data.docs;
      } else if (Array.isArray(json?.data?.poojas)) {
        poojas = json.data.poojas;
      } else if (Array.isArray(json?.data?.result)) {
        poojas = json.data.result;
      } else if (Array.isArray(json?.poojas)) {
        poojas = json.poojas;
      } else if (Array.isArray(json?.docs)) {
        poojas = json.docs;
      } else if (Array.isArray(json?.result)) {
        poojas = json.result;
      } else if (Array.isArray(json)) {
        poojas = json;
      }

      dynamicUrlsXml += poojas
        .map((pooja: any) => {
          const slugOrId = pooja.slug || pooja.poojaSlug || pooja._id || pooja.id;
          if (!slugOrId) return '';
          const loc = `${SITE_URL}/pooja/${slugOrId}`
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
          const rawDate = pooja.updatedAt || pooja.createdAt || currentDate;
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
    console.error('Error fetching poojas for sitemap:', error);
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
