import axios from 'axios';
import { sanitizeImageUrl } from '@/utils/imageUtils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://preprod.api.astrovani-balaji.store';

export interface BannerRedirectionItem {
  imageUrl: string;
  redirectFor?: string;
  _id?: string;
  poojaId?: string | null;
  redirectionUrl?: string;
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
}

export interface HomeBannerResponse {
  heroSlides: HomeHeroSlide[];
  webHeroSlides: HomeHeroSlide[];
  mobileHeroSlides: HomeHeroSlide[];
  consultationBanners: ConsultationBannerItem[];
  serviceBanners: ServiceBannerItem[];
  topBanners: string[];
}

/**
 * Normalizes backend banner redirect URLs to internal Next.js application routes
 */
export const normalizeBannerRedirectUrl = (
  rawUrl?: string,
  redirectFor?: string,
  poojaId?: string | null
): string => {
  if (!rawUrl && !redirectFor) return '#';

  let clean = (rawUrl || '').trim();

  // Strip markdown link format: [url](url)
  const mdMatch = clean.match(/\[.*?\]\((.*?)\)/);
  if (mdMatch && mdMatch[1]) {
    clean = mdMatch[1].trim();
  }

  // Strip external backend host if present
  try {
    if (clean.startsWith('http://') || clean.startsWith('https://')) {
      const parsed = new URL(clean);
      if (
        parsed.hostname.includes('astrovani') ||
        parsed.hostname.includes('balaji') ||
        parsed.hostname.includes('preprod.api')
      ) {
        clean = parsed.pathname + parsed.search;
      }
    }
  } catch {}

  // Map known backend redirects to frontend routes
  if (clean.includes('/pooja-listing') || redirectFor === 'pooja_listing') {
    return '/pooja';
  }
  if (clean.includes('/pooja-details/') || redirectFor === 'pooja_details') {
    const id = poojaId || clean.split('/pooja-details/')[1]?.replace(/[^\w-]/g, '');
    return id ? `/pooja/${id}` : '/pooja';
  }
  if (clean.includes('/shastriji') || redirectFor === 'shastriji') {
    return '/astrologers';
  }
  if (clean.includes('/connect') || redirectFor === 'connect_page') {
    return '/astrologers';
  }
  if (clean.includes('/add-money') || redirectFor === 'recharge_pack') {
    return '/astrologers';
  }
  if (clean.includes('/services') || redirectFor === 'services') {
    return '/services';
  }

  return clean || '#';
};

/**
 * Helper to extract hero slides from banner group
 */
const extractHeroSlidesFromGroup = (group: any): HomeHeroSlide[] => {
  if (!group) return [];
  const heroSlides: HomeHeroSlide[] = [];
  const redirections: BannerRedirectionItem[] = Array.isArray(group.heroBannersRedirection)
    ? group.heroBannersRedirection
    : [];
  const heroBanners: string[] = Array.isArray(group.heroBanners)
    ? group.heroBanners
    : [];

  if (redirections.length > 0) {
    redirections.forEach((item) => {
      let img = (item.imageUrl || '').trim();
      const mdMatch = img.match(/\[.*?\]\((.*?)\)/);
      if (mdMatch && mdMatch[1]) {
        img = mdMatch[1].trim();
      }
      const sanitizedImg = sanitizeImageUrl(img);
      const href = normalizeBannerRedirectUrl(item.redirectionUrl, item.redirectFor, item.poojaId);
      heroSlides.push({
        imageUrl: sanitizedImg,
        href,
        redirectFor: item.redirectFor,
        poojaId: item.poojaId,
      });
    });
  } else if (heroBanners.length > 0) {
    heroBanners.forEach((raw) => {
      let img = (raw || '').trim();
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
 * GET https://preprod.api.astrovani-balaji.store/user/banner
 */
export const fetchHomeBanners = async (): Promise<HomeBannerResponse> => {
  const urls = [
    `${API_URL}/user/banner`,
    `https://preprod.api.astrovani-balaji.store/user/banner`,
  ];

  for (const url of urls) {
    try {
      const response = await axios.get(url);
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
          dataList.find((b: any) => b.bannerType === 'forMobile') ||
          dataList.find((b: any) => b.bannerType === 'forMobileView');

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
      console.warn(`Error fetching banners from ${url}:`, error);
    }
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
