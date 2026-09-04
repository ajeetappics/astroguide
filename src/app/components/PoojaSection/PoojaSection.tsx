'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import { BiMap } from 'react-icons/bi';
import { usePopup } from '../popup/PopupContext';
import PoojaCard from '../Card/PoojaCard';

export const pujaData = [
  {
    id: 1,
    title: "Sarva Karya Siddhi Pooja",
    description: "For success in life, career, and spirituality. Remove blockages, delays, and setbacks.",
    location: "Pardeshwar Mandir / Ujjain",
    date: "21 MARCH 26, SATURDAY",
    price: "₹2,100",
    image: "/images/poojas/ganesha_pooja.jpg"
  },
  {
    id: 2,
    title: "Maha Mrityunjaya Pooja",
    description: "A powerful healing pooja performed for longevity, health, and relief from chronic illnesses.",
    location: "Trimbakeshwar Temple / Nashik",
    date: "25 MARCH 26, WEDNESDAY",
    price: "₹5,100",
    image: "/images/poojas/shiva_pooja.jpg"
  },
  {
    id: 3,
    title: "Navgraha Shanti Pooja",
    description: "Pacify all nine planets to remove doshas from your birth chart and invite prosperity and peace.",
    location: "Navgraha Mandir / Ujjain",
    date: "28 MARCH 26, SATURDAY",
    price: "₹3,500",
    image: "/images/poojas/navgraha_pooja.jpg"
  },
  {
    id: 4,
    title: "Mangal Dosh Nivaran Pooja",
    description: "Specifically designed to remove the malefic effects of Mars (Mangal) for a happy married life.",
    location: "Mangalnath Mandir / Ujjain",
    date: "02 APRIL 26, THURSDAY",
    price: "₹4,200",
    image: "/images/poojas/mangal_pooja.jpg"
  }
];

export default function PoojaSection() {
  const { openPopup } = usePopup();

  return (
    <section className="bg-white py-[30px] md:py-[60px] px-4 md:px-8 relative overflow-hidden">

      {/* Blurred Background Highlights */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#fdedcc] rounded-full blur-[120px] pointer-events-none opacity-80 z-0"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#fdedcc] rounded-full blur-[120px] pointer-events-none opacity-80 z-0"></div>

      <div className="container mx-auto relative z-10 max-w-7xl">

        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="max-w-3xl">
            <h2 className="text-[36px] font-bold font-['Inria_Serif'] text-[#4A2B23] leading-tight mb-4">
              Personalized Poojas,
            </h2>
            <p className="text-[#6b6b6b] font-helvetica text-base md:text-lg">
              Experience Real Blessings with your Personal Sankalp
            </p>
          </div>
          <Link href="/pooja" className="flex-shrink-0 flex items-center gap-2 bg-white border-2 border-[#F6971E] text-[#F6971E] font-bold font-helvetica py-2.5 px-6 rounded-full hover:bg-[#F6971E] hover:text-white transition-all shadow-sm">
            View all poojas <BsArrowRight className="text-lg" />
          </Link>
        </div>

        {/* Pooja Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {pujaData.map((pooja) => (
            <PoojaCard key={pooja.id} pooja={pooja} />
          ))}
        </div>

      </div>
    </section>
  );
}
