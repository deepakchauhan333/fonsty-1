const { writeFileSync, mkdirSync, existsSync } = require('fs');
const path = require('path');
const { fontCategories, socialMediaPlatforms } = require('../lib/font-categories');

// Type definitions
interface SocialMediaPlatform {
  id: string;
  name: string;
  icon: string;
}

interface FontCategory {
  name: string;
  description: string;
  styles: string[];
}

interface FontCategories {
  [key: string]: FontCategory;
}

const pagesDir = path.join(process.cwd(), 'app');

// Template for the page component
const pageTemplate = (platform: string, category: string): string => `
import FontGenerator from '@/components/FontGenerator';
import { getFontsByCategory } from '@/lib/font-utils';

export default function ${platform.charAt(0).toUpperCase() + platform.slice(1)}${category.charAt(0).toUpperCase() + category.slice(1)}() {
  const fonts = getFontsByCategory('${category}');
  
  return (
    <FontGenerator 
      initialFonts={fonts}
      category="${category}"
      platform="${platform}"
    />
  );
}
`;

// Generate all page files
const generatePages = (): void => {
  socialMediaPlatforms.forEach((platform: SocialMediaPlatform) => {
    Object.keys(fontCategories).forEach(category => {
      const dir = path.join(pagesDir, platform.id, category);
      const filePath = path.join(dir, 'page.tsx');
      
      // Create directory if it doesn't exist
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }
      
      // Write the page file
      writeFileSync(filePath, pageTemplate(platform.id, category));
      console.log(`Generated: ${filePath}`);
    });
  });
};

generatePages();
console.log('All pages generated successfully!');
