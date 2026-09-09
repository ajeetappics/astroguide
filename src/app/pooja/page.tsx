'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsArrowRight, BsSearch, BsX } from 'react-icons/bs';
import PoojaCard from '../components/Card/PoojaCard';
import { pujaData } from '../components/PoojaSection/PoojaSection';

export default function PujasPage() {
  const sliderImages = [
    "https://storage.googleapis.com/astro-vani-storage/admin/1786718515037-Pooja_Home_page_savan_sepical.jpg",
    "/images/pooja-hero-banner.jpg",
    "https://storage.googleapis.com/astro-vani-storage/admin/1787392992312-test.jpg",
    "https://storage.googleapis.com/astro-vani-storage/admin/1782760808425-recharge.jpg"
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play for the slider (matching Home page MainBanner)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000); // 4 seconds
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const tabs = ["All", "Upcoming Pooja's", "Generic Pooja's", "Dosh Nivaran Pooja's", "Grah Shanti Pooja's", "Deity Pooja's", "Lagna Pooja's", "Vrat Pooja's", "Festival Poojas"];
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Duplicate data to make the grid look full (just for demo purposes)
  const allPujas = [...pujaData, ...pujaData.map(p => ({ ...p, id: p.id + 10 })), ...pujaData.map(p => ({ ...p, id: p.id + 20 }))];

  const filteredPujas = allPujas.filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q);
  });

  return (
    <main className="min-h-screen bg-[#FFFDF9] pb-[60px]">

      {/* Hero Banner Section */}
      <section className="bg-[#FFFDF9] pt-32 lg:pt-40 pb-[50px] md:pb-[70px] relative overflow-hidden">
        {/* Animated Background Decorations - matching Home Page */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[60vh] bg-[#F6971E]/15 rounded-full blur-[80px] animate-[pulse_6s_ease-in-out_infinite]"></div>
          <div className="absolute top-[10%] right-[-10%] w-[50vw] h-[70vh] bg-[#F6971E]/20 rounded-full blur-[100px] animate-[pulse_8s_ease-in-out_infinite]"></div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8">

            {/* Left Content - Kept intact as original UI */}
            <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-1/2 space-y-4">
              <p className="text-[#F6971E] font-bold text-sm tracking-widest uppercase mb-1">Ancient Wisdom Meets Modern Access</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#72271E] font-['Inria_Serif'] leading-tight drop-shadow-sm">
                Sacred Pooja Services
              </h1>

              <p className="text-gray-600 font-helvetica text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Experience authentic Vedic rituals performed by certified expert priests from India&apos;s most sacred temples, delivered live to your home.
              </p>
            </div>

            {/* Right Banner Image Slider (Layout matching Home Page MainBanner with increased height) */}
            <div className="relative z-10 w-full lg:w-[55%] flex items-center justify-center">

              {/* Carousel Container */}
              <div className="relative w-full h-[190px] sm:h-[250px] md:h-[300px] lg:h-[340px] overflow-hidden rounded-2xl md:rounded-3xl shadow-[0_15px_35px_rgba(0,0,0,0.12)] border border-orange-100/70">
                {sliderImages.map((img, index) => {
                  let position = 0;
                  if (index === currentSlide) position = 0;
                  else if (index === (currentSlide + 1) % sliderImages.length) position = 1;
                  else position = -1;

                  return (
                    <div
                      key={index}
                      className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out cursor-pointer ${position === 0
                          ? 'z-20 opacity-100 translate-x-0'
                          : position === 1
                            ? 'z-10 opacity-0 translate-x-full'
                            : 'z-10 opacity-0 -translate-x-full'
                        }`}
                      onClick={() => setCurrentSlide(index)}
                    >
                      <Image
                        src={img}
                        alt={`Pooja Slide ${index + 1}`}
                        fill
                        className="object-cover rounded-2xl md:rounded-3xl"
                        priority={index === 0}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Navigation Dots */}
              <div className="absolute -bottom-[26px] left-1/2 -translate-x-1/2 flex gap-2 z-30">
                {sliderImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${idx === currentSlide ? "bg-[#F6971E] w-6" : "bg-gray-300 hover:bg-[#F6971E]/50"
                      }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Search and Categories Section (Matching /astrologers page layout) */}
      <section className="container mx-auto max-w-7xl px-4 relative z-20">

        {/* 1. Centered Search Bar - Sleek & compact on web and mobile */}
        <div className="bg-white rounded-full shadow-md p-1 sm:p-1.5 flex items-center border border-gray-200/80 max-w-xl sm:max-w-2xl mx-auto mb-5 sm:mb-6 md:mb-8 w-full focus-within:border-[#F6971E]/50 focus-within:shadow-[0_4px_16px_rgba(246,151,30,0.12)] transition-all">
          <div className="pl-3 pr-1 text-gray-400">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pooja by name or temple..."
            className="flex-grow bg-transparent border-none outline-none px-2 sm:px-3 py-1 sm:py-1.5 font-helvetica text-gray-700 placeholder:text-gray-400 text-xs sm:text-sm w-full min-w-0"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-1 text-gray-400 hover:text-gray-600 mr-1 cursor-pointer transition-colors"
              aria-label="Clear search"
            >
              <BsX className="w-4 h-4" />
            </button>
          )}
          <button className="bg-[#F6971E] text-white font-bold font-helvetica px-4 sm:px-6 py-1.5 sm:py-2 rounded-full hover:bg-[#e5850b] transition-all whitespace-nowrap shadow-xs text-xs sm:text-sm cursor-pointer">
            Search
          </button>
        </div>

        {/* 2. Scrollable Category Tabs */}
        <div
          className="w-full overflow-x-auto pb-2 mb-8 md:mb-12"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style dangerouslySetInnerHTML={{
            __html: `
            .overflow-x-auto::-webkit-scrollbar { display: none; }
          `}} />
          <div className="flex items-center gap-2.5 sm:gap-3 w-max">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold font-helvetica transition-all shadow-xs sm:shadow-sm flex-shrink-0 cursor-pointer ${activeTab === tab
                  ? 'bg-[#F6971E] text-white border-none shadow-[0_4px_10px_rgba(246,151,30,0.3)]'
                  : 'bg-white border border-gray-200 text-[#4A2B23] hover:border-[#F6971E]/50 hover:text-[#F6971E]'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Section Title & Subtitle */}
        <div className="text-left mb-6 md:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Inria_Serif'] text-[#72271E] mb-1 sm:mb-2">
            Personalized Poojas
          </h2>
          <p className="text-[#F6971E] font-medium font-helvetica text-xs sm:text-sm md:text-base">
            Experience Real Blessings with your Personal Sankalp
          </p>
        </div>

        {/* 4. Pooja Cards Grid */}
        {filteredPujas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
            {filteredPujas.slice(0, 6).map((pooja) => (
              <PoojaCard key={`pooja-${pooja.id}`} pooja={pooja} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#F6971E]/20 p-8 shadow-sm max-w-md mx-auto">
            <p className="text-xl font-bold text-[#72271E] mb-2 font-['Inria_Serif']">No Poojas Found</p>
            <p className="text-gray-500 text-sm font-helvetica mb-4">No pooja services match &quot;{searchQuery}&quot;.</p>
            <button
              onClick={() => setSearchQuery("")}
              className="bg-[#F6971E] text-white font-bold px-6 py-2 rounded-full text-sm hover:bg-[#e5850b] transition-all cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}

      </section>

    </main>
  );
}
