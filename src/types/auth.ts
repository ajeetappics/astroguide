

export interface SendPhoneOtpPayload {
    mobileNumber: string;
}


export interface VerifyPhoneOtpPayload {
    mobileNumber: string,
    otp: string
}

// Type for the payload, matching the API
export interface UpdatePasswordPayload {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface ForgotPasswordPayload {
    emailOrPhone: string;
}

export interface ForgotPasswordResponse {
    message: string;
    resetToken: string; // Assuming the token is returned to be used in the next step
}

export interface ResetPasswordPayload {
    token: string;
    newPassword: string;
    confirmPassword: string;
    emailOrPhone: string;
}
