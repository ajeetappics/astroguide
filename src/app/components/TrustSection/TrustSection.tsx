import React from 'react';
import Image from 'next/image';

// Directly importing the new SVG icons
import privateConfidentialIcon from '@/assets/images/private-confidential.svg';
import verifiedAstrologersIcon from '@/assets/images/verified-astrologers.svg';
import securePaymentsIcon from '@/assets/images/secure-payments.svg';

const trustFeatures = [
    {
        icon: privateConfidentialIcon,
        title: "Private & Confidential",
        desc: "Your personal details, consultations, and chats are 100% secure and kept strictly confidential.",
        alt: "Private and Confidential Icon"
    },
    {
        icon: verifiedAstrologersIcon,
        title: "Verified Astrologers",
        desc: "Every expert on our platform goes through a strict multi-step background verification process.",
        alt: "Verified Astrologers Icon"
    },
    {
        icon: securePaymentsIcon,
        title: "Secure Payments",
        desc: "We ensure safe, end-to-end encrypted, and lightning-fast payment gateways for all transactions.",
        alt: "Secure Payments Icon"
    }
];

export default function TrustSection() {
    return (
        <section className="relative w-full bg-[#FEF8E2] py-6 md:py-10 overflow-hidden">

            {/* Background Decorative Elements */}
            <div className="absolute top-10 left-10 w-64 h-64 bg-[#F6971E]/10 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#F6971E]/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto max-w-5xl px-4 sm:px-6 md:px-8 relative z-10">

                {/* Section Header */}
                <div className="text-center mb-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-['Inria_Serif'] text-[#4A2B23] leading-tight mb-1.5">
                        Why trust <span className="text-[#F6971E]">Balaji Astro Guide?</span>
                    </h2>
                    <p className="text-[#4A2B23]/70 font-helvetica max-w-xl mx-auto text-xs sm:text-sm">
                        We are committed to providing you with the most authentic, secure, and reliable astrological guidance.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 w-full mx-auto">
                    {trustFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative bg-white/80 backdrop-blur-xl rounded-2xl p-5 sm:p-6 md:p-6.5 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-white hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(246,151,30,0.1)] transition-all duration-500 overflow-hidden"
                        >

                            {/* Inner Background Glow on Hover */}
                            <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-[#F6971E]/20 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>

                            {/* Creative Floating Icon Container */}
                            <div className="relative w-14 h-14 sm:w-16 sm:h-16 mb-4 mt-1">
                                {/* Back rotated square */}
                                <div className="absolute inset-0 bg-[#FFF5E6] rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-500 ease-out"></div>
                                {/* Front square */}
                                <div className="absolute inset-0 bg-white rounded-xl border border-[#F6971E]/15 flex items-center justify-center -rotate-3 group-hover:rotate-0 transition-transform duration-500 ease-out shadow-xs">
                                    <Image
                                        src={feature.icon}
                                        alt={feature.alt}
                                        width={36}
                                        height={36}
                                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="relative z-10">
                                <h4 className="text-base sm:text-lg text-[#4A2B23] font-bold font-['Inria_Serif'] mb-1.5 transition-colors duration-300 group-hover:text-[#F6971E]">
                                    {feature.title}
                                </h4>
                                <p className="text-xs sm:text-[13px] text-[#4A2B23]/70 font-helvetica leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
