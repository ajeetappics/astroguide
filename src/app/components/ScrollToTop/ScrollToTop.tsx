'use client';

import React, { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-b from-[#e89f2a] to-[#d8891a] text-white shadow-[0_4px_16px_rgba(216,137,26,0.45)] hover:shadow-[0_6px_22px_rgba(216,137,26,0.65)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-4 scale-75 pointer-events-none'
      }`}
    >
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-white"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M12 3.293a1 1 0 01.707.293l6 6a1 1 0 01-1.414 1.414L13 6.414V20a1 1 0 11-2 0V6.414L6.707 10.707a1 1 0 01-1.414-1.414l6-6A1 1 0 0112 3.293z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}
