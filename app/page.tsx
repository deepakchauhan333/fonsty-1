'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { generateFontVariations } from '@/lib/unicode-data';

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

interface FontPreview {
  id: number;
  name: string;
  text: string;
}

export default function Home() {
  const [inputText, setInputText] = useState('Unicode Fonts');
  const [fontPreviews, setFontPreviews] = useState<FontPreview[]>([]);
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
      // Generate all 2000+ variations with 'demo' text
      const variations = generateFontVariations('demo', 2000);
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
      const variations = generateFontVariations(displayText, 2000);
      setFontPreviews(variations);
    };
    
    // Debounce the font generation to prevent UI freezing
    const timer = setTimeout(updateFonts, 50);
    
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
      // Generate more variations for a richer experience
      const variations = generateFontVariations(inputText, 2000);
      setFontPreviews(variations);
      setIsLoading(false);
    }, 300);

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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          {/* Social Media Links */}
          <div className="flex justify-center space-x-6 mb-4">
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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Unicode Font Generator</h1>
            <p className="text-sm text-gray-500">Type anything to generate unique font styles</p>
          </div>
          
          {/* Input */}
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(sanitizeInput(e.target.value))}
              placeholder="Type your name or text..."
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              autoFocus
              maxLength={5000}
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
        {/* Best 6x6 Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Best Fonts</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
            {fontPreviews.slice(0, 36).map((font, index) => (
              <motion.div
                key={`best-${font.id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.02 }}
                className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => copyToClipboard(font.text, font.id)}
              >
                <div className="text-center h-12 flex items-center justify-center">
                  <span className="text-xl">{font.text}</span>
                </div>
                {showCopied === font.id && (
                  <div className="text-center text-xs text-green-600 mt-1">Copied!</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* All Fonts */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">All Fonts ({fontPreviews.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {fontPreviews.map((font, index) => (
              <motion.div
                key={font.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1, delay: index * 0.003 }}
                className="group relative bg-white p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                onClick={() => copyToClipboard(font.text, font.id)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">{font.text}</span>
                  <button 
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(font.text, font.id);
                    }}
                    aria-label="Copy to clipboard"
                  >
                    <FiCopy size={16} />
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
              Start typing in the input above to generate 2000+ unique font styles
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Unicode Font Generator. Click any style to copy.
          </p>
        </div>
      </footer>
    </div>
  );
}