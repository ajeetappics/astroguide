"use client";

import RegisterForm from "@/app/components/onboarding/RegisterForm";
import { useSearchParams } from "next/navigation";

export default function RegisterPage() {
  const params = useSearchParams();
  const mobileNumber = params?.get("phone") || "";

  return <RegisterForm mobileNumber={mobileNumber} />;
}
