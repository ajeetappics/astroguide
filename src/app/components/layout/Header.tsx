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
        <header className=" fixed bg-[#FEF8E2] top-0 z-50 w-full rounded-br-3xl">
            <div className="header_shape w-full mx-auto  relative">
                <nav className="container-fluid relative">
                    <div className='flex  items-center'>
                        <div className='py-3 px-3 flex justify-center'>
                            <Link href="/" >
                                <Image
                                    src={mainLogo}
                                    className="h-[75px] w-[auto]"
                                    alt="Your Logo"
                                    width={100}
                                    height={100}
                                />
                            </Link>
                        </div>
                        <div className="flex justify-between items-center w-[100%] h-[100px] bg-[#F9B04E] rounded-bl-3xl rounded-br-3xl  px-4 py-4 shadow-[0px_3px_3.9px_0px_#00000040]">
                            <div className="flex-shrink-0">
                                <Link href="/" className="flex items-center ">
                                    <div className="mr-4 w-[200px] h-[100px] relative">
                                        <Image
                                            src={astrovaniLogo}
                                            alt="Balaji Astro Guide Logo"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>

                                </Link>
                            </div>

                            <div className="hidden lg:flex items-center space-x-8">
                                {/* <Link href="/chat" className="text-white hover:opacity-80 font-helvetica font-medium text-[18px]">Chat</Link> */}
                                <Link href={`${process.env.NEXT_PUBLIC_URL}/blog`} className="text-white hover:opacity-80 font-helvetica font-medium text-[18px]">Blog</Link>
                                {/* <Link href="/horoscopes" className="text-white hover:opacity-80 font-helvetica font-medium text-[18px]">Horoscopes</Link> */}
                                <button onClick={openPopup} className="text-white hover:opacity-80 font-helvetica font-medium text-[18px] cursor-pointer">Free Kundli</button>

                                <Link href={ASTROLOGER_URL} target='_blank' className="text-white hover:opacity-80 font-helvetica font-medium text-[18px]">
                                    Astrologer Registration
                                </Link>

                                {/* <Link
                                    href="/login"
                                    className="flex items-center gap-2 text-white bg-[#72271E] hover:bg-opacity-90 rounded-lg px-2.5 py-1.5 transition-colors font-helvetica font-medium text-[18px]"
                                >
                                    <BsPersonFill className="h-5 w-5" />
                                    <span>Login</span>
                                </Link> */}
                            </div>

                            <div className="lg:hidden">
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="text-white focus:outline-none"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16m-7 6h7"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {isMobileMenuOpen && (
                        <div className="lg:hidden mt-4 space-y-2 py-4 px-4 ">
                            {/* <Link href="/chat" className="block py-2 text-[#514f48] hover:bg-white/10 rounded-md px-3 text-lg font-helvetica">Chat</Link> */}
                            <Link href={`${process.env.NEXT_PUBLIC_URL}/blog`} className="block py-2 text-[#514f48] hover:bg-white/10 rounded-md px-3 text-lg font-helvetica">Blog</Link>
                            {/* <Link href="/horoscopes" className="block py-2 text-[#514f48] hover:bg-white/10 rounded-md px-3 text-lg font-helvetica">Horoscopes</Link> */}
                            <button onClick={openPopup} className="block w-full text-left py-2 text-[#514f48] hover:bg-white/10 rounded-md px-3 text-lg font-helvetica cursor-pointer">Free Kundli</button>

                            <Link href={ASTROLOGER_URL} target='_blank' className="block py-2 text-[#514f48] hover:bg-white/10 rounded-md px-3 text-lg font-helvetica">
                                Astrologer Registration
                            </Link>

                            {/* <div className="pt-2">
                                <Link
                                    href="/login"
                                    className="flex items-center justify-center gap-2 w-full text-center text-white bg-[#72271E] font-medium rounded-lg px-2.5 py-1.5 text-lg font-helvetica"
                                >
                                    <BsPersonFill className="h-5 w-5" />
                                    <span>Login</span>
                                </Link>
                            </div> */}
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}
