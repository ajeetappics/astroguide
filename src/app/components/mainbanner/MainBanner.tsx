'use client'

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchHomeBanners, HomeHeroSlide } from "@/services/banner/bannerService";
import { usePoojaConfig } from "@/app/context/PoojaConfigContext";

export default function MainBanner() {
  const { isPoojaEnabled } = usePoojaConfig();
  const [webSlides, setWebSlides] = useState<HomeHeroSlide[]>([]);
  const [mobileSlides, setMobileSlides] = useState<HomeHeroSlide[]>([]);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Detect mobile & tablet screen view (< 1024px)
  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch home banners on mount
  useEffect(() => {
    let isMounted = true;
    const loadBanners = async () => {
      try {
        setIsLoading(true);
        const data = await fetchHomeBanners();
        if (isMounted) {
          if (data.webHeroSlides && data.webHeroSlides.length > 0) {
            setWebSlides(data.webHeroSlides);
          } else if (data.heroSlides && data.heroSlides.length > 0) {
            setWebSlides(data.heroSlides);
          }

          if (data.mobileHeroSlides && data.mobileHeroSlides.length > 0) {
            setMobileSlides(data.mobileHeroSlides);
          } else if (data.heroSlides && data.heroSlides.length > 0) {
            setMobileSlides(data.heroSlides);
          }
        }
      } catch (err) {
        console.error("Error loading home banners:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadBanners();
    return () => {
      isMounted = false;
    };
  }, []);

  // Active slides based on screen: forMobile on Mobile/Tab (<1024px), forWeb on Web/Desktop (>=1024px)
  const currentSlides = isMobileOrTablet
    ? (mobileSlides.length > 0 ? mobileSlides : webSlides)
    : (webSlides.length > 0 ? webSlides : mobileSlides);

  // Reset index when changing screen or slide lists
  useEffect(() => {
    if (currentIndex >= currentSlides.length) {
      setCurrentIndex(0);
    }
  }, [currentSlides.length, currentIndex]);

  // Auto-play for the slider
  useEffect(() => {
    if (currentSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % currentSlides.length);
    }, 4000); // 4 seconds
    return () => clearInterval(timer);
  }, [currentSlides.length]);

  return (
    <section className="relative w-full bg-[#FEF8E2] overflow-hidden pt-24 md:pt-32 pb-[30px] md:pb-[60px]">
      {/* Animated Background Decorations - Visible & Thematic */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        {/* Warm Glows (Increased Visibility) */}
        <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[60vh] bg-[#F6971E]/15 rounded-full blur-[80px] animate-[pulse_6s_ease-in-out_infinite]"></div>
        <div className="absolute top-[10%] right-[-10%] w-[50vw] h-[70vh] bg-[#F6971E]/20 rounded-full blur-[100px] animate-[pulse_8s_ease-in-out_infinite]"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[40vw] h-[40vh] bg-[#F6971E]/15 rounded-full blur-[80px] animate-[pulse_5s_ease-in-out_infinite]"></div>

        {/* Twinkling Stars (Increased Visibility) */}
        <div className="absolute top-[20%] left-[15%] w-2.5 h-2.5 bg-[#F6971E]/70 rounded-full blur-[1px] animate-[ping_4s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-[25%] left-[35%] w-3 h-3 bg-[#F6971E]/60 rounded-full blur-[1px] animate-[pulse_3s_ease-in-out_infinite]"></div>
        <div className="absolute top-[40%] right-[45%] w-2 h-2 bg-[#F6971E]/80 rounded-full blur-[1px] animate-[ping_5s_ease-in-out_infinite]"></div>
        <div className="absolute top-[10%] right-[20%] w-2.5 h-2.5 bg-[#F6971E]/50 rounded-full blur-[1px] animate-[pulse_4s_ease-in-out_infinite]"></div>

        {/* Rotating Rings (Balanced crescent arcs on mobile matching sketch, top-right on desktop) */}
        <div className="absolute top-[3%] -right-[48vw] w-[96vw] lg:-top-[20%] lg:-right-[10%] lg:w-[80vw] lg:max-w-[800px] aspect-square border-[2px] border-dashed border-[#F6971E]/30 rounded-full animate-[spin_100s_linear_infinite]"></div>
        <div className="absolute top-[12%] -right-[42vw] w-[74vw] lg:top-[-5%] lg:right-[-5%] lg:w-[60vw] lg:max-w-[600px] aspect-square border-[1.5px] border-solid border-[#F6971E]/20 rounded-full animate-[spin_80s_linear_infinite_reverse]"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Left Content */}
          <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-1/2 space-y-4">
            <h1 className="text-[36px] md:text-[42px] lg:text-[48px] font-['Inria_Serif'] font-bold text-[#1a1a1a] leading-tight">
              Discover Your <br className="hidden lg:block" />
              <span className="text-[28px] md:text-[32px] lg:text-[36px] text-[#F6971E] font-italic">Cosmic Journey</span>
            </h1>

            <ul className="space-y-2 text-base md:text-lg text-gray-700 font-helvetica max-w-lg leading-relaxed text-left">
              <li className="flex items-center gap-2">
                <span className="text-[#F6971E] font-bold text-lg">•</span>
                <span>Get First Free session Now!</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#F6971E] font-bold text-lg">•</span>
                <span>Get Free detailed kundli</span>
              </li>
            </ul>
          </div>

          {/* Right Banner Image Slider */}
          <div className="relative z-10 w-full lg:w-[55%] flex items-center justify-center">
            {isLoading && currentSlides.length === 0 ? (
              <div className="relative w-full h-[130px] md:h-[220px] rounded-[10px] bg-white/40 animate-pulse border border-[#F6971E]/20" />
            ) : currentSlides.length > 0 ? (
              <>
                {/* Carousel Container */}
                <div className="relative w-full h-[130px] md:h-[220px] overflow-hidden rounded-[10px] shadow-sm">
                  {currentSlides.map((slide, index) => {
                    let position = 0;
                    if (index === currentIndex) position = 0;
                    else if (index === (currentIndex + 1) % currentSlides.length) position = 1;
                    else position = -1;

                    const isPoojaOrSpellLink = Boolean(
                      slide.href &&
                        (slide.href === '/pooja' ||
                          slide.href.startsWith('/pooja/') ||
                          slide.href === '/spell' ||
                          slide.href.startsWith('/spell/') ||
                          slide.href === '/spells' ||
                          slide.href.startsWith('/spells/'))
                    );
                    const hasLink = Boolean(slide.href && slide.href !== '#' && (isPoojaEnabled || !isPoojaOrSpellLink));

                    const slideContent = (
                      <div
                        className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out ${
                          position === 0
                            ? 'z-20 opacity-100 translate-x-0'
                            : position === 1
                              ? 'z-10 opacity-0 translate-x-full'
                              : 'z-10 opacity-0 -translate-x-full'
                        } ${hasLink ? 'cursor-pointer' : ''}`}
                      >
                        <Image
                          src={slide.imageUrl}
                          alt={`Astrology Slide ${index + 1}`}
                          fill
                          unoptimized
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 650px"
                          className="object-fill rounded-[10px]"
                          priority={index === 0}
                        />
                      </div>
                    );

                    return hasLink ? (
                      <Link key={index} href={slide.href!}>
                        {slideContent}
                      </Link>
                    ) : (
                      <div key={index} onClick={() => setCurrentIndex(index)}>
                        {slideContent}
                      </div>
                    );
                  })}
                </div>

                {/* Navigation Dots */}
                {currentSlides.length > 1 && (
                  <div className="absolute -bottom-[20px] left-1/2 -translate-x-1/2 flex gap-2 z-30">
                    {currentSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                          idx === currentIndex ? "bg-[#F6971E] w-6" : "bg-gray-300 hover:bg-[#F6971E]/50"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
