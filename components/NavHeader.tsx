'use client';

import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiChevronDown, FiX } from 'react-icons/fi';

const SOCIAL_MEDIA = [
  { name: 'Instagram', icon: '📸', slug: 'instagram' },
  { name: 'Twitter', icon: '🐦', slug: 'twitter' },
  { name: 'Facebook', icon: '📘', slug: 'facebook' },
  { name: 'TikTok', icon: '🎵', slug: 'tiktok' },
  { name: 'LinkedIn', icon: '💼', slug: 'linkedin' },
  { name: 'Pinterest', icon: '📌', slug: 'pinterest' },
  { name: 'Snapchat', icon: '👻', slug: 'snapchat' },
  { name: 'Reddit', icon: '🤖', slug: 'reddit' },
  { name: 'Tumblr', icon: '✍️', slug: 'tumblr' },
  { name: 'YouTube', icon: '▶️', slug: 'youtube' },
  { name: 'WhatsApp', icon: '💬', slug: 'whatsapp' },
  { name: 'Discord', icon: '🎮', slug: 'discord' },
  { name: 'Telegram', icon: '📨', slug: 'telegram' },
  { name: 'Quora', icon: '❓', slug: 'quora' },
  { name: 'Clubhouse', icon: '🎙️', slug: 'clubhouse' },
  { name: 'Beacons', icon: '🔦', slug: 'beacons' },
  { name: 'Vimeo', icon: '🎥', slug: 'vimeo' },
  { name: 'Medium', icon: '✍️', slug: 'medium' },
  { name: 'Flickr', icon: '📷', slug: 'flickr' },
  { name: 'Twitch', icon: '🎮', slug: 'twitch' },
];

export function NavHeader() {
  const pathname = usePathname();
  const [showSocialMenu, setShowSocialMenu] = useState(false);
  
  const toggleSocialMenu = () => {
    setShowSocialMenu(!showSocialMenu);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold text-primary-600">
          Fontys
        </Link>
        
        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          {/* Social Media Dropdown */}
          <div className="relative">
            <button 
              onClick={toggleSocialMenu}
              className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
            >
              Social Media
              <FiChevronDown className={`ml-1 transition-transform ${showSocialMenu ? 'rotate-180' : ''}`} />
            </button>
            
            {showSocialMenu && (
              <div className="absolute left-0 mt-2 w-64 rounded-lg bg-white shadow-lg border border-gray-200 z-50 p-2">
                <div className="flex justify-between items-center px-4 py-2 border-b border-gray-100">
                  <h3 className="font-medium text-gray-900">Social Platforms</h3>
                  <button 
                    onClick={toggleSocialMenu}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <FiX className="h-5 w-5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 p-2 max-h-96 overflow-y-auto">
                  {SOCIAL_MEDIA.map((platform) => (
                    <Link
                      key={platform.slug}
                      href={`/${platform.slug}`}
                      className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-50"
                      onClick={() => setShowSocialMenu(false)}
                    >
                      <span className="mr-2">{platform.icon}</span>
                      {platform.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Font Categories */}
          <Link href="/categories/fancy-font-generator" className="text-gray-600 hover:text-primary-600">
            Fancy Fonts
          </Link>
          <Link href="/categories/cursive-font-generator" className="text-gray-600 hover:text-primary-600">
            Cursive Fonts
          </Link>
          <Link href="/categories/bold-font-generator" className="text-gray-600 hover:text-primary-600">
            Bold Fonts
          </Link>
        </nav>
      </div>
    </header>
  );
}
