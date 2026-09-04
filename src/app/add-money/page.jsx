"use client";
import { useEffect } from "react";

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
        <div style={{ padding: 24, textAlign: "center", marginTop: "20vh" }}>
            <h2>Opening Add Money in App…</h2>
            <p>
                If the app does not open,
                <br />
                <a
                    href="https://apps.apple.com/us/app/balaji-astro-guide/id6753894953"
                    style={{ color: "#0070f3", fontWeight: 600 }}
                >
                    Open on App Store
                </a>
            </p>
        </div>
    );
}