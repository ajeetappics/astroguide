'use client'

import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import Image from 'next/image';
import { apple_store, google_store, mainLogo } from '@/assets/images';
import { usePopup } from '../popup/PopupContext';

export default function Footer() {
  const { openPopup } = usePopup();

  return (
    <footer className="bg-[#EEE3D9]">
      <div className="mx-auto w-full max-w-screen-xl p-8 md:p-12">

        {/* Adjusted grid: from md:grid-cols-6 → md:grid-cols-5 */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">

          <div className="md:col-span-2">
            <Link href="/" className="flex">
              <Image
                src={mainLogo}
                className="w-9 mb-3 h-9"
                alt="Your Logo"
                width={100}
                height={100}
              />
            </Link>
            <p className="mb-6 font-helvetica text-[#5C5C5C] leading-relaxed">
              Discover your cosmic journey through authentic astrology and spiritual guidance. Your destiny awaits.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/BalajiAstroGuide/"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[#72271E] text-[#72271E] hover:bg-[#72271E] hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </Link>

              <Link
                href="https://www.instagram.com/balajiastroguide/"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[#72271E] text-[#72271E] hover:bg-[#72271E] hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </Link>

              {/* <Link
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[#72271E] text-[#72271E] hover:bg-[#72271E] hover:text-white transition-colors"
              >
                <FaTwitter />
              </Link> */}

              <Link
                href="https://youtube.com/@balaji_astroguide?si=XecUuu6Ws3Jq6_Oa"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[#72271E] text-[#72271E] hover:bg-[#72271E] hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube />
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Link
                href="https://play.google.com/store/apps/details?id=com.astrovani.balaji.app"
                className="flex items-center justify-center transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={google_store}
                  alt="GET IT ON Google Play"
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </Link>
              <Link
                href="https://apps.apple.com/in/app/balaji-astro-guide/id6753894953/"
                className="flex items-center justify-center transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={apple_store}
                  alt="Download on the App Store"
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </Link>
            </div>
          </div>

          {/* Commented About Section */}
          {/*
          <div className="md:col-span-1">
            <h2 className="mb-6 text-md font-bold font-['Inria_Serif'] text-[#72271E] uppercase tracking-wider">About</h2>
            <ul className="space-y-4 font-helvetica text-[#5C5C5C]">
              <li><Link href="/about/our-story" className="hover:underline">Our Story</Link></li>
              <li><Link href="/astrologers" className="hover:underline">Our Astrologers</Link></li>
              <li><Link href="/about/how-it-works" className="hover:underline">How It Works</Link></li>
              <li><Link href="/success-stories" className="hover:underline">Success Stories</Link></li>
            </ul>
          </div>
          */}

          <div className="md:col-span-1">
            <h2 className="mb-6 text-md font-bold font-['Inria_Serif'] text-[#72271E] uppercase tracking-wider">Services</h2>
            <ul className="space-y-4 font-helvetica text-[#5C5C5C]">
              <li><Link href="/astrologers" className="hover:underline text-left block">Astrologers</Link></li>
              <li><Link href="/pooja" className="hover:underline text-left block">Pooja</Link></li>
              <li><Link href="/blog" className="hover:underline text-left block">Blog</Link></li>
              <li><button onClick={openPopup} className="hover:underline text-left cursor-pointer">Daily Horoscope</button></li>
              <li><button onClick={openPopup} className="hover:underline text-left cursor-pointer">Kundli Reading</button></li>
              <li><button onClick={openPopup} className="hover:underline text-left cursor-pointer">Tarot Cards</button></li>
              <li><button onClick={openPopup} className="hover:underline text-left cursor-pointer">Palm Reading</button></li>
              {/* <li><button onClick={openPopup} className="hover:underline text-left cursor-pointer">Live Poojas</button></li> */}
            </ul>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 gap-8">
            <div>
              <h2 className="mb-6 text-md font-bold font-['Inria_Serif'] text-[#72271E] uppercase tracking-wider">Support</h2>
              <ul className="space-y-4 font-helvetica text-[#5C5C5C]">
                <li><button onClick={openPopup} className="hover:underline text-left cursor-pointer">Help Center</button></li>
                <li><Link href="/contact-us" className="hover:underline">Contact Us</Link></li>
                {/* <li><Link href="/support/live-chat" className="hover:underline">Live Chat</Link></li>
                <li><Link href="/support/customer-care" className="hover:underline">Customer Care</Link></li> */}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-md font-bold font-['Inria_Serif'] text-[#72271E] uppercase tracking-wider">Legal</h2>
              <ul className="space-y-4 font-helvetica text-[#5C5C5C]">
                <li><Link href="/privacy-policy" target="_blank" className="hover:underline">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" target="_blank" className="hover:underline">Terms of Service</Link></li>
                <li><Link href="/refund-policy" target="_blank" className="hover:underline">Refund Policy</Link></li>
                <li><button onClick={openPopup} className="hover:underline cursor-pointer">Disclaimer</button></li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-300" />
        <div className="flex flex-col md:flex-row justify-between items-center text-sm font-helvetica text-[#5C5C5C]">
          <p className="mb-4 md:mb-0">
            © 2026 @Balaji Astro Guide. All rights reserved. Embrace your cosmic destiny.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
            <Link href="/astrologers" className="hover:underline">Astrologers</Link>
            <Link href="/pooja" className="hover:underline">Pooja</Link>
            <Link href="/blog" className="hover:underline">Blog</Link>
            <Link href="/privacy-policy" target="_blank" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms-of-service" target="_blank" className="hover:underline">Terms of Service</Link>
            <Link href="/refund-policy" target="_blank" className="hover:underline">Refund Policy</Link>
            <Link href="/contact-us" target="_blank" className="hover:underline">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
