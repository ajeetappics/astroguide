'use client'

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  BsChevronRight,
  BsArrowRight,
} from 'react-icons/bs';
import {
  TbZodiacAries, TbZodiacTaurus, TbZodiacGemini, TbZodiacCancer,
  TbZodiacLeo, TbZodiacVirgo, TbZodiacLibra, TbZodiacScorpio,
  TbZodiacSagittarius, TbZodiacCapricorn, TbZodiacAquarius, TbZodiacPisces
} from 'react-icons/tb';
import {
  getTimeframeConfig,
  ZODIAC_SIGNS_LIST
} from '../../../../services/horoscopeService';

const ZODIAC_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  aries: TbZodiacAries,
  taurus: TbZodiacTaurus,
  gemini: TbZodiacGemini,
  cancer: TbZodiacCancer,
  leo: TbZodiacLeo,
  virgo: TbZodiacVirgo,
  libra: TbZodiacLibra,
  scorpio: TbZodiacScorpio,
  sagittarius: TbZodiacSagittarius,
  capricorn: TbZodiacCapricorn,
  aquarius: TbZodiacAquarius,
  pisces: TbZodiacPisces,
};

export default function TimeframeHoroscopePage() {
  const params = useParams();
  const rawTimeframe = (params?.timeframe as string) || 'daily-horoscope';
  const timeframe = getTimeframeConfig(rawTimeframe);

  return (
    <main className="min-h-screen bg-[#FFFDF9] pt-28 pb-[80px] font-helvetica">
      <div className="container mx-auto max-w-6xl px-4">

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs md:text-sm font-bold tracking-widest uppercase text-gray-400 mb-6 mt-2 md:mt-0">
          <Link href="/" className="hover:text-[#F6971E] transition-colors">Home</Link>
          <BsChevronRight className="text-[10px]" />
          <Link href="/horoscope/daily-horoscope" className="hover:text-[#F6971E] transition-colors">Horoscope</Link>
          <BsChevronRight className="text-[10px]" />
          <span className="text-[#F6971E]">{timeframe.label}</span>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-2.5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#4A2B23] font-['Inria_Serif'] leading-tight">
            {timeframe.title}
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
            {timeframe.periodDescription} Select your Zodiac Sign (Rashi) below to explore detailed astrological insights across all 9 life spheres.
          </p>
        </div>

        {/* Section Heading */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-['Inria_Serif'] text-[#4A2B23]">
              Choose Your Zodiac Sign
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Click any Rashi to view full {timeframe.label} predictions & 9 life dimensions
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-50 text-[#F6971E] border border-orange-200">
            12 Vedic Rashis
          </span>
        </div>

        {/* 12 Zodiac Signs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 mb-12">
          {ZODIAC_SIGNS_LIST.map((signMeta) => {
            const Icon = ZODIAC_ICONS[signMeta.id] || TbZodiacAries;
            const detailUrl = `/horoscope/${timeframe.slug}/${signMeta.id}`;

            return (
              <Link
                key={signMeta.id}
                href={detailUrl}
                className="group bg-white rounded-2xl border border-[#F6971E]/20 p-5 shadow-xs hover:shadow-md hover:border-[#F6971E] hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: Icon + Sign Name & Date */}
                  <div className="flex items-center gap-3.5 mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 flex items-center justify-center text-[#F6971E] group-hover:bg-[#F6971E] group-hover:text-white group-hover:border-[#F6971E] transition-all duration-200 flex-shrink-0 shadow-2xs">
                      <Icon className="text-2xl" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base sm:text-lg text-[#4A2B23] group-hover:text-[#F6971E] transition-colors truncate">
                        {signMeta.name}
                      </h3>
                      <p className="text-xs text-gray-400 font-medium">
                        {signMeta.dateRange}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 mt-2">
                  {/* Action Link */}
                  <div className="flex items-center justify-between text-xs font-bold text-[#F6971E] group-hover:text-[#4A2B23] transition-colors">
                    <span>Read {timeframe.label} Horoscope</span>
                    <BsArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>


      </div>
    </main>
  );
}
