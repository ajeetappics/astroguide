'use client'

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsSearch, BsX } from 'react-icons/bs';
import AstrologerHeroBanner from './AstrologerHeroBanner';
import { fetchExpertiseList, ExpertiseCategory } from '@/services/astrologer/astrologerService';

export default function AstrologerCategoriesHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<ExpertiseCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchExpertiseList()
      .then((data) => {
        if (isMounted) {
          setCategories(data || []);
        }
      })
      .catch((err) => console.warn("Error loading expertise categories:", err))
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const q = searchQuery.toLowerCase();
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(q) || cat.slug.toLowerCase().includes(q)
    );
  }, [searchQuery, categories]);

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
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-5 md:gap-6 animate-pulse">
            {Array.from({ length: 12 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-200/60 shadow-xs flex flex-col items-center justify-center text-center"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-200 mb-3" />
                <div className="w-16 h-3 bg-gray-200 rounded-md" />
              </div>
            ))}
          </div>
        ) : filteredCategories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-5 md:gap-6">
            {filteredCategories.map((category) => (
              <Link
                key={category._id || category.slug}
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
          searchQuery?.length ? (
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
          ) : (
            <div className="text-center py-14 bg-white rounded-3xl border border-[#F6971E]/20 p-8 shadow-xs max-w-md mx-auto">
              <p className="text-gray-500 text-sm font-helvetica mb-4">
                No category found.
              </p>
            </div>
          )
        )}

      </section>

    </main>
  );
}
