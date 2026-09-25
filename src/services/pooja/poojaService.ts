import axios from 'axios';
import { PujaData } from '@/app/components/Card/PoojaCard';
import { sanitizeImageUrl } from '@/utils/imageUtils';
import {
  BannerSlide,
  extractHeroSlidesFromGroup,
  normalizeBannerRedirectUrl,
} from '@/services/banner/bannerService';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
  const rawImg = raw.image || raw.imageUrl || raw.bannerImage || raw.thumbnail || '';
  const image = rawImg ? sanitizeImageUrl(rawImg) : '';

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
    if (typeof firstCat === 'string') {
      const found = getCategoryByIdOrName(firstCat);
      location = found?.categoryName || firstCat;
    } else {
      location = firstCat?.categoryName || location;
    }
  } else if (typeof raw.category === 'string') {
    const found = getCategoryByIdOrName(raw.category);
    location = found?.categoryName || raw.category;
  } else if (raw.location) {
    location = raw.location;
  }

  // Extract tag name if present
  const tagName =
    raw.poojaTagId?.tagName ||
    raw.poojaTagId?.name ||
    raw.tag?.tagName ||
    raw.tag?.name ||
    raw.tagName ||
    (typeof raw.tag === 'string' ? raw.tag : '') ||
    '';

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
    tagName: tagName ? tagName.trim() : undefined,
    tag: raw.poojaTagId || raw.tag,
    raw
  };
};

export interface PoojaCategory {
  _id: string;
  categoryName: string;
  icon: string;
  isSpell?: boolean;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const SPELL_CATEGORY_ID = '6a69cccddc1a587997197f52';
export const SPELL_CATEGORY_IDS = ['6a69cccddc1a587997197f52', '6a686857feb441090fe5d031'];

export let poojaCategories: PoojaCategory[] = [];

/**
 * Fetch Pooja Categories from API:
 * GET /user/category?page=1&limit=10
 */
export const fetchPoojaCategories = async (
  page = 1,
  limit = 10
): Promise<PoojaCategory[]> => {
  try {
    const response = await axios.get(`${API_URL}/user/category?page=${page}&limit=${limit}`);
    const resData = response.data;
    let rawList: any[] = [];
    if (Array.isArray(resData?.data)) {
      rawList = resData.data;
    } else if (Array.isArray(resData?.data?.docs)) {
      rawList = resData.data.docs;
    } else if (Array.isArray(resData?.data?.categories)) {
      rawList = resData.data.categories;
    } else if (Array.isArray(resData?.categories)) {
      rawList = resData.categories;
    } else if (Array.isArray(resData?.docs)) {
      rawList = resData.docs;
    } else if (Array.isArray(resData?.result)) {
      rawList = resData.result;
    } else if (Array.isArray(resData)) {
      rawList = resData;
    }

    if (rawList && rawList.length > 0) {
      const mapped = rawList.map((item: any) => ({
        _id: item._id || item.id || '',
        categoryName: item.categoryName || item.name || item.title || 'Category',
        icon: item.icon || item.image || '',
        isSpell: Boolean(item.isSpell),
        isActive: item.isActive !== undefined ? item.isActive : true,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }));
      poojaCategories = mapped;
      return mapped;
    }
  } catch (error) {
    console.warn(`Error fetching pooja categories from ${API_URL}/user/category:`, error);
  }

  return poojaCategories;
};

export const getCategoryByIdOrName = (idOrName: string): PoojaCategory | undefined => {
  if (!idOrName) return undefined;
  const target = idOrName.toLowerCase().trim();

  // 1. Check if it matches dynamically fetched categories
  const found = poojaCategories.find(
    (c) => c._id.toLowerCase() === target || c.categoryName.toLowerCase() === target
  );
  if (found) return found;

  // 2. Spell category fallback: supports both 6a69cccddc1a587997197f52 and 6a686857feb441090fe5d031
  if (
    target === '6a69cccddc1a587997197f52' ||
    target === '6a686857feb441090fe5d031' ||
    target === 'spell'
  ) {
    const matchedId =
      target === '6a686857feb441090fe5d031'
        ? '6a686857feb441090fe5d031'
        : '6a69cccddc1a587997197f52';

    return {
      _id: matchedId,
      categoryName: "Spell",
      icon: "https://storage.googleapis.com/astro-vani-storage/admin/1786110486872-Spell.png",
      createdAt: "2026-07-29T09:50:05.364Z",
      updatedAt: "2026-08-07T13:48:07.258Z",
      isSpell: true,
      isActive: true
    };
  }

  return undefined;
};

export interface PaginationDetail {
  totalDocs: number;
  totalPages: number;
  page: number;
  limit: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: number | null;
  nextPage?: number | null;
}

export interface FetchPoojaListResponse {
  poojas: PujaData[];
  title?: string,
  total: number;
  totalPages: number;
  currentPage: number;
  paginationDetail: PaginationDetail;
  rawList: any[];
}

/**
 * Fetch pooja list from API:
 * - Category filter: GET /user/pooja/category/${categoryId}?page=1&limit=10
 * - All: GET /user/pooja?page=1&limit=10
 */
export const fetchPoojaList = async (
  page = 1,
  limit = 15,
  categoryId?: string,
  search?: string
): Promise<FetchPoojaListResponse> => {
  try {
    let url: string;
    const hasCategory = categoryId && categoryId !== 'All' && categoryId.trim() !== '';

    if (hasCategory) {
      url = `${API_URL}/user/pooja/category/${encodeURIComponent(categoryId)}?page=${page}&limit=${limit}`;
    } else {
      url = `${API_URL}/user/pooja?page=${page}&limit=${limit}`;
    }

    if (search && search.trim().length >= 3) {
      const q = encodeURIComponent(search.trim());
      url += `&poojaName=${q}&search=${q}`;
    }

    let response: any;
    try {
      response = await axios.get(url);
    } catch (apiErr) {
      // If /user/pooja/category/${categoryId} failed, fallback to /user/pooja?categoryId=...
      if (hasCategory) {
        let fallbackUrl = `${API_URL}/user/pooja?page=${page}&limit=${limit}&categoryId=${encodeURIComponent(categoryId)}`;
        if (search && search.trim().length >= 3) {
          const q = encodeURIComponent(search.trim());
          fallbackUrl += `&poojaName=${q}&search=${q}`;
        }
        response = await axios.get(fallbackUrl);
      } else {
        throw apiErr;
      }
    }

    const resData = response?.data;

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
      Number(resData?.paginationDetail?.totalDocs) ||
      Number(resData?.pagination?.totalDocs) ||
      Number(resData?.data?.totalDocs) ||
      Number(resData?.data?.total) ||
      Number(resData?.totalPoojaCount) ||
      Number(resData?.totalCount) ||
      Number(resData?.total) ||
      poojas.length;

    const totalPages =
      Number(resData?.paginationDetail?.totalPages) ||
      Number(resData?.pagination?.totalPages) ||
      Number(resData?.data?.totalPages) ||
      (limit > 0 ? Math.ceil(total / limit) : 1) ||
      1;

    const currentPage =
      Number(resData?.paginationDetail?.page) ||
      Number(resData?.paginationDetail?.currentPage) ||
      Number(resData?.pagination?.page) ||
      Number(resData?.data?.page) ||
      Number(page) ||
      1;

    const hasPrevPage =
      typeof resData?.paginationDetail?.hasPrevPage === 'boolean'
        ? resData.paginationDetail.hasPrevPage
        : currentPage > 1;

    const hasNextPage =
      typeof resData?.paginationDetail?.hasNextPage === 'boolean'
        ? resData.paginationDetail.hasNextPage
        : currentPage < totalPages;

    const paginationDetail: PaginationDetail = {
      totalDocs: total,
      totalPages: totalPages,
      page: currentPage,
      limit: Number(resData?.paginationDetail?.limit) || limit,
      hasPrevPage,
      hasNextPage,
      prevPage: resData?.paginationDetail?.prevPage ?? (hasPrevPage ? currentPage - 1 : null),
      nextPage: resData?.paginationDetail?.nextPage ?? (hasNextPage ? currentPage + 1 : null),
    };

    return {
      poojas,
      total,
      totalPages,
      currentPage,
      paginationDetail,
      rawList
    };
  } catch (error) {
    console.error('Error fetching pooja list from /user/pooja:', error);
    return {
      poojas: [],
      total: 0,
      totalPages: 1,
      currentPage: page,
      paginationDetail: {
        totalDocs: 0,
        totalPages: 1,
        page: page,
        limit: limit,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null,
      },
      rawList: []
    };
  }
};

/**
 * Generic helper to fetch custom pooja list endpoints (trending, recommended, negative-energy-removal, etc.)
 */
const fetchPoojaCustomEndpoint = async (
  endpoint: string,
  page = 1,
  limit = 15,
  defaultTitle = "trending"
): Promise<FetchPoojaListResponse> => {
  try {
    const url = `${API_URL}/user/pooja/${endpoint}?page=${page}&limit=${limit}`;
    const response = await axios.get(url);
    const resData = response?.data;

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
    const title = resData?.title || defaultTitle;
    const total =
      Number(resData?.paginationDetail?.totalDocs) ||
      Number(resData?.pagination?.totalDocs) ||
      Number(resData?.data?.totalDocs) ||
      Number(resData?.data?.total) ||
      Number(resData?.totalPoojaCount) ||
      Number(resData?.totalCount) ||
      Number(resData?.total) ||
      poojas.length;

    const totalPages =
      Number(resData?.paginationDetail?.totalPages) ||
      Number(resData?.pagination?.totalPages) ||
      Number(resData?.data?.totalPages) ||
      (limit > 0 ? Math.ceil(total / limit) : 1) ||
      1;

    const currentPage =
      Number(resData?.paginationDetail?.page) ||
      Number(resData?.paginationDetail?.currentPage) ||
      Number(resData?.pagination?.page) ||
      Number(resData?.data?.page) ||
      Number(page) ||
      1;

    const hasPrevPage =
      typeof resData?.paginationDetail?.hasPrevPage === 'boolean'
        ? resData.paginationDetail.hasPrevPage
        : currentPage > 1;

    const hasNextPage =
      typeof resData?.paginationDetail?.hasNextPage === 'boolean'
        ? resData.paginationDetail.hasNextPage
        : currentPage < totalPages;

    const paginationDetail: PaginationDetail = {
      totalDocs: total,
      totalPages,
      page: currentPage,
      limit: Number(resData?.paginationDetail?.limit) || limit,
      hasPrevPage,
      hasNextPage,
      prevPage: resData?.paginationDetail?.prevPage ?? (hasPrevPage ? currentPage - 1 : null),
      nextPage: resData?.paginationDetail?.nextPage ?? (hasNextPage ? currentPage + 1 : null),
    };

    return {
      poojas,
      title,
      total,
      totalPages,
      currentPage,
      paginationDetail,
      rawList,
    };
  } catch (error) {
    console.error(`Error fetching poojas from /user/pooja/${endpoint}:`, error);
    return {
      poojas: [],
      title: defaultTitle,
      total: 0,
      totalPages: 1,
      currentPage: page,
      paginationDetail: {
        totalDocs: 0,
        totalPages: 1,
        page: page,
        limit: limit,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null,
      },
      rawList: []
    };
  }
};

/**
 * Fetch trending poojas:
 * GET /user/pooja/trending?page=1&limit=15
 */
export const fetchTrendingPoojas = (page = 1, limit = 15): Promise<FetchPoojaListResponse> =>
  fetchPoojaCustomEndpoint('trending', page, limit, 'Trending Poojas');

/**
 * Fetch recommended poojas:
 * GET /user/pooja/recommended?page=1&limit=15
 */
export const fetchRecommendedPoojas = (page = 1, limit = 15): Promise<FetchPoojaListResponse> =>
  fetchPoojaCustomEndpoint('recommended', page, limit, 'Recommended Poojas');

/**
 * Fetch negative energy removal poojas:
 * GET /user/pooja/negative-energy-removal?page=1&limit=15
 */
export const fetchNegativeEnergyPoojas = (page = 1, limit = 15): Promise<FetchPoojaListResponse> =>
  fetchPoojaCustomEndpoint('negative-energy-removal', page, limit, 'Negative Energy Removal');

export let resolvedSpellCategoryId: string | null = null;

/**
 * Fetch spell list from API:
 * GET /user/pooja/category/${SPELL_CATEGORY_ID}?page=1&limit=10
 * Supports both Spell category IDs: 6a69cccddc1a587997197f52 and 6a686857feb441090fe5d031
 */
export const fetchSpellList = async (
  page = 1,
  limit = 10,
  search?: string
): Promise<FetchPoojaListResponse> => {
  if (resolvedSpellCategoryId) {
    return fetchPoojaList(page, limit, resolvedSpellCategoryId, search);
  }

  // Check if a dynamic spell category exists in poojaCategories
  const dynamicSpell = poojaCategories.find(
    (c) =>
      c.isSpell ||
      c.categoryName.toLowerCase() === 'spell' ||
      c._id === '6a69cccddc1a587997197f52' ||
      c._id === '6a686857feb441090fe5d031'
  );

  const primaryId = dynamicSpell?._id || SPELL_CATEGORY_ID;
  const res = await fetchPoojaList(page, limit, primaryId, search);
  if (res.poojas && res.poojas.length > 0) {
    resolvedSpellCategoryId = primaryId;
    return res;
  }

  // Fallback to alternate spell category ID if primary returned no results
  const alternateId =
    primaryId === '6a69cccddc1a587997197f52'
      ? '6a686857feb441090fe5d031'
      : '6a69cccddc1a587997197f52';
  const altRes = await fetchPoojaList(page, limit, alternateId, search);
  if (altRes.poojas && altRes.poojas.length > 0) {
    resolvedSpellCategoryId = alternateId;
    return altRes;
  }

  return res;
};

/**
 * Fetch single pooja details by Slug:
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

export interface PoojaBannerResponse {
  heroSlides: BannerSlide[];
  webHeroSlides: BannerSlide[];
  mobileHeroSlides: BannerSlide[];
}

/**
 * Fetch Pooja Banners from API:
 */
export const fetchPoojaBanners = async (): Promise<PoojaBannerResponse> => {
  try {
    const response = await axios.get(`${API_URL}/user/pooja-banner`);
      const resData = response.data;
      let rawList: any[] = [];

      if (Array.isArray(resData?.data)) {
        rawList = resData.data;
      } else if (Array.isArray(resData?.banners)) {
        rawList = resData.banners;
      } else if (Array.isArray(resData?.data?.banners)) {
        rawList = resData.data.banners;
      } else if (Array.isArray(resData?.data?.docs)) {
        rawList = resData.data.docs;
      } else if (Array.isArray(resData?.result)) {
        rawList = resData.result;
      } else if (Array.isArray(resData)) {
        rawList = resData;
      }

      if (rawList && rawList.length > 0) {
        const webGroup =
          rawList.find((b: any) => b.bannerType === 'forWeb') ||
          rawList[0];

        const mobileGroup =
          rawList.find((b: any) => b.bannerType === 'forMobileView') ||
          rawList.find((b: any) => b.bannerType === 'forMobile');

        const webHeroSlides = extractHeroSlidesFromGroup(webGroup);
        const mobileHeroSlides = extractHeroSlidesFromGroup(mobileGroup);

        if (webHeroSlides.length === 0 && mobileHeroSlides.length === 0) {
          const directSlides: BannerSlide[] = rawList
            .map((item: any) => {
              if (typeof item === 'string') {
                return { imageUrl: sanitizeImageUrl(item), href: '#' };
              }
              const img =
                item.imageUrl ||
                item.image ||
                item.bannerImage ||
                item.banner ||
                item.url ||
                '';
              const href = normalizeBannerRedirectUrl(
                item.redirectionUrl,
                item.redirectFor,
                item.poojaId,
                item._id
              );
              return {
                imageUrl: sanitizeImageUrl(img),
                href,
                redirectFor: item.redirectFor,
                poojaId: item.poojaId,
                _id: item._id,
                slug: item.redirectFor === 'shastriji' ? 'shastriji' : undefined,
              };
            })
            .filter((s) => Boolean(s.imageUrl));

          return {
            heroSlides: directSlides,
            webHeroSlides: directSlides,
            mobileHeroSlides: directSlides,
          };
        }

      return {
        heroSlides: webHeroSlides.length > 0 ? webHeroSlides : mobileHeroSlides,
        webHeroSlides,
        mobileHeroSlides,
      };
    }
  } catch (error) {
    console.warn(`Error fetching pooja banners from ${API_URL}/user/pooja-banner:`, error);
  }

  return {
    heroSlides: [],
    webHeroSlides: [],
    mobileHeroSlides: [],
  };
};

export { fetchPoojaToggle, type PoojaToggleResponse } from '@/services/appConfig/appConfigService';

