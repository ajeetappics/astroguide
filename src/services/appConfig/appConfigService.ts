export interface PoojaToggleResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data?: {
    isEnabled?: boolean;
  };
}

let cachedPoojaToggle: { isEnabled: boolean; timestamp: number } | null = null;
const CACHE_TTL_MS = 30 * 1000; // 30 seconds cache

/**
 * Fetch Pooja toggle status from backend:
 * GET ${API_URL}/user/appConfig/poojaToggle
 * Returns boolean (true = pooja enabled, false = pooja disabled)
 */
export const fetchPoojaToggle = async (): Promise<boolean> => {
  // Return cached result if valid
  if (cachedPoojaToggle && Date.now() - cachedPoojaToggle.timestamp < CACHE_TTL_MS) {
    return cachedPoojaToggle.isEnabled;
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${baseUrl}/user/appConfig/poojaToggle`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      console.warn(`[fetchPoojaToggle] Received status ${res.status} from ${url}`);
      return cachedPoojaToggle ? cachedPoojaToggle.isEnabled : true;
    }

    const json: PoojaToggleResponse = await res.json();
    const isEnabled = typeof json?.data?.isEnabled === 'boolean' ? json.data.isEnabled : true;
    
    cachedPoojaToggle = { isEnabled, timestamp: Date.now() };
    return isEnabled;
  } catch (error) {
    console.error('[fetchPoojaToggle] Error fetching pooja toggle status:', error);
    return cachedPoojaToggle ? cachedPoojaToggle.isEnabled : true;
  }
};
