import rawHoroscopeData from '../data/horoscopeData.json';

export interface LuckyToday {
  color: string;
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
  slug: string;
  label: string;
  title: string;
  subTitle: string;
  periodDescription: string;
}

export const TIMEFRAMES: TimeframeConfig[] = [
  {
    slug: 'yesterday-horoscope',
    label: 'Yesterday',
    title: "Yesterday's Horoscope",
    subTitle: 'Review of celestial transits and their energetic outcomes',
    periodDescription: 'Vedic planetary review for Yesterday.'
  },
  {
    slug: 'daily-horoscope',
    label: 'Daily',
    title: 'Daily Horoscope Predictions',
    subTitle: 'Ancient Vedic Wisdom • Daily Mid-Night Gochar Updates',
    periodDescription: 'Vedic astrology forecast for Today.'
  },
  {
    slug: 'tomorrow-horoscope',
    label: 'Tomorrow',
    title: "Tomorrow's Horoscope",
    subTitle: 'Plan ahead with upcoming lunar & planetary transits',
    periodDescription: 'Advance Vedic guidance for Tomorrow.'
  },
  {
    slug: 'weekly-horoscope',
    label: 'Weekly',
    title: 'Weekly Horoscope',
    subTitle: 'Comprehensive 7-day planetary forecast and transit cycles',
    periodDescription: 'Cosmic outlook for this week.'
  },
  {
    slug: 'monthly-horoscope',
    label: 'Monthly',
    title: 'Monthly Horoscope',
    subTitle: 'Major planetary shifts, retrogrades and 30-day forecast',
    periodDescription: 'Cosmic overview for this month.'
  },
  {
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
}

export const ZODIAC_SIGNS_LIST: ZodiacSignMeta[] = [
  { id: 'aries', name: 'Aries', hindiName: 'Mesh', dateRange: 'Mar 21 - Apr 19' },
  { id: 'taurus', name: 'Taurus', hindiName: 'Vrishabh', dateRange: 'Apr 20 - May 20' },
  { id: 'gemini', name: 'Gemini', hindiName: 'Mithun', dateRange: 'May 21 - Jun 20' },
  { id: 'cancer', name: 'Cancer', hindiName: 'Kark', dateRange: 'Jun 21 - Jul 22' },
  { id: 'leo', name: 'Leo', hindiName: 'Singh', dateRange: 'Jul 23 - Aug 22' },
  { id: 'virgo', name: 'Virgo', hindiName: 'Kanya', dateRange: 'Aug 23 - Sep 22' },
  { id: 'libra', name: 'Libra', hindiName: 'Tula', dateRange: 'Sep 23 - Oct 22' },
  { id: 'scorpio', name: 'Scorpio', hindiName: 'Vrishchik', dateRange: 'Oct 23 - Nov 21' },
  { id: 'sagittarius', name: 'Sagittarius', hindiName: 'Dhanu', dateRange: 'Nov 22 - Dec 21' },
  { id: 'capricorn', name: 'Capricorn', hindiName: 'Makar', dateRange: 'Dec 22 - Jan 19' },
  { id: 'aquarius', name: 'Aquarius', hindiName: 'Kumbh', dateRange: 'Jan 20 - Feb 18' },
  { id: 'pisces', name: 'Pisces', hindiName: 'Meen', dateRange: 'Feb 19 - Mar 20' }
];

export function getHoroscopeData(): HoroscopeDataStore {
  return rawHoroscopeData as unknown as HoroscopeDataStore;
}

export function getSignHoroscope(signId: string): SignHoroscope | undefined {
  const data = getHoroscopeData();
  const normalizedId = signId?.toLowerCase().trim();
  return data?.signs?.[normalizedId];
}

export function getTimeframeConfig(rawSlug?: string): TimeframeConfig {
  if (!rawSlug) return TIMEFRAMES[1]; // default to daily-horoscope
  const slug = rawSlug.toLowerCase().trim();
  if (slug === 'today' || slug === 'today-horoscope' || slug === 'daily') {
    return TIMEFRAMES[1];
  }
  const found = TIMEFRAMES.find(t => t.slug === slug);
  return found || TIMEFRAMES[1];
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
): (SignHoroscope & { timeframe: TimeframeConfig }) | undefined {
  const sign = getSignHoroscope(signId);
  if (!sign) return undefined;
  const tf = getTimeframeConfig(timeframeSlug);

  let overview = sign.overview;
  if (tf.slug === 'tomorrow-horoscope') {
    overview = `Looking ahead to tomorrow, planetary transits favor preparation, proactive communication, and strategic planning for ${sign.name} (${sign.hindiName}). Celestial alignment under ${sign.ruler} indicates renewed drive and clarity for your immediate goals.`;
  } else if (tf.slug === 'yesterday-horoscope') {
    overview = `Reflecting on yesterday's cosmic influences, ${sign.name} (${sign.hindiName}) experienced transits led by ${sign.ruler} that brought foundational lessons and closed pending cycles. Take forward the insights gained.`;
  } else if (tf.slug === 'weekly-horoscope') {
    overview = `Throughout this week, ${sign.name} (${sign.hindiName}) navigates a dynamic celestial cycle. Influence of ${sign.ruler} brings pivotal opportunities in work, relationships, and financial ventures. Trust your disciplined instincts.`;
  } else if (tf.slug === 'monthly-horoscope') {
    overview = `This month highlights expansive growth and stability for ${sign.name} (${sign.hindiName}). Key transits under ${sign.ruler} support long-term commitments, investments, and domestic harmony.`;
  } else if (tf.slug === 'yearly-horoscope') {
    overview = `The annual astrological trajectory for ${sign.name} (${sign.hindiName}) emphasizes major milestones, professional maturation, and spiritual grounding guided by the major planetary positions of ${sign.ruler}.`;
  }

  return {
    ...sign,
    overview,
    timeframe: tf
  };
}
