import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-purple-900 via-pink-800 to-red-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-3">Font Generator</h3>
            <p className="text-purple-100 text-sm mb-4">
              Create beautiful Unicode fonts for social media, websites, and more. 
              100% free with 1000+ font styles available instantly.
            </p>
            <p className="text-purple-200 text-xs">
              © {currentYear} Font Generator. All rights reserved.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-purple-100 hover:text-yellow-200 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-purple-100 hover:text-yellow-200 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/font" className="text-purple-100 hover:text-yellow-200 transition-colors">
                  All Fonts
                </Link>
              </li>
              <li>
                <Link href="/facebook" className="text-purple-100 hover:text-yellow-200 transition-colors">
                  Facebook Fonts
                </Link>
              </li>
              <li>
                <Link href="/instagram" className="text-purple-100 hover:text-yellow-200 transition-colors">
                  Instagram Fonts
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal & Support */}
          <div>
            <h4 className="font-semibold mb-3">Legal & Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-purple-100 hover:text-yellow-200 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-purple-100 hover:text-yellow-200 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-purple-100 hover:text-yellow-200 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-purple-700 pt-6 text-center text-sm text-purple-100">
          <p>Made with ❤️ for All Social Users | No registration required | 100% Free Forever</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
