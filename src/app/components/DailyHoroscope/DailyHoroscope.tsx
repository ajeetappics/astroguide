'use client'

import React, { useState, useEffect, useRef } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import {
  TbZodiacAries, TbZodiacTaurus, TbZodiacGemini, TbZodiacCancer,
  TbZodiacLeo, TbZodiacVirgo, TbZodiacLibra, TbZodiacScorpio,
  TbZodiacSagittarius, TbZodiacCapricorn, TbZodiacAquarius, TbZodiacPisces
} from 'react-icons/tb';
import { usePopup } from '../popup/PopupContext';

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

  // Auto-rotate every 2 seconds if not hovered
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
    }, 2000);

    return () => clearInterval(interval);
  }, [isHovered]);

  // Generate deterministic unique values based on sign length for variety
  const getDynamicScore = (base: number) => {
    const variance = (activeSign.name.length * 7) % 30;
    return Math.min(100, Math.max(40, base - 15 + variance));
  };

  // Dummy data based on active sign (for demonstration)
  const horoscopeData = {
    text: `${activeSign.name}, it's time to stop being afraid of failure and just try. Failures have their own lessons to teach, which can be beneficial for the future, so keep your eyes on the prize. The cosmic energies are aligning to support your next big leap.`,
    mood: activeSign.name.length % 2 === 0 ? "Optimistic" : "Anxious",
    luckyNumber: (activeSign.name.length % 9) + 1,
    color: activeSign.name.length % 2 === 0 ? "#86efac" : "#fca5a5",
    metrics: [
      { label: "LOVE", value: getDynamicScore(80) > 70 ? "Good" : "Average", percent: getDynamicScore(80), color: "bg-[#F6971E]" },
      { label: "CAREER", value: getDynamicScore(90) > 80 ? "High" : "Stable", percent: getDynamicScore(90), color: "bg-[#F6971E]" },
      { label: "HEALTH", value: getDynamicScore(85) > 75 ? "Strong" : "Fair", percent: getDynamicScore(85), color: "bg-[#F6971E]" },
      { label: "MONEY", value: getDynamicScore(75) > 65 ? "Strong" : "Average", percent: getDynamicScore(75), color: "bg-[#F6971E]" }
    ]
  };

  const ActiveIcon = activeSign.icon;

  return (
    <section className="bg-[#FFFDF9] py-5 md:py-8 px-4 md:px-8 relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute -left-40 top-20 w-96 h-96 bg-[#F6971E]/5 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute -right-40 bottom-20 w-96 h-96 bg-[#4A2B23]/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="container mx-auto relative z-10 max-w-6xl">

        {/* Header & Tabs */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-4 md:mb-6 gap-3 md:gap-4">
          <div>
            <span className="text-[#F6971E] font-bold font-helvetica tracking-wider uppercase text-[10px] sm:text-xs mb-1 block">
              YOUR DAILY HOROSCOPE
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold font-['Inria_Serif'] text-[#4A2B23] leading-tight mb-1">
              Your daily <span className="text-[#F6971E]">horoscope</span> reading
            </h2>
            <p className="text-[#6b6b6b] font-helvetica text-xs sm:text-sm md:text-[15px]">
              Pick your raashi to see today's pillars at a glance.
            </p>
          </div>
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
              <button
                key={sign.id}
                onClick={() => setActiveSign(sign)}
                className={`flex-shrink-0 flex flex-col items-center justify-center w-18 sm:w-20 md:w-22 h-22 sm:h-24 md:h-26 rounded-xl border transition-all duration-300 ${isActive
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
              </button>
            );
          })}
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
