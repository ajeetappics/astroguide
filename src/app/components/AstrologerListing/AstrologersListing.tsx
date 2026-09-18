'use client'

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BsX } from 'react-icons/bs';
import AstrologerCard, { AstrologerData } from '../Card/AstrologerCard';
import { astrologerData } from '../AstrologerSection/AstrologerSection';

export interface AstrologersListingProps {
  initialCategory?: string;
}

const TABS = [
  "All",
  "Love",
  "Education",
  "Career",
  "Marriage",
  "Health",
  "Wealth",
  "Legal",
  "Finance",
  "Remedies",
  "Parent",
  "Business"
];

const CATEGORY_DESCRIPTIONS: Record<string, { title: string; subtitle: string }> = {
  love: {
    title: "Best Love & Relationship Astrologers",
    subtitle: "Resolve love disputes, breakups, partner compatibility, and relationship concerns with expert astrologers."
  },
  marriage: {
    title: "Top Marriage Astrologers Online",
    subtitle: "Get accurate Kundali Milan, marriage timing predictions, delay in marriage solutions, and marital harmony remedies."
  },
  career: {
    title: "Expert Career & Job Astrologers",
    subtitle: "Overcome career roadblocks, job switch doubts, promotion delays, and business ventures with astrological guidance."
  },
  education: {
    title: "Education & Exam Astrology Experts",
    subtitle: "Guidance for competitive exams, higher education choices, study concentration, and academic success."
  },
  health: {
    title: "Health & Wellness Astrologers",
    subtitle: "Astrological analysis for chronic health issues, recovery timelines, and planetary remedies for wellness."
  },
  wealth: {
    title: "Wealth & Prosperity Astrologers",
    subtitle: "Unlock financial abundance, wealth accumulation, and ancestral property guidance through Vedic astrology."
  },
  finance: {
    title: "Finance & Investment Astrologers",
    subtitle: "Expert consultation on debt clearance, investments, business finances, and financial stability."
  },
  business: {
    title: "Business & Partnership Astrologers",
    subtitle: "Choose auspicious business names, launch dates, partnership compatibility, and business growth remedies."
  },
  legal: {
    title: "Court Case & Legal Dispute Astrologers",
    subtitle: "Astrological solutions and favorable periods for property disputes, litigation, and legal matters."
  },
  remedies: {
    title: "Vedic Remedies & Gemstone Astrologers",
    subtitle: "Personalized puja recommendations, yantras, gemstones, and Vedic remedies tailored to your birth chart."
  },
  parent: {
    title: "Parenting & Child Astrology Experts",
    subtitle: "Childbirth predictions, child behavior understanding, naming ceremonies, and family well-being."
  }
};

export default function AstrologersListing({ initialCategory = "All" }: AstrologersListingProps) {
  const allAstrologers: AstrologerData[] = astrologerData;
  const router = useRouter();

  // Find matching tab case-insensitively
  const resolvedCategory = useMemo(() => {
    if (!initialCategory || initialCategory.toLowerCase() === "all") return "All";
    const match = TABS.find(t => t.toLowerCase() === initialCategory.toLowerCase());
    return match || initialCategory;
  }, [initialCategory]);

  const [activeTab, setActiveTab] = useState<string>(resolvedCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Popularity");

  // Sync if initialCategory prop changes
  useEffect(() => {
    setActiveTab(resolvedCategory);
  }, [resolvedCategory]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab.toLowerCase() === "all") {
      router.push('/astrologers');
    } else {
      router.push(`/astrologers/category/${tab.toLowerCase()}`);
    }
  };

  // Filter astrologers based on search and tab
  const filteredAstrologers = useMemo(() => {
    return allAstrologers?.filter((astro) => {
      // Tab filter
      if (activeTab !== "All") {
        const matchTab = astro.skills.some(skill =>
          skill.toLowerCase().includes(activeTab.toLowerCase())
        );
        if (!matchTab) return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = astro.name.toLowerCase().includes(q);
        const matchSkill = astro.skills.some(s => s.toLowerCase().includes(q));
        const matchLang = astro.languages.toLowerCase().includes(q);
        if (!matchName && !matchSkill && !matchLang) return false;
      }
      return true;
    }).sort((a, b) => {
      if (selectedSort === 'Price: Low to High') {
        const priceA = parseInt(a.price.replace(/[^\d]/g, '') || '0');
        const priceB = parseInt(b.price.replace(/[^\d]/g, '') || '0');
        return priceA - priceB;
      }
      if (selectedSort === 'Price: High to Low') {
        const priceA = parseInt(a.price.replace(/[^\d]/g, '') || '0');
        const priceB = parseInt(b.price.replace(/[^\d]/g, '') || '0');
        return priceB - priceA;
      }
      if (selectedSort === 'Experience: High to Low') {
        const expA = parseInt(a.experience.replace(/[^\d]/g, '') || '0');
        const expB = parseInt(b.experience.replace(/[^\d]/g, '') || '0');
        return expB - expA;
      }
      if (selectedSort === 'Experience: Low to High') {
        const expA = parseInt(a.experience.replace(/[^\d]/g, '') || '0');
        const expB = parseInt(b.experience.replace(/[^\d]/g, '') || '0');
        return expA - expB;
      }
      return 0;
    });
  }, [allAstrologers, activeTab, searchQuery, selectedSort]);

  // Dynamic headings for category landing
  const categoryInfo = activeTab !== "All"
    ? CATEGORY_DESCRIPTIONS[activeTab.toLowerCase()] || {
      title: `${activeTab} Astrologers`,
      subtitle: `Connect with India's best ${activeTab} astrologers for personal horoscope analysis and guidance.`
    }
    : {
      title: "List of Expert Astrologers",
      subtitle: "Connect with India's most genuine and experienced Vedic astrologers, tarot readers, and numerologists for instant guidance."
    };

  return (
    <main className="min-h-screen bg-[#FFFDF9] pb-24">

      {/* Hero Header Section */}
      <section className="bg-[#4A1A14] pt-28 sm:pt-36 lg:pt-44 pb-14 sm:pb-20 lg:pb-24 px-4 relative overflow-hidden">
        {/* Astrology Background Video with Overlay */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src="/images/astrology-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#4A1A14] via-transparent to-transparent opacity-80" />

        <div className="container mx-auto max-w-6xl flex flex-col items-center text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-['Inria_Serif'] mb-3 sm:mb-4 drop-shadow-md">
            {categoryInfo.title}
          </h1>
          <p className="text-[#FDF7E1] font-helvetica text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed opacity-95">
            {categoryInfo.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content Area: Floating Search, Tabs & Astrologer Grid */}
      <section className="container mx-auto max-w-7xl px-4 -mt-6 sm:-mt-8 relative z-20">

        {/* 1. Search Bar */}
        <div className="bg-white rounded-full shadow-md p-1 sm:p-1.5 flex items-center border border-gray-200/80 max-w-xl sm:max-w-2xl mx-auto mb-5 sm:mb-6 md:mb-8 w-full focus-within:border-[#F6971E]/50 focus-within:shadow-[0_4px_16px_rgba(246,151,30,0.12)] transition-all">
          <div className="pl-3 pr-1 text-gray-400">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeTab === 'All' ? 'astrologers' : `${activeTab} astrologers`} by name or skill...`}
            className="flex-grow bg-transparent border-none outline-none px-2 sm:px-3 py-1 sm:py-1.5 font-helvetica text-gray-700 placeholder:text-gray-400 text-xs sm:text-sm w-full min-w-0"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-1 text-gray-400 hover:text-gray-600 mr-1 cursor-pointer transition-colors"
              aria-label="Clear search"
            >
              <BsX className="w-4 h-4" />
            </button>
          )}
          <button className="bg-[#F6971E] text-white font-bold font-helvetica px-4 sm:px-6 py-1.5 sm:py-2 rounded-full hover:bg-[#e5850b] transition-all whitespace-nowrap shadow-xs text-xs sm:text-sm cursor-pointer">
            Search
          </button>
        </div>

        {/* 2. Tabs and Sort Row */}
        <div className="flex items-center justify-between gap-3 sm:gap-4 md:gap-8 w-full mb-6 sm:mb-8 md:mb-10">

          {/* Scrollable Tabs */}
          <div
            className="flex-1 overflow-x-auto pb-1.5 -mb-1.5"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style dangerouslySetInnerHTML={{
              __html: `
              .overflow-x-auto::-webkit-scrollbar { display: none; }
            `}} />
            <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 w-max">
              {TABS.map((tab) => {
                const isActive = activeTab.toLowerCase() === tab.toLowerCase();
                return (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`px-3.5 py-1.5 sm:px-5 sm:py-2 md:px-6 md:py-2.5 rounded-full text-xs sm:text-sm font-bold font-helvetica transition-all shadow-xs sm:shadow-sm flex-shrink-0 cursor-pointer ${isActive
                      ? 'bg-[#F6971E] text-white border-none shadow-[0_4px_10px_rgba(246,151,30,0.3)]'
                      : 'bg-white border border-gray-200 text-[#4A2B23] hover:border-[#F6971E]/50 hover:text-[#F6971E]'
                      }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort Dropdown Button */}
          <div className="flex-shrink-0 relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-1.5 sm:gap-2 bg-white border border-[#F6971E]/30 px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full font-bold text-xs sm:text-sm text-[#4A2B23] hover:border-[#F6971E] transition-all shadow-xs sm:shadow-sm cursor-pointer"
            >
              <span>Sort</span>
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F6971E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            </button>

            {/* Sort Menu */}
            {isSortOpen && (
              <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-white rounded-2xl shadow-xl border border-[#F6971E]/20 py-2 z-30">
                {["Popularity", "Price: Low to High", "Price: High to Low", "Experience: High to Low", "Experience: Low to High"].map((sortOption) => (
                  <button
                    key={sortOption}
                    onClick={() => {
                      setSelectedSort(sortOption);
                      setIsSortOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-helvetica transition-colors cursor-pointer ${selectedSort === sortOption ? 'bg-orange-50 text-[#F6971E] font-bold' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    {sortOption}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Active Filter Tags */}
        {(activeTab !== "All" || searchQuery) && (
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <span className="text-xs text-gray-500 font-medium">Active filters:</span>
            {activeTab !== "All" && (
              <span className="inline-flex items-center gap-1.5 bg-orange-50 text-[#F6971E] border border-orange-200 text-xs px-3 py-1 rounded-full font-medium">
                Category: {activeTab}
                <button
                  onClick={() => handleTabChange("All")}
                  className="hover:text-red-500 cursor-pointer"
                  title="Remove category filter"
                >
                  <BsX className="text-sm" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium">
                Search: &quot;{searchQuery}&quot;
                <button
                  onClick={() => setSearchQuery("")}
                  className="hover:text-red-500 cursor-pointer"
                  title="Remove search filter"
                >
                  <BsX className="text-sm" />
                </button>
              </span>
            )}
            <button
              onClick={() => {
                handleTabChange("All");
                setSearchQuery("");
              }}
              className="text-xs text-[#72271E] hover:underline font-bold ml-1 cursor-pointer"
            >
              Reset All
            </button>
          </div>
        )}

        {/* 3. Astrologers Grid (Clean 4-column layout on desktop) */}
        {filteredAstrologers?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {filteredAstrologers.map((astro) => (
              <AstrologerCard key={astro.id} astro={astro} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#F6971E]/20 p-8 shadow-xs max-w-lg mx-auto">
            <p className="text-gray-500 text-base font-helvetica mb-4">
              No {activeTab !== "All" ? activeTab : ""} astrologers found matching your filters.
            </p>
            <button
              onClick={() => {
                handleTabChange("All");
                setSearchQuery("");
              }}
              className="bg-[#F6971E] text-white font-bold px-6 py-2 rounded-full text-sm hover:bg-[#e5850b] transition-all cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

    </main>
  );
}
