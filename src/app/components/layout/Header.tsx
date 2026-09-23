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
                    <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
                        <Link href="/astrologers" className="text-[#4A2B23] hover:text-[#F6971E] font-helvetica font-semibold text-[14px] xl:text-[15px] transition-colors tracking-wide">
                            Astrologers
                        </Link>

                        {/* Categories Dropdown */}
                        <div
                            className="relative group flex items-center h-full"
                            onMouseEnter={() => setIsCategoryOpen(true)}
                            onMouseLeave={() => setIsCategoryOpen(false)}
                        >
                            <button
                                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                className="flex items-center gap-1.5 text-[#4A2B23] hover:text-[#F6971E] font-helvetica font-semibold text-[14px] xl:text-[15px] transition-colors tracking-wide cursor-pointer py-2"
                            >
                                <span className={isCategoryOpen ? 'text-[#F6971E]' : ''}>Categories</span>
                                <BsChevronDown className={`text-[10px] transition-transform duration-200 ${
                                    isCategoryOpen ? 'text-[#F6971E] rotate-180' : 'text-[#4A2B23] group-hover:text-[#F6971E]'
                                }`} />
                            </button>

                            {/* Categories Dropdown Card */}
                            {isCategoryOpen && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1.5 w-[250px] z-50">
                                    <div className="bg-white border border-[#F6971E]/25 rounded-[20px] shadow-[0_12px_40px_rgba(74,43,35,0.12)] p-2.5">
                                        <ul className="space-y-1">
                                            {categoryMenuItems.map((item) => (
                                                <li key={item.href}>
                                                    <Link
                                                        href={item.href}
                                                        onClick={() => setIsCategoryOpen(false)}
                                                        className="group/item flex items-center justify-between py-2.5 px-3 rounded-xl text-[#4A2B23] hover:text-[#F6971E] hover:bg-orange-50/80 transition-all text-[13.5px] font-semibold font-helvetica"
                                                    >
                                                        <div className="flex items-center gap-2.5">
                                                            <Image
                                                                src={item.icon}
                                                                alt={item.label}
                                                                width={20}
                                                                height={20}
                                                                className="w-4 h-4 object-contain"
                                                            />
                                                            <span>{item.label}</span>
                                                        </div>
                                                        <span className="text-[#F6971E] group-hover/item:translate-x-1 transition-all text-sm">
                                                            &rarr;
                                                        </span>
                                                    </Link>
                                                </li>
                                            ))}
                                            <li className="pt-1.5 mt-1 border-t border-gray-100">
                                                <Link
                                                    href="/astrologers/category"
                                                    onClick={() => setIsCategoryOpen(false)}
                                                    className="flex items-center justify-between py-2 px-3 rounded-xl text-xs font-bold text-[#F6971E] hover:bg-orange-50 transition-all font-helvetica"
                                                >
                                                    <span>View All Categories</span>
                                                    <span>&rarr;</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Horoscope Dropdown (Simple text link matching other nav links) */}
                        <div
                            className="relative group flex items-center h-full"
                            onMouseEnter={() => setIsHoroscopeOpen(true)}
                            onMouseLeave={() => setIsHoroscopeOpen(false)}
                        >
                            <button
                                onClick={() => setIsHoroscopeOpen(!isHoroscopeOpen)}
                                className="flex items-center gap-1.5 text-[#4A2B23] hover:text-[#F6971E] font-helvetica font-semibold text-[14px] xl:text-[15px] transition-colors tracking-wide cursor-pointer py-2"
                            >
                                <span className={isHoroscopeOpen ? 'text-[#F6971E]' : ''}>Horoscope</span>
                                <BsChevronDown className={`text-[10px] transition-transform duration-200 ${
                                    isHoroscopeOpen ? 'text-[#F6971E] rotate-180' : 'text-[#4A2B23] group-hover:text-[#F6971E]'
                                }`} />
                            </button>

                            {/* Dropdown Card - seamless hover zone without empty gap */}
                            {isHoroscopeOpen && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1.5 w-[250px] z-50">
                                    <div className="bg-white border border-[#F6971E]/25 rounded-[20px] shadow-[0_12px_40px_rgba(74,43,35,0.12)] p-2.5">
                                        <ul className="space-y-1">
                                            {horoscopeMenuItems.map((item) => (
                                                <li key={item.href}>
                                                    <Link
                                                        href={item.href}
                                                        onClick={() => setIsHoroscopeOpen(false)}
                                                        className="group/item flex items-center justify-between py-2.5 px-3 rounded-xl text-[#4A2B23] hover:text-[#F6971E] hover:bg-orange-50/80 transition-all text-[13.5px] font-semibold font-helvetica"
                                                    >
                                                        <span>{item.label}</span>
                                                        <span className="text-[#F6971E] group-hover/item:translate-x-1 transition-all text-sm">
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
                            <Link href="/pooja" className="text-[#4A2B23] hover:text-[#F6971E] font-helvetica font-semibold text-[14px] xl:text-[15px] transition-colors tracking-wide">
                                Pooja
                            </Link>
                        )}
                        {isPoojaEnabled && (
                            <Link href="/spell" className="text-[#4A2B23] hover:text-[#F6971E] font-helvetica font-semibold text-[14px] xl:text-[15px] transition-colors tracking-wide">
                                Spells
                            </Link>
                        )}
                        <Link href={`${process.env.NEXT_PUBLIC_URL}/blog`} className="text-[#4A2B23] hover:text-[#F6971E] font-helvetica font-semibold text-[14px] xl:text-[15px] transition-colors tracking-wide">
                            Blog
                        </Link>
                        <button onClick={openPopup} className="text-[#4A2B23] hover:text-[#F6971E] font-helvetica font-semibold text-[14px] xl:text-[15px] transition-colors tracking-wide cursor-pointer">
                            Free Kundli
                        </button>
                        <Link href={ASTROLOGER_URL} target='_blank' className="text-[#4A2B23] hover:text-[#F6971E] font-helvetica font-semibold text-[14px] xl:text-[15px] transition-colors tracking-wide">
                            Astrologer Registration
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
                <div className="lg:hidden absolute top-[70px] left-0 w-full bg-[#FEF8E2]/95 backdrop-blur-md border-t border-[#F6971E]/10 shadow-lg px-4 py-4 flex flex-col space-y-2 pb-6 max-h-[85vh] overflow-y-auto">
                    <Link
                        href="/astrologers"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2 text-[#4A2B23] hover:text-[#F6971E] hover:bg-white/50 rounded-lg px-4 text-base font-semibold font-helvetica transition-all"
                    >
                        Astrologers
                    </Link>

                    {/* Mobile Categories Accordion */}
                    <div className="rounded-xl overflow-hidden bg-white border border-[#F6971E]/20 shadow-2xs">
                        <button
                            onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}
                            className="w-full flex items-center justify-between py-2.5 px-4 text-[#4A2B23] font-semibold font-helvetica text-base transition-all hover:bg-orange-50/50"
                        >
                            <span>Categories</span>
                            <BsChevronDown className={`text-xs text-[#F6971E] transition-transform duration-200 ${isMobileCategoryOpen ? 'rotate-180' : ''}`} />
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
                                        className="flex items-center justify-between py-2 px-3 rounded-lg text-[#4A2B23] hover:text-[#F6971E] hover:bg-white text-sm transition-all font-medium"
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <Image
                                                src={item.icon}
                                                alt={item.label}
                                                width={20}
                                                height={20}
                                                className="w-4 h-4 object-contain"
                                            />
                                            <span>{item.label}</span>
                                        </div>
                                        <span className="text-[#F6971E] text-sm">&rarr;</span>
                                    </Link>
                                ))}
                                <div className="pt-1 mt-1 border-t border-orange-200/50">
                                    <Link
                                        href="/astrologers/category"
                                        onClick={() => {
                                            setIsMobileCategoryOpen(false);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="flex items-center justify-between py-2 px-3 rounded-lg text-xs font-bold text-[#F6971E] hover:bg-white transition-all"
                                    >
                                        <span>View All Categories</span>
                                        <span>&rarr;</span>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Horoscope Accordion */}
                    <div className="rounded-xl overflow-hidden bg-white border border-[#F6971E]/20 shadow-2xs">
                        <button
                            onClick={() => setIsMobileHoroscopeOpen(!isMobileHoroscopeOpen)}
                            className="w-full flex items-center justify-between py-2.5 px-4 text-[#4A2B23] font-semibold font-helvetica text-base transition-all hover:bg-orange-50/50"
                        >
                            <span>Horoscope</span>
                            <BsChevronDown className={`text-xs text-[#F6971E] transition-transform duration-200 ${isMobileHoroscopeOpen ? 'rotate-180' : ''}`} />
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
                                        className="flex items-center justify-between py-2 px-3 rounded-lg text-[#4A2B23] hover:text-[#F6971E] hover:bg-white text-sm transition-all font-medium"
                                    >
                                        <span>{item.label}</span>
                                        <span className="text-[#F6971E] text-sm">&rarr;</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {isPoojaEnabled && (
                        <Link
                            href="/pooja"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-2 text-[#4A2B23] hover:text-[#F6971E] hover:bg-white/50 rounded-lg px-4 text-base font-semibold font-helvetica transition-all"
                        >
                            Pooja
                        </Link>
                    )}
                    {isPoojaEnabled && (
                        <Link
                            href="/spell"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-2 text-[#4A2B23] hover:text-[#F6971E] hover:bg-white/50 rounded-lg px-4 text-base font-semibold font-helvetica transition-all"
                        >
                            Spells
                        </Link>
                    )}
                    <Link
                        href={`${process.env.NEXT_PUBLIC_URL}/blog`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2 text-[#4A2B23] hover:text-[#F6971E] hover:bg-white/50 rounded-lg px-4 text-base font-semibold font-helvetica transition-all"
                    >
                        Blog
                    </Link>
                    <button
                        onClick={() => {
                            setIsMobileMenuOpen(false);
                            openPopup();
                        }}
                        className="block w-full text-left py-2 text-[#4A2B23] hover:text-[#F6971E] hover:bg-white/50 rounded-lg px-4 text-base font-semibold font-helvetica transition-all cursor-pointer"
                    >
                        Free Kundli
                    </button>
                    <Link
                        href={ASTROLOGER_URL}
                        target='_blank'
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2 text-[#4A2B23] hover:text-[#F6971E] hover:bg-white/50 rounded-lg px-4 text-base font-semibold font-helvetica transition-all"
                    >
                        Astrologer Registration
                    </Link>
                </div>
            )}
        </header>
    );
}
