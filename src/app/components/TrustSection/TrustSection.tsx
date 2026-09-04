import React from 'react';
import Image from 'next/image';
import { SecurePayments, VerifiedAstrologers, PrivateAndConfidential } from '@/assets/images';

const trustFeatures = [
    {
        icon: PrivateAndConfidential,
        title: "Private & Confidential",
        alt: "Private and Confidential Icon"
    },
    {
        icon: VerifiedAstrologers,
        title: "Verified Astrologers",
        alt: "Verified Astrologers Icon"
    },
    {
        icon: SecurePayments,
        title: "Secure Payments",
        alt: "Secure Payments Icon"
    }
];

export default function TrustSection() {
    return (
        <section className="relative bg-[#f6971e]">
            <div className="bg-[#faca8c] w-full py-10 md:py-12 rounded-xl px-4 sm:px-6 md:px-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-6 md:gap-4 w-full">
                    {trustFeatures.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                            <div className="rounded-full flex items-center justify-center">
                                <Image
                                    src={feature.icon}
                                    alt={feature.alt}
                                    width={100}
                                    height={100}
                                    className="object-contain sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px]"
                                />
                            </div>
                            <h4 className="text-lg sm:text-xl md:text-2xl text-gray-800 font-semibold">
                                {feature.title}
                            </h4>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    );
}
