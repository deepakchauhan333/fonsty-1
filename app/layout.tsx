import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Header from './components/Header';
import { Footer } from './components/Footer';

// Initialize Inter font with display: 'swap' for better font loading
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fontforsocial.com';
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'FontForSocial';
const siteDescription = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Generate beautiful text with 1000+ fonts for social media, logos, and more';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - 1000+ Unicode Fonts for Social Media`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    'font generator',
    'unicode fonts',
    'fancy text',
    'cool fonts',
    'text generator',
    'social media fonts',
    'instagram fonts',
    'facebook fonts',
    'twitter fonts',
    'tiktok fonts',
    'whatsapp fonts',
    'copy paste fonts',
    'stylish text',
    'text styles',
    'font converter',
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: `${siteName} - 1000+ Unicode Fonts for Social Media`,
    description: siteDescription,
    siteName: siteName,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} - 1000+ Unicode Fonts for Social Media`,
    description: siteDescription,
    images: [`${siteUrl}/og-image.png`],
    creator: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@fontgenerator',
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
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FONTFORSOCIAL.COM',
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/logo.png`,
      width: 200,
      height: 64,
    },
    description: siteDescription,
    foundingDate: '2025',
    founder: {
      '@type': 'Person',
      name: 'Deepak Chauhan',
      url: 'https://www.linkedin.com/in/deepakchauhan333/',
      email: 'dc556316@gmail.com',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'dc556316@gmail.com',
      contactType: 'Customer Support',
    },
    sameAs: [
      'https://www.linkedin.com/in/deepakchauhan333/',
    ],
  };

  // WebSite Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FONTFORSOCIAL.COM',
    url: siteUrl,
    description: siteDescription,
    publisher: {
      '@type': 'Organization',
      name: 'FONTFORSOCIAL.COM',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/font/{search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="en" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Preconnect to key origins for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" type="image/webp" href="/favicon.webp" />
        <link rel="icon" type="image/webp" sizes="32x32" href="/favicon.webp" />
        <link rel="icon" type="image/webp" sizes="16x16" href="/favicon.webp" />
        <link rel="apple-touch-icon" href="/favicon.webp" />
        <link rel="shortcut icon" href="/favicon.webp" />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Structured Data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={cn('min-h-screen bg-gray-50 font-sans antialiased overflow-x-hidden', 'font-sans')}>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
