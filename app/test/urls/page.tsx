import { PLATFORMS, FONT_TYPES, PLATFORM_NAMES } from '@/lib/constants';
import Link from 'next/link';

export default function TestURLsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Test URLs</h1>
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Total URLs: {PLATFORMS.length * FONT_TYPES.length}</h2>
        <p className="text-gray-600 mb-4">
          This page lists all {PLATFORMS.length * FONT_TYPES.length} URL combinations for testing.
        </p>
      </div>

      <div className="space-y-12">
        {PLATFORMS.map((platform) => {
          const platformName = PLATFORM_NAMES[platform] || platform;
          return (
            <div key={platform} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{platformName} URLs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {FONT_TYPES.map((fontType) => {
                  const url = `/${platform}/${fontType}`;
                  const formattedFontType = fontType
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')
                    .replace('Text', '')
                    .replace('Generator', '')
                    .trim();
                  
                  return (
                    <Link 
                      key={fontType} 
                      href={url}
                      className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="font-medium">{formattedFontType}</div>
                      <div className="text-sm text-gray-500 truncate">/{platform}/{fontType}</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const dynamic = 'force-static';
