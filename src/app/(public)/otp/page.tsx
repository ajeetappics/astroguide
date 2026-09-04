"use client";

import React from "react";
import OTPForm from "@/app/components/onboarding/OTPForm";
import { useRouter, useSearchParams } from "next/navigation";

export default function OtpPage() {
    const route = useRouter();
    const params = useSearchParams();
    const phoneNunber = params.get("phone");
    const handleBack = () => {
        route.push("/login");
    };

    return <OTPForm phone={phoneNunber as string} onBack={handleBack} />;
}
