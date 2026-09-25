'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BsSearch, BsX, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import PoojaCard, { PujaData } from '../../components/Card/PoojaCard';
import { usePoojaConfig } from '@/app/context/PoojaConfigContext';
import { BannerSlide } from '@/services/banner/bannerService';
import {
  fetchPoojaList,
  fetchPoojaCategories,
  fetchTrendingPoojas,
  fetchRecommendedPoojas,
  fetchNegativeEnergyPoojas,
  fetchPoojaBanners,
  PoojaCategory,
} from '@/services/pooja/poojaService';

const LIMIT = 15;

interface SectionData {
  poojas: PujaData[];
  title: string;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  isLoading: boolean;
}

export default function PoojaListingClient() {
  const router = useRouter();
  const { isPoojaEnabled } = usePoojaConfig();
  const [webSlides, setWebSlides] = useState<BannerSlide[]>([]);
  const [mobileSlides, setMobileSlides] = useState<BannerSlide[]>([]);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!isPoojaEnabled) {
      router.replace('/');
    }
  }, [isPoojaEnabled, router]);

  // Detect mobile & tablet view (< 1024px)
  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch dynamic banners from /user/pooja-banner
  useEffect(() => {
    if (!isPoojaEnabled) return;
    let isMounted = true;
    const loadBanners = async () => {
      try {
        const bannersData = await fetchPoojaBanners();
        if (isMounted) {
          if (bannersData.webHeroSlides && bannersData.webHeroSlides.length > 0) {
            setWebSlides(bannersData.webHeroSlides);
          } else if (bannersData.heroSlides && bannersData.heroSlides.length > 0) {
            setWebSlides(bannersData.heroSlides);
          }

          if (bannersData.mobileHeroSlides && bannersData.mobileHeroSlides.length > 0) {
            setMobileSlides(bannersData.mobileHeroSlides);
          } else if (bannersData.heroSlides && bannersData.heroSlides.length > 0) {
            setMobileSlides(bannersData.heroSlides);
          }
        }
      } catch (err) {
        console.error('Error fetching pooja banners:', err);
      }
    };

    loadBanners();
    return () => {
      isMounted = false;
    };
  }, []);

  // Select active slides based on screen: forMobile on Mobile/Tab, forWeb on Web/Desktop
  const currentSlides = isMobileOrTablet
    ? (mobileSlides.length > 0 ? mobileSlides : webSlides)
    : (webSlides.length > 0 ? webSlides : mobileSlides);

  // Reset index if out of bounds
  useEffect(() => {
    if (currentSlide >= currentSlides.length) {
      setCurrentSlide(0);
    }
  }, [currentSlides.length, currentSlide]);

  // Auto-play for the slider
  useEffect(() => {
    if (currentSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % currentSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [currentSlides.length]);

  // State management for API integration
  const [poojas, setPoojas] = useState<PujaData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [activeCategoryId, setActiveCategoryId] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoriesList, setCategoriesList] = useState<PoojaCategory[]>([]);

  // 3 home sections for default view (when no search / filter applied)
  const [trendingData, setTrendingData] = useState<SectionData>({
    poojas: [],
    title: 'Trending Poojas',
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    isLoading: false,
  });
  const [recommendedData, setRecommendedData] = useState<SectionData>({
    poojas: [],
    title: 'Recommended Poojas',
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    isLoading: false,
  });
  const [negativeEnergyData, setNegativeEnergyData] = useState<SectionData>({
    poojas: [],
    title: 'Negative Energy Removal',
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    isLoading: false,
  });
  const [isSectionsLoading, setIsSectionsLoading] = useState(true);

  // Fetch the 3 default sections on mount (15 items each)
  useEffect(() => {
    if (!isPoojaEnabled) {
      setIsSectionsLoading(false);
      return;
    }
    let isMounted = true;
    const loadDefaultSections = async () => {
      try {
        setIsSectionsLoading(true);
        const [trendingRes, recommendedRes, negativeEnergyRes] = await Promise.all([
          fetchTrendingPoojas(1, 15),
          fetchRecommendedPoojas(1, 15),
          fetchNegativeEnergyPoojas(1, 15),
        ]);

        if (isMounted) {
          if (trendingRes?.poojas?.length) {
            setTrendingData({
              poojas: trendingRes.poojas,
              title: trendingRes.title || 'Trending Poojas',
              currentPage: trendingRes.currentPage || 1,
              totalPages: Math.max(1, trendingRes.totalPages),
              totalCount: trendingRes.total || trendingRes.poojas.length,
              isLoading: false,
            });
          }
          if (recommendedRes?.poojas?.length) {
            setRecommendedData({
              poojas: recommendedRes.poojas,
              title: recommendedRes.title || 'Recommended Poojas',
              currentPage: recommendedRes.currentPage || 1,
              totalPages: Math.max(1, recommendedRes.totalPages),
              totalCount: recommendedRes.total || recommendedRes.poojas.length,
              isLoading: false,
            });
          }
          if (negativeEnergyRes?.poojas?.length) {
            setNegativeEnergyData({
              poojas: negativeEnergyRes.poojas,
              title: negativeEnergyRes.title || 'Negative Energy Removal',
              currentPage: negativeEnergyRes.currentPage || 1,
              totalPages: Math.max(1, negativeEnergyRes.totalPages),
              totalCount: negativeEnergyRes.total || negativeEnergyRes.poojas.length,
              isLoading: false,
            });
          }
        }
      } catch (err) {
        console.error('Error fetching pooja sections:', err);
      } finally {
        if (isMounted) {
          setIsSectionsLoading(false);
        }
      }
    };

    loadDefaultSections();
    return () => {
      isMounted = false;
    };
  }, []);

  // Section-specific page handlers
  const handleTrendingPageChange = async (newPage: number) => {
    if (newPage < 1 || newPage > trendingData.totalPages || newPage === trendingData.currentPage || trendingData.isLoading) return;
    setTrendingData((prev) => ({ ...prev, isLoading: true }));
    try {
      const res = await fetchTrendingPoojas(newPage, LIMIT);
      setTrendingData((prev) => ({
        ...prev,
        poojas: res.poojas,
        currentPage: res.currentPage || newPage,
        totalPages: Math.max(1, res.totalPages),
        totalCount: res.total,
        title: res.title || prev.title,
        isLoading: false,
      }));
      const el = document.getElementById('section-trending');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (err) {
      console.error('Error changing trending page:', err);
      setTrendingData((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleRecommendedPageChange = async (newPage: number) => {
    if (newPage < 1 || newPage > recommendedData.totalPages || newPage === recommendedData.currentPage || recommendedData.isLoading) return;
    setRecommendedData((prev) => ({ ...prev, isLoading: true }));
    try {
      const res = await fetchRecommendedPoojas(newPage, LIMIT);
      setRecommendedData((prev) => ({
        ...prev,
        poojas: res.poojas,
        currentPage: res.currentPage || newPage,
        totalPages: Math.max(1, res.totalPages),
        totalCount: res.total,
        title: res.title || prev.title,
        isLoading: false,
      }));
      const el = document.getElementById('section-recommended');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (err) {
      console.error('Error changing recommended page:', err);
      setRecommendedData((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleNegativeEnergyPageChange = async (newPage: number) => {
    if (newPage < 1 || newPage > negativeEnergyData.totalPages || newPage === negativeEnergyData.currentPage || negativeEnergyData.isLoading) return;
    setNegativeEnergyData((prev) => ({ ...prev, isLoading: true }));
    try {
      const res = await fetchNegativeEnergyPoojas(newPage, LIMIT);
      setNegativeEnergyData((prev) => ({
        ...prev,
        poojas: res.poojas,
        currentPage: res.currentPage || newPage,
        totalPages: Math.max(1, res.totalPages),
        totalCount: res.total,
        title: res.title || prev.title,
        isLoading: false,
      }));
      const el = document.getElementById('section-negative-energy');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (err) {
      console.error('Error changing negative energy page:', err);
      setNegativeEnergyData((prev) => ({ ...prev, isLoading: false }));
    }
  };

  // Fetch categories dynamically: GET /user/category?page=1&limit=10
  useEffect(() => {
    let isMounted = true;
    const loadCategories = async () => {
      try {
        const fetched = await fetchPoojaCategories(1, 10);
        if (isMounted && fetched && fetched.length > 0) {
          setCategoriesList(fetched);
        }
      } catch (err) {
        console.error('Error fetching categories from /user/category:', err);
      }
    };

    loadCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  // Merge "All" with categoriesList
  const categories: PoojaCategory[] = useMemo(() => {
    const allItem: PoojaCategory = {
      _id: 'All',
      categoryName: 'All',
      icon: '',
    };
    return [allItem, ...categoriesList];
  }, [categoriesList]);

  const trimmedSearch = searchQuery.trim();
  const effectiveSearch = trimmedSearch.length >= 3 ? trimmedSearch : '';

  // Fetch Pooja list for search or category filter:
  // - Category filter: GET /user/pooja/category/:id?page=X&limit=15&poojaName=...
  // - Search filter: GET /user/pooja?page=X&limit=15&poojaName=...
  useEffect(() => {
    const isFilter = Boolean(effectiveSearch || activeCategoryId !== 'All');
    if (!isFilter) {
      return;
    }

    let isMounted = true;

    const loadPoojas = async () => {
      setIsLoading(true);
      try {
        const catParam = activeCategoryId !== 'All' ? activeCategoryId : undefined;
        const response = await fetchPoojaList(currentPage, LIMIT, catParam, effectiveSearch);
        if (isMounted) {
          setPoojas(response.poojas);
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

    const timer = setTimeout(() => {
      loadPoojas();
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [currentPage, activeCategoryId, effectiveSearch]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage || isLoading) return;
    setCurrentPage(newPage);
    const listingSection = document.getElementById('pooja-listing-grid');
    if (listingSection) {
      listingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderPagination = (
    cPage: number,
    tPages: number,
    tCount: number,
    onPage: (page: number) => void,
    loading?: boolean
  ) => {
    if (tPages <= 1) return null;

    let pages: (number | string)[] = [];
    if (tPages <= 5) {
      pages = Array.from({ length: tPages }, (_, i) => i + 1);
    } else {
      pages.push(1);
      const start = Math.max(2, cPage - 1);
      const end = Math.min(tPages - 1, cPage + 1);
      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (end < tPages - 1) pages.push('...');
      pages.push(tPages);
    }

    return (
      <div className="mt-8 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs sm:text-sm text-gray-500 font-helvetica order-2 sm:order-1">
          Showing Page <span className="font-bold text-[#4A2B23]">{cPage}</span> of{' '}
          <span className="font-bold text-[#4A2B23]">{tPages}</span> ({tCount} total poojas)
        </p>

        <div className="flex items-center gap-1.5 sm:gap-2 order-1 sm:order-2 flex-wrap justify-center">
          <button
            onClick={() => onPage(cPage - 1)}
            disabled={cPage <= 1 || loading}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-[#4A2B23] bg-white hover:border-[#F6971E] hover:text-[#F6971E] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
            aria-label="Previous Page"
          >
            <BsChevronLeft className="text-xs" />
            <span>Prev</span>
          </button>

          <div className="flex items-center gap-1">
            {pages.map((item, idx) => {
              if (typeof item === 'string') {
                return (
                  <span key={`dots-${idx}`} className="px-1 text-gray-400 font-bold text-xs">
                    ...
                  </span>
                );
              }
              return (
                <button
                  key={item}
                  onClick={() => onPage(item)}
                  disabled={loading}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                    item === cPage
                      ? 'bg-[#F6971E] text-white shadow-[0_2px_8px_rgba(246,151,30,0.35)]'
                      : 'bg-white border border-gray-200 text-[#4A2B23] hover:border-[#F6971E] hover:text-[#F6971E]'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onPage(cPage + 1)}
            disabled={cPage >= tPages || loading}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-[#4A2B23] bg-white hover:border-[#F6971E] hover:text-[#F6971E] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
            aria-label="Next Page"
          >
            <span>Next</span>
            <BsChevronRight className="text-xs" />
          </button>
        </div>
      </div>
    );
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
              {currentSlides.length > 0 ? (
                <>
                  <div className="relative w-full aspect-[2/1] overflow-hidden rounded-2xl md:rounded-3xl shadow-[0_15px_35px_rgba(0,0,0,0.12)] border border-orange-100/70">
                    {currentSlides.map((slide, index) => {
                      let position = 0;
                      if (index === currentSlide) position = 0;
                      else if (index === (currentSlide + 1) % currentSlides.length) position = 1;
                      else position = -1;

                      const hasLink = Boolean(slide.href && slide.href !== '#');

                      const slideContent = (
                        <div
                          className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out ${
                            hasLink ? 'cursor-pointer' : ''
                          } ${
                            position === 0
                              ? 'z-20 opacity-100 translate-x-0'
                              : position === 1
                                ? 'z-10 opacity-0 translate-x-full'
                                : 'z-10 opacity-0 -translate-x-full'
                          }`}
                        >
                          <Image
                            src={slide.imageUrl}
                            alt={`Pooja Slide ${index + 1}`}
                            fill
                            unoptimized
                            className="object-fill rounded-2xl md:rounded-3xl"
                            priority={index === 0}
                          />
                        </div>
                      );

                      return hasLink ? (
                        <Link key={index} href={slide.href!}>
                          {slideContent}
                        </Link>
                      ) : (
                        <div key={index} onClick={() => setCurrentSlide(index)}>
                          {slideContent}
                        </div>
                      );
                    })}
                  </div>

                  {/* Navigation Dots */}
                  {currentSlides.length > 1 && (
                    <div className="absolute -bottom-[26px] left-1/2 -translate-x-1/2 flex gap-2 z-30">
                      {currentSlides.map((_, idx) => (
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
                  )}
                </>
              ) : (
                <div className="w-full aspect-[2/1] rounded-2xl md:rounded-3xl bg-gray-200/80 animate-pulse border border-orange-100/70 shadow-[0_15px_35px_rgba(0,0,0,0.05)]" />
              )}
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
            onChange={(e) => {
              const val = e.target.value;
              setSearchQuery(val);
              if (val.trim().length >= 3 || val.trim().length === 0) {
                setCurrentPage(1);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (searchQuery.trim().length >= 3) {
                  setCurrentPage(1);
                }
              }
            }}
            placeholder="Search pooja by name, deity or temple..."
            className="flex-grow bg-transparent border-none outline-none px-2 sm:px-3 py-1 sm:py-1.5 font-helvetica text-gray-700 placeholder:text-gray-400 text-xs sm:text-sm w-full min-w-0"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setCurrentPage(1);
              }}
              className="p-1 text-gray-400 hover:text-gray-600 mr-1 cursor-pointer transition-colors"
              aria-label="Clear search"
            >
              <BsX className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              if (searchQuery.trim().length >= 3) {
                setCurrentPage(1);
              }
            }}
            className="bg-[#F6971E] text-white font-bold font-helvetica px-4 sm:px-6 py-1.5 sm:py-2 rounded-full hover:bg-[#e5850b] transition-all whitespace-nowrap shadow-xs text-xs sm:text-sm cursor-pointer"
          >
            Search
          </button>
        </div>
        {searchQuery.trim().length > 0 && searchQuery.trim().length < 3 && (
          <p className="text-[11px] sm:text-xs text-[#F6971E] text-center -mt-3 sm:-mt-4 mb-4 font-medium animate-in fade-in">
            Type at least 3 characters to search...
          </p>
        )}

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
          <div className="flex items-center gap-2.5 sm:gap-3 w-max py-1">
            {categories.map((cat) => {
              const isSelected = activeCategoryId === cat._id;
              return (
                <button
                  key={cat._id}
                  onClick={() => {
                    setActiveCategoryId(cat._id);
                    setCurrentPage(1);
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold font-helvetica transition-all shadow-xs sm:shadow-sm flex-shrink-0 cursor-pointer ${isSelected
                    ? 'bg-[#F6971E] text-white border border-[#F6971E] shadow-[0_4px_12px_rgba(246,151,30,0.3)] scale-[1.02]'
                    : 'bg-white border border-gray-200/90 text-[#4A2B23] hover:border-[#F6971E]/50 hover:text-[#F6971E]'
                    }`}
                >
                  {cat.icon ? (
                    <img
                      src={cat.icon}
                      alt={cat.categoryName}
                      className="w-4 h-4 sm:w-5 sm:h-5 object-contain flex-shrink-0"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : null}
                  <span className="text-xs sm:text-sm font-bold font-helvetica whitespace-nowrap">{cat.categoryName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area: Either Filter/Search Results OR the 3 Default Sections */}
        {effectiveSearch || activeCategoryId !== 'All' ? (
          /* Filter/Search Results View */
          <>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 md:mb-8 gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold font-['Inria_Serif'] text-[#4A2B23] leading-tight mb-1 sm:mb-1.5">
                  {effectiveSearch
                    ? `Search Results for "${effectiveSearch}"`
                    : `${categories.find((c) => c._id === activeCategoryId)?.categoryName || 'Category'} Poojas`}
                </h2>
                <p className="text-[#6b6b6b] font-helvetica text-xs sm:text-sm md:text-[15px]">
                  {effectiveSearch ? 'Showing matching sacred poojas' : 'Browse poojas by selected category'}
                </p>
              </div>
              {totalCount > 0 && !isLoading && (
                <span className="text-xs sm:text-sm font-semibold text-[#F6971E] bg-[#FFF8EB] border border-[#F6971E]/20 px-3 py-1 rounded-full w-max">
                  {totalCount} Poojas Available
                </span>
              )}
            </div>

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
            ) : poojas.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-3.5">
                  {poojas.map((pooja) => (
                    <PoojaCard key={`pooja-${pooja.id}`} pooja={pooja} />
                  ))}
                </div>

                {/* Pagination Controls */}
                {renderPagination(currentPage, totalPages, totalCount, handlePageChange, isLoading)}
              </>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#F6971E]/20 p-8 shadow-sm max-w-md mx-auto">
                <p className="text-xl font-bold text-[#72271E] mb-2 font-['Inria_Serif']">No Poojas Found</p>
                <p className="text-gray-500 text-sm font-helvetica mb-4">
                  {effectiveSearch
                    ? `No pooja services match "${effectiveSearch}".`
                    : `No poojas found under "${categories.find((c) => c._id === activeCategoryId)?.categoryName || activeCategoryId}".`}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategoryId('All');
                    setCurrentPage(1);
                  }}
                  className="bg-[#F6971E] text-white font-bold px-6 py-2 rounded-full text-sm hover:bg-[#e5850b] transition-all cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </>
        ) : (
          /* Default View: 3 Custom Sections (Trending, Recommended, Negative Energy Removal) */
          <div className="space-y-10 sm:space-y-14">
            {isSectionsLoading ? (
              /* Loading Skeletons for Sections */
              <div className="space-y-12">
                {[1, 2, 3].map((sec) => (
                  <div key={sec} className="space-y-4">
                    <div className="h-7 sm:h-8 bg-gray-200 rounded-lg w-52 animate-pulse mb-3" />
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-3.5">
                      {Array.from({ length: 4 }).map((_, idx) => (
                        <div
                          key={idx}
                          className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm p-0 animate-pulse flex flex-col h-[280px]"
                        >
                          <div className="h-[110px] sm:h-[125px] md:h-[135px] w-full bg-gray-200" />
                          <div className="p-3 sm:p-3.5 space-y-2 flex-grow flex flex-col">
                            <div className="h-4 bg-gray-200 rounded w-3/4" />
                            <div className="h-3 bg-gray-100 rounded w-full" />
                            <div className="h-3 bg-gray-100 rounded w-2/3" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* 1. Trending Pooja Section */}
                {trendingData.poojas.length > 0 && (
                  <section id="section-trending">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-6 gap-2">
                      <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[30px] font-bold font-['Inria_Serif'] text-[#4A2B23] leading-tight">
                          {trendingData.title}
                        </h2>
                      </div>
                      {trendingData.totalCount > 0 && (
                        <span className="text-xs sm:text-sm font-semibold text-[#F6971E] bg-[#FFF8EB] border border-[#F6971E]/20 px-3 py-1 rounded-full w-max">
                          {trendingData.totalCount} Poojas Available
                        </span>
                      )}
                    </div>
                    <div className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-3.5 transition-opacity ${trendingData.isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
                      {trendingData.poojas.map((pooja) => (
                        <PoojaCard key={`trending-${pooja.id}`} pooja={pooja} />
                      ))}
                    </div>
                    {renderPagination(
                      trendingData.currentPage,
                      trendingData.totalPages,
                      trendingData.totalCount,
                      handleTrendingPageChange,
                      trendingData.isLoading
                    )}
                  </section>
                )}

                {/* 2. Recommended Pooja Section */}
                {recommendedData.poojas.length > 0 && (
                  <section id="section-recommended">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-6 gap-2">
                      <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[30px] font-bold font-['Inria_Serif'] text-[#4A2B23] leading-tight">
                          {recommendedData.title}
                        </h2>
                      </div>
                      {recommendedData.totalCount > 0 && (
                        <span className="text-xs sm:text-sm font-semibold text-[#F6971E] bg-[#FFF8EB] border border-[#F6971E]/20 px-3 py-1 rounded-full w-max">
                          {recommendedData.totalCount} Poojas Available
                        </span>
                      )}
                    </div>
                    <div className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-3.5 transition-opacity ${recommendedData.isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
                      {recommendedData.poojas.map((pooja) => (
                        <PoojaCard key={`recommended-${pooja.id}`} pooja={pooja} />
                      ))}
                    </div>
                    {renderPagination(
                      recommendedData.currentPage,
                      recommendedData.totalPages,
                      recommendedData.totalCount,
                      handleRecommendedPageChange,
                      recommendedData.isLoading
                    )}
                  </section>
                )}

                {/* 3. Negative Energy Removal Pooja Section */}
                {negativeEnergyData.poojas.length > 0 && (
                  <section id="section-negative-energy">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-6 gap-2">
                      <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[30px] font-bold font-['Inria_Serif'] text-[#4A2B23] leading-tight">
                          {negativeEnergyData.title}
                        </h2>
                      </div>
                      {negativeEnergyData.totalCount > 0 && (
                        <span className="text-xs sm:text-sm font-semibold text-[#F6971E] bg-[#FFF8EB] border border-[#F6971E]/20 px-3 py-1 rounded-full w-max">
                          {negativeEnergyData.totalCount} Poojas Available
                        </span>
                      )}
                    </div>
                    <div className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-3.5 transition-opacity ${negativeEnergyData.isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
                      {negativeEnergyData.poojas.map((pooja) => (
                        <PoojaCard key={`negative-${pooja.id}`} pooja={pooja} />
                      ))}
                    </div>
                    {renderPagination(
                      negativeEnergyData.currentPage,
                      negativeEnergyData.totalPages,
                      negativeEnergyData.totalCount,
                      handleNegativeEnergyPageChange,
                      negativeEnergyData.isLoading
                    )}
                  </section>
                )}
              </>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
