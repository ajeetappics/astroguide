'use client'

import React from 'react';
import Link from 'next/link';
import { BsSearch, BsX } from 'react-icons/bs';
import { BiFilterAlt } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import AstrologerCard from '../components/Card/AstrologerCard';
import type { AstrologerData } from '../components/Card/AstrologerCard';
import { astrologerData } from '../components/AstrologerSection/AstrologerSection';

export default function AstrologersPage() {
  const router = useRouter();
  // We'll duplicate the astrologerData a few times just to show a nice grid of cards for the demo
  const allAstrologers: AstrologerData[] = [
    ...astrologerData,
    ...astrologerData.map(a => ({ ...a, id: a.id + 10 })),
    ...astrologerData.map(a => ({ ...a, id: a.id + 20 }))
  ];

  const tabs = ["All", "Love", "Education", "Career", "Marriage", "Health", "Wealth", "Legal", "Finance", "Remedies", "Parent"];
  const [activeTab, setActiveTab] = React.useState("All");
  const [isSortOpen, setIsSortOpen] = React.useState(false);
  const [selectedSort, setSelectedSort] = React.useState("Popularity");

  return (
    <main className="min-h-screen bg-[#FFFDF9] pb-24">

      {/* Hero Header Section */}
      <section className="bg-[#4A1A14] pt-40 lg:pt-48 pb-32 px-4 relative overflow-hidden">
        {/* Astrology Background Video with Overlay */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src="/images/astrology-video.MP4" type="video/mp4" />
          <source src="/astrology-video.MP4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#4A1A14] via-transparent to-transparent opacity-80" />

        <div className="container mx-auto max-w-7xl flex flex-col items-center text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-['Inria_Serif'] mb-4 drop-shadow-md">
            List of Expert Astrologers
          </h1>
          <div className="text-white/90 font-helvetica flex items-center gap-2 text-sm md:text-base drop-shadow-sm">
            <Link href="/" className="hover:text-[#F6971E] font-bold transition-colors">Home</Link>
            <span className="text-white/60">/</span>
            <span className="text-[#F6971E]">Expert Astrologers</span>
          </div>
        </div>
      </section>

      {/* Search and Tabs Section */}
      <section className="container mx-auto max-w-7xl px-4 -mt-8 relative z-20">

        {/* Search Bar */}
        <div className="bg-white rounded-full shadow-lg p-1.5 md:p-2.5 flex items-center border border-gray-100 max-w-4xl mx-auto mb-10 w-full">
          <div className="pl-3 md:pl-4 pr-1 md:pr-2 text-gray-400">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input
            type="text"
            placeholder="Search astrologers by name or skill..."
            className="flex-grow bg-transparent border-none outline-none px-2 md:px-4 py-2 font-helvetica text-gray-700 placeholder:text-gray-400 text-sm md:text-base w-full min-w-0"
          />
          <button className="bg-[#F6971E] text-white font-bold font-helvetica px-5 md:px-8 py-2 md:py-3 rounded-full hover:bg-[#e5850b] transition-all whitespace-nowrap shadow-sm">
            Search
          </button>
        </div>

        {/* Tabs and Sort Row */}
        <div className="flex items-center justify-between gap-4 md:gap-8 lg:gap-32 w-full mb-12">

          {/* Scrollable Tabs */}
          <div
            className="flex-1 overflow-x-auto pb-2 -mb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style dangerouslySetInnerHTML={{
              __html: `
              .flex-1::-webkit-scrollbar { display: none; }
            `}} />
            <div className="flex items-center gap-3 w-max">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold font-helvetica transition-all shadow-sm flex-shrink-0 ${activeTab === tab
                      ? 'bg-[#F6971E] text-white border-none shadow-[0_4px_10px_rgba(246,151,30,0.3)]'
                      : 'bg-white border border-gray-200 text-[#4A2B23] hover:border-[#F6971E]/50 hover:text-[#F6971E]'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Dropdown Button */}
          <div className="flex-shrink-0 relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 bg-white border border-[#F6971E]/30 px-5 py-2.5 rounded-full font-bold text-sm text-[#4A2B23] hover:border-[#F6971E] transition-all shadow-sm"
            >
              Sort <svg className="w-4 h-4 text-[#F6971E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path></svg>
            </button>

            {/* Sort Modal */}
            {isSortOpen && (
              <div className="absolute right-0 top-full mt-3 w-[340px] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] z-50 border border-gray-100 overflow-hidden flex flex-col font-helvetica">

                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-bold text-sm tracking-wider uppercase text-[#4A2B23]">Sort</h3>
                  <button onClick={() => setIsSortOpen(false)} className="text-gray-400 hover:text-gray-700">
                    <BsX className="text-2xl" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="flex bg-white">

                  {/* Left Panel */}
                  <div className="w-[120px] border-r border-gray-100 p-2 bg-gray-50/30">
                    <button className="w-full text-left p-2.5 bg-white text-[#4A2B23] font-bold rounded-lg text-sm border-l-[3px] border-[#F6971E] shadow-sm">
                      Sorting
                    </button>
                  </div>

                  {/* Right Panel - Options */}
                  <div className="flex-1 p-4 flex flex-col gap-4 max-h-[280px] overflow-y-auto">
                    {[
                      'Popularity',
                      'Experience: High to Low',
                      'Experience: Low to High',
                      'Total Orders: High to Low',
                      'Total Orders: Low to High',
                      'Price: High to Low',
                      'Price: Low to High'
                    ].map(opt => (
                      <label
                        key={opt}
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => setSelectedSort(opt)}
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${selectedSort === opt ? 'bg-[#F6971E]' : 'border-2 border-gray-300 group-hover:border-[#F6971E]/50'}`}>
                          {selectedSort === opt && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                        </div>
                        <span className={`text-sm font-medium ${selectedSort === opt ? 'text-[#F6971E] font-bold' : 'text-gray-600 group-hover:text-gray-900'}`}>{opt}</span>
                      </label>
                    ))}
                  </div>

                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white">
                  <button onClick={() => setSelectedSort("Popularity")} className="text-gray-500 font-bold text-sm hover:text-[#4A2B23] transition-colors px-2">Reset</button>
                  <button
                    onClick={() => setIsSortOpen(false)}
                    className="bg-gradient-to-r from-[#F6971E] to-[#FFA733] text-white font-bold py-2.5 px-8 rounded-full text-sm hover:shadow-[0_4px_12px_rgba(246,151,30,0.3)] transition-all"
                  >
                    Apply
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>

      </section>

      {/* Main Content Grid */}
      <section className="container mx-auto max-w-7xl px-4 mt-8">

        <div className="mb-8">
          <h2 className="text-3xl font-bold font-['Inria_Serif'] text-[#72271E] mb-2">
            Trending Expert Astrologers
          </h2>
          <p className="text-gray-500 font-helvetica text-sm">
            Find the perfect spiritual guide for your journey
          </p>
        </div>

        {/* Main Astrologers Grid (2 Columns on Tablet, 3 on Desktop, 4 on XL) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allAstrologers.map((astro) => (
            <AstrologerCard key={astro.id} astro={astro} />
          ))}
        </div>

      </section>

    </main>
  );
}
