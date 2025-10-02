import React from 'react';
import Head from 'next/head';
import { JsonLd } from './JsonLd';

type SeoHeadProps = {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType?: string;
  ogImageUrl?: string;
  jsonLd?: Array<{ __html: string }>;
  breadcrumbJsonLd?: Record<string, unknown>;
};

export function SeoHead({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImageUrl,
  jsonLd = [],
  breadcrumbJsonLd,
}: SeoHeadProps) {
  const siteName = 'Stylish Text Generator';
  const fullTitle = `${title} | ${siteName}`;
  const defaultOgImage = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/og-default.jpg`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImageUrl || defaultOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl || defaultOgImage} />
      
      {/* JSON-LD */}
      {jsonLd.map((ld, i) => (
        <JsonLd key={i} data={ld} />
      ))}
      
      {breadcrumbJsonLd && <JsonLd data={breadcrumbJsonLd} />}
    </Head>
  );
}
