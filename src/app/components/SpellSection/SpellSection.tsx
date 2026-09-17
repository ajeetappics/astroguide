'use client'

import React from 'react';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import PoojaCard from '../Card/PoojaCard';

export const spellData = [
  {
    id: 1,
    title: "Love Binding & Attraction Spell",
    description: "Reignite passion, attract your soulmate, and strengthen deep emotional bonding and trust.",
    location: "Kamakhya Devi / Guwahati",
    date: "22 MARCH 26, SUNDAY",
    price: "₹1,500",
    image: "https://storage.googleapis.com/astro-vani-storage/admin/1786022750418-chercker.jpg"
  },
  {
    id: 2,
    title: "Career & Financial Breakthrough Spell",
    description: "Dissolve stagnation, unlock career promotions, and attract new wealth opportunities.",
    location: "Tirupati Balaji Mandir",
    date: "26 MARCH 26, THURSDAY",
    price: "₹2,100",
    image: "/images/poojas/ganesha_pooja.jpg"
  },
  {
    id: 3,
    title: "Evil Eye & Negative Energy Removal Spell",
    description: "Shield against dark energies, psychic attacks, jealousy, and harmful vibrations.",
    location: "Mahakaleshwar Mandir / Ujjain",
    date: "29 MARCH 26, SUNDAY",
    price: "₹1,800",
    image: "/images/poojas/shiva_pooja.jpg"
  },
  {
    id: 4,
    title: "Court Case & Dispute Victory Spell",
    description: "Attain legal triumph, resolve prolonged disputes, and settle conflicts in your favor.",
    location: "Maa Baglamukhi Mandir / Nalkheda",
    date: "03 APRIL 26, FRIDAY",
    price: "₹2,500",
    image: "/images/poojas/mangal_pooja.jpg"
  }
];

export default function SpellSection() {
  return (
    <section className="bg-white py-5 md:py-8 px-4 md:px-8 relative overflow-hidden">
      <style jsx>{`
        .spell-scroll::-webkit-scrollbar {
          height: 4px;
        }
        .spell-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 9999px;
        }
        .spell-scroll::-webkit-scrollbar-thumb {
          background: #F6971E;
          border-radius: 9999px;
        }
        @media (min-width: 1024px) {
          .spell-scroll {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .spell-scroll::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>

      {/* Blurred Background Highlights */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#fdedcc] rounded-full blur-[120px] pointer-events-none opacity-80 z-0"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#fdedcc] rounded-full blur-[120px] pointer-events-none opacity-80 z-0"></div>

      <div className="container mx-auto relative z-10 max-w-6xl">

        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-3.5 md:mb-5 gap-3 md:gap-4">
          <div className="max-w-3xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold font-['Inria_Serif'] text-[#4A2B23] leading-tight mb-1 sm:mb-1.5">
              Personalized Spells
            </h2>
            <p className="text-[#6b6b6b] font-helvetica text-xs sm:text-sm md:text-[15px]">
              Ancient Sacred Rituals & Mystic Energy Cast by Certified Experts
            </p>
          </div>
          <Link href="/spell" className="flex-shrink-0 flex items-center gap-1.5 bg-white border border-[#F6971E] text-[#F6971E] font-bold font-helvetica py-2 px-5 rounded-full hover:bg-[#F6971E] hover:text-white transition-all shadow-xs text-xs sm:text-sm">
            View all spells <BsArrowRight className="text-sm" />
          </Link>
        </div>

        {/* Spell Cards: Horizontal Touch-Scroll on Responsive, 4-Column Grid on Desktop */}
        <div className="spell-scroll flex lg:grid lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-3.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 snap-x snap-mandatory">
          {spellData.map((spell) => (
            <div key={spell.id} className="w-[165px] sm:w-[190px] md:w-[215px] lg:w-auto flex-shrink-0 snap-start flex flex-col h-full">
              <PoojaCard pooja={spell} basePath="/spell" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
