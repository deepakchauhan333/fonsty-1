import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-3">Font Generator</h3>
            <p className="text-gray-400 text-sm mb-4">
              Create beautiful Unicode fonts for social media, websites, and more. 
              100% free with 1000+ font styles available instantly.
            </p>
            <p className="text-gray-400 text-xs">
              © {currentYear} Font Generator. All rights reserved.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/facebook" className="text-gray-400 hover:text-white transition-colors">
                  Facebook Fonts
                </Link>
              </li>
              <li>
                <Link href="/instagram" className="text-gray-400 hover:text-white transition-colors">
                  Instagram Fonts
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          <p>Made with ❤️ for creators worldwide | No registration required | 100% Free Forever</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
