'use client'

import React from 'react';
import ServiceCard from '../Card/ServiceCard';
const servicesData = [
  {
    icon: "/images/panchang.svg",
    title: "Panchang",
    description: "Know the auspicious timings and daily panchang details.",
    actionText: "Get Yours"
  },
  {
    icon: "/images/zodiac.svg",
    title: "Daily Horoscope",
    description: "Get insights into your day based on your zodiac sign movements.",
    actionText: "Check Now"
  },
  {
    icon: "/images/kundli.svg",
    title: "Kundli",
    description: "Explore your personalized daily kundli analysis for better clarity.",
    actionText: "Check Now"
  },
  {
    icon: "/images/tarot.svg",
    title: "Tarot",
    description: "Ancient wisdom through mystical card interpretations for your questions.",
    actionText: "Draw Cards"
  },
  {
    icon: "/images/numerology.svg",
    title: "Numerology",
    description: "Discover the power of numbers in your life's path and decisions.",
    actionText: "Calculate"
  },
  {
    icon: "/images/palmReading.svg",
    title: "Palm Reading",
    description: "Discover your destiny and character through palmistry.",
    actionText: "Read Palm"
  },
  {
    icon: "/images/matchMaking.svg",
    title: "Match Making",
    description: "Check your marriage compatibility instantly with Vedic astrology.",
    actionText: "Match Profiles"
  },
  {
    icon: "/images/babyNames.svg",
    title: "Baby Kundli",
    description: "Generate comprehensive birth chart for your newborn baby.",
    actionText: "Generate Now"
  },
  {
    icon: "/images/poojaIcon.svg",
    title: "Pooja",
    description: "Perform sacred rituals for peace, prosperity and spiritual growth.",
    actionText: "Book Now"
  },
  {
    icon: "/images/spellIcon.svg",
    title: "Spell",
    description: "Ancient spells and remedies to overcome life's obstacles.",
    actionText: "View Now"
  }
];

export default function ServicesSection() {
  return (
    <section className="bg-white py-5 md:py-8 overflow-hidden relative">
      <style>{`
        /* Sleek custom scrollbar for mobile/responsive view to indicate horizontal scroll */
        @media (max-width: 1023px) {
          .services-scroll {
            scrollbar-width: thin;
            scrollbar-color: #F6971E rgba(246, 151, 30, 0.15);
          }
          .services-scroll::-webkit-scrollbar {
            height: 4px;
          }
          .services-scroll::-webkit-scrollbar-track {
            background: rgba(246, 151, 30, 0.1);
            border-radius: 9999px;
          }
          .services-scroll::-webkit-scrollbar-thumb {
            background: #F6971E;
            border-radius: 9999px;
          }
        }
        @media (min-width: 1024px) {
          .services-scroll {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .services-scroll::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>

      {/* Blurred Background Highlights */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#fdedcc] rounded-full blur-[120px] pointer-events-none opacity-80 z-0"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#fdedcc] rounded-full blur-[120px] pointer-events-none opacity-80 z-0"></div>

      <div className="relative z-10 w-full">

        {/* Header Section */}
        <div className="container mx-auto max-w-6xl mb-3.5 md:mb-5 text-center md:text-left">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold font-['Inria_Serif'] text-[#4A2B23] leading-tight">
            Astrology Services
          </h2>
        </div>

        {/* Services Row - Static on Web, Touch-Scroll with Visible Indicator on Mobile */}
        <div className="container mx-auto max-w-6xl">
          <div
            className="services-scroll flex items-start justify-start lg:justify-between gap-3 sm:gap-4 md:gap-5 overflow-x-auto pb-4 pt-1"
          >
            {servicesData.map((service, index) => (
              <div key={index} className="flex-none w-20 sm:w-24 md:w-28 lg:w-auto">
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
