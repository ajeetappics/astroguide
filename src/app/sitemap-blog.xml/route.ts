import { NextResponse } from 'next/server';

export async function GET() {
  let dynamicUrlsXml = '';

  try {
    // Fetch posts from WordPress REST API
    const res = await fetch('https://balajiastroguide.com/blog/wp-json/wp/v2/posts?per_page=100', {
      next: { revalidate: 3600 },
    });
    
    if (res.ok) {
      const posts = await res.json();
      dynamicUrlsXml = posts.map((post: any) => {
        const loc = post.link.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
        const lastmod = (post.modified_gmt || post.modified).split('T')[0];
        
        return `
    <url>
      <loc>${loc}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`;
      }).join('');
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
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
