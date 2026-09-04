'use client'

import React from 'react';

import {
  BsSun,
  BsEye,
  BsCloudMoon,
  BsHandIndexThumb,
  BsFileText,
  BsPeople
} from 'react-icons/bs';
import ServiceCard from '../Card/ServiceCard';
import Matchmaking from './Matchmaking.svg';
import Numerology from './NUEMOROLOGY.svg';

const servicesData = [
  {
    icon: BsSun,
    title: "Daily Horoscope",
    description: "Personalized daily cosmic insights for your zodiac sign"
  },
  {
    icon: BsEye,
    title: "Tarot Reading",
    description: "Ancient wisdom through mystical card interpretations"
  },
  {
    icon: Matchmaking,
    title: "Match Making",
    description: "Check Your Marriage Compatibility Instantly"
  },
  {
    icon: BsHandIndexThumb,
    title: "Palm Reading",
    description: "Discover your destiny through palmistry"
  },
  {
    icon: BsFileText,
    title: "Kundli Reports",
    description: "Comprehensive birth chart analysis and predictions"
  },
  {
    icon: Numerology,
    title: "Numerology",
    description: "Discover the power of numbers in your life's path"
  }
];

export default function ServicesSection() {
  return (
    <section className="bg-[#FEF8E2] pb-20 px-8">
      <div className="container mx-auto text-center">

        <h2 className="text-5xl font-bold font-['Inria_Serif'] text-[#F6971E] mb-4">
          Spiritual Services
        </h2>

        <p className="text-lg font-helvetica text-[#5C5C5C] max-w-3xl mx-auto mb-12">
          Explore ancient wisdom and modern insights through our comprehensive astrology services
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard
              Matchmaking={Matchmaking}
              Numerology={Numerology}
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}