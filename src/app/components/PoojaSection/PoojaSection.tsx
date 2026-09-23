'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import PoojaCard, { PujaData } from '../Card/PoojaCard';
import { fetchTrendingPoojas } from '@/services/pooja/poojaService';
import { usePoojaConfig } from '@/app/context/PoojaConfigContext';

export default function PoojaSection() {
  const { isPoojaEnabled } = usePoojaConfig();
  const [poojas, setPoojas] = useState<PujaData[]>([]);
  const [title, setTitle] = useState<string>("Personalized Poojas");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isPoojaEnabled) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    const loadPoojas = async () => {
      try {
        setIsLoading(true);
        const res = await fetchTrendingPoojas(1, 10);
        if (isMounted && res.poojas && res.poojas.length > 0) {
          setPoojas(res.poojas);
          setTitle(res.title || "Personalized Poojas");
        }
      } catch (err) {
        console.error("Error loading poojas for home section:", err);
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
  }, [isPoojaEnabled]);

  if (!isPoojaEnabled) {
    return null;
  }

  return (
    <section className="bg-white py-5 md:py-8 px-4 md:px-8 relative overflow-hidden">
      <style jsx>{`
        .pooja-scroll::-webkit-scrollbar {
          height: 4px;
        }
        .pooja-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 9999px;
        }
        .pooja-scroll::-webkit-scrollbar-thumb {
          background: #F6971E;
          border-radius: 9999px;
        }
        @media (min-width: 1024px) {
          .pooja-scroll {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .pooja-scroll::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>

      {/* Blurred Background Highlights */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#fdedcc] rounded-full blur-[120px] pointer-events-none opacity-80 z-0"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#fdedcc] rounded-full blur-[120px] pointer-events-none opacity-80 z-0"></div>

      <div className="container mx-auto relative z-10 max-w-6xl">

        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-3.5 md:mb-5 gap-3 md:gap-4">
          <div className="max-w-3xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold font-['Inria_Serif'] text-[#4A2B23] leading-tight mb-1 sm:mb-1.5">
              {title}
            </h2>
          </div>
          <Link href="/pooja" className="flex-shrink-0 flex items-center gap-1.5 bg-white border border-[#F6971E] text-[#F6971E] font-bold font-helvetica py-2 px-5 rounded-full hover:bg-[#F6971E] hover:text-white transition-all shadow-xs text-xs sm:text-sm">
            View all poojas <BsArrowRight className="text-sm" />
          </Link>
        </div>

        {/* Pooja Cards: Horizontal Touch-Scroll on Responsive, 4-Column Grid on Desktop */}
        {isLoading ? (
          <div className="pooja-scroll flex lg:grid lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-3.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-[165px] sm:w-[190px] md:w-[215px] lg:w-auto flex-shrink-0 flex flex-col h-[280px] bg-white rounded-2xl border border-gray-100 p-3 animate-pulse">
                <div className="h-[120px] bg-gray-200 rounded-xl mb-3" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-full mb-1" />
                <div className="h-3 bg-gray-100 rounded w-2/3 mb-auto" />
                <div className="h-6 bg-gray-100 rounded w-1/2 mt-3" />
              </div>
            ))}
          </div>
        ) : poojas.length > 0 ? (
          <div className="pooja-scroll flex lg:grid lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-3.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 snap-x snap-mandatory">
            {poojas.map((pooja) => (
              <div key={pooja.id} className="w-[165px] sm:w-[190px] md:w-[215px] lg:w-auto flex-shrink-0 snap-start flex flex-col h-full">
                <PoojaCard pooja={pooja} />
              </div>
            ))}
          </div>
        ) : null}

      </div>
    </section>
  );
}
