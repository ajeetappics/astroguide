'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsStarFill, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { fetchAstroReviews, AstroReviewItem } from '@/services/review/reviewService';
import { sanitizeImageUrl } from '@/utils/imageUtils';
import defaultAstroImg from '@/assets/images/astro-image.jpg';

interface DisplayReview {
  id: string | number;
  message: string;
  astroName: string;
  userName: string;
  astroImage: string;
  rating: number;
  astrologerId?: string;
}

function ReviewCard({ review }: { review: DisplayReview }) {
  const [imgSrc, setImgSrc] = useState<any>(() =>
    review.astroImage ? sanitizeImageUrl(review.astroImage, defaultAstroImg.src) : defaultAstroImg
  );

  useEffect(() => {
    if (review.astroImage) {
      setImgSrc(sanitizeImageUrl(review.astroImage, defaultAstroImg.src));
    } else {
      setImgSrc(defaultAstroImg);
    }
  }, [review.astroImage]);

  const profileUrl = review.astrologerId ? `/astrologers/${review.astrologerId}` : '/astrologers';

  return (
    <Link
      href={profileUrl}
      className="min-w-[280px] sm:min-w-[320px] md:min-w-[340px] max-w-[360px] snap-start bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-gray-100 shadow-[0_2px_14px_rgba(0,0,0,0.04)] hover:border-[#F6971E]/40 hover:shadow-[0_8px_24px_rgba(246,151,30,0.12)] transition-all duration-300 flex flex-col justify-between shrink-0 cursor-pointer group"
    >
      <div>
        {/* Top: Astrologer Photo + Info */}
        <div className="flex items-center gap-3.5">
          {/* Astrologer Circular Profile Image */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 border-2 border-[#F6971E]/30 group-hover:border-[#F6971E] bg-gray-50 shadow-xs transition-colors">
            <Image
              src={imgSrc}
              alt={review.astroName}
              fill
              sizes="(max-width: 640px) 56px, 64px"
              unoptimized={typeof imgSrc === 'string' && imgSrc.startsWith('http')}
              className="object-cover"
              onError={() => setImgSrc(defaultAstroImg)}
            />
          </div>

          {/* Astrologer Name + Given By + Stars */}
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-[#1f1f1f] group-hover:text-[#F6971E] text-sm sm:text-base font-helvetica truncate leading-snug transition-colors">
              {review.astroName}
            </h3>

            <p className="text-gray-400 text-xs sm:text-[13px] font-helvetica truncate mt-0.5">
              Given by: <span className="text-gray-600 font-medium">{review.userName}</span>
            </p>

            {/* Rating Stars */}
            <div className="flex text-[#FBBF24] text-xs sm:text-sm gap-0.5 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <BsStarFill
                  key={i}
                  className={i < review.rating ? 'text-[#FBBF24]' : 'text-gray-200'}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Review Message (if present) */}
        {review.message && (
          <div className="mt-3 pt-2.5 border-t border-gray-100/80">
            <p className="text-gray-600 text-xs sm:text-sm font-helvetica leading-relaxed line-clamp-3 italic">
              &quot;{review.message}&quot;
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [reviewsList, setReviewsList] = useState<DisplayReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadReviews = async () => {
      try {
        setIsLoading(true);
        const data: AstroReviewItem[] = await fetchAstroReviews(1, 50);

        if (isMounted && Array.isArray(data) && data.length > 0) {
          // Filter valid reviews that have some content or astrologer/user name
          const validItems = data.filter(
            (item) => Boolean(item && (item.message?.trim() || item.astroFullName || item.userFullName))
          );

          if (validItems.length > 0) {
            const mapped: DisplayReview[] = validItems.map((item, idx) => {
              const rawImg =
                (item.astroProfileImg && item.astroProfileImg.trim()) ||
                ((item as any).profileImg && String((item as any).profileImg).trim()) ||
                ((item as any).imageUrl && String((item as any).imageUrl).trim()) ||
                ((item as any).astrologerImage && String((item as any).astrologerImage).trim()) ||
                (item.userProfileImg && item.userProfileImg.trim()) ||
                '';

              return {
                id: item._id || idx,
                message: (item.message || '').trim(),
                astroName: (item.astroFullName || '').trim() || 'Astrologer',
                userName: (item.userFullName || '').trim() || 'Verified User',
                astroImage: rawImg,
                rating: typeof item.rating === 'number' && item.rating > 0 ? item.rating : 5,
                astrologerId: item.astrologerId || (item as any).astroId || (item as any).astrologerSlug || '',
              };
            });
            setReviewsList(mapped);
          }
        }
      } catch (err) {
        console.error('Error in loadReviews:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  if (!isLoading && reviewsList.length === 0) {
    return null;
  }

  return (
    <section className="bg-transparent py-4 md:py-6 px-4 lg:px-12 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header Section matching Screenshot */}
        <div className="flex justify-between items-center mb-3 sm:mb-4 gap-3">
          <h2 className="text-xl sm:text-2xl md:text-[26px] font-bold text-[#1f1f1f] font-helvetica leading-tight">
            User Reviews
          </h2>

          <div className="flex items-center gap-2 sm:gap-3">
          
            {/* Arrow Controls */}
            <div className="hidden sm:flex items-center gap-1.5 ml-2">
              <button
                onClick={scrollLeft}
                aria-label="Previous reviews"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#F6971E] hover:text-[#F6971E] hover:bg-[#F6971E]/5 transition-all shadow-2xs cursor-pointer"
              >
                <BsChevronLeft className="text-xs" />
              </button>
              <button
                onClick={scrollRight}
                aria-label="Next reviews"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#F6971E] hover:text-[#F6971E] hover:bg-[#F6971E]/5 transition-all shadow-2xs cursor-pointer"
              >
                <BsChevronRight className="text-xs" />
              </button>
            </div>
          </div>
        </div>

        {/* Slider Container */}
        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto pt-1 pb-2 snap-x snap-mandatory scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {isLoading && reviewsList.length === 0 ? (
            // Skeleton Loader Cards
            [...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="min-w-[280px] sm:min-w-[320px] snap-start bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-gray-100 flex flex-col gap-3 animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-gray-200 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-28" />
                    <div className="h-3 bg-gray-100 rounded w-36" />
                    <div className="h-3 bg-gray-200 rounded w-20" />
                  </div>
                </div>
                <div className="h-3 bg-gray-100 rounded w-full mt-2" />
              </div>
            ))
          ) : (
            reviewsList.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

