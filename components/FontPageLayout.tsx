'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCopy, FiX, FiArrowUp } from 'react-icons/fi';
import { generateFontVariations } from '@/lib/unicode-data';

interface FontPreview {
  id: number;
  name: string;
  text: string;
}

interface FontPageLayoutProps {
  platform: string;
  category: string;
  initialFonts: FontPreview[];
}

export default function FontPageLayout({ platform, category, initialFonts }: FontPageLayoutProps) {
  const [inputText, setInputText] = useState('Type something');
  const [fontPreviews, setFontPreviews] = useState<FontPreview[]>(initialFonts);
  const [showCopied, setShowCopied] = useState<number | null>(null);
  const [showScroll, setShowScroll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Update fonts when input changes
  useEffect(() => {
    const displayText = inputText.trim() || 'demo';
    
    const updateFonts = () => {
      const updatedFonts = initialFonts.map(font => ({
        ...font,
        text: font.text.replace(/[^\p{L}\p{N}\p{P}\p{Z}^$\n\r]/gu, '')
          .replace(/demo/gi, displayText)
      }));
      setFontPreviews(updatedFonts);
    };
    
    updateFonts();
  }, [inputText, initialFonts]);

  // Show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyToClipboard = async (text: string, id: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowCopied(id);
      setTimeout(() => setShowCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatCategoryName = (name: string) => {
    return name.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatPlatformName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="text-center mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              {formatCategoryName(category)} Fonts for {formatPlatformName(platform)}
            </h1>
            <p className="text-sm text-gray-500">
              Copy and paste these fonts to your {formatPlatformName(platform)} profile, bio, and posts
            </p>
          </div>
          
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your text here..."
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              autoFocus
            />
            {inputText && (
              <button
                onClick={() => setInputText('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear input"
              >
                <FiX size={18} />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Best Fonts Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Best {formatCategoryName(category)} Fonts
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
            {fontPreviews.slice(0, 36).map((font, index) => (
              <motion.div
                key={`best-${font.id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.02 }}
                className="group relative bg-white p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer"
                onClick={() => copyToClipboard(font.text, font.id)}
              >
                <div className="text-center h-12 flex items-center justify-center">
                  <span className="text-xl">{font.text}</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {showCopied === font.id ? 'Copied!' : 'Click to copy'}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* All Fonts */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            All {formatCategoryName(category)} Fonts ({fontPreviews.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {fontPreviews.map((font, index) => (
              <motion.div
                key={font.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1, delay: index * 0.003 }}
                className="group relative bg-white p-3 rounded-lg border border-gray-100 hover:shadow-md transition-all cursor-pointer"
                onClick={() => copyToClipboard(font.text, font.id)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium truncate pr-2">{font.text}</span>
                  <button 
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-indigo-600 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(font.text, font.id);
                    }}
                    aria-label="Copy to clipboard"
                  >
                    <FiCopy size={16} className="hover:scale-110 transition-transform" />
                  </button>
                </div>
                {showCopied === font.id && (
                  <div className="absolute right-3 -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    Copied!
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
            aria-label="Scroll to top"
          >
            <FiArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
