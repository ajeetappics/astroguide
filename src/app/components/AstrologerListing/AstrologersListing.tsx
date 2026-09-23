'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  BsX,
  BsChevronLeft,
  BsChevronRight,
  BsShieldCheck,
  BsFillChatDotsFill,
  BsClockHistory,
  BsTranslate,
  BsChevronDown,
  BsChevronUp,
} from 'react-icons/bs';
import AstrologerCard, { AstrologerData } from '../Card/AstrologerCard';
import AstrologerHeroBanner from './AstrologerHeroBanner';
import { fetchAstroList } from '@/services/astrologer/astrologerService';

export interface AstrologersListingProps {
  initialCategory?: string;
}

const ITEMS_PER_PAGE = 20;

const getPageNumbers = (current: number, total: number): (number | string)[] => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [];
  pages.push(1);

  if (current > 3) {
    pages.push('dots-1');
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push('dots-2');
  }

  pages.push(total);
  return pages;
};

const TABS = [
  "All",
  "Business",
  "Career",
  "Wealth",
  "Education",
  "Finance",
  "Legal",
  "Child",
  "Marriage",
  "Love",
  "Tarot",
  "Palm Read",
  "Health"
];

const CATEGORY_DESCRIPTIONS: Record<string, { title: string; subtitle: string }> = {
  business: {
    title: "Business & Partnership Astrologers",
    subtitle: "Choose auspicious business names, launch dates, partnership compatibility, and business growth remedies."
  },
  career: {
    title: "Expert Career & Job Astrologers",
    subtitle: "Overcome career roadblocks, job switch doubts, promotion delays, and business ventures with astrological guidance."
  },
  wealth: {
    title: "Wealth & Prosperity Astrologers",
    subtitle: "Unlock financial abundance, wealth accumulation, and ancestral property guidance through Vedic astrology."
  },
  education: {
    title: "Education & Exam Astrology Experts",
    subtitle: "Guidance for competitive exams, higher education choices, study concentration, and academic success."
  },
  finance: {
    title: "Finance & Investment Astrologers",
    subtitle: "Expert consultation on debt clearance, investments, business finances, and financial stability."
  },
  legal: {
    title: "Court Case & Legal Dispute Astrologers",
    subtitle: "Astrological solutions and favorable periods for property disputes, litigation, and legal matters."
  },
  child: {
    title: "Child & Parenting Astrology Experts",
    subtitle: "Childbirth predictions, child behavior understanding, naming ceremonies, and family well-being."
  },
  marriage: {
    title: "Top Marriage Astrologers Online",
    subtitle: "Get accurate Kundali Milan, marriage timing predictions, delay in marriage solutions, and marital harmony remedies."
  },
  love: {
    title: "Best Love & Relationship Astrologers",
    subtitle: "Resolve love disputes, breakups, partner compatibility, and relationship concerns with expert astrologers."
  },
  tarot: {
    title: "Tarot Card Readers Online",
    subtitle: "Intuitive tarot reading for clarity in love, career, major life decisions, and personal dilemmas."
  },
  "palm read": {
    title: "Palm Reading & Hastrekha Experts",
    subtitle: "In-depth palmistry analysis for future predictions, life line, career line, and destiny insights."
  },
  "palm-read": {
    title: "Palm Reading & Hastrekha Experts",
    subtitle: "In-depth palmistry analysis for future predictions, life line, career line, and destiny insights."
  },
  health: {
    title: "Health & Wellness Astrologers",
    subtitle: "Astrological analysis for chronic health issues, recovery timelines, and planetary remedies for wellness."
  }
};

const ASTROLOGER_FAQS = [
  {
    question: "How can I consult an astrologer online on Balaji AstroGuide?",
    answer: "Browse our directory of verified astrologers, view their specializations, experience, ratings, and language preferences. Once you choose the right astrologer, click 'Consult Now' to instantly start a chat or call session."
  },
  {
    question: "Are the astrologers on Balaji AstroGuide genuine and verified?",
    answer: "Yes, 100%. Every astrologer on Balaji AstroGuide goes through a rigorous multi-stage verification process by senior Vedic scholars to assess their subject mastery, experience, and prediction accuracy."
  },
  {
    question: "What details do I need to provide for an accurate horoscope reading?",
    answer: "To calculate your Janam Kundali (birth chart) accurately, you need to provide your Date of Birth, exact Time of Birth, and Place of Birth. If birth time is unknown, our astrologers can also consult using Prashna Kundali, Palmistry, or Tarot reading."
  },
  {
    question: "Can online astrologers help with marriage and relationship problems?",
    answer: "Yes. Our love and relationship experts specialize in Kundali Milan (Gun Milan), Manglik dosha analysis, delay in marriage remedies, love compatibility, and resolving relationship discord through proven Vedic remedies."
  },
  {
    question: "Is my personal information and consultation confidential?",
    answer: "Absolutely. Balaji AstroGuide ensures complete end-to-end privacy and confidentiality. Your personal information, birth details, and chat conversations are completely secure and never shared with third parties."
  },
  {
    question: "Which astrology systems and services are available?",
    answer: "Balaji AstroGuide hosts top experts across Vedic Astrology, KP System, Nadi Astrology, Tarot Card Reading, Numerology, Vastu Shastra, Gemstone Consultation, and Palmistry."
  }
];

export default function AstrologersListing({ initialCategory = "All" }: AstrologersListingProps) {
  // Find matching tab case-insensitively
  const resolvedCategory = useMemo(() => {
    if (!initialCategory || initialCategory.toLowerCase() === "all") return "All";
    const match = TABS.find(t => t.toLowerCase() === initialCategory.toLowerCase());
    return match || initialCategory;
  }, [initialCategory]);

  const [activeTab, setActiveTab] = useState<string>(resolvedCategory);
  const [allAstrologers, setAllAstrologers] = useState<AstrologerData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const router = useRouter();

  // Sync if initialCategory prop changes
  useEffect(() => {
    setActiveTab(resolvedCategory);
    setCurrentPage(1);
  }, [resolvedCategory]);

  useEffect(() => {
    let isMounted = true;
    const loadAstrologers = async () => {
      try {
        setIsLoading(true);
        const expertiseParam =
          activeTab && activeTab.toLowerCase() !== "all"
            ? activeTab.toLowerCase()
            : undefined;

        const { astrologers: apiList, total, totalPages: pages } = await fetchAstroList(
          currentPage,
          ITEMS_PER_PAGE,
          expertiseParam,
          searchQuery
        );
        if (isMounted) {
          setAllAstrologers(apiList || []);
          setTotalCount(total || 0);
          setTotalPages(pages || 1);
        }
      } catch (err) {
        console.error("Error loading astrologers from API:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      loadAstrologers();
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [activeTab, currentPage, searchQuery]);

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Popularity");

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      setCurrentPage(newPage);
      const section = document.getElementById('astrologer-listing-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
    if (tab.toLowerCase() === "all") {
      router.push('/astrologers');
    } else {
      router.push(`/astrologers/category/${tab.toLowerCase()}`);
    }
  };

  // Sort astrologers based on selectedSort (Search is managed dynamically via API)
  const filteredAstrologers = useMemo(() => {
    if (!allAstrologers || allAstrologers.length === 0) return [];
    return [...allAstrologers].sort((a, b) => {
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
  }, [allAstrologers, selectedSort]);

  // Dynamic headings for category landing
  const categoryInfo = activeTab !== "All"
    ? CATEGORY_DESCRIPTIONS[activeTab.toLowerCase()] || {
      title: `${activeTab} Astrologers Online`,
      subtitle: `Connect with India's best ${activeTab} astrologers for personal horoscope analysis, accurate predictions, and Vedic remedies.`
    }
    : {
      title: "Talk to Best Astrologers Online - Verified Vedic Astrologers",
      subtitle: "Connect with India's most genuine and experienced Vedic astrologers, tarot readers, and numerologists for instant chat & call consultation."
    };

  return (
    <main className="min-h-screen bg-[#FFFDF9] pb-24">

      {/* Hero Header Section */}
      <AstrologerHeroBanner
        title={categoryInfo.title}
        subtitle={categoryInfo.subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: activeTab === "All" ? "Astrologers" : `${activeTab} Astrologers` }
        ]}
      />

      {/* Main Content Area: Floating Search, Tabs & Astrologer Grid */}
      <section id="astrologer-listing-section" className="container mx-auto max-w-7xl px-4 -mt-6 sm:-mt-8 relative z-20">

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
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={`Search ${activeTab === 'All' ? 'astrologers' : `${activeTab} astrologers`} by name or skill...`}
            className="flex-grow bg-transparent border-none outline-none px-2 sm:px-3 py-1 sm:py-1.5 font-helvetica text-gray-700 placeholder:text-gray-400 text-xs sm:text-sm w-full min-w-0"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setCurrentPage(1);
              }}
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
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-[340px] border border-gray-100 p-4 flex flex-col justify-between shadow-xs">
                <div className="w-full h-44 bg-gray-200 rounded-xl mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded-xl w-full"></div>
              </div>
            ))}
          </div>
        ) : filteredAstrologers?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {filteredAstrologers.map((astro) => (
              <AstrologerCard key={astro.id} astro={astro} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#F6971E]/20 p-8 shadow-xs max-w-lg mx-auto">
            <p className="text-gray-500 text-base font-helvetica mb-4">
              {searchQuery.trim()
                ? `No astrologers found matching "${searchQuery}".`
                : activeTab && activeTab.toLowerCase() !== "all"
                ? `No ${activeTab} astrologers found matching your filters.`
                : "No astrologers found."}
            </p>
            {Boolean((activeTab && activeTab.toLowerCase() !== "all") || searchQuery.trim()) && (
              <button
                onClick={() => {
                  handleTabChange("All");
                  setSearchQuery("");
                }}
                className="bg-[#F6971E] text-white font-bold px-6 py-2 rounded-full text-sm hover:bg-[#e5850b] transition-all cursor-pointer"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* 4. Pagination Controls */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
            {/* Showing Info */}
            <p className="text-xs sm:text-sm text-gray-500 font-helvetica order-2 sm:order-1">
              Showing <span className="font-semibold text-[#4A2B23]">{totalCount > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}</span> - <span className="font-semibold text-[#4A2B23]">{Math.min(currentPage * ITEMS_PER_PAGE, totalCount)}</span> of <span className="font-semibold text-[#4A2B23]">{totalCount}</span> astrologers
            </p>

            {/* Pagination Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2 order-1 sm:order-2 flex-wrap justify-center">
              {/* Prev Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
                className="flex items-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-gray-200 text-xs sm:text-sm font-bold text-[#4A2B23] bg-white hover:border-[#F6971E] hover:text-[#F6971E] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-[#4A2B23] transition-all shadow-xs cursor-pointer"
                aria-label="Previous Page"
              >
                <BsChevronLeft className="text-xs sm:text-sm" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                {getPageNumbers(currentPage, totalPages).map((p, idx) => {
                  if (typeof p === 'string') {
                    return (
                      <span key={`dots-${idx}`} className="px-1.5 sm:px-2 text-xs sm:text-sm text-gray-400 font-bold select-none">
                        ...
                      </span>
                    );
                  }
                  const isCurrent = p === currentPage;
                  return (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p)}
                      disabled={isLoading}
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center transition-all cursor-pointer ${isCurrent
                          ? 'bg-[#F6971E] text-white shadow-[0_4px_10px_rgba(246,151,30,0.3)]'
                          : 'bg-white border border-gray-200 text-[#4A2B23] hover:border-[#F6971E] hover:text-[#F6971E]'
                        }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isLoading}
                className="flex items-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-gray-200 text-xs sm:text-sm font-bold text-[#4A2B23] bg-white hover:border-[#F6971E] hover:text-[#F6971E] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-[#4A2B23] transition-all shadow-xs cursor-pointer"
                aria-label="Next Page"
              >
                <span className="hidden sm:inline">Next</span>
                <BsChevronRight className="text-xs sm:text-sm" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 5. SEO Section: Why Consult Astrologers on Balaji AstroGuide */}
      <section className="container mx-auto max-w-6xl px-4 mt-16 sm:mt-20">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-[#F6971E] text-xs sm:text-sm font-bold tracking-widest uppercase mb-1.5 block">
            Why Choose Us
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-['Inria_Serif'] text-[#4A2B23] mb-3">
            Why Consult Astrologers on Balaji AstroGuide?
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
            Experience authentic Vedic astrology guidance with complete privacy, verified experts, and accurate life solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#F6971E]/15 shadow-xs hover:shadow-md hover:border-[#F6971E]/40 transition-all text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-[#FFF8EB] border border-[#F6971E]/30 flex items-center justify-center text-[#F6971E] text-2xl mb-3.5">
              <BsShieldCheck />
            </div>
            <h3 className="text-[#4A2B23] font-bold text-base mb-1.5 font-helvetica">100% Verified Experts</h3>
            <p className="text-gray-500 text-xs leading-relaxed">
              Every astrologer undergoes rigorous multi-level verification and prediction accuracy assessment.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#F6971E]/15 shadow-xs hover:shadow-md hover:border-[#F6971E]/40 transition-all text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-[#FFF8EB] border border-[#F6971E]/30 flex items-center justify-center text-[#F6971E] text-xl mb-3.5">
              <BsClockHistory />
            </div>
            <h3 className="text-[#4A2B23] font-bold text-base mb-1.5 font-helvetica">24/7 Availability</h3>
            <p className="text-gray-500 text-xs leading-relaxed">
              Connect anytime, day or night, for instant guidance when making critical life decisions.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#F6971E]/15 shadow-xs hover:shadow-md hover:border-[#F6971E]/40 transition-all text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-[#FFF8EB] border border-[#F6971E]/30 flex items-center justify-center text-[#F6971E] text-xl mb-3.5">
              <BsFillChatDotsFill />
            </div>
            <h3 className="text-[#4A2B23] font-bold text-base mb-1.5 font-helvetica">Complete Confidentiality</h3>
            <p className="text-gray-500 text-xs leading-relaxed">
              Your personal data, birth chart details, and discussions remain 100% private and encrypted.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#F6971E]/15 shadow-xs hover:shadow-md hover:border-[#F6971E]/40 transition-all text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-[#FFF8EB] border border-[#F6971E]/30 flex items-center justify-center text-[#F6971E] text-xl mb-3.5">
              <BsTranslate />
            </div>
            <h3 className="text-[#4A2B23] font-bold text-base mb-1.5 font-helvetica">Multi-Language Consult</h3>
            <p className="text-gray-500 text-xs leading-relaxed">
              Consult comfortably in Hindi, English, Punjabi, Marathi, Gujarati, Bengali, and more.
            </p>
          </div>
        </div>
      </section>

      {/* 6. SEO Section: Frequently Asked Questions (Accordion) */}
      <section className="container mx-auto max-w-4xl px-4 mt-16 sm:mt-20">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-[#F6971E] text-xs sm:text-sm font-bold tracking-widest uppercase mb-1.5 block">
            Common Inquiries
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-['Inria_Serif'] text-[#4A2B23] mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
            Find quick answers about consulting online astrologers, birth chart accuracy, and consultation privacy.
          </p>
        </div>

        <div className="space-y-3">
          {ASTROLOGER_FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full text-left px-4 sm:px-6 py-4 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#4A2B23] hover:text-[#F6971E] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="leading-snug">{faq.question}</span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-[#F6971E] text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                    {isOpen ? <BsChevronUp className="w-3.5 h-3.5" /> : <BsChevronDown className="w-3.5 h-3.5" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-6 pb-4 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </main>
  );
}
