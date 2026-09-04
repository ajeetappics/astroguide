'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PopupContextType {
    isOpen: boolean;
    openPopup: () => void;
    closePopup: () => void;
}

// 👇 Replace with your actual Play Store link
const PLAY_STORE_URL = 'https://astrovani-balaji.onelink.me/wfnC/fudhzt4v?af_qr=true';

// ✅ Detect Android
const isAndroid = () => {
    if (typeof navigator === 'undefined') return false;
    return /Android/i.test(navigator.userAgent);
};

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export function PopupProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    // ✅ Centralized logic
    const openPopup = () => {
        if (isAndroid()) {
            window.location.href = PLAY_STORE_URL;
            return; // don’t open popup on Android
        }
        setIsOpen(true);
    };

    const closePopup = () => setIsOpen(false);

    return (
        <PopupContext.Provider value={{ isOpen, openPopup, closePopup }}>
            {children}
        </PopupContext.Provider>
    );
}

export function usePopup() {
    const context = useContext(PopupContext);
    if (!context) {
        throw new Error('usePopup must be used within a PopupProvider');
    }
    return context;
}
