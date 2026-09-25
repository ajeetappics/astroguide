'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BsStarFill, BsPatchCheckFill, BsCurrencyRupee } from 'react-icons/bs';
import { sanitizeImageUrl } from '@/utils/imageUtils';
import defaultAstroImg from '@/assets/images/astro-image.jpg';

export interface AstrologerTag {
  _id?: string;
  tagName: string;
}

export interface AstrologerData {
  id: string;
  _id?: string;
  slug?: string;
  name: string;
  isVerified: boolean;
  isCelebrity?: boolean;
  tag?: AstrologerTag;
  status?: 'online' | 'busy' | 'offline';
  skills: string[];
  languages: string;
  experience: string;
  rating: string;
  totalCalls: string;
  price: string;
  originalPrice?: number;
  imageUrl: string;
}

interface AstrologerCardProps {
  astro?: AstrologerData;
  astrologer?: AstrologerData;
}

export default function AstrologerCard({ astro: astroProp, astrologer: astrologerProp }: AstrologerCardProps) {
  const astro = (astroProp || astrologerProp)!;
  const router = useRouter();

  const [imgSrc, setImgSrc] = useState<any>(() =>
    astro?.imageUrl ? sanitizeImageUrl(astro.imageUrl, defaultAstroImg.src) : defaultAstroImg
  );

  useEffect(() => {
    if (astro?.imageUrl) {
      setImgSrc(sanitizeImageUrl(astro.imageUrl, defaultAstroImg.src));
    } else {
      setImgSrc(defaultAstroImg);
    }
  }, [astro?.imageUrl]);

  if (!astro) return null;

  const handleCardClick = () => {
    const identifier = astro.slug || astro.id;
    router.push(`/astrologers/${identifier}`);
  };

  const astroId = astro?._id || astro?.id;
  const connectUrl = `${process.env.NEXT_PUBLIC_URL}/astrologer-profile?astroId=${astroId}`;

  // Only use scratch / original price if provided directly by the API (matching Astrologer Profile page)
  const originalPrice = astro.originalPrice;

  return (
    <>
      {/* 📱 Mobile / Responsive App UI (Exact match with App screenshot) */}
      <div
        onClick={handleCardClick}
        className="lg:hidden bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.05)] border border-[#F6971E]/30 p-3 sm:p-3.5 flex gap-3 sm:gap-3.5 relative overflow-hidden cursor-pointer active:scale-[0.99] transition-all"
      >
        {/* Left: Avatar + Status Indicator + Tag Badge + Stars */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="relative w-[95px] h-[130px] sm:w-[105px] sm:h-[140px] rounded-2xl border-2 border-[#F6971E] overflow-hidden bg-gray-50">
            <Image
              src={imgSrc}
              alt={astro.name}
              fill
              sizes="110px"
              className="object-cover object-top"
              onError={() => setImgSrc(defaultAstroImg)}
            />

            {/* Online / Busy Status Indicator (Green for Online, Red for Busy) */}
            {/* {astro.status === 'online' && (
              <span
                title="Online"
                className="absolute top-1.5 right-1.5 w-3 h-3 rounded-full bg-[#00C853] border-2 border-white shadow-xs z-20 animate-pulse"
              />
            )}
            {astro.status === 'busy' && (
              <span
                title="Busy"
                className="absolute top-1.5 right-1.5 w-3 h-3 rounded-full bg-[#E53935] border-2 border-white shadow-xs z-20"
              />
            )} */}

            {/* Tag Badge Overlay (Trending etc.) */}
            {astro.tag?.tagName && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-[#F6971E] to-[#FF7A00] text-white text-[10px] font-bold text-center py-0.5 z-10 flex items-center justify-center gap-0.5">
                <span>{astro.tag.tagName}</span>
                <span>🔥</span>
              </div>
            )}
          </div>

          {/* 5 Golden Stars (Rating) */}
          <div className="flex items-center gap-0.5 mt-2">
            {[...Array(5)].map((_, i) => (
              <BsStarFill key={i} className="text-[#F6971E] text-xs" />
            ))}
          </div>
        </div>

        {/* Right: Info + Skills + Connect Button */}
        <div className="flex flex-col justify-between flex-grow min-w-0">
          <div>
            {/* Row 1: Name & Verified Badge */}
            <div className="flex items-center gap-1.5 mb-1 min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-[#1f1f1f] font-helvetica truncate">
                {astro.name}
              </h3>
              {astro.isVerified && (
                <BsPatchCheckFill className="text-[#00C853] text-base sm:text-lg flex-shrink-0" />
              )}
            </div>

            {/* Row 2: Pricing (Only strictly from API) */}
            {astro.price && (
              <div className="flex items-center gap-2 mb-1">
                {originalPrice && (
                  <span className="text-xs text-gray-400 line-through flex items-center">
                    <BsCurrencyRupee className="text-xs -mr-0.5" />
                    {originalPrice}
                  </span>
                )}
                <span className="text-sm font-bold text-[#F6971E] font-helvetica flex items-center">
                  <BsCurrencyRupee className="text-sm -mr-0.5" />
                  {astro.price.replace('₹', '')}/min
                </span>
              </div>
            )}

            {/* Row 3: Experience & Languages (Only if in API) */}
            {(astro.experience || astro.languages) && (
              <p className="text-xs text-[#666666] font-helvetica truncate mb-2">
                {[astro.experience && `Exp: ${astro.experience}`, astro.languages].filter(Boolean).join(' | ')}
              </p>
            )}

            {/* Row 4: Skill Pills (Only if in API) */}
            {astro.skills && astro.skills.length > 0 && (
              <div className="flex items-center gap-1.5 overflow-hidden flex-nowrap mb-2.5">
                {astro.skills.slice(0, 4).map((skill, idx) => (
                  <span
                    key={idx}
                    className="flex-shrink-0 rounded-full border border-gray-200 px-2 py-0.5 text-[11px] text-[#555555] bg-white font-helvetica"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Row 5: Connect Button */}
          <div className="mt-auto pt-1">
            <Link
              href={connectUrl}
              onClick={(e) => {
                e.stopPropagation();
                try {
                  sessionStorage.setItem('deep_link_source', window.location.href);
                } catch {}
              }}
              className="w-full bg-gradient-to-r from-[#F6971E] to-[#FFA733] text-white font-bold font-helvetica py-2 px-4 rounded-xl shadow-[0_2px_8px_rgba(246,151,30,0.25)] hover:opacity-95 active:scale-95 transition-all flex items-center justify-center text-xs sm:text-sm cursor-pointer"
            >
              Connect Now
            </Link>
          </div>
        </div>
      </div>

      {/* 🖥️ Desktop Web Card (Astrotalk Skeleton + Balaji Theme) */}
      <div
        onClick={handleCardClick}
        className="hidden lg:flex bg-white rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-[#F6971E]/20 hover:border-[#F6971E]/50 hover:shadow-[0_8px_24px_rgba(246,151,30,0.12)] transition-all duration-300 hover:-translate-y-1 flex-col justify-between h-full cursor-pointer group"
      >
        <div>
          {/* Top Row: Circular Avatar + Top-right Tag */}
          <div className="flex justify-between items-start mb-3">
            {/* Circular Profile Avatar */}
            <div className="relative w-16 h-16 sm:w-[68px] sm:h-[68px] rounded-full border-2 border-[#F6971E] p-0.5 overflow-hidden bg-gray-50 flex-shrink-0 shadow-xs">
              <Image
                src={imgSrc}
                alt={astro.name}
                fill
                sizes="68px"
                className="rounded-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                onError={() => setImgSrc(defaultAstroImg)}
              />
            </div>

            {/* Top-Right Tag Pill (e.g. Top Choice / Trending) */}
            {astro.tag?.tagName ? (
              <span className="text-[11px] font-bold text-[#F6971E] bg-[#FFF8EB] border border-[#F6971E]/30 px-3 py-1 rounded-full shadow-2xs tracking-wide">
                {astro.tag.tagName}
              </span>
            ) : <span />}
          </div>

          {/* Name & Verified Badge */}
          <div className="flex items-center gap-1.5 mb-2 min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-[#1f1f1f] font-['Inria_Serif'] truncate group-hover:text-[#F6971E] transition-colors">
              {astro.name}
            </h3>
            {astro.isVerified && (
              <BsPatchCheckFill className="text-[#00C853] text-base flex-shrink-0" />
            )}
          </div>

          {/* Skill Pills (Chips) */}
          {astro.skills && astro.skills.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
              {astro.skills.slice(0, 3).map((skill, idx) => (
                <span
                  key={idx}
                  className="rounded-full border border-gray-200 px-2.5 py-0.5 text-[11px] text-[#555555] bg-gray-50 font-helvetica"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Languages & Experience */}
          <div className="mb-3 space-y-0.5">
            {astro.languages && (
              <p className="text-xs text-[#666666] font-helvetica truncate">
                {astro.languages}
              </p>
            )}
            {astro.experience && (
              <p className="text-xs text-[#888888] font-helvetica truncate">
                {astro.experience}
              </p>
            )}
          </div>
        </div>

        <div>
          {/* Rating & Pricing Row */}
          <div className="flex justify-between items-center mb-3 pt-2.5 border-t border-gray-100">
            {/* Left: Star Rating & Total Orders/Calls */}
            <div className="flex items-center gap-1.5 text-xs text-[#555555] font-helvetica">
              {astro.rating && (
                <span className="flex items-center gap-1 font-bold text-[#1f1f1f]">
                  <BsStarFill className="text-[#F6971E] text-xs" />
                  {astro.rating}
                </span>
              )}
              {astro.rating && astro.totalCalls && <span className="text-gray-300">•</span>}
              {astro.totalCalls && <span className="text-gray-500">{astro.totalCalls}</span>}
            </div>

            {/* Right: Pricing (del + actual price) */}
            {astro.price && (
              <div className="flex items-baseline gap-1.5">
                {originalPrice && (
                  <span className="text-[11px] text-gray-400 line-through flex items-center">
                    <BsCurrencyRupee className="text-[11px] -mr-0.5" />
                    {originalPrice}
                  </span>
                )}
                <span className="text-base font-bold text-[#1f1f1f] leading-none flex items-center">
                  <BsCurrencyRupee className="text-sm -mr-0.5" />
                  {astro.price.replace('₹', '')}
                  <span className="text-[11px] font-normal text-gray-500 ml-0.5">/min</span>
                </span>
              </div>
            )}
          </div>

          {/* Connect Button (Our theme button) */}
          <Link
            href={connectUrl}
            onClick={(e) => {
              e.stopPropagation();
              try {
                sessionStorage.setItem('deep_link_source', window.location.href);
              } catch {}
            }}
            className="w-full bg-gradient-to-r from-[#F6971E] to-[#FFA733] text-white font-bold font-helvetica py-2 sm:py-2.5 rounded-xl shadow-[0_2px_8px_rgba(246,151,30,0.25)] hover:shadow-[0_4px_15px_rgba(246,151,30,0.35)] active:scale-95 transition-all flex items-center justify-center gap-1.5 text-xs sm:text-sm cursor-pointer"
          >
            Connect Now
          </Link>
        </div>
      </div>
    </>
  );
}
