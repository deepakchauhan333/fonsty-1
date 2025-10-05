import { notFound } from 'next/navigation';
import { PLATFORMS, FONT_TYPES, PlatformType, PLATFORM_NAMES } from '@/lib/constants';
import FontGenerator from '@/app/components/FontGenerator';
import { Metadata } from 'next';
import Link from 'next/link';
import { generateSEOContent } from '@/lib/seo-content-generator';

// Import utility functions
import { getFontTypeFromParam } from '@/lib/font-utils';

interface PageProps {
  params: {
    platform: string;
    fontType: string;
  };
}

// Format URL parameter to match our font type
const formatFontTypeParam = (fontType: string): string => {
  return fontType
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

export default function Page({ params }: PageProps) {
  const platform = params.platform.toLowerCase();
  const fontType = getFontTypeFromParam(params.fontType, FONT_TYPES);
  
  if (!PLATFORMS.includes(platform as PlatformType) || !fontType) {
    notFound();
  }

  const formatTitle = (str: string): string => {
    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
      .replace('Text', '')
      .replace('Generator', '')
      .trim();
  };

  const title = formatTitle(fontType);
  const platformName = PLATFORM_NAMES[platform] || platform;
  const formattedPlatformName = platformName.split(' ')[0]; // Get just the first word for the breadcrumb
  
  const seoContent = generateSEOContent(platform, fontType, FONT_TYPES as unknown as string[]);

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fontforsocial.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: platformName,
        item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fontforsocial.com'}/${platform}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${title} Generator`,
        item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fontforsocial.com'}/${platform}/${fontType}`,
      },
    ],
  };

  // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: seoContent.faqs.items.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  // WebPage Schema with Author and Dates
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${title} Generator for ${platformName}`,
    description: `Create beautiful ${title.toLowerCase()} text for your ${platformName} posts, bios, and more.`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fontforsocial.com'}/${platform}/${fontType}`,
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
      name: 'Font Generator',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fontforsocial.com'}/logo.png`,
      },
    },
    breadcrumb: breadcrumbSchema,
    mainEntity: {
      '@type': 'SoftwareApplication',
      name: `${title} Font Generator`,
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      author: {
        '@type': 'Person',
        name: 'Deepak Chauhan',
        url: 'https://www.linkedin.com/in/deepakchauhan333/',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <div className="container mx-auto px-4 py-8">
        <nav className="flex items-center text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <Link 
                href={`/${platform}`} 
                className="text-blue-600 hover:text-blue-800"
              >
                {platformName}
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-500">{title}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <FontGenerator fontType={fontType} platform={platform} />
      </div>

      {/* SEO Content Section */}
      <article className="mt-16 prose prose-lg max-w-none">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 mb-8">
          <p className="text-lg leading-relaxed text-gray-700">
            {seoContent.introduction}
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">{seoContent.whatIs.title}</h2>
          <p className="text-gray-700 leading-relaxed">{seoContent.whatIs.content}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">{seoContent.howToUse.title}</h2>
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">{seoContent.howToUse.content}</div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">{seoContent.examples.title}</h2>
          <ul className="space-y-3 text-gray-700" dangerouslySetInnerHTML={{ __html: seoContent.examples.items.join('') }} />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">{seoContent.benefits.title}</h2>
          <p className="text-gray-700 leading-relaxed">{seoContent.benefits.content}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">{seoContent.comparison.title}</h2>
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">{seoContent.comparison.content}</div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">{seoContent.faqs.title}</h2>
          <dl className="space-y-6">
            {seoContent.faqs.items.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 border border-gray-200">
                <dt className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</dt>
                <dd className="text-gray-700 leading-relaxed">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">{seoContent.relatedTools.title}</h2>
          <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: seoContent.relatedTools.content }} />
        </section>
      </article>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">More {formattedPlatformName} Font Generators</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {FONT_TYPES
            .filter(ft => ft !== fontType)
            .slice(0, 8)
            .map(ft => (
              <Link 
                key={ft}
                href={`/${platform}/${formatFontTypeParam(ft)}`}
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-medium">{formatTitle(ft)}</h3>
                <p className="text-sm text-gray-500">Generate {formatTitle(ft).toLowerCase()} text</p>
              </Link>
            ))}
        </div>
      </div>
      </div>
    </>
  );
}

export function generateStaticParams(): Array<{ platform: string; fontType: string }> {
  const params: Array<{ platform: string; fontType: string }> = [];
  
  for (const platform of PLATFORMS) {
    for (const fontType of FONT_TYPES) {
      params.push({
        platform,
        fontType: formatFontTypeParam(fontType),
      });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const formatTitle = (str: string): string => {
    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
      .replace('Text', '')
      .replace('Generator', '')
      .trim();
  };

  const fontStyle = formatTitle(params.fontType);
  const platformName = PLATFORM_NAMES[params.platform] || params.platform;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fontforsocial.com';
  const title = `${fontStyle} ${platformName} Font Generator`;
  const description = `Free ${fontStyle} font generator for ${platformName}. Create 500+ Unicode ${fontStyle.toLowerCase()} text styles. Copy & paste for bios, posts & captions.`;
  const url = `${siteUrl}/${params.platform}/${params.fontType}`;
  
  const keywords = [
    `${fontStyle.toLowerCase()} font generator`,
    `${platformName} ${fontStyle.toLowerCase()} text`,
    `unicode ${fontStyle.toLowerCase()} converter`,
    `${fontStyle.toLowerCase()} text generator`,
    `${platformName} fonts`,
    `stylish text for ${platformName}`,
    `copy paste ${fontStyle.toLowerCase()} fonts`,
    `${platformName} bio fonts`,
    `${fontStyle.toLowerCase()} unicode text`
  ];

  return {
    title,
    description,
    keywords: keywords.join(', '),
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
      title: `${fontStyle} Font Generator for ${platformName}`,
      description,
      url,
      siteName: 'Font Generator',
      locale: 'en_US',
      type: 'website',
      images: [{
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${fontStyle} Font Generator for ${platformName}`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${fontStyle} ${platformName} Fonts`,
      description,
      images: [`${siteUrl}/og-image.png`],
      creator: '@fontgenerator',
    },
  };
}