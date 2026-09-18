'use client';

import AstrologersListing from './AstrologersListing';

// Unified component - Re-exporting AstrologersListing directly to maintain single source of truth
export default function AstrologerCategoriesHub() {
  return <AstrologersListing initialCategory="All" />;
}
