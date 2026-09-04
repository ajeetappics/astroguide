import { NextResponse } from 'next/server';
import { robotsRules } from './staticRobots';

export async function GET() {
  const { userAgent, allow, disallow, sitemap } = robotsRules;

  let robotsContent = `# robots.txt for Balaji Astro Guide (Astrovani)\n\n`;
  robotsContent += `User-agent: ${userAgent}\n`;

  // Add Allow rules
  allow.forEach((path) => {
    robotsContent += `Allow: ${path}\n`;
  });

  // Add Disallow rules
  disallow.forEach((path) => {
    robotsContent += `Disallow: ${path}\n`;
  });

  // Add Crawl-delay if specified
  if ('crawlDelay' in robotsRules && robotsRules.crawlDelay) {
    robotsContent += `\nCrawl-delay: ${robotsRules.crawlDelay}\n`;
  }

  // Add Sitemap
  if (sitemap) {
    robotsContent += `\nSitemap: ${sitemap}\n`;
  }

  return new NextResponse(robotsContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}

