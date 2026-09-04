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
        <section className="relative w-full bg-[#FEF8E2] py-[30px] md:py-[60px] overflow-hidden">

            {/* Background Decorative Elements */}
            <div className="absolute top-10 left-10 w-64 h-64 bg-[#F6971E]/10 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#F6971E]/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-12 relative z-10">

                {/* Section Header */}
                <div className="text-center mb-8">
                    <h2 className="text-[32px] md:text-[42px] font-bold font-['Inria_Serif'] text-[#4A2B23] leading-tight mb-4">
                        Why trust <span className="text-[#F6971E]">Balaji Astro Guide?</span>
                    </h2>
                    <p className="text-[#4A2B23]/70 font-helvetica max-w-2xl mx-auto text-base md:text-lg">
                        We are committed to providing you with the most authentic, secure, and reliable astrological guidance.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 w-full max-w-6xl mx-auto">
                    {trustFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative bg-white/80 backdrop-blur-xl rounded-[40px] p-8 md:p-10 flex flex-col items-center text-center shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-white hover:-translate-y-4 hover:shadow-[0_40px_80px_rgba(246,151,30,0.15)] transition-all duration-500 overflow-hidden"
                        >

                            {/* Inner Background Glow on Hover */}
                            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#F6971E]/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>

                            {/* Creative Floating Icon Container */}
                            <div className="relative w-24 h-24 md:w-28 md:h-28 mb-8 mt-4">
                                {/* Back rotated square */}
                                <div className="absolute inset-0 bg-[#FFF5E6] rounded-[24px] rotate-6 group-hover:rotate-12 transition-transform duration-500 ease-out"></div>
                                {/* Front square */}
                                <div className="absolute inset-0 bg-white rounded-[24px] border-2 border-[#F6971E]/10 flex items-center justify-center -rotate-3 group-hover:rotate-0 transition-transform duration-500 ease-out shadow-sm">
                                    <Image
                                        src={feature.icon}
                                        alt={feature.alt}
                                        width={56}
                                        height={56}
                                        className="object-contain transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="relative z-10">
                                <h4 className="text-[20px] md:text-[24px] text-[#4A2B23] font-bold font-['Inria_Serif'] mb-4 transition-colors duration-300 group-hover:text-[#F6971E]">
                                    {feature.title}
                                </h4>
                                <p className="text-sm md:text-[15px] text-[#4A2B23]/70 font-helvetica leading-relaxed">
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
