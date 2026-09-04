'use client';
import React from 'react';

export default function ProgressBar({ currentStep, totalSteps }:{ currentStep:number, totalSteps:number}) {
  const progress = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto px-8 pt-5">
      <div className="flex items-center justify-between text-sm font-helvetica text-[#72271E]">
        <span>Step {currentStep} of {totalSteps}</span>
        <span className='text-[#4A5565]'>{progress}%</span>
      </div>
      <div className="w-full rounded-full h-1.5 mt-2 bg-[#E8D5C7]">
        <div 
          className="bg-[#72271E] h-1.5 rounded-full transition-all duration-500" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
