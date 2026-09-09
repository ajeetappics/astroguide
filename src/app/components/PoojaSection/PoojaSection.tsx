'use client'

import React from 'react';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
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
    <section className="bg-white py-5 md:py-8 px-4 md:px-8 relative overflow-hidden">
      <style jsx>{`
        .pooja-scroll::-webkit-scrollbar {
          height: 4px;
        }
        .pooja-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 9999px;
        }
        .pooja-scroll::-webkit-scrollbar-thumb {
          background: #F6971E;
          border-radius: 9999px;
        }
        @media (min-width: 1024px) {
          .pooja-scroll {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .pooja-scroll::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>

      {/* Blurred Background Highlights */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#fdedcc] rounded-full blur-[120px] pointer-events-none opacity-80 z-0"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#fdedcc] rounded-full blur-[120px] pointer-events-none opacity-80 z-0"></div>

      <div className="container mx-auto relative z-10 max-w-6xl">

        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-3.5 md:mb-5 gap-3 md:gap-4">
          <div className="max-w-3xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold font-['Inria_Serif'] text-[#4A2B23] leading-tight mb-1 sm:mb-1.5">
              Personalized Poojas
            </h2>
            <p className="text-[#6b6b6b] font-helvetica text-xs sm:text-sm md:text-[15px]">
              Experience Real Blessings with your Personal Sankalp
            </p>
          </div>
          <Link href="/pooja" className="flex-shrink-0 flex items-center gap-1.5 bg-white border border-[#F6971E] text-[#F6971E] font-bold font-helvetica py-2 px-5 rounded-full hover:bg-[#F6971E] hover:text-white transition-all shadow-xs text-xs sm:text-sm">
            View all poojas <BsArrowRight className="text-sm" />
          </Link>
        </div>

        {/* Pooja Cards: Horizontal Touch-Scroll on Responsive, 4-Column Grid on Desktop */}
        <div className="pooja-scroll flex lg:grid lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-3.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 snap-x snap-mandatory">
          {pujaData.map((pooja) => (
            <div key={pooja.id} className="w-[165px] sm:w-[190px] md:w-[215px] lg:w-auto flex-shrink-0 snap-start flex flex-col h-full">
              <PoojaCard pooja={pooja} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
