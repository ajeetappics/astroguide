import axios from 'axios';
import { AstrologerData } from '@/app/components/Card/AstrologerCard';
import { sanitizeImageUrl } from '@/utils/imageUtils';

export { sanitizeImageUrl };

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Formats name in Title Case (e.g., "soumya singh" -> "Soumya Singh")
 */
const formatName = (str: string): string => {
  if (!str) return "Astrologer";
  return str
    .split(' ')
    .map((word) =>
      word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : ''
    )
    .join(' ')
    .trim();
};

/**
 * Maps raw backend astrologer object to the UI AstrologerData structure
 */
export const mapAstroToCard = (raw: any): AstrologerData => {
  // Extract skills from expertise array and tag
  let skills: string[] = [];
  if (Array.isArray(raw.expertise)) {
    skills = raw.expertise
      .map((e: any) => (typeof e === 'string' ? e : e?.expertiseName))
      .filter(Boolean);
  } else if (Array.isArray(raw.skills)) {
    skills = raw.skills.filter(Boolean);
  }

  // Extract tag object
  let tag: { _id?: string; tagName: string } | undefined;
  if (raw.tag && typeof raw.tag === 'object' && raw.tag.tagName) {
    tag = {
      _id: raw.tag._id,
      tagName: String(raw.tag.tagName).trim(),
    };
  } else if (typeof raw.tag === 'string' && raw.tag.trim()) {
    tag = {
      tagName: raw.tag.trim(),
    };
  }

  // Filter out tag name from skills if already present
  if (tag?.tagName) {
    const tagLower = tag.tagName.toLowerCase();
    skills = skills.filter((s) => s.toLowerCase() !== tagLower);
  }

  if (skills.length === 0) {
    skills = [];
  }

  // Extract languages
  let languages = "";
  if (Array.isArray(raw.languages)) {
    const langs = raw.languages
      .map((l: any) => (typeof l === 'string' ? l : l?.languageName))
      .filter(Boolean);
    if (langs.length > 0) languages = langs.join(" • ");
  } else if (typeof raw.languages === 'string' && raw.languages.trim()) {
    languages = raw.languages;
  }

  // Extract experience - only from API
  let experience = '';
  if (raw.experience !== undefined && raw.experience !== null && String(raw.experience).trim()) {
    const rawExp = String(raw.experience).replace(/[^\d]/g, '');
    experience = rawExp ? `${rawExp} yrs exp` : String(raw.experience).trim();
  }

  // Extract current price (consultation fee - prefer offer rate, fallback to regular rate)
  let priceVal = 0;
  const currentPriceCandidates = [
    raw.chat?.offerPricePerMinute,
    raw.call?.offerPricePerMinute,
    raw.videoCall?.offerPricePerMinute,
    raw.chat?.ratePerMinute,
    raw.call?.ratePerMinute,
    raw.videoCall?.ratePerMinute,
    raw.price,
  ];
  for (const c of currentPriceCandidates) {
    const n = Number(c);
    if (!isNaN(n) && n > 0) {
      priceVal = n;
      break;
    }
  }
  const price = priceVal > 0 ? `₹${priceVal}` : '';

  // Extract scratch price (actual rate per minute from API before offer)
  // Exactly matching the logic on Astrologer Profile page
  let scratchVal = 0;
  const scratchCandidates = [
    raw.chat?.ratePerMinute,
    raw.call?.ratePerMinute,
    raw.videoCall?.ratePerMinute,
    raw.actualPrice,
    raw.originalPrice,
    raw.scratchPrice,
  ];
  for (const c of scratchCandidates) {
    const n = Number(c);
    if (!isNaN(n) && n > 0) {
      scratchVal = n;
      break;
    }
  }
  // Only set originalPrice if scratchVal is strictly greater than the discounted priceVal
  const originalPrice = scratchVal > priceVal ? scratchVal : undefined;

  // Extract rating (only if provided by API)
  let rating = '';
  if (raw.averageRating !== undefined && raw.averageRating !== null) {
    const avg = Number(raw.averageRating);
    if (!isNaN(avg) && avg > 0) {
      rating = avg.toFixed(1);
    }
  } else if (raw.rating) {
    rating = String(raw.rating);
  }

  // Extract total orders / calls (only if provided by API)
  let totalCalls = '';
  if (raw.totalCalls) {
    totalCalls = String(raw.totalCalls);
  } else if (raw.profileVisitCount !== undefined && raw.profileVisitCount !== null) {
    const count = Number(raw.profileVisitCount);
    if (!isNaN(count) && count >= 1000) {
      totalCalls = `${(count / 1000).toFixed(1)}k+`;
    } else if (!isNaN(count) && count > 0) {
      totalCalls = `${count}+`;
    }
  }

  // Status determination (Online = Green, Busy = Red, Offline = none)
  let status: 'online' | 'busy' | 'offline' = 'offline';
  const rawStatus = String(
    raw.status ||
    raw.onlineStatus ||
    raw.currentStatus ||
    raw.chatStatus ||
    raw.callStatus ||
    raw.chat?.status ||
    raw.call?.status ||
    ''
  ).toLowerCase();

  const isBusy = Boolean(
    raw.isBusy ||
    raw.busy ||
    raw.isChatBusy ||
    raw.isCallBusy ||
    raw.chat?.isBusy ||
    raw.call?.isBusy ||
    rawStatus === 'busy' ||
    rawStatus.includes('busy')
  );

  const isOnline = Boolean(
    raw.isOnline ||
    raw.online ||
    raw.isChatOnline ||
    raw.isCallOnline ||
    raw.chat?.isOnline ||
    raw.call?.isOnline ||
    rawStatus === 'online' ||
    rawStatus.includes('online') ||
    rawStatus === 'available'
  );

  if (isBusy) {
    status = 'busy';
  } else if (isOnline) {
    status = 'online';
  } else {
    status = 'offline';
  }

  // Safe image URL handling: check all potential backend fields
  const rawImg =
    raw.profileImg ||
    raw.profileImage ||
    raw.astroProfileImg ||
    raw.imageUrl ||
    raw.image ||
    raw.avatar ||
    raw.photo ||
    raw.basicInfo?.profileImg ||
    (Array.isArray(raw.photos) && raw.photos[0]) ||
    (Array.isArray(raw.basicInfo?.photos) && raw.basicInfo.photos[0]) ||
    '';
  const imageUrl = sanitizeImageUrl(rawImg, '');

  return {
    id: raw._id || raw.id || String(Math.random()),
    _id: raw._id || raw.id,
    slug: raw.slug || raw._id || raw.id,
    name: formatName(raw.fullName || raw.name),
    isVerified: raw.isOtpVerified ?? raw.isProfileCompleted ?? true,
    isCelebrity: Boolean(raw.isFeatured),
    tag,
    status,
    skills,
    languages,
    experience,
    rating,
    totalCalls,
    price,
    originalPrice,
    imageUrl,
  };
};

/**
 * Fetch astrologer list from GET API:
 */
export const fetchAstroList = async (
  page = 1,
  limit = 20,
  expertise?: string,
  search?: string
): Promise<{ astrologers: AstrologerData[]; total: number; totalPages: number; currentPage: number }> => {
  let url = `${API_URL}/user/astroList?page=${page}&limit=${limit}`;

  if (expertise && expertise.trim() !== '' && expertise.toLowerCase() !== 'all') {
    url += `&expertise=${encodeURIComponent(expertise.trim().toLowerCase())}`;
  }

  if (search && search.trim().length >= 3) {
    const q = encodeURIComponent(search.trim());
    url += `&fullName=${q}`;
  }

  try {
    const response = await axios.get(url);
    const resData = response.data;
    let rawList: any[] = [];

    if (Array.isArray(resData)) {
      rawList = resData;
    } else if (Array.isArray(resData?.data)) {
      rawList = resData.data;
    } else if (Array.isArray(resData?.data?.astrologers)) {
      rawList = resData.data.astrologers;
    } else if (Array.isArray(resData?.data?.docs)) {
      rawList = resData.data.docs;
    } else if (Array.isArray(resData?.data?.result)) {
      rawList = resData.data.result;
    } else if (Array.isArray(resData?.astrologers)) {
      rawList = resData.astrologers;
    } else if (Array.isArray(resData?.result)) {
      rawList = resData.result;
    }

    const astrologers = rawList.map(mapAstroToCard);
    const total =
      resData?.paginationDetail?.totalDocs ||
      resData?.data?.total ||
      resData?.total ||
      resData?.data?.totalCount ||
      astrologers.length;

    const totalPages =
      resData?.paginationDetail?.totalPages ||
      Math.ceil((total || astrologers.length) / limit) ||
      1;

    const currentPage =
      resData?.paginationDetail?.page ||
      page ||
      1;

    return { astrologers, total, totalPages, currentPage };
  } catch (error) {
    console.error("Error fetching astroList:", error);
    return { astrologers: [], total: 0, totalPages: 1, currentPage: 1 };
  }
};

/**
 * Fetch top astrologers from GET API:
 */
export const fetchTopAstrologers = async (): Promise<{ astrologers: AstrologerData[]; total: number }> => {
  const url = `${API_URL}/user/topAstrologers`;

  try {
    const response = await axios.get(url);
    const resData = response.data;
    let rawList: any[] = [];

    if (Array.isArray(resData)) {
      rawList = resData;
    } else if (Array.isArray(resData?.data)) {
      rawList = resData.data;
    } else if (Array.isArray(resData?.data?.astrologers)) {
      rawList = resData.data.astrologers;
    } else if (Array.isArray(resData?.data?.docs)) {
      rawList = resData.data.docs;
    } else if (Array.isArray(resData?.data?.result)) {
      rawList = resData.data.result;
    } else if (Array.isArray(resData?.astrologers)) {
      rawList = resData.astrologers;
    } else if (Array.isArray(resData?.result)) {
      rawList = resData.result;
    }

    const astrologers = rawList.map(mapAstroToCard);
    const total =
      resData?.paginationDetail?.totalDocs ||
      resData?.data?.total ||
      resData?.total ||
      astrologers.length;

    return { astrologers, total };
  } catch (error) {
    console.error("Error fetching topAstrologers:", error);
    // Fallback to fetchAstroList if topAstrologers fails
    return fetchAstroList(1, 5);
  }
};

/**
 * Fetch astrologer details by ID or Slug:
 */
export const fetchAstrologerById = async (idOrSlug: string): Promise<any> => {
  if (!idOrSlug) return null;
  const url = `${API_URL}/user/astro/${idOrSlug}`;

  try {
    const response = await axios.get(url);
    const resData = response.data;
    const astro = resData?.data || resData?.astrologer || resData;
    if (astro && typeof astro === 'object') {
      astro.isVerified = astro.isOtpVerified ?? astro.isProfileCompleted ?? true;
    }
    return astro;
  } catch (error) {
    console.error(`Error fetching astrologer details for ${idOrSlug}:`, error);
    return null;
  }
};

export const fetchAstrologerBySlug = fetchAstrologerById;

/**
 * Fetch astrologer reviews / session feedbacks:
 */
export const fetchAstrologerFeedbacks = async (
  id: string,
  page = 1,
  limit = 10
): Promise<any> => {
  if (!id) return null;
  const url = `${API_URL}/user/sessionfeedbacks/${id}?page=${page}&limit=${limit}`;

  try {
    const response = await axios.get(url);
    const resData = response.data;
    console.log(`[fetchAstrologerFeedbacks] API response for id ${id}:`, JSON.stringify(resData, null, 2));
    return resData?.data || resData;
  } catch (error) {
    console.error(`Error fetching feedbacks for astrologer id ${id}:`, error);
    return null;
  }
};

export interface ExpertiseItem {
  _id: string;
  expertiseName: string;
  expertiseIcon?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FetchExpertiseResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: ExpertiseItem[];
  paginationDetail?: {
    totalDocs: number;
    totalPages: number;
    page: number;
    limit: number;
  };
}

export interface ExpertiseCategory {
  _id: string;
  name: string;
  slug: string;
  icon: string;
  createdAt?: string;
  updatedAt?: string;
}

const DEFAULT_EXPERTISE_ICON = "https://storage.googleapis.com/astro-vani-storage/admin/1772532058726-career-path%20(2).png";

/**
 * Fetch astrologer expertise / categories from GET API:
 * GET ${API_URL}/user/expertise
 */
export const fetchExpertiseList = async (): Promise<ExpertiseCategory[]> => {
  try {
    const response = await axios.get<FetchExpertiseResponse>(`${API_URL}/user/expertise`);
    const resData = response.data;
    const rawList: ExpertiseItem[] = Array.isArray(resData?.data) ? resData.data : [];

    const categories: ExpertiseCategory[] = rawList
      .filter((item) => Boolean(item?.expertiseName?.trim()))
      .map((item) => {
        const name = item.expertiseName.trim();

        let icon = (item.expertiseIcon || '').trim();
        const mdMatch = icon.match(/\[.*?\]\((.*?)\)/);
        if (mdMatch && mdMatch[1]) {
          icon = mdMatch[1].trim();
        } else if (icon.startsWith('[') && icon.endsWith(']')) {
          icon = icon.slice(1, -1).trim();
        }

        const isValidUrl = icon.startsWith('http://') || icon.startsWith('https://') || icon.startsWith('/');
        const sanitizedIcon = isValidUrl ? sanitizeImageUrl(icon, DEFAULT_EXPERTISE_ICON) : DEFAULT_EXPERTISE_ICON;

        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        return {
          _id: item._id,
          name,
          slug,
          icon: sanitizedIcon,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      });

    return categories;
  } catch (error) {
    console.warn(`Error fetching expertise from ${API_URL}/user/expertise:`, error);
    return [];
  }
};



