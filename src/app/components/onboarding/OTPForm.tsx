'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OtpInput from "react-otp-input";
import { useForm, Controller } from "react-hook-form";
import authService from "@/services/auth/authService";
import toast from "react-hot-toast";
import { loginSuccess } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";

interface OTPFormProps {
    phone: string;
    onBack: () => void;
}

interface OTPFormInputs {
    otp: string;
}

export default function OTPForm({ phone, onBack }: OTPFormProps) {
    const router = useRouter();
    const [timer, setTimer] = useState(34); 
    const [canResend, setCanResend] = useState(false);
    const dispatch = useDispatch();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<OTPFormInputs>({
        defaultValues: {
            otp: "",
        },
    });

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleVerify = async (data: OTPFormInputs) => {
        try {
            const payload = { otp: data.otp, mobileNumber: phone?.toString()?.trim() };
            const response: any = await authService.verifyPhoneOtp(payload);


            const { _id } = response.data?.user
            const { token } = response.data
            const payloade = {
                user: response.data?.user,
                id: _id,
                token
            }
            dispatch(loginSuccess(payloade));
            if (response) {
                toast.success("OTP Verified! Redirecting...");
                router.push(`/register?phone=${phone}`);
            }
        } catch (error: unknown) {
            const errorMessage = (error as any).message || "An unknown error occurred.";
            toast.error(errorMessage);
        }
    };

    const handleResendOtp = async () => {
        try {
            await authService.sendPhoneOtp({ mobileNumber: phone });

            toast.success("OTP resent successfully!");
            setTimer(34);
            setCanResend(false);
        } catch (error: unknown) {
            const errorMessage = (error as any).message
            toast.error(errorMessage || "Failed to resend OTP");
        } finally {
            setCanResend(false);
            setTimer(34);
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-50 md:pt-50 md:pb-32 pt-40 pb-24 px-8">
            <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md mx-auto">
                <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
                    Verify Phone
                </h2>
                <div className="text-center mb-8 text-green-600 font-medium">
                    OTP sent to {phone}
                </div>

                <form onSubmit={handleSubmit(handleVerify)}>
                    <div className="flex justify-center mb-2">
                        <Controller
                            name="otp"
                            control={control}
                            rules={{
                                required: "OTP is required",
                                minLength: { value: 4, message: "Enter 4 digits" },
                            }}
                            render={({ field }) => (
                                <OtpInput
                                    value={field.value}
                                    onChange={field.onChange}
                                    numInputs={4}
                                    renderInput={(props) => (
                                        <input
                                            {...props}
                                            className="!w-16 h-16 text-2xl font-bold text-center text-gray-800 bg-white border border-gray-200 rounded-lg outline-none focus:border-[#ffb900] focus:ring-2 focus:ring-[#ffb900]/50"
                                        />
                                    )}
                                    containerStyle={{ gap: "1rem" }}
                                />
                            )}
                        />
                    </div>
                    {errors.otp && (
                        <p className="text-red-500 text-center text-sm mb-4">
                            {errors.otp.message}
                        </p>
                    )}

                    <div className="flex gap-4 mb-4">
                        <button
                            type="button"
                            onClick={onBack}
                            className="w-1/2 bg-gray-100 text-gray-600 font-bold py-4 rounded-lg text-lg shadow"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="w-1/2 bg-[#ffb900] text-black font-bold py-4 rounded-lg text-lg shadow hover:bg-yellow-500 transition"
                        >
                            Verify OTP
                        </button>
                    </div>

                    <div className="text-center text-gray-500 mt-2">
                        {canResend ? (
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                className="text-[#ffb900] font-semibold hover:underline"
                            >
                                Resend OTP
                            </button>
                        ) : (
                            <>
                                Resend OTP available in{" "}
                                <span className="text-red-500 font-semibold">{timer}s</span>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
