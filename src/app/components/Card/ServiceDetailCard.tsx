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
        <div className="min-h-[236px] rounded-[10px] p-6 
                    bg-white/10 backdrop-blur-md backdrop-saturate-100 
                    border border-white/30 shadow-inner">
            <h3 className="text-2xl font-inria font-bold text-[#72271E] mb-3">
                {title}
            </h3>

            <p className="text-sm font-helvetica text-[#5C5C5C] mb-6">
                {description}
            </p>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#C1A983]"></div>
                        <span className="text-sm font-helvetica text-[#5C5C5C]">
                            {feature}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
