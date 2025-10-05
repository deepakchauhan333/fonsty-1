import { notFound } from 'next/navigation';
import { PLATFORMS, FONT_TYPES, PLATFORM_NAMES } from '@/lib/constants';
import Link from 'next/link';

interface PlatformType {
  platform: string;
}

export default function PlatformPage({ params }: { params: PlatformType }) {
  const platform = params.platform.toLowerCase();
  
  if (!PLATFORMS.includes(platform as typeof PLATFORMS[number])) {
    notFound();
  }

  const platformName = PLATFORM_NAMES[platform] || platform;
  
  // Format font type for display
  const formatFontType = (fontType: string) => {
    return fontType
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
      .replace('Text', '')
      .replace('Generator', '')
      .trim();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{platformName} Font Generators</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FONT_TYPES.map((fontType) => (
          <Link 
            key={fontType}
            href={`/${platform}/${fontType}`}
            className="block p-6 bg-white rounded-lg border border-gray-200 shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{formatFontType(fontType)}</h2>
            <p className="text-gray-600">Generate {formatFontType(fontType)} for {platformName}</p>
            <div className="mt-4 text-blue-600 font-medium">Try it now →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return PLATFORMS.map((platform) => ({
    platform,
  }));
}

export async function generateMetadata({ params }: { params: { platform: string } }) {
  const platform = params.platform.toLowerCase();
  const platformName = PLATFORM_NAMES[platform] || platform;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fontforsocial.com';
  
  return {
    title: `${platformName} Font Generator - Stylish Text`,
    description: `Free ${platformName} font generator with 500+ Unicode styles. Create fancy, cursive, bold text for ${platformName} posts, bios & captions. Copy & paste instantly.`,
    alternates: {
      canonical: `${siteUrl}/${platform}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${platformName} Font Generator`,
      description: `Generate beautiful text styles for ${platformName} with our free tool.`,
      type: 'website',
      url: `${siteUrl}/${platform}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${platformName} Font Generator`,
      description: `Create stylish fonts for ${platformName} instantly.`,
    },
  };
}
