'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { Listbox } from '@headlessui/react';
import { BsCheck, BsChevronDown, BsChevronUp, BsX, BsUpload, BsTelephone, BsEnvelope } from 'react-icons/bs';
import Image from 'next/image';
import OTPInput from 'react-otp-input';
import toast from 'react-hot-toast';
import { Country, State, City } from "country-state-city";
import authService from '@/services/auth/authService';
import { loginSuccess } from '@/store/slices/authSlice';
import { useDispatch } from 'react-redux';
import commonService from '@/services/comman/comman';


const idProofTypes = ["Aadhar Card", "PAN Card"
  // , "Voter ID", "Passport"
];
const genders = ["Male", "Female"];

interface VerificationProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData: any;
  isAuthenticated: boolean;
}

interface LocationOption {
  value: string;
  label: string;
}

interface FormValues {
  fullName: string;
  mobileNumber: string;
  email: string;
  otp: string;
  gender: string;
  address: string;

  aadharNo: string;
  pincode: number;
  pencardNo: string;

  idProofType: string;
  idProofs: File[];
  country?: LocationOption;
  state?: LocationOption;
  city?: LocationOption;
}

export default function Verification({ onNext, onBack, initialData, isAuthenticated }: VerificationProps) {
  const dispatch = useDispatch();
  const [otpError, setOtpError] = useState("");
  const [otpVerified, setOtpVerified] = useState(isAuthenticated || false);
  const [countriesOptions, setCountriesOptions] = useState<LocationOption[]>([]);
  const [statesOptions, setStatesOptions] = useState<LocationOption[]>([]);
  const [citiesOptions, setCitiesOptions] = useState<LocationOption[]>([]);


  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      fullName: initialData?.verification?.fullName || '',
      mobileNumber: initialData?.verification?.mobileNumber || '',
      email: initialData?.verification?.email || '',
      gender: initialData?.verification?.gender || '',
      address: initialData?.verification?.address || '',
      aadharNo: initialData?.verification?.aadharNo || '',
      pincode: initialData?.verification?.pincode || '',
      pencardNo: initialData?.verification?.pencardNo || '',
      country: initialData?.verification?.country || { value: "IN", label: "India" },
      state: initialData?.verification?.state || undefined,
      city: initialData?.verification?.city || undefined,
      idProofType: initialData?.verification?.idProofType || '',
      idProofs: initialData?.verification?.idProofs || [],
    }
  });

  const selectedCountry = watch("country");
  const selectedState = watch("state");
  const idProofsValue = watch('idProofs', []);
  const phoneValue = watch("mobileNumber", "");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setValue('idProofs', [...idProofsValue, ...acceptedFiles], {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [setValue, idProofsValue]
  );


  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] }, multiple: true });

  const removeIdProof = (index: number) => {
    setValue(
      'idProofs',
      idProofsValue.filter((file, i) => file && index !== i),
      {
        shouldValidate: true,
        shouldDirty: true,
      }
    );
  };


  // Send OTP function
  const handleSendOtp = async () => {
    if (!phoneValue || phoneValue.length !== 10) {
      alert("Enter a valid 10-digit phone number");
      return;
    }

    try {
      const payload = { mobileNumber: phoneValue }; // send only local number
      const response: any = await authService.sendPhoneOtp(payload);
      if (response) {
        toast.success("Sending OTP successful!");
        setOtpSent(true);
      }
    } catch (error: unknown) {
      const errorMessage = (error as any).message || "An unknown error occurred.";
      toast.error(errorMessage);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 4) {
      setOtpError("Please enter a 4-digit OTP");
      return;
    }
    try {
      const payload = { otp: otp, mobileNumber: phoneValue?.toString()?.trim() };
      const response: any = await authService.verifyPhoneOtp(payload);
      if (response) {
        const { _id } = response.data?.astrologer

        const { token } = response.data
        const payloade = {
          user: response.data?.astrologer,
          id: _id,
          token
        }
        dispatch(loginSuccess(payloade));
        toast.success("OTP Verified! Redirecting...");
        setOtpVerified(true);
        setValue("otp", otp);
        setOtpError("");
        setOtpSent(false);
      }
    } catch (error: unknown) {
      const errorMessage = (error as any).message || "An unknown error occurred.";
      toast.error(errorMessage);
    }
  };

  // Inside your Verification.tsx component...

  // Make sure to add a state for tracking the submission process
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: any) => {
    // if (!otpVerified) {
    //   toast.error("Please verify your OTP before proceeding.");
    //   return;
    // }

    setIsSubmitting(true);

    try {
      if (data.idProofs && data.idProofs.length > 0) {
        // Upload all files together
        const response: any = await commonService.uploadImage(data.idProofs);
        const finalVerificationData = {
          ...data,
          idProofs: response.data.img
        };
        onNext({ verification: finalVerificationData });
      }


    } catch (error) {
      console.error("An error occurred during file upload:", error);
      toast.error("One or more files failed to upload. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  useEffect(() => {
    setCountriesOptions(Country.getAllCountries().map(c => ({ value: c.isoCode, label: c.name })));
  }, []);


  useEffect(() => {
    if (selectedCountry?.value) {
      const states = State.getStatesOfCountry(selectedCountry.value).map(s => ({
        value: s.isoCode,
        label: s.name
      }));
      setStatesOptions(states);
      setCitiesOptions([]); // Reset cities
    } else {
      setStatesOptions([]);
      setCitiesOptions([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry?.value && selectedState?.value) {
      const cities = City.getCitiesOfState(selectedCountry.value, selectedState.value).map(c => ({
        value: c.name,
        label: c.name
      }));
      setCitiesOptions(cities);
    } else {
      setCitiesOptions([]);
    }
  }, [selectedCountry, selectedState]);


  return (
    <div className="w-full max-w-lg mx-auto p-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-inria text-[#72271E] font-bold">Verification</h2>
        <p className="text-md text-[#5C5C5C] font-helvetica mt-1">Verify your identity and banking details</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-bold text-[#0A0A0A] mb-1">Full Name *</label>
          <input
            {...register("fullName", { required: "Full name is required" })}
            type="text"
            placeholder="Enter your full name"
            className="w-full h-[36px] rounded-[14px] border border-[#D1D5DC] bg-[#F3F3F5] px-4 outline-none focus:border-[#72271E] focus:ring-1 focus:ring-[#72271E] text-gray-800 placeholder:text-[#717182]"
          />
          {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-[#0A0A0A] mb-1">Phone Number *</label>
          <div className="flex items-center gap-4">
            <div className="relative flex-grow">
              <BsTelephone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register("mobileNumber", {
                  required: "Phone number is required", minLength: { value: 10, message: "Phone Number must be 10 digits" },
                  maxLength: { value: 10, message: "Phone Number must be 10 digits" }
                })}
                type="tel"
                // placeholder="+91 XXXXX XXXXX"
                placeholder="Enter Mobile No."
                className="w-full h-[36px] rounded-[14px] border border-[#D1D5DC] bg-[#FAF6F2] pl-10 pr-4 outline-none focus:border-[#72271E] focus:ring-1 focus:ring-[#72271E] text-gray-800 placeholder:text-[#717182]"
              />
            </div>
            {/* <button type="button" onClick={handleSendOtp} className="bg-[#72271E] text-white font-semibold py-2 px-6 rounded-full text-sm">Send OTP</button> */}
          </div>
          {errors.mobileNumber && <p className="text-xs text-red-500 mt-1">{errors.mobileNumber.message}</p>}
        </div>
        <div>
          {otpSent && (
            <>
              <label className="block text-sm font-bold text-[#0A0A0A] mb-1">Send OTP *</label>
              <div className="flex items-center justify-between">
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={4}
                  shouldAutoFocus
                  renderInput={(props: any) => (
                    <input
                      {...props}
                      className="!w-12 h-12 text-2xl text-center text-black border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#72271E] focus:border-[#72271E] transition-all duration-200 "
                    />
                  )}
                  containerStyle={{ gap: "1rem", justifyContent: "center", width: "70%" }}
                />

                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="bg-[#16A34A] hover:bg-[#15803d] text-white font-semibold py-2 px-6 rounded-full text-sm"
                >
                  Verify OTP
                </button>
              </div>
            </>
          )}
          {otpError && <p className="text-xs text-red-500 mt-1">{otpError}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-[#0A0A0A] mb-1">Email (Optional)</label>
          <div className="relative">
            <BsEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register("email")}
              type="email"
              placeholder="your.email@example.com"
              className="w-full h-[36px] rounded-[14px] border border-[#D1D5DC] bg-[#FAF6F2] pl-10 pr-4 outline-none focus:border-[#72271E] focus:ring-1 focus:ring-[#72271E] text-gray-800 placeholder:text-[#717182]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-[#0A0A0A] mb-1">Gender *</label>
          <Controller
            name="gender"
            control={control}
            rules={{ required: "Please select a gender" }}
            render={({ field }) => (
              <Listbox value={field.value} onChange={field.onChange}>
                <div className="relative cursor-pointer">
                  <Listbox.Button className="relative w-full h-[36px] rounded-[14px] border border-[#D1D5DC] bg-[#F3F3F5] px-4 text-left outline-none focus:border-[#72271E] focus:ring-1 focus:ring-[#72271E]">
                    <span className={`block truncate ${field.value ? 'text-gray-800' : 'text-[#717182]'}`}>{field.value || "Select your gender"}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"><BsChevronDown className="h-4 w-4 text-gray-400" /></span>
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10 border border-[#D1D5DC]">
                    {genders.map((gender, index) => (<Listbox.Option key={index} value={gender} className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-[#72271E] text-white' : 'text-gray-900'}`}>{({ selected }) => (<><span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{gender}</span>{selected ? (<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white"><BsCheck className="h-5 w-5" /></span>) : null}</>)}</Listbox.Option>))}
                  </Listbox.Options>
                </div>
              </Listbox>
            )}
          />
          {errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender.message}</p>}
        </div>

        {/* Country */}
        {/* <div>
          <label className="block text-sm font-bold text-[#0A0A0A] mb-1">Country *</label>
          <Controller
            name="country"
            control={control}
            rules={{ required: "Country is required" }}
            render={({ field }) => (
              <Listbox value={field.value} onChange={(value) => {
                field.onChange(value);
                setValue("state", undefined);
                setValue("city", undefined);
              }}>
                <div className="relative cursor-pointer">
                  <Listbox.Button className="relative w-full h-[36px] rounded-[14px] border border-[#D1D5DC] bg-[#F3F3F5] px-4 text-left outline-none focus:border-[#72271E] focus:ring-1 focus:ring-[#72271E]">
                    <span className={`block truncate ${field.value ? 'text-gray-800' : 'text-[#717182]'}`}>{field.value?.label || "Select your country"}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"><BsChevronDown className="h-4 w-4 text-gray-400" /></span>
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-20 border border-[#D1D5DC]">
                    {countriesOptions.map((country, index) => (<Listbox.Option key={index} value={country} className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-[#72271E] text-white' : 'text-gray-900'}`}>{({ selected }) => (<><span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{country.label}</span>{selected ? (<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white"><BsCheck className="h-5 w-5" /></span>) : null}</>)}</Listbox.Option>))}
                  </Listbox.Options>
                </div>
              </Listbox>
            )}
          />
          {errors.country && <p className="text-xs text-red-500 mt-1">{errors.country.message}</p>}
        </div> */}

        {/* State */}
        <div>
          <label className="block text-sm font-bold text-[#0A0A0A] mb-1">State *</label>
          <Controller
            name="state"
            control={control}
            rules={{ required: "State is required" }}
            render={({ field }) => (
              <Listbox disabled={!selectedCountry} value={field.value} onChange={(value) => {
                field.onChange(value);
                setValue("city", undefined);
              }}>
                <div className="relative cursor-pointer">
                  <Listbox.Button className="relative w-full h-[36px] rounded-[14px] border border-[#D1D5DC] bg-[#F3F3F5] px-4 text-left outline-none focus:border-[#72271E] focus:ring-1 focus:ring-[#72271E] disabled:bg-gray-200">
                    <span className={`block truncate ${field.value ? 'text-gray-800' : 'text-[#717182]'}`}>{field.value?.label || "Select your state"}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"><BsChevronDown className="h-4 w-4 text-gray-400" /></span>
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-20 border border-[#D1D5DC]">
                    {statesOptions.map((state, index) => (<Listbox.Option key={index} value={state} className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-[#72271E] text-white' : 'text-gray-900'}`}>{({ selected }) => (<><span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{state.label}</span>{selected ? (<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white"><BsCheck className="h-5 w-5" /></span>) : null}</>)}</Listbox.Option>))}
                  </Listbox.Options>
                </div>
              </Listbox>
            )}
          />
          {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state.message}</p>}
        </div>


        {/* City */}
        <div>
          <label className="block text-sm font-bold text-[#0A0A0A] mb-1">City *</label>
          <Controller
            name="city"
            control={control}
            rules={{ required: "City is required" }}
            render={({ field }) => (
              <Listbox disabled={!selectedState} value={field.value} onChange={field.onChange}>
                <div className="relative cursor-pointer">
                  <Listbox.Button className="relative w-full h-[36px] rounded-[14px] border border-[#D1D5DC] bg-[#F3F3F5] px-4 text-left outline-none focus:border-[#72271E] focus:ring-1 focus:ring-[#72271E] disabled:bg-gray-200">
                    <span className={`block truncate ${field.value ? 'text-gray-800' : 'text-[#717182]'}`}>{field.value?.label || "Select your city"}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"><BsChevronDown className="h-4 w-4 text-gray-400" /></span>
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-20 border border-[#D1D5DC]">
                    {citiesOptions.map((city, index) => (<Listbox.Option key={index} value={city} className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-[#72271E] text-white' : 'text-gray-900'}`}>{({ selected }) => (<><span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{city.label}</span>{selected ? (<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white"><BsCheck className="h-5 w-5" /></span>) : null}</>)}</Listbox.Option>))}
                  </Listbox.Options>
                </div>
              </Listbox>
            )}
          />
          {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-[#0A0A0A] mb-1">Pincode No. *</label>
          <input
            {...register("pincode", {
              required: "Pincode No. is required",
              minLength: { value: 6, message: "Pincode must be 6 digits" },
              maxLength: { value: 6, message: "Pincode must be 6 digits" }
            })}
            type="number"
            placeholder="Enter your Pincode No."
            className="w-full h-[36px] rounded-[14px] border border-[#D1D5DC] bg-[#F3F3F5] px-4 outline-none focus:border-[#72271E] focus:ring-1 focus:ring-[#72271E] text-gray-800 placeholder:text-[#717182]"
          />
          {errors.pincode && <p className="text-xs text-red-500 mt-1">{errors.pincode.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-[#0A0A0A] mb-1">Full Address *</label>
          <textarea
            rows={2}
            {...register("address", { required: "Full Address is required" })}
            placeholder="Enter your full Address"
            className="w-full rounded-[14px] border border-[#D1D5DC] bg-[#F3F3F5] p-2 px-4 outline-none focus:border-[#72271E] focus:ring-1 focus:ring-[#72271E] text-gray-800 placeholder:text-[#717182]"
          />
          {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-[#0A0A0A] mb-1">Aadhar No.</label>
          <input
            {...register("aadharNo"
              // , { required: "Aadhar No. is required" }
            )}
            type="text"
            placeholder="Enter your Aadhar No."
            className="w-full h-[36px] rounded-[14px] border border-[#D1D5DC] bg-[#F3F3F5] px-4 outline-none focus:border-[#72271E] focus:ring-1 focus:ring-[#72271E] text-gray-800 placeholder:text-[#717182]"
          />
          {errors.aadharNo && <p className="text-xs text-red-500 mt-1">{errors.aadharNo.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-[#0A0A0A] mb-1">PAN No.</label>
          <input
            {...register("pencardNo"
              // , { required: "Pencard No. is required" }
            )}
            type="text"
            placeholder="Enter your PAN No."
            className="w-full h-[36px] rounded-[14px] border border-[#D1D5DC] bg-[#F3F3F5] px-4 outline-none focus:border-[#72271E] focus:ring-1 focus:ring-[#72271E] text-gray-800 placeholder:text-[#717182]"
          />
          {errors.pencardNo && <p className="text-xs text-red-500 mt-1">{errors.pencardNo.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-[#0A0A0A] mb-1">Upload ID Proof *</label>
          <Controller
            name="idProofType"
            control={control}
            rules={{ required: 'Please select an ID type' }}
            render={({ field }) => (
              <Listbox value={field.value} onChange={field.onChange}>
                {({ open }) => (
                  <div className="relative mb-3">
                    <Listbox.Button className="relative w-full h-[36px] rounded-[14px] border border-[#D1D5DC] bg-[#FAF6F2] px-4 text-left outline-none focus:border-[#72271E] focus:ring-1 focus:ring-[#72271E]">
                      <span className={`block truncate ${field.value ? 'text-gray-800' : 'text-[#717182]'}`}>
                        {field.value || "Select ID proof type"}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        {open ? <BsChevronUp className="h-4 w-4 text-gray-400" /> : <BsChevronDown className="h-4 w-4 text-gray-400" />}
                      </span>
                    </Listbox.Button>
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10 border border-[#D1D5DC]">
                      {idProofTypes.map((type, index) => (
                        <Listbox.Option
                          key={index}
                          value={type}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-[#72271E] text-white' : 'text-gray-900'
                            }`
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{type}</span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                                  <BsCheck className="h-5 w-5" />
                                </span>
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
          {errors.idProofType && <p className="text-xs text-red-500">{errors.idProofType.message}</p>}

          {/* File Upload Validation */}
          <Controller
            name="idProofs"
            control={control}
            rules={{
              validate: (files) =>
                (files && files.length > 0) || "Please upload at least one ID proof",
            }}
            render={() => (
              <div
                {...getRootProps()}
                className={`w-full min-h-[8rem] rounded-[14px] border-2 bg-transparent flex items-center justify-center cursor-pointer transition-colors 
          ${isDragActive ? 'bg-gray-100' : ''} 
          ${idProofsValue.length > 0 ? 'border-solid border-[#D1D5DC] p-4' : 'border-dashed border-gray-300'}`}
              >
                <input {...getInputProps()} />
                {idProofsValue.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full" onClick={(e) => e.preventDefault()}>
                    {idProofsValue.map((file, index) => {
                      
                      return <div key={index} className="relative w-full h-24">
                        <Image
                          src={typeof file === "string" ? file : URL.createObjectURL(file)}
                          alt={file.name}
                          fill
                          className="object-cover rounded-xl"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeIdProof(index);
                          }}
                          className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md"
                        >
                          <BsX className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <BsUpload className="text-gray-400 text-2xl" />
                    <p className="text-[#717182] text-sm mt-2">
                      Upload clear photos of both sides
                    </p>
                  </div>
                )}
              </div>
            )}
          />
          {errors.idProofs && (
            <p className="text-xs text-red-500">{errors.idProofs.message}</p>
          )}
        </div>

        <div className="flex items-center gap-4 pt-6">
          <button type="button" onClick={onBack} className="w-full bg-transparent border-2 border-[#72271E] text-[#72271E] font-semibold py-2.5 rounded-full text-center cursor-pointer">Back</button>
          <button type="submit" className="w-full bg-[#72271E] text-white font-semibold py-2.5 rounded-full text-center cursor-pointer" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Next'}</button>
        </div>
      </form>
    </div>
  );
}