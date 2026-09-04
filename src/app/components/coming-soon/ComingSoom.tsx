'use client';

import React from 'react';
import Link from 'next/link';

function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center md:pt-50 md:pb-32 pt-40 pb-24 px-8">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">Coming Soon</h1>
      <p className="text-lg text-gray-600 mb-8">
        We're working hard to bring you something amazing. Stay tuned!
      </p>
      <Link href="/">
        <button className="bg-[#72271E] text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors cursor-pointer">
          Go to Homepage
        </button>
      </Link>
    </div>
  );
}

export default ComingSoon;
