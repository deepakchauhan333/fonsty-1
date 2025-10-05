import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Font Generator',
  description: 'Read our privacy policy to understand how we handle your data when using our font generator tool. We prioritize your privacy and security.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fontforsocial.com'}/privacy`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Privacy Policy - Font Generator',
    description: 'Learn how we protect your privacy and data.',
    type: 'website',
  },
};

export default function PrivacyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy',
    description: 'Privacy policy for Font Generator',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fontforsocial.com'}/privacy`,
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
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      
      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="text-sm text-gray-500 mb-6">Last Updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
          <p className="leading-relaxed">
            At Font Generator, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
            and protect your information when you use our website and services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Information You Provide</h3>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li><strong>Text Input:</strong> The text you enter into our font generator is processed locally in your browser and is not stored on our servers.</li>
            <li><strong>No Personal Data:</strong> We do not require registration or collect personal information like names, emails, or phone numbers.</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-700 mb-3">Automatically Collected Information</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Usage Data:</strong> We may collect anonymous usage statistics like page views, browser type, and device information to improve our service.</li>
            <li><strong>Cookies:</strong> We use minimal cookies for essential website functionality and analytics.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>To provide and maintain our font generation service</li>
            <li>To improve and optimize our website performance</li>
            <li>To analyze usage patterns and trends</li>
            <li>To detect and prevent technical issues</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Storage and Security</h2>
          <p className="leading-relaxed mb-4">
            <strong>Local Processing:</strong> All text conversion happens in your browser. Your input text is never sent to our servers.
          </p>
          <p className="leading-relaxed mb-4">
            <strong>No Data Storage:</strong> We do not store, log, or save the text you generate using our tool.
          </p>
          <p className="leading-relaxed">
            <strong>Security:</strong> We implement industry-standard security measures to protect our website and services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Third-Party Services</h2>
          <p className="leading-relaxed mb-4">
            We may use third-party services for:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Analytics:</strong> To understand how visitors use our website (Google Analytics or similar)</li>
            <li><strong>Hosting:</strong> Our website is hosted on secure cloud infrastructure</li>
            <li><strong>CDN:</strong> Content delivery networks to improve loading speeds</li>
          </ul>
          <p className="leading-relaxed mt-4">
            These third parties have their own privacy policies and we encourage you to review them.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cookies</h2>
          <p className="leading-relaxed mb-4">
            We use cookies to:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Remember your preferences</li>
            <li>Understand how you use our website</li>
            <li>Improve your experience</li>
          </ul>
          <p className="leading-relaxed mt-4">
            You can control cookies through your browser settings. Disabling cookies may affect some functionality.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Children's Privacy</h2>
          <p className="leading-relaxed">
            Our service is available to users of all ages. We do not knowingly collect personal information from children 
            under 13. Since we don't collect personal data, our service is safe for all users.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Rights</h2>
          <p className="leading-relaxed mb-4">
            Since we don't collect or store personal data, there is no personal information to access, modify, or delete. 
            Your text input is processed locally and never leaves your device.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes to This Policy</h2>
          <p className="leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify users of any significant changes by 
            updating the "Last Updated" date at the top of this page.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
          <p className="leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us through our website.
          </p>
        </section>
      </div>
      </div>
    </>
  );
}
