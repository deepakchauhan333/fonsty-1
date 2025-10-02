'use client';

import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';

// Removed unused interface: FontStyle

interface SpecialCategoryClientProps {
  title: string;
  description: string;
}

const styleCategories = [
  'Popular Font Styles', 'Attitude', 'Boy', 'Girl', 'Weird', 
  'Squiggle', 'Boxed', 'Cursive', 'Fancy', 'Bubble', 'Bio-names',
  'Bio-texts', 'Blue', 'Hit', 'Joiner', 'Arrow', 'Bricks', 'Strikes', 'More Styles'
];

const socialPlatforms = [
  { name: 'Instagram', icon: '📸', slug: 'instagram' },
  { name: 'TikTok', icon: '🎵', slug: 'tiktok' },
  { name: 'Twitter', icon: '𝕏', slug: 'twitter' },
  { name: 'Facebook', icon: 'f', slug: 'facebook' },
  { name: 'Pinterest', icon: 'P', slug: 'pinterest' },
  { name: 'YouTube', icon: '▶️', slug: 'youtube' },
  { name: 'Snapchat', icon: '👻', slug: 'snapchat' },
  { name: 'WhatsApp', icon: '💬', slug: 'whatsapp' }
];

const fontStyleCategories = {
  'New Pinterest Cursive Fonts': [
    { name: 'Elegant Script', text: '𝒯𝒽𝒾𝓈 𝒾𝓈 𝒶 𝓃𝑒𝓌 𝒫𝒾𝓃𝓉𝑒𝓇𝑒𝓈𝓉 𝒻𝑜𝓃𝓉' },
    { name: 'Fancy Script', text: '𝐹𝒶𝓃𝒸𝓎 𝒮𝒸𝓇𝒾𝓅𝓉 𝒮𝓉𝓎𝓁𝑒' },
    { name: 'Calligraphy', text: '𝒞𝒶𝓁𝓁𝒾𝑔𝓇𝒶𝓅𝒽𝓎 𝒯𝑒𝓍𝓉' },
    { name: 'Signature', text: '𝒮𝒾𝑔𝓃𝒶𝓉𝓊𝓇𝑒 𝒮𝓉𝓎𝓁𝑒' },
    { name: 'Wedding Font', text: '𝒲𝑒𝒹𝒹𝒾𝓃𝑔 𝒮𝒸𝓇𝒾𝓅𝓉' },
    { name: 'Bold Script', text: '𝐵𝑜𝓁𝒹 𝒮𝒸𝓇𝒾𝓅𝓉' },
    { name: 'Thin Cursive', text: '𝒯𝒽𝒾𝓃 𝒞𝓊𝓇𝓈𝒾𝓋𝑒' },
    { name: 'Bold Cursive', text: '𝓑𝓸𝓵𝓭 𝓒𝓾𝓻𝓼𝓲𝓿𝓮' },
  ],
  'Trending Instagram Fonts': [
    { name: 'Neon Glow', text: '✨ 𝒩𝑒𝑜𝓃 𝒢𝓁𝑜𝓌 ✨' },
    { name: 'Vintage', text: '𝒱𝒾𝓃𝓉𝒶𝑔𝑒 𝒮𝓉𝓎𝓁𝑒' },
    { name: 'Modern Calligraphy', text: '𝑀𝑜𝒹𝑒𝓇𝓃 𝒞𝒶𝓁𝓁𝒾𝑔𝓇𝒶𝓅𝒽𝓎' },
    { name: 'Bold Title', text: '𝐁𝐎𝐋𝐃 𝐓𝐈𝐓𝐋𝐄' },
    { name: 'Italic', text: '𝐼𝑡𝑎𝑙𝑖𝑐 𝑇𝑒𝑥𝑡' },
    { name: 'Bold Italic', text: '𝑩𝒐𝒍𝒅 𝑰𝒕𝒂𝒍𝒊𝒄' },
    { name: 'Monospace', text: '𝙼𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎 𝚃𝚎𝚡𝚝' },
    { name: 'Double Struck', text: '𝔻𝕠𝕦𝕓𝕝𝕖 𝕊𝕥𝕣𝕦𝕔𝕜' },
  ],
  'Best Fonts for TikTok': [
    { name: 'Bold Impact', text: '🅱🅾🅻🅳 🅸🅼🅿🅰🅲🆃' },
    { name: 'Bubble Text', text: 'ⓑⓤⓑⓑⓛⓔ ⓣⓔⓧⓣ' },
    { name: 'Small Caps', text: 'sᴍᴀʟʟ ᴄᴀᴘs' },
    { name: 'Upside Down', text: 'ɯoɹɟ ʇxǝ⊥' },
    { name: 'Strikethrough', text: 'S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶' },
    { name: 'Underline', text: 'U̲n̲d̲e̲r̲l̲i̲n̲e̲' },
    { name: 'Slash Through', text: 'S̸l̸a̸s̸h̸ ̸T̸h̸r̸o̸u̸g̸h̸' },
    { name: 'Dotted', text: 'D̤o̤t̤t̤e̤d̤ T̤e̤x̤t̤' },
  ]
};

export default function SpecialCategoryClient({ title }: SpecialCategoryClientProps) {
  const [inputText, setInputText] = useState('Hello World');
  const [activeCategory, setActiveCategory] = useState('Popular');
  const [activePlatform, setActivePlatform] = useState('All Platforms');
  const [copiedIndex, setCopiedIndex] = useState<{ [key: string]: number | null }>({});

  const handleCopy = (text: string, category: string, index: number) => {
    copyToClipboard(text);
    setCopiedIndex({ [category]: index });
    setTimeout(() => setCopiedIndex({}), 2000);
  };

  const isCopied = (category: string, index: number) => {
    return copiedIndex[category] === index;
  };

  return (
    <div className="w-full">
      {/* Style Categories */}
      <div className="mb-6">
        <div className="flex overflow-x-auto pb-3 -mx-2 px-2 no-scrollbar">
          <div className="flex space-x-2">
            {styleCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all min-w-fit ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Social Platforms */}
      <div className="mb-8">
        <div className="flex overflow-x-auto pb-3 -mx-2 px-2 no-scrollbar">
          <div className="flex space-x-2">
            {socialPlatforms.map((platform) => (
              <button
                key={platform.slug}
                onClick={() => setActivePlatform(platform.name)}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 whitespace-nowrap transition-all min-w-fit ${
                  activePlatform === platform.name
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                }`}
              >
                <span className="text-base">{platform.icon}</span>
                <span>{platform.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Font Styles Sections */}
      <div className="space-y-10">
        {Object.entries(fontStyleCategories).map(([category, styles]) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {styles.map((style, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 hover:-translate-y-1"
                >
                  <div className="text-lg font-medium mb-4 min-h-[60px] flex items-center justify-center text-center">
                    {style.text}
                  </div>
                  <button
                    onClick={() => handleCopy(style.text, category, index)}
                    className={`w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                      isCopied(category, index)
                        ? 'bg-green-500 text-white scale-95'
                        : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
                    }`}
                  >
                    {isCopied(category, index) ? '✓ Copied!' : 'Copy Text'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Input for custom text */}
      <div className="mt-12 bg-white/90 dark:bg-gray-800/90 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Create Your Own Style</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Type something amazing..."
          />
          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Type your text to see it transform in different styles
          </div>
        </div>
      </div>
    </div>
  );
}
