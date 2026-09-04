'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BsPlayCircleFill, BsX } from 'react-icons/bs';

const spotlightData = [
  {
    id: 1,
    thumbnail: "/images/hindu_pandit_1.jpg",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    text: "Mouni Roy shares her amazing experience with Astrovani. Her journey to success was guided by our expert astrologers."
  },
  {
    id: 2,
    thumbnail: "/images/hindu_pandit_3.jpg",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    text: "Discover how top celebrities align their stars for maximum growth and peace of mind in their personal and professional lives."
  },
  {
    id: 3,
    thumbnail: "/images/pooja-hero-banner.jpg",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    text: "Famous personalities trust our platform for making crucial life decisions with authentic Vedic astrology."
  },
];

export default function CelebritySpotlight() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeVideo]);

  return (
    <section className="bg-[#FFFDF9] py-[30px] md:py-[60px] px-4 md:px-8 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F6971E]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#F6971E]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-[36px] font-bold font-['Inria_Serif'] text-[#4A2B23] leading-tight mb-2">
            Celebrity Spotlight
          </h2>
          <p className="text-gray-500 font-helvetica">
            See what your favorite celebrities have to say about us
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {spotlightData.map((item) => (
            <div 
              key={item.id} 
              className="group cursor-pointer bg-white rounded-[24px] p-4 md:p-5 border border-gray-100 shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:border-[#F6971E]/30 hover:shadow-[0_12px_35px_rgba(246,151,30,0.12)] transition-all duration-300 hover:-translate-y-1" 
              onClick={() => setActiveVideo(item.videoUrl)}
            >
              
              {/* Thumbnail Container */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-5 bg-gray-100">
                <Image 
                  src={item.thumbnail} 
                  alt="Celebrity Spotlight" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors duration-300">
                  <BsPlayCircleFill className="text-white text-5xl md:text-6xl opacity-90 group-hover:scale-110 transition-transform duration-300 shadow-sm rounded-full" />
                </div>
              </div>

              {/* Text Description */}
              <p className="text-lg md:text-xl text-[#4A2B23] font-semibold font-helvetica line-clamp-2 leading-relaxed px-2">
                {item.text}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* Video Modal Popup */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl animate-[fadeIn_0.3s_ease-out]">
            
            {/* Close Button */}
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all border border-white/20"
            >
              <BsX className="text-3xl" />
            </button>

            {/* Video Player */}
            <video 
              src={activeVideo} 
              autoPlay 
              controls 
              className="w-full aspect-video object-contain relative z-10"
            >
              Your browser does not support the video tag.
            </video>

          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}
