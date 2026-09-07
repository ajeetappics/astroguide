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
      <style jsx>{`
        .consultation-scroll::-webkit-scrollbar {
          height: 4px;
        }
        .consultation-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 9999px;
        }
        .consultation-scroll::-webkit-scrollbar-thumb {
          background: #F6971E;
          border-radius: 9999px;
        }
        @media (min-width: 1024px) {
          .consultation-scroll {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .consultation-scroll::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>

      <div className="relative z-10 w-full">

        {/* Header Area */}
        <div className="container mx-auto px-4 md:px-8 mb-5 md:mb-8 text-center md:text-left">
          <h2 className="text-[26px] sm:text-[30px] md:text-[34px] lg:text-[36px] font-bold font-['Inria_Serif'] text-[#4A2B23] leading-tight">
            Trending Consultations
          </h2>
        </div>

        {/* Consultations Row - Static on Web, Touch-Scroll with Visible Indicator on Mobile */}
        <div className="container mx-auto px-4 md:px-8">
          <div
            className="consultation-scroll flex items-center justify-start lg:justify-between gap-4 sm:gap-6 md:gap-8 overflow-x-auto pb-4 pt-1"
          >
            {categoryData.map((category) => (
              <div key={category.id} className="flex-none w-20 sm:w-24 md:w-28 lg:w-32">
                <div
                  onClick={openPopup}
                  className="cursor-pointer group flex flex-col items-center justify-center gap-2 sm:gap-2.5 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center bg-white shadow-[0_4px_15px_rgba(0,0,0,0.06)] border border-[#F6971E]/20 group-hover:border-[#F6971E] transition-all duration-300 group-hover:shadow-[0_8px_25px_rgba(246,151,30,0.15)]">
                    <Image
                      src={category.icon}
                      alt={category.title}
                      width={40}
                      height={40}
                      className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>

                  <h3 className="text-xs sm:text-sm md:text-base font-bold text-center text-[#72271E] group-hover:text-[#F6971E] transition-colors font-helvetica">
                    {category.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
