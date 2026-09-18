'use client'

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AstrologersListing from '@/app/components/AstrologerListing/AstrologersListing';

function AstrologersPageContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || "All";

  return <AstrologersListing initialCategory={categoryParam} />;
}

export default function AstrologersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFFDF9]" />}>
      <AstrologersPageContent />
    </Suspense>
  );
}
