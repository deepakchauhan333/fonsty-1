'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCopy, FiX, FiArrowUp } from 'react-icons/fi';

interface FontPreview {
  id: number;
  name: string;
  text: string;
  style?: string;
  category?: string;
  decoratedText?: {
    __html: string;
  };
}

// Function to add gradient colors to symbols
const addGradientToSymbols = (text: string): string => {
  // Match symbols that are not part of the main text (at start/end)
  return text.replace(/^([^\p{L}\p{N}]+)|([^\p{L}\p{N}]+)$/gu, (match) => {
    // Apply gradient to each symbol
    return match.split('').map(symbol => {
      const colors = [
        'from-red-500 to-pink-500',
        'from-yellow-400 to-red-500',
        'from-green-400 to-blue-500',
        'from-purple-400 to-pink-500',
        'from-blue-400 to-cyan-500',
        'from-pink-500 to-purple-500',
        'from-amber-500 to-pink-500',
        'from-emerald-400 to-cyan-500',
        'from-violet-500 to-purple-600',
        'from-rose-400 to-pink-500'
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      return `<span class="bg-gradient-to-r ${randomColor} text-transparent bg-clip-text">${symbol}</span>`;
    }).join('');
  });
};

// Category-specific styles for previews
const CATEGORY_STYLES: Record<string, string> = {
  // Text Styles
  'fancy': 'text-2xl font-fancy leading-tight break-words',
  'cursive': 'text-2xl italic font-cursive leading-tight break-words',
  'bubble': 'text-2xl font-bubble leading-tight break-words',
  'bold': 'text-2xl font-bold leading-tight break-words',
  'italic': 'text-2xl italic leading-tight break-words',
  'strikethrough': 'text-2xl line-through leading-tight break-words',
  'underline': 'text-2xl underline leading-tight break-words',
  'small-caps': 'text-2xl small-caps leading-tight break-words',
  'double-struck': 'text-2xl font-bold leading-tight break-words',
  'reverse': 'text-2xl leading-tight break-words',
  'mirror': 'text-2xl leading-tight break-words',
  'upside-down': 'text-2xl leading-tight break-words',
  'zalgo': 'text-2xl leading-tight break-words',
  'emoji': 'text-2xl leading-tight break-words',
  'unicode': 'text-2xl leading-tight break-words',
  'symbol': 'text-2xl leading-tight break-words',
  
  // Theme Styles
  'gaming': 'text-2xl font-bold tracking-wider bg-gradient-to-r from-red-500 to-blue-500 text-transparent bg-clip-text leading-tight break-words',
  'retro': 'text-2xl font-bold text-yellow-500 leading-tight break-words',
  'vintage': 'text-2xl italic text-amber-800 leading-tight break-words',
  'neon': 'text-2xl font-bold text-pink-500 text-shadow-neon leading-tight break-words',
  'glitch': 'text-2xl font-bold text-purple-600 leading-tight break-words',
  'tattoo': 'text-2xl font-bold leading-tight break-words',
  'gothic': 'text-2xl font-gothic leading-tight break-words',
  'graffiti': 'text-2xl font-bold leading-tight break-words',
  'squared': 'text-2xl leading-tight break-words',
  'circled': 'text-2xl leading-tight break-words',
  'math': 'text-2xl leading-tight break-words',
  'currency': 'text-2xl leading-tight break-words',
  'handwriting': 'text-2xl font-handwriting leading-tight break-words',
  'small': 'text-xl leading-tight break-words'
};

interface FontPageLayoutProps {
  platform: string;
  category: string;
  initialFonts: FontPreview[];
  totalFonts?: number;
  isCategoryPage?: boolean;
}

// Import the getDemoText function from font-utils
import { getDemoText as getDemoTextUtil } from '@/lib/font-utils';

// Get demo text based on category
const getDemoText = (category: string) => {
  return getDemoTextUtil(category);
};

// Get category-specific styles
const getCategoryStyles = (category: string) => {
  return CATEGORY_STYLES[category.toLowerCase()] || 'text-2xl';
};

// Add loading state type
type FontLoadingState = 'loading' | 'loaded' | 'error';

export default function FontPageLayout({ platform, category, initialFonts }: FontPageLayoutProps) {
  const demoText = useMemo(() => getDemoText(category), [category]);
  const [inputText, setInputText] = useState(demoText);
  const [showCopied, setShowCopied] = useState<number | null>(null);
  const [loadingState, setLoadingState] = useState<FontLoadingState>('loading');
  const [fonts, setFonts] = useState<FontPreview[]>(initialFonts);
  const [, setError] = useState<Error | null>(null);
  const [showScroll, setShowScroll] = useState(false);
  
  // Load fonts with priority on initial render
  useEffect(() => {
    let isMounted = true;
    
    // Immediately show initial fonts if available
    if (initialFonts.length > 0) {
      setFonts(initialFonts);
      setLoadingState('loaded');
    } else {
      setLoadingState('loading');
    }

    // Load additional fonts in the background
    const loadAdditionalFonts = async () => {
      if (!isMounted) return;
      
      try {
        // Add a small delay to prevent UI jank
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
        
        const response = await fetch(
          `/api/fonts?category=${encodeURIComponent(category)}&count=500`,
          {
            signal: controller.signal,
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache',
            },
            // Ensure we're not using stale cache
            next: { revalidate: 0 }
          }
        );
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (isMounted && data?.fonts?.length > 0) {
          setFonts(prevFonts => {
            // If we already have fonts, only add new ones
            if (prevFonts.length > 0) {
              const existingIds = new Set(prevFonts.map(f => f.id));
              const newFonts = data.fonts.filter((f: FontPreview) => !existingIds.has(f.id));
              return [...prevFonts, ...newFonts];
            }
            return data.fonts;
          });
          
          if (isMounted) {
            setLoadingState('loaded');
          }
        }
      } catch (err) {
        const error = err as Error;
        if (error.name !== 'AbortError' && isMounted) {
          console.error('Error loading additional fonts:', error);
          setError(error);
          // Only show error if we don't have any fonts yet
          if (initialFonts.length === 0) {
            setLoadingState('error');
          } else {
            // If we have initial fonts, just log the error but don't show it
            console.log('Non-critical error loading additional fonts:', error.message);
          }
        }
      }
    };

    // Start loading additional fonts with a small delay
    const timer = setTimeout(loadAdditionalFonts, 100);
    
    // Cleanup function
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [category, initialFonts]);
  
  
  // Process fonts with memoization and add gradient to symbols
  const processFonts = useCallback((fontsToProcess: FontPreview[], text: string, categoryName: string): FontPreview[] => {
    const displayText = text.trim() || getDemoText(categoryName);
    const categoryStyle = getCategoryStyles(categoryName);
    
    return fontsToProcess.map(font => ({
      ...font,
      text: font.text.replace(/[^\p{L}\p{N}\p{P}\p{Z}^$\n\r]/gu, '').replace(/demo/gi, displayText),
      style: categoryStyle,
      // Add gradient to symbols and ensure it's safe for dangerouslySetInnerHTML
      decoratedText: { __html: addGradientToSymbols(font.text) }
    }));
  }, []);

  // Process fonts with memoization
  const fontPreviews = useMemo(() => {
    return processFonts(fonts, inputText || demoText, category);
  }, [processFonts, fonts, inputText, demoText, category]);

  // Handle copy to clipboard
  const handleCopyToClipboard = async (text: string, id: number): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setShowCopied(id);
      setTimeout(() => setShowCopied(null), 2000);
    } catch (error) {
      const err = error as Error;
      console.error('Failed to copy text: ', err.message);
      // Optionally show error to user
      setError(err);
    }
  };

  // Removed unused function: handleScrollToTop

  // Format category name for display
  const formatCategory = (cat: string): string => {
    if (!cat) return '';
    return cat
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top of page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Show/hide scroll to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Loading skeleton (unused but kept for future use)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg p-4 shadow-sm animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-12 bg-gray-100 rounded"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with improved styling */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">
              {formatCategory(category)} Fonts for {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </h1>
            <p className="text-lg opacity-90">
              Copy and paste these stylish fonts to make your {platform} profile stand out!
            </p>
          </div>
          
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full px-6 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 transition-all duration-200 text-center text-xl"
                placeholder={`Type something... (e.g., ${getDemoText(category)})`}
              />
              {inputText && (
                <button
                  onClick={() => setInputText('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                >
                  <FiX className="h-5 w-5" />
                </button>
              )}
            </div>
            
            {loadingState === 'loading' && (
              <div className="mt-4 text-center text-white/80">
                Loading more fonts...
              </div>
            )}
            {loadingState === 'error' && (
              <div className="mt-4 text-center text-yellow-300">
                Some fonts couldn't be loaded. Showing available fonts...
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Rest of your JSX with updated font display */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Best Fonts Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Best {formatCategory(category)} Fonts
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {fontPreviews.slice(0, 12).map((font, index) => (
              <motion.div
                key={`best-${font.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition-all duration-200 group relative overflow-hidden"
                onClick={() => handleCopyToClipboard(font.text, font.id)}
              >
                <div className={`min-h-20 flex items-center justify-center text-center ${font.style} px-2`}>
                  <div 
                    className="w-full break-words"
                    dangerouslySetInnerHTML={font.decoratedText || { __html: addGradientToSymbols(getDemoText(category)) }}
                  />
                </div>
                <div className="mt-2 text-xs text-gray-500 text-center line-clamp-1 px-1">
                  {font.name}
                </div>
                {showCopied === font.id && (
                  <div className="absolute inset-0 bg-black/90 flex items-center justify-center text-white font-medium rounded-xl">
                    Copied to Clipboard!
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* All Fonts Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            All {formatCategory(category)} Fonts ({fontPreviews.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fontPreviews.map((font, index) => (
              <motion.div
                key={font.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.01 * (index % 20) }}
                className="bg-white rounded-xl shadow-sm p-4 cursor-pointer hover:shadow-md transition-all duration-200 group relative overflow-hidden"
                onClick={() => handleCopyToClipboard(font.text, font.id)}
              >
                <div className="flex justify-between items-start">
                  <div className={`flex-1 min-w-0 ${font.style} min-h-12 flex items-center`}>
                    <div 
                      className="w-full break-words line-clamp-2"
                      dangerouslySetInnerHTML={font.decoratedText || { __html: addGradientToSymbols(getDemoText(category)) }}
                    />
                  </div>
                  <button
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-indigo-600 transition-opacity ml-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyToClipboard(font.text, font.id);
                    }}
                  >
                    <FiCopy className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-1 text-xs text-gray-500 line-clamp-1">
                  {font.name}
                </div>
                {showCopied === font.id && (
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Copied!
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors z-50"
            aria-label="Scroll to top"
          >
            <FiArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}