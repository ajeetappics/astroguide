'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RiStarLine } from 'react-icons/ri';
import { thankyoImage } from '@/assets/images';

export default function SubmissionSuccess({ userName = "xsxsx" }) {
  return (
    <div className="w-full max-w-lg mx-auto p-8 text-center">
      
      <div className="flex justify-center mb-6">
          <div className="relative w-20 h-20">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#72271E]">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 12L11 15L16 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="absolute top-0 right-0 -mr-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#72271E] w-6 h-6">
                      <path d="M12 2L9.5 9.5L2 12L9.5 14.5L12 22L14.5 14.5L22 12L14.5 9.5L12 2Z" fill="currentColor"/>
                  </svg>
              </div>
          </div>
      </div>

      <h2 className="text-3xl font-inria text-[#72271E] font-bold">
        Thank you, <br/> {userName}!
      </h2>
      <p className="text-md text-[#5C5C5C] font-helvetica mt-3 max-w-sm mx-auto">
        Your profile is under review. You'll be notified once approved and can start connecting with seekers.
      </p>

      <div className="my-8 shadow-lg rounded-xl overflow-hidden aspect-video">
        <Image 
          src={thankyoImage} 
          alt="Once Approved" 
          width={400} 
          height={225}
          className="w-full h-full object-cover" 
        />
      </div>

      <div className="bg-[#FAF6F2] rounded-lg border border-gray-200 p-6 text-left space-y-4">
        <div className="flex items-center gap-2">
            <RiStarLine className="text-[#72271E]" />
            <h3 className="text-sm font-bold text-[#0A0A0A]">What happens next?</h3>
        </div>
        <ul className="list-disc list-inside space-y-2 text-sm text-[#5C5C5C] font-helvetica">
          <li>Our team will review your profile within 1-3 business days</li>
          <li>You'll receive an email notification once approved</li>
          <li>Start accepting consultations and earning</li>
        </ul>
      </div>

      <div className="mt-8">
        {/* <Link 
            href="/dashboard"
            className="w-full block bg-[#72271E] text-white font-semibold py-3 rounded-full text-center"
        >
          Go to Dashboard
        </Link> */}
        <Link
          href="/"
          className="w-full block bg-[#72271E] text-white font-semibold py-3 rounded-full text-center"
        >
          Go Home
        </Link>
      </div>
      
      <div className="mt-6 text-xs text-gray-400 font-helvetica">
        Need help? Contact us at <a href="mailto:support@astrovani.com" className="underline">support@astrovani.com</a>
      </div>
    </div>
  );
}