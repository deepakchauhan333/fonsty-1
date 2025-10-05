import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About - Free Unicode FONTFORSOCIAL.COM Tool',
  description: 'Learn about our free FONTFORSOCIAL.COM with 1000+ Unicode fonts for Instagram, Facebook, TikTok & more. Trusted by millions of creators worldwide since 2024.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fontforsocial.com'}/about`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'About - FONTFORSOCIAL.COM',
    description: 'Free FONTFORSOCIAL.COM with 1000+ Unicode fonts for social media. Trusted by millions.',
    type: 'website',
  },
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About FONTFORSOCIAL.COM',
    description: 'Learn about FONTFORSOCIAL.COM - a free Unicode font tool for social media',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fontforsocial.com'}/about`,
    datePublished: '2025-09-04T00:00:00Z',
    dateModified: new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: 'Deepak Chauhan',
      url: 'https://www.linkedin.com/in/deepakchauhan333/',
      email: 'dc556316@gmail.com',
    },
    mainEntity: {
      '@type': 'Organization',
      name: 'FONTFORSOCIAL.COM',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fontforsocial.com',
      description: 'Free online FONTFORSOCIAL.COM with 1000+ Unicode fonts for social media',
      foundingDate: '2025',
      founder: {
        '@type': 'Person',
        name: 'Deepak Chauhan',
        url: 'https://www.linkedin.com/in/deepakchauhan333/',
      },
      knowsAbout: ['Unicode fonts', 'Text styling', 'Social media tools', 'Typography', 'Font conversion'],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">About FONTFORSOCIAL.COM</h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">What We Do</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            FONTFORSOCIAL.COM is a free online tool that allows you to create beautiful, stylish text using Unicode characters. 
            Our platform offers over 1000+ unique font styles that you can use across all social media platforms, websites, 
            and messaging apps.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Whether you're looking to make your Instagram bio stand out, create eye-catching Facebook posts, or add style 
            to your TikTok captions, our FONTFORSOCIAL.COM has you covered with a wide variety of fancy, cursive, bold, and 
            decorative text styles.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our FONTFORSOCIAL.COM uses Unicode characters to transform your regular text into stylish fonts. These aren't 
            traditional fonts - they're special Unicode characters that look like different font styles but work everywhere 
            that supports Unicode text (which is almost everywhere!).
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Type or paste your text into the input box</li>
            <li>Browse through 1000+ font styles instantly generated</li>
            <li>Click on any font to copy it to your clipboard</li>
            <li>Paste it anywhere - social media, messages, websites, etc.</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us?</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>100% Free:</strong> No registration, no hidden fees, completely free to use</li>
            <li><strong>1000+ Fonts:</strong> Largest collection of Unicode font styles</li>
            <li><strong>Instant Results:</strong> See all font variations in real-time</li>
            <li><strong>Works Everywhere:</strong> Compatible with all platforms and devices</li>
            <li><strong>No Downloads:</strong> Works directly in your browser</li>
            <li><strong>Mobile Friendly:</strong> Fully responsive design for all devices</li>
            <li><strong>Privacy Focused:</strong> We don't store or track your text</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Supported Platforms</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our fonts work on all major social media platforms and messaging apps:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {['Facebook', 'Instagram', 'TikTok', 'Twitter/X', 'YouTube', 'WhatsApp', 
              'Telegram', 'Discord', 'Reddit', 'Pinterest', 'LinkedIn', 'Snapchat'].map((platform) => (
              <div key={platform} className="bg-gray-100 px-4 py-2 rounded-lg text-center">
                {platform}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            Have questions, suggestions, or feedback? We'd love to hear from you! 
            Feel free to reach out through our social media channels or visit our <Link href="/" className="text-blue-600 hover:underline">homepage</Link> to start creating beautiful fonts.
          </p>
        </section>
      </div>
      </div>
    </>
  );
}
