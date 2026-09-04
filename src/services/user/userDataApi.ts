// src/services/userDataApi.ts
import axios from "axios";
import { store } from "@/store/store"; // To get token for authenticated requests
import { UserRegisterPayload } from "@/types/user";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper to get headers with Authorization token for authenticated requests
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



// Send Mobile Number for OTP
const userRegister = async (payload: UserRegisterPayload): Promise<{ message: string }> => {
    // Your backend endpoint might look like this
    const url = `${API_URL}/user/sendOtp`;
    try {
        const response = await axios.post(url, payload, {
            ...getAuthHeaders(),
        });
        return response.data;
    } catch (error: unknown) {
        const errorMessage = (error as any).response?.data?.message || "Failed to send phone OTP. Please try again.";
        throw new Error(errorMessage);
    }
};


// --- Service Object Export ---
const userDataApi = {
    userRegister
};

export default userDataApi;
