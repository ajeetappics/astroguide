<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" indent="yes" encoding="UTF-8"/>
  <xsl:template match="/">
    <html>
      <head>
        <title>Sitemap</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #333; margin: 0; }
          .header { background: #9bcc3c; padding: 20px; color: #fff; text-align: center; }
          h1 { margin: 0; font-size: 24px; }
          p { margin: 5px 0 0 0; font-size: 14px; }
          table { width: 80%; margin: 20px auto; border-collapse: collapse; }
          th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
          th { background: #f4f4f4; color: #333; font-weight: bold; }
          a { color: #0066cc; text-decoration: none; }
          a:hover { text-decoration: underline; }
          tr:nth-child(even) { background-color: #f9f9f9; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>XML Sitemap</h1>
          <p>This sitemap contains <xsl:value-of select="count(sitemap:urlset/sitemap:url | sitemap:sitemapindex/sitemap:sitemap)"/> URLs.</p>
        </div>
        <table>
          <tr>
            <th>URL</th>
            <th>Last Modified</th>
          </tr>
          <xsl:for-each select="sitemap:urlset/sitemap:url | sitemap:sitemapindex/sitemap:sitemap">
            <tr>
              <td>
                <xsl:variable name="itemURL"><xsl:value-of select="sitemap:loc"/></xsl:variable>
                <a href="{$itemURL}"><xsl:value-of select="sitemap:loc"/></a>
              </td>
              <td><xsl:value-of select="sitemap:lastmod"/></td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
