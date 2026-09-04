'use client';
import astoProfileApi from '@/services/astoProfile/astoProfileApi';
import { AllFormData, goToPreviousStep } from '@/store/slices/astroOnboardingSlice';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BsPerson, BsBriefcase, BsClock, BsShieldCheck } from 'react-icons/bs';
import { RiPencilLine } from 'react-icons/ri';


interface ReviewSubmitProps {
  onNext: () => void;
  onBack: () => void;
  allFormData: AllFormData;
  goToStep: (step: number) => void;
}

// Helper component to display a row of information consistently
const InfoRow = ({ label, value }: { label: string; value?: React.ReactNode }) => {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return (
      <div className="text-sm">
        <span className="font-semibold text-gray-800">{label}:</span>{' '}
        <span className="text-gray-500 italic">N/A</span>
      </div>
    );
  }
  return (
    <div className="text-sm">
      <span className="font-semibold text-gray-800">{label}:</span>{' '}
      <span className="text-gray-600 break-words">{value}</span>
    </div>
  );
};

// Helper component to display a list of tags
const TagList = ({ items }: { items?: string[] }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 pt-1">
      {items.map(item => (
        <span key={item} className="bg-[#F8F3EE] border border-[#E2D6CC] text-black text-xs py-1 px-3 rounded-lg">
          {item}
        </span>
      ))}
    </div>
  );
};

export default function ReviewSubmit({ onNext, onBack, allFormData, goToStep }: ReviewSubmitProps) {
  
  const [isSubmit, setIsSubmit] = useState(false);
  const { verification, professionalDetails, availability, basicInfo } = allFormData;

  const handleSubmit = async () => {
    try {
      const res=await astoProfileApi.registerAstro(allFormData);
      if (res){
        onNext();
      }
    
    } catch (error) {
      console.error("Failed to save progress:", error);
      toast.error("Could not save your progress. Please try again.");
    } finally {
      setIsSubmit(false);
    }
  };





  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-inria text-[#72271E] font-bold">Review & Submit</h2>
        <p className="text-md text-[#5C5C5C] font-helvetica mt-1">Please review your details carefully before submission.</p>
      </div>

      <div className="space-y-5">

        {/* Verification Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-3">
              <BsShieldCheck className="text-[#72271E] text-lg" />
              <h3 className="text-md font-bold text-[#0A0A0A]">Verification</h3>
            </div>
            <button onClick={() => goToStep(1)} className="flex items-center gap-1 text-sm text-[#72271E] font-medium cursor-pointer">
              <RiPencilLine /> Edit
            </button>
          </div>
          <div className="space-y-2">
            <InfoRow label="Full Name" value={verification?.fullName} />
            <InfoRow label="Phone" value={verification?.mobileNumber} />
            <InfoRow label="Email" value={verification?.email} />
            <InfoRow label="Gender" value={verification?.gender} />
            <InfoRow label="Address" value={verification?.address} />
            <InfoRow label="City" value={verification?.city?.label} />
            <InfoRow label="State" value={verification?.state?.label} />
            <InfoRow label="Pincode" value={verification?.pincode} />
            {/* --- ADDED --- */}
            <InfoRow label="Aadhar No." value={verification?.aadharNo} />
            <InfoRow label="PAN Card No." value={verification?.pencardNo} />
            <InfoRow label="ID Proof" value={`${verification?.idProofType} (${verification?.idProofs?.length || 0} file(s) uploaded)`} />
          </div>
        </div>

        {/* Professional Details Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-3">
              <BsBriefcase className="text-[#72271E] text-lg" />
              <h3 className="text-md font-bold text-[#0A0A0A]">Professional Details</h3>
            </div>
            <button onClick={() => goToStep(2)} className="flex items-center gap-1 text-sm text-[#72271E] font-medium cursor-pointer">
              <RiPencilLine /> Edit
            </button>
          </div>
          <div className="space-y-3">
            <InfoRow label="Qualification" value={professionalDetails?.qualification} />
            <InfoRow label="Experience" value={professionalDetails?.experience} />
            <InfoRow label="GST No." value={professionalDetails?.gstNo} />
            {/* --- ADDED --- */}
            <InfoRow label="GST Certificate" value={`${professionalDetails?.gstCertificate?.length || 0} file(s) uploaded`} />
            <InfoRow label="Other Certificates" value={`${professionalDetails?.certifications?.length || 0} file(s) uploaded`} />
            {/* <div>
              <p className="font-semibold text-sm text-gray-800">Languages Spoken:</p>
              <TagList items={professionalDetails?.languages} />
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-800">Areas of Expertise:</p>
              <TagList items={professionalDetails?.expertise} />
            </div> */}
          </div>
        </div>

        {/* Basic Information & Media Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-3">
              <BsPerson className="text-[#72271E] text-lg" />
              <h3 className="text-md font-bold text-[#0A0A0A]">Basic & Media Information</h3>
            </div>
            <button onClick={() => goToStep(4)} className="flex items-center gap-1 text-sm text-[#72271E] font-medium cursor-pointer">
              <RiPencilLine /> Edit
            </button>
          </div>
          <div className="space-y-2">
            <InfoRow label="Date of Birth" value={basicInfo?.dob} />
            {/* --- CORRECTED --- */}
            <InfoRow label="Profile Picture" value={basicInfo?.profileImg ? '1 file uploaded' : 'N/A'} />
            <InfoRow label="Photos" value={`${basicInfo?.photos?.length || 0} file(s) uploaded`} />
            <InfoRow label="Videos" value={`${basicInfo?.videos?.length || 0} file(s) uploaded`} />
            <InfoRow label="Gallery Photos" value={`${basicInfo?.galleryPhotos?.length || 0} file(s) uploaded`} />
            <InfoRow label="Certificate Gallery" value={`${basicInfo?.certificateGallery?.length || 0} file(s) uploaded`} />
            <div>
              <p className="font-semibold text-sm text-gray-800">Bio:</p>
              <p className="text-sm text-gray-600 italic mt-1">"{basicInfo?.bio || 'N/A'}"</p>
            </div>
          </div>
        </div>

        {/* Availability & Pricing Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-3">
              <BsClock className="text-[#72271E] text-lg" />
              <h3 className="text-md font-bold text-[#0A0A0A]">Availability & Pricing</h3>
            </div>
            <button onClick={() => goToStep(3)} className="flex items-center gap-1 text-sm text-[#72271E] font-medium cursor-pointer">
              <RiPencilLine /> Edit
            </button>
          </div>
          <div className="space-y-3">
            <div>
              <p className="font-semibold text-sm text-gray-800">Consultation Modes & Prices:</p>
              <div className="mt-2 space-y-1 pl-4">
                {availability?.modes && availability.modes.length > 0 ? (
                  availability.modes.map(mode => (
                    <p key={mode} className="text-sm text-gray-600">
                      <span className='font-medium'>{mode}:</span> Offer ₹{availability.prices?.[mode]?.offer}
                      <span className="line-through text-gray-400 ml-2">₹{availability.prices?.[mode]?.actual}</span>
                    </p>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic">No modes selected</p>
                )}
              </div>
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-800">Weekly Schedule:</p>
              <div className="mt-2 space-y-1 pl-4">
                {availability?.schedule && Object.keys(availability.schedule).some(day => availability.schedule[day].isActive) ? (
                  Object.keys(availability.schedule).map(day => {
                    const details = availability.schedule[day];
                    return details.isActive && (
                      <p key={day} className="text-sm text-gray-600">
                        <span className='font-medium'>{day}:</span> {details.startTime || 'Not set'} - {details.endTime || 'Not set'}
                      </p>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-500 italic">No days selected</p>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="flex items-center gap-4 pt-8">
        <button type="button" onClick={onBack} className="w-full border-2 border-[#72271E] text-[#72271E] font-semibold py-2.5 rounded-full text-center cursor-pointer">
          Back
        </button>
        <button type="button" onClick={handleSubmit} className="w-full bg-[#72271E] text-white font-semibold py-2.5 rounded-full text-center cursor-pointer" disabled={isSubmit}>
          {isSubmit ? 'Submit...' : 'Submit Application'}
        </button>
      </div>
    </div>
  );
}
