import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { BsStarFill } from 'react-icons/bs';
import { lineStyle } from '@/assets/images';

interface TestimonialCardProps {
    image: StaticImageData | string;
    name: string;
    rating: number;
    tag: string;
    text: string;
}

export default function TestimonialCard({ image, name, rating, tag, text }: TestimonialCardProps) {
    return (
        <div className="embla__slide px-4">
            <div className="bg-[#FAF6F2] border-2 border-[#F6971E] rounded-2xl p-8 text-center h-full flex flex-col items-center">
                {/* Updated image container with overflow hidden */}
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                    <Image 
                        src={image} 
                        alt={name} 
                        width={80} 
                        height={80} 
                        className="w-full h-full object-cover"
                    />
                </div>

                <h3 className="text-xl font-['Inria_Serif'] font-bold text-[#F6971E] mb-2">{name}</h3>

                <div className="flex gap-1 mb-4">
                    {Array(rating).fill(0).map((_, i) => (
                        <BsStarFill key={i} className="text-[#C1A983]" />
                    ))}
                    {Array(5 - rating).fill(0).map((_, i) => (
                        <BsStarFill key={i} className="text-gray-300" />
                    ))}
                </div>

                <div className="bg-[#EFE4DA] text-[#000000AD] text-xs font-helvetica font-medium py-1 px-3 rounded-full mb-6">
                    {tag}
                </div>

                <p className="text-sm font-helvetica text-[#5C5C5C] leading-relaxed mb-6 flex-grow">
                    {text}
                </p>

                <div className="mt-auto">
                    <Image src={lineStyle} alt="img" />
                </div>
            </div>
        </div>
    );
}