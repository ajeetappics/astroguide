'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BsStarFill, BsStarHalf, BsStar, BsPatchCheckFill, BsCurrencyRupee } from 'react-icons/bs';
import { sanitizeImageUrl } from '@/utils/imageUtils';
import defaultAstroImg from '@/assets/images/astro-image.jpg';

export interface TopAstrologerTag {
    _id?: string;
    tagName: string;
}

export interface TopAstrologerData {
    id: string;
    _id?: string;
    slug?: string;
    name: string;
    isVerified: boolean;
    isCelebrity?: boolean;
    tag?: TopAstrologerTag;
    status?: 'online' | 'busy' | 'offline';
    isOnline?: boolean;
    isBusy?: boolean;
    skills: string[];
    languages: string;
    experience: string;
    rating: string;
    totalCalls: string;
    price: string;
    originalPrice?: number;
    imageUrl: string;
}

interface TopAstrologerCardProps {
    astro?: TopAstrologerData;
    astrologer?: TopAstrologerData;
}

export default function TopAstrologerCard({ astro: astroProp, astrologer: astrologerProp }: TopAstrologerCardProps) {
    const astro = (astroProp || astrologerProp)!;
    const router = useRouter();

    const [imgSrc, setImgSrc] = useState<any>(() =>
        astro?.imageUrl ? sanitizeImageUrl(astro.imageUrl, defaultAstroImg.src) : defaultAstroImg
    );


    useEffect(() => {
        if (astro?.imageUrl) {
            setImgSrc(sanitizeImageUrl(astro.imageUrl, defaultAstroImg.src));
        } else {
            setImgSrc(defaultAstroImg);
        }
    }, [astro?.imageUrl]);

    if (!astro) return null;

    const handleCardClick = () => {
        const identifier = astro.slug || astro.id;
        router.push(`/astrologers/${identifier}`);
    };

    const astroId = astro?._id || astro?.id;
    const connectUrl = `${process.env.NEXT_PUBLIC_URL}/astrologer-profile?astroId=${astroId}`;

    // Only use scratch / original price if provided directly by the API (matching Astrologer Profile page)
    const originalPrice = astro.originalPrice;

    return (
        <>
            {/* 📱 Mobile / Responsive App UI (Exact match with App screenshot) */}
            <div
                onClick={handleCardClick}
                className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.05)] border border-[#F6971E]/30 p-3 sm:p-3.5 flex gap-3 sm:gap-3.5 relative overflow-hidden cursor-pointer active:scale-[0.99] transition-all"
            >
                {/* Verified Badge fixed at Top-Right Corner */}
                {astro.isVerified && (
                    <span
                        title="Verified Astrologer"
                        className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 z-10 text-[#00C853] text-base sm:text-lg flex-shrink-0"
                    >
                        <BsPatchCheckFill />
                    </span>
                )}

                {/* Left: Avatar + Status Indicator + Tag Badge + Stars */}
                <div className="flex flex-col items-center flex-shrink-0">
                    <div className="relative w-[95px] h-[130px] sm:w-[105px] sm:h-[140px] rounded-2xl border-2 border-[#F6971E] overflow-hidden bg-gray-50">
                        <Image
                            src={imgSrc}
                            alt={astro.name}
                            fill
                            sizes="110px"
                            className="object-cover object-top"
                            onError={() => setImgSrc(defaultAstroImg)}
                        />

                        {/* Online / Busy Status Indicator (Green for Online, Red for Busy) */}
                        {astro.isBusy ? (
                            <span
                                title="Busy"
                                className="absolute top-1.5 right-1.5 w-3 h-3 rounded-full bg-[#E53935] border-2 border-white shadow-xs z-20"
                            />
                        ) : astro.isOnline ? (
                            <span
                                title="Online"
                                className="absolute top-1.5 right-1.5 w-3 h-3 rounded-full bg-[#00C853] border-2 border-white shadow-xs z-20 animate-pulse"
                            />
                        ) : null}

                        {/* Tag Badge Overlay (Trending etc.) */}
                        {astro.tag?.tagName && (
                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-[#F6971E] to-[#FF7A00] text-white text-[14px] font-bold text-center py-0.5 z-10 flex items-center justify-center gap-0.5">
                                <span title={astro.tag.tagName}>{astro.tag.tagName.length > 8 ? astro.tag.tagName.slice(0, 8) + '...' : astro.tag.tagName}</span>
                                <span>🔥</span>
                            </div>
                        )}
                    </div>

                    {/* Dynamic Star Rating */}
                    <div className="flex items-center gap-0.5 mt-2">
                        {(() => {
                            const ratingNum = parseFloat(astro.rating || '0') || 0;
                            return [1, 2, 3, 4, 5].map((star) => {
                                if (ratingNum >= star) {
                                    return <BsStarFill key={star} className="text-[#F6971E] text-xs" />;
                                } else if (ratingNum >= star - 0.5) {
                                    return <BsStarHalf key={star} className="text-[#F6971E] text-xs" />;
                                } else {
                                    return <BsStar key={star} className="text-gray-300 text-xs" />;
                                }
                            });
                        })()}
                    </div>
                </div>

                {/* Right: Info + Skills + Connect Button */}
                <div className="flex flex-col justify-between flex-grow min-w-0">
                    <div>
                        {/* Row 1: Name (pr-6 ensures no overlap with top-right verified badge) */}
                        <div className="flex items-center mb-1 min-w-0 pr-6">
                            <h3 className="text-base sm:text-lg font-bold text-[#1f1f1f] font-helvetica truncate" title={astro.name}>
                                {astro.name}
                            </h3>
                        </div>

                        {/* Row 2: Pricing (Only strictly from API) */}
                        {astro.price && (
                            <div className="flex items-center gap-2 mb-1">
                                {originalPrice && (
                                    <span className="text-xs text-gray-400 line-through flex items-center">
                                        <BsCurrencyRupee className="text-xs -mr-0.5" />
                                        {originalPrice}
                                    </span>
                                )}
                                <span className="text-sm font-bold text-[#F6971E] font-helvetica flex items-center">
                                    <BsCurrencyRupee className="text-sm -mr-0.5" />
                                    {astro.price.replace('₹', '')}/min
                                </span>
                            </div>
                        )}

                        {/* Row 3: Experience & Languages (Only if in API) */}
                        {(astro.experience || astro.languages) && (
                            <p className="text-xs text-[#666666] font-helvetica truncate mb-2">
                                {[astro.experience && `Exp: ${astro.experience}`, astro.languages].filter(Boolean).join(' | ')}
                            </p>
                        )}

                        {/* Row 4: Skill Pills (Only if in API) */}
                        {astro.skills && astro.skills.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                                {astro.skills.slice(0, 2).map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className="rounded-full border border-gray-200 px-2 py-0.5 text-[11px] text-[#555555] bg-white font-helvetica"
                                    >
                                        {skill}
                                    </span>
                                ))}
                                {astro.skills.length > 2 && (
                                    <span className="rounded-full border border-gray-200 px-1.5 py-0.5 text-[10px] font-semibold text-[#888888] bg-gray-50 font-helvetica">
                                        +{astro.skills.length - 2}
                                    </span>
                                )}
                            </div>
                        )}

                        <hr className="h-[1px] bg-gray-100 border-none mb-2" />

                        {/* Rating Row (Shows 0 if no rating, strictly never demo 5) */}
                        <div className="flex items-center gap-1.5 overflow-hidden flex-nowrap mb-2.5 text-xs font-helvetica font-bold">
                            {Number(astro?.rating) > 0 ? (
                                <>
                                    <BsStarFill className="text-[#F6971E] text-xs" />
                                    <span className="text-[#F6971E]">{Number(astro?.rating).toFixed(1)}</span>
                                </>
                            ) : (
                                <>
                                    <BsStar className="text-gray-400 text-xs" />
                                    <span className="text-gray-500">0</span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Row 5: Connect Button */}
                    <div className="mt-auto pt-1">
                        <Link
                            href={connectUrl}
                            onClick={(e) => {
                                e.stopPropagation();
                                try {
                                    sessionStorage.setItem('deep_link_source', window.location.href);
                                } catch { }
                            }}
                            className="w-full bg-gradient-to-r from-[#F6971E] to-[#FFA733] text-white font-bold font-helvetica py-2 px-4 rounded-xl shadow-[0_2px_8px_rgba(246,151,30,0.25)] hover:opacity-95 active:scale-95 transition-all flex items-center justify-center text-xs sm:text-sm cursor-pointer"
                        >
                            Connect Now
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
