'use client'

import React, { useState } from 'react';
import { BsX } from 'react-icons/bs';
import PoojaCard from '../../components/Card/PoojaCard';
import { spellData } from '../../components/SpellSection/SpellSection';

export default function SpellsPage() {

  const [searchQuery, setSearchQuery] = useState("");

  // Duplicate data to make the grid look full (matching pooja listing)
  const allSpells = [...spellData, ...spellData.map(s => ({ ...s, id: s.id + 10 })), ...spellData.map(s => ({ ...s, id: s.id + 20 }))];

  const filteredSpells = allSpells.filter(s => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.location.toLowerCase().includes(q);
  });

  return (
    <main className="min-h-screen bg-[#FFFDF9] pb-[60px]">

      {/* Search and Categories Section (Matching /pooja page layout) */}
      <section className="container mx-auto max-w-6xl px-4 pt-4 relative z-20">

        {/* 1. Centered Search Bar */}
        <div className="bg-white rounded-full shadow-md p-1 sm:p-1.5 flex items-center border border-gray-200/80 max-w-xl sm:max-w-2xl mx-auto mb-5 sm:mb-6 md:mb-8 w-full focus-within:border-[#F6971E]/50 focus-within:shadow-[0_4px_16px_rgba(246,151,30,0.12)] transition-all">
          <div className="pl-3 pr-1 text-gray-400">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search spell by name or ritual..."
            className="flex-grow bg-transparent border-none outline-none px-2 sm:px-3 py-1 sm:py-1.5 font-helvetica text-gray-700 placeholder:text-gray-400 text-xs sm:text-sm w-full min-w-0"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-1 text-gray-400 hover:text-gray-600 mr-1 cursor-pointer transition-colors"
              aria-label="Clear search"
            >
              <BsX className="w-4 h-4" />
            </button>
          )}
          <button className="bg-[#F6971E] text-white font-bold font-helvetica px-4 sm:px-6 py-1.5 sm:py-2 rounded-full hover:bg-[#e5850b] transition-all whitespace-nowrap shadow-xs text-xs sm:text-sm cursor-pointer">
            Search
          </button>
        </div>

        {/* 2. Section Title & Subtitle */}
        <div className="text-left mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold font-['Inria_Serif'] text-[#4A2B23] leading-tight mb-1 sm:mb-1.5">
            Personalized Spells
          </h2>
          <p className="text-[#6b6b6b] font-helvetica text-xs sm:text-sm md:text-[15px]">
            Ancient Sacred Rituals & Mystic Energy Cast by Certified Experts
          </p>
        </div>

        {/* 3. Spell Cards Grid */}
        {filteredSpells.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-3.5">
            {filteredSpells.map((spell) => (
              <PoojaCard key={`spell-${spell.id}`} pooja={spell} basePath="/spell" />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#F6971E]/20 p-8 shadow-sm max-w-md mx-auto">
            <p className="text-xl font-bold text-[#72271E] mb-2 font-['Inria_Serif']">No Spells Found</p>
            <p className="text-gray-500 text-sm font-helvetica mb-4">No spell services match &quot;{searchQuery}&quot;.</p>
            <button
              onClick={() => setSearchQuery("")}
              className="bg-[#F6971E] text-white font-bold px-6 py-2 rounded-full text-sm hover:bg-[#e5850b] transition-all cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}

      </section>

    </main>
  );
}
