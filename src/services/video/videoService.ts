import axios from 'axios';
import { sanitizeImageUrl } from '@/utils/imageUtils';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface CelebrityVideoItem {
  id: string;
  _id: string;
  title: string;
  videoUrl: string;
  videoId?: string;
  embedUrl: string;
  thumbnail: string;
  views?: number;
  likes?: number;
  status?: boolean;
  isVideoDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  description?: string;
  raw?: any;
}

export interface FetchCelebrityVideosResponse {
  videos: CelebrityVideoItem[];
  mainTitle?: string;
  totalDocs?: number;
  totalPages?: number;
}

/**
 * Maps raw backend video object from /admin/video API to CelebrityVideoItem
 */
export const mapVideoItem = (item: any, index = 0): CelebrityVideoItem => {
  const id = item._id || item.id || `video-${index}`;
  const title = item.title || item.name || item.videoTitle || 'Celebrity Spotlight';

  let rawUrl = (item.videoUrl || item.video || item.videoLink || item.url || item.mediaUrl || item.link || '').trim();
  // Strip markdown link formatting if URL is wrapped like [url](url)
  const mdMatch = rawUrl.match(/\[.*?\]\((.*?)\)/);
  if (mdMatch && mdMatch[1]) {
    rawUrl = mdMatch[1].trim();
  }

  // Resolve videoId
  let videoId = item.videoId || '';
  if (!videoId && rawUrl) {
    const match = rawUrl.match(/(?:embed\/|v\/|watch\?v=|youtu\.be\/|\/v\/)([^?&#\s]+)/);
    if (match && match[1]) {
      videoId = match[1];
    }
  }

  // Generate YouTube Embed URL
  let embedUrl = rawUrl;
  if (videoId) {
    embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  } else if (rawUrl.includes('youtube.com') || rawUrl.includes('youtu.be')) {
    embedUrl = rawUrl.includes('autoplay')
      ? rawUrl
      : `${rawUrl}${rawUrl.includes('?') ? '&' : '?'}autoplay=1`;
  }

  // Resolve Thumbnail
  let rawThumbnail =
    item.thumbnail ||
    item.thumbUrl ||
    item.image ||
    item.imageUrl ||
    item.bannerImage ||
    item.poster ||
    item.coverImage ||
    '';

  if (!rawThumbnail && videoId) {
    rawThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  const thumbnail = rawThumbnail ? sanitizeImageUrl(rawThumbnail, '') : '';

  return {
    id,
    _id: id,
    title,
    videoUrl: rawUrl || embedUrl,
    videoId,
    embedUrl,
    thumbnail,
    views: item.views ?? 0,
    likes: item.likes ?? 0,
    status: item.status !== undefined ? Boolean(item.status) : true,
    isVideoDeleted: Boolean(item.isVideoDeleted),
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    description: item.description || '',
    raw: item,
  };
};

/**
 * Fetch Celebrity Videos from API:
 * GET https://preprod.api.astrovani-balaji.store/admin/video?page=1&limit=10
 */
export const fetchCelebrityVideos = async (
  page = 1,
  limit = 10
): Promise<FetchCelebrityVideosResponse> => {
  try {
    const response = await axios.get(`${API_URL}/admin/video?page=${page}&limit=${limit}`);
    const resData = response.data;
    let rawList: any[] = [];

    if (Array.isArray(resData?.data)) {
      rawList = resData.data;
    } else if (Array.isArray(resData?.data?.docs)) {
      rawList = resData.data.docs;
    } else if (Array.isArray(resData?.data?.videos)) {
      rawList = resData.data.videos;
    } else if (Array.isArray(resData?.videos)) {
      rawList = resData.videos;
    } else if (Array.isArray(resData?.docs)) {
      rawList = resData.docs;
    } else if (Array.isArray(resData?.result)) {
      rawList = resData.result;
    } else if (Array.isArray(resData)) {
      rawList = resData;
    }

    if (rawList && rawList.length > 0) {
      // Filter out soft-deleted items
      const activeList = rawList.filter((item: any) => !item.isVideoDeleted && item.status !== false);
      const listToMap = activeList.length > 0 ? activeList : rawList;
      const videos = listToMap.map((item, index) => mapVideoItem(item, index));

      return {
        videos,
        mainTitle: resData?.mainTitle,
        totalDocs: resData?.paginationDetail?.totalDocs || videos.length,
        totalPages: resData?.paginationDetail?.totalPages || 1,
      };
    }
  } catch (error) {
    console.warn(`Error fetching videos from ${API_URL}/admin/video:`, error);
  }

  return {
    videos: [],
    mainTitle: 'Celebrity Spotlight',
    totalDocs: 0,
    totalPages: 1,
  };
};
