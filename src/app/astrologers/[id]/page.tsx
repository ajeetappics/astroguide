'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsStarFill, BsPatchCheckFill, BsLightningChargeFill, BsCheckCircleFill, BsChevronRight, BsStarHalf } from 'react-icons/bs';
import { astrologerData } from '@/app/components/AstrologerSection/AstrologerSection';
import { notFound, useParams } from 'next/navigation';

export default function AstrologerDetails() {
  const params = useParams();
  const id = parseInt(params.id as string);

  // Since we duplicated data in the list view (adding 10, 20 to IDs), 
  // we map any ID back to the base 4 astrologers so the page doesn't break
  const baseId = ((id - 1) % 4) + 1;
  const astro = astrologerData.find(a => a.id === baseId);

  if (!astro) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9] pb-20 font-helvetica">

      {/* 1. Hero Banner (Light Theme) */}
      <div className="relative w-full h-[280px] md:h-[320px] bg-[#fdf7e1] overflow-hidden pt-[100px] md:pt-[120px]">
        {/* Glow Effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] max-w-[400px] max-h-[400px] bg-[#F6971E]/30 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] max-w-[300px] max-h-[300px] bg-[#F6971E]/20 rounded-full blur-[60px] pointer-events-none"></div>

        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent mix-blend-overlay"></div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10 h-full flex flex-col justify-between pb-12">

          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs md:text-sm font-bold tracking-widest uppercase text-[#4A2B23]/60 mb-8 pt-4">
            <Link href="/" className="hover:text-[#F6971E] transition-colors">Home</Link>
            <BsChevronRight className="text-[10px]" />
            <Link href="/astrologers" className="hover:text-[#F6971E] transition-colors">Astrologers</Link>
            <BsChevronRight className="text-[10px]" />
            <span className="text-[#F6971E]">{astro.name}</span>
          </div>

        </div>
      </div>

      {/* Main Container (Pulled up to overlap banner) */}
      <div className="container mx-auto max-w-7xl px-4 relative -mt-32 md:-mt-24 z-20">

        {/* Profile Header Card with embedded stats */}
        <div className="bg-white rounded-[32px] p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-[#F6971E]/10 mb-10 flex flex-col">

          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start text-center md:text-left border-b border-gray-100 pb-8">
            {/* Avatar (Inside Card) */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
              <div className="w-full h-full rounded-3xl border-[4px] border-gray-100 overflow-hidden bg-white">
                <Image
                  src={astro.imageUrl}
                  alt={astro.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 pt-2 w-full">
              <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
                <div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#4A2B23] font-['Inria_Serif']">
                      {astro.name}
                    </h1>
                  </div>

                  <p className="text-gray-500 font-medium mb-4">{astro.skills.join(' • ')}</p>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-2 gap-x-6 text-sm text-[#4A2B23]/80">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">Languages</span>
                      <span className="font-bold">{astro.languages}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-4">
                    {astro.skills.map(skill => (
                      <div key={skill} className="bg-[#FFFDF9] border border-[#F6971E]/20 hover:border-[#F6971E] transition-colors px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-default">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#F6971E]"></div>
                        <span className="text-[#4A2B23] font-bold text-xs md:text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and Connect Button (Right Side) */}
                <div className="w-full md:w-auto flex flex-col md:items-end gap-3 mt-6 md:mt-0">
                  <div className="text-center md:text-right font-bold text-[#4A2B23] text-2xl md:text-3xl flex items-center justify-center md:justify-end">
                    <span className="font-sans mr-0.5">₹</span>
                    {astro.price.replace('₹', '')}
                    <span className="text-sm md:text-base font-medium text-gray-500 ml-1">/min</span>
                  </div>
                  <button className="w-full md:w-48 bg-gradient-to-r from-[#F6971E] to-[#FFA733] text-white font-bold py-3.5 rounded-2xl shadow-[0_8px_20px_rgba(246,151,30,0.25)] flex items-center justify-center gap-2 hover:shadow-[0_12px_25px_rgba(246,151,30,0.4)] hover:-translate-y-1 transition-all">
                    <BsLightningChargeFill /> Connect Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Stats Bar */}
          <div className="grid grid-cols-2 gap-4 pt-6">
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-2xl md:text-3xl font-bold text-[#4A2B23] mb-1">{astro.experience}</span>
              <span className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wide">Experience</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center border-l border-gray-100">
              <span className="text-2xl md:text-3xl font-bold text-[#4A2B23] mb-1 flex items-center gap-2">
                <BsStarFill className="text-[#F6971E] text-xl md:text-2xl" /> {astro.rating}
              </span>
              <span className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wide">Rating</span>
            </div>
          </div>

        </div>

        {/* Main Content Layout */}
        <div className="w-full space-y-10">

            {/* About Section */}
            <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl md:text-3xl font-bold text-[#4A2B23] font-['Inria_Serif'] mb-6 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-[#F6971E] rounded-full inline-block"></span> About {astro.name}
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">
                {astro.name} is a highly experienced astrologer specializing in {astro.skills[0]} and {astro.skills[1] || 'various esoteric sciences'}.
                With a deep understanding of ancient wisdom and modern applications, {astro.name} provides accurate predictions and effective remedies.
              </p>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
                Dedicated to helping individuals navigate life's challenges, {astro.name} has guided thousands towards a path of clarity, peace, and success.
                Whether you are facing issues in love, career, or personal growth, their profound knowledge and empathetic approach offer a guiding light.
              </p>
              <button className="text-[#F6971E] font-bold text-sm uppercase tracking-wider hover:text-[#4A2B23] transition-colors">
                Read full bio &rarr;
              </button>
            </section>



            {/* Reviews Section */}
            <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-gray-100 pb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-[#4A2B23] font-['Inria_Serif'] flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-[#F6971E] rounded-full inline-block"></span> Client Reviews
                </h2>
                <div className="flex items-center gap-3 bg-[#FFFDF9] border border-[#F6971E]/20 px-4 py-2 rounded-full">
                  <span className="font-bold text-xl text-[#4A2B23]">{astro.rating}</span>
                  <div className="flex text-[#F6971E] text-base">
                    <BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill /><BsStarHalf />
                  </div>
                  <span className="text-xs text-gray-500 font-bold tracking-wide uppercase">1k+ reviews</span>
                </div>
              </div>

              {/* Review Cards */}
              <div className="space-y-6">
                {[
                  { name: "Amrita S.", text: "Your remedies are magic sir, it has really helped me a lot. Thank you so much! 🙏💖", date: "2 days ago" },
                  { name: "Rahul V.", text: "Very accurate predictions. I was amazed by how detailed the reading was. Highly recommended.", date: "1 week ago" }
                ].map((review, i) => (
                  <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-[#F6971E]/30 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#F6971E] to-[#FFA733] text-white font-bold text-lg rounded-full flex items-center justify-center shadow-md">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-[#4A2B23] block text-lg">{review.name}</span>
                          <span className="text-xs text-gray-400 font-medium">{review.date}</span>
                        </div>
                      </div>
                      <div className="flex text-[#F6971E] text-sm">
                        <BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill />
                      </div>
                    </div>
                    <p className="text-[#4A2B23]/80 font-medium leading-relaxed">
                      "{review.text}"
                    </p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-4 rounded-xl border-2 border-gray-100 text-[#4A2B23] font-bold hover:border-[#F6971E] hover:text-[#F6971E] transition-colors">
                View all reviews
              </button>
            </section>

        </div>

      </div>
    </div>
  );
}
