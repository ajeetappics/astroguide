'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { astrovaniLogo, mainLogo } from '@/assets/images';
import Image from 'next/image';
import { BsChevronDown } from 'react-icons/bs';
import { usePopup } from '../popup/PopupContext';
import { usePoojaConfig } from '@/app/context/PoojaConfigContext';

// Astrologer URL - hardcoded to prevent undefined issues in production
const ASTROLOGER_URL = (process.env.NEXT_PUBLIC_ASTROLOGER_URL && process.env.NEXT_PUBLIC_ASTROLOGER_URL !== 'undefined') 
  ? process.env.NEXT_PUBLIC_ASTROLOGER_URL 
  : 'https://astrologer.balajiastroguide.com';

const horoscopeMenuItems = [
  { label: 'Daily Horoscope', href: '/horoscope/daily-horoscope' },
  // { label: "Tomorrow's Horoscope", href: '/horoscope/tomorrow-horoscope' },
  // { label: "Yesterday's Horoscope", href: '/horoscope/yesterday-horoscope' },
  { label: 'Weekly Horoscope', href: '/horoscope/weekly-horoscope' },
  // { label: 'Monthly Horoscope', href: '/horoscope/monthly-horoscope' },
  { label: 'Yearly Horoscope', href: '/horoscope/yearly-horoscope' },
];

const categoryMenuItems = [
  { label: 'Love', href: '/astrologers/category/love', icon: '/images/love.png' },
  { label: 'Marriage', href: '/astrologers/category/marriage', icon: '/images/marriage.png' },
  { label: 'Career', href: '/astrologers/category/career', icon: '/images/career_color.png' },
  { label: 'Finance', href: '/astrologers/category/finance', icon: '/images/finance.png' },
  { label: 'Business', href: '/astrologers/category/business', icon: '/images/business.png' },
  { label: 'Health', href: '/astrologers/category/health', icon: '/images/health.png' },
];

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
    const [isHoroscopeOpen, setIsHoroscopeOpen] = useState(false);
    const [isMobileHoroscopeOpen, setIsMobileHoroscopeOpen] = useState(false);
    const { openPopup } = usePopup();
    const { isPoojaEnabled } = usePoojaConfig();

    const handleSpotlightMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
        if (e.touches && e.touches[0]) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.touches[0].clientX - rect.left;
            const y = e.touches[0].clientY - rect.top;
            e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
            e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
        }
    };

    return (
        <header className="fixed bg-white/90 backdrop-blur-sm top-0 z-50 w-full shadow-[0_2px_15px_rgba(0,0,0,0.05)] transition-all duration-300">
            <div className="container mx-auto max-w-7xl px-4">
                <nav className="flex justify-between items-center h-[70px] lg:h-[80px]">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center gap-3">
                            <Image
                                src={mainLogo}
                                alt="Balaji Astro Icon"
                                width={55}
                                height={55}
                                className="object-contain"
                                priority
                            />
                            <div className="w-[160px] h-[45px] relative">
                                <Image
                                    src={astrovaniLogo}
                                    alt="Balaji Astro Guide Logo"
                                    fill
                                    sizes="160px"
                                    className="object-contain object-left"
                                    priority
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1 xl:gap-2">
                        <Link
                            href="/astrologers"
                            onMouseMove={handleSpotlightMouseMove}
                            className="spotlight-menu-item relative flex items-center px-3 py-1.5 rounded-full text-[#4A2B23] hover:text-[#72271E] hover:bg-orange-50/70 border border-transparent hover:border-[#F6971E]/20 font-helvetica font-semibold text-[14px] xl:text-[15px] transition-all tracking-wide"
                        >
                            <span className="relative z-10">Astrologers</span>
                        </Link>

                        {/* Categories Dropdown */}
                        <div
                            className="relative group flex items-center h-full"
                            onMouseEnter={() => setIsCategoryOpen(true)}
                            onMouseLeave={() => setIsCategoryOpen(false)}
                        >
                            <button
                                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                onMouseMove={handleSpotlightMouseMove}
                                className={`spotlight-menu-item relative flex items-center gap-1.5 px-3 py-1.5 rounded-full font-helvetica font-semibold text-[14px] xl:text-[15px] transition-all duration-200 tracking-wide cursor-pointer border border-transparent hover:border-[#F6971E]/20 ${
                                    isCategoryOpen 
                                        ? 'text-[#72271E] bg-orange-50 border-[#F6971E]/20' 
                                        : 'text-[#4A2B23] hover:text-[#72271E] hover:bg-orange-50/70'
                                }`}
                            >
                                <span className="relative z-10">Categories</span>
                                <BsChevronDown className={`text-[10px] relative z-10 transition-transform duration-300 ease-out ${
                                    isCategoryOpen ? 'text-[#F6971E] rotate-180' : 'text-[#4A2B23] group-hover:text-[#F6971E]'
                                }`} />
                            </button>

                            {/* Categories Dropdown Card */}
                            {isCategoryOpen && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-[260px] z-50 animate-dropdown before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3">
                                    <div className="bg-white/95 backdrop-blur-md border border-[#F6971E]/25 rounded-[22px] shadow-[0_16px_40px_rgba(74,43,35,0.14)] p-2">
                                        <ul className="space-y-0.5">
                                            {categoryMenuItems.map((item) => (
                                                <li key={item.href}>
                                                    <Link
                                                        href={item.href}
                                                        onClick={() => setIsCategoryOpen(false)}
                                                        onMouseMove={handleSpotlightMouseMove}
                                                        className="spotlight-menu-item group/item flex items-center justify-between py-2.5 px-3 rounded-xl text-[#4A2B23] hover:text-[#72271E] hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50/70 border border-transparent hover:border-[#F6971E]/20 text-[13.5px] font-semibold font-helvetica"
                                                    >
                                                        <div className="flex items-center gap-2.5 relative z-10">
                                                            <div className="w-6 h-6 rounded-lg bg-orange-50/80 group-hover/item:bg-white flex items-center justify-center transition-colors">
                                                                <Image
                                                                    src={item.icon}
                                                                    alt={item.label}
                                                                    width={16}
                                                                    height={16}
                                                                    className="w-4 h-4 object-contain group-hover/item:scale-110 transition-transform duration-200"
                                                                />
                                                            </div>
                                                            <span>{item.label}</span>
                                                        </div>
                                                        <span className="arrow relative z-10 text-[#F6971E] group-hover/item:translate-x-1.5 transition-transform duration-300 text-sm">
                                                            &rarr;
                                                        </span>
                                                    </Link>
                                                </li>
                                            ))}
                                            <li className="pt-1.5 mt-1 border-t border-gray-100/80">
                                                <Link
                                                    href="/astrologers/category"
                                                    onClick={() => setIsCategoryOpen(false)}
                                                    onMouseMove={handleSpotlightMouseMove}
                                                    className="spotlight-menu-item group/item flex items-center justify-between py-2 px-3 rounded-xl text-xs font-bold text-[#F6971E] hover:bg-orange-50 border border-transparent hover:border-[#F6971E]/20 font-helvetica"
                                                >
                                                    <span className="relative z-10">View All Categories</span>
                                                    <span className="arrow relative z-10 group-hover/item:translate-x-1.5 transition-transform duration-300">&rarr;</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Horoscope Dropdown */}
                        <div
                            className="relative group flex items-center h-full"
                            onMouseEnter={() => setIsHoroscopeOpen(true)}
                            onMouseLeave={() => setIsHoroscopeOpen(false)}
                        >
                            <button
                                onClick={() => setIsHoroscopeOpen(!isHoroscopeOpen)}
                                onMouseMove={handleSpotlightMouseMove}
                                className={`spotlight-menu-item relative flex items-center gap-1.5 px-3 py-1.5 rounded-full font-helvetica font-semibold text-[14px] xl:text-[15px] transition-all duration-200 tracking-wide cursor-pointer border border-transparent hover:border-[#F6971E]/20 ${
                                    isHoroscopeOpen 
                                        ? 'text-[#72271E] bg-orange-50 border-[#F6971E]/20' 
                                        : 'text-[#4A2B23] hover:text-[#72271E] hover:bg-orange-50/70'
                                }`}
                            >
                                <span className="relative z-10">Horoscope</span>
                                <BsChevronDown className={`text-[10px] relative z-10 transition-transform duration-300 ease-out ${
                                    isHoroscopeOpen ? 'text-[#F6971E] rotate-180' : 'text-[#4A2B23] group-hover:text-[#F6971E]'
                                }`} />
                            </button>

                            {/* Dropdown Card */}
                            {isHoroscopeOpen && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-[240px] z-50 animate-dropdown before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3">
                                    <div className="bg-white/95 backdrop-blur-md border border-[#F6971E]/25 rounded-[22px] shadow-[0_16px_40px_rgba(74,43,35,0.14)] p-2">
                                        <ul className="space-y-0.5">
                                            {horoscopeMenuItems.map((item) => (
                                                <li key={item.href}>
                                                    <Link
                                                        href={item.href}
                                                        onClick={() => setIsHoroscopeOpen(false)}
                                                        onMouseMove={handleSpotlightMouseMove}
                                                        className="spotlight-menu-item group/item flex items-center justify-between py-2.5 px-3.5 rounded-xl text-[#4A2B23] hover:text-[#72271E] hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50/70 border border-transparent hover:border-[#F6971E]/20 text-[13.5px] font-semibold font-helvetica"
                                                    >
                                                        <span className="relative z-10">{item.label}</span>
                                                        <span className="arrow relative z-10 text-[#F6971E] group-hover/item:translate-x-1.5 transition-transform duration-300 text-sm">
                                                            &rarr;
                                                        </span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>

                        {isPoojaEnabled && (
                            <Link
                                href="/pooja"
                                onMouseMove={handleSpotlightMouseMove}
                                className="spotlight-menu-item relative flex items-center px-3 py-1.5 rounded-full text-[#4A2B23] hover:text-[#72271E] hover:bg-orange-50/70 border border-transparent hover:border-[#F6971E]/20 font-helvetica font-semibold text-[14px] xl:text-[15px] transition-all tracking-wide"
                            >
                                <span className="relative z-10">Pooja</span>
                            </Link>
                        )}
                        {isPoojaEnabled && (
                            <Link
                                href="/spell"
                                onMouseMove={handleSpotlightMouseMove}
                                className="spotlight-menu-item relative flex items-center px-3 py-1.5 rounded-full text-[#4A2B23] hover:text-[#72271E] hover:bg-orange-50/70 border border-transparent hover:border-[#F6971E]/20 font-helvetica font-semibold text-[14px] xl:text-[15px] transition-all tracking-wide"
                            >
                                <span className="relative z-10">Spells</span>
                            </Link>
                        )}
                        <Link
                            href={`${process.env.NEXT_PUBLIC_URL}/blog`}
                            onMouseMove={handleSpotlightMouseMove}
                            className="spotlight-menu-item relative flex items-center px-3 py-1.5 rounded-full text-[#4A2B23] hover:text-[#72271E] hover:bg-orange-50/70 border border-transparent hover:border-[#F6971E]/20 font-helvetica font-semibold text-[14px] xl:text-[15px] transition-all tracking-wide"
                        >
                            <span className="relative z-10">Blog</span>
                        </Link>
                        <button
                            onClick={openPopup}
                            onMouseMove={handleSpotlightMouseMove}
                            className="spotlight-menu-item relative flex items-center px-3 py-1.5 rounded-full text-[#4A2B23] hover:text-[#72271E] hover:bg-orange-50/70 border border-transparent hover:border-[#F6971E]/20 font-helvetica font-semibold text-[14px] xl:text-[15px] transition-all tracking-wide cursor-pointer"
                        >
                            <span className="relative z-10">Free Kundli</span>
                        </button>
                        <Link
                            href={ASTROLOGER_URL}
                            target="_blank"
                            onMouseMove={handleSpotlightMouseMove}
                            className="spotlight-menu-item relative flex items-center px-3 py-1.5 rounded-full text-[#4A2B23] hover:text-[#72271E] hover:bg-orange-50/70 border border-transparent hover:border-[#F6971E]/20 font-helvetica font-semibold text-[14px] xl:text-[15px] transition-all tracking-wide"
                        >
                            <span className="relative z-10">Astrologer Registration</span>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-[#4A2B23] hover:text-[#F6971E] focus:outline-none transition-colors"
                        >
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-[70px] left-0 w-full bg-[#FEF8E2]/95 backdrop-blur-md border-t border-[#F6971E]/10 shadow-lg px-4 py-4 flex flex-col space-y-2 pb-6 max-h-[85vh] overflow-y-auto animate-dropdown">
                    <Link
                        href="/astrologers"
                        onClick={() => setIsMobileMenuOpen(false)}
                        onMouseMove={handleSpotlightMouseMove}
                        onTouchMove={handleTouchMove}
                        className="spotlight-menu-item relative flex items-center justify-between py-2.5 px-4 rounded-xl text-[#4A2B23] hover:text-[#72271E] hover:bg-white/80 border border-transparent hover:border-[#F6971E]/20 text-base font-semibold font-helvetica transition-all"
                    >
                        <span className="relative z-10">Astrologers</span>
                        <span className="arrow relative z-10 text-[#F6971E] text-sm">&rarr;</span>
                    </Link>

                    {/* Mobile Categories Accordion */}
                    <div className="rounded-xl overflow-hidden bg-white border border-[#F6971E]/20 shadow-2xs">
                        <button
                            onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}
                            onMouseMove={handleSpotlightMouseMove}
                            onTouchMove={handleTouchMove}
                            className="spotlight-menu-item relative w-full flex items-center justify-between py-2.5 px-4 text-[#4A2B23] font-semibold font-helvetica text-base transition-all hover:bg-orange-50/50"
                        >
                            <span className="relative z-10">Categories</span>
                            <BsChevronDown className={`relative z-10 text-xs text-[#F6971E] transition-transform duration-200 ${isMobileCategoryOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isMobileCategoryOpen && (
                            <div className="bg-orange-50/40 p-2 space-y-1 border-t border-[#F6971E]/15">
                                {categoryMenuItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => {
                                            setIsMobileCategoryOpen(false);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        onMouseMove={handleSpotlightMouseMove}
                                        onTouchMove={handleTouchMove}
                                        className="spotlight-menu-item group/item relative flex items-center justify-between py-2 px-3 rounded-lg text-[#4A2B23] hover:text-[#72271E] hover:bg-white border border-transparent hover:border-[#F6971E]/20 text-sm transition-all font-medium"
                                    >
                                        <div className="flex items-center gap-2.5 relative z-10">
                                            <Image
                                                src={item.icon}
                                                alt={item.label}
                                                width={20}
                                                height={20}
                                                className="w-4 h-4 object-contain"
                                            />
                                            <span>{item.label}</span>
                                        </div>
                                        <span className="arrow relative z-10 text-[#F6971E] text-sm">&rarr;</span>
                                    </Link>
                                ))}
                                <div className="pt-1 mt-1 border-t border-orange-200/50">
                                    <Link
                                        href="/astrologers/category"
                                        onClick={() => {
                                            setIsMobileCategoryOpen(false);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        onMouseMove={handleSpotlightMouseMove}
                                        onTouchMove={handleTouchMove}
                                        className="spotlight-menu-item group/item relative flex items-center justify-between py-2 px-3 rounded-lg text-xs font-bold text-[#F6971E] hover:bg-white border border-transparent hover:border-[#F6971E]/20 transition-all font-helvetica"
                                    >
                                        <span className="relative z-10">View All Categories</span>
                                        <span className="arrow relative z-10">&rarr;</span>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Horoscope Accordion */}
                    <div className="rounded-xl overflow-hidden bg-white border border-[#F6971E]/20 shadow-2xs">
                        <button
                            onClick={() => setIsMobileHoroscopeOpen(!isMobileHoroscopeOpen)}
                            onMouseMove={handleSpotlightMouseMove}
                            onTouchMove={handleTouchMove}
                            className="spotlight-menu-item relative w-full flex items-center justify-between py-2.5 px-4 text-[#4A2B23] font-semibold font-helvetica text-base transition-all hover:bg-orange-50/50"
                        >
                            <span className="relative z-10">Horoscope</span>
                            <BsChevronDown className={`relative z-10 text-xs text-[#F6971E] transition-transform duration-200 ${isMobileHoroscopeOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isMobileHoroscopeOpen && (
                            <div className="bg-orange-50/40 p-2 space-y-1 border-t border-[#F6971E]/15">
                                {horoscopeMenuItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => {
                                            setIsMobileHoroscopeOpen(false);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        onMouseMove={handleSpotlightMouseMove}
                                        onTouchMove={handleTouchMove}
                                        className="spotlight-menu-item group/item relative flex items-center justify-between py-2 px-3 rounded-lg text-[#4A2B23] hover:text-[#72271E] hover:bg-white border border-transparent hover:border-[#F6971E]/20 text-sm transition-all font-medium"
                                    >
                                        <span className="relative z-10">{item.label}</span>
                                        <span className="arrow relative z-10 text-[#F6971E] text-sm">&rarr;</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {isPoojaEnabled && (
                        <Link
                            href="/pooja"
                            onClick={() => setIsMobileMenuOpen(false)}
                            onMouseMove={handleSpotlightMouseMove}
                            onTouchMove={handleTouchMove}
                            className="spotlight-menu-item relative flex items-center justify-between py-2.5 px-4 rounded-xl text-[#4A2B23] hover:text-[#72271E] hover:bg-white/80 border border-transparent hover:border-[#F6971E]/20 text-base font-semibold font-helvetica transition-all"
                        >
                            <span className="relative z-10">Pooja</span>
                            <span className="arrow relative z-10 text-[#F6971E] text-sm">&rarr;</span>
                        </Link>
                    )}
                    {isPoojaEnabled && (
                        <Link
                            href="/spell"
                            onClick={() => setIsMobileMenuOpen(false)}
                            onMouseMove={handleSpotlightMouseMove}
                            onTouchMove={handleTouchMove}
                            className="spotlight-menu-item relative flex items-center justify-between py-2.5 px-4 rounded-xl text-[#4A2B23] hover:text-[#72271E] hover:bg-white/80 border border-transparent hover:border-[#F6971E]/20 text-base font-semibold font-helvetica transition-all"
                        >
                            <span className="relative z-10">Spells</span>
                            <span className="arrow relative z-10 text-[#F6971E] text-sm">&rarr;</span>
                        </Link>
                    )}
                    <Link
                        href={`${process.env.NEXT_PUBLIC_URL}/blog`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        onMouseMove={handleSpotlightMouseMove}
                        onTouchMove={handleTouchMove}
                        className="spotlight-menu-item relative flex items-center justify-between py-2.5 px-4 rounded-xl text-[#4A2B23] hover:text-[#72271E] hover:bg-white/80 border border-transparent hover:border-[#F6971E]/20 text-base font-semibold font-helvetica transition-all"
                    >
                        <span className="relative z-10">Blog</span>
                        <span className="arrow relative z-10 text-[#F6971E] text-sm">&rarr;</span>
                    </Link>
                    <button
                        onClick={() => {
                            setIsMobileMenuOpen(false);
                            openPopup();
                        }}
                        onMouseMove={handleSpotlightMouseMove}
                        onTouchMove={handleTouchMove}
                        className="spotlight-menu-item relative flex items-center justify-between w-full py-2.5 px-4 rounded-xl text-[#4A2B23] hover:text-[#72271E] hover:bg-white/80 border border-transparent hover:border-[#F6971E]/20 text-base font-semibold font-helvetica transition-all cursor-pointer"
                    >
                        <span className="relative z-10">Free Kundli</span>
                        <span className="arrow relative z-10 text-[#F6971E] text-sm">&rarr;</span>
                    </button>
                    <Link
                        href={ASTROLOGER_URL}
                        target='_blank'
                        onClick={() => setIsMobileMenuOpen(false)}
                        onMouseMove={handleSpotlightMouseMove}
                        onTouchMove={handleTouchMove}
                        className="spotlight-menu-item relative flex items-center justify-between py-2.5 px-4 rounded-xl text-[#4A2B23] hover:text-[#72271E] hover:bg-white/80 border border-transparent hover:border-[#F6971E]/20 text-base font-semibold font-helvetica transition-all"
                    >
                        <span className="relative z-10">Astrologer Registration</span>
                        <span className="arrow relative z-10 text-[#F6971E] text-sm">&rarr;</span>
                    </Link>
                </div>
            )}
        </header>
    );
}
