import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BsArrowRight } from 'react-icons/bs';

export interface PujaData {
  id: number | string;
  _id?: string;
  slug?: string;
  title: string;
  description: string;
  location?: string;
  date?: string;
  price: string;
  image: string;
  tagName?: string;
  tag?: any;
  raw?: any;
}

interface PoojaCardProps {
  pooja: PujaData;
  basePath?: string;
}

export default function PoojaCard({ pooja, basePath = "/pooja" }: PoojaCardProps) {
  const router = useRouter();
  const identifier = pooja.slug || pooja.id;
  const poojaId = pooja._id || pooja.id;
  const baseUrl = (process.env.NEXT_PUBLIC_URL || '').replace(/\/$/, '');
  const connectUrl = `${baseUrl}/pooja-details?poojaId=${poojaId}`;

  const handleCardClick = () => {
    router.push(`${basePath}/${identifier}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(246,151,30,0.12)] border border-[#F6971E]/15 hover:border-[#F6971E]/50 transition-all duration-500 hover:-translate-y-1 flex flex-col group h-full cursor-pointer"
    >

      {/* Image Section - Compact height */}
      <div className="relative h-[110px] sm:h-[125px] md:h-[135px] w-full overflow-hidden">
        <Image
          src={pooja.image}
          alt={pooja.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 350px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#4A1A14]/80 to-transparent"></div>

        {/* Tag Badge if present */}
        {pooja.tagName && (
          <div className="absolute top-2 left-2 z-10">
            <span className="inline-flex items-center text-[10px] sm:text-[11px] font-bold text-white bg-gradient-to-r from-[#F6971E] to-[#E07A00] px-2.5 py-0.5 rounded-full shadow-md backdrop-blur-xs uppercase tracking-wider">
              <span className="truncate max-w-[120px]">{pooja.tagName}</span>
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-3.5 flex flex-col flex-grow">
        <h3 className="text-sm sm:text-base md:text-[17px] font-bold text-[#72271E] font-['Inria_Serif'] mb-1 group-hover:text-[#F6971E] transition-colors line-clamp-1">
          {pooja.title}
        </h3>

        <p className="text-[#6b6b6b] text-xs sm:text-[13px] font-helvetica leading-relaxed mb-2.5 line-clamp-2">
          {pooja.description}
        </p>

        {/* Footer: Price & Button */}
        <div className="mt-auto flex items-center justify-between pt-2.5 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-gray-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-0.5">Starts At</span>
            <span className="text-base sm:text-lg font-bold text-[#4A2B23] flex items-center">
              <span className="font-sans">₹</span>
              {pooja.price.replace('₹', '')}
            </span>
          </div>
          <Link
            href={connectUrl}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#4A2B23] whitespace-nowrap text-white hover:bg-[#F6971E] font-bold text-xs sm:text-[13px] px-3 py-1.5 rounded-full transition-colors flex items-center gap-1 shadow-2xs cursor-pointer z-10"
          >
            Connect <BsArrowRight className="text-xs" />
          </Link>
        </div>

      </div>

    </div>
  );
}
