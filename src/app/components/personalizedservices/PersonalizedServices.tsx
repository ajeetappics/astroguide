import React from 'react';
import Image from 'next/image';
import'./galaxy.css';

import ServiceDetailCard from '../Card/ServiceDetailCard';
import { backgroundImg } from '@/assets/images';

const servicesListData = [
    {
        title: "Detailed Kundli",
        description: "Complete birth chart analysis with planetary positions, dasha predictions, and life insights",
        features: ["Birth Chart Analysis", "Dasha Predictions", "Planetary Positions", "Life Events Timeline"]
    },
    {
        title: "Career Astrology",
        description: "Find the perfect career path for you based on your unique birth chart and planetary alignments.",
        features: ["Career Strengths", "Job Change Timing", "Business Success", "Financial Growth"]
    },
    {
        title: "Marriage Counseling",
        description: "Resolve conflicts and build a stronger bond with your partner through cosmic guidance.",
        features: ["Compatibility Check", "Conflict Resolution", "Best Marriage Time", "Dosha Remedies"]
    }
];

export default function PersonalizedServices() {
  return (
    <section className="relative bg-[#FEF8E2] py-[30px] md:py-[60px] px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
            {/* <div className="absolute top-0 right-0 h-full w-3/4 ">
                <Image 
                    src={backgroundImg} 
                    alt="Cosmic background" 
                    layout="fill" 
                    objectFit="cover"
                />
            </div> */}
              <div className="absolute inset-0 z-0">
                  <div className="solar-bg">
                      {/* Earth in the Center */}
                      <div className="earth"></div>

                      {/* Orbit Rings */}
                      <div className="orbit orbit-1">
                          <div className="planet moon"></div>
                      </div>

                      <div className="orbit orbit-2">
                          <div className="planet green"></div>
                      </div>

                      <div className="orbit orbit-3">
                          <div className="planet red"></div>
                      </div>
                      
                      <div className="orbit orbit-4">
                          <div className="planet yellow"></div>
                      </div>
                  </div>
              </div>


        </div>

        <div className="relative z-10 container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="flex flex-col gap-8">
                    <div className="relative self-start">
                        <h2 className="text-[36px] font-bold font-['Inria_Serif'] text-[#4A2B23] leading-tight">
                            Personalized Services
                        </h2>
                    </div>

                    <p className="text-lg font-helvetica text-[#000000AD] max-w-lg">
                        Unlock deeper insights into your life with our premium astrological services, crafted by expert astrologers with decades of experience.
                    </p>
                    
                    <div className="space-y-8 mt-4">
                        {servicesListData.map((service, index) => (
                            <ServiceDetailCard 
                                key={index}
                                title={service.title}
                                description={service.description}
                                features={service.features}
                            />
                        ))}
                    </div>
                </div>

                <div className="hidden lg:block">
                </div>
            </div>
        </div>
    </section>
  );
}
