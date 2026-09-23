'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import PoojaCard, { PujaData } from '../Card/PoojaCard';
import { fetchSpellList } from '@/services/pooja/poojaService';

export default function SpellSection() {
  const [spells, setSpells] = useState<PujaData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadSpells = async () => {
      try {
        const res = await fetchSpellList(1, 8);
        if (isMounted && res.poojas) {
          setSpells(res.poojas);
        }
      } catch (err) {
        console.error('Error loading spells for SpellSection:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadSpells();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!isLoading && spells.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-5 md:py-8 px-4 md:px-8 relative overflow-hidden">
      <style jsx>{`
        .spell-scroll::-webkit-scrollbar {
          height: 4px;
        }
        .spell-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 9999px;
        }
        .spell-scroll::-webkit-scrollbar-thumb {
          background: #F6971E;
          border-radius: 9999px;
        }
        @media (min-width: 1024px) {
          .spell-scroll {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .spell-scroll::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>

      {/* Blurred Background Highlights */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#fdedcc] rounded-full blur-[120px] pointer-events-none opacity-80 z-0"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#fdedcc] rounded-full blur-[120px] pointer-events-none opacity-80 z-0"></div>

      <div className="container mx-auto relative z-10 max-w-6xl">

        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-3.5 md:mb-5 gap-3 md:gap-4">
          <div className="max-w-3xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold font-['Inria_Serif'] text-[#4A2B23] leading-tight mb-1 sm:mb-1.5">
              Personalized Spells
            </h2>
          </div>
          <Link href="/spell" className="flex-shrink-0 flex items-center gap-1.5 bg-white border border-[#F6971E] text-[#F6971E] font-bold font-helvetica py-2 px-5 rounded-full hover:bg-[#F6971E] hover:text-white transition-all shadow-xs text-xs sm:text-sm">
            View all spells <BsArrowRight className="text-sm" />
          </Link>
        </div>

        {/* Spell Cards */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-3.5">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-3 h-64 animate-pulse">
                <div className="w-full h-32 bg-gray-200 rounded-xl mb-3" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-full mb-2" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="spell-scroll flex lg:grid lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-3.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 snap-x snap-mandatory">
            {spells.map((spell: any) => (
              <div key={spell._id || spell.id} className="w-[165px] sm:w-[190px] md:w-[215px] lg:w-auto flex-shrink-0 snap-start flex flex-col h-full">
                <PoojaCard pooja={spell} basePath="/spell" />
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
