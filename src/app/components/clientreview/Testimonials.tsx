
'use client'; 
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import TestimonialCard from '../Card/TestimonialCard';
import {  astro_1,  astro_2,  astro_3 } from '@/assets/images';

const testimonialsData = [
    {
        image: astro_1,
        name: "Priya Sharma",
        rating: 5,
        tag: "Career Guidance",
        text: "Balaji Astro Guide provided incredibly accurate insights about my career path. The astrologer's guidance helped me make a life-changing decision with confidence."
    },
    {
        image: astro_3,
        name: "Rajiv Mehta",
        rating: 5,
        tag: "Financial Planning",
        text: "The detailed financial forecast I received from Balaji Astro Guide allowed me to invest wisely and secure my family's future."
    },
    {
        image: astro_2,
        name: "Sneha Kapoor",
        rating: 5,
        tag: "Personal Development",
        text: "Balaji Astro Guide advice on personal growth has transformed my perspective on life, helping me to embrace my true potential."
    }
];

export default function Testimonials() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' });

  return (
    <section className="bg-[#FEF8E2] py-20 px-8">
      <div className="container mx-auto text-center">
        
        <h2 className="text-5xl font-['Inria_Serif'] text-[#F6971E] mb-4">
          What our clients Say
        </h2>

        <p className="text-lg font-helvetica text-[#5C5C5C] max-w-3xl mx-auto mb-12">
          Discover how cosmic wisdom has transformed lives and guided souls on their spiritual journey
        </p>

        <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {testimonialsData.map((testimonial, index) => (
                        <TestimonialCard 
                            key={index}
                            image={testimonial.image}
                            name={testimonial.name}
                            rating={testimonial.rating}
                            tag={testimonial.tag}
                            text={testimonial.text}
                        />
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}