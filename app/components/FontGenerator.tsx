'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { getFontVariations, type UnicodeVariation } from '@/lib/optimized-unicode-variations';
import OptimizedFontCard from '@/components/OptimizedFontCard';

interface FontGeneratorProps {
  fontType: string;
  platform: string;
}

const formatFontName = (str: string) => {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replace('Text', '')
    .trim();
};

export default function FontGenerator({ fontType, platform }: FontGeneratorProps) {
  const [inputText, setInputText] = useState('Type something');
  const [fontPreviews, setFontPreviews] = useState<UnicodeVariation[]>([]);
  const [showCopied, setShowCopied] = useState<number | null>(null);

  const sanitizeInput = (text: string): string => {
    // Remove potentially dangerous characters and limit length
    return text
      .replace(/[<>]/g, '') // Remove angle brackets to prevent HTML injection
      .slice(0, 5000); // Limit to 5000 characters
  };

  const copyToClipboard = async (text: string, id: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowCopied(id);
      setTimeout(() => setShowCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Load and update fonts when input or fontType changes
  useEffect(() => {
    const updateFonts = () => {
      // Get 100 variations for instant load
      const variations = getFontVariations(fontType, inputText || 'Example', 100);
      setFontPreviews(variations);
    };
    
    updateFonts();
  }, [inputText, fontType]);

  const formattedFontName = formatFontName(fontType);
  const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">{formattedFontName} for {platformName}</h1>
        <p className="text-gray-600 font-medium mb-6">
          ✨ Generate beautiful {formattedFontName.toLowerCase()} text for {platformName}. Click any style to copy instantly.
        </p>
        
        <div className="mb-8">
          <label htmlFor="inputText" className="block text-sm font-semibold text-gray-700 mb-3">
            ✍️ Enter your text:
          </label>
          <input
            type="text"
            id="inputText"
            value={inputText}
            onChange={(e) => setInputText(sanitizeInput(e.target.value))}
            className="w-full px-5 py-4 text-lg font-medium border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all duration-200 bg-white shadow-sm hover:shadow-md"
            placeholder="Type your text here..."
            maxLength={5000}
          />
        </div>
      </div>

      {/* Optimized Font Display */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            ✨ {formattedFontName}
          </h2>
          <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-4 py-2 rounded-full">
            {fontPreviews.length} styles
          </span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {fontPreviews.map((font) => (
            <OptimizedFontCard
              key={`${font.id}-${font.name}`}
              font={font}
              variant="grid"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
