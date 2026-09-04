import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { welcomeImage } from '@/assets/images';


export default function WelcomeCard() {
  return (
    <div className="flex flex-col items-center px-8 max-w-md mx-auto">

      <div className="mb-6">
        <svg width="69" height="69" viewBox="0 0 69 69" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M26.9987 45.8334C26.7606 44.9105 26.2796 44.0683 25.6056 43.3944C24.9317 42.7204 24.0895 42.2394 23.1667 42.0014L6.80667 37.7827C6.52755 37.7035 6.28189 37.5354 6.10697 37.3039C5.93204 37.0724 5.8374 36.7902 5.8374 36.5C5.8374 36.2099 5.93204 35.9276 6.10697 35.6962C6.28189 35.4647 6.52755 35.2966 6.80667 35.2174L23.1667 30.996C24.0892 30.7582 24.9312 30.2775 25.6051 29.6041C26.279 28.9307 26.7602 28.0891 26.9987 27.1667L31.2173 10.8067C31.2958 10.5265 31.4637 10.2796 31.6955 10.1037C31.9274 9.92788 32.2104 9.83269 32.5013 9.83269C32.7923 9.83269 33.0753 9.92788 33.3071 10.1037C33.539 10.2796 33.7069 10.5265 33.7853 10.8067L38.0013 27.1667C38.2394 28.0895 38.7204 28.9317 39.3944 29.6057C40.0683 30.2796 40.9105 30.7606 41.8333 30.9987L58.1933 35.2147C58.4747 35.2923 58.7228 35.46 58.8996 35.6922C59.0764 35.9244 59.1721 36.2082 59.1721 36.5C59.1721 36.7919 59.0764 37.0756 58.8996 37.3078C58.7228 37.54 58.4747 37.7078 58.1933 37.7854L41.8333 42.0014C40.9105 42.2394 40.0683 42.7204 39.3944 43.3944C38.7204 44.0683 38.2394 44.9105 38.0013 45.8334L33.7827 62.1934C33.7042 62.4736 33.5363 62.7204 33.3045 62.8963C33.0727 63.0722 32.7897 63.1674 32.4987 63.1674C32.2077 63.1674 31.9247 63.0722 31.6929 62.8963C31.461 62.7204 31.2931 62.4736 31.2147 62.1934L26.9987 45.8334Z" stroke="#72271E" stroke-width="5.33333" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M53.8333 12.5V23.1667" stroke="#72271E" stroke-width="5.33333" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M59.1667 17.8333H48.5" stroke="#72271E" stroke-width="5.33333" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M11.1667 49.8333V55.1667" stroke="#72271E" stroke-width="5.33333" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M13.8333 52.5H8.5" stroke="#72271E" stroke-width="5.33333" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M54.437 16C54.3477 15.6539 54.1673 15.3381 53.9146 15.0854C53.6619 14.8327 53.3461 14.6523 53 14.563L46.865 12.981C46.7603 12.9513 46.6682 12.8883 46.6026 12.8014C46.537 12.7146 46.5015 12.6088 46.5015 12.5C46.5015 12.3912 46.537 12.2854 46.6026 12.1986C46.6682 12.1118 46.7603 12.0487 46.865 12.019L53 10.436C53.346 10.3468 53.6617 10.1666 53.9144 9.91404C54.1671 9.66151 54.3476 9.34589 54.437 9.00001L56.019 2.86501C56.0484 2.75992 56.1114 2.66735 56.1983 2.6014C56.2853 2.53545 56.3914 2.49976 56.5005 2.49976C56.6096 2.49976 56.7157 2.53545 56.8027 2.6014C56.8896 2.66735 56.9526 2.75992 56.982 2.86501L58.563 9.00001C58.6523 9.34608 58.8327 9.6619 59.0854 9.91462C59.3381 10.1673 59.6539 10.3477 60 10.437L66.135 12.018C66.2405 12.0471 66.3335 12.11 66.3998 12.1971C66.4661 12.2841 66.5021 12.3906 66.5021 12.5C66.5021 12.6094 66.4661 12.7159 66.3998 12.8029C66.3335 12.89 66.2405 12.9529 66.135 12.982L60 14.563C59.6539 14.6523 59.3381 14.8327 59.0854 15.0854C58.8327 15.3381 58.6523 15.6539 58.563 16L56.981 22.135C56.9516 22.2401 56.8886 22.3327 56.8017 22.3986C56.7147 22.4646 56.6086 22.5003 56.4995 22.5003C56.3904 22.5003 56.2843 22.4646 56.1973 22.3986C56.1104 22.3327 56.0474 22.2401 56.018 22.135L54.437 16Z" stroke="#72271E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M64.5 3.5V7.5" stroke="#72271E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M66.5 5.5H62.5" stroke="#72271E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M48.5 17.5V19.5" stroke="#72271E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M49.5 18.5H47.5" stroke="#72271E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

      </div>

      <h2 className="text-3xl font-inria text-[#72271E] mb-3">
        Welcome to Balaji Astro Guide
      </h2>

      <p className="text-md font-helvetica text-center text-[#5C5C5C] max-w-xs mb-8">
        Connect with seekers, share your wisdom, and grow your practice.
      </p>

      <div className="mb-8 shadow-lg rounded-xl overflow-hidden">
        <Image
          src={welcomeImage}
          alt="Welcome to Balaji Astro Guide"
          width={320}
          height={200}
          className="object-cover"
        />
      </div>

      <Link
        href="/information"
        className="w-full text-center bg-[#72271E] text-white font-helvetica font-medium py-[6px] px-12 rounded-full transition-transform transform hover:scale-105"
      >
        Get Started
      </Link>
    </div>
  );
}
