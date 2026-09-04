'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { BsFileText } from 'react-icons/bs';
import { RiErrorWarningLine } from 'react-icons/ri';

interface AgreementPoliciesProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData?: any;
}

export default function AgreementPolicies({ onNext, onBack, initialData }: AgreementPoliciesProps) {
  const { register, handleSubmit, formState: { isValid } } = useForm({
    mode: 'onChange',
    defaultValues: {
      agreeToTerms: initialData?.agreement?.agreeToTerms || false
    }
  });

  const onSubmit = (data:any) => {
    console.log(data);
    onNext({ agreement: data });
  };

  return (
    <div className="w-full max-w-lg mx-auto p-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-inria text-[#72271E] font-bold">Agreement & Policies</h2>
        <p className="text-md text-[#5C5C5C] font-helvetica mt-1">Review and accept our terms</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <BsFileText className="text-[#72271E]" />
            <h3 className="text-sm font-bold text-[#0A0A0A]">Terms & Conditions</h3>
          </div>
          <div className="bg-[#FAF6F2] rounded-lg border border-gray-200 p-6 space-y-4 text-sm text-[#5C5C5C] font-helvetica">
            <div>
              <h4 className="font-bold text-gray-700">1. Astrologer Agreement</h4>
              <p>By joining Balaji Astro Guide, you agree to provide accurate astrological consultations and maintain professional standards in all interactions with clients.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-700">2. Service Guidelines</h4>
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>Provide consultations within agreed timeframes</li>
                <li>Maintain confidentiality of client information</li>
                <li>Use respectful and professional language</li>
                <li>Be available during your scheduled hours</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-700">3. Payment Terms</h4>
            </div>
          </div>
        </div>

        <div className="bg-[#FAF6F2] rounded-lg border border-gray-200 p-4">
          <label htmlFor="agreeToTerms" className="flex items-start gap-3 cursor-pointer">
            <input
              id="agreeToTerms"
              type="checkbox"
              {...register("agreeToTerms", { required: true })}
              className="mt-1 h-5 w-5 rounded border-gray-300 text-[#72271E] focus:ring-[#72271E]"
            />
            <span className="text-sm text-[#5C5C5C] font-helvetica">
              I have read and agree to the Terms & Conditions, Privacy Policy, and Service Guidelines. I understand my responsibilities as an astrologer on the Balaji Astro Guide platform.
            </span>
          </label>
        </div>

        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 flex items-start gap-3">
          <RiErrorWarningLine className="text-yellow-500 text-xl flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-yellow-800 text-sm">Important Notice</h4>
            <p className="text-sm text-yellow-700 font-helvetica mt-1">
              Your profile will be reviewed by our team before activation. This process may take 1-3 business days. You'll be notified once approved.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-6">
          <button
            type="button"
            onClick={onBack}
            className="w-full bg-transparent border-2 border-[#72271E] text-[#72271E] font-semibold py-2.5 rounded-full text-center cursor-pointer"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full bg-[#72271E] text-white font-semibold py-2.5 rounded-full text-center transition-opacity cursor-pointer ${
              isValid ? 'opacity-100' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}