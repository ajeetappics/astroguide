import axios from 'axios';
import { PujaData } from '@/app/components/Card/PoojaCard';
import { sanitizeImageUrl } from '@/utils/imageUtils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://preprod.api.astrovani-balaji.store';

/**
 * Maps raw backend Pooja object from /user/pooja to the PujaData UI structure
 */
export const mapPoojaToCard = (raw: any): PujaData => {
  const id = raw._id || raw.id || '';
  const slug = raw.slug || raw.poojaSlug || '';
  const title = raw.name || raw.title || raw.poojaName || 'Sacred Pooja';
  const description =
    raw.description ||
    raw.benefits ||
    raw.shortDescription ||
    'Experience authentic Vedic rituals performed by certified expert priests.';

  // Safe image formatting
  const rawImg = raw.image || raw.imageUrl || raw.bannerImage || raw.thumbnail || '/images/poojas/ganesha_pooja.jpg';
  const image = sanitizeImageUrl(rawImg);

  // Price formatting
  let priceVal = raw.basePrice ?? raw.price ?? raw.offerPrice ?? 1100;
  if (typeof priceVal === 'string') {
    priceVal = priceVal.replace(/[^\d.]/g, '') || '1100';
  }
  const numericPrice = Number(priceVal) || 1100;
  const price = `₹${numericPrice.toLocaleString('en-IN')}`;

  // Extract category or location if present
  let location = 'Sacred Vedic Rituals';
  if (Array.isArray(raw.categoryId) && raw.categoryId.length > 0) {
    const firstCat = raw.categoryId[0];
    location = typeof firstCat === 'string' ? firstCat : firstCat?.categoryName || location;
  } else if (typeof raw.category === 'string') {
    location = raw.category;
  } else if (raw.location) {
    location = raw.location;
  }

  // Date formatting
  const date = raw.date || (raw.createdAt ? new Date(raw.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }) : 'Daily Pooja');

  return {
    id,
    _id: raw._id || raw.id || '',
    slug,
    title,
    description,
    location,
    date,
    price,
    image,
    raw
  };
};

export interface FetchPoojaListResponse {
  poojas: PujaData[];
  total: number;
  totalPages: number;
  currentPage: number;
  rawList: any[];
}

/**
 * Fetch pooja list from API:
 * GET https://preprod.api.astrovani-balaji.store/user/pooja?page=1&limit=10
 */
export const fetchPoojaList = async (
  page = 1,
  limit = 10,
  categoryId?: string,
  search?: string
): Promise<FetchPoojaListResponse> => {
  try {
    let url = `${API_URL}/user/pooja?page=${page}&limit=${limit}`;
    if (categoryId && categoryId !== 'All' && categoryId.trim() !== '') {
      url += `&categoryId=${encodeURIComponent(categoryId)}`;
    }
    if (search && search.trim() !== '') {
      url += `&search=${encodeURIComponent(search)}`;
    }

    const response = await axios.get(url);
    const resData = response.data;

    let rawList: any[] = [];
    if (Array.isArray(resData?.data)) {
      rawList = resData.data;
    } else if (Array.isArray(resData?.data?.docs)) {
      rawList = resData.data.docs;
    } else if (Array.isArray(resData?.data?.poojas)) {
      rawList = resData.data.poojas;
    } else if (Array.isArray(resData?.data?.result)) {
      rawList = resData.data.result;
    } else if (Array.isArray(resData?.poojas)) {
      rawList = resData.poojas;
    } else if (Array.isArray(resData?.docs)) {
      rawList = resData.docs;
    } else if (Array.isArray(resData?.result)) {
      rawList = resData.result;
    } else if (Array.isArray(resData)) {
      rawList = resData;
    }

    const poojas = rawList.map(mapPoojaToCard);

    const total =
      resData?.paginationDetail?.totalDocs ||
      resData?.pagination?.totalDocs ||
      resData?.data?.totalDocs ||
      resData?.data?.total ||
      resData?.totalCount ||
      resData?.total ||
      poojas.length;

    const totalPages =
      resData?.paginationDetail?.totalPages ||
      resData?.pagination?.totalPages ||
      resData?.data?.totalPages ||
      Math.ceil((total || poojas.length) / limit) ||
      1;

    const currentPage =
      resData?.paginationDetail?.page ||
      resData?.pagination?.page ||
      resData?.data?.page ||
      page ||
      1;

    return {
      poojas,
      total,
      totalPages,
      currentPage,
      rawList
    };
  } catch (error) {
    console.error('Error fetching pooja list from /user/pooja:', error);
    return {
      poojas: [],
      total: 0,
      totalPages: 1,
      currentPage: page,
      rawList: []
    };
  }
};

/**
 * Fetch single pooja details by Slug:
 * GET https://preprod.api.astrovani-balaji.store/user/pooja/details/:slug
 */
export const fetchPoojaBySlug = async (slugOrId: string): Promise<any> => {
  if (!slugOrId) return null;
  try {
    const url = `${API_URL}/user/pooja/details/${encodeURIComponent(slugOrId)}`;
    const response = await axios.get(url);
    const resData = response.data;
    const result = resData?.data || resData?.pooja || resData?.result || resData;
    if (result && (result.name || result._id || result.title || result.slug)) {
      return result;
    }
  } catch (error) {
    console.warn(`Error fetching pooja details from /user/pooja/details/${slugOrId}, attempting fallback:`, error);
  }

  // Fallback to /user/pooja/:id in case an ID was passed and details/:slug did not match
  try {
    const fallbackUrl = `${API_URL}/user/pooja/${encodeURIComponent(slugOrId)}`;
    const response = await axios.get(fallbackUrl);
    const resData = response.data;
    return resData?.data || resData?.pooja || resData?.result || resData;
  } catch (error) {
    console.error(`Error fetching pooja details fallback for ${slugOrId}:`, error);
    return null;
  }
};

export const fetchPoojaById = fetchPoojaBySlug;

