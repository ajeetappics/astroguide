"use client";
import { useEffect } from "react";
import { mainLogo } from '@/assets/images';
import Image from "next/image";
import { BsStars } from "react-icons/bs";

export default function AddMoneyRedirect() {
    useEffect(() => {
        const ANDROID_PACKAGE = "com.astrovani.balaji.app";
        const PLAY_STORE =
            `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}`;
        const APP_STORE =
            "https://apps.apple.com/us/app/balaji-astro-guide/id6753894953";

        const ua = navigator.userAgent || navigator.vendor || window.opera;
        const isAndroid = /android/i.test(ua);
        const isIOS = /iPad|iPhone|iPod/.test(ua);
        const isMac = /Macintosh|Mac OS X/.test(ua) && !isIOS;
        const isWindows = /Windows/.test(ua);
        const isLinux = /Linux/.test(ua) && !isAndroid;
        const path = "/add-money";

        if (isAndroid) {
            const intentUrl = `intent://balajiastroguide.com${path}#Intent;scheme=https;package=${ANDROID_PACKAGE};end;`;
            window.location.href = intentUrl;
            setTimeout(() => {
                window.location.href = PLAY_STORE;
            }, 2000);
            return;
        }

        if (isIOS) {
            // Let Universal Links handle it
            return;
        }

        if (isMac) {
            window.location.href = APP_STORE;
            return;
        }

        if (isWindows || isLinux) {
            window.location.href = PLAY_STORE;
            return;
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#FFFDF9] via-[#FFF8EE] to-[#FFF3E0] flex flex-col items-center justify-center p-4 sm:p-6 font-helvetica relative overflow-hidden">
            {/* Decorative Warm Ambient Glows */}
            <div className="absolute top-10 -left-20 w-72 h-72 bg-[#F6971E]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 -right-20 w-80 h-80 bg-[#FFA733]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_12px_45px_rgba(246,151,30,0.14)] border border-[#F6971E]/25 p-6 sm:p-8 text-center relative z-10">
                {/* Animated App Icon Header */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-5">
                    <div className="absolute inset-0 rounded-2xl bg-[#F6971E] animate-ping opacity-20" />
                    <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#FFF8EE] to-white shadow-md border-2 border-[#F6971E]/30 p-2.5 flex items-center justify-center">
                        <Image
                            src={mainLogo}
                            alt="Balaji Astro Guide"
                            width={70}
                            height={70}
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Status Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#F6971E] text-xs font-semibold mb-3">
                    <BsStars className="text-sm animate-spin" style={{ animationDuration: "4s" }} />
                    <span>Balaji Astro Guide</span>
                </div>

                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
                    Taking you directly to the pooja details page in the app.
                </p>

                {/* Pulsing Animated Progress Bar */}
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mb-6 relative">
                    <div className="h-full bg-gradient-to-r from-[#F6971E] via-[#FFA733] to-[#F6971E] w-2/3 rounded-full animate-pulse mx-auto" />
                </div>
                {/* Loading Redirection */}
                <div className="flex items-center gap-3 my-4">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">
                        Redirecting...
                    </span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>
            </div>
        </div>
    );
}