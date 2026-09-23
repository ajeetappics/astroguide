export interface BlogPost {
  id: number | string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl: string;
  link: string;
}

const WP_BLOG_API_URL = 'https://balajiastroguide.com/blog/wp-json/wp/v2/posts';
const DEFAULT_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

/**
 * Helper to decode HTML entities and strip unwanted HTML tags
 */
export function decodeHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&hellip;/g, '...')
    .replace(/&nbsp;/g, ' ')
    .replace(/<[^>]*>?/gm, '')
    .trim();
}

/**
 * Clean promotional preamble from WP excerpt if present
 */
export function cleanExcerpt(rawHtml: string): string {
  let text = decodeHtml(rawHtml);
  if (/^Connect with top astrologer/i.test(text)) {
    // Look for the end of the astrologer names introduction
    const match = text.match(/^Connect with top astrologer[^.!?]*[.!?][^.!?]*[.!?]\s*([\s\S]*)$/i);
    if (match && match[1] && match[1].trim().length > 20) {
      text = match[1].trim();
    } else {
      const dotIndex = text.indexOf(' . ');
      if (dotIndex !== -1 && text.length > dotIndex + 3) {
        text = text.slice(dotIndex + 3).trim();
      }
    }
  }

  // Remove [&hellip;] or [...]
  text = text.replace(/\[&hellip;\]|\[\.\.\.\]/g, '').trim();

  if (text.length > 115) {
    const sliced = text.slice(0, 115).trim();
    const lastSpace = sliced.lastIndexOf(' ');
    return (lastSpace > 75 ? sliced.slice(0, lastSpace) : sliced) + '...';
  }
  return text;
}

/**
 * Maps raw WordPress REST API post to the UI BlogPost structure
 */
export function mapWpPostToBlog(post: any): BlogPost {
  // 1. Featured Image: check yoast_head_json first (as returned by WP REST API), then embedded media or fallback
  const yoastImg = post.yoast_head_json?.og_image?.[0]?.url;
  const schemaImg = post.yoast_head_json?.schema?.['@graph']?.find(
    (item: any) => item['@type'] === 'ImageObject'
  )?.url;
  const embeddedImg = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const featuredImg =
    yoastImg ||
    schemaImg ||
    embeddedImg ||
    post.jetpack_featured_media_url ||
    DEFAULT_FALLBACK_IMAGE;

  // 2. Category: extract from yoast_head_json.articleSection or embedded categories
  let category = 'Astrology';
  if (Array.isArray(post.yoast_head_json?.articleSection) && post.yoast_head_json.articleSection.length > 0) {
    const preferred = post.yoast_head_json.articleSection.find((c: string) => c.toLowerCase() !== 'blog');
    category = preferred || post.yoast_head_json.articleSection[0] || 'Astrology';
  } else if (post._embedded?.['wp:term']?.[0]?.[0]?.name) {
    category = post._embedded['wp:term'][0][0].name;
  }

  // 3. Excerpt: decode and clean
  const excerpt =
    cleanExcerpt(post.excerpt?.rendered || post.content?.rendered || '') ||
    'Read authentic Vedic insights and guidance on Balaji Astro Guide.';

  // 4. Date
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : 'Recent';

  // 5. Title
  const title = decodeHtml(post.title?.rendered || post.title || 'Astrology Insights');

  // 6. Link
  const link = post.link || `https://balajiastroguide.com/blog/?p=${post.id}`;

  return {
    id: post.id,
    title,
    excerpt,
    category,
    date: formattedDate,
    imageUrl: featuredImg,
    link,
  };
}

/**
 * Fetch latest blog posts from WordPress REST API
 */
export async function fetchWpBlogPosts(perPage = 6): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${WP_BLOG_API_URL}?per_page=${perPage}`, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      console.error(`Failed to fetch WP posts: ${res.status} ${res.statusText}`);
      return [];
    }

    const posts = await res.json();
    if (Array.isArray(posts) && posts.length > 0) {
      return posts.map(mapWpPostToBlog);
    }
    return [];
  } catch (error) {
    console.error('Error fetching WordPress blog posts:', error);
    return [];
  }
}
