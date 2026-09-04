'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { mainLogo } from '@/assets/images';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/slices/authSlice';

export default function ThankYou() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const back = () => {
    dispatch(logout());
    router.push('/')
  }
  if (!isAuthenticated) {
    router.push("login");
  }

  return (
    <div className="w-full min-h-screen bg-[#F8EFE1] flex items-center justify-center p-6">
      <div className="w-full max-w-md text-center">

        {/* Check Icon */}
        <div className="flex justify-center mb-5">
          <div className="relative w-16 h-16">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#72271E] w-full h-full"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M8 12L11 15L16 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-[#4A1E1A] font-inria">
          Thank You!
        </h2>
    

        {/* Bonus Highlight Card */}
        <div className="my-6 p-5 bg-[#FFFF] border border-[#FFD699] rounded-xl shadow-md flex flex-col items-center gap-4">
          <Image
            src={mainLogo}
            alt="Thank You"
            width={100}
            height={100}
            className=" object-cover rounded-lg"
          />
          <p className="text-[#72271E] font-semibold text-lg">
            You’ve successfully registered
          </p>
          <div className="flex gap-1">
            <button
              onClick={() => back()}
              className="bg-[#72271E] text-white font-bold py-2 px-6 rounded-lg shadow hover:shadow-lg hover:bg-[#A8827D]-500 transition-all duration-300"
            >
              Back
            </button>
            {/* <button
              onClick={() => router.push('/information')}
              className="bg-[#72271E] text-white font-bold py-2 px-6 rounded-lg shadow hover:shadow-lg hover:bg-[#A8827D]-500 transition-all duration-300"
            >
              Complete Your Profile
            </button> */}
          </div>
        </div>

        <div className="mt-6 text-xs text-[#5C5C5C] font-helvetica">
          Need help? Contact us at{' '}
          <a href="mailto:support@astrovani.com" className="underline text-[#72271E]">
            support@astrovani.com
          </a>
        </div>
      </div>
    </div>
  );
}
