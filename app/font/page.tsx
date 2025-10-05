import Link from 'next/link';
import { Metadata } from 'next';
import { THOUSAND_FONTS, getFontDisplayName } from '@/lib/thousand-fonts';

export const metadata: Metadata = {
  title: '1000+ Font Generators - Free Text Style Converter',
  description: 'Browse over 1000 unique font styles and text generators. Transform your text for Instagram, TikTok, Discord, and all social media platforms.',
  keywords: 'font generator, text generator, unicode fonts, stylish text, fancy fonts, cool fonts, instagram fonts, tiktok fonts',
};

export default function FontListingPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fontforsocial.com';
  
  const fontListingSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '1000+ Font Generators',
    description: 'Browse over 1000 unique font styles and text generators for Instagram, TikTok, Discord, and all social media platforms.',
    url: `${siteUrl}/font`,
    datePublished: '2025-09-04T00:00:00Z',
    dateModified: new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: 'Deepak Chauhan',
      url: 'https://www.linkedin.com/in/deepakchauhan333/',
      email: 'dc556316@gmail.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'FONTFORSOCIAL.COM',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(fontListingSchema) }}
      />
      <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            1000+ Font Generators
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your text with over 1000 unique font styles. Perfect for social media bios, 
            posts, usernames, and more. All fonts are free and work on all platforms.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {THOUSAND_FONTS.map((fontSlug) => {
            const fontName = getFontDisplayName(fontSlug);
            return (
              <Link
                key={fontSlug}
                href={`/font/${fontSlug}`}
                className="group block p-5 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-200"
              >
                <h2 className="font-semibold text-gray-900 text-sm mb-1 truncate group-hover:text-blue-600">
                  {fontName}
                </h2>
                <p className="text-xs text-gray-500">Font Generator</p>
              </Link>
            );
          })}
        </div>

        <div className="mt-16 bg-white rounded-lg p-8 shadow-sm max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About Our Font Generators
          </h2>
          <p className="text-gray-700 mb-4">
            Our collection features over 1000 unique font styles and text generators that work across 
            all platforms. Each font uses Unicode characters, which means they're actual text (not images) 
            and can be copied and pasted anywhere.
          </p>
          <p className="text-gray-700">
            Whether you're looking for bold fonts, cursive styles, aesthetic text, or unique symbols, 
            you'll find the perfect font generator here. All tools are 100% free with no registration required.
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
