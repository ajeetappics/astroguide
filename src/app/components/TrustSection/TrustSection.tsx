'use client';

import React from 'react';

// Custom SVG Icons matching the design screenshot
function VerifiedAstrologersIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Turban / Hat */}
      <path d="M6.5 9C6.5 5.5 8.5 3 12 3C15.5 3 17.5 5.5 17.5 9H6.5Z" fill="#6B3710" />
      <circle cx="12" cy="5.8" r="1.1" fill="#FDF3E5" />
      {/* Face & Ears */}
      <path d="M7.8 9V11.2C7.8 13.5 9.7 15.2 12 15.2C14.3 15.2 16.2 13.5 16.2 11.2V9" stroke="#6B3710" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="6.8" cy="10.8" r="0.9" fill="#6B3710" />
      <circle cx="17.2" cy="10.8" r="0.9" fill="#6B3710" />
      {/* Tilak */}
      <path d="M12 8.5V11.5" stroke="#F6971E" strokeWidth="1.8" strokeLinecap="round" />
      {/* Shoulders & Traditional Attire */}
      <path d="M4 21C4 17.2 7.2 15.8 12 15.8C16.8 15.8 20 17.2 20 21" stroke="#6B3710" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9.5 16L12 19.5L14.5 16" stroke="#6B3710" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.5 21H19.5" stroke="#6B3710" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PrivateConfidentialIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shield */}
      <path
        d="M12 2.5L4.5 5.8V11.8C4.5 16.5 7.8 20.8 12 22C16.2 20.8 19.5 16.5 19.5 11.8V5.8L12 2.5Z"
        fill="#FDF3E5"
        stroke="#6B3710"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Padlock */}
      <rect x="9.2" y="11.2" width="5.6" height="4.4" rx="1.2" fill="#6B3710" />
      <path
        d="M10.2 11.2V9.8C10.2 8.8 11 8 12 8C13 8 13.8 8.8 13.8 9.8V11.2"
        stroke="#6B3710"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="13.2" r="0.75" fill="#FDF3E5" />
    </svg>
  );
}

function SecurePaymentsIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Credit Card */}
      <rect x="2.5" y="5.5" width="16" height="11.5" rx="2" fill="#FDF3E5" stroke="#6B3710" strokeWidth="1.6" />
      <path d="M2.5 9H18.5" stroke="#6B3710" strokeWidth="1.8" />
      <circle cx="5.8" cy="13" r="1" fill="#6B3710" />
      <circle cx="8.5" cy="13" r="1" fill="#F6971E" />
      {/* Security Shield Badge */}
      <path
        d="M17 12L21 13.5V17C21 19.6 19.2 21.6 17 22.2C14.8 21.6 13 19.6 13 17V13.5L17 12Z"
        fill="#6B3710"
        stroke="#FDF3E5"
        strokeWidth="1.2"
      />
      <path
        d="M15.5 17L16.8 18.2L18.8 15.8"
        stroke="#FFFFFF"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PoojaSpiritualIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Coconut Top */}
      <path d="M20 6.5C17.5 10.5 17 13.5 17 15.5H23C23 13.5 22.5 10.5 20 6.5Z" fill="#7A3918" />
      {/* Mango Leaves */}
      <path d="M14 15C10.5 12 10.5 8.5 12.8 7.5C14.8 8.8 15.8 11.8 17 15" fill="#4B8C2A" stroke="#36661C" strokeWidth="0.8" />
      <path d="M26 15C29.5 12 29.5 8.5 27.2 7.5C25.2 8.8 24.2 11.8 23 15" fill="#4B8C2A" stroke="#36661C" strokeWidth="0.8" />
      <path d="M17 15C15 10.5 17.5 7.5 19.5 7.5C20.5 9.8 20.5 12 20 15" fill="#5BA633" />
      <path d="M23 15C25 10.5 22.5 7.5 20.5 7.5C19.5 9.8 19.5 12 20 15" fill="#5BA633" />
      {/* Kalash Rim */}
      <path d="M14 15.5H26C26.6 15.5 27 16.2 26.5 17.2L25.5 19H14.5L13.5 17.2C13 16.2 13.4 15.5 14 15.5Z" fill="#C55F23" stroke="#8A3E14" strokeWidth="0.8" />
      {/* Sacred Mouli Thread */}
      <rect x="14.5" y="17.5" width="11" height="2" fill="#E63946" />
      {/* Kalash Pot Body */}
      <path d="M14.5 19H25.5C28.2 20.5 29.5 24.5 28 28.5C26.5 32.5 23.5 34 20 34C16.5 34 13.5 32.5 12 28.5C10.5 24.5 11.8 20.5 14.5 19Z" fill="#D97232" stroke="#8A3E14" strokeWidth="0.8" />
      {/* Golden Swastika */}
      <path d="M19 23.5H21V29.5H19M19 25.5H17V23.5M21 27.5H23V29.5M17 26.5H23" stroke="#FFD13B" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function VedicAstrologyKundliIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer 8-point Lotus Mandala */}
      <circle cx="12" cy="12" r="3.2" stroke="#6B3710" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="1.3" fill="#6B3710" />
      {/* 8 Petal Loops */}
      <path
        d="M12 2.5C10.2 5.5 10.2 6.8 8.5 6C7 8 8 9 5.5 12C8 13.2 7 15 8.5 15.5C10.2 14.8 10.2 16.2 12 19.5C13.8 16.2 13.8 14.8 15.5 15.5C17 15 16 13.2 18.5 12C16 9 17 8 15.5 6C13.8 6.8 13.8 5.5 12 2.5Z"
        stroke="#6B3710"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="#FDF3E5"
      />
      {/* Outer Star Tips */}
      <circle cx="12" cy="2.5" r="0.75" fill="#F6971E" />
      <circle cx="12" cy="21.5" r="0.75" fill="#F6971E" />
      <circle cx="2.5" cy="12" r="0.75" fill="#F6971E" />
      <circle cx="21.5" cy="12" r="0.75" fill="#F6971E" />
    </svg>
  );
}

function ChatCallConvenienceIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Smartphone */}
      <rect x="5.5" y="2" width="13" height="20" rx="2.5" fill="#FDF3E5" stroke="#6B3710" strokeWidth="1.6" />
      <line x1="10" y1="4.5" x2="14" y2="4.5" stroke="#6B3710" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="18.8" r="0.8" fill="#6B3710" />
      {/* Calling Handset Icon in center */}
      <path
        d="M10 9C9.4 9 9 9.5 9.1 10.2C9.4 12.6 11.4 14.6 13.8 14.9C14.5 15 15 14.6 15 14L14.2 12.6C14 12.2 13.5 12.1 13.1 12.3L12.5 12.8C11.8 12.3 11.4 11.8 10.9 11.2L11.4 10.6C11.6 10.2 11.5 9.7 11.1 9.5L10 9Z"
        fill="#6B3710"
      />
      {/* Sound Waves */}
      <path d="M14.5 8.5C15.8 9.5 15.8 11.5 14.5 12.5" stroke="#F6971E" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M16.5 7C18.2 8.5 18.2 13 16.5 14.5" stroke="#F6971E" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

interface TrustFeature {
  title: string;
  desc: string;
  icon: React.ComponentType;
}

const trustFeatures: TrustFeature[] = [
  {
    title: "Verified Astrologers",
    desc: "Connect with experienced and expert astrologers who specialize in Vedic astrology, Kundli analysis, numerology, tarot reading and more.",
    icon: VerifiedAstrologersIcon,
  },
  {
    title: "Private & Confidential",
    desc: "Your privacy matters. We ensure a secure and confidential consultation experience, so you can share your concerns with complete peace of mind.",
    icon: PrivateConfidentialIcon,
  },
  {
    title: "Secure Payments",
    desc: "Enjoy a safe and seamless payment experience with multiple trusted payment options. Your transactions are protected and secure.",
    icon: SecurePaymentsIcon,
  },
  {
    title: "Pooja & Spiritual Services",
    desc: "Perform authentic Vedic rituals, havans, and personalized poojas conducted by experienced pandits to invite peace, prosperity, and divine blessings into your life.",
    icon: PoojaSpiritualIcon,
  },
  {
    title: "Vedic Astrology & Kundli",
    desc: "Explore the ancient wisdom of Vedic astrology with detailed birth chart analysis, planetary insights and accurate horoscope predictions.",
    icon: VedicAstrologyKundliIcon,
  },
  {
    title: "Chat & Call Convenience",
    desc: "Talk to an astrologer anytime, anywhere through chat or call. Get instant guidance and clarity, right from the comfort of your home.",
    icon: ChatCallConvenienceIcon,
  },
];

export default function TrustSection() {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#FFFDF9] via-[#FFF9F0] to-[#FFFDF9] py-12 sm:py-16 md:py-20 overflow-hidden font-helvetica">
      {/* Top-Left Celestial Zodiac Wheel Watermark */}
      <div className="absolute -top-10 -left-10 w-72 sm:w-96 h-72 sm:h-96 opacity-10 pointer-events-none select-none text-[#9A5B18]">
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full animate-[spin_120s_linear_infinite]">
          <circle cx="100" cy="100" r="90" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="75" />
          <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
          <circle cx="100" cy="100" r="35" />
          <path d="M100 10V190M10 100H190M36.36 36.36L163.64 163.64M36.36 163.64L163.64 36.36" />
        </svg>
      </div>

      {/* Top-Right Hanging Diya / Mandala Watermark */}
      <div className="absolute top-0 right-2 w-48 sm:w-64 h-64 sm:h-80 opacity-15 pointer-events-none select-none text-[#9A5B18]">
        <svg viewBox="0 0 100 120" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full">
          <line x1="50" y1="0" x2="50" y2="40" strokeDasharray="2 2" />
          <circle cx="50" cy="40" r="3" fill="currentColor" />
          <circle cx="50" cy="65" r="22" strokeDasharray="1.5 2.5" />
          <circle cx="50" cy="65" r="14" />
          <polygon points="50,45 56,59 70,65 56,71 50,85 44,71 30,65 44,59" fill="currentColor" fillOpacity="0.1" />
          <line x1="50" y1="87" x2="50" y2="105" />
          <path d="M46 105C46 110 50 115 50 115C50 115 54 110 54 105H46Z" fill="currentColor" fillOpacity="0.4" />
        </svg>
      </div>

      {/* Warm Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-[#F6971E]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#FFA733]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12">

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold font-['Inria_Serif'] text-[#2A1535] leading-tight mb-3">
            Why Trust <span className="text-[#8B5219]">Balaji Astro Guide?</span>
          </h2>

          {/* Subtitle */}
          <p className="text-[#555555] font-helvetica max-w-2xl mx-auto text-xs sm:text-sm md:text-[15px] leading-relaxed mb-4">
            Authentic Vedic wisdom, personalized guidance and a consultation experience designed around you.
          </p>

          {/* Decorative Divider: ── ✧ ── */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent to-[#D4B38A]" />
            <span className="text-[#A26C35] text-xs">✧</span>
            <div className="w-12 sm:w-16 h-px bg-gradient-to-l from-transparent to-[#D4B38A]" />
          </div>
        </div>

        {/* 6 Feature Cards (3-column × 2-row layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {trustFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl sm:rounded-[20px] p-5 sm:p-6 border border-[#EEDCC7]/80 hover:border-[#D9A364] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(246,151,30,0.1)] hover:-translate-y-1 transition-all duration-300 flex items-start gap-4 sm:gap-4.5"
              >
                {/* Circular Icon Container */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FDF3E5] border border-[#F6E3CC] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 group-hover:bg-[#FFF0DC] transition-all duration-300">
                  <Icon />
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg md:text-[19px] font-bold font-['Inria_Serif'] text-[#2A1810] leading-snug mb-1.5 group-hover:text-[#8B5219] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#6B7280] font-helvetica leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
