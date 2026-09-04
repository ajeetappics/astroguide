'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { BsArrowRight, BsChevronLeft, BsChevronRight, BsPlayFill, BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { BiMap, BiCalendar } from 'react-icons/bi';
import { IoTimeOutline } from 'react-icons/io5';
import { pujaData } from '../../components/PoojaSection/PoojaSection';
import { usePopup } from '../../components/popup/PopupContext';



export default function PujaDetails() {
  const params = useParams();
  const router = useRouter();
  const { openPopup } = usePopup();

  // Demo Object from API
  const pooja = {
    "_id": "6a7489eecb9ef5a42e8b189e",
    "name": "Rahu test",
    "description": "adcbiubcouenc enic euw9hc ncoincpiwn cpoiwencpiwencpi ciweincpiwencpwepoc[oekc[p ecpom[owem[oewcmpowemcpowec jkcpepocme",
    "image": "https://storage.googleapis.com/astro-vani-storage/admin/1786022750418-chercker.jpg",
    "benefits": "ashciwdjda\npicipcfj. -dif ejfoejd -ajdfcoewkj[of powe fpow voev wepocvmpowev weovmeo[efoewkfpewkpekl cvpoew cocmoc=weck [opwec [",
    "peopleType": "Individual",
    "basePrice": 1500,
    "duration": 15,
    "regions": ["India"],
    "startDateTime": "2026-08-06T13:21:00.000Z",
    "bookingOpenTill": "2026-08-08T13:19:00.000Z",
    "procedure": "yhn rfvb iuwcboieq dpiwefwefwefefwefegrwgrgvvecvrvrewvvevrevr",
    "whatHappensAfterOrder": "ew[f [ewf kwe[pe fk[pwekf [wevkwe[fk[wpec kw[efkpefk[wefkew[ofjoecclx],weovcmwpocpevmepowcm0 vkvpowmv[eo ep vrmvpomv powem vopwvpow mvwepovm weopm v[oqwj",
    "faqEntries": [
      {
        "_id": "6a7d5c18e28e81f73f965072",
        "question": "pooja?",
        "answer": "This Pooja brings peace,life."
      },
      {
        "_id": "6a7c100f22b626fff51dd0f3",
        "question": "hvyyjh five",
        "answer": "gdygds five"
      },
      {
        "_id": "6a7c100f22b626fff51dd0f1",
        "question": "que fourgfbeyc",
        "answer": "faq que ans four"
      }
    ]
  };

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Image Slider State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sliderImages = [
    pooja?.image,
    '/images/pooja-hero-banner.jpg',
    pooja?.image
  ].filter(Boolean) as string[];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % sliderImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  if (!pooja) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <main className="min-h-screen bg-[#FFFDF9] pt-28 pb-[60px] font-helvetica">
      <div className="container mx-auto max-w-6xl px-4">

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs md:text-sm font-bold tracking-widest uppercase text-gray-400 mb-6 mt-4 md:mt-0">
          <Link href="/" className="hover:text-[#F6971E] transition-colors">Home</Link>
          <BsChevronRight className="text-[10px]" />
          <Link href="/pooja" className="hover:text-[#F6971E] transition-colors">Pooja Services</Link>
          <BsChevronRight className="text-[10px]" />
          <span className="text-[#F6971E] line-clamp-1">{pooja.name}</span>
        </div>

        {/* Unified Main Details Card */}
        <div className="bg-white rounded-[32px] shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-gray-100 p-6 md:p-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">

            {/* Left: Image Carousel UI */}
            <div className="w-full lg:w-[45%]">
              <div className="relative aspect-square rounded-[24px] overflow-hidden group shadow-md border border-gray-50">
                <Image src={sliderImages[currentImageIndex]} alt={pooja.name} fill className="object-cover transition-transform duration-700 hover:scale-105" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/5 flex items-center justify-center pointer-events-none group-hover:bg-black/10 transition-colors duration-500">
                  <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#F6971E] text-2xl shadow-lg hover:scale-110 transition-transform cursor-pointer pl-1 pointer-events-auto">
                    <BsPlayFill />
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-md text-[#4A2B23] rounded-full flex items-center justify-center hover:bg-[#F6971E] hover:text-white transition-colors shadow-md z-10 opacity-0 group-hover:opacity-100 duration-300">
                  <BsChevronLeft className="text-sm stroke-1" />
                </button>
                <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-md text-[#4A2B23] rounded-full flex items-center justify-center hover:bg-[#F6971E] hover:text-white transition-colors shadow-md z-10 opacity-0 group-hover:opacity-100 duration-300">
                  <BsChevronRight className="text-sm stroke-1" />
                </button>

                {/* Navigation Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                  {sliderImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${currentImageIndex === idx ? 'w-6 bg-[#F6971E]' : 'w-1.5 bg-white opacity-60 hover:opacity-100'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Details & Booking */}
            <div className="w-full lg:w-[55%] flex flex-col justify-center">

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-['Inria_Serif'] text-[#4A2B23] mb-4">
                {pooja.name}
              </h1>

              <p className="text-gray-600 font-helvetica text-sm md:text-base leading-relaxed mb-6">
                {pooja.description}
              </p>


              {/* Date Info Card */}
              <div className="bg-[#FFFDF9] py-3 px-5 rounded-xl border border-[#F6971E]/10 mb-5 w-fit">
                <div className="flex flex-col gap-1 text-xs font-bold text-[#4A2B23]">
                  <span className="text-gray-400 uppercase tracking-widest text-[10px]">Date</span>
                  <div className="flex items-center gap-2">
                    <BiCalendar className="text-[#F6971E] text-lg" />
                    <span className="text-sm">
                      {new Date(pooja.startDateTime).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mt-6 pb-2 border-t border-gray-100 pt-6">
                {/* Pricing */}
                <div className="flex flex-col">
                  <span className="text-gray-400 uppercase tracking-widest text-xs font-bold mb-0.5">Start At</span>
                  <span className="text-3xl md:text-4xl font-bold text-[#4A2B23] font-['Inria_Serif'] tracking-tight">
                    ₹{pooja.basePrice.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Connect Now Button */}
                <button
                  onClick={openPopup}
                  className="w-full sm:w-auto bg-gradient-to-r from-[#F6971E] to-[#FFA733] text-white font-bold text-base py-3.5 px-10 rounded-xl shadow-[0_4px_15px_rgba(246,151,30,0.25)] hover:shadow-[0_8px_20px_rgba(246,151,30,0.4)] hover:-translate-y-0.5 transition-all"
                >
                  Book Now
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-['Inria_Serif'] text-[#4A2B23] mb-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {pooja.faqEntries.map((faq, index) => (
              <div key={index} className={`bg-white rounded-xl p-5 border transition-all duration-300 ${openFaq === index ? 'border-[#F6971E] shadow-[0_4px_20px_rgba(246,151,30,0.08)]' : 'border-[#F6971E]/10 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-[#F6971E]/30'}`}>
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between text-left font-bold text-[#4A2B23] group"
                >
                  <span className="text-base pr-4 group-hover:text-[#F6971E] transition-colors">{faq.question}</span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openFaq === index ? 'bg-gradient-to-r from-[#F6971E] to-[#FFA733] text-white -rotate-180 shadow-sm' : 'bg-gray-50 text-gray-400 group-hover:bg-[#F6971E]/10 group-hover:text-[#F6971E]'}`}>
                    <BsChevronDown className="text-sm font-bold stroke-[1px]" />
                  </div>
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-60 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-gray-600 font-helvetica text-sm leading-relaxed pr-8 pt-3 border-t border-gray-100">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
