// src/app/components/onboarding/RegisterForm.tsx

'use client';

import Loading from "@/app/loading";
import astoProfileApi from "@/services/astoProfile/astoProfileApi";
import { UserRegisterPayload } from "@/services/astoProfile/astoProfileApi";
import commonService from "@/services/comman/comman";
import { loginSuccess } from "@/store/slices/authSlice";
import { RootState } from "@/store/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Country, State, City } from "country-state-city";
import Select, { SingleValue } from "react-select";

type OptionType = { label: string; value: string };

export interface RegisterFormInputs {
  profileImg?: string;
  fullName: string;
  mobileNumber: string;
  dob: string;
  timeOfBirth: string;
  gender: string;
  email: string;
  country: OptionType | null;
  state: OptionType | null;
  city: OptionType | null;
  address: string;
}

export default function RegisterForm({ mobileNumber }: { mobileNumber: string }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [countriesOptions, setCountriesOptions] = useState<OptionType[]>([]);
  const [statesOptions, setStatesOptions] = useState<OptionType[]>([]);
  const [citiesOptions, setCitiesOptions] = useState<OptionType[]>([]);

  // ========================================================================
  // START: MODIFIED CODE
  // ========================================================================
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue, // <-- Import setValue from useForm
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    defaultValues: {
      profileImg: "",
      fullName: "",
      mobileNumber,
      dob: "",
      timeOfBirth: "",
      gender: "",
      email: "",
      country: null,
      state: null,
      city: null,
      address: "",
    },
  });

  // This useEffect now also sets the default country to India
  useEffect(() => {
    const countries = Country.getAllCountries().map((c) => ({
      value: c.isoCode,
      label: c.name,
    }));
    setCountriesOptions(countries);

    // Find India by its ISO code 'IN' and set it as the default
    const indiaOption = countries.find(c => c.value === 'IN');
    if (indiaOption) {
      // Programmatically set the value for the 'country' field in react-hook-form
      setValue('country', indiaOption, { shouldValidate: true });
    }
  }, [setValue]); // <-- Add setValue to the dependency array

  // ========================================================================
  // END: MODIFIED CODE
  // ========================================================================

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);


  const selectedCountry = watch("country");
  const selectedState = watch("state");

  // This useEffect will now automatically run when India is set as default
  useEffect(() => {
    if (selectedCountry) {
      // Reset state and city when country changes
      setValue('state', null);
      setValue('city', null);
      const states = State.getStatesOfCountry(selectedCountry.value).map((s) => ({
        value: s.isoCode,
        label: s.name,
      }));
      setStatesOptions(states);
      setCitiesOptions([]);
    } else {
      setStatesOptions([]);
      setCitiesOptions([]);
    }
  }, [selectedCountry, setValue]); // <-- Added setValue dependency


  useEffect(() => {
    if (selectedCountry && selectedState) {
      // Reset city when state changes
      setValue('city', null);
      const cities = City.getCitiesOfState(selectedCountry.value, selectedState.value).map((c) => ({
        value: c.name,
        label: c.name,
      }));
      setCitiesOptions(cities);
    } else {
      setCitiesOptions([]);
    }
  }, [selectedCountry, selectedState, setValue]); // <-- Added setValue dependency

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      setIsLoading(true);

      let profileImg: string | undefined;
      if (profileImageFile) {
        const response = await commonService.uploadImage(profileImageFile);
        profileImg = response?.data?.img?.[0];
      }

      const payload: UserRegisterPayload = {
        fullName: data.fullName,
        email: data.email,
        mobileNumber: data.mobileNumber,
        city: data.city?.label || "",
        state: data.state?.label || "",
        address: data.address,
        // country: data.country?.label || "",
        dob: data.dob,
        timeOfBirth: data.timeOfBirth,
        gender: data.gender,
        // location: {},
        ...(profileImg ? { profileImg } : {}),
      };

      const resUser = await astoProfileApi.userRegister(payload);
      const astroData = resUser?.data?.user;
      const token = resUser?.data?.token;

      if (!astroData || !token) throw new Error("Registration failed. Missing response data.");

      dispatch(loginSuccess({ user: astroData, id: astroData._id, token }));
      toast.success("Registration successful!");
      router.push("/thank-you");
    } catch (error: any) {
      toast.error(error?.message || "Could not register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));
      setProfileImageFile(file);
    }
  };

  const onImageClick = () => fileInputRef.current?.click();

  if (isLoading) return <Loading />;

  return (
    <main className="bg-[#F7F2ED] flex flex-col items-center justify-start min-h-screen py-12 px-4 sm:px-6 text-gray-800">
      <div className="w-full max-w-3xl mx-auto p-6 sm:p-8 text-gray-900">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-inria text-[#72271E] font-bold">User Registration</h2>
        </div>

        {/* Profile Image */}
          <div className="flex flex-col items-center mb-8">
          <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
          <div className="relative group w-28 h-28 cursor-pointer" onClick={onImageClick}>
            {profileImage ? (
              <Image src={profileImage} alt="Profile" fill className="rounded-full object-cover" />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center">
                <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4c0 .7.5 1.2 1.2 1.2h16.8c.7 0 1.2-.5 1.2-1.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-xs font-bold">Upload</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-bold mb-1">Full Name *</label>
            <input
              type="text"
              {...register("fullName", { required: "Name is required" })}
              className="w-full h-12 rounded-[14px] border border-gray-300 px-4 bg-[#FAF6F2] text-gray-800"
              placeholder="Enter full name"
            />
            {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>}
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm font-bold mb-1">Date of Birth *</label>
            <input
              type="date"
              {...register("dob", { required: "Date of birth is required" })}
              className="w-full h-12 rounded-[14px] border border-gray-300 px-4 bg-[#FAF6F2] text-gray-800"
            />
            {errors.dob && <p className="text-xs text-red-500 mt-1">{errors.dob.message}</p>}
          </div>

          {/* Time of Birth */}
          <div>
            <label className="block text-sm font-bold mb-1">Time of Birth *</label>
            <input
              type="time"
              {...register("timeOfBirth", { required: "Time of birth is required" })}
              className="w-full h-12 rounded-[14px] border border-gray-300 px-4 bg-[#FAF6F2] text-gray-800"
            />
            {errors.timeOfBirth && <p className="text-xs text-red-500 mt-1">{errors.timeOfBirth.message}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-bold mb-1">Gender *</label>
            <div className="flex gap-6 items-center">
              {["Male", "Female", "Other"].map((g) => (
                <label key={g} className="flex items-center gap-2">
                  <input type="radio" value={g} {...register("gender", { required: "Gender is required" })} className="accent-[#72271E]" />
                  <span className="text-sm text-gray-700">{g}</span>
                </label>
              ))}
            </div>
            {errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-bold mb-1">Email *</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full h-12 rounded-[14px] border border-gray-300 px-4 bg-[#FAF6F2] text-gray-800"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          {/* Country */}
          {/* <div>
            <label className="block text-sm font-bold mb-1">Country *</label>
            <Controller
              name="country"
              control={control}
              rules={{ required: "Country is required" }}
              render={({ field }) => (
                <Select<OptionType, false>
                  {...field}
                  options={countriesOptions}
                  placeholder="Select country"
                  className="text-gray-800"
                  onChange={(val: SingleValue<OptionType>) => field.onChange(val)}
                  value={field.value}
                />
              )}
            />
            {errors.country && <p className="text-xs text-red-500 mt-1">{errors.country.message}</p>}
          </div> */}

          {/* State */}
          <div>
            <label className="block text-sm font-bold mb-1">State *</label>
            <Controller
              name="state"
              control={control}
              rules={{ required: "State is required" }}
              render={({ field }) => (
                <Select<OptionType, false>
                  {...field}
                  options={statesOptions}
                  placeholder="Select state"
                  className="text-gray-800"
                  onChange={(val: SingleValue<OptionType>) => field.onChange(val)}
                  value={field.value}
                />
              )}
            />
            {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state.message}</p>}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-bold mb-1">City *</label>
            <Controller
              name="city"
              control={control}
              rules={{ required: "City is required" }}
              render={({ field }) => (
                <Select<OptionType, false>
                  {...field}
                  options={citiesOptions}
                  placeholder="Select city"
                  className="text-gray-800"
                  onChange={(val: SingleValue<OptionType>) => field.onChange(val)}
                  value={field.value}
                />
              )}
            />
            {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-bold mb-1">Address *</label>
            <textarea
              {...register("address", { required: "Address is required" })}
              className="w-full rounded-[14px] border border-gray-300 px-4 py-3 bg-[#FAF6F2] text-gray-800 min-h-[88px]"
              placeholder="Enter your address"
            />
            {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>}
          </div>

          {/* Submit */}
          <div className="md:col-span-2 pt-8 flex justify-center">
            <button type="submit" className="w-44 sm:w-40 bg-[#72271E] text-white font-semibold py-3 rounded-full hover:bg-[#5d1f17] transition">
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}