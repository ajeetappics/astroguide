'use client'

import React from "react";
import Image from "next/image";
import { astrovaniLogo } from "@/assets/images";
import { usePopup } from "../popup/PopupContext";

export default function MainBanner() {
  const { openPopup } = usePopup();

  return (
    <section className="w-full bg-[#FEF8E2] md:pt-50 md:pb-32 pt-40 pb-24 px-8 flex flex-col items-center justify-center text-center">

      <Image
        src={astrovaniLogo}
        alt="Balaji Astro Guide"
        width={400}
        height={100}
        className="mb-4"
      />

      <p className="text-2xl md:text-3xl font-['Inria_Serif'] italic text-[#514f48] mb-6">
        Discover Your Cosmic Journey
      </p>

      <p className="text-lg font-helvetica text-[#514f48] max-w-xl mb-10">
        Authentic astrology and spiritual guidance in one place.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <button
          onClick={openPopup}
          className="bg-[#F6971E] text-white font-helvetica font-medium py-3 px-8 rounded-full transition-transform transform hover:scale-105 cursor-pointer"
        >
          Chat with an Astrologer
        </button>

        <button
          onClick={openPopup}
          className="bg-transparent border border-[#F6971E] text-[#F6971E] font-helvetica font-medium py-3 px-8 rounded-full hover:bg-[#F6971E] hover:text-[#fff] transition-colors cursor-pointer"
        >
          Download the App
        </button>
      </div>
    </section>
  );
}