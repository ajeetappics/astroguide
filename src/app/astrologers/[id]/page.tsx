'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsStarFill, BsStarHalf, BsStar, BsPatchCheckFill, BsLightningChargeFill, BsCheckCircleFill, BsChevronRight, BsShieldCheck, BsAwardFill, BsImages, BsX, BsCameraVideoFill, BsPlayCircleFill, BsPlayFill, BsCurrencyRupee, BsCameraVideo } from 'react-icons/bs';
import { astrologerData } from '@/app/components/AstrologerSection/AstrologerSection';
import { notFound, useParams } from 'next/navigation';

export default function AstrologerDetails() {
  // const params = useParams();
  // const id = parseInt(params.id as string);
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);

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
  const astro1: any = {
    "chat": {
      "ratePerMinute": 80,
      "offerPricePerMinute": 20
    },
    "call": {
      "ratePerMinute": 40,
      "offerPricePerMinute": 20
    },
    "videoCall": {
      "ratePerMinute": 50,
      "offerPricePerMinute": 10,
      "ratePerSession": 200,
      "offerPricePerSession": 100
    },
    "_id": "6a61ed27dd079f131f4cadfc",
    "profileImg": "https://storage.googleapis.com/astro-vani-storage/admin/1788845278260-images.jpg",
    "totalEarning": 38497,
    "mobileNumber": "9860986098",
    "countryCode": "+91",
    "aadharImg": [],
    "isRegistered": true,
    "otp": null,
    "isOtpVerified": true,
    "isProfileCompleted": false,
    "isDeleted": false,
    "photos": ["https://storage.googleapis.com/astro-vani-storage/admin/1788845094307-shared image (6).jfif", "https://storage.googleapis.com/astro-vani-storage/admin/1788845094624-image (8).png", "https://storage.googleapis.com/astro-vani-storage/admin/1788845094803-book.png", "https://storage.googleapis.com/astro-vani-storage/admin/1788845094970-Gemini_Generated_Image_y12wery12wery12w.jpg", "https://storage.googleapis.com/astro-vani-storage/admin/1788845095128-Balaji-Astro-Guide-07-23-2026_06_00_PM.png"
    ],
    "videos": ["https://storage.googleapis.com/astro-vani-storage/admin/1788845151185-184752-873923078_medium.mp4", "https://storage.googleapis.com/astro-vani-storage/admin/1788845151389-106739-674268552_medium.mp4"
    ],
    "photoGallery": ["https://storage.googleapis.com/astro-vani-storage/admin/1788845166125-shared image (6).jfif", "https://storage.googleapis.com/astro-vani-storage/admin/1788845166311-image (8).png", "https://storage.googleapis.com/astro-vani-storage/admin/1788845166461-book.png", "https://storage.googleapis.com/astro-vani-storage/admin/1788845166607-Gemini_Generated_Image_y12wery12wery12w.jpg", "https://storage.googleapis.com/astro-vani-storage/admin/1788845166759-Balaji-Astro-Guide-07-23-2026_06_00_PM.png"
    ],
    "certificateGallery": ["https://storage.googleapis.com/astro-vani-storage/admin/1788845195758-shared image (6).jfif", "https://storage.googleapis.com/astro-vani-storage/admin/1788845195905-image (8).png", "https://storage.googleapis.com/astro-vani-storage/admin/1788845196044-book.png", "https://storage.googleapis.com/astro-vani-storage/admin/1788845196190-Gemini_Generated_Image_y12wery12wery12w.jpg", "https://storage.googleapis.com/astro-vani-storage/admin/1788845196329-Balaji-Astro-Guide-07-23-2026_06_00_PM.png", "https://storage.googleapis.com/astro-vani-storage/admin/1788845196473-Space Rocket.png", "https://storage.googleapis.com/astro-vani-storage/admin/1788845196614-1776500559919-scaled_screenshot_20260418-135229.jpg", "https://storage.googleapis.com/astro-vani-storage/admin/1788845196767-gift.png"
    ],
    "certificates": [
      "https://storage.googleapis.com/astro-vani-storage/astrologers/1784802702100-scaled_99f58121-d132-403e-ab6c-c8939d99d9b6-1_all_151.png"
    ],
    "languages": [
      {
        "_id": "68f376df41db2c9bc08ba5ca",
        "languageName": "Gujarati",
        "createdAt": "2025-10-18T11:15:43.498Z",
        "updatedAt": "2025-10-18T11:15:43.498Z"
      },
      {
        "_id": "68eb67a041fa1548bfcc2215",
        "languageName": "Hindi",
        "createdAt": "2025-10-12T08:32:32.273Z",
        "updatedAt": "2025-10-12T08:32:32.273Z"
      },
      {
        "_id": "68eb5a18f39e87050d93a4fe",
        "languageName": "English",
        "createdAt": "2025-10-12T07:34:48.562Z",
        "updatedAt": "2025-10-12T07:34:48.562Z"
      }
    ],
    "expertise": [
      {
        "_id": "690dd5a901f53eb3236b5692",
        "expertiseName": "Business",
        "expertiseIcon": "https://storage.googleapis.com/astro-vani-storage/admin/1762697441535-243956.png",
        "createdAt": "2025-11-07T11:19:05.115Z",
        "updatedAt": "2025-11-09T14:10:43.067Z"
      },
      {
        "_id": "68eb716c66c9e3ebbf1545fc",
        "expertiseName": "Finance",
        "createdAt": "2025-10-12T09:14:20.150Z",
        "updatedAt": "2025-10-12T15:59:21.352Z",
        "expertiseIcon": "https://atsro-vani-prod-v1.s3.ap-south-1.amazonaws.com/admin/1760284758809-Finance.png"
      },
      {
        "_id": "68eb715f66c9e3ebbf1545ec",
        "expertiseName": "Legal",
        "createdAt": "2025-10-12T09:14:07.036Z",
        "updatedAt": "2025-10-12T15:59:50.640Z",
        "expertiseIcon": "https://atsro-vani-prod-v1.s3.ap-south-1.amazonaws.com/admin/1760284786405-Legal.png"
      },
      {
        "_id": "68eb6d794b1b2d95f35b475f",
        "expertiseName": "Kundli",
        "createdAt": "2025-10-12T08:57:29.838Z",
        "updatedAt": "2025-10-12T08:57:29.838Z"
      },
      {
        "_id": "68eb6d254b1b2d95f35b46fa",
        "expertiseName": "Palm Read",
        "createdAt": "2025-10-12T08:56:05.599Z",
        "updatedAt": "2025-10-28T09:23:15.121Z",
        "expertiseIcon": "h"
      },
      {
        "_id": "68dbce5fa7ce524ef050d46d",
        "expertiseName": "Health",
        "expertiseIcon": "https://storage.googleapis.com/astro-vani-storage/admin/1763041981963-health.png",
        "createdAt": "2025-09-30T12:34:39.106Z",
        "updatedAt": "2025-11-13T13:53:03.880Z"
      }
    ],
    "commissionPercentage": 50,
    "isFeatured": false,
    "extraDiscount": "0",
    "isCallEnabled": true,
    "isChatEnabled": true,
    "isAppointmentEnabled": false,
    "isVideoCallEnabled": false,
    "isBusy": false,
    "isManuallyBusy": false,
    "isFeesRateGiven": false,
    "isAvailabilityGiven": true,
    "isDeletedByAdmin": false,
    "isBankDetailGiven": false,
    "isProfileVerified": true,
    "verifiedByAdmin": false,
    "isApprovedUpdateRequest": true,
    "profileVisitCount": 119,
    "createdAt": "2026-07-23T10:29:59.996Z",
    "updatedAt": "2026-09-08T05:28:02.822Z",
    "__v": 26,
    "city": "Jaipur",
    "email": "poojaastro@yopmail.com",
    "experience": "12",
    "fullName": "Astro harshita new",
    "gender": "Female",
    "pincode": "302021",
    "qualification": "Postgraduate",
    "state": "Rajasthan",
    "address": "Jaipur, Rajasthan, 302021",
    "profileBio": "Surinder1 is a highly experienced astrologer specializing in Vedic and Vastu. With a deep understanding of ancient wisdom and modern applications, Surinder1 provides accurate predictions and effective remedies.Dedicated to helping individuals navigate life's challenges, Surinder1 has guided thousands towards a path of clarity, peace, and success.Whether you are facing issues in love, career, or personal growth, their profound knowledge and empathetic approach offer a guiding light.\nSurinder1 is a highly experienced astrologer specializing in Vedic and Vastu.With a deep understanding of ancient wisdom and modern applications, Surinder1 provides accurate predictions and effectiveremedies.\n\nDedicated to helping individuals navigate life's challenges, Surinder1 has guided thousands towards a pathof clarity, peace, and success.Whether you are facing issues in love, career, or personal growth, their profoundknowledge and empathetic approach offer a guiding light.\nSurinder1 is a highly experienced astrologer specializing inVedic and Vastu.With a deep understanding of ancient wisdom and modern applications, Surinder1 provides accuratepredictions and effective remedies.\n\nDedicated to helping individuals navigate life's challenges, Surinder1 has guidedthousands towards a path of clarity, peace, and success.Whether you are facing issues in love, career, or personalgrowth, their profound knowledge and empathetic approach offer a guiding light.",
    "videoIntro": "https://storage.googleapis.com/astro-vani-storage/admin/1788845109879-184752-873923078_medium.mp4",
    "isAvailableforPooja": false,
    "isBlacklisted": false,
    "tag": {
      "_id": "6a38e5c7fb8bcfbf0b86fc25",
      "tagName": "most booked in balaji astro guide"
    },
    "totalOrders": 0,
    "averageRating": 0,
    "ratingCounts": {
      "rating1": 0,
      "rating2": 0,
      "rating3": 0,
      "rating4": 0,
      "rating5": 0
    },
    "id": "6a61ed27dd079f131f4cadfc",
    "createdBy": {
      "_id": "6a61ed27dd079f131f4cadfc",
      "fullName": "Astro harshita new",
      "email": "poojaastro@yopmail.com",
      "mobileNumber": "9860986098"
    }
  };

  // Since we duplicated data in the list view (adding 10, 20 to IDs), 
  // we map any ID back to the base 4 astrologers so the page doesn't break
  // const baseId = ((id - 1) % 4) + 1;
  // const astro = astrologerData.find(a => a.id === baseId);

  // if (!astro) {
  //   notFound();
  // }

  const reviewsList = [
    { name: "Amrita S.", text: "Your remedies are magic sir, it has really helped me a lot. Thank you so much! 🙏💖", givenBy: "Mohan Sharma", stars: 5 },
    { name: "Rahul V.", text: "Very accurate predictions. I was amazed by how detailed the reading was. Highly recommended.", givenBy: "Kavita Verma", stars: 5 },
    { name: "Pooja M.", text: "Best astrology consultation I have ever had! The career guidance and gemstones suggested worked wonders for me.", givenBy: "Suresh Gupta", stars: 4.5 },
    { name: "Vikram S.", text: "Bahut hi accurate prediction kiya. Business issues ko lekar jo remedy batayi usse positive results mile.", givenBy: "Anil Joshi", stars: 5 },
    { name: "Neha K.", text: "Thank you for the wonderful relationship advice. Everything you predicted came true within a month! 🙏", givenBy: "Deepak Mehta", stars: 4 },
    { name: "Rajesh P.", text: "Very polite and patient listener. Explained all my Kundli doshas and simple remedies with great clarity.", givenBy: "Sunita Yadav", stars: 5 },
    { name: "Sneha R.", text: "I was very confused about my higher studies. Your guidance gave me clarity and confidence. Truly grateful! ✨", givenBy: "Manoj Tiwari", stars: 4.5 },
    { name: "Amitabh D.", text: "Extremely knowledgeable and genuine astrologer. The remedies suggested are very simple and effective.", givenBy: "Rakesh Agarwal", stars: 5 },
    { name: "Priya C.", text: "Sahi rasta dikhane ke liye dhanyawad. Marriage matching aur timing predictions bilkul accurate thi.", givenBy: "Alok Saxena", stars: 4 },
    { name: "Manish K.", text: "Amazing experience! The health insights and puja suggestions brought so much peace to our family.", givenBy: "Vikas Dubey", stars: 5 }
  ];

  const calculatedAverageRating = (
    reviewsList.reduce((acc, curr) => acc + (curr.stars || 5), 0) / reviewsList.length
  ).toFixed(1);

  const displayRating = astro1.averageRating > 0 ? Number(astro1.averageRating).toFixed(1) : calculatedAverageRating;

  return (
    <div className="min-h-screen bg-[#FFFDF9] pb-20 font-helvetica">

      {/* 1. Hero Banner (Light Theme) */}
      <div className="relative w-full bg-[#fdf7e1] overflow-hidden pt-[70px] lg:pt-[80px] pb-10 md:pb-12">
        {/* Glow Effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] max-w-[400px] max-h-[400px] bg-[#F6971E]/30 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] max-w-[300px] max-h-[300px] bg-[#F6971E]/20 rounded-full blur-[60px] pointer-events-none"></div>

        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent mix-blend-overlay"></div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10 py-4 md:py-5">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm font-bold tracking-wider uppercase text-[#4A2B23]/70">
            <Link href="/" className="hover:text-[#F6971E] transition-colors">Home</Link>
            <BsChevronRight className="text-[9px] shrink-0" />
            <Link href="/astrologers" className="hover:text-[#F6971E] transition-colors">Astrologers</Link>
            <BsChevronRight className="text-[9px] shrink-0" />
            <span className="text-[#F6971E] truncate max-w-[200px] sm:max-w-none">{astro1.fullName}</span>
          </div>
        </div>
      </div>

      {/* Main Container (Pulled up to overlap banner with equal spacing) */}
      <div className="container mx-auto max-w-7xl px-4 relative -mt-10 md:-mt-12 z-20">

        {/* Profile Header Card with embedded stats */}
        <div className="bg-white rounded-[32px] p-5 sm:p-7 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-[#F6971E]/10 mb-10 flex flex-col">

          <div className="flex flex-col md:flex-row gap-5 md:gap-8 lg:gap-10 items-center md:items-start text-center md:text-left border-b border-gray-100 pb-6 md:pb-8">
            {/* Avatar (Rounded Profile) */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 flex-shrink-0 mx-auto md:mx-0">
              <div className="w-full h-full rounded-full border-[3px] sm:border-[4px] border-[#F6971E]/30 overflow-hidden bg-white shadow-md relative">
                <Image
                  src={astro1.profileImg}
                  alt={astro1.fullName}
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
                  {astro1.tag?.tagName && (
                    <div className="mb-2 flex justify-center md:justify-start">
                      <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-[#F6971E] bg-[#FFF8EB] border border-[#F6971E]/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs text-center max-w-full truncate">
                        <span className="shrink-0">🔥</span>
                        <span className="truncate">{astro1.tag.tagName}</span>
                      </span>
                    </div>
                  )}

                  {/* Astrologer Name & Verified Tick */}
                  <div className="flex items-center justify-center md:justify-start gap-1.5 sm:gap-2 mb-2 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#4A2B23] font-['Inria_Serif'] leading-tight">
                      {astro1.fullName}
                    </h1>
                    {astro1.isOtpVerified && (
                      <BsPatchCheckFill className="text-[#00C853] text-xl sm:text-2xl shrink-0" title="OTP Verified" />
                    )}
                  </div>

                  {/* Expertise */}
                  {astro1?.expertise && (
                    <p className="text-xs sm:text-sm text-gray-600 text-left leading-relaxed mt-1">
                      <span className="text-gray-400 uppercase tracking-wider text-[10px] sm:text-xs font-bold mr-1.5">Expertise:</span>
                      <span className="font-semibold text-[#4A2B23]">{astro1.expertise?.map((exp: any) => exp.expertiseName).join(' • ')}</span>
                    </p>
                  )}

                  {/* Languages */}
                  {astro1?.languages && (
                    <p className="text-xs sm:text-sm text-gray-600 text-left leading-relaxed mt-1">
                      <span className="text-gray-400 uppercase tracking-wider text-[10px] sm:text-xs font-bold mr-1.5">Languages:</span>
                      <span className="font-semibold text-[#4A2B23]">{astro1.languages?.map((lang: any) => lang.languageName).join(' • ')}</span>
                    </p>
                  )}
                </div>

                {/* Price and Connect Button (Right Side) */}
                <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-3 mt-2 md:mt-0 shrink-0">
                  <div className="flex items-baseline justify-center md:justify-end gap-2">
                    {astro1.chat?.ratePerMinute && (
                      <span className="text-sm md:text-base text-gray-400 line-through font-medium flex items-center">
                        <BsCurrencyRupee className="text-xs md:text-sm -mr-0.5" />
                        {astro1.chat.ratePerMinute}/min
                      </span>
                    )}
                    <span className="text-2xl md:text-3xl font-bold text-[#4A2B23] flex items-center">
                      <BsCurrencyRupee className="text-xl md:text-2xl -mr-0.5" />
                      {astro1.chat?.offerPricePerMinute || 20}
                      <span className="text-xs md:text-sm font-medium text-gray-500 ml-0.5">/min</span>
                    </span>
                  </div>

                  <button className="w-full sm:w-60 md:w-48 bg-gradient-to-r from-[#F6971E] to-[#FFA733] text-white font-bold py-3 md:py-3.5 rounded-2xl shadow-[0_8px_20px_rgba(246,151,30,0.25)] flex items-center justify-center gap-2 hover:shadow-[0_12px_25px_rgba(246,151,30,0.4)] hover:-translate-y-0.5 transition-all text-sm md:text-base cursor-pointer">
                    <BsLightningChargeFill /> Connect Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Stats & Trust Bar */}
          <div className="pt-6">
            {/* Mobile View: Top row has 3 items (Experience, Rating, Watch Intro), Bottom row has full-width "100% Private & Confidential" */}
            <div className="flex flex-col md:hidden">
              <div className="grid grid-cols-3 gap-2 items-center text-center">
                {/* 1. Experience */}
                <div className="flex flex-col items-center justify-center py-1">
                  <span className="text-lg sm:text-xl font-bold text-[#4A2B23]">{astro1.experience} Yrs</span>
                  <span className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider">Experience</span>
                </div>

                {/* 2. Rating */}
                <div className="flex flex-col items-center justify-center py-1 border-x border-gray-100">
                  <span className="text-lg sm:text-xl font-bold text-[#4A2B23] flex items-center justify-center gap-1">
                    <BsStarFill className="text-[#F6971E] text-sm sm:text-base" /> {displayRating}
                  </span>
                  <span className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider">Rating</span>
                </div>

                {/* 3. Watch Intro */}
                {astro1.videoIntro ? (
                  <button
                    onClick={() => setActiveVideo(astro1.videoIntro)}
                    className="flex flex-col items-center justify-center py-2 px-1 bg-[#FFFDF0] hover:bg-[#FFF2D6] border border-[#F6971E]/40 rounded-2xl transition-all cursor-pointer group shadow-2xs"
                  >
                    <BsCameraVideo className="text-[#F6971E] text-lg mb-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-bold text-[#4A2B23] leading-tight">Watch Intro</span>
                  </button>
                ) : (
                  <div className="flex flex-col items-center justify-center py-1">
                    <span className="text-lg font-bold text-[#4A2B23]">1k+</span>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Consults</span>
                  </div>
                )}
              </div>

              {/* Full Width 100% Private & Confidential below all three on mobile */}
              <div className="w-full bg-[#FFFDF0] border border-[#F6971E]/30 rounded-2xl p-3 flex items-center gap-3 shadow-2xs mt-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F6971E] to-[#FFA733] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <BsShieldCheck className="text-lg" />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <h4 className="text-xs sm:text-sm font-bold text-[#4A2B23]">
                    100% Private &amp; Confidential
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-gray-500 leading-snug">
                    Get accurate answers to your life&apos;s biggest questions.
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop View: 50% Experience & Rating | 50% 100% Private & Watch Intro */}
            <div className="hidden md:grid md:grid-cols-2 gap-6 lg:gap-8 items-center">
              {/* Left Half (50%): Experience & Rating */}
              <div className="grid grid-cols-2 gap-4 items-center md:border-r border-gray-100 pr-4 lg:pr-8">
                {/* Experience */}
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="text-2xl lg:text-3xl font-bold text-[#4A2B23] mb-0.5">{astro1.experience} Yrs</span>
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wide">Experience</span>
                </div>

                {/* Rating */}
                <div className="flex flex-col items-center justify-center text-center border-l border-gray-100">
                  <span className="text-2xl lg:text-3xl font-bold text-[#4A2B23] mb-0.5 flex items-center justify-center gap-1.5">
                    <BsStarFill className="text-[#F6971E] text-xl lg:text-2xl" /> {displayRating}
                  </span>
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wide">Rating</span>
                </div>
              </div>

              {/* Right Half (50%): 100% Private & Confidential + Watch Intro */}
              <div className="flex items-center gap-3 w-full">
                {/* 100% Private & Confidential Card */}
                <div className="flex-1 bg-[#FFFDF0] border border-[#F6971E]/30 rounded-2xl p-3 px-4 flex items-center gap-3 shadow-2xs hover:border-[#F6971E]/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F6971E] to-[#FFA733] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <BsShieldCheck className="text-xl" />
                  </div>
                  <div className="min-w-0 text-left">
                    <h4 className="text-sm font-bold text-[#4A2B23]">
                      100% Private &amp; Confidential
                    </h4>
                    <p className="text-xs text-gray-500 leading-snug truncate lg:whitespace-normal">
                      Get accurate answers to your life&apos;s biggest questions.
                    </p>
                  </div>
                </div>

                {/* Watch Intro Button */}
                {astro1.videoIntro && (
                  <button
                    onClick={() => setActiveVideo(astro1.videoIntro)}
                    className="flex items-center gap-2 px-3.5 lg:px-4 py-3 bg-[#FFFDF0] hover:bg-[#FFF0D4] border border-[#F6971E]/30 hover:border-[#F6971E] rounded-2xl transition-all cursor-pointer group shrink-0 shadow-2xs"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#F6971E]/15 group-hover:bg-[#F6971E] text-[#F6971E] group-hover:text-white flex items-center justify-center transition-colors">
                      <BsCameraVideo className="text-lg" />
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-bold text-[#4A2B23] block group-hover:text-[#F6971E] transition-colors whitespace-nowrap">Watch Intro</span>
                      <span className="text-[10px] text-gray-400 font-medium block whitespace-nowrap">Video Profile</span>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Main Content Layout */}
        <div className="w-full space-y-10">

          {/* About Section */}
          <section className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm border border-[#F6971E]/15">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-['Inria_Serif'] text-[#4A2B23] mb-4 sm:mb-6 flex items-center gap-2 sm:gap-2.5">
              <span className="w-1 sm:w-1.5 h-5 sm:h-6 md:h-7 bg-[#F6971E] rounded-full inline-block shrink-0"></span>
              About {astro1.fullName}
            </h2>

            <div className="prose max-w-none text-gray-600 text-base md:text-lg leading-relaxed space-y-4 font-normal">
              {astro1.profileBio ? (
                <div>
                  <p className={`whitespace-pre-line leading-relaxed ${!isBioExpanded ? 'line-clamp-4' : ''}`}>
                    {astro1.profileBio}
                  </p>
                  <button
                    onClick={() => setIsBioExpanded(!isBioExpanded)}
                    className="mt-3 text-[#F6971E] hover:text-[#4A2B23] font-bold text-sm tracking-wider uppercase inline-flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {isBioExpanded ? 'Read Less' : 'Read More'}
                  </button>
                </div>
              ) : (<></>)}
            </div>
          </section>

          {/* Videos Section */}
          {astro1.videos && astro1.videos.length > 0 && (
            <section className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm border border-[#F6971E]/15">
              <div className="flex items-center justify-between mb-4 sm:mb-6 border-b border-gray-100 pb-3 sm:pb-4">
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-['Inria_Serif'] text-[#4A2B23] flex items-center gap-2 sm:gap-2.5">
                    <span className="w-1 sm:w-1.5 h-5 sm:h-6 md:h-7 bg-[#F6971E] rounded-full inline-block shrink-0"></span>
                    Videos
                  </h2>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#F6971E] bg-[#FFF8EB] border border-[#F6971E]/20 px-3.5 py-1.5 rounded-full font-bold">
                  <BsCameraVideoFill className="text-sm" /> Video Portfolio
                </div>
              </div>

              <div className="custom-x-scroll flex gap-3.5 sm:gap-4 overflow-x-auto pb-4 pt-1 scroll-smooth">
                {astro1.videos.map((videoUrl: string, idx: number) => (
                  <div
                    key={idx}
                    className="w-[180px] sm:w-[210px] md:w-[230px] lg:w-[calc((100%-64px)/5)] lg:min-w-[calc((100%-64px)/5)] flex-shrink-0 group bg-[#FFFDF9] border border-[#F6971E]/20 hover:border-[#F6971E] rounded-2xl p-2.5 transition-all cursor-pointer shadow-2xs hover:shadow-md flex flex-col justify-between"
                    onClick={() => setActiveVideo(videoUrl)}
                  >
                    {/* Video Thumbnail Container with Play Button */}
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-gray-100 mb-2 shadow-inner">
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
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <BsPlayFill className="text-xl text-black ml-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Text format */}
                    <div className="flex items-center justify-between text-xs px-1">
                      <span className="font-bold text-[#4A2B23] flex items-center gap-1.5 truncate">
                        <BsPlayCircleFill className="text-[#F6971E] shrink-0" />
                        <span className="truncate">Video #{idx + 1}</span>
                      </span>
                      <span className="text-[#F6971E] font-semibold text-[11px] bg-[#FFF8EB] px-2 py-0.5 rounded-md border border-[#F6971E]/20 shrink-0">
                        MP4
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Photo Gallery Section */}
          {astro1.photoGallery && astro1.photoGallery.length > 0 && (
            <section className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm border border-[#F6971E]/15">
              <div className="flex items-center justify-between mb-4 sm:mb-6 border-b border-gray-100 pb-3 sm:pb-4">
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-['Inria_Serif'] text-[#4A2B23] flex items-center gap-2 sm:gap-2.5">
                    <span className="w-1 sm:w-1.5 h-5 sm:h-6 md:h-7 bg-[#F6971E] rounded-full inline-block shrink-0"></span>
                    Photo Gallery
                  </h2>
                </div>
              </div>

              <div className="custom-x-scroll flex gap-3.5 sm:gap-4 overflow-x-auto pb-4 pt-1 scroll-smooth">
                {astro1.photoGallery.map((photoUrl: any, idx: any) => (
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
                      className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xl">
                      <BsImages />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 8. Verified Certificates & Credentials Gallery */}
          {((astro1.certificateGallery && astro1.certificateGallery.length > 0) || (astro1.certificates && astro1.certificates.length
            > 0)) && (
              <section className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm border border-[#F6971E]/15">
                <div className="flex items-center justify-between mb-4 sm:mb-6 border-b border-gray-100 pb-3 sm:pb-4">
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-['Inria_Serif'] text-[#4A2B23] flex items-center gap-2 sm:gap-2.5">
                      <span className="w-1 sm:w-1.5 h-5 sm:h-6 md:h-7 bg-[#F6971E] rounded-full inline-block shrink-0"></span>
                      Verified Certificates & Accreditations
                    </h2>
                  </div>
                  <div
                    className="hidden sm:flex items-center gap-1.5 text-xs text-[#F6971E] bg-[#FFF8EB] border border-[#F6971E]/20 px-3 py-1.5 rounded-full font-bold">
                    <BsAwardFill /> Authentic Documents
                  </div>
                </div>

                <div className="custom-x-scroll flex gap-3.5 sm:gap-4 overflow-x-auto pb-4 pt-1 scroll-smooth">
                  {[...(astro1.certificateGallery || []), ...(astro1.certificates || [])].map((certUrl, idx) => (
                    <div key={idx}
                      onClick={() => setPreviewImage(certUrl)}
                      className="w-[180px] sm:w-[210px] md:w-[230px] lg:w-[calc((100%-64px)/5)] lg:min-w-[calc((100%-64px)/5)] flex-shrink-0 group bg-[#FFFDF9] border border-[#F6971E]/20 hover:border-[#F6971E] rounded-2xl p-2.5 transition-all
              cursor-pointer shadow-2xs hover:shadow-md flex flex-col justify-between"
                    >
                      <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-100 mb-2">
                        <img src={certUrl} alt={`Certificate ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy"
                          onError={(e) => {
                            (e.currentTarget as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs px-1">
                        <span className="font-bold text-[#4A2B23]">Certificate #{idx + 1}</span>
                        <span className="text-[#F6971E] font-semibold text-[11px] group-hover:underline">View</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

          {/* Reviews Section */}
          <section className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-3 sm:gap-4 border-b border-gray-100 pb-4 sm:pb-6">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#4A2B23] font-['Inria_Serif'] flex items-center gap-2 sm:gap-2.5">
                <span className="w-1 sm:w-1.5 h-5 sm:h-6 md:h-7 bg-[#F6971E] rounded-full inline-block shrink-0"></span> Client Reviews
              </h2>
              <div className="flex items-center gap-2.5 sm:gap-3 bg-[#FFFDF9] border border-[#F6971E]/20 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full">
                <span className="font-bold text-lg sm:text-xl text-[#4A2B23]">{displayRating}</span>
                <div className="flex text-[#F6971E] text-sm sm:text-base items-center gap-0.5">
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
                <span className="text-xs text-gray-500 font-bold tracking-wide uppercase">{reviewsList.length} reviews</span>
              </div>
            </div>

            {/* Review Cards: Horizontal Scroll on Mobile (< md), Vertical Stack on Web (>= md) */}
            <div className="custom-x-scroll flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-4 md:gap-6 pb-4 pt-1 md:pb-0 md:pt-0 scroll-smooth">
              {(showAllReviews ? reviewsList : reviewsList.slice(0, 5)).map((review, i) => (
                <div
                  key={i}
                  className="w-[280px] sm:w-[320px] md:w-full flex-shrink-0 bg-gray-50 p-4 sm:p-5 md:p-6 rounded-2xl border border-gray-100 hover:border-[#F6971E]/30 transition-all flex flex-col justify-between shadow-2xs hover:shadow-sm"
                >
                  <div>
                    <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#F6971E] to-[#FFA733] text-white font-bold text-base sm:text-lg rounded-full flex items-center justify-center shadow-md shrink-0 mt-0.5">
                        {review.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-[#4A2B23] text-base sm:text-lg truncate">{review.name}</span>
                          <div className="flex text-[#F6971E] text-xs sm:text-sm shrink-0 items-center gap-0.5">
                            {Array.from({ length: 5 }, (_, starIdx) => {
                              const starVal = starIdx + 1;
                              const ratingVal = (review as any).stars || (review as any).rating || 5;
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
                        <span className="text-xs text-gray-400 font-medium block mt-0.5 truncate">Given By: {review.givenBy}</span>
                      </div>
                    </div>
                    <p className="text-[#4A2B23]/80 font-medium text-sm sm:text-base leading-relaxed">
                      "{review.text}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="w-full mt-6 py-3.5 sm:py-4 rounded-xl border-2 border-gray-200 hover:border-[#F6971E] text-[#4A2B23] hover:text-[#F6971E] font-bold hover:bg-[#FFF8EB]/50 transition-all cursor-pointer flex items-center justify-center gap-2 text-sm sm:text-base shadow-2xs"
            >
              {showAllReviews ? "Show Less Reviews" : `View all reviews (${reviewsList.length})`}
            </button>
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
