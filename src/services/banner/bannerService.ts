import axios from 'axios';
import { sanitizeImageUrl } from '@/utils/imageUtils';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface BannerRedirectionItem {
  imageUrl?: string;
  image?: string;
  redirectFor?: string;
  _id?: string;
  poojaId?: string | null;
  redirectionUrl?: string;
  slug?: string;
  shastrijiSlug?: string;
  shastriSlug?: string;
  astroSlug?: string;
  astrologerSlug?: string;
  shastriji?: any;
}

export interface ConsultationBannerItem {
  imageFor: string;
  imageUrl: string;
  _id?: string;
}

export interface ServiceBannerItem {
  imageFor: string;
  imageUrl: string;
  _id?: string;
}

export interface HomeHeroSlide {
  imageUrl: string;
  href?: string;
  redirectFor?: string;
  poojaId?: string | null;
  _id?: string;
  slug?: string;
}

export type BannerSlide = HomeHeroSlide;

export interface HomeBannerResponse {
  heroSlides: HomeHeroSlide[];
  webHeroSlides: HomeHeroSlide[];
  mobileHeroSlides: HomeHeroSlide[];
  consultationBanners: ConsultationBannerItem[];
  serviceBanners: ServiceBannerItem[];
  topBanners: string[];
}

/**
 * Normalizes backend banner redirect URLs to internal Next.js application routes:
 * 1: "shastriji" -> astrologer detail page using shastriji slug (fallback to _id) (/astrologers/:slugOrId)
 * 2: "connect_page" -> astrologer listing page (/astrologers)
 * 3: "pooja_listing" -> pooja listing page (/pooja)
 * 4: "pooja_details" -> pooja detail page with poojaId (/pooja/:poojaId)
 * Baki ke liye kuch nahi krna h -> '#'
 */
export const normalizeBannerRedirectUrl = (
  rawUrl?: string,
  redirectFor?: string,
  poojaId?: string | null,
  id?: string | null,
  slug?: string | null
): string => {
  const rf = (redirectFor || '').trim().toLowerCase();

  // 1: "redirectFor": "shastriji" -> astrologer detail page using shastriji slug (or fallback to _id)
  if (rf === 'shastriji') {
    return `/astrologers/shashtriji`;
  }

  // 2: "redirectFor": "connect_page" -> astrologer listing page
  if (rf === 'connect_page') {
    return '/astrologers';
  }

  // 3: "redirectFor": "pooja_listing" -> pooja listing page
  if (rf === 'pooja_listing') {
    return '/pooja';
  }

  // 4: "redirectFor": "pooja_details" -> pooja detail page with poojaId
  if (rf === 'pooja_details') {
    let pId = (poojaId || '').trim();
    if (!pId && rawUrl && rawUrl.includes('/pooja-details/')) {
      pId = rawUrl.split('/pooja-details/')[1]?.split('?')[0]?.replace(/[^\w-]/g, '');
    }
    return pId ? `/pooja/${pId}` : '/pooja';
  }

  // Baki ke liye kuch nahi krna h
  return '#';
};

/**
 * Helper to extract hero slides from banner group
 */
export const extractHeroSlidesFromGroup = (group: any): HomeHeroSlide[] => {
  if (!group) return [];
  const heroSlides: HomeHeroSlide[] = [];
  const redirections: BannerRedirectionItem[] = Array.isArray(group.heroBannersRedirection)
    ? group.heroBannersRedirection
    : [];
  const heroBanners: any[] = Array.isArray(group.heroBanners)
    ? group.heroBanners
    : [];

  if (redirections.length > 0) {
    redirections.forEach((item) => {
      let img = (item.imageUrl || item.image || '').trim();
      const mdMatch = img.match(/\[.*?\]\((.*?)\)/);
      if (mdMatch && mdMatch[1]) {
        img = mdMatch[1].trim();
      }
      const sanitizedImg = sanitizeImageUrl(img);

      const shastriSlug =
        item.shastrijiSlug ||
        item.slug ||
        item.shastriSlug ||
        item.astroSlug ||
        item.astrologerSlug ||
        (typeof item.shastriji === 'string' ? item.shastriji : item.shastriji?.slug) ||
        '';

      const href = normalizeBannerRedirectUrl(
        item.redirectionUrl,
        item.redirectFor,
        item.poojaId,
        item._id,
        shastriSlug
      );
      heroSlides.push({
        imageUrl: sanitizedImg,
        href,
        redirectFor: item.redirectFor,
        poojaId: item.poojaId,
        _id: item._id,
        slug: shastriSlug || undefined,
      });
    });
  } else if (heroBanners.length > 0) {
    heroBanners.forEach((raw: any) => {
      let img = (typeof raw === 'string' ? raw : raw?.imageUrl || raw?.image || '').trim();
      const mdMatch = img.match(/\[.*?\]\((.*?)\)/);
      if (mdMatch && mdMatch[1]) {
        img = mdMatch[1].trim();
      }
      heroSlides.push({
        imageUrl: sanitizeImageUrl(img),
        href: '#',
      });
    });
  }
  return heroSlides;
};

/**
 * Fetch Home Banners from API:
 */
export const fetchHomeBanners = async (): Promise<HomeBannerResponse> => {
  try {
    const response = await axios.get(`${API_URL}/user/banner`);
      const resData = response.data;
      let dataList: any[] = [];

      if (Array.isArray(resData?.data)) {
        dataList = resData.data;
      } else if (Array.isArray(resData)) {
        dataList = resData;
      }

      if (dataList && dataList.length > 0) {
        const webGroup =
          dataList.find((b: any) => b.bannerType === 'forWeb') ||
          dataList[0];

        const mobileGroup =
          dataList.find((b: any) => b.bannerType === 'forMobileView') ||
          dataList.find((b: any) => b.bannerType === 'forMobile');

        const webHeroSlides = extractHeroSlidesFromGroup(webGroup);
        const mobileHeroSlides = extractHeroSlidesFromGroup(mobileGroup);

        const consultationBanners: ConsultationBannerItem[] = Array.isArray(webGroup?.consultationBanners) && webGroup.consultationBanners.length > 0
          ? webGroup.consultationBanners
          : Array.isArray(mobileGroup?.consultationBanners)
            ? mobileGroup.consultationBanners
            : [];

        const serviceBanners: ServiceBannerItem[] = Array.isArray(webGroup?.serviceBanners) && webGroup.serviceBanners.length > 0
          ? webGroup.serviceBanners
          : Array.isArray(mobileGroup?.serviceBanners)
            ? mobileGroup.serviceBanners
            : [];

        const topBanners: string[] = Array.isArray(webGroup?.topBanner) && webGroup.topBanner.length > 0
          ? webGroup.topBanner.map((b: string) => sanitizeImageUrl(b))
          : Array.isArray(mobileGroup?.topBanner)
            ? mobileGroup.topBanner.map((b: string) => sanitizeImageUrl(b))
            : [];

        return {
          heroSlides: webHeroSlides.length > 0 ? webHeroSlides : mobileHeroSlides,
          webHeroSlides,
          mobileHeroSlides,
          consultationBanners,
          serviceBanners,
          topBanners,
        };
    }
  } catch (error) {
    console.warn(`Error fetching banners from ${API_URL}/user/banner:`, error);
  }

  return {
    heroSlides: [],
    webHeroSlides: [],
    mobileHeroSlides: [],
    consultationBanners: [],
    serviceBanners: [],
    topBanners: [],
  };
};
