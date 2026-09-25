'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import mainLogo from '@/assets/images/logo_new.png';
import apple_store from '@/assets/images/apple_store.svg';
import google_store from '@/assets/images/google_store.svg';
import { usePopup } from '../popup/PopupContext';
import Image from 'next/image';
import { fetchPoojaList } from '@/services/pooja/poojaService';
import { PujaData } from '../Card/PoojaCard';
import { usePoojaConfig } from '@/app/context/PoojaConfigContext';

export default function Footer() {
  const { openPopup } = usePopup();
  const { isPoojaEnabled } = usePoojaConfig();
  const [topPoojas, setTopPoojas] = useState<PujaData[]>([]);

  useEffect(() => {
    let isMounted = true;
    const loadFooterPoojas = async () => {
      if (!isPoojaEnabled) return;
      try {
        const res = await fetchPoojaList(1, 10);
        if (isMounted && res.poojas && res.poojas.length > 0) {
          setTopPoojas(res.poojas.slice(0, 6));
        }
      } catch (err) {
        console.error('Error fetching footer poojas:', err);
      }
    };
    loadFooterPoojas();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <footer className="bg-[#EEE3D9]">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">

        {/* Top Branding Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-8 border-b border-[#72271E]/15">
          <div className="max-w-md">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <Image
                src={mainLogo}
                className="w-10 h-10 object-contain"
                alt="Balaji Astro Guide Logo"
                width={100}
                height={100}
              />
              <span className="text-xl font-bold font-['Inria_Serif'] text-[#72271E]">
                Balaji Astro Guide
              </span>
            </Link>
            <p className="font-helvetica text-[#5C5C5C] leading-relaxed text-xs sm:text-sm">
              Discover your cosmic journey through authentic astrology and spiritual guidance. Your destiny awaits.
            </p>
          </div>

          {/* Social Icons & App Store Badges */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full lg:w-auto justify-between lg:justify-end">
            <div className="flex space-x-3">
              <Link
                href="https://www.facebook.com/BalajiAstroGuide/"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[#72271E] text-[#72271E] hover:bg-[#72271E] hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-sm" />
              </Link>

              <Link
                href="https://www.instagram.com/balajiastroguide/"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[#72271E] text-[#72271E] hover:bg-[#72271E] hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram className="text-sm" />
              </Link>

              <Link
                href="https://youtube.com/@balaji_astroguide?si=XecUuu6Ws3Jq6_Oa"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[#72271E] text-[#72271E] hover:bg-[#72271E] hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube className="text-sm" />
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="https://play.google.com/store/apps/details?id=com.astrovani.balaji.app"
                className="inline-flex items-center transition-all hover:scale-105 hover:opacity-90 active:scale-95"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={google_store}
                  alt="GET IT ON Google Play"
                  width={120}
                  height={38}
                  className="w-[115px] sm:w-[125px] h-auto object-contain"
                />
              </Link>
              <Link
                href="https://apps.apple.com/in/app/balaji-astro-guide/id6753894953/"
                className="inline-flex items-center transition-all hover:scale-105 hover:opacity-90 active:scale-95"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={apple_store}
                  alt="Download on the App Store"
                  width={120}
                  height={38}
                  className="w-[115px] sm:w-[125px] h-auto object-contain"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* 5 Title-Wise Columns */}
        <div className={`grid grid-cols-2 sm:grid-cols-3 ${isPoojaEnabled ? 'lg:grid-cols-5' : 'lg:grid-cols-4'} gap-6 sm:gap-8 pt-8`}>

          {/* 1. Horoscope */}
          <div>
            <h2 className="mb-3.5 sm:mb-4 text-sm sm:text-md font-bold font-['Inria_Serif'] text-[#72271E] uppercase tracking-wider text-left">
              Horoscope
            </h2>
            <ul className="space-y-2.5 sm:space-y-3 font-helvetica text-[#5C5C5C] text-left text-xs sm:text-sm">
              <li>
                <Link href="/horoscope/daily-horoscope" className="hover:text-[#F6971E] hover:underline text-left block transition-colors">
                  Daily Horoscope
                </Link>
              </li>
              <li>
                <Link href="/horoscope/weekly-horoscope" className="hover:text-[#F6971E] hover:underline text-left block transition-colors">
                  Weekly Horoscope
                </Link>
              </li>
              {/* <li>
                <Link href="/horoscope/monthly-horoscope" className="hover:text-[#F6971E] hover:underline text-left block transition-colors">
                  Monthly Horoscope
                </Link>
              </li> */}
              <li>
                <Link href="/horoscope/yearly-horoscope" className="hover:text-[#F6971E] hover:underline text-left block transition-colors">
                  Yearly Horoscope
                </Link>
              </li>
              {/* <li>
                <button onClick={openPopup} className="hover:text-[#F6971E] hover:underline text-left block cursor-pointer transition-colors w-full">
                  Love Horoscope
                </button>
              </li>
              <li>
                <button onClick={openPopup} className="hover:text-[#F6971E] hover:underline text-left block cursor-pointer transition-colors w-full">
                  Finance Horoscope
                </button>
              </li> */}
              <li>
                <Link href="/horoscope/yearly-horoscope" className="hover:text-[#F6971E] hover:underline text-left block transition-colors">
                  Horoscope 2027
                </Link>
              </li>
            </ul>
          </div>

          {/* 2. Astrology Insights */}
          <div>
            <h2 className="mb-3.5 sm:mb-4 text-sm sm:text-md font-bold font-['Inria_Serif'] text-[#72271E] uppercase tracking-wider text-left">
              Astrology Insights
            </h2>
            <ul className="space-y-2.5 sm:space-y-3 font-helvetica text-[#5C5C5C] text-left text-xs sm:text-sm">
              <li>
                <button onClick={openPopup} className="hover:text-[#F6971E] hover:underline text-left block cursor-pointer transition-colors w-full">
                  Numerology
                </button>
              </li>
              <li>
                <button onClick={openPopup} className="hover:text-[#F6971E] hover:underline text-left block cursor-pointer transition-colors w-full">
                  Compatibility
                </button>
              </li>
              <li>
                <button onClick={openPopup} className="hover:text-[#F6971E] hover:underline text-left block cursor-pointer transition-colors w-full">
                  Tarot
                </button>
              </li>
              <li>
                <Link href="/horoscope/daily-horoscope" className="hover:text-[#F6971E] hover:underline text-left block transition-colors">
                  Zodiac Sign
                </Link>
              </li>
              <li>
                <button onClick={openPopup} className="hover:text-[#F6971E] hover:underline text-left block cursor-pointer transition-colors w-full">
                  Palm Reading
                </button>
              </li>
              <li>
                <button onClick={openPopup} className="hover:text-[#F6971E] hover:underline text-left block cursor-pointer transition-colors w-full">
                  Nakshatra
                </button>
              </li>
              <li>
                <button onClick={openPopup} className="hover:text-[#F6971E] hover:underline text-left block cursor-pointer transition-colors w-full">
                  Mantras
                </button>
              </li>
              {/* <li>
                <button onClick={openPopup} className="hover:text-[#F6971E] hover:underline text-left block cursor-pointer transition-colors w-full">
                  Festivals
                </button>
              </li> */}
            </ul>
          </div>

          {/* 3. Panchang */}
          <div>
            <h2 className="mb-3.5 sm:mb-4 text-sm sm:text-md font-bold font-['Inria_Serif'] text-[#72271E] uppercase tracking-wider text-left">
              Panchang
            </h2>
            <ul className="space-y-2.5 sm:space-y-3 font-helvetica text-[#5C5C5C] text-left text-xs sm:text-sm">
              <li>
                <button onClick={openPopup} className="hover:text-[#F6971E] hover:underline text-left block cursor-pointer transition-colors w-full">
                  Today&apos;s Panchang
                </button>
              </li>
              <li>
                <button onClick={openPopup} className="hover:text-[#F6971E] hover:underline text-left block cursor-pointer transition-colors w-full">
                  Today&apos;s Rahu Kaal
                </button>
              </li>
              <li>
                <button onClick={openPopup} className="hover:text-[#F6971E] hover:underline text-left block cursor-pointer transition-colors w-full">
                  Today Choghadiya
                </button>
              </li>
              <li>
                <button onClick={openPopup} className="hover:text-[#F6971E] hover:underline text-left block cursor-pointer transition-colors w-full">
                  Tomorrow Panchang
                </button>
              </li>
            </ul>
          </div>

          {/* 4. Top Poojas */}
          {isPoojaEnabled && (
            <div>
              <h2 className="mb-3.5 sm:mb-4 text-sm sm:text-md font-bold font-['Inria_Serif'] text-[#72271E] uppercase tracking-wider text-left">
                Top Poojas
              </h2>
              <ul className="space-y-2.5 sm:space-y-3 font-helvetica text-[#5C5C5C] text-left text-xs sm:text-sm">
                {topPoojas.length > 0 ? (
                  topPoojas.map((pooja) => (
                    <li key={pooja.id}>
                      <Link
                        href={`/pooja/${pooja.slug || pooja.id}`}
                        className="hover:text-[#F6971E] hover:underline text-left block transition-colors line-clamp-1"
                      >
                        {pooja.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  [...Array(5)].map((_, i) => (
                    <li key={i} className="h-4 bg-[#e2d5c8] rounded w-3/4 animate-pulse" />
                  ))
                )}
              </ul>
            </div>
          )}

          {/* 5. Company Information */}
          <div>
            <h2 className="mb-3.5 sm:mb-4 text-sm sm:text-md font-bold font-['Inria_Serif'] text-[#72271E] uppercase tracking-wider text-left">
              Company Information
            </h2>
            <ul className="space-y-2.5 sm:space-y-3 font-helvetica text-[#5C5C5C] text-left text-xs sm:text-sm">
              <li>
                <Link href="/privacy-policy" target="_blank" className="hover:text-[#F6971E] hover:underline text-left block transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" target="_blank" className="hover:text-[#F6971E] hover:underline text-left block transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" target="_blank" className="hover:text-[#F6971E] hover:underline text-left block transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/contact-us" target="_blank" className="hover:text-[#F6971E] hover:underline text-left block transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" target="_blank" className="hover:text-[#F6971E] hover:underline text-left block transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <hr className="my-6 md:my-8 border-[#72271E]/15" />

        {/* Bottom copyright row */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm font-helvetica text-[#5C5C5C] gap-4">
          <p className="text-center md:text-left">
            © 2026 @Balaji Astro Guide. All rights reserved. Embrace your cosmic destiny.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-4 sm:gap-x-6 gap-y-2 text-xs">
            <Link href="/astrologers" className="hover:text-[#F6971E] hover:underline transition-colors">Astrologers</Link>
            {isPoojaEnabled && (
              <Link href="/pooja" className="hover:text-[#F6971E] hover:underline transition-colors">Pooja</Link>
            )}
            {isPoojaEnabled && (
              <Link href="/spell" className="hover:text-[#F6971E] hover:underline transition-colors">Spells</Link>
            )}
            <Link href="/blog" className="hover:text-[#F6971E] hover:underline transition-colors">Blog</Link>
            {/* <Link href="/privacy-policy" target="_blank" className="hover:text-[#F6971E] hover:underline transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" target="_blank" className="hover:text-[#F6971E] hover:underline transition-colors">Terms of Service</Link>
            <Link href="/refund-policy" target="_blank" className="hover:text-[#F6971E] hover:underline transition-colors">Refund Policy</Link> */}
            <Link href="/contact-us" target="_blank" className="hover:text-[#F6971E] hover:underline transition-colors">Contact Us</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
