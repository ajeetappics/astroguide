'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BsArrowRight } from 'react-icons/bs';

interface BlogPost {
  id: number | string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl: string;
  link: string;
}

const fallbackBlogs: BlogPost[] = [
  {
    id: 1,
    title: 'Ganesh Chaturthi 2026: Date, Puja Muhurat, Vidhi, Mantras & Visarjan',
    excerpt: 'Explore the complete guide to Ganesh Chaturthi 2026 date, auspicious puja muhurat, authentic vidhi, and spiritual significance.',
    category: 'Astrology',
    date: '12 Sep 2026',
    imageUrl: 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: 'https://balajiastroguide.com/blog',
  },
  {
    id: 2,
    title: 'Krishna Janmashtami 2026: Auspicious Puja Muhurat and Vidhi',
    excerpt: 'Learn about the Shubh Nishita Puja Muhurat timings and spiritual reflections on Lord Krishna’s birth.',
    category: 'Indian Festivals',
    date: '03 Sep 2026',
    imageUrl: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: 'https://balajiastroguide.com/blog',
  },
  {
    id: 3,
    title: 'Sacred Vedic Remedies for Overcoming Relationship & Career Hurdles',
    excerpt: 'Learn effective Vedic remedies, rituals, and gemstones that help neutralize afflictions and restore peace in life.',
    category: 'Vedic',
    date: '28 Aug 2026',
    imageUrl: 'https://images.unsplash.com/photo-1620336655055-088d06e36bf0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: 'https://balajiastroguide.com/blog',
  },
];

// Helper to decode HTML entities and strip unwanted tags
function decodeHtml(html: string): string {
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

// Clean promotional preamble from WP excerpt if present
function cleanExcerpt(rawHtml: string): string {
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

export default function BlogSection() {
  const [blogs, setBlogs] = useState<BlogPost[]>(fallbackBlogs);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchWpPosts = async () => {
      try {
        setIsLoading(true);
        // Using WordPress REST API with per_page=6
        const res = await fetch('https://balajiastroguide.com/blog/wp-json/wp/v2/posts?per_page=6', {
          headers: {
            'Accept': 'application/json',
          },
        });

        if (res.ok) {
          const posts = await res.json();
          if (Array.isArray(posts) && posts.length > 0) {
            const mappedPosts: BlogPost[] = posts.map((post: any) => {
              // 1. Featured Image: check yoast_head_json first (as returned by WP REST API), then embedded media or fallback
              const yoastImg = post.yoast_head_json?.og_image?.[0]?.url;
              const schemaImg = post.yoast_head_json?.schema?.['@graph']?.find((item: any) => item['@type'] === 'ImageObject')?.url;
              const embeddedImg = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
              const featuredImg =
                yoastImg ||
                schemaImg ||
                embeddedImg ||
                post.jetpack_featured_media_url ||
                'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

              // 2. Category: extract from yoast_head_json.articleSection or embedded categories
              let category = 'Astrology';
              if (Array.isArray(post.yoast_head_json?.articleSection) && post.yoast_head_json.articleSection.length > 0) {
                const preferred = post.yoast_head_json.articleSection.find((c: string) => c.toLowerCase() !== 'blog');
                category = preferred || post.yoast_head_json.articleSection[0] || 'Astrology';
              } else if (post._embedded?.['wp:term']?.[0]?.[0]?.name) {
                category = post._embedded['wp:term'][0][0].name;
              }

              // 3. Excerpt: decode and clean
              const excerpt = cleanExcerpt(post.excerpt?.rendered || post.content?.rendered || '') ||
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
            });

            if (isMounted) {
              setBlogs(mappedPosts);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching WordPress blog posts:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchWpPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="bg-[#FEF8E2] py-5 md:py-8 px-4 md:px-8 relative overflow-hidden">
      <style jsx>{`
        .blog-scroll::-webkit-scrollbar {
          height: 4px;
        }
        .blog-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 9999px;
        }
        .blog-scroll::-webkit-scrollbar-thumb {
          background: #F6971E;
          border-radius: 9999px;
        }
        @media (min-width: 1024px) {
          .blog-scroll {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .blog-scroll::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>

      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[120px] opacity-60 pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 md:mb-6 gap-3 md:gap-4">
          <div className="max-w-2xl">
            <span className="text-[#F6971E] font-bold font-helvetica tracking-wider uppercase text-[10px] sm:text-xs mb-1 block">
              Astrovani Updates
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold font-['Inria_Serif'] text-[#4A2B23] leading-tight">
              Latest From Blog
            </h2>
          </div>
          <a
            href="https://balajiastroguide.com/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-white border border-[#F6971E]/30 text-[#F6971E] font-bold font-helvetica py-2 px-5 rounded-full hover:bg-[#F6971E] hover:text-white transition-all shadow-xs text-xs sm:text-sm cursor-pointer"
          >
            View All Articles <BsArrowRight className="text-sm" />
          </a>
        </div>

        {/* Blog Cards: Horizontal Touch-Scroll on Mobile, 3-Column 2-Row Grid on Desktop */}
        <div className="blog-scroll flex lg:grid lg:grid-cols-3 gap-3.5 sm:gap-4 md:gap-5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 snap-x snap-mandatory">
          {isLoading ? (
            // Loading Skeletons for 6 cards
            Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={`skeleton-${idx}`}
                className="w-[210px] sm:w-[240px] lg:w-auto flex-shrink-0 snap-start bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm border border-orange-100/60 p-0 animate-pulse flex flex-col h-[280px]"
              >
                <div className="h-[120px] sm:h-[135px] md:h-[145px] w-full bg-gray-200" />
                <div className="p-3 sm:p-4 space-y-2.5 flex-grow flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="h-4 bg-gray-200 rounded w-4/5" />
                    <div className="h-3 bg-gray-100 rounded w-full" />
                    <div className="h-3 bg-gray-100 rounded w-2/3" />
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-24" />
                </div>
              </div>
            ))
          ) : (
            blogs.map((blog) => (
              <a
                key={blog.id}
                href={blog.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[210px] sm:w-[240px] lg:w-auto flex-shrink-0 snap-start group cursor-pointer bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(246,151,30,0.1)] transition-all duration-500 hover:-translate-y-1 border border-transparent hover:border-[#F6971E]/20 flex flex-col h-full relative"
              >
                {/* Image Container with Custom Badge */}
                <div className="relative h-[120px] sm:h-[135px] md:h-[145px] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={blog.imageUrl}
                    alt={blog.title}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 240px, (max-width: 1024px) 33vw, 380px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4A2B23]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Category Badge */}
                  <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[#F6971E] font-bold text-[10px] uppercase tracking-wider shadow-xs">
                    {blog.category}
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-3 sm:p-4 flex flex-col flex-grow relative">
                  {/* Floating Date */}
                  <div className="absolute -top-3.5 right-4 bg-[#F6971E] text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm transform group-hover:-translate-y-0.5 transition-transform">
                    {blog.date}
                  </div>

                  <h3 className="text-sm sm:text-base md:text-[18px] font-bold font-['Inria_Serif'] text-[#4A2B23] mb-1.5 group-hover:text-[#F6971E] transition-colors line-clamp-2 mt-0.5">
                    {blog.title}
                  </h3>

                  <p className="text-[#6b6b6b] font-helvetica text-xs sm:text-[13px] md:text-sm leading-relaxed mb-3 flex-grow line-clamp-2">
                    {blog.excerpt}
                  </p>

                  {/* Animated Read More Link */}
                  <div className="mt-auto flex items-center text-[#F6971E] font-bold text-xs sm:text-sm uppercase tracking-wider group-hover:gap-2 gap-1.5 transition-all">
                    Read Article
                    <BsArrowRight className="text-sm opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  </div>
                </div>

                {/* Bottom expanding border for hover effect */}
                <div className="absolute bottom-0 left-0 h-1 bg-[#F6971E] w-0 group-hover:w-full transition-all duration-500 ease-out" />
              </a>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
