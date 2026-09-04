'use client'

import React from 'react';
import Image from 'next/image';
import { popupImage, apple_store, google_store } from '@/assets/images';
import { usePopup } from './PopupContext';
import { IoClose } from 'react-icons/io5';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.astrovani.balaji.app';
const APP_STORE_URL = 'https://apps.apple.com/in/app/balaji-astro-guide/id6753894953';

export default function Popup() {
    const { isOpen, closePopup } = usePopup();

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={closePopup}
        >
            <div
                className="relative rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-[95vw] md:w-[85vw] max-w-[850px] aspect-[10000/5702] overflow-hidden bg-transparent transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src={popupImage}
                        alt="Popup Background"
                        fill
                        sizes="(max-width: 850px) 95vw, 850px"
                        className="object-cover w-full h-full select-none"
                        priority
                    />
                </div>

                {/* App Store & Google Play Buttons Overlay */}
                <div className="absolute left-[15.5%] bottom-[9.5%] w-[32%] flex items-center justify-between gap-[5%] z-20">
                    <a
                        href={PLAY_STORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-[47.5%] block transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer drop-shadow-md"
                        title="Get it on Google Play"
                    >
                        <Image
                            src={google_store}
                            alt="Get it on Google Play"
                            className="w-full h-auto"
                            priority
                        />
                    </a>
                    <a
                        href={APP_STORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-[47.5%] block transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer drop-shadow-md"
                        title="Download on the App Store"
                    >
                        <Image
                            src={apple_store}
                            alt="Download on the App Store"
                            className="w-full h-auto"
                            priority
                        />
                    </a>
                </div>

                {/* Close Button - Top Right */}
                <button
                    onClick={closePopup}
                    className="absolute top-[3%] right-[2%] flex items-center justify-center z-30 bg-white/95 hover:bg-white text-gray-800 rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-90 w-[24px] h-[24px] md:w-[32px] md:h-[32px] cursor-pointer"
                    aria-label="Close popup"
                >
                    <IoClose className="text-[14px] md:text-[18px] font-bold" />
                </button>
            </div>
        </div>
    );
}

