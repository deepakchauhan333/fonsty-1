'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaFacebook, FaYoutube, FaWhatsapp, FaInstagram, FaTiktok, FaTelegram, FaSnapchat, FaReddit, FaPinterest, FaWeibo, FaTwitter, FaLinkedin, FaDiscord, FaTwitch } from 'react-icons/fa';

const socialPlatforms = [
  { id: 'facebook', name: 'Facebook', icon: <FaFacebook className="w-5 h-5" /> },
  { id: 'youtube', name: 'YouTube', icon: <FaYoutube className="w-5 h-5" /> },
  { id: 'whatsapp', name: 'WhatsApp', icon: <FaWhatsapp className="w-5 h-5" /> },
  { id: 'instagram', name: 'Instagram', icon: <FaInstagram className="w-5 h-5" /> },
  { id: 'tiktok', name: 'TikTok', icon: <FaTiktok className="w-5 h-5" /> },
  { id: 'telegram', name: 'Telegram', icon: <FaTelegram className="w-5 h-5" /> },
  { id: 'snapchat', name: 'Snapchat', icon: <FaSnapchat className="w-5 h-5" /> },
  { id: 'reddit', name: 'Reddit', icon: <FaReddit className="w-5 h-5" /> },
  { id: 'pinterest', name: 'Pinterest', icon: <FaPinterest className="w-5 h-5" /> },
  { id: 'weibo', name: 'Weibo', icon: <FaWeibo className="w-5 h-5" /> },
  { id: 'x', name: 'X (Twitter)', icon: <FaTwitter className="w-5 h-5" /> },
  { id: 'linkedin', name: 'LinkedIn', icon: <FaLinkedin className="w-5 h-5" /> },
  { id: 'discord', name: 'Discord', icon: <FaDiscord className="w-5 h-5" /> },
  { id: 'twitch', name: 'Twitch', icon: <FaTwitch className="w-5 h-5" /> },
];

const fontTypes = [
  'fancy', 'cursive', 'bubble', 'bold', 'italic', 'strikethrough',
  'underline', 'small-caps', 'reverse', 'zalgo', 'mirror', 'upside-down',
  'emoji', 'unicode', 'symbol', 'tattoo', 'gaming', 'retro', 'vintage',
  'neon', 'glitch'
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const pathname = usePathname();
  const currentPlatform = pathname?.split('/')[1] || '';

  const toggleDropdown = (platformId: string) => {
    setSelectedPlatform(selectedPlatform === platformId ? null : platformId);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex
          ">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-900">Font Generator</span>
            </Link>
          </div>
          
          <nav className="hidden md:ml-6 md:flex md:space-x-4 lg:space-x-8">
            <Link href="/about" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              About
            </Link>
            
            <div className="relative group">
              <button 
                onClick={() => toggleDropdown('platforms')}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                Platforms
                <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              <div className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${selectedPlatform === 'platforms' ? 'block' : 'hidden'}`}>
                <div className="py-1 grid grid-cols-2 gap-1 p-2">
                  {socialPlatforms.map((platform) => (
                    <Link
                      key={platform.id}
                      href={`/${platform.id}`}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      onClick={() => setSelectedPlatform(null)}
                    >
                      <span className="mr-2">{platform.icon}</span>
                      {platform.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <button 
                onClick={() => toggleDropdown('fonts')}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                Fonts
                <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${selectedPlatform === 'fonts' ? 'block' : 'hidden'}`}>
                <div className="py-1 grid grid-cols-1">
                  {fontTypes.map((font) => (
                    <Link
                      key={font}
                      href={`/${currentPlatform || 'facebook'}/${font}-font-generator`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setSelectedPlatform(null)}
                    >
                      {font.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>
          
          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/about"
            className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
          <div className="px-4 py-2 font-medium text-gray-900">Social Platforms</div>
          <div className="grid grid-cols-2 gap-1 px-4">
            {socialPlatforms.map((platform) => (
              <Link
                key={platform.id}
                href={`/${platform.id}`}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-2">{platform.icon}</span>
                {platform.name}
              </Link>
            ))}
          </div>
          
          <div className="px-4 py-2 font-medium text-gray-900 mt-4">Font Types</div>
          <div className="grid grid-cols-2 gap-1 px-4">
            {fontTypes.map((font) => (
              <Link
                key={font}
                href={`/${currentPlatform || 'facebook'}/${font}-font-generator`}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {font.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
