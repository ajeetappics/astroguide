'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { BsSearch, BsX, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import PoojaCard, { PujaData } from '../../components/Card/PoojaCard';
import { fetchPoojaList } from '@/services/pooja/poojaService';

const LIMIT = 10;

export default function PujasPage() {
  const sliderImages = [
    'https://storage.googleapis.com/astro-vani-storage/admin/1786718515037-Pooja_Home_page_savan_sepical.jpg',
    '/images/pooja-hero-banner.jpg',
    'https://storage.googleapis.com/astro-vani-storage/admin/1787392992312-test.jpg',
    'https://storage.googleapis.com/astro-vani-storage/admin/1782760808425-recharge.jpg'
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play for the slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  // State management for API integration
  const [poojas, setPoojas] = useState<PujaData[]>([]);
  const [rawList, setRawList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch Pooja list from API: GET /user/pooja?page=X&limit=10
  useEffect(() => {
    let isMounted = true;

    const loadPoojas = async () => {
      setIsLoading(true);
      try {
        const response = await fetchPoojaList(currentPage, LIMIT);
        if (isMounted) {
          setPoojas(response.poojas);
          setRawList(response.rawList);
          setTotalCount(response.total);
          setTotalPages(Math.max(1, response.totalPages));
        }
      } catch (err) {
        console.error('Error fetching pooja list:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadPoojas();

    return () => {
      isMounted = false;
    };
  }, [currentPage]);

  // Dynamically extract categories from the API poojas, merged with default tabs
  const categoryTabs = useMemo(() => {
    const extracted = new Set<string>();
    rawList.forEach((item: any) => {
      if (Array.isArray(item.categoryId)) {
        item.categoryId.forEach((c: any) => {
          const name = typeof c === 'string' ? c : c?.categoryName;
          if (name) extracted.add(name);
        });
      } else if (typeof item.category === 'string') {
        extracted.add(item.category);
      }
    });

    const uniqueTabs = ['All'];
    extracted.forEach((c) => {
      if (!uniqueTabs.includes(c)) uniqueTabs.push(c);
    });

    return uniqueTabs;
  }, [rawList]);

  // Client-side filtering by search query & category tab
  const filteredPujas = useMemo(() => {
    return poojas.filter((p) => {
      // 1. Category Tab Filter
      if (activeTab !== 'All') {
        const raw = p.raw || {};
        let matched = false;
        if (Array.isArray(raw.categoryId)) {
          matched = raw.categoryId.some((c: any) => {
            const name = typeof c === 'string' ? c : c?.categoryName;
            return name && name.toLowerCase() === activeTab.toLowerCase();
          });
        } else if (raw.category) {
          matched = String(raw.category).toLowerCase() === activeTab.toLowerCase();
        } else if (p.location) {
          matched = p.location.toLowerCase().includes(activeTab.toLowerCase());
        }
        if (!matched) return false;
      }

      // 2. Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = p.title.toLowerCase().includes(q);
        const inDesc = p.description.toLowerCase().includes(q);
        const inLoc = p.location ? p.location.toLowerCase().includes(q) : false;
        return inTitle || inDesc || inLoc;
      }

      return true;
    });
  }, [poojas, activeTab, searchQuery]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage || isLoading) return;
    setCurrentPage(newPage);
    const listingSection = document.getElementById('pooja-listing-grid');
    if (listingSection) {
      listingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="min-h-screen bg-[#FFFDF9] pb-[60px]">
      {/* Hero Banner Section */}
      <section className="bg-[#FFFDF9] pt-32 lg:pt-40 pb-[50px] md:pb-[70px] relative overflow-hidden">
        {/* Animated Background Decorations */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[60vh] bg-[#F6971E]/15 rounded-full blur-[80px] animate-[pulse_6s_ease-in-out_infinite]"></div>
          <div className="absolute top-[10%] right-[-10%] w-[50vw] h-[70vh] bg-[#F6971E]/20 rounded-full blur-[100px] animate-[pulse_8s_ease-in-out_infinite]"></div>
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8">
            {/* Left Content */}
            <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-1/2 space-y-4">
              <p className="text-[#F6971E] font-bold text-sm tracking-widest uppercase mb-1">
                Ancient Wisdom Meets Modern Access
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#72271E] font-['Inria_Serif'] leading-tight drop-shadow-sm">
                Sacred Pooja Services
              </h1>

              <p className="text-gray-600 font-helvetica text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Experience authentic Vedic rituals performed by certified expert priests from India&apos;s most sacred temples, delivered live to your home.
              </p>
            </div>

            {/* Right Banner Image Slider (Matching App Slider 2:1 Aspect Ratio) */}
            <div className="relative z-10 w-full lg:w-[52%] flex items-center justify-center">
              <div className="relative w-full aspect-[2/1] overflow-hidden rounded-2xl md:rounded-3xl shadow-[0_15px_35px_rgba(0,0,0,0.12)] border border-orange-100/70">
                {sliderImages.map((img, index) => {
                  let position = 0;
                  if (index === currentSlide) position = 0;
                  else if (index === (currentSlide + 1) % sliderImages.length) position = 1;
                  else position = -1;

                  return (
                    <div
                      key={index}
                      className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out cursor-pointer ${
                        position === 0
                          ? 'z-20 opacity-100 translate-x-0'
                          : position === 1
                          ? 'z-10 opacity-0 translate-x-full'
                          : 'z-10 opacity-0 -translate-x-full'
                      }`}
                      onClick={() => setCurrentSlide(index)}
                    >
                      <Image
                        src={img}
                        alt={`Pooja Slide ${index + 1}`}
                        fill
                        className="object-fill rounded-2xl md:rounded-3xl"
                        priority={index === 0}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Navigation Dots */}
              <div className="absolute -bottom-[26px] left-1/2 -translate-x-1/2 flex gap-2 z-30">
                {sliderImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === currentSlide ? 'bg-[#F6971E] w-6' : 'bg-gray-300 hover:bg-[#F6971E]/50'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Categories Section */}
      <section id="pooja-listing-grid" className="container mx-auto max-w-6xl px-4 relative z-20 pt-6">
        {/* 1. Centered Search Bar */}
        <div className="bg-white rounded-full shadow-md p-1 sm:p-1.5 flex items-center border border-gray-200/80 max-w-xl sm:max-w-2xl mx-auto mb-5 sm:mb-6 md:mb-8 w-full focus-within:border-[#F6971E]/50 focus-within:shadow-[0_4px_16px_rgba(246,151,30,0.12)] transition-all">
          <div className="pl-3 pr-1 text-gray-400">
            <BsSearch className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pooja by name, deity or temple..."
            className="flex-grow bg-transparent border-none outline-none px-2 sm:px-3 py-1 sm:py-1.5 font-helvetica text-gray-700 placeholder:text-gray-400 text-xs sm:text-sm w-full min-w-0"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
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

        {/* 2. Scrollable Category Tabs */}
        <div
          className="w-full overflow-x-auto pb-2 mb-8 md:mb-10"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `
            .overflow-x-auto::-webkit-scrollbar { display: none; }
          `
            }}
          />
          <div className="flex items-center gap-2.5 sm:gap-3 w-max">
            {categoryTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold font-helvetica transition-all shadow-xs sm:shadow-sm flex-shrink-0 cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#F6971E] text-white border-none shadow-[0_4px_10px_rgba(246,151,30,0.3)]'
                    : 'bg-white border border-gray-200 text-[#4A2B23] hover:border-[#F6971E]/50 hover:text-[#F6971E]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Section Title & Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 md:mb-8 gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold font-['Inria_Serif'] text-[#4A2B23] leading-tight mb-1 sm:mb-1.5">
              Personalized Poojas
            </h2>
            <p className="text-[#6b6b6b] font-helvetica text-xs sm:text-sm md:text-[15px]">
              Experience Real Blessings with your Personal Sankalp
            </p>
          </div>
          {totalCount > 0 && !isLoading && (
            <span className="text-xs sm:text-sm font-semibold text-[#F6971E] bg-[#FFF8EB] border border-[#F6971E]/20 px-3 py-1 rounded-full w-max">
              {totalCount} Poojas Available
            </span>
          )}
        </div>

        {/* 4. Pooja Cards Grid or Loading Skeleton */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-3.5">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm p-0 animate-pulse flex flex-col h-full"
              >
                <div className="h-[110px] sm:h-[125px] md:h-[135px] w-full bg-gray-200" />
                <div className="p-3 sm:p-3.5 space-y-2 flex-grow flex flex-col">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-2/3" />
                  <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div className="h-4 bg-gray-200 rounded w-12" />
                    <div className="h-6 bg-gray-200 rounded-full w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredPujas.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-3.5">
              {filteredPujas.map((pooja) => (
                <PoojaCard key={`pooja-${pooja.id}`} pooja={pooja} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs sm:text-sm text-gray-500 font-helvetica order-2 sm:order-1">
                  Showing Page <span className="font-bold text-[#4A2B23]">{currentPage}</span> of{' '}
                  <span className="font-bold text-[#4A2B23]">{totalPages}</span> ({totalCount} total poojas)
                </p>

                <div className="flex items-center gap-1.5 sm:gap-2 order-1 sm:order-2 flex-wrap justify-center">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || isLoading}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-[#4A2B23] bg-white hover:border-[#F6971E] hover:text-[#F6971E] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
                    aria-label="Previous Page"
                  >
                    <BsChevronLeft className="text-xs" />
                    <span>Prev</span>
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        disabled={isLoading}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                          pageNum === currentPage
                            ? 'bg-[#F6971E] text-white shadow-[0_2px_8px_rgba(246,151,30,0.35)]'
                            : 'bg-white border border-gray-200 text-[#4A2B23] hover:border-[#F6971E] hover:text-[#F6971E]'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages || isLoading}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-[#4A2B23] bg-white hover:border-[#F6971E] hover:text-[#F6971E] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
                    aria-label="Next Page"
                  >
                    <span>Next</span>
                    <BsChevronRight className="text-xs" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#F6971E]/20 p-8 shadow-sm max-w-md mx-auto">
            <p className="text-xl font-bold text-[#72271E] mb-2 font-['Inria_Serif']">No Poojas Found</p>
            <p className="text-gray-500 text-sm font-helvetica mb-4">
              {searchQuery
                ? `No pooja services match "${searchQuery}".`
                : activeTab !== 'All'
                ? `No poojas found under "${activeTab}".`
                : 'No pooja services are currently available.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveTab('All');
              }}
              className="bg-[#F6971E] text-white font-bold px-6 py-2 rounded-full text-sm hover:bg-[#e5850b] transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
