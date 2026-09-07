'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import PoojaCard from '../components/Card/PoojaCard';
import { pujaData } from '../components/PoojaSection/PoojaSection';

export default function PujasPage() {
  const tabs = ["Upcoming Pooja's", "Generic Pooja's", "Dosh Nivaran Pooja's", "Grah Shanti Pooja's", "Deity Pooja's", "Lagna Pooja's", "Vrat Pooja's", "Festival Poojas"];
  const [activeTab, setActiveTab] = useState("Upcoming Pooja's");

  // Duplicate data to make the grid look full (just for demo purposes)
  const allPujas = [...pujaData, ...pujaData.map(p => ({ ...p, id: p.id + 10 })), ...pujaData.map(p => ({ ...p, id: p.id + 20 }))];

  return (
    <main className="min-h-screen bg-[#FFFDF9] pb-[60px]">

      {/* Hero Banner Section */}
      <section className="bg-[#FFFDF9] pt-32 lg:pt-40 pb-[60px] relative overflow-hidden">
        {/* Animated Background Decorations - matching Home Page */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[60vh] bg-[#F6971E]/15 rounded-full blur-[80px] animate-[pulse_6s_ease-in-out_infinite]"></div>
          <div className="absolute top-[10%] right-[-10%] w-[50vw] h-[70vh] bg-[#F6971E]/20 rounded-full blur-[100px] animate-[pulse_8s_ease-in-out_infinite]"></div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10">

            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <p className="text-[#F6971E] font-bold text-sm tracking-widest uppercase mb-2">Ancient Wisdom Meets Modern Access</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#72271E] font-['Inria_Serif'] mb-6 drop-shadow-sm">
                Sacred Pooja Services
              </h1>

              <p className="text-gray-600 font-helvetica text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Experience authentic Vedic rituals performed by certified expert priests from India's most sacred temples, delivered live to your home.
              </p>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2 relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.1)] border-4 border-white">
              <Image src="/images/pooja-hero-banner.jpg" alt="Vedic Rituals" fill className="object-cover" />
            </div>

          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto max-w-7xl px-4 mt-0">

        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold font-['Inria_Serif'] text-[#72271E] mb-3">
            Personalized Poojas
          </h2>
          <p className="text-[#F6971E] font-medium font-helvetica">
            Experience Real Blessings with your Personal Sankalp
          </p>
        </div>

        {/* Horizontal Scrollable Tabs */}
        <div className="w-full overflow-x-auto pb-4 mb-[30px] -mx-4 px-4 md:mx-0 md:px-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style dangerouslySetInnerHTML={{ __html: `.overflow-x-auto::-webkit-scrollbar { display: none; }` }} />
          <div className="flex items-center gap-4 w-max mx-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full text-sm font-bold font-helvetica transition-all shadow-sm flex-shrink-0 ${activeTab === tab
                  ? 'bg-[#72271E] text-white border-none shadow-md'
                  : 'bg-white border border-[#F6971E]/30 text-[#72271E] hover:border-[#F6971E] hover:text-[#F6971E]'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Pooja Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
          {allPujas.slice(0, 6).map((pooja) => (
            <PoojaCard key={`pooja-${pooja.id}`} pooja={pooja} />
          ))}
        </div>

      </section>

    </main>
  );
}
