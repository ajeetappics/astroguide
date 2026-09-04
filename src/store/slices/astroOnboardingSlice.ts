import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Note: Storing File objects in Redux is generally discouraged because they are not serializable.
// This will work for in-session navigation but will be lost on page reload.
// The store middleware is configured to ignore serialization warnings for these specific fields.
export interface AllFormData {
    verification?: {
        fullName: string;
        mobileNumber: string;
        email?: string;
        gender: string;
        country?: { value: string; label: string };
        state?: { value: string; label: string };
        city?: { value: string; label: string };
        address: string;
        idProofType: string;
        idProofs: File[]; // Kept for in-session state
        aadharNo?: string;
        pincode?: number;
        pencardNo?: string;
    };
    professionalDetails?: {
        qualification: string;
        languages: string[];
        experience: string;
        expertise: string[];
        gstNo?: string;
        gstCertificate: File[]; // Kept for in-session state
        certifications: File[]; // Kept for in-session state
    };
    availability?: {
        modes: string[];
        prices: { [key: string]: { actual: string; offer: string; } };
        schedule: { [key: string]: { isActive: boolean; startTime: string; endTime: string; } };
        selectAll: boolean;
        globalStartTime: string;
        globalEndTime: string;
    };
    basicInfo?: {
        dob: string;
        bio: string;
        profileImg: File | null; // Kept for in-session state
        photos: File[]; // Kept for in-session state
        videos: File[]; // Kept for in-session state
        galleryPhotos: File[]; // Kept for in-session state
        certificateGallery: File[]; // Kept for in-session state
    };
    agreement?: {
        agreeToTerms: boolean;
    };
}

export interface OnboardingState {
    currentStep: number;
    formData: AllFormData;
}

const initialState: OnboardingState = {
    currentStep: 1,
    formData: {},
};

export const astroOnboardingSlice = createSlice({
    name: 'onboarding',
    initialState,
    reducers: {
        setInitialFormData: (state, action: PayloadAction<AllFormData>) => {
            state.formData = action.payload;
        },
        updateFormData: (state, action: PayloadAction<Partial<AllFormData>>) => {
            state.formData = { ...state.formData, ...action.payload };
        },
        goToNextStep: (state) => {
            state.currentStep += 1;
        },
        goToPreviousStep: (state) => {
            state.currentStep -= 1;
        },
        goToSpecificStep: (state, action: PayloadAction<number>) => {
            state.currentStep = action.payload;
        },
        resetOnboarding: () => initialState,
    },
});

export const {
    setInitialFormData,
    updateFormData,
    goToNextStep,
    goToPreviousStep,
    goToSpecificStep,
    resetOnboarding,
} = astroOnboardingSlice.actions;

export default astroOnboardingSlice.reducer;
