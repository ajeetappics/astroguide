'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { BsStarFill, BsChevronLeft, BsChevronRight, BsQuote } from 'react-icons/bs';

const reviews = [
  {
    id: 1,
    text: "This app helped me to get a job in my dream company. I was stressed about not getting a career opportunity after my graduation. One prediction from an astrologer gave me a ray of hope.",
    name: "Amar Thakur",
    astrologer: "Rahul",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    text: "The detailed financial forecast I received from Astrovani allowed me to invest wisely and secure my family's future. It was incredibly accurate and changed my entire perspective.",
    name: "Rajiv Mehta",
    astrologer: "Priya",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    text: "Astrovani's advice on personal growth has transformed my perspective on life. The astrologer's guidance helped me make a life-changing decision with confidence.",
    name: "Priya Sharma",
    astrologer: "Vikram",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 4,
    text: "Good",
    name: "Neha Gupta",
    astrologer: "Sunita",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 5,
    text: "The predictions about my health were spot on. I followed the astrological advice and dietary changes, and I've never felt better in years.",
    name: "Vikas Singh",
    astrologer: "Amit",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  }
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white py-[30px] md:py-[60px] px-4 lg:px-12 relative overflow-hidden">

      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-[#FEF8E2]/40 rounded-l-[100px] pointer-events-none hidden lg:block"></div>

      <div className="container mx-auto max-w-7xl relative z-10">

        {/* Header Section */}
        <div className="flex justify-between items-center mb-6 gap-4">
          <h2 className="text-[26px] sm:text-[30px] md:text-[34px] lg:text-[36px] font-bold font-['Inria_Serif'] text-[#4A2B23] leading-tight">
            User reviews
          </h2>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={scrollLeft}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#4A2B23]/20 flex items-center justify-center text-[#4A2B23] hover:border-[#F6971E] hover:text-[#F6971E] hover:bg-[#F6971E]/5 transition-all"
            >
              <BsChevronLeft className="text-sm sm:text-base" />
            </button>
            <button
              onClick={scrollRight}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#4A2B23]/20 flex items-center justify-center text-[#4A2B23] hover:border-[#F6971E] hover:text-[#F6971E] hover:bg-[#F6971E]/5 transition-all"
            >
              <BsChevronRight className="text-sm sm:text-base" />
            </button>
          </div>
        </div>

        {/* Slider Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pt-4 snap-x snap-mandatory scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="min-w-[100%] md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] snap-start bg-white border border-[#F6971E]/10 hover:border-[#F6971E]/30 rounded-[24px] p-6 sm:p-8 relative z-10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(246,151,30,0.08)] transition-all duration-300 flex flex-col"
            >
              {/* 5 Stars top left of card */}
              <div className="flex text-[#F6971E] mb-5 text-lg gap-1">
                <BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill />
              </div>

              <div className="relative mb-6 flex-grow">
                <BsQuote className="absolute -top-3 -left-3 text-4xl text-[#F6971E]/15 rotate-180" />
                <p className="text-[#4A2B23] font-helvetica text-base leading-relaxed relative z-10 font-medium italic">
                  "{review.text}"
                </p>
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-4 pt-5 border-t border-[#4A2B23]/10 mt-auto">
                <div className="w-12 h-12 rounded-full overflow-hidden border-[2px] border-[#F6971E]/20 shadow-sm shrink-0">
                  <Image
                    src={review.image}
                    alt={review.name}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-[#4A2B23] text-base font-['Inria_Serif'] leading-tight">{review.name}</h4>
                  <p className="text-[#F6971E] text-xs font-helvetica tracking-wide capitalize mt-1">Given by: {review.astrologer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
