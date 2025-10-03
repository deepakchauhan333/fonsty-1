import { Metadata } from 'next';

type FontGeneratorPageProps = {
  title: string;
  description: string;
  slug: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  faqs?: Array<{ question: string; answer: string }>;
};

export function generateFontGeneratorMetadata({
  title,
  description,
  slug,
  primaryKeyword,
  secondaryKeywords,
  faqs: _faqs = [],
}: FontGeneratorPageProps): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
  const pageUrl = `${siteUrl}${slug}`;
  const imageUrl = `${siteUrl}/api/og?title=${encodeURIComponent(title)}`;

  return {
    title: `${title} | Stylish Text Generator`,
    description,
    keywords: [primaryKeyword, ...secondaryKeywords, 'font generator', 'text generator', 'stylish text'],
    openGraph: {
      title: `${title} | Stylish Text Generator`,
      description,
      url: pageUrl,
      siteName: 'Stylish Text Generator',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Stylish Text Generator`,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export function generateJsonLd({
  title,
  description,
  slug,
  faqs = [],
}: {
  title: string;
  description: string;
  slug: string;
  faqs?: Array<{ question: string; answer: string }>;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
  const pageUrl = `${siteUrl}${slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: title,
    description: description,
    url: pageUrl,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    provider: {
      '@type': 'Organization',
      name: 'Stylish Text Generator',
      url: siteUrl,
    },
  };

  const faqJsonLd = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  return [
    {
      __html: JSON.stringify(jsonLd, null, 2),
    },
    ...(faqJsonLd ? [{
      __html: JSON.stringify(faqJsonLd, null, 2),
    }] : []),
  ];
}

export function generateBreadcrumbJsonLd(title: string, slug: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: title,
        item: `${siteUrl}${slug}`,
      },
    ],
  };
}
