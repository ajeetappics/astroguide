'use client';
import React, { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { Listbox } from '@headlessui/react';
import { BsCheck, BsChevronDown, BsChevronUp, BsX, BsCloudUpload } from 'react-icons/bs';
import Image from 'next/image';
import commonService from '@/services/comman/comman';

const languagesOption = [
  { "value": "ar", "label": "Arabic" },
  { "value": "bn", "label": "Bengali" },
  { "value": "zh", "label": "Chinese" },
  { "value": "en", "label": "English" },
  { "value": "fr", "label": "French" },
  { "value": "de", "label": "German" },
  { "value": "el", "label": "Greek" },
  { "value": "he", "label": "Hebrew" },
  { "value": "hi", "label": "Hindi" },
  { "value": "hu", "label": "Hungarian" },
  { "value": "it", "label": "Italian" },
  { "value": "ja", "label": "Japanese" },
  { "value": "ko", "label": "Korean" },
  { "value": "mr", "label": "Marathi" },
  { "value": "nl", "label": "Dutch" },
  { "value": "pa", "label": "Punjabi" },
  { "value": "pl", "label": "Polish" },
  { "value": "pt", "label": "Portuguese" },
  { "value": "ro", "label": "Romanian" },
  { "value": "ru", "label": "Russian" },
  { "value": "es", "label": "Spanish" },
  { "value": "sv", "label": "Swedish" },
  { "value": "ta", "label": "Tamil" },
  { "value": "te", "label": "Telugu" },
  { "value": "tr", "label": "Turkish" },
  { "value": "uk", "label": "Ukrainian" },
  { "value": "ur", "label": "Urdu" },
  { "value": "vi", "label": "Vietnamese" },
  { "value": "fa", "label": "Persian" },
  { "value": "fi", "label": "Finnish" },
  { "value": "gu", "label": "Gujarati" },
  { "value": "kn", "label": "Kannada" },
  { "value": "ml", "label": "Malayalam" },
  { "value": "or", "label": "Odia" },
  { "value": "as", "label": "Assamese" },
  { "value": "sd", "label": "Sindhi" },
  { "value": "ne", "label": "Nepali" },
  { "value": "ks", "label": "Kashmiri" },
  { "value": "brx", "label": "Bodo" },
  { "value": "sa", "label": "Sanskrit" },
  { "value": "doi", "label": "Dogri" },
  { "value": "gom", "label": "Konkani" },
  { "value": "lus", "label": "Mizo" },
  { "value": "sat", "label": "Santali" },
  { "value": "bh", "label": "Bihari" }
];

const qualificationOptions = [
  { value: '10+2', label: '10+2' },
  { value: 'Graduate', label: 'Graduate' },
  { value: 'Post Graduate', label: 'Post Graduate' },
  { value: 'Other', label: 'Other' },
];


const expertiseAreas = [
  "Vedic Astrology", "Tarot Reading", "Numerology",
  "Palmistry", "Vaastu Shastra", "Horoscope Analysis"
];

const experienceLevels = ["0-1 years", "1-5 years", "6-10 years", "10+ years"];

interface ProfessionalDetailsProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData: any;
}

interface FormValues {
  languages: string[];
  qualification: string;
  experience: string;
  gstNo: string;
  expertise: string[];
  certifications: File[];
  gstCertificate: File[];
}

// Helper component for the file upload UI
const FileUploadInput = ({ value, onDrop, placeholder }: { value: File[], onDrop: (files: File[]) => void, placeholder: string }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': [], 'image/*': [] },
    multiple: false // Assuming single file upload for these fields
  });

  const fileName = value && value.length > 0 ? value[0].name : placeholder;

  return (
    <div
      {...getRootProps()}
      className={`relative w-full h-[48px] rounded-[14px] border border-[#D1D5DC] bg-[#F3F3F5] px-4 flex items-center cursor-pointer
      outline-none focus:border-[#72271E] focus:ring-1 focus:ring-[#72271E] transition-colors
      ${isDragActive ? 'bg-gray-200' : ''}`}
    >
      <input {...getInputProps()} />
      <span className={`truncate ${value && value.length > 0 ? 'text-gray-800' : 'text-[#717182]'}`}>
        {fileName}
      </span>
      <BsCloudUpload className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
    </div>
  );
};


export default function ProfessionalDetails({ onNext, onBack, initialData }: ProfessionalDetailsProps) {
  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      languages: initialData?.professionalDetails?.languages || [],
      qualification: initialData?.professionalDetails?.qualification || '',
      experience: initialData?.professionalDetails?.experience || '',
      gstNo: initialData?.professionalDetails?.gstNo || '',
      expertise: initialData?.professionalDetails?.expertise || [],
      certifications: initialData?.professionalDetails?.certifications || [],
      gstCertificate: initialData?.professionalDetails?.gstCertificate || [],
    }
  });

  const expertiseValue = watch('expertise');
  const certificationsValue = watch('certifications', []);
  const gstCertificateValue = watch('gstCertificate', []);


  const onCertificatesDrop = useCallback((acceptedFiles: File[]) => {
    setValue('certifications', acceptedFiles);
  }, [setValue]);


  const onGstCertificateDrop = useCallback((acceptedFiles: File[]) => {
    setValue('gstCertificate', acceptedFiles);
  }, [setValue]);


  const toggleExpertise = (area: string) => {
    const currentExpertise = expertiseValue || [];
    const newExpertise = currentExpertise.includes(area)
      ? currentExpertise.filter(a => a !== area)
      : [...currentExpertise, area];
    setValue('expertise', newExpertise);
  };

  const onSubmit = async (data: any) => {
    console.log(data);


    try {
      // Collect all files you want to upload

      let uploadedcertifications: any = [];
      let uploadedgstCertificate: any = [];

      if (data.certifications?.length > 0) {
        const response: any = await commonService.uploadImage(data.certifications);
        uploadedcertifications = response.data.img || []; // assuming backend returns { img: [...] }
      }
      if (data.gstCertificate?.length > 0) {
        const response: any = await commonService.uploadImage(data.gstCertificate);
        uploadedgstCertificate = response.data.img || []; // assuming backend returns { img: [...] }
      }

      const finalData = {
        ...data,
        certifications: uploadedcertifications,
        gstCertificate: uploadedgstCertificate,
      };

      onNext({ professionalDetails: finalData });
    } catch (error: any) {
      console.error("File upload error:", error);
      alert(error.message || "Something went wrong during file upload.");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-inria text-[#72271E] font-bold">Professional Details</h2>
        <p className="text-md text-[#5C5C5C] font-helvetica mt-1">Share your expertise</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-bold text-[#0A0A0A] mb-2">Education Qualification *</label>
          <Controller
            name="qualification"
            control={control}
            rules={{ required: 'Qualification is required' }}
            render={({ field }) => (
              <Listbox value={field.value} onChange={field.onChange}>
                {({ open }) => (
                  <div className="relative">
                    <Listbox.Button className="relative w-full h-[36px] rounded-[14px] border border-[#D1D5DC] bg-[#F3F3F5] px-4 text-left outline-none focus:border-[#72271E] focus:ring-1 focus:ring-[#72271E]">
                      <span className={`block truncate ${field.value ? 'text-gray-800' : 'text-[#717182]'}`}>
                        {qualificationOptions.find(opt => opt.value === field.value)?.label || "Select Qualification"}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        {open ? <BsChevronUp className="h-4 w-4 text-gray-400" /> : <BsChevronDown className="h-4 w-4 text-gray-400" />}
                      </span>
                    </Listbox.Button>
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10 border border-[#D1D5DC]">
                      {qualificationOptions.map((option, index) => (
                        <Listbox.Option
                          key={index}
                          value={option.value}
                          className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-[#72271E] text-white' : 'text-gray-900'}`}
                        >
                          {({ selected }) => (
                            <>
                              <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{option.label}</span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white"><BsCheck className="h-5 w-5" /></span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                )}
              </Listbox>
            )}
          />
          {errors.qualification && <p className="text-xs text-red-500 mt-1">{errors.qualification.message}</p>}
        </div>

        {/* <div>
          <label className="block text-sm font-bold text-[#0A0A0A] mb-2">Languages Spoken</label>
          <Controller
            name="languages"
            control={control}
            render={({ field }) => (
              <Listbox value={field.value} onChange={field.onChange} multiple>
                {({ open }) => (
                  <div className="relative">
                    <Listbox.Button className="relative w-full min-h-[36px] rounded-[14px] border border-[#D1D5DC] bg-[#F3F3F5] px-4 py-1.5 text-left outline-none focus:border-[#72271E] focus:ring-1 focus:ring-[#72271E]">
                      <div className="flex flex-wrap gap-2 items-center">
                        {field.value.length === 0 ? (
                          <span className="text-[#717182]">Select languages</span>
                        ) : (
                          field.value.map(val => {
                            const language = languagesOption.find(opt => opt.value === val);
                            return (
                              <span key={val} className="bg-[#72271E] text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
                                {language?.label}
                                <BsX
                                  className="ml-2 h-4 w-4 cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    field.onChange(field.value.filter(item => item !== val));
                                  }}
                                />
                              </span>
                            );
                          })
                        )}
                      </div>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        {open ? <BsChevronUp className="h-4 w-4 text-gray-400" /> : <BsChevronDown className="h-4 w-4 text-gray-400" />}
                      </span>
                    </Listbox.Button>
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10 border border-[#D1D5DC]">
                      {languagesOption.map((option, index) => (
                        <Listbox.Option
                          key={index}
                          value={option.value}
                          className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-[#72271E] text-white' : 'text-gray-900'}`}
                        >
                          {({ selected }) => (
                            <>
                              <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{option.label}</span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white"><BsCheck className="h-5 w-5" /></span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                )}
              </Listbox>
            )}
          />
        </div> */}

        <div>
          <label className="block text-sm font-bold text-[#0A0A0A] mb-1">Years of Experience *</label>
          <Controller
            name="experience"
            control={control}
            rules={{ required: 'Experience is required' }}
            render={({ field }) => (
              <Listbox value={field.value} onChange={field.onChange}>
                {({ open }) => (
                  <div className="relative">
                    <Listbox.Button className="relative w-full h-[36px] rounded-[14px] border border-[#D1D5DC] bg-[#F3F3F5] px-4 text-left outline-none focus:border-[#72271E] focus:ring-1 focus:ring-[#72271E]">
                      <span className={`block truncate ${field.value ? 'text-gray-800' : 'text-[#717182]'}`}>{field.value || "Select your experience level"}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">{open ? <BsChevronUp className="h-4 w-4 text-gray-400" /> : <BsChevronDown className="h-4 w-4 text-gray-400" />}</span>
                    </Listbox.Button>
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10 border border-[#D1D5DC]">
                      {experienceLevels.map((level, index) => (<Listbox.Option key={index} value={level} className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-[#72271E] text-white' : 'text-gray-900'}`}>{({ selected }) => (<><span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{level}</span>{selected ? (<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white"><BsCheck className="h-5 w-5" /></span>) : null}</>)}</Listbox.Option>))}
                    </Listbox.Options>
                  </div>
                )}
              </Listbox>
            )}
          />
          {errors.experience && <p className="text-xs text-red-500 mt-1">{errors.experience.message}</p>}
        </div>
        {/* <div>
          <label className="block text-sm font-bold text-[#0A0A0A] mb-2">Areas of Expertise *</label>
          <Controller
            name="expertise"
            control={control}
            rules={{ required: 'Please select at least one area of expertise' }}
            render={({ field }) => (
              <Listbox value={field.value} onChange={field.onChange} multiple>
                {({ open }) => (
                  <div className="relative">
                    <Listbox.Button className="relative w-full min-h-[36px] rounded-[14px] border border-[#D1D5DC] bg-[#F3F3F5] px-4 py-1.5 text-left outline-none focus:border-[#72271E] focus:ring-1 focus:ring-[#72271E]">
                      <div className="flex flex-wrap gap-2 items-center">
                        {field.value.length === 0 ? (
                          <span className="text-[#717182]">Select expertise areas</span>
                        ) : (
                          field.value.map(area => (
                            <span key={area} className="bg-[#72271E] text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
                              {area}
                              <BsX
                                className="ml-2 h-4 w-4 cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  field.onChange(field.value.filter(item => item !== area));
                                }}
                              />
                            </span>
                          ))
                        )}
                      </div>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        {open ? <BsChevronUp className="h-4 w-4 text-gray-400" /> : <BsChevronDown className="h-4 w-4 text-gray-400" />}
                      </span>
                    </Listbox.Button>
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10 border border-[#D1D5DC]">
                      {expertiseAreas.map((area, index) => (
                        <Listbox.Option
                          key={index}
                          value={area}
                          className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-[#72271E] text-white' : 'text-gray-900'}`}
                        >
                          {({ selected }) => (
                            <>
                              <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{area}</span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white"><BsCheck className="h-5 w-5" /></span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                )}
              </Listbox>
            )}
          />
          {errors.expertise && <p className="text-xs text-red-500 mt-1">{errors.expertise.message}</p>}
        </div> */}

        <div>
          <label className="block text-sm font-bold text-[#0A0A0A] mb-1">GST No.</label>
          <input
            {...register("gstNo")}
            type="text"
            placeholder="Enter GST No"
            className="w-full h-[48px] rounded-[14px] border border-[#D1D5DC] bg-[#F3F3F5] px-4 outline-none focus:border-[#72271E] focus:ring-1 focus:ring-[#72271E] text-gray-800 placeholder:text-[#717182]"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-[#0A0A0A] mb-1">Upload GST Certificate</label>
          <FileUploadInput
            value={gstCertificateValue}
            onDrop={onGstCertificateDrop}
            placeholder="Upload GST Certificate"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-[#0A0A0A] mb-1">Upload Certificate</label>
          <FileUploadInput
            value={certificationsValue}
            onDrop={onCertificatesDrop}
            placeholder="Upload Certificates"
          />
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
            className="w-full bg-[#72271E] text-white font-semibold py-2.5 rounded-full text-center cursor-pointer"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
