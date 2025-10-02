import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  structuredData?: object;
  noIndex?: boolean;
  noFollow?: boolean;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tag?: string;
}

export default function SEO({
  title = '1000+ Free Font Generator | Transform Your Text Online',
  description = 'Generate beautiful text with our collection of 1000+ free fonts. Perfect for social media, logos, websites, and more. No registration required!',
  canonicalUrl,
  ogType = 'website',
  ogImage = '/og-image.png',
  structuredData,
  noIndex = false,
  noFollow = false,
  keywords = ['font generator', 'text style', 'fancy text', 'online font converter', 'free fonts'],
  author = 'Font Generator',
  publishedTime,
  modifiedTime,
  section = 'Web Design',
  tag = 'Typography',
}: SEOProps) {
  const router = useRouter();
  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://fontys.vercel.app'}${router.asPath}`;
  const defaultOgImage = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://fontys.vercel.app'}${ogImage}`;
  
  const robotsMeta = [];
  if (noIndex) robotsMeta.push('noindex');
  if (noFollow) robotsMeta.push('nofollow');
  const robotsContent = robotsMeta.length > 0 ? robotsMeta.join(', ') : 'index, follow';

  // Generate schema.org JSON-LD
  const schemaOrgJSONLD = structuredData || {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: pageUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Font Generator',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://fontys.vercel.app'}/logo.png`,
      },
    },
    ...(publishedTime && modifiedTime
      ? {
          datePublished: publishedTime,
          dateModified: modifiedTime,
          author: {
            '@type': 'Organization',
            name: author,
          },
        }
      : {}
    )
  };

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="robots" content={robotsContent} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl || pageUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={defaultOgImage} />
      <meta property="og:site_name" content="Font Generator" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={pageUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={defaultOgImage} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#3b82f6" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Schema.org markup for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJSONLD) }}
      />
      
      {/* Additional SEO */}
      <meta name="application-name" content="Font Generator" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Font Generator" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      <meta name="msapplication-tap-highlight" content="no" />
      
      {/* PWA related */}
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3b82f6" />
      
      {/* Article specific */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}
      {tag && <meta property="article:tag" content={tag} />}
    </Head>
  );
}
