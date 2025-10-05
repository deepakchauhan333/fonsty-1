import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us - Font Generator Support',
  description: 'Get in touch with Font Generator team. We\'re here to help with questions about our free Unicode font tool for social media.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fontforsocial.com'}/contact`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Contact Font Generator',
    description: 'Get support for our free Unicode font generator tool.',
    type: 'website',
  },
};

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Font Generator',
    description: 'Contact page for Font Generator support and inquiries',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fontforsocial.com'}/contact`,
    datePublished: '2025-09-04T00:00:00Z',
    dateModified: new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: 'Deepak Chauhan',
      url: 'https://www.linkedin.com/in/deepakchauhan333/',
      email: 'dc556316@gmail.com',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Have questions about our font generator? Need help using our tool? Want to report a bug or suggest a feature? 
              We'd love to hear from you!
            </p>
          </section>

          <section className="mb-8 bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">How Can We Help?</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">📧 Email Support</h3>
                <p className="text-gray-700">
                  For general inquiries, support, or feedback, please email us at:
                </p>
                <p className="text-blue-600 font-medium mt-2">
                  dc556316@gmail.com
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">🐛 Bug Reports</h3>
                <p className="text-gray-700">
                  Found a bug? Help us improve by reporting it to:
                </p>
                <p className="text-blue-600 font-medium mt-2">
                  dc556316@gmail.com
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">💡 Feature Requests</h3>
                <p className="text-gray-700">
                  Have an idea for a new feature or font style? Let us know:
                </p>
                <p className="text-blue-600 font-medium mt-2">
                  dc556316@gmail.com
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Before reaching out, you might find your answer in our <Link href="/about" className="text-blue-600 hover:underline">About page</Link> or 
              check out our most common questions:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Is the service free?</strong> Yes, 100% free forever with no registration required.</li>
              <li><strong>Do you store my text?</strong> No, all processing happens in your browser. We never see or store your text.</li>
              <li><strong>Why doesn't a font work on a platform?</strong> Some platforms may not support all Unicode characters.</li>
              <li><strong>Can I use these fonts commercially?</strong> Yes, the Unicode characters are free to use anywhere.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Response Time</h2>
            <p className="text-gray-700 leading-relaxed">
              We typically respond to all inquiries within 24-48 hours during business days. For urgent issues, 
              please mark your email subject with [URGENT].
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Connect With Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Stay updated with the latest features and font styles:
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/" 
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Font Generator
              </Link>
              <Link 
                href="/about" 
                className="inline-block px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </section>

          <section className="mb-8 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Business Inquiries</h2>
            <p className="text-gray-700 leading-relaxed">
              For partnership opportunities, advertising, or business-related questions, please contact:
            </p>
            <p className="text-blue-600 font-medium mt-2">
              dc556316@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Legal & Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For questions about our policies:
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
