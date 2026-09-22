'use client';

import React, { useRef, useEffect } from 'react';

export interface AstrologerHeroBannerProps {
  title: string;
  subtitle: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export default function AstrologerHeroBanner({
  title,
  subtitle,
  breadcrumbs
}: AstrologerHeroBannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.volume = 0;
    }
  }, []);

  return (
    <section className="bg-[#4A1A14] pt-28 sm:pt-36 lg:pt-44 pb-14 sm:pb-20 lg:pb-24 px-4 relative overflow-hidden">
      {/* Astrology Background Video with Overlay */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster="/images/premium-astro-bg.jpg"
        className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none"
      >
        <source src="/images/astrology-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-[#4A1A14] via-transparent to-transparent opacity-80 pointer-events-none" />

      <div className="container mx-auto max-w-6xl flex flex-col items-center text-center relative z-10">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex items-center gap-2 text-xs sm:text-sm text-[#F6971E] font-helvetica mb-2">
            {breadcrumbs.map((b, i) => (
              <React.Fragment key={i}>
                {b.href ? (
                  <a href={b.href} className="hover:underline opacity-80">
                    {b.label}
                  </a>
                ) : (
                  <span className="font-semibold text-white">{b.label}</span>
                )}
                {i < breadcrumbs.length - 1 && <span>/</span>}
              </React.Fragment>
            ))}
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-['Inria_Serif'] mb-3 sm:mb-4 drop-shadow-md">
          {title}
        </h1>
        <p className="text-[#FDF7E1] font-helvetica text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed opacity-95">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
