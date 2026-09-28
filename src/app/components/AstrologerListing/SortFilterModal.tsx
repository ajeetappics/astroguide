'use client';

import React, { useState, useEffect } from 'react';
import { BsX } from 'react-icons/bs';

export interface FilterModalOption {
  label: string;
  value: string;
}

export interface SortFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: { name: string; slug?: string }[];
  languages: { _id?: string; languageName: string }[];
  tags: { _id?: string; tagName: string }[];
  selectedSort: string;
  selectedExpertise: string;
  selectedLanguage: string;
  selectedTag: string;
  onApply: (filters: {
    sort: string;
    expertise: string;
    language: string;
    tag: string;
  }) => void;
  onReset: () => void;
}

const SORT_OPTIONS: FilterModalOption[] = [
  { label: 'Experience : High to Low', value: 'experiencedsc' },
  { label: 'Experience : Low to High', value: 'experienceasc' },
  { label: 'Rating : High to Low', value: 'ratingdsc' },
  { label: 'Rating : Low to High', value: 'ratingasc' },
];

// Fallback lists if API list is still loading or empty
const FALLBACK_LANGUAGES = [
  'Sanskrit',
  'Gujarati',
  'Marathi',
  'Tamil',
  'Hindi',
  'English',
  'Telugu',
  'Bengali',
  'Kannada',
  'Malayalam',
  'Punjabi',
];

const FALLBACK_TAGS = [
  'Highly rated',
  'Tarot Reading',
  'Business',
  'Trending',
  'Marriage',
  'career',
  'Love',
  'Top Rated',
  'Celebrity',
  'Verified',
];

export default function SortFilterModal({
  isOpen,
  onClose,
  categories,
  languages,
  tags,
  selectedSort,
  selectedExpertise,
  selectedLanguage,
  selectedTag,
  onApply,
  onReset,
}: SortFilterModalProps) {
  // Tabs: 'sort' | 'expertise' | 'language' | 'tag' (Mode of contact and Price are excluded per user requirement)
  const [activeTab, setActiveTab] = useState<'sort' | 'expertise' | 'language' | 'tag'>('sort');

  // In-modal temporary state
  const [tempSort, setTempSort] = useState(selectedSort || '');
  const [tempExpertise, setTempExpertise] = useState(selectedExpertise || 'All');
  const [tempLanguage, setTempLanguage] = useState(selectedLanguage || '');
  const [tempTag, setTempTag] = useState(selectedTag || '');

  // Synchronize when modal opens
  useEffect(() => {
    if (isOpen) {
      setTempSort(selectedSort || '');
      setTempExpertise(selectedExpertise || 'All');
      setTempLanguage(selectedLanguage || '');
      setTempTag(selectedTag || '');
      setActiveTab('sort');
    }
  }, [isOpen, selectedSort, selectedExpertise, selectedLanguage, selectedTag]);

  if (!isOpen) return null;

  // Resolved list of languages and tags
  const resolvedLanguages =
    languages && languages.length > 0
      ? languages.map((l) => l.languageName).filter(Boolean)
      : FALLBACK_LANGUAGES;

  const resolvedTags =
    tags && tags.length > 0
      ? tags.map((t) => t.tagName).filter(Boolean)
      : FALLBACK_TAGS;

  const resolvedExpertiseList =
    categories && categories.length > 0
      ? categories
          .map((c) => c.name)
          .filter((name) => name && name.toLowerCase() !== 'all')
      : [
          'Business',
          'Career',
          'Wealth',
          'Education',
          'Finance',
          'Legal',
          'Child',
          'Marriage',
          'Love',
          'Kundli',
        ];

  const handleApply = () => {
    onApply({
      sort: tempSort,
      expertise: tempExpertise,
      language: tempLanguage,
      tag: tempTag,
    });
    onClose();
  };

  const handleResetInternal = () => {
    setTempSort('');
    setTempExpertise('All');
    setTempLanguage('');
    setTempTag('');
    onReset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Modal / Bottom Sheet Box */}
      <div className="relative w-full sm:max-w-md md:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[85vh] sm:max-h-[600px] z-10 overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="w-6" /> {/* spacer for center alignment */}
          <h2 className="text-lg font-bold text-[#222222] font-helvetica text-center">
            Sort &amp; Filter
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <BsX className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body: Two Columns */}
        <div className="flex flex-1 min-h-0 divide-x divide-gray-100">
          {/* Left Column: Filter Categories */}
          <div className="w-36 sm:w-44 bg-[#FCFCFC] flex flex-col py-2 flex-shrink-0 select-none">
            {/* Sort by */}
            <button
              onClick={() => setActiveTab('sort')}
              className={`flex items-center justify-between px-4 py-3.5 text-xs sm:text-sm transition-all cursor-pointer text-left ${
                activeTab === 'sort'
                  ? 'bg-[#FFF9E6] text-[#C47D14] font-bold border-l-4 border-[#F6971E]'
                  : 'text-[#4A2B23] font-medium hover:bg-gray-100/60'
              }`}
            >
              <span>Sort by</span>
              {Boolean(tempSort) && (
                <span className="w-2 h-2 rounded-full bg-[#E5A83B] flex-shrink-0 ml-1" />
              )}
            </button>

            {/* Expertise */}
            <button
              onClick={() => setActiveTab('expertise')}
              className={`flex items-center justify-between px-4 py-3.5 text-xs sm:text-sm transition-all cursor-pointer text-left ${
                activeTab === 'expertise'
                  ? 'bg-[#FFF9E6] text-[#C47D14] font-bold border-l-4 border-[#F6971E]'
                  : 'text-[#4A2B23] font-medium hover:bg-gray-100/60'
              }`}
            >
              <span>Expertise</span>
              {Boolean(tempExpertise && tempExpertise !== 'All') && (
                <span className="w-2 h-2 rounded-full bg-[#E5A83B] flex-shrink-0 ml-1" />
              )}
            </button>

            {/* Language */}
            <button
              onClick={() => setActiveTab('language')}
              className={`flex items-center justify-between px-4 py-3.5 text-xs sm:text-sm transition-all cursor-pointer text-left ${
                activeTab === 'language'
                  ? 'bg-[#FFF9E6] text-[#C47D14] font-bold border-l-4 border-[#F6971E]'
                  : 'text-[#4A2B23] font-medium hover:bg-gray-100/60'
              }`}
            >
              <span>Language</span>
              {Boolean(tempLanguage) && (
                <span className="w-2 h-2 rounded-full bg-[#E5A83B] flex-shrink-0 ml-1" />
              )}
            </button>

            {/* Tag */}
            <button
              onClick={() => setActiveTab('tag')}
              className={`flex items-center justify-between px-4 py-3.5 text-xs sm:text-sm transition-all cursor-pointer text-left ${
                activeTab === 'tag'
                  ? 'bg-[#FFF9E6] text-[#C47D14] font-bold border-l-4 border-[#F6971E]'
                  : 'text-[#4A2B23] font-medium hover:bg-gray-100/60'
              }`}
            >
              <span>Tag</span>
              {Boolean(tempTag) && (
                <span className="w-2 h-2 rounded-full bg-[#E5A83B] flex-shrink-0 ml-1" />
              )}
            </button>
          </div>

          {/* Right Column: Radio Options List */}
          <div className="flex-1 overflow-y-auto px-4 py-3 min-h-0 bg-white">
            {/* 1. Sort Options */}
            {activeTab === 'sort' && (
              <div className="space-y-1">
                {SORT_OPTIONS.map((opt) => {
                  const isSelected = tempSort === opt.value;
                  return (
                    <div
                      key={opt.value}
                      onClick={() => setTempSort(isSelected ? '' : opt.value)}
                      className="flex items-center gap-3.5 py-3 px-2 rounded-xl hover:bg-[#FFF9E6]/50 cursor-pointer transition-colors"
                    >
                      {/* Golden Circular Radio */}
                      <div className="w-5 h-5 rounded-full border-2 border-[#E5A83B] flex items-center justify-center flex-shrink-0">
                        {isSelected && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#E5A83B]" />
                        )}
                      </div>
                      <span className="text-xs sm:text-sm text-[#333333] font-medium font-helvetica select-none">
                        {opt.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 2. Expertise Options */}
            {activeTab === 'expertise' && (
              <div className="space-y-1">
                {resolvedExpertiseList.map((expName) => {
                  const isSelected =
                    tempExpertise.toLowerCase() === expName.toLowerCase();
                  return (
                    <div
                      key={expName}
                      onClick={() =>
                        setTempExpertise(isSelected ? 'All' : expName)
                      }
                      className="flex items-center gap-3.5 py-3 px-2 rounded-xl hover:bg-[#FFF9E6]/50 cursor-pointer transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full border-2 border-[#E5A83B] flex items-center justify-center flex-shrink-0">
                        {isSelected && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#E5A83B]" />
                        )}
                      </div>
                      <span className="text-xs sm:text-sm text-[#333333] font-medium font-helvetica select-none">
                        {expName}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 3. Language Options */}
            {activeTab === 'language' && (
              <div className="space-y-1">
                {resolvedLanguages.map((langName) => {
                  const isSelected =
                    tempLanguage.toLowerCase() === langName.toLowerCase();
                  return (
                    <div
                      key={langName}
                      onClick={() =>
                        setTempLanguage(isSelected ? '' : langName)
                      }
                      className="flex items-center gap-3.5 py-3 px-2 rounded-xl hover:bg-[#FFF9E6]/50 cursor-pointer transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full border-2 border-[#E5A83B] flex items-center justify-center flex-shrink-0">
                        {isSelected && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#E5A83B]" />
                        )}
                      </div>
                      <span className="text-xs sm:text-sm text-[#333333] font-medium font-helvetica select-none">
                        {langName}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 4. Tag Options */}
            {activeTab === 'tag' && (
              <div className="space-y-1">
                {resolvedTags.map((tagName) => {
                  const isSelected =
                    tempTag.toLowerCase() === tagName.toLowerCase();
                  return (
                    <div
                      key={tagName}
                      onClick={() => setTempTag(isSelected ? '' : tagName)}
                      className="flex items-center gap-3.5 py-3 px-2 rounded-xl hover:bg-[#FFF9E6]/50 cursor-pointer transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full border-2 border-[#E5A83B] flex items-center justify-center flex-shrink-0">
                        {isSelected && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#E5A83B]" />
                        )}
                      </div>
                      <span className="text-xs sm:text-sm text-[#333333] font-medium font-helvetica select-none">
                        {tagName}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-white">
          <button
            type="button"
            onClick={handleResetInternal}
            className="text-xs sm:text-sm font-semibold text-[#555555] hover:text-[#C47D14] transition-colors cursor-pointer select-none"
          >
            Reset Filters
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="bg-[#F6971E] hover:bg-[#E5850B] text-white font-bold px-8 py-2.5 rounded-xl shadow-xs sm:shadow-sm text-xs sm:text-sm transition-all cursor-pointer"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
