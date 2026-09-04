'use client';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  goToSpecificStep,
  AllFormData,
  setInitialFormData,
} from '@/store/slices/astroOnboardingSlice';

import ProgressBar from '@/app/components/AstroComponent/Progress/ProgressBar';
import BasicInformation from '@/app/components/AstroComponent/StepForm/BasicInformation';
import ProfessionalDetails from '@/app/components/AstroComponent/StepForm/ProfessionalDetails';
import AvailabilityPricing from '@/app/components/AstroComponent/StepForm/AvailabilityPricing';
import Verification from '@/app/components/AstroComponent/StepForm/Verification';
import AgreementPolicies from '@/app/components/AstroComponent/StepForm/AgreementPolicies';
import ReviewSubmit from '@/app/components/AstroComponent/StepForm/ReviewSubmit';
import SubmissionSuccess from '@/app/components/AstroComponent/StepForm/SubmissionSuccess';
import { AppDispatch, RootState } from '@/store/store';
import astoProfileApi from '@/services/astoProfile/astoProfileApi';
import Loading from '@/app/loading';
import toast from 'react-hot-toast';

export default function OnboardingPage() {
  const totalSteps = 7;
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); 
  const { currentStep, formData } = useSelector((state: RootState) => state.astroOnboarding);
  const { id, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isSaving, setIsSaving] = useState(false);

  const handleNext = async (stepData: Partial<AllFormData>) => {
    if (isSaving) return;
    setIsSaving(true);
    const updatedFullFormData = { ...formData, ...stepData };

    try {
      // await astoProfileApi.updateAstroProfile(id, updatedFullFormData);
      dispatch(updateFormData(stepData));
      toast.success("Progress saved!");
      if (currentStep < totalSteps) {
        dispatch(goToNextStep());
      }
    } catch (error) {
      console.error("Failed to save progress:", error);
      toast.error("Could not save your progress. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };


  const handleBack = () => {
    if (currentStep > 1) {
      dispatch(goToPreviousStep());
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step < totalSteps) {
      dispatch(goToSpecificStep(step));
    }
  };

  const handleFinalSubmit = () => {
    if (currentStep === 6) {
      dispatch(goToNextStep());
    }
  };

  // useEffect(() => {
  //   const fetchAndSetProfile = async () => {
  //     setIsLoading(true)
  //     try {
  //       const profileData = await astoProfileApi.getAstroProfile(id);
  //       dispatch(setInitialFormData(profileData));
  //     } catch (error) {
  //       console.error("Could not fetch existing profile:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   id && fetchAndSetProfile();
  // }, [dispatch]);

  if (isLoading) {
    return <div><Loading /></div>;
  }

  return (
    <main className="bg-[#F8EFE1] flex flex-col items-center justify-start min-h-screen pt-30 pb-10">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      {/* Pass formData from Redux as initialData to each step component */}
      {currentStep === 1 && <Verification onNext={handleNext} onBack={handleBack} initialData={formData} isAuthenticated={isAuthenticated} />}
      {currentStep === 2 && <ProfessionalDetails onNext={handleNext} onBack={handleBack} initialData={formData} />}
      {currentStep === 3 && <AvailabilityPricing onNext={handleNext} onBack={handleBack} initialData={formData} />}
      {currentStep === 4 && <BasicInformation onNext={handleNext} onBack={handleBack} initialData={formData} />}
      {currentStep === 5 && <AgreementPolicies onNext={handleNext} onBack={handleBack} initialData={formData} />}

      {currentStep === 6 && <ReviewSubmit onNext={handleFinalSubmit} onBack={handleBack} allFormData={formData} goToStep={goToStep} />}

      {currentStep === 7 && <SubmissionSuccess userName={formData.verification?.fullName ?? "User"} />}
    </main>
  );
}
