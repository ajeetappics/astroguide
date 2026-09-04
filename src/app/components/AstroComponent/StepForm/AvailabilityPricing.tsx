'use client';
import React, { useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { useForm, Controller } from 'react-hook-form';
import { BsChatDots, BsTelephone, BsCameraVideo, BsFileText } from 'react-icons/bs';

const consultationModes = [
    { name: 'Chat', icon: BsChatDots },
    { name: 'Call', icon: BsTelephone },
    { name: 'Video', icon: BsCameraVideo },
    { name: 'PhysicalVisit', icon: BsFileText }
] as const;

const daysOfWeek = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

interface AvailabilityPricingProps {
    onNext: (data: any) => void;
    onBack: () => void;
    initialData?: any;
}

type ModeName = typeof consultationModes[number]['name'];

// Helper to create the default schedule structure
const createDefaultSchedule = () => {
    return daysOfWeek.reduce((acc, day) => {
        acc[day] = { isActive: false, startTime: '', endTime: '' };
        return acc;
    }, {} as FormValues['schedule']);
};


interface FormValues {
    modes: ModeName[];
    selectAll: boolean;
    globalStartTime: string;
    globalEndTime: string;
    schedule: {
        [key: string]: {
            isActive: boolean;
            startTime: string;
            endTime: string;
        };
    };
    prices: {
        [key in ModeName]?: {
            actual: string;
            offer: string;
        };
    };
}

export default function AvailabilityPricing({ onNext, onBack, initialData }: AvailabilityPricingProps) {
    const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            modes: initialData?.availability?.modes || [],
            selectAll: initialData?.availability?.selectAll || false,
            globalStartTime: initialData?.availability?.globalStartTime || '',
            globalEndTime: initialData?.availability?.globalEndTime || '',
            schedule: initialData?.availability?.schedule || createDefaultSchedule(),
            prices: initialData?.availability?.prices || {
                Chat: { actual: '', offer: '' },
                Call: { actual: '', offer: '' },
                Video: { actual: '', offer: '' },
                PhysicalVisit: { actual: '', offer: '' },
            },
        }
    });

    const modesValue = watch('modes', []);
    const scheduleValue = watch('schedule');
    const selectAll = watch('selectAll');
    const globalStartTime = watch('globalStartTime');
    const globalEndTime = watch('globalEndTime');


    // Effect to toggle all day switches based on "Select All"
    useEffect(() => {
        daysOfWeek.forEach(day => {
            setValue(`schedule.${day}.isActive`, selectAll);
        });
    }, [selectAll, setValue]);

    // Effect to apply global time to all days when "Select All" is active
    useEffect(() => {
        if (selectAll) {
            daysOfWeek.forEach(day => {
                setValue(`schedule.${day}.startTime`, globalStartTime);
                setValue(`schedule.${day}.endTime`, globalEndTime);
            });
        }
    }, [globalStartTime, globalEndTime, selectAll, setValue]);



    const toggleMode = (mode: ModeName) => {
        const currentModes = modesValue || [];
        const newModes = currentModes.includes(mode)
            ? currentModes.filter(m => m !== mode)
            : [...currentModes, mode];
        setValue('modes', newModes, { shouldValidate: true });
    };

    const onSubmit = (data: FormValues) => {
        console.log(data);
        onNext({ availability: data });
    };

    return (
        <div className="w-full max-w-lg mx-auto p-8">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-inria text-[#72271E] font-bold">Availability & Pricing</h2>
                <p className="text-md text-[#5C5C5C] font-helvetica mt-1">Set your schedule and rates</p>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="block text-sm font-bold text-[#0A0A0A] mb-2">Consultation Modes & Pricing *</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {consultationModes.map(mode => (
                            <div key={mode.name} className={`p-3 rounded-xl border-2 transition-all ${modesValue.includes(mode.name) ? 'border-[#72271E]' : 'border-transparent'}`}>
                                <button
                                    type="button"
                                    onClick={() => toggleMode(mode.name)}
                                    className={`w-full flex items-center justify-center gap-2 h-[36px] rounded-[14px] border-2 text-sm font-medium transition-colors cursor-pointer ${modesValue.includes(mode.name)
                                        ? 'bg-[#72271E] text-white border-[#72271E]'
                                        : 'bg-transparent text-[#364153] border-[#72271E]'
                                        }`}
                                >
                                    <mode.icon />
                                    {mode.name}
                                </button>
                                {modesValue.includes(mode.name) && (
                                    <div className="mt-3 space-y-2">
                                        {/* Actual Price */}
                                        <div>
                                            <label htmlFor={`${mode.name}-actual`} className="block text-xs font-bold text-gray-600 mb-1">Actual Price (₹)</label>
                                            <div className="relative">
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                                                <input
                                                    type="number"
                                                    id={`${mode.name}-actual`}
                                                    {...register(`prices.${mode.name}.actual`, {
                                                        required: "Price is required",
                                                        min: { value: 0, message: "Cannot be negative" }
                                                    })}
                                                    placeholder="e.g., 100"
                                                    className="w-full h-[36px] rounded-[14px] border border-[#D1D5DC] bg-[#FAF6F2] pl-7 pr-3 outline-none focus:border-[#72271E] focus:ring-1 focus:ring-[#72271E] text-gray-800 placeholder:text-[#717182]"
                                                />
                                            </div>
                                            {errors.prices?.[mode.name]?.actual && <p className="text-xs text-red-500 mt-1">{errors.prices[mode.name]?.actual?.message}</p>}
                                        </div>
                                        {/* Offer Price */}
                                        <div>
                                            <label htmlFor={`${mode.name}-offer`} className="block text-xs font-bold text-gray-600 mb-1">Offer Price (₹)</label>
                                            <div className="relative">
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                                                <input
                                                    type="number"
                                                    id={`${mode.name}-offer`}
                                                    {...register(`prices.${mode.name}.offer`, {
                                                        required: "Price is required",
                                                        min: { value: 0, message: "Cannot be negative" }
                                                    })}
                                                    placeholder="e.g., 50"
                                                    className="w-full h-[36px] rounded-[14px] border border-[#D1D5DC] bg-[#FAF6F2] pl-7 pr-3 outline-none focus:border-[#72271E] focus:ring-1 focus:ring-[#72271E] text-gray-800 placeholder:text-[#717182]"
                                                />
                                            </div>
                                            {errors.prices?.[mode.name]?.offer && <p className="text-xs text-red-500 mt-1">{errors.prices[mode.name]?.offer?.message}</p>}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <input type="hidden" {...register('modes', { required: 'Please select at least one mode' })} />
                    {errors.modes && <p className="text-xs text-red-500 mt-2">{errors.modes.message}</p>}
                </div>


                <div>
                    <label className="block text-sm font-bold text-[#0A0A0A] mb-3">Weekly Schedule *</label>
                    <div className="flex items-center gap-3 p-2">
                        <input type="checkbox" {...register("selectAll")} id="select-all" className="h-4 w-4 rounded border-gray-300 text-[#72271E] focus:ring-[#72271E]" />
                        <label htmlFor="select-all" className="text-sm font-medium text-gray-700">Apply to all days</label>
                    </div>

                    {selectAll && (
                        <div className="grid grid-cols-2 gap-4 p-2 mt-2 border rounded-xl">
                            <div>
                                <label className="text-xs font-bold text-gray-600">Start Time</label>
                                <input type="time" {...register("globalStartTime")} className="w-full mt-1 h-10 rounded-lg border border-[#D1D5DC] bg-[#FAF6F2] p-2 outline-none focus:border-[#72271E] focus:ring-1 focus:ring-[#72271E] text-gray-800" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-600">End Time</label>
                                <input type="time" {...register("globalEndTime")} className="w-full mt-1 h-10 rounded-lg border border-[#D1D5DC] bg-[#FAF6F2] p-2 outline-none focus:border-[#72271E] focus:ring-1 focus:ring-[#72271E] text-gray-800" />
                            </div>
                        </div>
                    )}

                    <div className="space-y-3 mt-4">
                        {daysOfWeek.map(day => (
                            <div key={day} className="p-1">
                                <div className="flex items-center justify-between w-full h-12 rounded-2xl border border-gray-200 bg-[#fff] px-4">
                                    <span className="text-gray-700">{day}</span>
                                    <Controller
                                        name={`schedule.${day}.isActive`}
                                        control={control}
                                        render={({ field }) => (
                                            <Switch
                                                checked={field.value}
                                                onChange={field.onChange}
                                                disabled={selectAll}
                                                className={`${field.value ? 'bg-[#72271E]' : 'bg-gray-300'}
                                                    relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer disabled:opacity-50`}
                                            >
                                                <span
                                                    className={`${field.value ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                                                />
                                            </Switch>
                                        )}
                                    />
                                </div>
                                {scheduleValue[day]?.isActive && !selectAll && (
                                    <div className="grid grid-cols-2 gap-4 p-2 mt-2">
                                        <div>
                                            <label className="text-xs text-gray-500">Start Time</label>
                                            <input
                                                type="time"
                                                {...register(`schedule.${day}.startTime`)}
                                                className="w-full mt-1 h-10 rounded-lg border border-[#D1D5DC] bg-[#FAF6F2] p-2 outline-none focus:border-[#72271E] focus:ring-1 focus:ring-[#72271E] text-gray-800"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-500">End Time</label>
                                            <input
                                                type="time"
                                                {...register(`schedule.${day}.endTime`)}
                                                className="w-full mt-1 h-10 rounded-lg border border-[#D1D5DC] bg-[#FAF6F2] p-2 outline-none focus:border-[#72271E] focus:ring-1 focus:ring-[#72271E] text-gray-800"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4 pt-6">
                    <button
                        onClick={onBack}
                        type="button"
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
