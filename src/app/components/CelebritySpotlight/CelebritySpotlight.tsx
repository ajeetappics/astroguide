'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BsPlayFill, BsX } from 'react-icons/bs';
import { fetchCelebrityVideos, CelebrityVideoItem } from '@/services/video/videoService';
import defaultAstroImg from '@/assets/images/astro-image.jpg';

export default function CelebritySpotlight() {
  const [videos, setVideos] = useState<CelebrityVideoItem[]>([]);
  const [title, setTitle] = useState<string>('Celebrity Spotlight');
  const [isLoading, setIsLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadVideos = async () => {
      try {
        setIsLoading(true);
        const res = await fetchCelebrityVideos(1, 10);
        if (isMounted) {
          if (res.videos && res.videos.length > 0) {
            setVideos(res.videos);
          }
          if (res.mainTitle) {
            setTitle(res.mainTitle);
          }
        }
      } catch (err) {
        console.error('Failed to load celebrity videos:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadVideos();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeVideo]);

  const getYouTubeEmbedUrl = (url: string | null) => {
    if (!url) return null;
    if (url.includes('youtube.com/embed/')) {
      return url.includes('autoplay') ? url : `${url}${url.includes('?') ? '&' : '?'}autoplay=1`;
    }
    const ytMatch = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;
    }
    return null;
  };

  const embedUrl = activeVideo ? getYouTubeEmbedUrl(activeVideo) : null;

  if (!isLoading && videos.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#FFFDF9] py-5 md:py-8 px-4 md:px-8 relative overflow-hidden">
      <style jsx>{`
        .celebrity-rail::-webkit-scrollbar {
          height: 4px;
        }
        .celebrity-rail::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 9999px;
        }
        .celebrity-rail::-webkit-scrollbar-thumb {
          background: #F6971E;
          border-radius: 9999px;
        }
        @media (min-width: 1024px) {
          .celebrity-rail {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .celebrity-rail::-webkit-scrollbar {
            display: none;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F6971E]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F6971E]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header - Dynamic Title */}
        <div className="mb-3.5 sm:mb-5 text-center md:text-left">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold font-['Inria_Serif'] text-[#4A2B23] leading-tight">
            <span>{title}</span>
          </h2>
        </div>

        {/* Video Rail */}
        {isLoading ? (
          <div className="celebrity-rail flex lg:grid lg:grid-cols-5 gap-2.5 sm:gap-3 md:gap-3.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className="w-[125px] sm:w-[145px] md:w-[160px] lg:w-full lg:max-w-[190px] mx-auto flex-shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col animate-pulse"
              >
                <div className="w-full aspect-[3/4] bg-gray-200" />
                <div className="p-2 sm:p-2.5 space-y-1.5 flex-grow">
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="celebrity-rail flex lg:grid lg:grid-cols-5 gap-2.5 sm:gap-3 md:gap-3.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 snap-x snap-mandatory">
            {videos.map((item) => (
              <div
                key={item.id}
                className="w-[125px] sm:w-[145px] md:w-[160px] lg:w-full lg:max-w-[190px] mx-auto flex-shrink-0 snap-start group cursor-pointer bg-white rounded-xl border border-gray-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-[#F6971E]/40 hover:shadow-[0_6px_20px_rgba(246,151,30,0.12)] transition-all duration-300 hover:-translate-y-0.5 overflow-hidden flex flex-col"
                onClick={() => {
                  const targetVideo = item.embedUrl || item.videoUrl;
                  if (targetVideo) {
                    setActiveVideo(targetVideo);
                  }
                }}
              >
                {/* Portrait Video Thumbnail Container (Compact 3:4 aspect ratio) */}
                <div className="relative w-full aspect-[3/4] bg-gray-900 overflow-hidden">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 150px, (max-width: 1024px) 180px, 200px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = defaultAstroImg.src;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors duration-300" />

                  {/* Center White Circle Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <BsPlayFill className="text-base sm:text-lg text-black ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Title Description */}
                <div className="p-2 sm:p-2.5 bg-white flex-grow flex items-center">
                  <h3 className="text-[10px] sm:text-[11px] lg:text-xs font-semibold text-[#1f1f1f] font-helvetica line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal Popup */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden shadow-2xl animate-[fadeIn_0.3s_ease-out]">
            {/* Close Button */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-3 right-3 z-20 w-9 h-9 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all border border-white/20 cursor-pointer"
              aria-label="Close modal"
            >
              <BsX className="text-2xl" />
            </button>

            {/* Video Player (Supports both YouTube embed & Direct MP4) */}
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title="Celebrity Spotlight Video"
                className="w-full aspect-[9/16] max-h-[80vh] md:aspect-video object-contain relative z-10 mx-auto"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={activeVideo}
                autoPlay
                controls
                className="w-full aspect-[9/16] max-h-[80vh] md:aspect-video object-contain relative z-10 mx-auto"
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

