'use client'

import React from 'react';
import Image from 'next/image';
import { BsArrowRight } from 'react-icons/bs';

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
    <section className="bg-[#FEF8E2] py-[30px] md:py-[60px] px-4 md:px-8 relative overflow-hidden">

      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[120px] opacity-60 pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl relative z-10">

        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
          <div className="max-w-2xl">
            <span className="text-[#F6971E] font-bold font-helvetica tracking-wider uppercase text-sm mb-2 block">
              Astrovani Updates
            </span>
            <h2 className="text-[36px] font-bold font-['Inria_Serif'] text-[#4A2B23] leading-tight mb-4">
              Latest From Blog
            </h2>
          </div>
          <button className="flex items-center gap-2 bg-white border border-[#F6971E]/30 text-[#F6971E] font-bold font-helvetica py-3 px-8 rounded-full hover:bg-[#F6971E] hover:text-white transition-all shadow-sm">
            View All Articles <BsArrowRight className="text-lg" />
          </button>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.map((blog) => (
            <div
              key={blog.id}
              className="group cursor-pointer bg-white rounded-[24px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(246,151,30,0.1)] transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-[#F6971E]/20 flex flex-col h-full relative"
            >

              {/* Image Container with Custom Badge */}
              <div className="relative h-[240px] w-full overflow-hidden">
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A2B23]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Unique Category Badge floating on image */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[#F6971E] font-bold text-xs uppercase tracking-wider shadow-sm">
                  {blog.category}
                </div>
              </div>

              {/* Content Container */}
              <div className="p-8 flex flex-col flex-grow relative">

                {/* Floating Date (Unique Design Element) */}
                <div className="absolute -top-6 right-8 bg-[#F6971E] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-md transform group-hover:-translate-y-1 transition-transform">
                  {blog.date}
                </div>

                <h3 className="text-2xl font-bold font-['Inria_Serif'] text-[#4A2B23] mb-4 group-hover:text-[#F6971E] transition-colors line-clamp-2 mt-2">
                  {blog.title}
                </h3>

                <p className="text-[#6b6b6b] font-helvetica text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                  {blog.excerpt}
                </p>

                {/* Animated Read More Link */}
                <div className="mt-auto flex items-center text-[#F6971E] font-bold text-sm uppercase tracking-wider group-hover:gap-3 gap-2 transition-all">
                  Read Article
                  <BsArrowRight className="text-xl opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
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
