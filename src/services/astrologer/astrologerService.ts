import axios from 'axios';
import { AstrologerData } from '@/app/components/Card/AstrologerCard';
import { sanitizeImageUrl } from '@/utils/imageUtils';

export { sanitizeImageUrl };

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://preprod.api.astrovani-balaji.store';

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

  // Include tag name if present and not already in skills
  if (raw.tag?.tagName && typeof raw.tag.tagName === 'string') {
    const tagName = raw.tag.tagName.trim();
    if (tagName && !skills.some((s) => s.toLowerCase() === tagName.toLowerCase())) {
      skills.unshift(tagName);
    }
  }

  if (skills.length === 0) {
    skills = ["Vedic", "Astrology"];
  }

  // Extract languages
  let languages = "Hindi • English";
  if (Array.isArray(raw.languages)) {
    const langs = raw.languages
      .map((l: any) => (typeof l === 'string' ? l : l?.languageName))
      .filter(Boolean);
    if (langs.length > 0) languages = langs.join(" • ");
  } else if (typeof raw.languages === 'string' && raw.languages.trim()) {
    languages = raw.languages;
  }

  // Extract experience
  const rawExp = String(raw.experience || '5').replace(/[^\d]/g, '');
  const experience = rawExp ? `${rawExp} yrs exp` : "5 yrs exp";

  // Extract price (prefer offer rate, fallback to actual rate)
  let priceVal = 25;
  const priceCandidates = [
    raw.chat?.offerPricePerMinute,
    raw.call?.offerPricePerMinute,
    raw.chat?.ratePerMinute,
    raw.call?.ratePerMinute,
    raw.videoCall?.offerPricePerMinute,
    raw.videoCall?.ratePerMinute,
    raw.price,
  ];

  for (const c of priceCandidates) {
    const n = Number(c);
    if (!isNaN(n) && n > 0) {
      priceVal = n;
      break;
    }
  }
  const price = `₹${priceVal}`;

  // Extract rating (API returns averageRating e.g. 5, 4.05, 0)
  let rating = "5.0";
  if (raw.averageRating !== undefined && raw.averageRating !== null) {
    const avg = Number(raw.averageRating);
    if (!isNaN(avg) && avg > 0) {
      rating = avg.toFixed(1);
    }
  } else if (raw.rating) {
    rating = String(raw.rating);
  }

  // Extract total orders / calls from profileVisitCount or totalCalls
  let totalCalls = "1k+";
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

  // Safe image URL handling
  const rawImg = raw.profileImg || raw.imageUrl || raw.avatar;
  const imageUrl = sanitizeImageUrl(rawImg);

  return {
    id: raw._id || raw.id || String(Math.random()),
    _id: raw._id || raw.id,
    slug: raw.slug || raw._id || raw.id,
    name: formatName(raw.fullName || raw.name),
    isVerified: raw.isOtpVerified ?? raw.isProfileCompleted ?? true,
    isCelebrity: Boolean(raw.isFeatured),
    skills,
    languages,
    experience,
    rating,
    totalCalls,
    price,
    imageUrl,
  };
};

/**
 * Fetch astrologer list from GET API:
 * https://preprod.api.astrovani-balaji.store/user/astroList?page=1&limit=...&expertise=...
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

  if (search && search.trim() !== '') {
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
 * https://preprod.api.astrovani-balaji.store/user/topAstrologers
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
    return fetchAstroList(1, 10);
  }
};

/**
 * Fetch astrologer details by ID or Slug:
 * GET https://preprod.api.astrovani-balaji.store/user/astro/:idOrSlug
 */
export const fetchAstrologerById = async (idOrSlug: string): Promise<any> => {
  if (!idOrSlug) return null;
  const url = `${API_URL}/user/astro/${idOrSlug}`;

  try {
    const response = await axios.get(url);
    const resData = response.data;
    return resData?.data || resData?.astrologer || resData;
  } catch (error) {
    console.error(`Error fetching astrologer details for ${idOrSlug}:`, error);
    return null;
  }
};

export const fetchAstrologerBySlug = fetchAstrologerById;

/**
 * Fetch astrologer reviews / session feedbacks:
 * GET https://preprod.api.astrovani-balaji.store/user/sessionfeedbacks/:id?page=1&limit=10
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
    return resData?.data || resData;
  } catch (error) {
    console.error(`Error fetching feedbacks for astrologer id ${id}:`, error);
    return null;
  }
};



