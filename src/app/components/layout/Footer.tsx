'use client'

import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import Image from 'next/image';
import { apple_store, google_store, mainLogo } from '@/assets/images';
import { usePopup } from '../popup/PopupContext';

export default function Footer() {
  const { openPopup } = usePopup();

  return (
    <footer className="bg-[#EEE3D9]">
      <div className="mx-auto w-full max-w-screen-xl p-6 sm:p-8 md:p-12">

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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 pt-8">

          {/* 1. Horoscope */}
          <div>
            <h2 className="mb-3.5 sm:mb-4 text-sm sm:text-md font-bold font-['Inria_Serif'] text-[#72271E] uppercase tracking-wider text-left">
              Horoscope
            </h2>
            <ul className="space-y-2.5 sm:space-y-3 font-helvetica text-[#5C5C5C] text-left text-xs sm:text-sm">
              <li>
                <Link href="/horoscope/daily-horoscope" className="hover:text-[#F6971E] hover:underline text-left block transition-colors">
                  Daily horoscope
                </Link>
              </li>
              <li>
                <Link href="/horoscope/weekly-horoscope" className="hover:text-[#F6971E] hover:underline text-left block transition-colors">
                  Weekly horoscope
                </Link>
              </li>
              <li>
                <Link href="/horoscope/monthly-horoscope" className="hover:text-[#F6971E] hover:underline text-left block transition-colors">
                  Monthly horoscope
                </Link>
              </li>
              <li>
                <Link href="/horoscope/yearly-horoscope" className="hover:text-[#F6971E] hover:underline text-left block transition-colors">
                  Yearly horoscope
                </Link>
              </li>
              <li>
                <button onClick={openPopup} className="hover:text-[#F6971E] hover:underline text-left block cursor-pointer transition-colors w-full">
                  Love horoscope
                </button>
              </li>
              <li>
                <button onClick={openPopup} className="hover:text-[#F6971E] hover:underline text-left block cursor-pointer transition-colors w-full">
                  Finance horoscope
                </button>
              </li>
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
              <li>
                <button onClick={openPopup} className="hover:text-[#F6971E] hover:underline text-left block cursor-pointer transition-colors w-full">
                  Festivals
                </button>
              </li>
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
                  Today&apos;s panchang
                </button>
              </li>
              <li>
                <button onClick={openPopup} className="hover:text-[#F6971E] hover:underline text-left block cursor-pointer transition-colors w-full">
                  Today&apos;s Rahu Kaal
                </button>
              </li>
              <li>
                <button onClick={openPopup} className="hover:text-[#F6971E] hover:underline text-left block cursor-pointer transition-colors w-full">
                  Today choghadiya
                </button>
              </li>
              <li>
                <button onClick={openPopup} className="hover:text-[#F6971E] hover:underline text-left block cursor-pointer transition-colors w-full">
                  Tommorrow Panchang
                </button>
              </li>
            </ul>
          </div>

          {/* 4. Free Services */}
          <div>
            <h2 className="mb-3.5 sm:mb-4 text-sm sm:text-md font-bold font-['Inria_Serif'] text-[#72271E] uppercase tracking-wider text-left">
              Free Services
            </h2>
            <ul className="space-y-2.5 sm:space-y-3 font-helvetica text-[#5C5C5C] text-left text-xs sm:text-sm">
              <li>
                <button onClick={openPopup} className="hover:text-[#F6971E] hover:underline text-left block cursor-pointer transition-colors w-full">
                  Free Kundli
                </button>
              </li>
              <li>
                <button onClick={openPopup} className="hover:text-[#F6971E] hover:underline text-left block cursor-pointer transition-colors w-full">
                  Match making
                </button>
              </li>
              <li>
                <button onClick={openPopup} className="hover:text-[#F6971E] hover:underline text-left block cursor-pointer transition-colors w-full">
                  Baby Kundli Generator
                </button>
              </li>
              <li>
                <button onClick={openPopup} className="hover:text-[#F6971E] hover:underline text-left block cursor-pointer transition-colors w-full">
                  Numerology
                </button>
              </li>
            </ul>
          </div>

          {/* 5. Company Information */}
          <div>
            <h2 className="mb-3.5 sm:mb-4 text-sm sm:text-md font-bold font-['Inria_Serif'] text-[#72271E] uppercase tracking-wider text-left">
              Company Information
            </h2>
            <ul className="space-y-2.5 sm:space-y-3 font-helvetica text-[#5C5C5C] text-left text-xs sm:text-sm">
              <li>
                <Link href="/privacy-policy" target="_blank" className="hover:text-[#F6971E] hover:underline text-left block transition-colors">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" target="_blank" className="hover:text-[#F6971E] hover:underline text-left block transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" target="_blank" className="hover:text-[#F6971E] hover:underline text-left block transition-colors">
                  Refund policy
                </Link>
              </li>
              <li>
                <Link href="/contact-us" target="_blank" className="hover:text-[#F6971E] hover:underline text-left block transition-colors">
                  About US
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
            <Link href="/pooja" className="hover:text-[#F6971E] hover:underline transition-colors">Pooja</Link>
            <Link href="/spell" className="hover:text-[#F6971E] hover:underline transition-colors">Spells</Link>
            <Link href="/blog" className="hover:text-[#F6971E] hover:underline transition-colors">Blog</Link>
            <Link href="/privacy-policy" target="_blank" className="hover:text-[#F6971E] hover:underline transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" target="_blank" className="hover:text-[#F6971E] hover:underline transition-colors">Terms of Service</Link>
            <Link href="/refund-policy" target="_blank" className="hover:text-[#F6971E] hover:underline transition-colors">Refund Policy</Link>
            <Link href="/contact-us" target="_blank" className="hover:text-[#F6971E] hover:underline transition-colors">Contact Us</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
