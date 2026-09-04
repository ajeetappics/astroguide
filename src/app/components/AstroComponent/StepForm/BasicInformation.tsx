'use client';
import React, { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDropzone, FileRejection, Accept } from 'react-dropzone';
import { BsUpload, BsX, BsCameraReels, BsImage, BsCardImage } from 'react-icons/bs';
import Image from 'next/image';
import commonService from '@/services/comman/comman';
import toast from 'react-hot-toast';

interface BasicInformationProps {
    onNext: (data: any) => void;
    onBack: () => void;
    initialData: any;
}

interface FormValues {
    dob: string;
    bio: string;
    profileImg: File | null;
    photos: File[];
    videos: File[];
    galleryPhotos: File[];
    certificateGallery: File[];
}

const MultiFileDropzone = ({
    field,
    label,
    accept,
    icon: Icon
}: {
    field: any;
    label: string;
    accept: Accept;
    icon: React.ElementType;
}) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        field.onChange([...(field.value || []), ...acceptedFiles]);
    }, [field]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept });

    const removeFile = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        const newFiles = [...field.value];
        newFiles.splice(index, 1);
        field.onChange(newFiles);
    };

    return (
        <div>
            <label className="block text-sm font-bold text-[#0A0A0A] mb-1">{label}</label>
            <div {...getRootProps()} className={`w-full min-h-[8rem] rounded-[14px] border-2 bg-transparent flex items-center justify-center cursor-pointer transition-colors ${isDragActive ? 'bg-gray-100' : ''} ${field.value && field.value.length > 0 ? 'border-solid border-[#D1D5DC] p-4' : 'border-dashed border-gray-300'}`}>
                <input {...getInputProps()} />
                {field.value && field.value.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                        {field.value.map((file: File, index: number) => {

                            if (!(file instanceof File)) {
                                return null;
                            }

                            return (
                                <div key={index} className="relative w-full h-24">
                                    {file.type.startsWith('image/') ? (
                                        <Image
                                            src={URL.createObjectURL(file)} // This is now safe
                                            alt={file.name}
                                            layout="fill"
                                            className="object-cover rounded-xl"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center text-center p-2">
                                            <p className="text-xs text-gray-500 break-all">{file.name}</p>
                                        </div>
                                    )}
                                    <button type="button" onClick={(e) => removeFile(e, index)} className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md">
                                        <BsX className="w-4 h-4 text-gray-600" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <Icon className="text-gray-400 text-2xl" />
                        <p className="text-[#717182] text-sm mt-2">Upload or drag and drop</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default function BasicInformation({ onNext, onBack, initialData }: BasicInformationProps) {
    const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            dob: initialData?.basicInfo?.dob || '',
            bio: initialData?.basicInfo?.bio || '',
            profileImg: initialData?.basicInfo?.profileImg || null,
            photos: initialData?.basicInfo?.photos || [],
            videos: initialData?.basicInfo?.videos || [],
            galleryPhotos: initialData?.basicInfo?.galleryPhotos || [],
            certificateGallery: initialData?.basicInfo?.certificateGallery || [],
        },
    });

    const profileImgValue = watch('profileImg');
    const imagePreview = (profileImgValue instanceof File)
        ? URL.createObjectURL(profileImgValue)
        : null;
    const removeImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setValue('profileImg', null);
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles[0]) {
            setValue('profileImg', acceptedFiles[0]);
        }
    }, [setValue]);

    const { getRootProps: getSingleRootProps, getInputProps: getSingleInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] }, multiple: false });

    const onSubmit = async (data: FormValues) => {
        try {
            if (!profileImgValue) {
                toast.error("Please Uploade Profile Image.")
            }

            let uploadedprofileImg: any = [];
            let uploadedphotos: any = [];
            let uploadedvideos: any = [];
            let uploadedgalleryPhotos: any = [];
            let uploadedcertificateGallery: any = [];
            console.log(data.profileImg, "11111111data.profileImg");

            if (data.profileImg) {
                const response: any = await commonService.uploadImage([data.profileImg]);
                uploadedprofileImg = response.data.img[0] || []; // assuming backend returns { img: [...] }
            }
            if (data.photos?.length > 0) {
                const response: any = await commonService.uploadImage(data.photos);
                uploadedphotos = response.data.img || []; // assuming backend returns { img: [...] }
            }
            if (data.videos?.length > 0) {
                const response: any = await commonService.uploadImage(data.videos);
                uploadedvideos = response.data.img || []; // assuming backend returns { img: [...] }
            }
            if (data.galleryPhotos?.length > 0) {
                const response: any = await commonService.uploadImage(data.galleryPhotos);
                uploadedgalleryPhotos = response.data.img || []; // assuming backend returns { img: [...] }
            }
            if (data.certificateGallery?.length > 0) {
                const response: any = await commonService.uploadImage(data.certificateGallery);
                uploadedcertificateGallery = response.data.img || []; // assuming backend returns { img: [...] }
            }

            const finalData = {
                ...data,
                profileImg: uploadedprofileImg,
                photos: uploadedphotos,
                videos: uploadedvideos,
                galleryPhotos: uploadedgalleryPhotos,
                certificateGallery: uploadedcertificateGallery,
            };

            onNext({ basicInfo: finalData });
        } catch (error: any) {
            console.error("File upload error:", error);
            toast.error("Please Uploade Profile Image.")
            // alert(error.message || "Something went wrong during file upload.");
        }
    };


    return (
        <div className="w-full max-w-lg mx-auto p-8">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-inria text-[#72271E] font-bold">Basic Information</h2>
                <p className="text-md text-[#5C5C5C] font-helvetica mt-1">Tell us about yourself</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <label className="block text-sm font-bold text-[#0A0A0A] mb-1">Date of Birth *</label>
                    <input
                        type="date"
                        {...register("dob", {
                            required: "Date of birth is required",
                            validate: (value) => {
                                const today = new Date();
                                const dob = new Date(value);
                                const age =
                                    today.getFullYear() - dob.getFullYear() -
                                    (today < new Date(today.getFullYear(), dob.getMonth(), dob.getDate()) ? 1 : 0);

                                return age >= 18 || "You must be at least 18 years old";
                            },
                        })}
                        className="w-full h-[36px] rounded-[14px] border border-[#D1D5DC] bg-[#F3F3F5] px-4 outline-none focus:border-[#72271E] focus:ring-1 focus:ring-[#72271E] text-gray-500"
                    />
                    {errors.dob && <p className="text-xs text-red-500 mt-1">{errors.dob.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold text-[#0A0A0A] mb-1">Profile Picture</label>
                    <div {...getSingleRootProps()} className={`w-full h-32 rounded-[14px] border-2 bg-transparent flex items-center justify-center cursor-pointer transition-colors ${isDragActive ? 'bg-gray-100' : ''} ${imagePreview ? 'border-solid border-[#D1D5DC] p-4 justify-start' : 'border-dashed border-gray-300'}`}>
                        <input {...getSingleInputProps()} />
                        {imagePreview ? (
                            <div className="relative w-24 h-24">
                                <Image src={imagePreview} alt="Profile Preview" layout="fill" className="object-cover rounded-xl" />
                                <button type="button" onClick={removeImage} className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md"><BsX className="w-5 h-5 text-gray-600" /></button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <BsUpload className="text-gray-400 text-2xl" />
                                <p className="text-[#717182] text-sm mt-2">Upload your photo</p>
                                <p className="text-xs text-gray-400">or drag and drop</p>
                            </div>
                        )}
                    </div>
                </div>

                <Controller
                    name="photos"
                    control={control}
                    render={({ field }) => (
                        <MultiFileDropzone field={field} label="Photos" accept={{ 'image/*': [] }} icon={BsImage} />
                    )}
                />

                <Controller
                    name="videos"
                    control={control}
                    render={({ field }) => (
                        <MultiFileDropzone field={field} label="Videos" accept={{ 'video/*': [] }} icon={BsCameraReels} />
                    )}
                />

                <Controller
                    name="galleryPhotos"
                    control={control}
                    render={({ field }) => (
                        <MultiFileDropzone field={field} label="Gallery Photos" accept={{ 'image/*': [] }} icon={BsCardImage} />
                    )}
                />

                <Controller
                    name="certificateGallery"
                    control={control}
                    render={({ field }) => (
                        <MultiFileDropzone field={field} label="Certificate Gallery" accept={{ 'image/*': [], 'application/pdf': [] }} icon={BsImage} />
                    )}
                />

                <div>
                    <label className="block text-sm font-bold text-[#0A0A0A] mb-1">Short Bio *</label>
                    <textarea
                        {...register("bio", { required: "Bio is required", maxLength: { value: 500, message: "Max 500 characters" } })}
                        placeholder="Tell us about your journey and approach to astrology..."
                        className="w-full h-28 rounded-[14px] border border-[#D1D5DC] bg-[#F3F3F5] p-4 outline-none focus:border-[#72271E] focus:ring-1 focus:ring-[#72271E] text-gray-800 placeholder:text-[#717182]"
                    />
                    <p className="text-right text-xs text-gray-400 mt-1">{watch('bio')?.length || 0}/500 characters</p>
                    {errors.bio && <p className="text-xs text-red-500 mt-1">{errors.bio.message}</p>}
                </div>

                <div className="flex items-center gap-4 pt-6">
                    <button
                        type="button"
                        className="w-full bg-transparent border-2 border-[#72271E] text-[#72271E] font-semibold py-2.5 rounded-full text-center cursor-pointer"
                        onClick={onBack}
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