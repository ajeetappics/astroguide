import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://preprod.api.astrovani-balaji.store';

export const ZODIAC_NUMBER_MAP: Record<string, string> = {
  aries: '1',
  taurus: '2',
  gemini: '3',
  cancer: '4',
  leo: '5',
  virgo: '6',
  libra: '7',
  scorpio: '8',
  sagittarius: '9',
  capricorn: '10',
  aquarius: '11',
  pisces: '12',
};

export const ZODIAC_ID_BY_NUMBER: Record<string, string> = {
  '1': 'aries',
  '2': 'taurus',
  '3': 'gemini',
  '4': 'cancer',
  '5': 'leo',
  '6': 'virgo',
  '7': 'libra',
  '8': 'scorpio',
  '9': 'sagittarius',
  '10': 'capricorn',
  '11': 'aquarius',
  '12': 'pisces',
};

/**
 * Fetch Horoscope prediction:
 * @param subCategory Timeline & Celestial type: "daily-sun", "daily-moon", "weekly-sun", "weekly-moon", etc.
 * @param zodiac Optional zodiac sign number: "1" to "12". If omitted, only subCategory and language are sent.
 * @param language Language code: "en"
 */
export async function fetchHoroscopePrediction(
  subCategory: string = 'daily-sun',
  zodiac?: string,
  language: string = 'en'
): Promise<any> {
  try {
    const payload: Record<string, string> = {
      subCategory,
      language,
    };
    if (zodiac !== undefined && zodiac !== null && zodiac !== '') {
      payload.zodiac = String(zodiac);
    }
    const response = await axios.post(`${API_URL}/vedicastro/getPrediction`, payload);
    return response.data?.data || response.data;
  } catch (error) {
    console.error('Error in fetchHoroscopePrediction (/vedicastro/getPrediction):', error);
    return null;
  }
}

/**
 * Maps multi-zodiac prediction response by zodiac number or sign id
 */
export function parseAllSignsPredictions(apiData: any): Record<string, ParsedPredictionData> {
  const result: Record<string, ParsedPredictionData> = {};
  if (!apiData) return result;

  const list = Array.isArray(apiData)
    ? apiData
    : Array.isArray(apiData?.data)
    ? apiData.data
    : Array.isArray(apiData?.predictions)
    ? apiData.predictions
    : Array.isArray(apiData?.response)
    ? apiData.response
    : null;

  if (list) {
    for (const item of list) {
      const zNum = item?.zodiac ? String(item.zodiac) : undefined;
      const parsed = parsePredictionResponse(item);
      if (zNum) {
        result[zNum] = parsed;
        const signId = ZODIAC_ID_BY_NUMBER[zNum];
        if (signId) {
          result[signId] = parsed;
        }
      }
    }
  } else if (typeof apiData === 'object') {
    // If it's a single prediction object or dictionary of predictions
    if (apiData?.zodiac || apiData?.response?.bot_response || apiData?.data?.response) {
      const zNum = apiData?.zodiac || apiData?.data?.zodiac;
      const parsed = parsePredictionResponse(apiData);
      if (zNum) {
        result[String(zNum)] = parsed;
        const signId = ZODIAC_ID_BY_NUMBER[String(zNum)];
        if (signId) result[signId] = parsed;
      }
    }

    for (const key of Object.keys(apiData)) {
      const val = apiData[key];
      if (val && typeof val === 'object') {
        const parsed = parsePredictionResponse(val);
        result[key] = parsed;
        if (ZODIAC_ID_BY_NUMBER[key]) {
          result[ZODIAC_ID_BY_NUMBER[key]] = parsed;
        }
      }
    }
  }

  return result;
}

/**
 * Safely extracts textual prediction from API response
 */
export function extractPredictionText(apiData: any, fallbackText: string = ''): string {
  if (!apiData) return fallbackText;
  if (typeof apiData === 'string' && apiData.trim()) return apiData.trim();

  // Actual API format: apiData.response.bot_response or apiData.data?.response?.bot_response
  const resObj = apiData.response || apiData.data?.response || apiData;
  const botRes = resObj?.bot_response || apiData?.bot_response;

  if (botRes) {
    if (typeof botRes.total_score?.split_response === 'string' && botRes.total_score.split_response.trim()) {
      return botRes.total_score.split_response.trim();
    }
    if (typeof botRes.overview?.split_response === 'string' && botRes.overview.split_response.trim()) {
      return botRes.overview.split_response.trim();
    }
    if (typeof botRes === 'string' && botRes.trim()) {
      return botRes.trim();
    }
  }

  const candidates = [
    resObj?.prediction,
    resObj?.overview,
    resObj?.description,
    apiData.prediction,
    apiData.bot_response,
    apiData.horoscope,
    apiData.overview,
    apiData.description,
    apiData.text,
    apiData.summary,
    apiData.predictionText,
    apiData.personal,
    apiData.general,
  ];

  for (const c of candidates) {
    if (typeof c === 'string' && c.trim()) {
      return c.trim();
    }
  }

  return fallbackText;
}

export interface YearlyPhaseData {
  phaseKey: string;
  phaseTitle: string;
  period: string;
  score: number;
  prediction: string;
  areas: {
    physique?: AreaItem;
    status?: AreaItem;
    finance?: AreaItem;
    relationship?: AreaItem;
    career?: AreaItem;
    travel?: AreaItem;
    family?: AreaItem;
    friends?: AreaItem;
    health?: AreaItem;
  };
}

export interface ParsedPredictionData {
  overviewText: string;
  totalScore?: number;
  totalScoreText?: string;
  luckyColor?: string;
  luckyColorCode?: string;
  luckyNumber?: string;
  yearlyPhases?: YearlyPhaseData[];
  areas?: {
    physique?: AreaItem;
    status?: AreaItem;
    finance?: AreaItem;
    relationship?: AreaItem;
    career?: AreaItem;
    travel?: AreaItem;
    family?: AreaItem;
    friends?: AreaItem;
    health?: AreaItem;
  };
}

export function parsePredictionResponse(apiData: any): ParsedPredictionData {
  const resObj = apiData?.response || apiData?.data?.response || apiData || {};
  const botRes = resObj.bot_response || apiData?.bot_response || {};

  let overviewText = extractPredictionText(apiData, '');
  let totalScore = typeof botRes?.total_score?.score === 'number' ? botRes.total_score.score : undefined;
  const totalScoreText = typeof botRes?.total_score?.split_response === 'string' ? botRes.total_score.split_response.trim() : undefined;

  const luckyColor = resObj.lucky_color || undefined;
  const luckyColorCode = resObj.lucky_color_code || undefined;
  const luckyNumber = Array.isArray(resObj.lucky_number)
    ? resObj.lucky_number.join(', ')
    : resObj.lucky_number !== undefined
    ? String(resObj.lucky_number)
    : undefined;

  const getStatusFromScore = (score: number) => {
    if (score >= 75) return 'Highly Favorable';
    if (score >= 50) return 'Moderate & Steady';
    if (score >= 30) return 'Requires Focus';
    return 'Exercise Caution';
  };

  const mapArea = (areaObj: any): AreaItem | undefined => {
    if (!areaObj) return undefined;
    const score = typeof areaObj?.score === 'number' ? areaObj.score : 0;
    const description = areaObj?.split_response || areaObj?.prediction || '';
    const status = getStatusFromScore(score);
    return { score, description, status };
  };

  // Parse Yearly Phases if present (phase_1, phase_2, phase_3, phase_4)
  const hasYearlyPhases = Boolean(resObj.phase_1 || resObj.phase_2 || resObj.phase_3 || resObj.phase_4);
  let yearlyPhases: YearlyPhaseData[] | undefined = undefined;

  if (hasYearlyPhases) {
    const mapPhase = (phaseKey: string, phaseTitle: string, phaseObj: any): YearlyPhaseData | undefined => {
      if (!phaseObj) return undefined;
      const pScore = typeof phaseObj.score === 'number' ? phaseObj.score : 50;
      const pPeriod = phaseObj.period || '';
      const pPrediction = phaseObj.prediction || '';
      const pAreas = {
        physique: mapArea(phaseObj.physique),
        status: mapArea(phaseObj.status),
        finance: mapArea(phaseObj.finances || phaseObj.finance),
        relationship: mapArea(phaseObj.relationship),
        career: mapArea(phaseObj.career),
        travel: mapArea(phaseObj.travel),
        family: mapArea(phaseObj.family),
        friends: mapArea(phaseObj.friends),
        health: mapArea(phaseObj.health),
      };
      return {
        phaseKey,
        phaseTitle,
        period: pPeriod,
        score: pScore,
        prediction: pPrediction,
        areas: pAreas,
      };
    };

    const p1 = mapPhase('phase_1', 'Phase 1', resObj.phase_1);
    const p2 = mapPhase('phase_2', 'Phase 2', resObj.phase_2);
    const p3 = mapPhase('phase_3', 'Phase 3', resObj.phase_3);
    const p4 = mapPhase('phase_4', 'Phase 4', resObj.phase_4);
    yearlyPhases = [p1, p2, p3, p4].filter((p): p is YearlyPhaseData => p !== undefined);

    if (yearlyPhases.length > 0) {
      if (!overviewText) {
        overviewText = yearlyPhases[0].prediction;
      }
      if (totalScore === undefined) {
        const avg = Math.round(yearlyPhases.reduce((sum, p) => sum + p.score, 0) / yearlyPhases.length);
        totalScore = avg;
      }
    }
  }

  const areas = hasYearlyPhases && yearlyPhases && yearlyPhases.length > 0
    ? yearlyPhases[0].areas
    : {
        physique: mapArea(botRes.physique),
        status: mapArea(botRes.status),
        finance: mapArea(botRes.finances || botRes.finance),
        relationship: mapArea(botRes.relationship),
        career: mapArea(botRes.career),
        travel: mapArea(botRes.travel),
        family: mapArea(botRes.family),
        friends: mapArea(botRes.friends),
        health: mapArea(botRes.health),
      };

  return {
    overviewText,
    totalScore,
    totalScoreText,
    luckyColor,
    luckyColorCode,
    luckyNumber,
    yearlyPhases,
    areas,
  };
}

export interface LuckyToday {
  color: string;
  colorCode?: string;
  number: number;
  mood: string;
  symbol: string;
  stone: string;
  auspiciousTime: string;
}

export interface AreaItem {
  score: number;
  status: string;
  description: string;
}

export interface AreaOfLife {
  physique: AreaItem;
  status: AreaItem;
  finance: AreaItem;
  relationship: AreaItem;
  career: AreaItem;
  travel: AreaItem;
  family: AreaItem;
  friends: AreaItem;
  health: AreaItem;
}

export interface OverallCosmicScore {
  score: number;
  grade: string;
  summary: string;
}

export interface SignHoroscope {
  id: string;
  name: string;
  hindiName: string;
  dateRange: string;
  ruler: string;
  element: string;
  overview: string;
  luckyToday: LuckyToday;
  areaOfLife: AreaOfLife;
  overallCosmicScore: OverallCosmicScore;
}

export interface HoroscopeDataStore {
  lastUpdated: string;
  displayDate: string;
  signs: Record<string, SignHoroscope>;
}

export interface TimeframeConfig {
  id?: string;
  slug: string;
  label: string;
  title: string;
  subTitle: string;
  periodDescription: string;
}

export const TIMEFRAMES: TimeframeConfig[] = [
  {
    id: 'daily',
    slug: 'daily-horoscope',
    label: 'Daily',
    title: 'Daily Horoscope Predictions',
    subTitle: 'Ancient Vedic Wisdom • Daily Mid-Night Gochar Updates',
    periodDescription: 'Vedic astrology forecast for Today.'
  },
  {
    id: 'weekly',
    slug: 'weekly-horoscope',
    label: 'Weekly',
    title: 'Weekly Horoscope',
    subTitle: 'Comprehensive 7-day planetary forecast and transit cycles',
    periodDescription: 'Cosmic outlook for this week.'
  },
  {
    id: 'monthly',
    slug: 'monthly-horoscope',
    label: 'Monthly',
    title: 'Monthly Horoscope',
    subTitle: 'Major planetary shifts, retrogrades and 30-day forecast',
    periodDescription: 'Cosmic overview for this month.'
  },
  {
    id: 'yearly',
    slug: 'yearly-horoscope',
    label: 'Yearly',
    title: 'Yearly Horoscope',
    subTitle: 'Annual transit roadmap: Jupiter, Saturn, Rahu & Ketu',
    periodDescription: 'Comprehensive astrological forecast for this year.'
  }
];

export interface ZodiacSignMeta {
  id: string;
  name: string;
  hindiName: string;
  dateRange: string;
  ruler: string;
  element: string;
}

export const ZODIAC_SIGNS_LIST: ZodiacSignMeta[] = [
  { id: 'aries', name: 'Aries', hindiName: 'Mesh', dateRange: 'Mar 21 - Apr 19', ruler: 'Mars', element: 'Fire' },
  { id: 'taurus', name: 'Taurus', hindiName: 'Vrishabh', dateRange: 'Apr 20 - May 20', ruler: 'Venus', element: 'Earth' },
  { id: 'gemini', name: 'Gemini', hindiName: 'Mithun', dateRange: 'May 21 - Jun 20', ruler: 'Mercury', element: 'Air' },
  { id: 'cancer', name: 'Cancer', hindiName: 'Kark', dateRange: 'Jun 21 - Jul 22', ruler: 'Moon', element: 'Water' },
  { id: 'leo', name: 'Leo', hindiName: 'Singh', dateRange: 'Jul 23 - Aug 22', ruler: 'Sun', element: 'Fire' },
  { id: 'virgo', name: 'Virgo', hindiName: 'Kanya', dateRange: 'Aug 23 - Sep 22', ruler: 'Mercury', element: 'Earth' },
  { id: 'libra', name: 'Libra', hindiName: 'Tula', dateRange: 'Sep 23 - Oct 22', ruler: 'Venus', element: 'Air' },
  { id: 'scorpio', name: 'Scorpio', hindiName: 'Vrishchik', dateRange: 'Oct 23 - Nov 21', ruler: 'Mars', element: 'Water' },
  { id: 'sagittarius', name: 'Sagittarius', hindiName: 'Dhanu', dateRange: 'Nov 22 - Dec 21', ruler: 'Jupiter', element: 'Fire' },
  { id: 'capricorn', name: 'Capricorn', hindiName: 'Makar', dateRange: 'Dec 22 - Jan 19', ruler: 'Saturn', element: 'Earth' },
  { id: 'aquarius', name: 'Aquarius', hindiName: 'Kumbh', dateRange: 'Jan 20 - Feb 18', ruler: 'Saturn', element: 'Air' },
  { id: 'pisces', name: 'Pisces', hindiName: 'Meen', dateRange: 'Feb 19 - Mar 20', ruler: 'Jupiter', element: 'Water' }
];

export function getZodiacSignMeta(signId: string): ZodiacSignMeta | undefined {
  const normalizedId = signId?.toLowerCase().trim();
  return ZODIAC_SIGNS_LIST.find(s => s.id === normalizedId);
}

export function getTimeframeConfig(rawSlug?: string): TimeframeConfig {
  const dailyDefault = TIMEFRAMES.find(t => t.slug === 'daily-horoscope') || TIMEFRAMES[0];
  if (!rawSlug) return dailyDefault;
  const slug = rawSlug.toLowerCase().trim();
  if (slug === 'today' || slug === 'today-horoscope' || slug === 'daily') {
    return dailyDefault;
  }
  const found = TIMEFRAMES.find(t => t.slug === slug);
  return found || dailyDefault;
}

export function isValidTimeframe(slug: string): boolean {
  if (!slug) return false;
  const s = slug.toLowerCase().trim();
  if (s === 'today' || s === 'today-horoscope' || s === 'daily') return true;
  return TIMEFRAMES.some(t => t.slug === s);
}

export function getSignHoroscopeForTimeframe(
  signId: string,
  timeframeSlug?: string
): (ZodiacSignMeta & { timeframe: TimeframeConfig }) | undefined {
  const meta = getZodiacSignMeta(signId);
  if (!meta) return undefined;
  const tf = getTimeframeConfig(timeframeSlug);
  return {
    ...meta,
    timeframe: tf,
  };
}
