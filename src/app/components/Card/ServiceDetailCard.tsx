import React from "react";

interface ServiceDetailCardProps {
    title: string;
    description: string;
    features: string[];
}

export default function ServiceDetailCard({
    title,
    description,
    features,
}: ServiceDetailCardProps) {
    return (
        <div className="rounded-xl p-3.5 sm:p-4 md:p-5 
                    bg-white/40 backdrop-blur-md backdrop-saturate-100 
                    border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(246,151,30,0.1)] transition-all duration-300">
            <h3 className="text-base sm:text-lg font-inria font-bold text-[#72271E] mb-1">
                {title}
            </h3>

            <p className="text-xs sm:text-[13px] font-helvetica text-[#5C5C5C] mb-3 leading-relaxed">
                {description}
            </p>

            <div className="grid grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-1.5 sm:gap-y-2">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C1A983] shrink-0"></div>
                        <span className="text-[11px] sm:text-xs font-helvetica text-[#5C5C5C]">
                            {feature}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
