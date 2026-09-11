'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  BsChevronRight, 
  BsChevronDown
} from 'react-icons/bs';
import { usePopup } from '../../components/popup/PopupContext';

// Helper component for expandable text with 200-limit and View More / View Less
function ExpandableText({ text, limit = 200 }: { text: string; limit?: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return null;

  if (text.length <= limit) {
    return <p className="text-gray-600 font-helvetica text-xs sm:text-sm md:text-[14px] leading-relaxed whitespace-pre-line">{text}</p>;
  }

  const truncated = text.slice(0, limit).trim();
  const lastSpace = truncated.lastIndexOf(' ');
  const displayText = isExpanded ? text : (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + '...';

  return (
    <div>
      <p className="text-gray-600 font-helvetica text-xs sm:text-sm md:text-[14px] leading-relaxed whitespace-pre-line">
        {displayText}
      </p>
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-1.5 inline-flex items-center gap-1 text-[#F6971E] hover:text-[#d47d0e] font-bold text-xs cursor-pointer transition-colors"
      >
        <span>{isExpanded ? 'View Less' : 'View More'}</span>
        <BsChevronDown className={`text-[10px] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
}

export default function PujaDetails() {
  const params = useParams();
  const router = useRouter();
  const { openPopup } = usePopup();

  // State to show all categories or only 3
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Complete data object matching user's specification
  const pooja = {
    "_id": "6a7489eecb9ef5a42e8b189e",
    "name": "Rahu test",
    "description": "Experience authentic Vedic rituals performed by certified expert priests from India's most sacred temples, delivered live to your home. Experience authentic Vedic rituals performed by certified expert priests from India's most sacred temples, delivered live to your home. Experience authentic Vedic rituals performed by certified expert priests from India's most sacred temples, delivered live to your home. Experience authentic Vedic rituals performed by certified expert priests from India's most sacred temples, delivered live to your home. Experience authentic Vedic rituals performed by certified expert priests from India's most sacred temples, delivered live to your home. Experience authentic Vedic rituals performed by certified expert priests from India's most sacred temples, delivered live to your home. Experience authentic Vedic rituals performed by certified expert priests from India's most sacred temples, delivered live to your home. Experience authentic Vedic rituals performed by.",
    "image": "https://storage.googleapis.com/astro-vani-storage/admin/1786022750418-chercker.jpg",
    "benefits": "Experience authentic Vedic rituals performed by certified expert priests from India's most sacred temples, delivered live to your home. Experience authentic Vedic rituals performed by certified expert priests from India's most sacred temples, delivered live to your home. Experience authentic Vedic rituals performed by certified expert priests from India's most sacred temples, delivered live to your home. Experience authentic Vedic rituals performed by certified expert priests from India's most sacred temples, delivered live to your home. Experience authentic Vedic rituals performed by certified expert priests from India's most sacred temples, delivered live to your home. Experience authentic Vedic rituals performed by certified expert priests from India's most sacred temples, delivered live to your home. Experience authentic Vedic rituals performed by certified expert priests from India's most sacred temples, delivered live to your home. Experience authentic Vedic rituals performed by.",
    "keywords": [],
    "peopleType": "Individual",
    "basePrice": 1500,
    "duration": 15,
    "categoryId": [
      {
        "_id": "6a69cccddc1a587997197f52",
        "categoryName": "Spell",
        "icon": "https://storage.googleapis.com/astro-vani-storage/admin/1785415313460-spell.jpg",
        "createdAt": "2026-07-29T09:50:05.364Z",
        "updatedAt": "2026-08-14T10:05:33.874Z",
        "__v": 0,
        "isSpell": true,
        "isActive": true
      },
      {
        "_id": "6a64808d8b004e9d442bda82",
        "categoryName": "Love",
        "icon": "https://storage.googleapis.com/astro-vani-storage/admin/1785762819657-hearts.png",
        "createdAt": "2026-07-25T09:23:25.946Z",
        "updatedAt": "2026-08-14T10:05:54.433Z",
        "__v": 0,
        "isSpell": false,
        "isActive": true
      },
      {
        "_id": "6a6316aebd35bfff0b2df6cb",
        "categoryName": "Puja for Success",
        "icon": "https://storage.googleapis.com/astro-vani-storage/admin/1785761909834-success.png",
        "createdAt": "2026-07-24T07:39:26.622Z",
        "updatedAt": "2026-08-14T10:05:59.820Z",
        "__v": 0,
        "isSpell": false,
        "isActive": true
      },
      {
        "_id": "6a6315fcbd35bfff0b2df6b4",
        "categoryName": "Protection & Family Peace",
        "icon": "https://storage.googleapis.com/astro-vani-storage/admin/1785762854104-family.png",
        "createdAt": "2026-07-24T07:36:28.773Z",
        "updatedAt": "2026-08-14T10:06:01.422Z",
        "__v": 0,
        "isSpell": false,
        "isActive": true
      },
      {
        "_id": "6a6315e3bd35bfff0b2df6ac",
        "categoryName": "Power",
        "icon": "https://storage.googleapis.com/astro-vani-storage/admin/1786007580686-punch.png",
        "createdAt": "2026-07-24T07:36:03.347Z",
        "updatedAt": "2026-08-14T10:06:02.867Z",
        "__v": 0,
        "isSpell": false,
        "isActive": true
      },
      {
        "_id": "6a63158e51b2b304dee03260",
        "categoryName": "Court Case Vijay",
        "icon": "https://storage.googleapis.com/astro-vani-storage/admin/1785761957381-law.png",
        "createdAt": "2026-07-24T07:34:38.463Z",
        "updatedAt": "2026-08-14T10:06:04.169Z",
        "__v": 0,
        "isSpell": false,
        "isActive": true
      },
      {
        "_id": "6a636510d16517a2b1d6fc6d",
        "categoryName": "Marriage",
        "icon": "https://storage.googleapis.com/astro-vani-storage/admin/1785761923653-marriage.png",
        "createdAt": "2026-07-24T13:13:52.979Z",
        "updatedAt": "2026-08-14T10:05:56.810Z",
        "__v": 0,
        "isSpell": false,
        "isActive": true
      }
    ],
    "poojaTagId": null,
    "includedServices": {
      "sankalp": true,
      "templePhotos": false,
      "videoCall": false,
      "poojaVideo": true,
      "prasadDispatch": false,
      "personalizedMantra": true
    },
    "prasadDelivery": false,
    "isRecommended": false,
    "isNegativeEnergyRemoval": false,
    "regions": ["India"],
    "isActive": true,
    "isTrending": true,
    "createdBy": null,
    "totalBookings": 0,
    "averageRating": 0,
    "totalReviews": 0,
    "preferredDays": [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "procedure": "Experience authentic Vedic rituals performed by certified expert priests from India's most sacred temples, delivered live to your home. Experience authentic Vedic rituals performed by certified expert priests from India's most sacred temples, delivered live to your home. Experience authentic Vedicr.",
    "whatHappensAfterOrder": "Experience authentic Vedic rituals performed by certified expert priests from India's most sacred temples, delivered live to your home. Experience authentic Vedic rituals performed by certified expert priests from India's most sacred temples, delivered live to your home. Experience authentic Vedicr.",
    "startDateTime": "2026-08-06T13:21:00.000Z",
    "endDateTime": "2026-08-09T13:18:00.000Z",
    "bookingOpenTill": "2026-08-08T13:19:00.000Z",
    "createdAt": "2026-08-06T13:19:42.725Z",
    "updatedAt": "2026-09-08T09:45:53.806Z",
    "__v": 0,
    "poojaFaqId": [],
    "isBookable": false,
    "faqEntries": [
      {
        "_id": "6a7d5c18e28e81f73f965072",
        "question": "pooja?",
        "answer": "This Pooja brings peace,life.",
        "isActive": true,
        "createdAt": "2026-08-13T05:54:32.951Z",
        "updatedAt": "2026-08-13T06:34:31.003Z",
        "__v": 0
      },
      {
        "_id": "6a7c100f22b626fff51dd0f3",
        "question": "hvyyjh five",
        "answer": "gdygds five",
        "isActive": true,
        "createdAt": "2026-08-12T06:17:51.061Z",
        "updatedAt": "2026-08-12T06:17:51.061Z",
        "__v": 0
      },
      {
        "_id": "6a7c100f22b626fff51dd0f1",
        "question": "que fourgfbeyc",
        "answer": "faq que ans four",
        "isActive": true,
        "createdAt": "2026-08-12T06:17:51.053Z",
        "updatedAt": "2026-08-12T06:17:51.053Z",
        "__v": 0
      },
      {
        "_id": "6a7c100f22b626fff51dd0ed",
        "question": "What is the primary benefit of performing Ganesh Puja?",
        "answer": "It removes obstacles, brings prosperity, improves wisdom, and is ideal before starting new ventures.",
        "isActive": true,
        "createdAt": "2026-08-12T06:17:51.034Z",
        "updatedAt": "2026-08-12T06:17:51.034Z",
        "__v": 0
      },
      {
        "_id": "6a7c100f22b626fff51dd0eb",
        "question": "Can I perform this pooja online via video call?",
        "answer": "Yes, online video call streaming is supported as part of our included services.",
        "isActive": true,
        "createdAt": "2026-08-12T06:17:51.023Z",
        "updatedAt": "2026-08-12T06:17:51.023Z",
        "__v": 0
      },
      {
        "_id": "6a7c100f22b626fff51dd0ef",
        "question": "ugfyuds",
        "answer": "subfcuidvyisdfcyuv",
        "isActive": true,
        "createdAt": "2026-08-12T06:17:51.043Z",
        "updatedAt": "2026-08-12T06:17:51.043Z",
        "__v": 0
      },
      {
        "_id": "6a7bc8bdb6eca8e230e5b5c7",
        "question": "Question 1",
        "answer": "Answer 1",
        "isActive": true,
        "createdAt": "2026-08-12T01:13:33.282Z",
        "updatedAt": "2026-08-12T01:13:33.282Z",
        "__v": 0
      },
      {
        "_id": "6a748bfecb9ef5a42e8b1ab2",
        "question": "What is the duration of one session?",
        "answer": "A spell session generally takes 20–40 minutes, depending on the astrologer and the nature of the spell.",
        "isActive": true,
        "createdAt": "2026-08-06T13:28:30.894Z",
        "updatedAt": "2026-08-06T13:28:30.894Z",
        "__v": 0
      },
      {
        "_id": "6a74973340546e255f2a9a64",
        "question": "Aut nostrum nostrud",
        "answer": "Molestias ducimus a",
        "isActive": true,
        "createdAt": "2026-08-06T14:16:19.435Z",
        "updatedAt": "2026-08-06T14:16:19.435Z",
        "__v": 0
      }
    ]
  };

  // FAQ State (default first open)
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Determine displayed categories (default 3, or all when expanded)
  const visibleCategories = showAllCategories 
    ? pooja.categoryId 
    : pooja.categoryId.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#FFFDF9] pt-28 pb-[80px] font-helvetica">
      <div className="container mx-auto max-w-6xl px-4">

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs md:text-sm font-bold tracking-widest uppercase text-gray-400 mb-6 mt-4 md:mt-0">
          <Link href="/" className="hover:text-[#F6971E] transition-colors">Home</Link>
          <BsChevronRight className="text-[10px]" />
          <Link href="/pooja" className="hover:text-[#F6971E] transition-colors">Pooja Services</Link>
          <BsChevronRight className="text-[10px]" />
          <span className="text-[#F6971E] line-clamp-1">{pooja.name}</span>
        </div>

        {/* Unified Main Details Card */}
        <div className="bg-white rounded-[24px] sm:rounded-[28px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#F6971E]/15 p-5 sm:p-7 md:p-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center">

            {/* Left: Compact Single Image */}
            <div className="w-full lg:w-[35%] max-w-[320px] sm:max-w-[340px] flex-shrink-0 mx-auto lg:mx-0">
              <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-[18px] sm:rounded-[22px] overflow-hidden shadow-md border border-orange-100/70 bg-[#FFFDF9] group">
                <Image 
                  src={pooja.image} 
                  alt={pooja.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  priority 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Right: Details, Categories & Booking (Compact without empty space) */}
            <div className="w-full lg:w-[65%] flex flex-col justify-center">

              {/* Categories Badges (3 visible by default + View More / View Less toggle) */}
              {pooja.categoryId && pooja.categoryId.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-2.5">
                  {visibleCategories.map((cat) => (
                    <span 
                      key={cat._id}
                      className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-orange-50 text-[#F6971E] border border-orange-200/60 shadow-2xs"
                    >
                      {cat.icon && (
                        <span className="relative w-3.5 h-3.5 rounded-full overflow-hidden flex-shrink-0">
                          <Image src={cat.icon} alt={cat.categoryName} fill className="object-cover" />
                        </span>
                      )}
                      <span>{cat.categoryName}</span>
                    </span>
                  ))}

                  {/* View More / View Less Button for Categories */}
                  {pooja.categoryId.length > 3 && (
                    <button
                      type="button"
                      onClick={() => setShowAllCategories(!showAllCategories)}
                      className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold bg-amber-50 hover:bg-amber-100 text-[#F6971E] border border-[#F6971E]/30 transition-colors cursor-pointer"
                    >
                      <span>{showAllCategories ? 'View Less' : `+${pooja.categoryId.length - 3} View More`}</span>
                    </button>
                  )}
                </div>
              )}

              {/* Pooja Name */}
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-['Inria_Serif'] text-[#4A2B23] mb-2 leading-tight">
                {pooja.name}
              </h1>

              {/* Description Snippet (with View More / View Less) */}
              <div className="mb-4">
                <ExpandableText text={pooja.description} limit={200} />
              </div>

              {/* Pricing & CTA - directly attached below description */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3.5 border-t border-gray-100">
                <div className="flex flex-col">
                  <span className="text-gray-400 uppercase tracking-widest text-[10px] sm:text-[11px] font-bold mb-0.5">Base Price</span>
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#4A2B23] font-['Inria_Serif'] tracking-tight">
                    ₹{pooja.basePrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  onClick={openPopup}
                  className="w-full sm:w-auto bg-gradient-to-r from-[#F6971E] to-[#FFA733] hover:from-[#FFA733] hover:to-[#F6971E] text-white font-bold text-xs sm:text-sm py-2.5 px-6 sm:px-8 rounded-xl shadow-[0_4px_15px_rgba(246,151,30,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  Book Pooja Now
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* 4 Full-Width (100% Width) Sections: Description, Benefits, Procedure, What Happens After Order */}
        <div className="mt-7 flex flex-col gap-5 w-full">

          {/* 1. Description Section (100% Width) */}
          <div className="w-full bg-white rounded-[20px] shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-[#F6971E]/15 p-5 sm:p-7">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-1.5 h-4 sm:h-5 rounded-full bg-[#F6971E]" />
              <h2 className="text-base sm:text-lg md:text-xl font-bold font-['Inria_Serif'] text-[#4A2B23]">
                Description
              </h2>
            </div>
            <ExpandableText text={pooja.description} limit={200} />
          </div>

          {/* 2. Benefits Section (100% Width) */}
          <div className="w-full bg-white rounded-[20px] shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-[#F6971E]/15 p-5 sm:p-7">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-1.5 h-4 sm:h-5 rounded-full bg-[#F6971E]" />
              <h2 className="text-base sm:text-lg md:text-xl font-bold font-['Inria_Serif'] text-[#4A2B23]">
                Benefits
              </h2>
            </div>
            <ExpandableText text={pooja.benefits} limit={200} />

            {/* Preferred Days inside Benefits */}
            {pooja.preferredDays && pooja.preferredDays.length > 0 && (
              <div className="mt-4 pt-3.5 border-t border-gray-100">
                <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                  Auspicious / Preferred Days
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {pooja.preferredDays.map((day) => (
                    <span key={day} className="px-2.5 py-0.5 rounded-md bg-orange-50 border border-orange-200 text-xs font-semibold text-[#F6971E]">
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. Procedure Section (100% Width) */}
          <div className="w-full bg-white rounded-[20px] shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-[#F6971E]/15 p-5 sm:p-7">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-1.5 h-4 sm:h-5 rounded-full bg-[#F6971E]" />
              <h2 className="text-base sm:text-lg md:text-xl font-bold font-['Inria_Serif'] text-[#4A2B23]">
                Procedure
              </h2>
            </div>
            <ExpandableText text={pooja.procedure} limit={200} />
          </div>

          {/* 4. What Happens After Order Section (100% Width) */}
          <div className="w-full bg-white rounded-[20px] shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-[#F6971E]/15 p-5 sm:p-7">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-1.5 h-4 sm:h-5 rounded-full bg-[#F6971E]" />
              <h2 className="text-base sm:text-lg md:text-xl font-bold font-['Inria_Serif'] text-[#4A2B23]">
                What Happens After Order
              </h2>
            </div>
            <ExpandableText text={pooja.whatHappensAfterOrder} limit={200} />
          </div>

        </div>

        {/* FAQs Section */}
        {pooja.faqEntries && pooja.faqEntries.length > 0 && (
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold font-['Inria_Serif'] text-[#4A2B23] mb-1.5">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm">
                Everything you need to know about {pooja.name}
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              {pooja.faqEntries.map((faq, index) => (
                <div 
                  key={faq._id || index} 
                  className={`bg-white rounded-xl p-3.5 sm:p-4 border transition-all duration-300 ${
                    openFaq === index 
                      ? 'border-[#F6971E] shadow-[0_4px_20px_rgba(246,151,30,0.08)]' 
                      : 'border-[#F6971E]/15 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-[#F6971E]/40'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between text-left font-bold text-[#4A2B23] group cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm md:text-[15px] pr-4 group-hover:text-[#F6971E] transition-colors">
                      {faq.question}
                    </span>
                    <div className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openFaq === index 
                        ? 'bg-gradient-to-r from-[#F6971E] to-[#FFA733] text-white -rotate-180 shadow-sm' 
                        : 'bg-gray-50 text-gray-400 group-hover:bg-[#F6971E]/10 group-hover:text-[#F6971E]'
                    }`}>
                      <BsChevronDown className="text-xs font-bold" />
                    </div>
                  </button>

                  <div className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'max-h-60 mt-2.5 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <p className="text-gray-600 font-helvetica text-xs sm:text-sm leading-relaxed pr-4 pt-2.5 border-t border-gray-100">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
