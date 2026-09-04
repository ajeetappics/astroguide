'use client'

import React from 'react';
import Image from 'next/image';
import { usePopup } from '../popup/PopupContext';

const categoryData = [
  {
    id: 1,
    title: "Love",
    count: "4,280+ astrologers",
    description: "Find solutions for your love life problems from expert astrologers.",
    icon: "/images/love.png"
  },
  {
    id: 2,
    title: "Marriage",
    count: "6,120+ astrologers",
    description: "Get detailed kundli reports and marriage matching guidance.",
    icon: "/images/marriage.png"
  },
  {
    id: 3,
    title: "Career",
    count: "5,840+ astrologers",
    description: "Overcome career obstacles and find your true professional path.",
    icon: "/images/career_color.png"
  },
  {
    id: 4,
    title: "Finance",
    count: "9,210+ astrologers",
    description: "Connect with expert female astrologers for comfortable guidance.",
    icon: "/images/finance.png"
  },
  {
    id: 5,
    title: "Business",
    count: "3,760+ astrologers",
    description: "Get astrological insights for business growth and financial stability.",
    icon: "/images/business.png"
  },
  {
    id: 6,
    title: "Health",
    count: "2,480+ astrologers",
    description: "Find peace and remedies for health and family-related concerns.",
    icon: "/images/health.png"
  }
];

export default function BrowseCategory() {
  const { openPopup } = usePopup();

  return (
    <section className="bg-[#fdf7e1] py-[30px] md:py-[60px] relative overflow-hidden">
      <style>{`
        @keyframes scroll-reverse {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-reverse {
          animation: scroll-reverse 60s linear infinite;
          width: max-content;
        }
        .animate-scroll-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative z-10 w-full max-w-[100vw]">

        {/* Header Area */}
        <div className="container mx-auto px-4 md:px-8 mb-8 text-center md:text-left">
          <h2 className="text-[36px] font-bold font-['Inria_Serif'] text-[#4A2B23] leading-tight">
            Trending Consultations
          </h2>
        </div>

        {/* Infinite Marquee Container */}
        <div
          className="overflow-hidden py-4"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}
        >
          <div className="flex animate-scroll-reverse">
            {[...categoryData, ...categoryData, ...categoryData, ...categoryData].map((category, index) => {

              return (
                <div key={index} className="flex-none px-4 md:px-6 w-32 md:w-40">
                  <div
                    onClick={openPopup}
                    className="cursor-pointer group flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center bg-white shadow-[0_4px_15px_rgba(0,0,0,0.06)] border border-[#F6971E]/20 group-hover:border-[#F6971E] transition-all duration-300 group-hover:shadow-[0_8px_25px_rgba(246,151,30,0.15)]">
                      <Image
                        src={category.icon}
                        alt={category.title}
                        width={40}
                        height={40}
                        className="object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    </div>

                    <h3 className="text-sm md:text-base font-bold text-center text-[#72271E] group-hover:text-[#F6971E] transition-colors font-helvetica">
                      {category.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
