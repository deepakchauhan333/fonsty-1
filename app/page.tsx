'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import {
  FaFacebook, FaYoutube, FaWhatsapp, FaInstagram, FaTiktok, FaWeixin, FaTelegramPlane,
  FaFacebookMessenger, FaSnapchatGhost, FaTwitter, FaLinkedin, FaRedditAlien, FaPinterestP,
  FaWeibo, FaQq, FaQuora, FaDiscord, FaVimeoV, FaTwitch
} from 'react-icons/fa';
import { getHomepageVariations } from '@/lib/optimized-unicode-variations';
import OptimizedFontCard from '@/components/OptimizedFontCard';

// Social media platforms with brand-colored icons
const socialMedia = [
  { name: 'Facebook', icon: <FaFacebook className="text-[#1877F2]" />, url: '/facebook' },
  { name: 'YouTube', icon: <FaYoutube className="text-[#FF0000]" />, url: '/youtube' },
  { name: 'WhatsApp', icon: <FaWhatsapp className="text-[#25D366]" />, url: '/whatsapp' },
  { name: 'Instagram', icon: <FaInstagram className="text-pink-600" />, url: '/instagram' },
  { name: 'TikTok', icon: <FaTiktok className="text-black" />, url: '/tiktok' },
  { name: 'WeChat', icon: <FaWeixin className="text-[#07C160]" />, url: '/wechat' },
  { name: 'Telegram', icon: <FaTelegramPlane className="text-[#229ED9]" />, url: '/telegram' },
  { name: 'Facebook Messenger', icon: <FaFacebookMessenger className="text-[#00B2FF]" />, url: '/facebook-messenger' },
  { name: 'Snapchat', icon: <FaSnapchatGhost className="text-[#FFFC00]" />, url: '/snapchat' },
  { name: 'Reddit', icon: <FaRedditAlien className="text-[#FF4500]" />, url: '/reddit' },
  { name: 'Pinterest', icon: <FaPinterestP className="text-[#E60023]" />, url: '/pinterest' },
  { name: 'Weibo', icon: <FaWeibo className="text-[#E6162D]" />, url: '/weibo' },
  { name: 'X (Twitter)', icon: <FaTwitter className="text-[#1DA1F2]" />, url: '/x' },
  { name: 'LinkedIn', icon: <FaLinkedin className="text-[#0A66C2]" />, url: '/linkedin' },
  { name: 'QQ', icon: <FaQq className="text-[#12B7F5]" />, url: '/qq' },
  { name: 'Quora', icon: <FaQuora className="text-[#B92B27]" />, url: '/quora' },
  { name: 'Discord', icon: <FaDiscord className="text-[#5865F2]" />, url: '/discord' },
  { name: 'Vimeo', icon: <FaVimeoV className="text-[#1AB7EA]" />, url: '/vimeo' },
  { name: 'Twitch', icon: <FaTwitch className="text-[#9146FF]" />, url: '/twitch' },
];

import { UnicodeVariation } from '@/lib/optimized-unicode-variations';

export default function Home() {
  const [inputText, setInputText] = useState('Unicode Fonts');
  const [fontPreviews, setFontPreviews] = useState<UnicodeVariation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCopied, setShowCopied] = useState<number | null>(null);

  // SEO-focused H2 headings to interleave between font cards
  const h2Headings: string[] = [
    'Instagram Font Generator',
    'Facebook Font Generator',
    'Twitter Font Generator',
    'YouTube Font Generator',
    'WhatsApp Font Generator',
    'Telegram Font Generator',
    'Discord Font Generator',
    'TikTok Font Generator',
    'LinkedIn Font Generator',
    'Pinterest Font Generator',
    'Reddit Font Generator',
    'WeChat Font Generator',
    'QQ Font Generator',
    'Stylish Name Font Generator',
    'Fancy Font Generator',
    'Cursive Font Generator',
    'Bold Font Generator',
    'Bubble Font Generator',
    'Birthday Font Generator',
    'Attitude Font Generator',
    'Boys Name Font Generator',
    'Girls Name Font Generator',
    'Aesthetic Font Generator',
    'Cool Font Generator',
    'Gaming Font Generator',
    'Bio Fonts Generator',
    'Love Font Generator',
    'Cute Font Generator',
    'Glitch Font Generator',
    'Neon Font Generator',
    'Retro Font Generator',
    'Vintage Font Generator',
  ];

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
      {/* Header (not sticky) */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100/50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          {/* Social Media Links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-4">
            {socialMedia.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                className="transition-colors duration-200"
                aria-label={platform.name}
                title={platform.name}
              >
                <span className="text-2xl">{platform.icon}</span>
              </a>
            ))}
          </div>
          <p className="text-center text-sm font-semibold text-gray-700 mb-2">Choose your social media fonts</p>
          
          <div className="text-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">✨ Unicode Font Generator</h1>
            <p className="text-sm text-gray-600 font-medium">Transform your text instantly • 500+ beautiful styles</p>
          </div>
        </div>
      </header>

      {/* Sticky input bar */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-purple-100 shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="relative max-w-3xl mx-auto">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(sanitizeInput(e.target.value))}
              placeholder="Type or paste your text here ↴"
              className="w-full px-6 py-4 text-base md:text-lg font-medium border border-purple-200 rounded-full focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all duration-200 bg-white shadow-md placeholder:text-gray-500"
              autoFocus
              maxLength={5000}
            />
            {inputText && (
              <button
                onClick={() => setInputText('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-100 hover:bg-purple-500 text-gray-500 hover:text-white transition-all duration-200"
                aria-label="Clear input"
              >
                <FiX size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Featured Fonts */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">✨ Featured Fonts</h2>
            <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-4 py-2 rounded-full">Top Picks</span>
          </div>
          <div className="grid grid-cols-1 gap-3 mb-8">
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
          <div className="grid grid-cols-1 gap-3">
            {fontPreviews.map((font, idx) => (
              <>
                {/* Insert H2 after every 12 cards */}
                {idx > 0 && idx % 12 === 0 && (
                  <h2 key={`h2-${idx}`} className="text-xl md:text-2xl font-bold text-gray-800 mt-6 mb-2">
                    {h2Headings[(idx / 12 - 1) % h2Headings.length]}
                  </h2>
                )}
                <OptimizedFontCard
                  key={font.id}
                  font={font}
                  variant="grid"
                />
              </>
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