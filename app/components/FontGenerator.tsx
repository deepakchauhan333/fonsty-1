'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { getFontVariations, type UnicodeVariation } from '@/lib/unicode-variations';

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
      // Get 500 variations for the current font type
      const variations = getFontVariations(fontType, inputText || 'Example', 500);
      setFontPreviews(variations);
    };
    
    updateFonts();
  }, [inputText, fontType]);

  const formattedFontName = formatFontName(fontType);
  const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{formattedFontName} for {platformName}</h1>
        <p className="text-gray-600 mb-6">
          Generate {formattedFontName.toLowerCase()} text for {platformName}. Copy and paste the styled text below.
        </p>
        
        <div className="mb-8">
          <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 mb-2">
            Enter your text:
          </label>
          <input
            type="text"
            id="inputText"
            value={inputText}
            onChange={(e) => setInputText(sanitizeInput(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Type something..."
            maxLength={5000}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {fontPreviews.map((font) => (
          <motion.div
            key={`${font.id}-${font.name}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative p-3 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 ${font.className || ''}`}
            style={{
              minHeight: '120px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-medium text-gray-500 truncate max-w-[70%]">
                {font.name}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(font.unicode, font.id);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                aria-label="Copy to clipboard"
              >
                {showCopied === font.id ? (
                  <FiCheck className="text-green-500" size={16} />
                ) : (
                  <FiCopy size={16} />
                )}
              </button>
            </div>
            <div
              className={`flex-1 flex items-center justify-center p-2 rounded-md bg-white/50 cursor-pointer hover:bg-gray-50 transition-colors ${font.className || ''}`}
              onClick={() => copyToClipboard(font.unicode, font.id)}
              style={{
                wordBreak: 'break-word',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                lineHeight: '1.4',
                fontSize: '1.1rem',
                textAlign: 'center',
                padding: '0.5rem'
              }}
            >
              {font.unicode || font.preview}
              
              {showCopied === font.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-2 -top-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow-md"
                >
                  Copied!
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
