'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsStarFill, BsStarHalf, BsStar, BsPatchCheckFill, BsLightningChargeFill, BsCheckCircleFill, BsChevronRight, BsChevronLeft, BsShieldCheck, BsImages, BsX, BsCameraVideoFill, BsPlayFill, BsCurrencyRupee, BsCameraVideo } from 'react-icons/bs';
import { useParams } from 'next/navigation';
import { fetchAstrologerById, fetchAstrologerFeedbacks } from '@/services/astrologer/astrologerService';
import { sanitizeImageUrl } from '@/utils/imageUtils';

const REVIEWS_PER_PAGE = 10;

const getReviewPageNumbers = (current: number, total: number): (number | string)[] => {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [];
  pages.push(1);

  if (current > 3) {
    pages.push('dots-1');
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push('dots-2');
  }

  pages.push(total);
  return pages;
};

export default function AstrologerDetails() {
  const params = useParams();
  const astroId = (params?.id as string) || '';

  const [astro, setAstro] = useState<any>(null);
  const [feedbacksData, setFeedbacksData] = useState<any>(null);
  const [reviewPage, setReviewPage] = useState(1);
  const [isReviewsLoading, setIsReviewsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (!astroId) {
      setIsLoading(false);
      return;
    }

    const loadDetails = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAstrologerById(astroId);
        if (isMounted && data) {
          setAstro(data);
          const feedbackTargetId = data._id || data.id || astroId;
          const feedbacks = await fetchAstrologerFeedbacks(feedbackTargetId, 1, REVIEWS_PER_PAGE);
          if (isMounted && feedbacks) {
            setFeedbacksData(feedbacks);
          }
        }
      } catch (err) {
        console.error('Error loading astrologer details/feedbacks:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadDetails();
    return () => {
      isMounted = false;
    };
  }, [astroId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPreviewImage(null);
        setActiveVideo(null);
      }
    };
    if (previewImage || activeVideo) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [previewImage, activeVideo]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFFDF9] pb-20 font-helvetica">
        {/* Banner Skeleton */}
        <div className="relative w-full bg-[#fdf7e1] pt-[70px] lg:pt-[80px] pb-10 md:pb-12 animate-pulse">
          <div className="container mx-auto max-w-6xl px-4 py-4 md:py-5">
            <div className="h-4 bg-[#F6971E]/20 rounded w-48 mb-2"></div>
          </div>
        </div>
        {/* Profile Card Skeleton */}
        <div className="container mx-auto max-w-6xl px-4 relative -mt-10 md:-mt-12 z-20">
          <div className="bg-white rounded-[28px] p-6 sm:p-8 shadow-sm border border-[#F6971E]/10 mb-8 animate-pulse">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start border-b border-gray-100 pb-6">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gray-200 shrink-0"></div>
              <div className="flex-1 w-full space-y-3 pt-2 text-center md:text-left">
                <div className="h-7 bg-gray-200 rounded w-1/3 mx-auto md:mx-0"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2 mx-auto md:mx-0"></div>
                <div className="h-4 bg-gray-100 rounded w-1/4 mx-auto md:mx-0"></div>
              </div>
            </div>
            <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="h-12 bg-gray-100 rounded-xl"></div>
              <div className="h-12 bg-gray-100 rounded-xl"></div>
              <div className="h-12 bg-gray-100 rounded-xl"></div>
              <div className="h-12 bg-gray-100 rounded-xl"></div>
            </div>
          </div>
          {/* About Skeleton */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#F6971E]/15 animate-pulse space-y-3">
            <div className="h-5 bg-gray-200 rounded w-40 mb-4"></div>
            <div className="h-4 bg-gray-100 rounded w-full"></div>
            <div className="h-4 bg-gray-100 rounded w-5/6"></div>
            <div className="h-4 bg-gray-100 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!astro) {
    return (
      <div className="min-h-screen bg-[#FFFDF9] flex flex-col items-center justify-center p-6 text-center font-helvetica pt-28 pb-20">
        <div className="w-16 h-16 rounded-full bg-[#FFF8EB] border border-[#F6971E]/30 flex items-center justify-center text-[#F6971E] text-2xl mb-4 shadow-sm">
          ✨
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-['Inria_Serif'] text-[#4A2B23] mb-2">
          Astrologer Not Found
        </h2>
        <p className="text-gray-500 max-w-md mb-6 text-sm">
          The astrologer profile you are looking for does not exist or may have been removed.
        </p>
        <Link
          href="/astrologers"
          className="bg-gradient-to-r from-[#F6971E] to-[#FFA733] text-white font-bold py-2.5 px-6 rounded-xl shadow-[0_4px_15px_rgba(246,151,30,0.25)] hover:opacity-95 transition-all text-sm"
        >
          Explore All Astrologers
        </Link>
      </div>
    );
  }

  const currentAstro = astro;

  const rawFeedbacks: any[] = Array.isArray(feedbacksData)
    ? feedbacksData
    : (feedbacksData?.sessionFeedbacks || feedbacksData?.feedbacks || feedbacksData?.data?.sessionFeedbacks || []);

  const totalReviewsCount = feedbacksData?.pagination?.totalDocs ?? feedbacksData?.data?.pagination?.totalDocs ?? rawFeedbacks.length;
  const totalReviewPages = feedbacksData?.pagination?.totalPages ?? feedbacksData?.data?.pagination?.totalPages ?? Math.max(1, Math.ceil(totalReviewsCount / REVIEWS_PER_PAGE));

  const handleReviewPageChange = async (newPage: number) => {
    if (newPage < 1 || newPage > totalReviewPages || newPage === reviewPage || isReviewsLoading) return;
    setReviewPage(newPage);
    try {
      setIsReviewsLoading(true);
      const feedbackTargetId = currentAstro?._id || currentAstro?.id || astroId;
      const data = await fetchAstrologerFeedbacks(feedbackTargetId, newPage, REVIEWS_PER_PAGE);
      if (data) {
        setFeedbacksData(data);
      }
      const reviewsEl = document.getElementById('reviews-section');
      if (reviewsEl) {
        reviewsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (err) {
      console.error('Error loading review page:', err);
    } finally {
      setIsReviewsLoading(false);
    }
  };

  const apiAverageRating = feedbacksData?.averageRating ?? feedbacksData?.data?.averageRating;

  const displayRating =
    apiAverageRating !== undefined && Number(apiAverageRating) > 0
      ? Number(apiAverageRating).toFixed(1)
      : (currentAstro.averageRating !== undefined && Number(currentAstro.averageRating) > 0
        ? Number(currentAstro.averageRating).toFixed(1)
        : (rawFeedbacks.length > 0
            ? (rawFeedbacks.reduce((acc: number, curr: any) => acc + (Number(curr.rating) || 5), 0) / rawFeedbacks.length).toFixed(1)
            : "5.0"));

  const defaultCompliments: Record<number, string> = {
    5: "Very accurate predictions and very helpful remedies. Truly grateful for the guidance!",
    4: "Good consultation and clear explanation of all planetary positions and queries.",
    3: "Helpful session with decent insights.",
    2: "Average session.",
    1: "Needs improvement."
  };

  const reviewsList = rawFeedbacks.map((item: any, index: number) => {
    const rawName = item.userFullName?.trim();
    const name = rawName && rawName !== "" ? rawName : `Client ${index + 1}`;
    const stars = Number(item.rating) || 5;
    const dateFormatted = item.createdAt
      ? new Date(item.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
      : "";

    const text =
      item.comment ||
      item.feedback ||
      item.review ||
      item.text ||
      item.message ||
      defaultCompliments[stars] ||
      defaultCompliments[5];

    return {
      id: item._id || index,
      name,
      userProfileImg: item.userProfileImg ? sanitizeImageUrl(item.userProfileImg, "") : null,
      stars,
      date: dateFormatted,
      text,
    };
  });

  // Combine all photos, certificates, and certificate gallery into a single unified Photo Gallery (deduplicating URLs)
  const allGalleryPhotos = Array.from(
    new Set([
      ...(currentAstro.photoGallery || []),
      ...(currentAstro.photos || []),
      ...(currentAstro.certificateGallery || []),
      ...(currentAstro.certificates || [])
    ].filter(Boolean))
  ).map((p: any) => sanitizeImageUrl(p));

  return (
    <div className="min-h-screen bg-[#FFFDF9] pb-20 font-helvetica">

      {/* 1. Hero Banner (Light Theme) */}
      <div className="relative w-full bg-[#fdf7e1] overflow-hidden pt-[70px] lg:pt-[80px] pb-10 md:pb-12">
        {/* Glow Effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] max-w-[400px] max-h-[400px] bg-[#F6971E]/30 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] max-w-[300px] max-h-[300px] bg-[#F6971E]/20 rounded-full blur-[60px] pointer-events-none"></div>

        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent mix-blend-overlay"></div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-4 md:py-5">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm font-bold tracking-wider uppercase text-[#4A2B23]/70">
            <Link href="/" className="hover:text-[#F6971E] transition-colors">Home</Link>
            <BsChevronRight className="text-[9px] shrink-0" />
            <Link href="/astrologers" className="hover:text-[#F6971E] transition-colors">Astrologers</Link>
            <BsChevronRight className="text-[9px] shrink-0" />
            <span className="text-[#F6971E] truncate max-w-[200px] sm:max-w-none">{currentAstro.fullName || "Astrologer"}</span>
          </div>
        </div>
      </div>

      {/* Main Container (Pulled up to overlap banner with equal spacing) */}
      <div className="container mx-auto max-w-6xl px-4 relative -mt-10 md:-mt-12 z-20">

        {/* Profile Header Card with embedded stats */}
        <div className="bg-white rounded-[28px] p-5 sm:p-7 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-[#F6971E]/10 mb-8 flex flex-col">

          <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-center md:items-start text-center md:text-left border-b border-gray-100 pb-6">
            {/* Avatar (Rounded Profile) */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex-shrink-0 mx-auto md:mx-0">
              <div className="w-full h-full rounded-full border-[3px] border-[#F6971E]/30 overflow-hidden bg-white shadow-md relative">
                <Image
                  src={sanitizeImageUrl(currentAstro.profileImg)}
                  alt={currentAstro.fullName || "Astrologer"}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 min-w-0 w-full pt-1">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 w-full">
                <div className="min-w-0">
                  {/* Tag if present */}
                  {currentAstro.tag?.tagName && (
                    <div className="mb-1.5 flex justify-center md:justify-start">
                      <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-[#F6971E] bg-[#FFF8EB] border border-[#F6971E]/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs text-center max-w-full truncate">
                        <span className="shrink-0">🔥</span>
                        <span className="truncate">{currentAstro.tag.tagName}</span>
                      </span>
                    </div>
                  )}

                  {/* Astrologer Name & Verified Tick */}
                  <div className="flex items-center justify-center md:justify-start gap-1.5 sm:gap-2 mb-1.5 flex-wrap">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#4A2B23] font-['Inria_Serif'] leading-tight">
                      {currentAstro.fullName || "Astrologer"}
                    </h1>
                    {currentAstro.isOtpVerified && (
                      <BsPatchCheckFill className="text-[#00C853] text-lg sm:text-xl shrink-0" title="OTP Verified" />
                    )}
                  </div>

                  {/* Expertise */}
                  {currentAstro?.expertise && currentAstro.expertise.length > 0 && (
                    <p className="text-xs sm:text-sm text-gray-600 text-left leading-relaxed mt-1">
                      <span className="text-gray-400 uppercase tracking-wider text-[10px] sm:text-xs font-bold mr-1.5">Expertise:</span>
                      <span className="font-semibold text-[#4A2B23]">
                        {currentAstro.expertise.map((exp: any) => (typeof exp === 'string' ? exp : exp?.expertiseName)).filter(Boolean).join(' • ')}
                      </span>
                    </p>
                  )}

                  {/* Languages */}
                  {currentAstro?.languages && currentAstro.languages.length > 0 && (
                    <p className="text-xs sm:text-sm text-gray-600 text-left leading-relaxed mt-1">
                      <span className="text-gray-400 uppercase tracking-wider text-[10px] sm:text-xs font-bold mr-1.5">Languages:</span>
                      <span className="font-semibold text-[#4A2B23]">
                        {currentAstro.languages.map((lang: any) => (typeof lang === 'string' ? lang : lang?.languageName)).filter(Boolean).join(' • ')}
                      </span>
                    </p>
                  )}
                </div>

                {/* Price and Connect Button (Right Side) */}
                <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-2.5 mt-2 md:mt-0 shrink-0">
                  <div className="flex items-baseline justify-center md:justify-end gap-2">
                    {(currentAstro.chat?.ratePerMinute || currentAstro.call?.ratePerMinute) && (
                      <span className="text-xs sm:text-sm text-gray-400 line-through font-medium flex items-center">
                        <BsCurrencyRupee className="text-xs -mr-0.5" />
                        {currentAstro.chat?.ratePerMinute || currentAstro.call?.ratePerMinute}/min
                      </span>
                    )}
                    <span className="text-xl sm:text-2xl md:text-[26px] font-bold text-[#4A2B23] flex items-center">
                      <BsCurrencyRupee className="text-lg md:text-xl -mr-0.5" />
                      {currentAstro.chat?.offerPricePerMinute || currentAstro.call?.offerPricePerMinute || 20}
                      <span className="text-xs font-medium text-gray-500 ml-0.5">/min</span>
                    </span>
                  </div>

                  <button className="w-full sm:w-56 md:w-44 bg-gradient-to-r from-[#F6971E] to-[#FFA733] text-white font-bold py-2.5 sm:py-3 rounded-xl shadow-[0_4px_15px_rgba(246,151,30,0.25)] flex items-center justify-center gap-1.5 hover:shadow-[0_8px_20px_rgba(246,151,30,0.35)] hover:-translate-y-0.5 transition-all text-xs sm:text-sm cursor-pointer">
                    <BsLightningChargeFill /> Connect Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Stats & Trust Bar: 3, 3, 4, 2 Grid */}
          <div className="pt-6">
            <div className="grid grid-cols-12 gap-2.5 sm:gap-3 lg:gap-4 items-stretch w-full">
              {/* 1. Experience (3 cols) */}
              <div className="col-span-6 md:col-span-3 flex flex-col items-center justify-center text-center py-2 bg-transparent">
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#4A2B23] mb-0.5 leading-tight">
                  {currentAstro.experience || 0} Yrs
                </span>
                <span className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider">
                  Experience
                </span>
              </div>

              {/* 2. Rating (3 cols) */}
              <div className="col-span-6 md:col-span-3 flex flex-col items-center justify-center text-center py-2 border-l border-gray-100 bg-transparent">
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#4A2B23] mb-0.5 flex items-center justify-center gap-1.5 leading-tight">
                  <BsStarFill className="text-[#F6971E] text-sm sm:text-base md:text-lg" /> {displayRating}
                </span>
                <span className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider">
                  Rating {totalReviewsCount > 0 ? `(${totalReviewsCount})` : ''}
                </span>
              </div>

              {/* 3. 100% Private & Confidential (4 cols) */}
              <div className="col-span-12 sm:col-span-7 md:col-span-4 bg-[#FFFDF0] border border-[#F6971E]/30 rounded-2xl p-2.5 sm:p-3 px-3 sm:px-3.5 flex items-center gap-2.5 sm:gap-3 shadow-2xs hover:border-[#F6971E]/50 transition-colors">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#F6971E] to-[#FFA733] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <BsShieldCheck className="text-base sm:text-lg" />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <h4 className="text-[11px] sm:text-xs font-bold text-[#4A2B23] leading-tight">
                    100% Private &amp; Confidential
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-gray-500 leading-tight mt-0.5 line-clamp-2">
                    Get accurate answers to your life&apos;s biggest questions.
                  </p>
                </div>
              </div>

              {/* 4. Watch Intro (2 cols) */}
              <div className="col-span-12 sm:col-span-5 md:col-span-2 flex items-center">
                {currentAstro.videoIntro ? (
                  <button
                    onClick={() => setActiveVideo(currentAstro.videoIntro)}
                    className="w-full h-full min-h-[48px] sm:min-h-[54px] flex items-center justify-center sm:justify-start gap-2 px-2.5 lg:px-3 py-2 bg-[#FFFDF0] hover:bg-[#FFF0D4] border border-[#F6971E]/30 hover:border-[#F6971E] rounded-2xl transition-all cursor-pointer group shrink-0 shadow-2xs"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#F6971E]/15 group-hover:bg-[#F6971E] text-[#F6971E] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                      <BsCameraVideo className="text-xs sm:text-sm lg:text-base" />
                    </div>
                    <div className="text-left min-w-0">
                      <span className="text-[11px] sm:text-xs font-bold text-[#4A2B23] block group-hover:text-[#F6971E] transition-colors whitespace-nowrap">
                        Watch Intro
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-gray-400 font-medium block whitespace-nowrap">
                        Video Profile
                      </span>
                    </div>
                  </button>
                ) : (
                  <div className="w-full h-full min-h-[48px] sm:min-h-[54px] flex flex-col items-center justify-center py-1">
                    <span className="text-base sm:text-xl font-bold text-[#4A2B23] leading-tight">1k+</span>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Consults</span>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Main Content Layout */}
        <div className="w-full space-y-8">

          {/* About Section */}
          <section className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 shadow-sm border border-[#F6971E]/15">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold font-['Inria_Serif'] text-[#4A2B23] mb-3 sm:mb-4 flex items-center gap-2 sm:gap-2.5">
              <span className="w-1 sm:w-1.5 h-4 sm:h-5 md:h-6 bg-[#F6971E] rounded-full inline-block shrink-0"></span>
              About {currentAstro.fullName || "Astrologer"}
            </h2>

            <div className="prose max-w-none text-gray-600 text-xs sm:text-sm md:text-[15px] leading-relaxed space-y-3 font-normal">
              {(currentAstro.profileBio || currentAstro.bio || currentAstro.about) ? (
                <div>
                  <p className={`whitespace-pre-line leading-relaxed ${!isBioExpanded ? 'line-clamp-4' : ''}`}>
                    {currentAstro.profileBio || currentAstro.bio || currentAstro.about}
                  </p>
                  <button
                    onClick={() => setIsBioExpanded(!isBioExpanded)}
                    className="mt-2.5 text-[#F6971E] hover:text-[#4A2B23] font-bold text-xs tracking-wider uppercase inline-flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {isBioExpanded ? 'Read Less' : 'Read More'}
                  </button>
                </div>
              ) : (<></>)}
            </div>
          </section>

          {/* Videos Section */}
          {currentAstro.videos && currentAstro.videos.length > 0 && (
            <section className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 shadow-sm border border-[#F6971E]/15">
              <div className="flex items-center justify-between mb-3 sm:mb-5 border-b border-gray-100 pb-3">
                <div>
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold font-['Inria_Serif'] text-[#4A2B23] flex items-center gap-2 sm:gap-2.5">
                    <span className="w-1 sm:w-1.5 h-4 sm:h-5 md:h-6 bg-[#F6971E] rounded-full inline-block shrink-0"></span>
                    Videos
                  </h2>
                </div>
              </div>

              <div className="custom-x-scroll flex gap-3.5 sm:gap-4 overflow-x-auto pb-4 pt-1 scroll-smooth">
                {currentAstro.videos.map((videoUrl: string, idx: number) => (
                  <div
                    key={idx}
                    className="w-[180px] sm:w-[210px] md:w-[230px] lg:w-[calc((100%-64px)/5)] lg:min-w-[calc((100%-64px)/5)] flex-shrink-0 group bg-[#FFFDF9] border border-[#F6971E]/20 hover:border-[#F6971E] rounded-2xl p-2 sm:p-2.5 transition-all cursor-pointer shadow-2xs hover:shadow-md"
                    onClick={() => setActiveVideo(videoUrl)}
                  >
                    {/* Video Thumbnail Container with Play Button */}
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-gray-100 shadow-inner">
                      <video
                        src={videoUrl}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        preload="metadata"
                        muted
                        playsInline
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300" />

                      {/* Center White Circle Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <BsPlayFill className="text-lg text-black ml-0.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Photo Gallery Section (Includes all certificates, credentials, and gallery photos) */}
          {allGalleryPhotos && allGalleryPhotos.length > 0 && (
            <section className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 shadow-sm border border-[#F6971E]/15">
              <div className="flex items-center justify-between mb-3 sm:mb-5 border-b border-gray-100 pb-3">
                <div>
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold font-['Inria_Serif'] text-[#4A2B23] flex items-center gap-2 sm:gap-2.5">
                    <span className="w-1 sm:w-1.5 h-4 sm:h-5 md:h-6 bg-[#F6971E] rounded-full inline-block shrink-0"></span>
                    Photo Gallery
                  </h2>
                </div>
              </div>

              <div className="custom-x-scroll flex gap-3.5 sm:gap-4 overflow-x-auto pb-4 pt-1 scroll-smooth">
                {allGalleryPhotos.map((photoUrl: any, idx: any) => (
                  <div key={idx}
                    onClick={() => setPreviewImage(photoUrl)}
                    className="w-[160px] sm:w-[190px] md:w-[210px] lg:w-[calc((100%-64px)/5)] lg:min-w-[calc((100%-64px)/5)] flex-shrink-0 group relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-200
              hover:border-[#F6971E] transition-all cursor-pointer shadow-2xs hover:shadow-md"
                  >
                    <img src={photoUrl} alt={`Photo ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div
                      className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-lg">
                      <BsImages />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Reviews Section */}
          <section id="reviews-section" className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 sm:mb-6 gap-3 sm:gap-4 border-b border-gray-100 pb-3 sm:pb-4">
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#4A2B23] font-['Inria_Serif'] flex items-center gap-2 sm:gap-2.5">
                <span className="w-1 sm:w-1.5 h-4 sm:h-5 md:h-6 bg-[#F6971E] rounded-full inline-block shrink-0"></span> Client Reviews
              </h2>
              <div className="flex items-center gap-2 sm:gap-2.5 bg-[#FFFDF9] border border-[#F6971E]/20 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full">
                <span className="font-bold text-base sm:text-lg text-[#4A2B23]">{displayRating}</span>
                <div className="flex text-[#F6971E] text-xs sm:text-sm items-center gap-0.5">
                  {Array.from({ length: 5 }, (_, starIdx) => {
                    const starVal = starIdx + 1;
                    const numRating = parseFloat(displayRating);
                    if (numRating >= starVal) {
                      return <BsStarFill key={starIdx} />;
                    } else if (numRating >= starVal - 0.5) {
                      return <BsStarHalf key={starIdx} />;
                    } else {
                      return <BsStar key={starIdx} className="text-gray-300" />;
                    }
                  })}
                </div>
                <span className="text-[10px] sm:text-xs text-gray-500 font-bold tracking-wide uppercase">
                  {totalReviewsCount} {totalReviewsCount === 1 ? 'review' : 'reviews'}
                </span>
              </div>
            </div>

            {/* Review Cards */}
            {reviewsList && reviewsList.length > 0 ? (
              <>
                <div className={`custom-x-scroll flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-3 sm:gap-4 pb-4 pt-1 md:pb-0 md:pt-0 scroll-smooth transition-opacity duration-200 ${isReviewsLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                  {reviewsList.map((review: any, i: number) => (
                    <div
                      key={review.id || i}
                      className="w-[280px] sm:w-[320px] md:w-full flex-shrink-0 bg-gray-50/70 p-3.5 sm:p-4 md:p-5 rounded-2xl border border-gray-100 hover:border-[#F6971E]/30 transition-all flex flex-col justify-between shadow-2xs hover:shadow-sm"
                    >
                      <div>
                        <div className="flex items-start gap-2.5 sm:gap-3 mb-2 sm:mb-3">
                          {review.userProfileImg ? (
                            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 border border-gray-200">
                              <Image
                                src={review.userProfileImg}
                                alt={review.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#F6971E] to-[#FFA733] text-white font-bold text-xs sm:text-sm rounded-full flex items-center justify-center shadow-xs shrink-0 mt-0.5">
                              {review.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-[#4A2B23] text-xs sm:text-sm md:text-[15px] truncate">{review.name}</span>
                              <div className="flex text-[#F6971E] text-[10px] sm:text-xs shrink-0 items-center gap-0.5">
                                {Array.from({ length: 5 }, (_, starIdx) => {
                                  const starVal = starIdx + 1;
                                  const ratingVal = review.stars;
                                  if (ratingVal >= starVal) {
                                    return <BsStarFill key={starIdx} />;
                                  } else if (ratingVal >= starVal - 0.5) {
                                    return <BsStarHalf key={starIdx} />;
                                  } else {
                                    return <BsStar key={starIdx} className="text-gray-300" />;
                                  }
                                })}
                              </div>
                            </div>
                            {review.date && (
                              <span className="text-[10px] sm:text-[11px] text-gray-400 font-medium block mt-0.5 truncate">
                                {review.date}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-[#4A2B23]/80 font-medium text-xs sm:text-sm leading-relaxed">
                          &quot;{review.text}&quot;
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalReviewPages > 1 && (
                  <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs sm:text-sm text-gray-500 font-helvetica order-2 sm:order-1">
                      Showing <span className="font-bold text-[#4A2B23]">{(reviewPage - 1) * REVIEWS_PER_PAGE + 1}</span> - <span className="font-bold text-[#4A2B23]">{Math.min(reviewPage * REVIEWS_PER_PAGE, totalReviewsCount)}</span> of <span className="font-bold text-[#4A2B23]">{totalReviewsCount}</span> reviews
                    </p>

                    <div className="flex items-center gap-1.5 sm:gap-2 order-1 sm:order-2 flex-wrap justify-center">
                      {/* Prev Button */}
                      <button
                        onClick={() => handleReviewPageChange(reviewPage - 1)}
                        disabled={reviewPage === 1 || isReviewsLoading}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-[#4A2B23] bg-white hover:border-[#F6971E] hover:text-[#F6971E] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
                        aria-label="Previous Reviews Page"
                      >
                        <BsChevronLeft className="text-xs" />
                        <span>Prev</span>
                      </button>

                      {/* Page Numbers */}
                      <div className="flex items-center gap-1">
                        {getReviewPageNumbers(reviewPage, totalReviewPages).map((p, idx) => {
                          if (typeof p === 'string') {
                            return (
                              <span key={`dots-${idx}`} className="px-1 text-xs text-gray-400 font-bold select-none">
                                ...
                              </span>
                            );
                          }
                          const isCurrent = p === reviewPage;
                          return (
                            <button
                              key={p}
                              onClick={() => handleReviewPageChange(p)}
                              disabled={isReviewsLoading}
                              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                                isCurrent
                                  ? 'bg-[#F6971E] text-white shadow-[0_2px_8px_rgba(246,151,30,0.35)]'
                                  : 'bg-white border border-gray-200 text-[#4A2B23] hover:border-[#F6971E] hover:text-[#F6971E]'
                              }`}
                            >
                              {p}
                            </button>
                          );
                        })}
                      </div>

                      {/* Next Button */}
                      <button
                        onClick={() => handleReviewPageChange(reviewPage + 1)}
                        disabled={reviewPage >= totalReviewPages || isReviewsLoading}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-[#4A2B23] bg-white hover:border-[#F6971E] hover:text-[#F6971E] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
                        aria-label="Next Reviews Page"
                      >
                        <span>Next</span>
                        <BsChevronRight className="text-xs" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-10 bg-[#FFFDF9] rounded-2xl border border-dashed border-[#F6971E]/30 p-6">
                <p className="text-[#4A2B23] font-medium text-sm">No client reviews yet for this astrologer.</p>
                <p className="text-gray-400 text-xs mt-1">Be the first to consult and share your feedback!</p>
              </div>
            )}
          </section>

        </div>

      </div>

      {/* Lightbox Modal for Image Preview */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-3xl p-3 sm:p-4 shadow-2xl overflow-hidden flex flex-col items-center"
          >
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
              aria-label="Close Preview"
            >
              <BsX className="text-3xl" />
            </button>
            <img
              src={previewImage}
              alt="Preview"
              className="max-h-[80vh] w-auto max-w-full object-contain rounded-2xl"
            />
          </div>
        </div>
      )}

      {/* Video Modal Popup (Celebrity Spotlight Style) */}
      {activeVideo && (
        <div
          onClick={() => setActiveVideo(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-3 right-3 z-20 w-9 h-9 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all border border-white/20 cursor-pointer"
              aria-label="Close Video"
            >
              <BsX className="text-2xl" />
            </button>

            {/* Video Player */}
            <video
              src={activeVideo}
              autoPlay
              controls
              className="w-full aspect-[9/16] max-h-[80vh] md:aspect-video object-contain relative z-10 mx-auto"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}
