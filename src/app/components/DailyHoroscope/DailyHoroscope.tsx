'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import {
  TbZodiacAries, TbZodiacTaurus, TbZodiacGemini, TbZodiacCancer,
  TbZodiacLeo, TbZodiacVirgo, TbZodiacLibra, TbZodiacScorpio,
  TbZodiacSagittarius, TbZodiacCapricorn, TbZodiacAquarius, TbZodiacPisces
} from 'react-icons/tb';
import { usePopup } from '../popup/PopupContext';
import { getSignHoroscope } from '@/services/horoscopeService';

const zodiacSigns = [
  { id: 'aries', name: 'Aries', hindiName: 'Mesh', date: 'Mar 21 - Apr 19', icon: TbZodiacAries },
  { id: 'taurus', name: 'Taurus', hindiName: 'Vrishabh', date: 'Apr 20 - May 20', icon: TbZodiacTaurus },
  { id: 'gemini', name: 'Gemini', hindiName: 'Mithun', date: 'May 21 - Jun 20', icon: TbZodiacGemini },
  { id: 'cancer', name: 'Cancer', hindiName: 'Kark', date: 'Jun 21 - Jul 22', icon: TbZodiacCancer },
  { id: 'leo', name: 'Leo', hindiName: 'Singh', date: 'Jul 23 - Aug 22', icon: TbZodiacLeo },
  { id: 'virgo', name: 'Virgo', hindiName: 'Kanya', date: 'Aug 23 - Sep 22', icon: TbZodiacVirgo },
  { id: 'libra', name: 'Libra', hindiName: 'Tula', date: 'Sep 23 - Oct 22', icon: TbZodiacLibra },
  { id: 'scorpio', name: 'Scorpio', hindiName: 'Vrishchik', date: 'Oct 23 - Nov 21', icon: TbZodiacScorpio },
  { id: 'sagittarius', name: 'Sagittarius', hindiName: 'Dhanu', date: 'Nov 22 - Dec 21', icon: TbZodiacSagittarius },
  { id: 'capricorn', name: 'Capricorn', hindiName: 'Makar', date: 'Dec 22 - Jan 19', icon: TbZodiacCapricorn },
  { id: 'aquarius', name: 'Aquarius', hindiName: 'Kumbh', date: 'Jan 20 - Feb 18', icon: TbZodiacAquarius },
  { id: 'pisces', name: 'Pisces', hindiName: 'Meen', date: 'Feb 19 - Mar 20', icon: TbZodiacPisces },
];

export default function DailyHoroscope() {
  const { openPopup } = usePopup();
  const [activeSign, setActiveSign] = useState(zodiacSigns[1]); // Default to Taurus
  const [isHovered, setIsHovered] = useState(false);
  const [animateProgress, setAnimateProgress] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Trigger progress bar animation when sign changes
  useEffect(() => {
    setAnimateProgress(false); // Reset to 0
    const timeout = setTimeout(() => {
      setAnimateProgress(true); // Animate to target
    }, 50);
    return () => clearTimeout(timeout);
  }, [activeSign]);

  // Auto-rotate every 3.5 seconds if not hovered
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setActiveSign((current) => {
        const currentIndex = zodiacSigns.findIndex(s => s.id === current.id);
        const nextIndex = (currentIndex + 1) % zodiacSigns.length;

        // Auto-scroll the horizontal list to keep the active item somewhat in view
        if (scrollRef.current) {
          const container = scrollRef.current;
          const nextElement = container.children[nextIndex] as HTMLElement;
          if (nextElement) {
            container.scrollTo({
              left: nextElement.offsetLeft - container.offsetWidth / 2 + nextElement.offsetWidth / 2,
              behavior: 'smooth'
            });
          }
        }

        return zodiacSigns[nextIndex];
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isHovered]);

  // Fetch from static horoscope data service
  const staticSignData = getSignHoroscope(activeSign.id);
  const luckyToday = staticSignData?.luckyToday || {
    color: activeSign.name.length % 2 === 0 ? "Golden Saffron" : "Warm Amber",
    number: (activeSign.name.length % 9) + 1,
    mood: activeSign.name.length % 2 === 0 ? "Optimistic & Focused" : "Calm & Reflective",
    symbol: "♈",
    stone: "Gemstone",
    auspiciousTime: "10:30 AM - 12:15 PM"
  };
  const areaOfLife = staticSignData?.areaOfLife;
  const overallScore = staticSignData?.overallCosmicScore || { score: 84, grade: "Highly Favorable" };

  const horoscopeData = {
    text: staticSignData?.overview || `${activeSign.name} (${activeSign.hindiName}), today celestial movements bring clarity to your long-pending priorities. The Moon transit favors conscious decision-making and creative confidence. Avoid over-analyzing minor hurdles and channel your focus into purposeful action.`,
    mood: luckyToday.mood,
    luckyNumber: luckyToday.number,
    color: luckyToday.color,
    colorCode: (luckyToday as any).colorCode || "#F6971E",
    stone: luckyToday.stone,
    symbol: luckyToday.symbol,
    favorableTime: luckyToday.auspiciousTime,
    overallScore: overallScore.score,
    overallGrade: overallScore.grade,
    metrics: [
      { label: "RELATIONSHIP", value: areaOfLife?.relationship.status || "Harmonious", percent: areaOfLife?.relationship.score || 85, barColorFrom: "#F87171", barColorTo: "#DE5149" },
      { label: "CAREER & WORK", value: areaOfLife?.career.status || "High Momentum", percent: areaOfLife?.career.score || 90, barColorFrom: "#FDE047", barColorTo: "#EAB308" },
      { label: "FINANCE & WEALTH", value: areaOfLife?.finance.status || "Stable", percent: areaOfLife?.finance.score || 82, barColorFrom: "#4ADE80", barColorTo: "#4BB870" },
      { label: "HEALTH & VITALITY", value: areaOfLife?.health.status || "Robust", percent: areaOfLife?.health.score || 85, barColorFrom: "#FB923C", barColorTo: "#EE892C" }
    ]
  };

  const ActiveIcon = activeSign.icon;

  return (
    <section className="bg-[#FFFDF9] py-5 md:py-8 px-4 md:px-8 relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute -left-40 top-20 w-96 h-96 bg-[#F6971E]/5 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute -right-40 bottom-20 w-96 h-96 bg-[#4A2B23]/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="container mx-auto relative z-10 max-w-6xl">

        {/* Header & CTA Link */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-4 md:mb-6 gap-3 md:gap-4">
          <div>
            <span className="text-[#F6971E] font-bold font-helvetica tracking-wider uppercase text-[10px] sm:text-xs mb-1 block">
              YOUR DAILY HOROSCOPE
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold font-['Inria_Serif'] text-[#4A2B23] leading-tight mb-1">
              Your daily <span className="text-[#F6971E]">horoscope</span> reading
            </h2>
            <p className="text-[#6b6b6b] font-helvetica text-xs sm:text-sm md:text-[15px]">
              Pick your raashi to see today&apos;s pillars at a glance.
            </p>
          </div>
          <Link href="/horoscope/daily-horoscope" className="flex-shrink-0 flex items-center gap-1.5 bg-white border border-[#F6971E] text-[#F6971E] font-bold font-helvetica py-2 px-5 rounded-full hover:bg-[#F6971E] hover:text-white transition-all shadow-xs text-xs sm:text-sm">
            View full horoscope <BsArrowRight className="text-sm" />
          </Link>
        </div>

        {/* Zodiac Selector (Horizontal Scrollable) */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex overflow-x-auto hide-scrollbar gap-2.5 sm:gap-3 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth pb-2"
        >
          {zodiacSigns.map((sign) => {
            const Icon = sign.icon;
            const isActive = activeSign.id === sign.id;
            return (
              <Link
                key={sign.id}
                href={`/horoscope/daily-horoscope/${sign.id}`}
                onMouseEnter={() => setActiveSign(sign)}
                onClick={() => setActiveSign(sign)}
                title={`View daily horoscope for ${sign.name} (${sign.hindiName})`}
                className={`flex-shrink-0 flex flex-col items-center justify-center w-18 sm:w-20 md:w-22 h-22 sm:h-24 md:h-26 rounded-xl border transition-all duration-300 cursor-pointer ${isActive
                  ? 'bg-gradient-to-b from-[#FEF8E2] to-white border-[#F6971E] shadow-[0_6px_16px_rgba(246,151,30,0.15)] -translate-y-1'
                  : 'bg-white border-gray-100 shadow-xs hover:border-[#F6971E]/30 hover:-translate-y-0.5'
                  }`}
              >
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center mb-1 ${isActive ? 'bg-[#F6971E] text-white shadow-inner' : 'bg-gray-50 text-[#4A2B23]'
                  }`}>
                  <Icon className="text-lg sm:text-xl" />
                </div>
                <span className={`font-bold text-xs ${isActive ? 'text-[#4A2B23]' : 'text-gray-600'}`}>
                  {sign.name}
                </span>
                <span className="text-[9px] text-gray-400 uppercase tracking-wide">
                  {sign.hindiName}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Selected Sign Detailed Horoscope Reading Card */}
        <div className="mt-4 sm:mt-5 bg-white rounded-2xl sm:rounded-3xl border border-[#F6971E]/20 shadow-[0_10px_35px_rgba(0,0,0,0.04)] p-4 sm:p-6 md:p-7 transition-all duration-500">
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-8 items-stretch justify-between">

            {/* Left: Sign Info, Prediction Text & Lucky Matrix */}
            <div className="w-full lg:w-[58%] flex flex-col justify-between space-y-3.5">
              {/* Header Badge & Title */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#FEF8E2] to-[#FFF3D6] border border-[#F6971E]/30 flex items-center justify-center text-[#F6971E] shadow-xs flex-shrink-0">
                  <ActiveIcon className="text-2xl sm:text-3xl" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg sm:text-2xl font-bold font-['Inria_Serif'] text-[#4A2B23]">
                      {activeSign.name}
                    </h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-50 text-[#F6971E] border border-orange-200/60">
                      {activeSign.hindiName}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100/80 text-[#72271E]">
                      Score: {horoscopeData.overallScore}% ({horoscopeData.overallGrade})
                    </span>
                  </div>
                  <p className="text-xs text-[#F6971E] font-bold">
                    Today&apos;s Cosmic Overview &bull; {activeSign.date}
                  </p>
                </div>
              </div>

              {/* Prediction Text */}
              <p className="text-gray-600 font-helvetica text-xs sm:text-sm md:text-[14px] leading-relaxed">
                {horoscopeData.text}
              </p>

              {/* Lucky Matrix Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-gray-100">
                <div className="px-3 py-1 rounded-full bg-orange-50/70 border border-orange-200/50 text-xs font-semibold text-[#72271E] flex items-center gap-1.5">
                  <span className="text-gray-400">Number:</span>
                  <span className="text-[#F6971E] font-bold">{horoscopeData.luckyNumber}</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-orange-50/70 border border-orange-200/50 text-xs font-semibold text-[#72271E] flex items-center gap-1.5">
                  <span className="text-gray-400">Color:</span>
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block border border-black/15 shadow-xs flex-shrink-0"
                    style={{ backgroundColor: horoscopeData.colorCode }}
                  />
                  <span className="text-[#4A2B23] font-bold">{horoscopeData.color}</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-orange-50/70 border border-orange-200/50 text-xs font-semibold text-[#72271E] flex items-center gap-1.5">
                  <span className="text-gray-400">Stone:</span>
                  <span className="text-[#F6971E] font-bold">{horoscopeData.stone}</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-orange-50/70 border border-orange-200/50 text-xs font-semibold text-[#72271E] flex items-center gap-1.5">
                  <span className="text-gray-400">Time:</span>
                  <span className="text-[#4A2B23] font-bold">{horoscopeData.favorableTime}</span>
                </div>
              </div>
            </div>

            {/* Right: 4 Life Pillars & Action CTAs */}
            <div className="w-full lg:w-[42%] flex flex-col justify-between bg-[#FFFDF9] rounded-2xl border border-orange-100/80 p-4 sm:p-5 space-y-3.5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#4A2B23] font-['Inria_Serif']">
                  Today&apos;s Life Pillars
                </h4>
                <span className="text-[11px] font-semibold text-[#F6971E]">
                  {horoscopeData.overallGrade}
                </span>
              </div>

              {/* Metrics Progress Bars */}
              <div className="space-y-2.5">
                {horoscopeData.metrics.map((metric, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500 font-semibold font-helvetica text-[11px] sm:text-xs">{metric.label}</span>
                      <span className="text-[#4A2B23] font-bold text-[11px] sm:text-xs">{metric.value} ({metric.percent}%)</span>
                    </div>
                    <div className="w-full bg-gray-200/60 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: animateProgress ? `${metric.percent}%` : '0%',
                          background: `linear-gradient(to right, ${metric.barColorFrom || '#cb7e1aff'}, ${metric.barColorTo || '#FFA733'})`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={openPopup}
                  className="flex-1 bg-gradient-to-r from-[#F6971E] to-[#FFA733] hover:from-[#FFA733] hover:to-[#F6971E] text-white font-bold text-xs sm:text-sm py-2 px-3.5 rounded-xl shadow-xs transition-all text-center cursor-pointer"
                >
                  Consult Astrologer
                </button>
                <Link
                  href={`/horoscope/daily-horoscope/${activeSign.id}`}
                  className="flex-1 bg-white border border-[#F6971E] text-[#F6971E] hover:bg-[#F6971E] hover:text-white font-bold text-xs sm:text-sm py-2 px-3.5 rounded-xl transition-all text-center flex items-center justify-center gap-1 shadow-2xs"
                >
                  <span>View in detail</span>
                  <BsArrowRight className="text-xs" />
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
