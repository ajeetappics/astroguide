// src/services/astoProfileApi.ts
import axios from "axios";
import { store } from "@/store/store"; // To get token for authenticated requests
import { AllFormData } from "@/store/slices/astroOnboardingSlice";
import { loginSuccess } from "@/store/slices/authSlice";
import { RegisterFormInputs } from "@/app/components/onboarding/RegisterForm";
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
    headers["Authorization"] = `Bearer ${token}`;
  }
  return { headers };
};

/**
 * Updates the astrologer's profile.
 * This function takes the entire formData from the Redux slice and maps it to the backend schema.
 * @param payload - The complete formData object from the Redux onboarding state.
 */
const updateAstroProfile = async (id: string, payload: AllFormData): Promise<any> => {
  const url = `${API_URL}/user/profile/${id}`;

  // --- STEP 1: UPLOAD ALL FILES AND GET THEIR URLS (Corrected Logic) ---

  const [
    aadharImgUrls,
    panCardImgUrl,
    profileImgUrl,
    photosUrls,
    videosUrls,
    photoGalleryUrls,
    certificateGalleryUrls,
    certificatesUrls,
    gstCertificateUrl,
  ] = await Promise.all([
    payload.verification?.idProofType === 'Aadhar Card' ? payload.verification.idProofs || [] : [],
    payload.verification?.idProofType === 'PAN Card' ? payload.verification.idProofs?.[0] || null : null,
    payload.basicInfo?.profileImg || null,
    payload.basicInfo?.photos || [],
    payload.basicInfo?.videos || [],
    payload.basicInfo?.galleryPhotos || [],
    payload.basicInfo?.certificateGallery || [],
    payload.professionalDetails?.certifications || [],
    payload.professionalDetails?.gstCertificate?.[0] || null,
  ]);


  // --- STEP 2: CONSTRUCT THE FINAL JSON PAYLOAD (With Blank Data Filtering) ---

  const jsonPayload: { [key: string]: any } = {};
  const { verification, professionalDetails, availability, basicInfo } = payload;

  // --- Helper function to add non-blank values to the payload ---
  const addField = (key: string, value: any) => {
    // Check for null, undefined, empty strings, and empty arrays
    if (value !== null && value !== undefined && value !== '' && !(Array.isArray(value) && value.length === 0)) {
      jsonPayload[key] = value;
    }
  };

  // --- Verification Data ---
  if (verification) {
    addField("fullName", verification.fullName);
    addField("email", verification.email);
    addField("mobileNumber", verification.mobileNumber);
    addField("city", verification.city?.label);
    addField("state", verification.state?.label);
    addField("address", verification.address);
    addField("aadharNo", verification.aadharNo);
    addField("pincode", verification.pincode);
    addField("panCardNo", verification.pencardNo);
    addField("aadharImg", aadharImgUrls);
    addField("panCardImg", panCardImgUrl);
  }

  // --- Basic Info & Media ---
  if (basicInfo) {
    addField("profileBio", basicInfo.bio);
    addField("profileImg", profileImgUrl);
    addField("photos", photosUrls);
    addField("videos", videosUrls);
    addField("photoGallery", photoGalleryUrls);
    addField("certificateGallery", certificateGalleryUrls);
  }

  // --- Professional Details ---
  if (professionalDetails) {
    addField("qualification", professionalDetails.qualification);
    addField("experience", professionalDetails.experience);
    addField("gstNo", professionalDetails.gstNo);
    addField("languages", professionalDetails.languages);
    addField("expertise", professionalDetails.expertise);
    addField("certificates", certificatesUrls);
    addField("gstCertificate", gstCertificateUrl);
  }

  // --- Availability & Pricing ---
  if (availability) {
    const backendAvailability: { [key: string]: any[] } = {};
    if (availability.schedule) {
      Object.entries(availability.schedule).forEach(([day, details]) => {
        if (details.isActive && details.startTime && details.endTime) {
          backendAvailability[day.toLowerCase()] = [{
            startTime: details.startTime,
            endTime: details.endTime,
            status: true,
          }];
        }
      });
    }
    // Only add availability if it's not an empty object
    if (Object.keys(backendAvailability).length > 0) {
      jsonPayload.availability = backendAvailability;
    }

    // Only add rate objects if they have a valid rate
    if (availability.prices?.Chat?.actual) jsonPayload.chat = { actualRate: availability.prices.Chat.actual, offerRate: availability.prices.Chat.offer };
    if (availability.prices?.Call?.actual) jsonPayload.call = { actualRate: availability.prices.Call.actual, offerRate: availability.prices.Call.offer };
    if (availability.prices?.Video?.actual) jsonPayload.videoCall = { actualRate: availability.prices.Video.actual, offerRate: availability.prices.Video.offer };
  }


  // --- STEP 3: SEND THE JSON REQUEST ---

  // Check if there is anything to update
  if (Object.keys(jsonPayload).length === 0) {
    console.log("No new data to update. Skipping API call.");
    return Promise.resolve({ message: "No changes to submit." });
  }

  console.log("Submitting CLEANED payload:", jsonPayload);

  try {
    const response = await axios.patch(url, jsonPayload, getAuthHeaders(false));
    return response.data;
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to update profile.");
  }
};


const registerAstro = async (payload: AllFormData): Promise<any> => {
  const url = `${API_URL}/user/register`;

  // --- STEP 1: UPLOAD ALL FILES AND GET THEIR URLS (Corrected Logic) ---

  const [
    aadharImgUrls,
    panCardImgUrl,
    profileImgUrl,
    photosUrls,
    videosUrls,
    photoGalleryUrls,
    certificateGalleryUrls,
    certificatesUrls,
    gstCertificateUrl,
  ] = await Promise.all([
    payload.verification?.idProofType === 'Aadhar Card' ? payload.verification.idProofs || [] : [],
    payload.verification?.idProofType === 'PAN Card' ? payload.verification.idProofs?.[0] || null : null,
    payload.basicInfo?.profileImg || null,
    payload.basicInfo?.photos || [],
    payload.basicInfo?.videos || [],
    payload.basicInfo?.galleryPhotos || [],
    payload.basicInfo?.certificateGallery || [],
    payload.professionalDetails?.certifications || [],
    payload.professionalDetails?.gstCertificate?.[0] || null,
  ]);


  const jsonPayload: { [key: string]: any } = {};
  const { verification, professionalDetails, availability, basicInfo } = payload;

  // Helper to add non-blank values to the payload
  const addField = (obj: any, key: string, value: any) => {
    if (value !== null && value !== undefined && value !== '' && !(Array.isArray(value) && value.length === 0)) {
      obj[key] = value;
    }
  };

  // --- Main Fields ---
  addField(jsonPayload, "fullName", verification?.fullName);
  addField(jsonPayload, "email", verification?.email);
  addField(jsonPayload, "mobileNumber", verification?.mobileNumber);
  addField(jsonPayload, "gender", verification?.gender);
  addField(jsonPayload, "address", verification?.address); // Note: Backend seems to want a simple address string
  addField(jsonPayload, "city", verification?.city?.label);
  addField(jsonPayload, "state", verification?.state?.label);
  addField(jsonPayload, "pincode", verification?.pincode);
  addField(jsonPayload, "aadharNo", verification?.aadharNo);
  addField(jsonPayload, "panCardNo", verification?.pencardNo);
  addField(jsonPayload, "profileBio", basicInfo?.bio);
  addField(jsonPayload, "qualification", professionalDetails?.qualification);
  addField(jsonPayload, "experience", professionalDetails?.experience);
  addField(jsonPayload, "gstNo", professionalDetails?.gstNo);

  // --- File URL Fields ---
  addField(jsonPayload, "aadharImg", aadharImgUrls);
  addField(jsonPayload, "panCardImg", panCardImgUrl);
  addField(jsonPayload, "profileImg", profileImgUrl);
  addField(jsonPayload, "photos", photosUrls);
  addField(jsonPayload, "videos", videosUrls);
  addField(jsonPayload, "photoGallery", photoGalleryUrls);
  addField(jsonPayload, "certificateGallery", certificateGalleryUrls);
  addField(jsonPayload, "certificates", certificatesUrls);
  addField(jsonPayload, "gstCertificate", gstCertificateUrl);

  // --- Array Fields (like languages, expertise) ---
  addField(jsonPayload, "languages", professionalDetails?.languages);
  addField(jsonPayload, "expertise", professionalDetails?.expertise);

  // --- Nested Object Fields: Availability & Pricing ---
  if (availability) {
    // Availability Schedule
    const backendAvailability: { [key: string]: any[] } = {
      monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: [], default: []
    };
    if (availability.schedule) {
      Object.entries(availability.schedule).forEach(([day, details]) => {
        if (details.isActive && details.startTime && details.endTime) {
          backendAvailability[day.toLowerCase()] = [{
            startTime: details.startTime,
            endTime: details.endTime,
            status: true,
          }];
        }
      });
    }
    jsonPayload.availability = backendAvailability; // Always add the availability object, even if empty

    // Pricing: Create nested objects for each mode
    const chatRate: { [key: string]: any } = {};
    const callRate: { [key: string]: any } = {};
    const videoRate: { [key: string]: any } = {};

    addField(chatRate, "ratePerMinute", availability.prices?.Chat?.actual);
    addField(chatRate, "offerPricePerMinute", availability.prices?.Chat?.offer);

    addField(callRate, "ratePerMinute", availability.prices?.Call?.actual);
    addField(callRate, "offerPricePerMinute", availability.prices?.Call?.offer);

    addField(videoRate, "ratePerMinute", availability.prices?.Video?.actual);
    addField(videoRate, "offerPricePerMinute", availability.prices?.Video?.offer);

    if (Object.keys(chatRate).length > 0) jsonPayload.chat = chatRate;
    if (Object.keys(callRate).length > 0) jsonPayload.call = callRate;
    if (Object.keys(videoRate).length > 0) jsonPayload.videoCall = videoRate;
  }

  // Add bankDetails if you collect them, ensuring it's an object
  // jsonPayload.bankDetails = { accountNumber: "...", bankName: "..." };

  console.log("Submitting FINAL payload:", JSON.stringify(jsonPayload, null, 2));

  try {
    const response = await axios.post(url, jsonPayload, getAuthHeaders(false));
    return response.data;
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to register profile.");
  }
};




// Mapper function to transform backend response to frontend state
const mapBackendToFrontend = (backendData: any): AllFormData => {
  // Helper to download a file from a URL and return a File object
  // Note: This is an advanced use case. For simplicity, we will start by just storing URLs.
  // If you truly need File objects, this part would need to be implemented.
  // For now, we will map image URLs to a structure that can be displayed.

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const initialSchedule = days.reduce((acc, day) => {
    const dayCapitalized = day.charAt(0).toUpperCase() + day.slice(1);
    acc[dayCapitalized] = { isActive: false, startTime: '', endTime: '' };
    return acc;
  }, {} as { [key: string]: { isActive: boolean; startTime: string; endTime: string } });

  const schedule = backendData.availability ? days.reduce((acc, day) => {
    const dayCapitalized = day.charAt(0).toUpperCase() + day.slice(1);
    const daySchedule = backendData.availability[day];
    if (daySchedule && daySchedule.length > 0 && daySchedule[0].status) {
      acc[dayCapitalized] = {
        isActive: true,
        startTime: daySchedule[0].startTime || '',
        endTime: daySchedule[0].endTime || '',
      };
    }
    return acc;
  }, initialSchedule) : initialSchedule;

  return {
    verification: {
      fullName: backendData.fullName || '',
      mobileNumber: backendData.mobileNumber || '',
      email: backendData.email || '',
      gender: '', // Note: Backend does not provide gender, default to empty
      city: backendData.city ? { value: backendData.city, label: backendData.city } : undefined,
      state: backendData.state ? { value: backendData.state, label: backendData.state } : undefined,
      country: undefined, // Note: Backend does not provide country
      address: backendData.address || '',
      idProofType: backendData.panCardNo ? "PAN Card" : "Aadhar Card", // Infer based on available data
      idProofs: [], // We cannot reconstruct File objects from URLs
    },
    professionalDetails: {
      qualification: backendData.qualification || '',
      // Map array of language objects to an array of string IDs
      languages: backendData.languages?.map((lang: any) => lang._id) || [],
      // Map array of expertise objects to an array of string IDs
      expertise: backendData.expertise?.map((exp: any) => exp._id) || [],
      experience: backendData.experience || '',
      gstNo: backendData.gstNo || '',
      gstCertificate: [], // Cannot reconstruct File
      certifications: [], // Cannot reconstruct File
    },
    availability: {
      // Map enabled services to the 'modes' array
      modes: [
        ...(backendData.isChatEnabled ? ["Chat"] : []),
        ...(backendData.isCallEnabled ? ["Call"] : []),
        ...(backendData.videoCall ? ["Video"] : []), // Assuming video call presence implies enabled
        // 'Report' mode is not in the backend response
      ],
      prices: {
        Chat: {
          actual: String(backendData.chat?.ratePerMinute || ''),
          offer: String(backendData.chat?.offerPricePerMinute || ''),
        },
        Call: {
          actual: String(backendData.call?.ratePerMinute || ''),
          offer: String(backendData.call?.offerPricePerMinute || ''),
        },
        Video: {
          actual: String(backendData.videoCall?.ratePerMinute || ''),
          offer: String(backendData.videoCall?.offerPricePerMinute || ''),
        },
      },
      schedule: schedule,
      selectAll: false, // Default value, cannot be determined from backend
      globalStartTime: '', // Default value
      globalEndTime: '', // Default value
    },
    basicInfo: {
      dob: '', // Note: Backend does not provide DOB
      bio: backendData.profileBio || '',
      // We cannot reconstruct File objects. We can store URLs if needed, but the form expects Files.
      // For now, we initialize them as empty/null.
      profileImg: null,
      photos: [],
      videos: [],
      galleryPhotos: [],
      certificateGallery: [],
    },
    agreement: {
      agreeToTerms: true, // If the profile exists, assume they agreed
    },
  };
};

/**
 * Fetches the astrologer's profile and maps it to the frontend's AllFormData structure.
 */
const getAstroProfile = async (idastroId: string): Promise<AllFormData> => {
  const url = `${API_URL}/user/profile/${idastroId}
`; // Use your actual GET endpoint
  try {
    const response = await axios.get(url, getAuthHeaders());

    if (response.data && response.data.success) {
      // Transform the raw backend data into the structure our frontend expects
      return mapBackendToFrontend(response.data.data);
    } else {
      throw new Error(response.data.message || "Failed to fetch profile.");
    }
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch profile.");
  }
};


export interface UserRegisterPayload {
  fullName: string;
  email: string;
  mobileNumber: string;
  city: string; // Correctly typed as string
  state: string; // Correctly typed as string
  // country: string; // Correctly typed as string
  address: string;
  dob: string;
  timeOfBirth: string;
  gender: string;
  // location: {};
  profileImg?: string;
}


const userRegister = async (payload: UserRegisterPayload): Promise<any> => { // <-- FIX: Use the new specific payload type
  const url = `${API_URL}/user/register`;
  const { profileImg, ...body } = payload;

  try {
    // If there is a profileImg, send the whole payload, otherwise send the body without the undefined profileImg
    const response = await axios.post(url, profileImg ? payload : body, getAuthHeaders(false));
    return response.data;
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to register user.");
  }
};



const astoProfileApi = {
  userRegister,
  registerAstro,
  updateAstroProfile,
  getAstroProfile
};

export default astoProfileApi;