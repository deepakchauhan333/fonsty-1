import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { THOUSAND_FONTS, getFontDisplayName, getFontDescription, getRelatedFonts } from '@/lib/thousand-fonts';
import { getFontMapping } from '@/lib/google-fonts-map';
import FontConverter from '@/app/components/FontConverter';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function FontPage({ params }: PageProps) {
  const { slug } = params;
  
  if (!THOUSAND_FONTS.includes(slug as any)) {
    notFound();
  }

  const fontName = getFontDisplayName(slug);
  const description = getFontDescription(slug);
  const relatedFonts = getRelatedFonts(slug, 25);
  const { fontName: googleFontName, fontUrl } = getFontMapping(slug);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/font" className="hover:text-blue-600">Fonts</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{fontName}</span>
        </nav>

        {/* Main Heading */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {fontName} Font Generator
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {description}
        </p>

        {/* Font Converter */}
        <>
          {fontUrl && <link rel="stylesheet" href={fontUrl} />}
          <FontConverter fontName={fontName} fontSlug={slug} googleFontName={googleFontName} />
        </>

        {/* SEO Content Section */}
        <article className="mt-12 max-w-4xl mx-auto prose prose-lg">
          <section className="bg-white rounded-lg p-8 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What is {fontName} Font?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {fontName} font is a unique text style that transforms your regular text into eye-catching, 
              stylized characters. This font generator uses Unicode characters to create {fontName.toLowerCase()} 
              styled text that you can copy and paste anywhere - Instagram, TikTok, Discord, Twitter, Facebook, 
              and more. Unlike image-based fonts, these are actual text characters that work across all platforms 
              and devices.
            </p>
          </section>

          <section className="bg-white rounded-lg p-8 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How to Use {fontName} Font Generator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>Type or paste your text in the input box above</li>
              <li>See your text instantly converted to {fontName} style</li>
              <li>Click the "Copy" button to copy the styled text</li>
              <li>Paste it anywhere you want - social media bios, posts, comments, messages</li>
            </ol>
            <p className="mt-4 text-gray-700">
              The {fontName} font works perfectly on Instagram bios, TikTok usernames, Discord nicknames, 
              Twitter posts, Facebook status updates, WhatsApp messages, and virtually any platform that 
              supports Unicode text.
            </p>
          </section>

          <section className="bg-white rounded-lg p-8 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Why Use {fontName} Font?
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span><strong>Stand Out:</strong> Make your profile, posts, and messages more noticeable with unique styling</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span><strong>100% Free:</strong> No registration, no downloads, no hidden costs</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span><strong>Works Everywhere:</strong> Compatible with all social media platforms and devices</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span><strong>Instant Results:</strong> Real-time conversion as you type</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span><strong>Copy & Paste:</strong> Easy one-click copy to clipboard</span>
              </li>
            </ul>
          </section>
        </article>

        {/* Related Fonts - Internal Linking */}
        <section className="mt-12 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Try More Font Styles
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {relatedFonts.map((relatedSlug) => (
              <Link
                key={relatedSlug}
                href={`/font/${relatedSlug}`}
                className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all"
              >
                <h3 className="font-medium text-gray-900 text-sm truncate">
                  {getFontDisplayName(relatedSlug)}
                </h3>
                <p className="text-xs text-gray-500 mt-1">Font Generator</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

// Generate static params for all fonts
export async function generateStaticParams() {
  return THOUSAND_FONTS.map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  
  if (!THOUSAND_FONTS.includes(slug as any)) {
    return {
      title: 'Font Not Found',
    };
  }

  const fontName = getFontDisplayName(slug);
  const description = getFontDescription(slug);
  const title = `${fontName} Font Generator - Free Online Text Converter`;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fontys.vercel.app';
  const url = `${siteUrl}/font/${slug}`;

  return {
    title,
    description,
    keywords: [
      `${fontName} font`,
      `${fontName} font generator`,
      `${fontName} text`,
      `${fontName} text generator`,
      'font converter',
      'text generator',
      'unicode fonts',
      'copy paste fonts',
      'instagram fonts',
      'tiktok fonts',
      'discord fonts',
      'social media fonts',
    ].join(', '),
    authors: [{ name: 'Font Generator' }],
    creator: 'Font Generator',
    publisher: 'Font Generator',
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Font Generator',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@fontgenerator',
    },
  };
}
