import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://preprod.api.astrovani-balaji.store';

export interface AstroReviewItem {
  _id: string;
  createdAt: string;
  updatedAt?: string;
  rating: number;
  appointmentId?: string | null;
  intakeFormId?: string | null;
  userProfileImg?: string;
  userFullName?: string;
  astroProfileImg?: string;
  astroFullName?: string;
  astrologerId?: string;
  message?: string;
}

export interface FetchAstroReviewsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: AstroReviewItem[];
  pagination?: {
    page: number;
    limit: number;
    totalDocs: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

/**
 * Fetch Astrologer reviews for Home page User reviews section:
 * GET ${API_URL}/user/astroReviews
 */
export const fetchAstroReviews = async (page = 1, limit = 50): Promise<AstroReviewItem[]> => {
  try {
    const response = await axios.get<FetchAstroReviewsResponse>(
      `${API_URL}/user/astroReviews`,
      {
        params: { page, limit },
      }
    );

    const data = response.data?.data;
    if (Array.isArray(data)) {
      return data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching astro reviews from /user/astroReviews:', error);
    return [];
  }
};
