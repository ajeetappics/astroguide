'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import {
  BsChevronRight,
  BsHeartFill,
  BsBriefcaseFill,
  BsCashStack,
  BsActivity,
  BsPeopleFill,
  BsHouseDoorFill,
  BsAwardFill,
  BsCompassFill,
  BsLightningChargeFill,
  BsPaletteFill,
  Bs123,
  BsChatDotsFill,
  BsArrowLeft,
  BsSunFill,
  BsMoonStarsFill,
  BsCalendarEvent
} from 'react-icons/bs';
import {
  TbZodiacAries, TbZodiacTaurus, TbZodiacGemini, TbZodiacCancer,
  TbZodiacLeo, TbZodiacVirgo, TbZodiacLibra, TbZodiacScorpio,
  TbZodiacSagittarius, TbZodiacCapricorn, TbZodiacAquarius, TbZodiacPisces
} from 'react-icons/tb';
import { usePopup } from '../../../../components/popup/PopupContext';
import {
  TIMEFRAMES,
  getTimeframeConfig,
  getSignHoroscopeForTimeframe,
  ZODIAC_SIGNS_LIST,
  fetchHoroscopePrediction,
  parsePredictionResponse,
  ParsedPredictionData,
  ZODIAC_NUMBER_MAP
} from '../../../../../services/horoscopeService';

const ZODIAC_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  aries: TbZodiacAries,
  taurus: TbZodiacTaurus,
  gemini: TbZodiacGemini,
  cancer: TbZodiacCancer,
  leo: TbZodiacLeo,
  virgo: TbZodiacVirgo,
  libra: TbZodiacLibra,
  scorpio: TbZodiacScorpio,
  sagittarius: TbZodiacSagittarius,
  capricorn: TbZodiacCapricorn,
  aquarius: TbZodiacAquarius,
  pisces: TbZodiacPisces,
};

export default function SignHoroscopeDetailPage() {
  const params = useParams();
  const rawTimeframe = (params?.timeframe as string) || 'daily-horoscope';
  const rawSign = (params?.sign as string) || 'aries';
  const { openPopup } = usePopup();

  const [celestialType, setCelestialType] = useState<'sun' | 'moon'>('sun');
  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState<number>(0);
  const [expandedAreas, setExpandedAreas] = useState<Record<string, boolean>>({});
  const [parsedPrediction, setParsedPrediction] = useState<ParsedPredictionData | null>(null);
  const [isLoadingPrediction, setIsLoadingPrediction] = useState<boolean>(true);

  const timeframe = getTimeframeConfig(rawTimeframe);
  const signData = getSignHoroscopeForTimeframe(rawSign, timeframe.slug);
  const isYearly = timeframe.id === 'yearly' || timeframe.slug === 'yearly-horoscope';

  if (!signData) {
    notFound();
  }

  // Fetch prediction from API: POST /vedicastro/getPrediction
  useEffect(() => {
    let isMounted = true;
    setIsLoadingPrediction(true);

    const zodiacNum = ZODIAC_NUMBER_MAP[signData.id] || '1';
    const tfPrefix = timeframe.id || (timeframe.slug ? timeframe.slug.replace('-horoscope', '') : 'daily');
    const subCategory = isYearly ? 'yearly' : `${tfPrefix}-${celestialType}`;

    fetchHoroscopePrediction(subCategory, zodiacNum, 'en')
      .then((data) => {
        if (!isMounted) return;
        const parsed = parsePredictionResponse(data);
        setParsedPrediction(parsed);
      })
      .catch((err) => {
        console.error('Failed to fetch prediction:', err);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingPrediction(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [timeframe.slug, timeframe.id, celestialType, signData.id, isYearly]);

  const ActiveIcon = ZODIAC_ICONS[signData.id] || TbZodiacAries;

  const getStatusFromScore = (score?: number) => {
    if (score === undefined) return '';
    if (score >= 75) return 'Highly Favorable';
    if (score >= 50) return 'Moderate & Steady';
    if (score >= 30) return 'Requires Focus';
    return 'Exercise Caution';
  };

  useEffect(() => {
    setExpandedAreas({});
  }, [selectedPhaseIndex, rawSign, rawTimeframe, celestialType]);

  const toggleExpandArea = (key: string) => {
    setExpandedAreas((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getPreviewText = (text: string, limit = 200) => {
    if (text.length <= limit) return text;
    const truncated = text.slice(0, limit);
    const lastSpace = truncated.lastIndexOf(' ');
    return (lastSpace > 140 ? truncated.slice(0, lastSpace) : truncated).trim();
  };

  const yearlyPhases = parsedPrediction?.yearlyPhases || [];
  const activePhase = isYearly && yearlyPhases.length > 0
    ? yearlyPhases[selectedPhaseIndex] || yearlyPhases[0]
    : null;

  const currentOverview = activePhase ? activePhase.prediction : parsedPrediction?.overviewText;
  const currentAreas = activePhase ? activePhase.areas : parsedPrediction?.areas;

  const lifeAreaItems = [
    { key: 'physique', label: 'Physique & Vitality', icon: BsLightningChargeFill, color: 'text-amber-500', bg: 'bg-amber-50', data: currentAreas?.physique },
    { key: 'status', label: 'Status & Respect', icon: BsAwardFill, color: 'text-purple-600', bg: 'bg-purple-50', data: currentAreas?.status },
    { key: 'finance', label: 'Finance & Wealth', icon: BsCashStack, color: 'text-emerald-600', bg: 'bg-emerald-50', data: currentAreas?.finance },
    { key: 'relationship', label: 'Relationship & Love', icon: BsHeartFill, color: 'text-rose-600', bg: 'bg-rose-50', data: currentAreas?.relationship },
    { key: 'career', label: 'Career & Work', icon: BsBriefcaseFill, color: 'text-blue-600', bg: 'bg-blue-50', data: currentAreas?.career },
    { key: 'travel', label: 'Travel & Movement', icon: BsCompassFill, color: 'text-cyan-600', bg: 'bg-cyan-50', data: currentAreas?.travel },
    { key: 'family', label: 'Family & Home', icon: BsHouseDoorFill, color: 'text-orange-600', bg: 'bg-orange-50', data: currentAreas?.family },
    { key: 'friends', label: 'Friends & Allies', icon: BsPeopleFill, color: 'text-indigo-600', bg: 'bg-indigo-50', data: currentAreas?.friends },
    { key: 'health', label: 'Health & Well-being', icon: BsActivity, color: 'text-green-600', bg: 'bg-green-50', data: currentAreas?.health }
  ];

  return (
    <main className="min-h-screen bg-[#FFFDF9] pt-28 pb-[80px] font-helvetica">
      <div className="container mx-auto max-w-6xl px-4">

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs md:text-sm font-bold tracking-widest uppercase text-gray-400 mb-6 mt-2 md:mt-0 flex-wrap">
          <Link href="/" className="hover:text-[#F6971E] transition-colors">Home</Link>
          <BsChevronRight className="text-[10px]" />
          <Link href={`/horoscope/${timeframe.slug}`} className="hover:text-[#F6971E] transition-colors">
            {timeframe.label} Horoscope
          </Link>
          <BsChevronRight className="text-[10px]" />
          <span className="text-[#F6971E]">{signData.name} ({signData.hindiName})</span>
        </div>

        {/* Back Link & Quick Heading */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href={`/horoscope/${timeframe.slug}`}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#F6971E] hover:text-[#4A2B23] transition-colors bg-white border border-[#F6971E]/30 px-3.5 py-1.5 rounded-full shadow-2xs"
          >
            <BsArrowLeft className="text-sm" />
            <span>All {timeframe.label} Zodiac Signs</span>
          </Link>

          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-50 text-[#F6971E] border border-orange-200">
            {signData.dateRange}
          </span>
        </div>

        {/* SubCategory Timeframes & Celestial Sun/Moon Tabs (Side-by-Side) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
          {/* Timeframe Navigation Tabs (Preserves current sign) */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 bg-white p-1.5 sm:p-2 rounded-2xl sm:rounded-full border border-[#F6971E]/20 shadow-xs">
            {TIMEFRAMES.map((tf) => {
              const isActive = tf.slug === timeframe.slug;
              return (
                <Link
                  key={tf.slug}
                  href={`/horoscope/${tf.slug}/${signData.id}`}
                  className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${isActive
                      ? 'bg-gradient-to-r from-[#F6971E] to-[#FFA733] text-white shadow-xs'
                      : 'text-[#4A2B23] hover:bg-orange-50 hover:text-[#F6971E]'
                    }`}
                >
                  {tf.label}
                </Link>
              );
            })}
          </div>

          {/* Sun & Moon Celestial Tabs (Right Side of SubCategory, hidden if Yearly) */}
          {!isYearly && (
            <div className="inline-flex items-center gap-1.5 bg-white p-1.5 sm:p-2 rounded-2xl sm:rounded-full border border-[#F6971E]/25 shadow-xs">
              <button
                type="button"
                onClick={() => setCelestialType('sun')}
                className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  celestialType === 'sun'
                    ? 'bg-gradient-to-r from-[#F6971E] to-[#FFA733] text-white shadow-xs'
                    : 'text-[#4A2B23] hover:bg-orange-50 hover:text-[#F6971E]'
                }`}
              >
                <BsSunFill className={`text-sm ${celestialType === 'sun' ? 'text-white' : 'text-[#F6971E]'}`} />
                <span>Sun Sign</span>
              </button>
              <button
                type="button"
                onClick={() => setCelestialType('moon')}
                className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  celestialType === 'moon'
                    ? 'bg-gradient-to-r from-[#5B3A82] to-[#7851A9] text-white shadow-xs'
                    : 'text-[#4A2B23] hover:bg-purple-50 hover:text-[#5B3A82]'
                }`}
              >
                <BsMoonStarsFill className={`text-sm ${celestialType === 'moon' ? 'text-white' : 'text-[#5B3A82]'}`} />
                <span>Moon Sign</span>
              </button>
            </div>
          )}
        </div>

        {/* Main Detailed Reading Card */}
        <div className="bg-white rounded-[24px] sm:rounded-[32px] border border-[#F6971E]/20 shadow-[0_12px_40px_rgba(0,0,0,0.04)] p-5 sm:p-8 md:p-10 mb-10 transition-all">

          {/* Header of Active Sign Card */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#FEF8E2] to-[#FFF3D6] border border-[#F6971E]/30 flex items-center justify-center text-[#F6971E] shadow-sm flex-shrink-0">
                <ActiveIcon className="text-3xl sm:text-4xl" />
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h1 className="text-2xl sm:text-3xl font-bold font-['Inria_Serif'] text-[#4A2B23]">
                    {signData.name}
                  </h1>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-orange-50 text-[#F6971E] border border-orange-200">
                    {signData.hindiName}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                    {signData.element} Element
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">
                  Ruling Planet: <span className="text-[#4A2B23] font-bold">{signData.ruler}</span> &bull; {signData.dateRange}
                </p>
              </div>
            </div>

            {/* Timeframe Tag & Astrologer Button */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <span className="px-3.5 py-1.5 rounded-full bg-orange-50 text-[#F6971E] text-xs font-bold border border-orange-200">
                {timeframe.label} {isYearly ? 'Forecast' : `(${celestialType === 'sun' ? 'Sun' : 'Moon'}) Reading`}
              </span>
              <button
                onClick={openPopup}
                className="bg-gradient-to-r from-[#F6971E] to-[#FFA733] hover:from-[#FFA733] hover:to-[#F6971E] text-white font-bold text-xs sm:text-sm py-2 px-5 rounded-full shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                <BsChatDotsFill className="text-xs" />
                <span>Ask Astrologer</span>
              </button>
            </div>
          </div>

          {/* Yearly 4 Transit Phases Switcher */}
          {isYearly && yearlyPhases.length > 0 && (
            <div className="py-6 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-bold font-['Inria_Serif'] text-[#4A2B23]">
                      Annual 4 Transit Phases
                    </h2>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-[#72271E]">
                      Phase Breakdown
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Click any phase below to view detailed forecast and 9 life pillars for that phase
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200 text-xs font-bold text-[#F6971E]">
                  <BsCalendarEvent className="text-sm" />
                  <span>Annual Average:</span>
                  <span className="text-[#4A2B23] font-black">{parsedPrediction?.totalScore}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {yearlyPhases.map((phase, idx) => {
                  const isSelected = selectedPhaseIndex === idx;
                  return (
                    <button
                      key={phase.phaseKey}
                      type="button"
                      onClick={() => setSelectedPhaseIndex(idx)}
                      className={`text-left p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-gradient-to-br from-[#FEF8E2] to-[#FFF3D6] border-[#F6971E] shadow-sm -translate-y-0.5'
                          : 'bg-[#FFFDF9] border-orange-100/70 hover:border-[#F6971E]/40 hover:shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className={`text-xs sm:text-sm font-bold ${isSelected ? 'text-[#F6971E]' : 'text-[#4A2B23]'}`}>
                          {phase.phaseTitle}
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          isSelected ? 'bg-[#F6971E] text-white' : 'bg-orange-50 text-[#F6971E]'
                        }`}>
                          {phase.score}%
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 font-medium line-clamp-1">
                        {phase.period}
                      </p>
                      <span className={`text-[10px] font-semibold mt-2 inline-block ${
                        isSelected ? 'text-[#72271E]' : 'text-gray-400'
                      }`}>
                        {getStatusFromScore(phase.score)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* General Overview Summary */}
          <div className="py-6 border-b border-gray-100 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-base sm:text-lg font-bold font-['Inria_Serif'] text-[#4A2B23]">
                {isYearly && activePhase
                  ? `${activePhase.phaseTitle} (${activePhase.period}) Forecast`
                  : `${timeframe.label}'s ${celestialType === 'sun' ? 'Sun Sign' : 'Moon Sign'} Overview`}
              </h2>
              {isYearly && activePhase ? (
                <span className="text-xs px-3 py-1 rounded-full bg-orange-50 text-[#F6971E] font-semibold border border-orange-200 flex items-center gap-1.5">
                  <BsCalendarEvent className="text-xs" />
                  <span>{activePhase.period}</span>
                </span>
              ) : (
                !isYearly && (
                  <span className="text-xs px-3 py-1 rounded-full bg-orange-50 text-[#F6971E] font-semibold border border-orange-200">
                    {celestialType === 'sun' ? '☀️ Sun Sign Prediction' : '🌙 Moon Sign Prediction'}
                  </span>
                )
              )}
            </div>
            {isLoadingPrediction ? (
              <div className="py-4 flex items-center gap-3 text-gray-500 text-xs sm:text-sm">
                <div className="w-4 h-4 rounded-full border-2 border-[#F6971E] border-t-transparent animate-spin" />
                <span>Loading {timeframe.label} {isYearly ? '' : `(${celestialType})`} prediction...</span>
              </div>
            ) : (
              <p className="text-gray-600 text-xs sm:text-sm md:text-[15px] leading-relaxed whitespace-pre-line">
                {currentOverview || 'Prediction forecast is currently being calculated for this period.'}
              </p>
            )}
          </div>

          {/* HIGHLIGHTS SECTION - DYNAMIC FOR YEARLY & DAILY/WEEKLY/MONTHLY */}
          <div className="py-7 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base sm:text-lg font-bold font-['Inria_Serif'] text-[#4A2B23]">
                {isYearly ? 'Annual Phase Metrics' : 'Lucky Highlights'}
              </h2>
              <span className="text-xs text-[#F6971E] font-semibold">
                {isYearly ? 'Phase Indicators (Live)' : 'Astrological Indicators (Live)'}
              </span>
            </div>

            {isYearly && activePhase ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {/* 1. Active Phase */}
                <div className="bg-[#FFFDF9] rounded-2xl p-4 border border-orange-100/80 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
                    <span className="font-bold uppercase tracking-wider text-[10px]">Active Phase</span>
                    <BsCalendarEvent className="text-xs text-[#F6971E]" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#4A2B23] mb-0.5">{activePhase.phaseTitle}</h4>
                    <p className="text-xs text-gray-500 font-medium">{activePhase.period}</p>
                  </div>
                </div>

                {/* 2. Phase Score */}
                <div className="bg-[#FFFDF9] rounded-2xl p-4 border border-orange-100/80 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
                    <span className="font-bold uppercase tracking-wider text-[10px]">Phase Transit Score</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-[#F6971E]">
                      {getStatusFromScore(activePhase.score)}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg sm:text-xl font-black font-['Inria_Serif'] text-[#72271E]">
                      {activePhase.score}%
                    </span>
                    <span className="text-xs text-gray-500 font-medium">phase alignment</span>
                  </div>
                </div>

                {/* 3. Annual Average Score */}
                <div className="bg-[#FFFDF9] rounded-2xl p-4 border border-orange-100/80 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
                    <span className="font-bold uppercase tracking-wider text-[10px]">Annual Year Average</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-[#F6971E]">
                      {getStatusFromScore(parsedPrediction?.totalScore) || 'Dynamic'}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg sm:text-xl font-black font-['Inria_Serif'] text-[#F6971E]">
                      {parsedPrediction?.totalScore !== undefined ? `${parsedPrediction.totalScore}%` : 'N/A'}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">overall annual score</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {/* 1. Color */}
                <div className="bg-[#FFFDF9] rounded-2xl p-4 border border-orange-100/80 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
                    <span className="font-bold uppercase tracking-wider text-[10px]">Lucky Color</span>
                    <BsPaletteFill className="text-xs text-[#F6971E]" />
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-4 h-4 rounded-full flex-shrink-0 border border-black/15 shadow-xs"
                      style={{ backgroundColor: parsedPrediction?.luckyColorCode || '#F6971E' }}
                    />
                    <span className="text-xs sm:text-sm font-bold text-[#4A2B23] capitalize">
                      {parsedPrediction?.luckyColor || (isLoadingPrediction ? 'Loading...' : 'N/A')}
                    </span>
                  </div>
                </div>

                {/* 2. Number */}
                <div className="bg-[#FFFDF9] rounded-2xl p-4 border border-orange-100/80 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
                    <span className="font-bold uppercase tracking-wider text-[10px]">Lucky Number</span>
                    <Bs123 className="text-base text-[#F6971E]" />
                  </div>
                  <span className="text-lg sm:text-xl font-black font-['Inria_Serif'] text-[#72271E]">
                    {parsedPrediction?.luckyNumber || (isLoadingPrediction ? '...' : 'N/A')}
                  </span>
                </div>

                {/* 3. Overall Cosmic Score */}
                <div className="bg-[#FFFDF9] rounded-2xl p-4 border border-orange-100/80 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
                    <span className="font-bold uppercase tracking-wider text-[10px]">Cosmic Transit Score</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-[#F6971E]">
                      {getStatusFromScore(parsedPrediction?.totalScore) || 'Dynamic'}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg sm:text-xl font-black font-['Inria_Serif'] text-[#F6971E]">
                      {parsedPrediction?.totalScore !== undefined ? `${parsedPrediction.totalScore}%` : (isLoadingPrediction ? '...' : 'N/A')}
                    </span>
                    {parsedPrediction?.totalScore !== undefined && (
                      <span className="text-xs text-gray-500 font-medium">
                        overall alignment
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* AREA OF LIFE (9 CATEGORIES: PHYSIQUE, STATUS, FINANCE, RELATIONSHIP, CAREER, TRAVEL, FAMILY, FRIENDS, HEALTH) */}
          <div className="pt-7">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base sm:text-lg font-bold font-['Inria_Serif'] text-[#4A2B23]">
                  Area of Life {isYearly && activePhase ? `— ${activePhase.phaseTitle}` : ''}
                </h2>
                <p className="text-xs text-gray-500">
                  Detailed astrological metrics across your 9 essential life dimensions {isYearly && activePhase ? `for ${activePhase.period}` : ''}
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-50 text-[#F6971E] border border-orange-200">
                9 Pillars
              </span>
            </div>

            {isLoadingPrediction ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {[...Array(9)].map((_, idx) => (
                  <div key={idx} className="bg-[#FFFDF9] rounded-2xl p-5 border border-orange-100/60 animate-pulse space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="w-28 h-4 bg-orange-100/70 rounded" />
                      <div className="w-16 h-4 bg-orange-100/50 rounded-full" />
                    </div>
                    <div className="w-full h-12 bg-gray-100/70 rounded" />
                    <div className="w-full h-2 bg-gray-100 rounded-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {lifeAreaItems.map((item) => {
                  const ItemIcon = item.icon;
                  const itemData = item.data;
                  return (
                    <div
                      key={item.key}
                      className="bg-[#FFFDF9] rounded-2xl p-4 sm:p-5 border border-orange-100/80 shadow-2xs flex flex-col justify-between space-y-3 hover:border-[#F6971E]/40 transition-all"
                    >
                      {/* Header with Icon, Title & Status */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                            <ItemIcon className={`text-sm ${item.color}`} />
                          </div>
                          <h3 className="font-bold text-sm sm:text-[15px] text-[#4A2B23]">
                            {item.label}
                          </h3>
                        </div>
                        {itemData?.status && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white border border-gray-200 text-[#72271E]">
                            {itemData.status}
                          </span>
                        )}
                      </div>

                      {/* Description with Read more toggle */}
                      {(() => {
                        const description = itemData?.description || 'Planetary positions indicate steady influences for this sphere.';
                        const isExpanded = Boolean(expandedAreas[item.key]);
                        const isLong = description.length > 200;

                        return (
                          <div className="text-gray-600 text-xs sm:text-[13px] leading-relaxed flex-grow">
                            <span className={isExpanded ? 'whitespace-pre-line' : ''}>
                              {isExpanded || !isLong ? description : `${getPreviewText(description, 200)}... `}
                            </span>
                            {isLong && (
                              <button
                                type="button"
                                onClick={() => toggleExpandArea(item.key)}
                                className="text-[#F6971E] hover:text-[#72271E] font-bold text-xs inline cursor-pointer hover:underline focus:outline-hidden"
                              >
                                {isExpanded ? ' Show less' : 'Read more'}
                              </button>
                            )}
                          </div>
                        );
                      })()}

                      {/* Progress Bar & Score */}
                      <div className="pt-2 border-t border-gray-100/80">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="text-[11px] font-semibold text-gray-400">Harmony Score</span>
                          <span className="font-bold text-[#4A2B23]">{itemData?.score ?? 0}%</span>
                        </div>
                        <div className="w-full bg-gray-200/60 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-[#F6971E] to-[#FFA733] h-full rounded-full transition-all duration-700"
                            style={{ width: `${itemData?.score ?? 0}%` }}
                          />
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* Explore Other Zodiac Signs For This Timeframe */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg sm:text-xl font-bold font-['Inria_Serif'] text-[#4A2B23]">
              Check Other Zodiac Signs for {timeframe.label}
            </h2>
            <Link
              href={`/horoscope/${timeframe.slug}`}
              className="text-xs font-bold text-[#F6971E] hover:underline"
            >
              View All 12 Signs &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {ZODIAC_SIGNS_LIST.map((otherSign) => {
              const OtherIcon = ZODIAC_ICONS[otherSign.id] || TbZodiacAries;
              const isCurrent = otherSign.id === signData.id;

              return (
                <Link
                  key={otherSign.id}
                  href={`/horoscope/${timeframe.slug}/${otherSign.id}`}
                  className={`group flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${isCurrent
                      ? 'bg-orange-50 border-[#F6971E] shadow-2xs pointer-events-none'
                      : 'bg-white border-gray-100 hover:border-[#F6971E]/50 hover:shadow-xs hover:-translate-y-0.5'
                    }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 transition-all ${isCurrent ? 'bg-[#F6971E] text-white' : 'bg-orange-50/70 text-[#F6971E] group-hover:bg-[#F6971E] group-hover:text-white'
                    }`}>
                    <OtherIcon className="text-xl" />
                  </div>
                  <span className="font-bold text-xs text-[#4A2B23] text-center">
                    {otherSign.name}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {otherSign.hindiName}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>


      </div>
    </main>
  );
}
