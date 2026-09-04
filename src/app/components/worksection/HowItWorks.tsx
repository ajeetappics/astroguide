import React from 'react';

import {
    BsChatDots,
    BsPeople,
    BsTelephone
} from 'react-icons/bs';
import { IoSparkles } from 'react-icons/io5';

const stepsData = [
    {
        number: "01",
        icon: BsChatDots,
        title: "Ask a Question",
        description: "Share your spiritual question or concern with our platform"
    },
    {
        number: "02",
        icon: BsPeople,
        title: "Select astrologer",
        description: "We connect you with the perfect astrologer for your needs"
    },
    {
        number: "03",
        icon: BsTelephone,
        title: "Chat/Call",
        description: "Connect instantly through chat or voice call consultation"
    },
    {
        number: "04",
        icon: IoSparkles,
        title: "Receive Guidance",
        description: "Get personalized insights and spiritual remedies"
    }
];

export default function HowItWorks() {
    return (
        <section className="bg-[#fcb657] py-20 px-8 border-t-[3px] border-b-[3px] border-[#F6971E]">
            <div className="container mx-auto text-center">

                <h2 className="text-5xl font-['Inria_Serif'] text-[#ffffff] mb-4">
                    How It Works
                </h2>

                <p className="text-lg font-helvetica text-[#ffffff] max-w-3xl mx-auto mb-16">
                    Your journey to cosmic wisdom in four simple steps
                </p>

                <div className="relative flex flex-col md:flex-row items-start justify-between gap-8 md:gap-0">

                    <div className="hidden md:block absolute top-[48px] left-[12.5%] w-[75%] h-[2px] bg-[#72271E] z-0"></div>

                    {stepsData.map((step, index) => (
                        <div key={index} className="flex flex-row md:flex-col items-center text-left md:text-center w-full md:w-1/4 px-4">
                            <div className="relative z-10 mb-0 md:mb-6 mr-6 md:mr-0">
                                <div
                                    className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg"
                                    style={{ background: "linear-gradient(180deg, #8A3929 0%, #8B3A2A 24.04%, #B58A63 100%)" }}
                                >

                                    <step.icon className="text-white text-4xl" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#c6a87e] flex items-center justify-center font-bold text-sm text-[#fff]">
                                    {step.number}
                                </div>
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-xl font-helvetica font-bold text-[#813E2F] mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-sm font-helvetica text-[#000000AD]">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}