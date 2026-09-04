'use client'

import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useForm, Controller } from "react-hook-form";
import authService from "@/services/auth/authService";
import Link from "next/link";

interface LoginFormInputs {
    mobileNumber: string;
    fullNumber: string;
    terms: boolean;
}

export default function LoginForm() {
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<LoginFormInputs>({
        defaultValues: {
            mobileNumber: "",
            fullNumber: "",
            terms: false,
        },
    });

    const handleGetOtp = async (data: LoginFormInputs) => {
        try {
            const payload = { mobileNumber: data.mobileNumber }; // send only local number
            const response: any = await authService.sendPhoneOtp(payload);

            if (response) {
                toast.success("Sending OTP successful! Redirecting...");
                // redirect with full number
                router.push(`/otp?phone=${data.mobileNumber }&token=${response?.data?.token}`);
            }
        } catch (error: unknown) {
            const errorMessage = (error as any).message || "An unknown error occurred.";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="flex items-center justify-center  bg-gray-50 md:pt-50 md:pb-32 pt-40 pb-24 px-8">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Registration
                </h2>

                <form onSubmit={handleSubmit(handleGetOtp)}>
                    <label className="block mb-2 font-medium text-gray-700">
                        Mobile Number
                    </label>
                    <div className="mb-2">
                        <Controller
                            name="mobileNumber"
                            control={control}
                            rules={{
                                required: "Mobile number is required",
                                minLength: { value: 4, message: "Enter a valid number" },
                            }}
                            render={({ field }) => (
                                <PhoneInput
                                    country={"in"}
                                    value={watch("fullNumber")}
                                    onChange={(value, data) => {
                                        const dialCode = (data as { dialCode?: string }).dialCode || "";
                                        const localNumber = value.replace(dialCode, "");

                                        // set both values
                                        field.onChange(localNumber);
                                        setValue("fullNumber", `+${value}`);
                                    }}
                                    inputClass="!w-full !h-12 !px-4 !pl-14 !text-lg !font-medium !text-gray-800 !bg-white !border !border-gray-200 !rounded-md focus:!border-[#ffb900] focus:!ring-2 focus:!ring-[#ffb900]/50 !outline-none"
                                    buttonClass="!bg-white !border-r !border-gray-200"
                                    dropdownClass="!bg-white !rounded-lg"
                                    searchClass="!bg-gray-50 !text-gray-800"
                                    enableSearch
                                    inputProps={{
                                        name: "mobileNumber",
                                        required: true,
                                        placeholder: "Enter mobile number",
                                    }}
                                />
                            )}
                        />
                        {errors.mobileNumber && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.mobileNumber.message}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center mb-6">
                        <Controller
                            name="terms"
                            control={control}
                            rules={{ required: "You must agree before continuing" }}
                            render={({ field }) => (
                                <input
                                    id="terms"
                                    type="checkbox"
                                    checked={field.value}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                    onBlur={field.onBlur}
                                    name={field.name}
                                    ref={field.ref}
                                    className="w-5 h-5 text-[#ffb900] border-gray-300 rounded focus:ring-[#ffb900]"
                                />
                            )}
                        />

                        <label htmlFor="terms" className="ml-2 text-sm text-[#5C5C5C] font-helvetica">
                            I agree to the{" "}
                            <Link href="/terms-of-service" className="text-[#72271E] font-semibold underline">
                                Terms And Conditions
                            </Link>
                        </label>
                    </div>
                    {errors.terms && (
                        <p className="text-red-500 text-sm -mt-4 mb-4">
                            {errors.terms.message}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[#ffb900] text-black font-bold py-3 rounded-lg text-lg shadow-md hover:shadow-lg transition"
                    >
                        GET OTP
                    </button>
                </form>
            </div>
        </div>
    );
}
