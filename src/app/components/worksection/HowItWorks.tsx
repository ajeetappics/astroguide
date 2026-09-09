'use client';
import React from 'react';
import { BsChatDots, BsPeople, BsTelephone } from 'react-icons/bs';
import { IoSparkles } from 'react-icons/io5';

const stepsData = [
    {
        number: "01",
        icon: BsChatDots,
        title: "Ask a Question",
        description: "Share your spiritual question or concern with our intuitive platform to get started."
    },
    {
        number: "02",
        icon: BsPeople,
        title: "Select Astrologer",
        description: "Browse and choose from our highly qualified experts who perfectly match your needs."
    },
    {
        number: "03",
        icon: BsTelephone,
        title: "Chat / Call",
        description: "Connect instantly through a secure, private chat or voice call consultation."
    },
    {
        number: "04",
        icon: IoSparkles,
        title: "Receive Guidance",
        description: "Get personalized, accurate insights and effective spiritual remedies for a better life."
    }
];

export default function HowItWorks() {
    return (
        <section
            className="py-6 sm:py-8 md:py-12 px-4 md:px-8 relative overflow-hidden"
            style={{ background: 'linear-gradient(0deg, rgba(250, 169, 69, 1) 26%, rgb(255 255 255) 100%)' }}
        >
            <div className="container mx-auto max-w-6xl relative z-10">

                {/* Header Section */}
                <div className="text-center mb-4 md:mb-6">
                    <span className="text-[#F6971E] font-bold font-helvetica tracking-widest uppercase text-[10px] sm:text-xs mb-1 block">
                        HOW IT WORKS
                    </span>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-['Inria_Serif'] text-[#4A2B23] leading-tight">
                        Your journey to cosmic wisdom <br className="hidden md:block" />
                        <span className="text-[#F6971E]">in four simple steps</span>
                    </h2>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 md:gap-4 relative">

                    {/* Connecting dashed line (visible only on large screens) */}
                    <div className="hidden lg:block absolute top-[38px] left-[10%] w-[80%] h-[2px] border-t-2 border-dashed border-[#F6971E]/30 z-0"></div>

                    {stepsData.map((step, index) => (
                        <div
                            key={index}
                            className="group relative bg-white/75 backdrop-blur-xl border border-white/80 p-3.5 sm:p-4 md:p-4.5 rounded-xl sm:rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(250,169,69,0.2)] transition-all duration-500 animate-fade-in-up z-10 flex flex-col items-center md:items-start text-center md:text-left"
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            {/* Watermark Number - Scaled down & subtle */}
                            <div className="absolute top-0 right-1 text-[45px] sm:text-[52px] md:text-[60px] font-black text-[#F6971E]/10 select-none pointer-events-none font-helvetica leading-none transition-transform duration-500 group-hover:scale-105 group-hover:text-[#F6971E]/20">
                                {step.number}
                            </div>

                            {/* Icon Container - Compact */}
                            <div className="relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#F6971E] to-[#e58210] flex items-center justify-center shadow-xs mb-2.5 sm:mb-3 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                                <step.icon className="text-white text-base sm:text-lg" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                <h3 className="text-sm sm:text-base font-bold text-[#4A2B23] font-['Inria_Serif'] mb-1 group-hover:text-[#F6971E] transition-colors duration-300">
                                    {step.title}
                                </h3>
                                <p className="text-[#4A2B23]/75 font-helvetica text-[11px] sm:text-xs leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </section>
    );
}
