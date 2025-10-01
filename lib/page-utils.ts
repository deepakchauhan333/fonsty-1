import { getPageMetadata, getFontsByCategory } from './font-utils';

// Define FontPreview interface to match the one in font-utils.ts
interface FontPreview {
  id: number;
  name: string;
  text: string;
}

/**
 * Generates metadata for a font page
 */
export function generateFontPageMetadata(platform: string, category: string) {
  return getPageMetadata(platform, category);
}

/**
 * Gets the list of all available font categories
 */
export function getAllFontCategories() {
  return [
    'fancy', 'cursive', 'bubble', 'bold', 'italic', 
    'strikethrough', 'underline', 'gaming', 'neon', 'gothic',
    'graffiti', 'small-caps', 'double-struck', 'upside-down',
    'zalgo', 'squared', 'circled', 'fancy-symbols', 'emoji',
    'math', 'currency', 'arrow'
  ];
}

/**
 * Gets the list of all supported social media platforms
 */
export function getAllSocialMediaPlatforms() {
  return [
    'facebook', 'twitter', 'instagram', 'tiktok', 'youtube',
    'pinterest', 'linkedin', 'reddit', 'discord', 'twitch',
    'telegram', 'whatsapp', 'snapchat', 'tumblr', 'quora',
    'medium', 'vimeo', 'wechat', 'line', 'threads'
  ];
}

/**
 * Generates all possible page paths for sitemap
 */
export function getAllPagePaths() {
  const platforms = getAllSocialMediaPlatforms();
  const categories = getAllFontCategories();
  
  return platforms.flatMap(platform => 
    categories.map(category => ({
      params: { platform, category }
    }))
  );
}

/**
 * Gets the font preview component props for a page
 */
export function getFontPreviewProps(platform: string, category: string) {
  return {
    platform: platform.charAt(0).toUpperCase() + platform.slice(1),
    category: category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' '),
    initialFonts: getFontsByCategory(category, 1000)
  };
}
