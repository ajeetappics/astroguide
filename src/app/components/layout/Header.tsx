'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { astrovaniLogo, fullLogo, mainLogo } from '@/assets/images';
import Image from 'next/image';
import { BsPersonFill } from 'react-icons/bs';
import { usePopup } from '../popup/PopupContext';

// Astrologer URL - hardcoded to prevent undefined issues in production
// Environment variable can override this if set at build time
const ASTROLOGER_URL = (process.env.NEXT_PUBLIC_ASTROLOGER_URL && process.env.NEXT_PUBLIC_ASTROLOGER_URL !== 'undefined') 
  ? process.env.NEXT_PUBLIC_ASTROLOGER_URL 
  : 'https://astrologer.balajiastroguide.com';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { openPopup } = usePopup();

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
                                    className="object-contain object-left"
                                    priority
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <Link href={`${process.env.NEXT_PUBLIC_URL}/blog`} className="text-[#4A2B23] hover:text-[#F6971E] font-helvetica font-semibold text-[15px] transition-colors tracking-wide">
                            Blog
                        </Link>
                        <button onClick={openPopup} className="text-[#4A2B23] hover:text-[#F6971E] font-helvetica font-semibold text-[15px] transition-colors tracking-wide cursor-pointer">
                            Free Kundli
                        </button>
                        <Link href={ASTROLOGER_URL} target='_blank' className="text-[#4A2B23] hover:text-[#F6971E] font-helvetica font-semibold text-[15px] transition-colors tracking-wide">
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
                <div className="lg:hidden absolute top-[70px] left-0 w-full bg-[#FEF8E2]/95 backdrop-blur-md border-t border-[#F6971E]/10 shadow-lg px-4 py-4 flex flex-col space-y-2 pb-6">
                    <Link href={`${process.env.NEXT_PUBLIC_URL}/blog`} className="block py-3 text-[#4A2B23] hover:text-[#F6971E] hover:bg-white/50 rounded-lg px-4 text-base font-semibold font-helvetica transition-all">
                        Blog
                    </Link>
                    <button onClick={openPopup} className="block w-full text-left py-3 text-[#4A2B23] hover:text-[#F6971E] hover:bg-white/50 rounded-lg px-4 text-base font-semibold font-helvetica transition-all cursor-pointer">
                        Free Kundli
                    </button>
                    <Link href={ASTROLOGER_URL} target='_blank' className="block py-3 text-[#4A2B23] hover:text-[#F6971E] hover:bg-white/50 rounded-lg px-4 text-base font-semibold font-helvetica transition-all">
                        Astrologer Registration
                    </Link>
                </div>
            )}
        </header>
    );
}
