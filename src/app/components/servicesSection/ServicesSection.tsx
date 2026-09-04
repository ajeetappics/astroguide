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
    <section className="bg-white py-[30px] md:py-[60px] overflow-hidden relative">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
          width: max-content;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Blurred Background Highlights */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#fdedcc] rounded-full blur-[120px] pointer-events-none opacity-80 z-0"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#fdedcc] rounded-full blur-[120px] pointer-events-none opacity-80 z-0"></div>

      <div className="relative z-10 w-full max-w-[100vw]">

        {/* Header Section */}
        <div className="container mx-auto px-4 md:px-8 mb-8 text-center md:text-left">
          <h2 className="text-[36px] font-bold font-['Inria_Serif'] text-[#4A2B23] leading-tight">
            Astrology Services
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
          <div className="flex animate-scroll hover:[animation-play-state:paused]">
            {/* We duplicate the array to make the scroll seamless */}
            {[...servicesData, ...servicesData, ...servicesData, ...servicesData].map((service, index) => (
              <div key={index} className="flex-none px-4 md:px-6 w-32 md:w-40">
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
