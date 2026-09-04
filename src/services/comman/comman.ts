// src/services/common/common.ts

import { store } from "@/store/store";
import axios, { AxiosError } from "axios";
// Retrieve the base API URL from environment variables for flexibility
// Fallback to prevent undefined errors - UPDATE THIS WITH YOUR ACTUAL API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper to get headers with Authorization token
const getAuthHeaders = (isMultipart: boolean = false) => {
    const token = store.getState().auth.token;
    const headers: { [key: string]: string } = {};

    if (!isMultipart) {
        headers["Content-Type"] = "application/json";
    }
    // For multipart/form-data, we let axios set the Content-Type with the boundary

    if (token) {
        headers["Authorization"] = `${token}`;
        // headers["Authorization"] = `Bearer ${token}`;
    }
    return { headers };
};
// Define the expected structure of a successful API response
interface UploadSuccessResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: {
        img: any;
        imageUrl: string;
    };
}

interface ApiErrorResponse {
    message: string;
}

const uploadImage = async (
    files: File | File[]
): Promise<UploadSuccessResponse> => {
    const url = `${API_URL}/user/uploadImg`;
    const formData = new FormData();

    // ✅ Handle both single and multiple files
    if (Array.isArray(files)) {
        files.forEach(file => {
            formData.append('file', file);
        }); // 👈 backend key "files"
    } else {
        formData.append("file", files); // 👈 backend key "file"
    }

    const token = store.getState().auth.token;
    const headers: { [key: string]: string } = {
        "Content-Type": "multipart/form-data",
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    try {
        const response = await axios.post<UploadSuccessResponse>(url, formData, {
            headers,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const serverError = error.response?.data as ApiErrorResponse;
            throw new Error(
                serverError?.message || "An unknown error occurred during file upload."
            );
        }
        throw new Error("An unexpected error occurred.");
    }
};


export interface Language {
    _id: string;
    languageName: string; // Assuming the name field is 'languageName'
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    // Add other properties if they exist
}
export interface FetchLanguagesResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: Language[];
}

const fetchLanguages = async (): Promise<FetchLanguagesResponse> => {
    const url = `${API_URL}/astro/language`;

    try {
        const response = await axios.get<FetchLanguagesResponse>(url, {
            ...getAuthHeaders(), // Pass headers directly
            // params: { page, limit },
        });

        return response.data;

    } catch (error) {
        // Handle errors robustly
        if (axios.isAxiosError(error)) {
            const serverError = error.response?.data;
            throw new Error(serverError?.message || 'Failed to fetch languages.');
        }
        throw new Error('An unexpected error occurred while fetching languages.');
    }
};

export interface Skill {
    _id: string;
    expertiseName: string; // Assuming the name field is 'skillName'
    // Add other properties if they exist, for example:
    expertiseIcon: string;
    createdAt: string;
    updatedAt: string;
}
export interface FetchSkillsResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: Skill[];
    // pagination: PaginationInfo;
}


const fetchSkills = async (): Promise<FetchSkillsResponse> => {
    const url = `${API_URL}/astro/expertise`;

    try {
        // Make the GET request with Axios.
        // The `params` object will be automatically converted to query parameters (?page=1&limit=10)
        const response = await axios.get<FetchSkillsResponse>(url, {
            ...getAuthHeaders(),
            // params: { page, limit },
        });

        return response.data;

    } catch (error) {
        // Handle errors robustly
        if (axios.isAxiosError(error)) {
            const serverError = error.response?.data;
            throw new Error(serverError?.message || 'Failed to fetch skills.');
        }
        throw new Error('An unexpected error occurred while fetching skills.');
    }
};


export interface FetchExperienceLevelsResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: string[]; // The data is an array of experience levels
}

// Describes a potential error response from the API
interface ApiErrorResponse {
    message: string;
}
const fetchExperienceLevels = async (): Promise<FetchExperienceLevelsResponse> => {
    const url = `${API_URL}/astro/experience`;

    try {
        // This is a public endpoint, so no authentication headers are needed.
        const response = await axios.get<FetchExperienceLevelsResponse>(url);

        return response.data;

    } catch (error) {
        // Handle errors robustly
        if (axios.isAxiosError(error)) {
            const serverError = error.response?.data as ApiErrorResponse;
            throw new Error(serverError?.message || 'Failed to fetch experience levels.');
        }
        throw new Error('An unexpected error occurred while fetching experience levels.');
    }
};

export type StaticPageSlug = 'about_us' | 'privacy_policy' | 'refund_policy' | 'terms_conditions';

// Describes the structure of the data object for a single static page
export interface StaticPage {
    title: any;
    _id: string;
    pageName: string;
    content: string; // Assuming the main content is in a field named 'content'
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    // Add any other properties returned by the API
}

export interface FetchStaticPageResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: StaticPage; // The data is a single object, not an array
}

// Describes a potential error response from the API
interface ApiErrorResponse {
    message: string;
}

// =========================================================================
// --- THE REUSABLE FETCH FUNCTION ---
// =========================================================================

/**
 * Fetches the content of a static page by its slug.
 * This single function handles all static page requests like 'about_us', 'privacy_policy', etc.
 *
 * @param {StaticPageSlug} slug - The identifier for the page to fetch.
 * @returns {Promise<FetchStaticPageResponse>} A promise that resolves with the static page's content.
 * @throws {Error} Throws a custom error with a user-friendly message on failure.
 */
const fetchStaticPage = async (slug: StaticPageSlug): Promise<FetchStaticPageResponse> => {
    // The cURL's `--data ''` suggests a POST, but fetching data is typically a GET.
    // We will use GET as it's the standard. If the backend requires POST, change `axios.get` to `axios.post`.
    const url = `${API_URL}/astro/staticPage/${slug}`;

    try {
        // Since no authentication is specified in the cURL, we make a simple public request.
        const response = await axios.get<FetchStaticPageResponse>(url);

        return response.data;

    } catch (error) {
        // Handle errors robustly
        if (axios.isAxiosError(error)) {
            const serverError = error.response?.data as ApiErrorResponse;
            throw new Error(serverError?.message || `Failed to fetch the '${slug}' page.`);
        }
        throw new Error(`An unexpected error occurred while fetching the '${slug}' page.`);
    }
};

// --- Service Object Export ---
const commonService = {
    uploadImage,
    fetchSkills,
    fetchStaticPage,
    fetchLanguages,
    fetchExperienceLevels,
};

export default commonService;