'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  BsChevronRight,
  BsChevronDown
} from 'react-icons/bs';
import { fetchPoojaById, getCategoryByIdOrName } from '@/services/pooja/poojaService';
import { usePoojaConfig } from '@/app/context/PoojaConfigContext';

export interface CategoryItem {
  _id?: string;
  categoryName: string;
  icon?: string;
  [key: string]: any;
}

// Helper component for expandable text with 200-limit and View More / View Less
function ExpandableText({ text, limit = 200 }: { text: string; limit?: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return null;

  if (text.length <= limit) {
    return <p className="text-gray-600 font-helvetica text-xs sm:text-sm md:text-[14px] leading-relaxed whitespace-pre-line">{text}</p>;
  }

  const truncated = text.slice(0, limit).trim();
  const lastSpace = truncated.lastIndexOf(' ');
  const displayText = isExpanded ? text : (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + '...';

  return (
    <div>
      <p className="text-gray-600 font-helvetica text-xs sm:text-sm md:text-[14px] leading-relaxed whitespace-pre-line">
        {displayText}
      </p>
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-1.5 inline-flex items-center gap-1 text-[#F6971E] hover:text-[#d47d0e] font-bold text-xs cursor-pointer transition-colors"
      >
        <span>{isExpanded ? 'View Less' : 'View More'}</span>
        <BsChevronDown className={`text-[10px] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
}

export default function SpellDetails() {
  const router = useRouter();
  const { isPoojaEnabled } = usePoojaConfig();
  const params = useParams();
  const slugOrId = (params?.id as string) || '';

  // State to show all categories or only 3
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [spell, setSpell] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isPoojaEnabled) {
      router.replace('/');
    }
  }, [isPoojaEnabled, router]);

  useEffect(() => {
    if (!isPoojaEnabled) {
      setIsLoading(false);
      return;
    }
    if (!slugOrId) return;
    let isMounted = true;

    const loadSpellDetails = async () => {
      try {
        setIsLoading(true);
        const data = await fetchPoojaById(slugOrId);
        if (isMounted && data) {
          setSpell(data);
          // If slug is available and current URL was accessed by MongoDB id, update browser URL to slug
          if (data.slug && data.slug !== slugOrId && typeof window !== 'undefined') {
            window.history.replaceState(null, '', `/spell/${data.slug}`);
          }
        }
      } catch (err) {
        console.error('Error fetching spell details for:', slugOrId, err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadSpellDetails();

    return () => {
      isMounted = false;
    };
  }, [slugOrId]);

  // FAQ State (default first open)
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!isPoojaEnabled) {
    return null;
  }

  // Loading skeleton state
  if (isLoading && !spell) {
    return (
      <main className="min-h-screen bg-[#FFFDF9] pt-28 pb-[80px] font-helvetica">
        <div className="container mx-auto max-w-6xl px-4 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-48 mb-6 mt-4" />
          <div className="bg-white rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 border border-orange-100 flex flex-col lg:flex-row gap-8 items-center">
            <div className="w-full lg:w-[42%] aspect-[4/2.5] bg-gray-200 rounded-2xl" />
            <div className="w-full lg:w-[58%] flex flex-col justify-center gap-3">
              <div className="h-6 bg-gray-200 rounded-full w-28" />
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-100 rounded w-full" />
              <div className="h-4 bg-gray-100 rounded w-5/6" />
              <div className="h-10 bg-gray-200 rounded-xl w-44 mt-4" />
            </div>
          </div>
          <div className="mt-7 flex flex-col gap-5">
            <div className="h-28 bg-white rounded-2xl border border-orange-100" />
            <div className="h-28 bg-white rounded-2xl border border-orange-100" />
          </div>
        </div>
      </main>
    );
  }

  // Not found state
  if (!spell) {
    return (
      <main className="min-h-screen bg-[#FFFDF9] pt-28 pb-[80px] font-helvetica flex items-center justify-center">
        <div className="text-center p-8 sm:p-10 bg-white rounded-3xl shadow-sm border border-[#F6971E]/20 max-w-md mx-4">
          <h2 className="text-2xl font-bold font-['Inria_Serif'] text-[#4A2B23] mb-2">Spell Not Found</h2>
          <p className="text-gray-500 text-sm mb-6">The requested spell details could not be loaded or are no longer available.</p>
          <Link
            href="/spell"
            className="inline-flex items-center justify-center bg-gradient-to-r from-[#F6971E] to-[#FFA733] text-white font-bold px-6 py-2.5 rounded-xl shadow-md hover:scale-105 transition-all text-sm"
          >
            Browse All Spells
          </Link>
        </div>
      </main>
    );
  }

  // Determine displayed categories (default 3, or all when expanded)
  const rawCategories: any[] = Array.isArray(spell?.categoryId) ? spell.categoryId : [];
  const categories: CategoryItem[] = rawCategories.map((c: any) => {
    if (typeof c === 'string') {
      const match = getCategoryByIdOrName(c);
      return {
        _id: c,
        categoryName: match?.categoryName || c,
      };
    }
    const match = getCategoryByIdOrName(c?._id || c?.categoryName);
    return {
      ...c,
      categoryName: c?.categoryName || match?.categoryName || 'Sacred Spell',
    };
  });
  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, 3);

  const spellName = spell?.name || spell?.title || spell?.poojaName || 'Sacred Spell';
  const spellImage = spell?.image || spell?.imageUrl || '/images/poojas/ganesha_pooja.jpg';
  const rawPrice = spell?.basePrice ?? spell?.price ?? 1500;
  const formattedPrice = (typeof rawPrice === 'number' ? rawPrice : Number(String(rawPrice).replace(/[^\d.]/g, '')) || 1500).toLocaleString('en-IN');
  const spellId = spell?._id || spell?.id || slugOrId;
  const baseUrl = (process.env.NEXT_PUBLIC_URL || '').replace(/\/$/, '');
  const bookUrl = `${baseUrl}/pooja-details?poojaId=${spellId}`;

  const spellTagName =
    spell?.poojaTagId?.tagName ||
    spell?.poojaTagId?.name ||
    spell?.tag?.tagName ||
    spell?.tag?.name ||
    spell?.tagName ||
    (typeof spell?.tag === 'string' ? spell.tag : '') ||
    '';

  return (
    <main className="min-h-screen bg-[#FFFDF9] pt-28 pb-[80px] font-helvetica">
      <div className="container mx-auto max-w-6xl px-4">

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs md:text-sm font-bold tracking-widest uppercase text-gray-400 mb-6 mt-4 md:mt-0">
          <Link href="/" className="hover:text-[#F6971E] transition-colors">Home</Link>
          <BsChevronRight className="text-[10px]" />
          <Link href="/spell" className="hover:text-[#F6971E] transition-colors">Spells</Link>
          <BsChevronRight className="text-[10px]" />
          <span className="text-[#F6971E] line-clamp-1">{spellName}</span>
        </div>

        {/* Unified Main Details Card */}
        <div className="bg-white rounded-[24px] sm:rounded-[28px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#F6971E]/15 p-5 sm:p-7 md:p-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center">

            {/* Left: Image with balanced aspect 4:2.5 matching pooja details */}
            <div className="w-full lg:w-[42%] max-w-full lg:max-w-[460px] flex-shrink-0 mx-auto lg:mx-0">
              <div className="relative aspect-[4/2.5] w-full rounded-[18px] sm:rounded-[22px] overflow-hidden shadow-md border border-orange-100/70 bg-[#FFFDF9] group">
                <Image
                  src={spellImage}
                  alt={spellName}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Right: Details, Categories & Booking */}
            <div className="w-full lg:w-[58%] flex flex-col justify-center">

              {/* Badges row: Tag Badge & Category Badges */}
              {(spellTagName || categories.length > 0) && (
                <div className="flex flex-wrap items-center gap-2 mb-2.5">
                  {/* Highlighted Tag Badge */}
                  {spellTagName && (
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#F6971E] to-[#E07A00] text-white shadow-2xs uppercase tracking-wider">
                      <span>{spellTagName}</span>
                    </span>
                  )}

                  {visibleCategories.map((cat: CategoryItem) => (
                    <span
                      key={cat._id}
                      className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-orange-50 text-[#F6971E] border border-orange-200/60 shadow-2xs"
                    >
                      <span>{cat.categoryName}</span>
                    </span>
                  ))}

                  {/* View More / View Less Button for Categories */}
                  {categories.length > 3 && (
                    <button
                      type="button"
                      onClick={() => setShowAllCategories(!showAllCategories)}
                      className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold bg-amber-50 hover:bg-amber-100 text-[#F6971E] border border-[#F6971E]/30 transition-colors cursor-pointer"
                    >
                      <span>{showAllCategories ? 'View Less' : `+${categories.length - 3} View More`}</span>
                    </button>
                  )}
                </div>
              )}

              {/* Spell Name */}
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-['Inria_Serif'] text-[#4A2B23] mb-2 leading-tight">
                {spellName}
              </h1>

              {/* Description Snippet (with View More / View Less) */}
              {spell.description && (
                <div className="mb-4">
                  <ExpandableText text={spell.description} limit={200} />
                </div>
              )}

              {/* Pricing & CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3.5 border-t border-gray-100">
                <div className="flex flex-col">
                  <span className="text-gray-400 uppercase tracking-widest text-[10px] sm:text-[11px] font-bold mb-0.5">Base Price</span>
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#4A2B23] font-['Inria_Serif'] tracking-tight">
                    ₹{formattedPrice}
                  </span>
                </div>

                <Link
                  href={bookUrl}
                  className="w-full sm:w-auto bg-gradient-to-r from-[#F6971E] to-[#FFA733] hover:from-[#FFA733] hover:to-[#F6971E] text-white font-bold text-xs sm:text-sm py-2.5 px-6 sm:px-8 rounded-xl shadow-[0_4px_15px_rgba(246,151,30,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center text-center"
                >
                  Book Spell Now
                </Link>
              </div>

            </div>

          </div>
        </div>

        {/* 4 Full-Width Sections: Description, Benefits, Procedure, What Happens After Order */}
        {(spell.description || spell.benefits || spell.procedure || spell.whatHappensAfterOrder) && (
          <div className="mt-7 flex flex-col gap-5 w-full">

            {/* 1. Description Section */}
            {spell.description && (
              <div className="w-full bg-white rounded-[20px] shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-[#F6971E]/15 p-5 sm:p-7">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-1.5 h-4 sm:h-5 rounded-full bg-[#F6971E]" />
                  <h2 className="text-base sm:text-lg md:text-xl font-bold font-['Inria_Serif'] text-[#4A2B23]">
                    Description
                  </h2>
                </div>
                <ExpandableText text={spell.description} limit={200} />
              </div>
            )}

            {/* 2. Benefits Section */}
            {spell.benefits && (
              <div className="w-full bg-white rounded-[20px] shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-[#F6971E]/15 p-5 sm:p-7">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-1.5 h-4 sm:h-5 rounded-full bg-[#F6971E]" />
                  <h2 className="text-base sm:text-lg md:text-xl font-bold font-['Inria_Serif'] text-[#4A2B23]">
                    Benefits
                  </h2>
                </div>
                <ExpandableText text={spell.benefits} limit={200} />

                {/* Preferred Days inside Benefits */}
                {spell.preferredDays && spell.preferredDays.length > 0 && (
                  <div className="mt-4 pt-3.5 border-t border-gray-100">
                    <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                      Auspicious / Preferred Days
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {spell.preferredDays.map((day: string) => (
                        <span key={day} className="px-2.5 py-0.5 rounded-md bg-orange-50 border border-orange-200 text-xs font-semibold text-[#F6971E]">
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. Procedure Section */}
            {spell.procedure && (
              <div className="w-full bg-white rounded-[20px] shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-[#F6971E]/15 p-5 sm:p-7">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-1.5 h-4 sm:h-5 rounded-full bg-[#F6971E]" />
                  <h2 className="text-base sm:text-lg md:text-xl font-bold font-['Inria_Serif'] text-[#4A2B23]">
                    Procedure
                  </h2>
                </div>
                <ExpandableText text={spell.procedure} limit={200} />
              </div>
            )}

            {/* 4. What Happens After Order Section */}
            {spell.whatHappensAfterOrder && (
              <div className="w-full bg-white rounded-[20px] shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-[#F6971E]/15 p-5 sm:p-7">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-1.5 h-4 sm:h-5 rounded-full bg-[#F6971E]" />
                  <h2 className="text-base sm:text-lg md:text-xl font-bold font-['Inria_Serif'] text-[#4A2B23]">
                    What Happens After Order
                  </h2>
                </div>
                <ExpandableText text={spell.whatHappensAfterOrder} limit={200} />
              </div>
            )}

          </div>
        )}

        {/* FAQs Section */}
        {spell.faqEntries && spell.faqEntries.length > 0 && (
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold font-['Inria_Serif'] text-[#4A2B23] mb-1.5">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm">
                Everything you need to know about {spellName}
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              {spell.faqEntries.map((faq: any, index: number) => (
                <div
                  key={faq._id || index}
                  className={`bg-white rounded-xl p-3.5 sm:p-4 border transition-all duration-300 ${openFaq === index
                    ? 'border-[#F6971E] shadow-[0_4px_20px_rgba(246,151,30,0.08)]'
                    : 'border-[#F6971E]/15 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-[#F6971E]/40'
                    }`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between text-left font-bold text-[#4A2B23] group cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm md:text-[15px] pr-4 group-hover:text-[#F6971E] transition-colors">
                      {faq.question}
                    </span>
                    <div className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 ${openFaq === index
                      ? 'bg-gradient-to-r from-[#F6971E] to-[#FFA733] text-white -rotate-180 shadow-sm'
                      : 'bg-gray-50 text-gray-400 group-hover:bg-[#F6971E]/10 group-hover:text-[#F6971E]'
                      }`}>
                      <BsChevronDown className="text-xs font-bold" />
                    </div>
                  </button>

                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-60 mt-2.5 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                    <p className="text-gray-600 font-helvetica text-xs sm:text-sm leading-relaxed pr-4 pt-2.5 border-t border-gray-100">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
