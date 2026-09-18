'use client'

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsSearch, BsX } from 'react-icons/bs';

export interface AstrologyCategoryItem {
  slug: string;
  name: string;
  icon: string;
}

export const ALL_ASTROLOGY_CATEGORIES: AstrologyCategoryItem[] = [
  { slug: "love", name: "Love", icon: "/images/love.png" },
  { slug: "marriage", name: "Marriage", icon: "/images/marriage.png" },
  { slug: "career", name: "Career", icon: "/images/career_color.png" },
  { slug: "education", name: "Education", icon: "/images/kundli.svg" },
  { slug: "health", name: "Health", icon: "/images/health.png" },
  { slug: "finance", name: "Finance", icon: "/images/finance.png" },
  { slug: "business", name: "Business", icon: "/images/business.png" },
  { slug: "wealth", name: "Wealth", icon: "/images/palmReading.svg" },
  { slug: "legal", name: "Legal", icon: "/images/matchMaking.svg" },
  { slug: "remedies", name: "Remedies", icon: "/images/poojaIcon.svg" },
  { slug: "parent", name: "Parent", icon: "/images/babyNames.svg" },
];

export default function AstrologerCategoriesHub() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return ALL_ASTROLOGY_CATEGORIES;
    const q = searchQuery.toLowerCase();
    return ALL_ASTROLOGY_CATEGORIES.filter((cat) =>
      cat.name.toLowerCase().includes(q) || cat.slug.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <main className="min-h-screen bg-[#FFFDF9] pb-24">

      {/* Hero Header Section */}
      <section className="bg-[#4A1A14] pt-28 sm:pt-36 lg:pt-44 pb-14 sm:pb-20 px-4 relative overflow-hidden">
        {/* Astrology Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="ages/astrology-bg.png"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src="/images/astrology-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#4A1A14] via-[#4A1A14]/70 to-transparent" />

        <div className="container mx-auto max-w-5xl flex flex-col items-center text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-['Inria_Serif'] mb-3 sm:mb-4 drop-shadow-md">
            Astrology Categories
          </h1>
          <p className="text-[#FDF7E1] font-helvetica text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed opacity-95">
            Select a category to consult verified astrologers specialized in your life concerns.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto max-w-6xl px-4 -mt-6 sm:-mt-8 relative z-20">

        {/* Search Bar */}
        <div className="bg-white rounded-full shadow-md p-1 sm:p-1.5 flex items-center border border-gray-200/80 max-w-md mx-auto mb-8 sm:mb-10 w-full focus-within:border-[#F6971E]/50 focus-within:shadow-[0_4px_16px_rgba(246,151,30,0.12)] transition-all">
          <div className="pl-3.5 pr-1 text-gray-400">
            <BsSearch className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search category (e.g., Marriage, Career)..."
            className="flex-grow bg-transparent border-none outline-none px-2 sm:px-3 py-1 sm:py-1.5 font-helvetica text-gray-700 placeholder:text-gray-400 text-xs sm:text-sm w-full min-w-0"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-1 text-gray-400 hover:text-gray-600 mr-1 cursor-pointer transition-colors"
              aria-label="Clear search"
            >
              <BsX className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Categories Grid - Name & Icon only */}
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-5 md:gap-6">
            {filteredCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/astrologers/category/${category.slug}`}
                className="group bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#F6971E]/20 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_25px_rgba(246,151,30,0.18)] hover:border-[#F6971E] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer"
              >
                {/* Icon Container */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-full bg-[#FFF9F0] border border-[#F6971E]/25 group-hover:border-[#F6971E] flex items-center justify-center p-3 sm:p-4 mb-3 sm:mb-3.5 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#F6971E]/10 shadow-xs">
                  <Image
                    src={category.icon}
                    alt={category.name}
                    width={48}
                    height={48}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Category Name */}
                <h2 className="text-sm sm:text-base font-bold font-helvetica text-[#4A2B23] group-hover:text-[#F6971E] transition-colors leading-tight">
                  {category.name}
                </h2>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-14 bg-white rounded-3xl border border-[#F6971E]/20 p-8 shadow-xs max-w-md mx-auto">
            <p className="text-gray-500 text-sm font-helvetica mb-4">
              No category found matching &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="bg-[#F6971E] text-white font-bold px-5 py-2 rounded-full text-xs hover:bg-[#e5850b] transition-all cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}

      </section>

    </main>
  );
}
