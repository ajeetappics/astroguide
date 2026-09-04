'use client'

import React from 'react';
import { BsChat, BsDownload } from 'react-icons/bs';
import { usePopup } from '../popup/PopupContext';

const statsData = [
    {
        value: "10,000+",
        label: "Happy Clients"
    },
    {
        value: "500+",
        label: "Expert Astrologers"
    },
    {
        value: "24/7",
        label: "Available Support"
    }
];

export default function CtaSection() {
  const { openPopup } = usePopup();

  return (
    <section className="relative bg-[#F6971E]">
        <div className="container mx-auto max-w-7xl pt-24 pb-20 px-8 flex flex-col items-center text-center">
            
            <div className="bg-white/10 text-[#ffffff] text-sm py-2 px-6 rounded-full mb-8 backdrop-blur-sm font-['Inria_Serif'] shadow-[0px_0px_1px_inset_rgb(204,219,235),1px_0px_0.5px_0px_inset_rgba(255,255,255,0.5)]">
                Your cosmic Journey Awaits
            </div>

            <h2 className="text-5xl md:text-6xl font-['Inria_Serif'] text-[#EEE3D9] mb-4 leading-tight">
                Your stars are waiting <br className="hidden md:block" /> to guide you
            </h2>

            <p className="text-lg font-helvetica text-[#EEE3D9] max-w-2xl mx-auto mb-10">
                Connect with expert astrologers instantly and discover the cosmic insights that will illuminate your path forward.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 ">
                <button 
                    onClick={openPopup}
                    className="flex items-center gap-3 bg-[#EEE3D9] text-[#292929] font-helvetica font-semibold py-3 px-6 rounded-full transition-transform transform hover:scale-105 cursor-pointer"
                >
                    <BsChat />
                    <span>Start Chat Now</span>
                </button>
                <button 
                    onClick={openPopup}
                    className="flex items-center gap-3 bg-[#EEE3D9] text-[#292929] font-helvetica font-semibold py-3 px-6 rounded-full transition-transform transform hover:scale-105 cursor-pointer"
                >
                    <BsDownload />
                    <span>Download App</span>
                </button>
            </div>

            {/* <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
                {statsData.map((stat, index) => (
                    <div key={index} className="text-center">
                        <p className="text-4xl font-['Inria_Serif'] font-bold text-[#FFFFFF]">{stat.value}</p>
                        <p className="text-sm font-helvetica text-[#EFE4DA] mt-2">{stat.label}</p>
                    </div>
                ))}
            </div> */}
        </div>
    </section>
  );
}
