'use client'

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsSearch, BsX } from 'react-icons/bs';
import AstrologerHeroBanner from './AstrologerHeroBanner';

export interface AstrologyCategoryItem {
  id?: string;
  slug: string;
  name: string;
  icon: string;
}

export const ALL_ASTROLOGY_CATEGORIES: AstrologyCategoryItem[] = [
  {
    id: "690dd5a901f53eb3236b5692",
    slug: "business",
    name: "Business",
    icon: "https://storage.googleapis.com/astro-vani-storage/admin/1772533406862-cooperation.png"
  },
  {
    id: "68eb9fa341fa1548bfcc7660",
    slug: "career",
    name: "Career",
    icon: "https://storage.googleapis.com/astro-vani-storage/admin/1772532058726-career-path%20(2).png"
  },
  {
    id: "68eb719866c9e3ebbf154630",
    slug: "wealth",
    name: "Wealth",
    icon: "https://storage.googleapis.com/astro-vani-storage/admin/1772532137141-wealth.png"
  },
  {
    id: "68eb718966c9e3ebbf15461c",
    slug: "education",
    name: "Education",
    icon: "https://storage.googleapis.com/astro-vani-storage/admin/1772532231978-education.png"
  },
  {
    id: "68eb716c66c9e3ebbf1545fc",
    slug: "finance",
    name: "Finance",
    icon: "https://storage.googleapis.com/astro-vani-storage/admin/1772532313076-trend.png"
  },
  {
    id: "68eb715f66c9e3ebbf1545ec",
    slug: "legal",
    name: "Legal",
    icon: "https://storage.googleapis.com/astro-vani-storage/admin/1772532384352-balance.png"
  },
  {
    id: "68eb715266c9e3ebbf1545da",
    slug: "child",
    name: "Child",
    icon: "https://storage.googleapis.com/astro-vani-storage/admin/1772532463380-child.png"
  },
  {
    id: "68eb70d666c9e3ebbf154555",
    slug: "marriage",
    name: "Marriage",
    icon: "https://storage.googleapis.com/astro-vani-storage/admin/1772532579055-wedding-rings.png"
  },
  {
    id: "68eb70c066c9e3ebbf15453d",
    slug: "love",
    name: "Love",
    icon: "https://storage.googleapis.com/astro-vani-storage/admin/1772532659489-hug.png"
  },
  {
    id: "68eb6d344b1b2d95f35b470c",
    slug: "tarot",
    name: "Tarot",
    icon: "https://storage.googleapis.com/astro-vani-storage/admin/1772532785961-tarot.png"
  },
  {
    id: "68eb6d254b1b2d95f35b46fa",
    slug: "palm-read",
    name: "Palm Read",
    icon: "https://storage.googleapis.com/astro-vani-storage/admin/1772533100276-palmistry.png"
  },
  {
    id: "68dbce5fa7ce524ef050d46d",
    slug: "health",
    name: "Health",
    icon: "https://storage.googleapis.com/astro-vani-storage/admin/1772533281668-cardiogram%20(1).png"
  }
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
      <AstrologerHeroBanner
        title="Astrology Categories"
        subtitle="Select a category to consult verified astrologers specialized in your life concerns."
      />

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
                    unoptimized
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
          searchQuery?.length ? <div className="text-center py-14 bg-white rounded-3xl border border-[#F6971E]/20 p-8 shadow-xs max-w-md mx-auto">
            <p className="text-gray-500 text-sm font-helvetica mb-4">
              No category found matching &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="bg-[#F6971E] text-white font-bold px-5 py-2 rounded-full text-xs hover:bg-[#e5850b] transition-all cursor-pointer"
            >
              Clear Search
            </button>
          </div> : <div className="text-center py-14 bg-white rounded-3xl border border-[#F6971E]/20 p-8 shadow-xs max-w-md mx-auto">
            <p className="text-gray-500 text-sm font-helvetica mb-4">
              No category found.
            </p>
          </div>
        )}

      </section>

    </main>
  );
}
