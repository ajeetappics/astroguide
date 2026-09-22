'use client'

import React, { useState, useEffect } from 'react';
import { BsSearch, BsX, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import PoojaCard, { PujaData } from '../../components/Card/PoojaCard';
import { fetchSpellList, PaginationDetail } from '@/services/pooja/poojaService';

const LIMIT = 12;

export default function SpellsPage() {
  const [spells, setSpells] = useState<PujaData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState<PaginationDetail>({
    totalDocs: 0,
    totalPages: 1,
    page: 1,
    limit: LIMIT,
    hasPrevPage: false,
    hasNextPage: false,
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch spell list from API: GET /user/pooja/category/:id?page=X&limit=12
  useEffect(() => {
    let isMounted = true;
    const loadSpells = async () => {
      try {
        setIsLoading(true);
        const response = await fetchSpellList(currentPage, LIMIT, searchQuery);
        if (isMounted) {
          if (response.poojas && response.poojas.length > 0) {
            setSpells(response.poojas);
            setTotalCount(response.total);
            setTotalPages(Math.max(1, response.totalPages));
            if (response.paginationDetail) {
              setPagination(response.paginationDetail);
            }
          } else {
            setSpells([]);
            setTotalCount(0);
            setTotalPages(1);
            if (response.paginationDetail) {
              setPagination(response.paginationDetail);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching spell list:', err);
        if (isMounted) {
          setSpells([]);
          setTotalCount(0);
          setTotalPages(1);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    const timer = setTimeout(() => {
      loadSpells();
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [currentPage, searchQuery]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage || isLoading) return;
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | string)[] = [];
    pages.push(1);
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    if (start > 2) pages.push('...');
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (end < totalPages - 1) pages.push('...');
    pages.push(totalPages);
    return pages;
  };

  return (
    <main className="min-h-screen bg-[#FFFDF9] pt-24 pb-[60px]">
      <section className="container mx-auto max-w-6xl px-4 pt-4 relative z-20">

        {/* 1. Centered Search Bar */}
        <div className="bg-white rounded-full shadow-md p-1 sm:p-1.5 flex items-center border border-gray-200/80 max-w-xl sm:max-w-2xl mx-auto mb-5 sm:mb-6 md:mb-8 w-full focus-within:border-[#F6971E]/50 focus-within:shadow-[0_4px_16px_rgba(246,151,30,0.12)] transition-all">
          <div className="pl-3 pr-1 text-gray-400">
            <BsSearch className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search spell by name or ritual..."
            className="flex-grow bg-transparent border-none outline-none px-2 sm:px-3 py-1 sm:py-1.5 font-helvetica text-gray-700 placeholder:text-gray-400 text-xs sm:text-sm w-full min-w-0"
          />
          {searchQuery && (
            <button
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
          <button className="bg-[#F6971E] text-white font-bold font-helvetica px-4 sm:px-6 py-1.5 sm:py-2 rounded-full hover:bg-[#e5850b] transition-all whitespace-nowrap shadow-xs text-xs sm:text-sm cursor-pointer">
            Search
          </button>
        </div>

        {/* 2. Section Title & Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 md:mb-8 gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold font-['Inria_Serif'] text-[#4A2B23] leading-tight mb-1 sm:mb-1.5">
              Personalized Spells
            </h2>
            <p className="text-[#6b6b6b] font-helvetica text-xs sm:text-sm md:text-[15px]">
              Ancient Sacred Rituals & Mystic Energy Cast by Certified Experts
            </p>
          </div>
          {totalCount > 0 && !isLoading && (
            <span className="text-xs sm:text-sm font-semibold text-[#F6971E] bg-[#FFF8EB] border border-[#F6971E]/20 px-3 py-1 rounded-full w-max">
              {totalCount} Spells Available
            </span>
          )}
        </div>

        {/* 3. Spell Cards Grid or Loading Skeleton */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-3.5">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 p-3 h-[270px] sm:h-[290px] animate-pulse flex flex-col justify-between"
              >
                <div>
                  <div className="w-full h-[110px] sm:h-[125px] bg-gray-200 rounded-xl mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-full mb-1.5" />
                  <div className="h-3 bg-gray-100 rounded w-2/3" />
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                  <div className="h-4 bg-gray-200 rounded w-16" />
                  <div className="h-7 bg-gray-200 rounded-lg w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : spells.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-3.5">
              {spells.map((spell) => (
                <PoojaCard key={`spell-${spell._id || spell.id}`} pooja={spell} basePath="/spell" />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs sm:text-sm text-gray-500 font-helvetica order-2 sm:order-1">
                  Showing Page <span className="font-bold text-[#4A2B23]">{currentPage}</span> of{' '}
                  <span className="font-bold text-[#4A2B23]">{totalPages}</span> ({totalCount} total spells)
                </p>

                <div className="flex items-center gap-1.5 sm:gap-2 order-1 sm:order-2 flex-wrap justify-center">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={!pagination.hasPrevPage || currentPage <= 1 || isLoading}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-[#4A2B23] bg-white hover:border-[#F6971E] hover:text-[#F6971E] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
                    aria-label="Previous Page"
                  >
                    <BsChevronLeft className="text-xs" />
                    <span>Prev</span>
                  </button>

                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((item, idx) => {
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
                          onClick={() => handlePageChange(item)}
                          disabled={isLoading}
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                            item === currentPage
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
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!pagination.hasNextPage || currentPage >= totalPages || isLoading}
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
            <p className="text-xl font-bold text-[#72271E] mb-2 font-['Inria_Serif']">No Spells Found</p>
            <p className="text-gray-500 text-sm font-helvetica mb-4">No spell services match &quot;{searchQuery}&quot;.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setCurrentPage(1);
              }}
              className="bg-[#F6971E] text-white font-bold px-6 py-2 rounded-full text-sm hover:bg-[#e5850b] transition-all cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}

      </section>
    </main>
  );
}
