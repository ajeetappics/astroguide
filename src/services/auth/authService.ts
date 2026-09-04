// src/services/authService.ts
import axios from 'axios';
import { store } from '@/store/store';
import {
    SendPhoneOtpPayload,
    VerifyPhoneOtpPayload,
    UpdatePasswordPayload,
    ForgotPasswordPayload,
    ForgotPasswordResponse,
    ResetPasswordPayload,
} from '@/types/auth';
import { RegisterFormInputs } from '@/app/components/onboarding/RegisterForm';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ✅ Helper: Builds headers with or without token, and handles multipart logic
const getAuthHeaders = (isMultipart: boolean = false) => {
    const token = store.getState().auth.token;
    const headers: Record<string, string> = {};

    // Only add JSON type if not multipart
    if (!isMultipart) {
        headers['Content-Type'] = 'application/json';
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return { headers };
};

// ✅ Send Mobile Number for OTP
const sendPhoneOtp = async (payload: SendPhoneOtpPayload): Promise<{ message: string }> => {
    const url = `${API_URL}/user/sendOtp`;
    try {
        const response = await axios.post(url, payload, getAuthHeaders());
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Failed to send phone OTP. Please try again.';
        throw new Error(errorMessage);
    }
};

// ✅ Verify Phone OTP
const verifyPhoneOtp = async (payload: VerifyPhoneOtpPayload): Promise<{ message: string }> => {
    const url = `${API_URL}/user/verifyOtp`;
    try {
        const response = await axios.post(url, payload, getAuthHeaders());
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Phone OTP verification failed.';
        throw new Error(errorMessage);
    }
};

// ✅ Update Password
const updatePassword = async (payload: UpdatePasswordPayload): Promise<any> => {
    const url = `${API_URL}/user/updatePassword`;
    try {
        const response = await axios.put(url, payload, getAuthHeaders());
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Failed to update password.';
        throw new Error(errorMessage);
    }
};

// ✅ Forgot Password
const forgotPassword = async (payload: ForgotPasswordPayload): Promise<ForgotPasswordResponse> => {
    const url = `${API_URL}/user/forgotPassword`;
    try {
        const response = await axios.post(url, payload, getAuthHeaders());
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Failed to send reset code.';
        throw new Error(errorMessage);
    }
};

// ✅ Reset Password
const resetPassword = async (payload: ResetPasswordPayload): Promise<{ message: string }> => {
    const url = `${API_URL}/user/resetPassword`;
    try {
        const response = await axios.put(url, payload, getAuthHeaders());
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Failed to reset password.';
        throw new Error(errorMessage);
    }
};

// ✅ User Register (with multipart/form-data support)
const userRegister = async (payload: RegisterFormInputs): Promise<any> => {
    const url = `${API_URL}/astro/register`;
    const { profileImg, ...body } = payload;

    try {
        const response = await axios.post(url, profileImg ? payload : body, getAuthHeaders(false));
        return response.data;
    } catch (error: any) {
        console.error("API Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to update profile.");
    }
};
// ✅ Export all
const authService = {
    verifyPhoneOtp,
    sendPhoneOtp,
    updatePassword,
    forgotPassword,
    resetPassword,
    userRegister,
};

export default authService;
