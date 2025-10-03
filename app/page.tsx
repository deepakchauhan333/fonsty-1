'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiCopy, 
  FiX, 
  FiInstagram, 
  FiTwitter, 
  FiFacebook, 
  FiYoutube, 
  FiLinkedin,
  FiMessageCircle,
  FiMessageSquare,
  FiSend,
  FiCamera,
  FiVideo,
  FiPlay,
  FiImage,
  FiGrid,
  FiHelpCircle
} from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa';
import { getHomepageVariations } from '@/lib/optimized-unicode-variations';
import OptimizedFontCard from '@/components/OptimizedFontCard';

// Social media platforms with their icons and base URLs
const socialMedia = [
  { name: 'Facebook', icon: <FiFacebook />, url: '/facebook' },
  { name: 'YouTube', icon: <FiYoutube />, url: '/youtube' },
  { name: 'WhatsApp', icon: <FiMessageCircle />, url: '/whatsapp' },
  { name: 'Instagram', icon: <FiInstagram />, url: '/instagram' },
  { name: 'TikTok', icon: <FaTiktok />, url: '/tiktok' },
  { name: 'WeChat', icon: <FiMessageSquare />, url: '/wechat' },
  { name: 'Telegram', icon: <FiSend />, url: '/telegram' },
  { name: 'Facebook Messenger', icon: <FiMessageSquare />, url: '/facebook-messenger' },
  { name: 'Snapchat', icon: <FiCamera />, url: '/snapchat' },
  { name: 'Douyin', icon: <FiVideo />, url: '/douyin' },
  { name: 'Kuaishou', icon: <FiPlay />, url: '/kuaishou' },
  { name: 'Reddit', icon: <FiMessageSquare />, url: '/reddit' },
  { name: 'Pinterest', icon: <FiImage />, url: '/pinterest' },
  { name: 'Weibo', icon: <FiMessageCircle />, url: '/weibo' },
  { name: 'X (Twitter)', icon: <FiTwitter />, url: '/x' },
  { name: 'LinkedIn', icon: <FiLinkedin />, url: '/linkedin' },
  { name: 'QQ', icon: <FiMessageCircle />, url: '/qq' },
  { name: 'Qzone', icon: <FiGrid />, url: '/qzone' },
  { name: 'Quora', icon: <FiHelpCircle />, url: '/quora' },
  { name: 'Viber', icon: <FiMessageCircle />, url: '/viber' },
  { name: 'Baidu Tieba', icon: <FiMessageSquare />, url: '/baidu-tieba' },
  { name: 'Discord', icon: <FiMessageSquare />, url: '/discord' },
  { name: 'Threads', icon: <FiMessageSquare />, url: '/threads' },
  { name: 'Vimeo', icon: <FiVideo />, url: '/vimeo' },
  { name: 'Twitch', icon: <FiVideo />, url: '/twitch' },
];

import { UnicodeVariation } from '@/lib/optimized-unicode-variations';

export default function Home() {
  const [inputText, setInputText] = useState('Unicode Fonts');
  const [fontPreviews, setFontPreviews] = useState<UnicodeVariation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCopied, setShowCopied] = useState<number | null>(null);

  const sanitizeInput = (text: string): string => {
    // Remove potentially dangerous characters and limit length
    return text
      .replace(/[<>]/g, '') // Remove angle brackets to prevent HTML injection
      .slice(0, 5000); // Limit to 5000 characters
  };

  // Load all fonts on initial render with 'demo' text
  useEffect(() => {
    try {
      // Generate 500 optimized variations for instant load
      const variations = getHomepageVariations('demo', 500);
      setFontPreviews(variations);
    } catch (error) {
      console.error('Error loading fonts:', error);
    }
  }, []);
  
  // Update fonts when input changes
  useEffect(() => {
    const displayText = inputText.trim() || 'demo';
    
    // Use requestAnimationFrame for smoother UI updates
    const updateFonts = () => {
      const variations = getHomepageVariations(displayText, 500);
      setFontPreviews(variations);
    };
    
    // Minimal debounce for instant feel
    const timer = setTimeout(updateFonts, 100);
    
    return () => clearTimeout(timer);
  }, [inputText]);

  // Generate font variations when input text changes
  useEffect(() => {
    if (!inputText.trim()) {
      setFontPreviews([]);
      return;
    }

    setIsLoading(true);
    
    // Use setTimeout to prevent UI blocking
    const timer = setTimeout(() => {
      // Generate 500 optimized variations for best performance
      const variations = getHomepageVariations(inputText, 500);
      setFontPreviews(variations);
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [inputText]);

  // Handle copying text to clipboard
  const copyToClipboard = async (text: string, id: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowCopied(id);
      setTimeout(() => setShowCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-white to-pink-50/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100/50 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          {/* Social Media Links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-4">
            {socialMedia.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                className="text-gray-500 hover:text-indigo-600 transition-colors duration-200"
                aria-label={platform.name}
              >
                <span className="text-xl">{platform.icon}</span>
              </a>
            ))}
          </div>
          
          <div className="text-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">✨ Unicode Font Generator</h1>
            <p className="text-sm text-gray-600 font-medium">Transform your text instantly • 500+ beautiful styles</p>
          </div>
          
          {/* Input */}
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(sanitizeInput(e.target.value))}
              placeholder="✍️ Type your text here..."
              className="w-full px-5 py-4 text-lg font-medium border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all duration-200 bg-white shadow-sm hover:shadow-md"
              autoFocus
              maxLength={5000}
            />
            {inputText && (
              <button
                onClick={() => setInputText('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-gray-100 hover:bg-purple-500 text-gray-500 hover:text-white transition-all duration-200 hover:scale-110"
                aria-label="Clear input"
              >
                <FiX size={18} />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Featured Fonts */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">✨ Featured Fonts</h2>
            <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-4 py-2 rounded-full">Top Picks</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
            {fontPreviews.slice(0, 36).map((font) => (
              <OptimizedFontCard
                key={`best-${font.id}`}
                font={font}
                variant="featured"
              />
            ))}
          </div>
        </div>

        {/* All Fonts */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">🌟 All Fonts</h2>
            <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-4 py-2 rounded-full">{fontPreviews.length} styles</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {fontPreviews.map((font) => (
              <OptimizedFontCard
                key={font.id}
                font={font}
                variant="grid"
              />
            ))}
          </div>
        </div>

        {!isLoading && fontPreviews.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-300 mb-4">
              <svg
                className="mx-auto h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700">Type something to see font variations</h3>
            <p className="mt-1 text-sm text-gray-500">
              Start typing in the input above to generate 500+ unique font styles instantly
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-50 to-pink-50 border-t border-purple-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-sm text-gray-600 font-medium">
            Made with 💜 • &copy; {new Date().getFullYear()} Unicode Font Generator • Click any style to copy instantly
          </p>
        </div>
      </footer>
    </div>
  );
}