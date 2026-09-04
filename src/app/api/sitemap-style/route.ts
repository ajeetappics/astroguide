import { NextResponse } from 'next/server';

export async function GET() {
  const xslt = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" indent="yes" encoding="UTF-8"/>
  <xsl:template match="/">
    <html>
      <head>
        <title>XML Sitemap</title>
        <style>
          body { font-family: sans-serif; padding: 20px; color: #333; background-color: #fcfbfa; }
          .header { background: #F9B04E; padding: 20px; border-radius: 5px 5px 0 0; }
          .header h1 { margin: 0; color: #fff; font-size: 24px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1); background-color: #fff; }
          th, td { padding: 12px; border: 1px solid #f2e6cf; text-align: left; }
          th { background: #FEF8E2; color: #333; font-weight: bold; border-top: 2px solid #F9B04E; }
          tr:nth-child(even) { background-color: #FEF8E2; }
          a { color: #d67a14; text-decoration: none; font-weight: 500; }
          a:hover { text-decoration: underline; color: #F9B04E; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>XML Sitemap</h1>
          <span style="color: #fff;font-size: 15px;font-weight: 500;">Balaji Astro Guide</span>
        </div>
        <table>
          <tr>
            <th>URL</th>
            <th>Last Modified</th>
          </tr>
          <xsl:for-each select="sitemap:urlset/sitemap:url | sitemap:sitemapindex/sitemap:sitemap">
            <tr>
              <td>
                <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
              </td>
              <td><xsl:value-of select="sitemap:lastmod"/></td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>`;

  return new NextResponse(xslt.trim(), {
    headers: { 'Content-Type': 'text/xsl' },
  });
}
