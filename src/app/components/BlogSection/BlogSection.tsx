'use client'

import React from 'react';
import Image from 'next/image';
import { BsArrowRight } from 'react-icons/bs';
import Link from 'next/link';

const blogData = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet, consect",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Astrology",
    date: "08 Aug 2024",
    imageUrl: "https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet, consect",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Horoscope",
    date: "08 Aug 2024",
    imageUrl: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet, consect",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Vedic",
    date: "08 Aug 2024",
    imageUrl: "https://images.unsplash.com/photo-1620336655055-088d06e36bf0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export default function BlogSection() {
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
          <Link href={`${process.env.NEXT_PUBLIC_URL}/blog`} className="flex items-center gap-1.5 bg-white border border-[#F6971E]/30 text-[#F6971E] font-bold font-helvetica py-2 px-5 rounded-full hover:bg-[#F6971E] hover:text-white transition-all shadow-xs text-xs sm:text-sm cursor-pointer">
            View All Articles <BsArrowRight className="text-sm" />
          </Link>
        </div>

        {/* Blog Cards: Horizontal Touch-Scroll on Responsive, 3-Column Grid on Desktop */}
        <div className="blog-scroll flex lg:grid lg:grid-cols-3 gap-3.5 sm:gap-4 md:gap-5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 snap-x snap-mandatory">
          {blogData.map((blog) => (
            <div
              key={blog.id}
              className="w-[210px] sm:w-[240px] lg:w-auto flex-shrink-0 snap-start group cursor-pointer bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(246,151,30,0.1)] transition-all duration-500 hover:-translate-y-1 border border-transparent hover:border-[#F6971E]/20 flex flex-col h-full relative"
            >

              {/* Image Container with Custom Badge */}
              <div className="relative h-[120px] sm:h-[135px] md:h-[145px] w-full overflow-hidden">
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A2B23]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Unique Category Badge floating on image */}
                <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[#F6971E] font-bold text-[10px] uppercase tracking-wider shadow-xs">
                  {blog.category}
                </div>
              </div>

              {/* Content Container */}
              <div className="p-3 sm:p-4 flex flex-col flex-grow relative">

                {/* Floating Date (Unique Design Element) */}
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

              {/* Bottom expanding border for extra flair */}
              <div className="absolute bottom-0 left-0 h-1 bg-[#F6971E] w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
