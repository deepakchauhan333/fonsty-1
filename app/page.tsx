import { Metadata } from 'next';
import HomeClient from '@/app/components/HomeClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fontforsocial.com';

export const metadata: Metadata = {
  title: 'Font Generator - 1000+ Unicode Fonts for Social Media',
  description: 'Free font generator with 1000+ Unicode fonts for Instagram, Facebook, TikTok & more. Create fancy, cursive, bold text instantly. Copy & paste anywhere.',
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Font Generator - 1000+ Unicode Fonts',
    description: 'Transform your text with 1000+ stylish Unicode fonts. Free copy-paste tool for social media.',
    url: siteUrl,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Font Generator - 1000+ Unicode Fonts',
    description: 'Transform your text with 1000+ stylish Unicode fonts. Free copy-paste tool for social media.',
  },
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Font Generator',
    url: siteUrl,
    description: 'Free font generator with 1000+ Unicode fonts for social media',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    datePublished: '2025-09-04T00:00:00Z',
    dateModified: new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: 'Deepak Chauhan',
      url: 'https://www.linkedin.com/in/deepakchauhan333/',
      email: 'dc556316@gmail.com',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}