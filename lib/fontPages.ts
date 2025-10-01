// Platform and category mapping
export const platforms = ['instagram', 'tiktok', 'facebook', 'twitter', 'youtube'] as const;
export type Platform = typeof platforms[number];

export const categories = [
  'bubble', 'cursive', 'bold', 'fancy', 'small', 
  'glitch', 'gothic', 'cute', 'vaporwave', 'neon'
] as const;
export type Category = typeof categories[number];

// Font style data structure
export interface FontPageData {
  title: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  relatedFonts: string[];
  lastModified?: string;
}

// Generate font page data for all combinations
export function generateFontPagesData(): Record<string, FontPageData> {
  const result: Record<string, FontPageData> = {};
  
  for (const platform of platforms) {
    for (const category of categories) {
      const title = `${category.charAt(0).toUpperCase() + category.slice(1)} Font Generator for ${platform.charAt(0).toUpperCase() + platform.slice(1)}`;
      const slug = `/${platform}/${category}-font-generator`;
      const primaryKeyword = `${category} font ${platform}`;
      
      result[slug] = {
        title,
        description: `Create ${category} text for your ${platform} bio, comments, and captions with our free ${category} font generator. No login required!`,
        primaryKeyword,
        secondaryKeywords: [
          `${category} text generator`,
          `${platform} font`,
          `${category} letters`,
          `fancy text for ${platform}`,
          `${platform} bio font`
        ],
        faqs: [
          {
            question: `How do I use the ${category} font on ${platform}?`,
            answer: `Simply type your text, copy the ${category} output, and paste it directly into your ${platform} bio, comments, or captions.`
          },
          {
            question: `Is this ${category} text generator free to use?`,
            answer: `Yes, our ${category} font generator is completely free to use with no sign-up required.`
          },
          {
            question: `Will the ${category} font work on ${platform}?`,
            answer: `Yes, the ${category} font uses Unicode characters that are supported across all major platforms including ${platform}.`
          }
        ],
        relatedFonts: categories
          .filter(c => c !== category)
          .map(c => `/${platform}/${c}-font-generator`)
      };
    }
  }
  
  return result;
}

// Generate and cache the font pages data
let cachedFontPagesData: Record<string, FontPageData> | null = null;

function getFontPagesData(): Record<string, FontPageData> {
  if (!cachedFontPagesData) {
    cachedFontPagesData = generateFontPagesData();
  }
  return cachedFontPagesData;
}

// Get all font page slugs
export function getAllFontPageSlugs(): string[] {
  return Object.keys(getFontPagesData());
}

// Get font page data by slug
export function getFontPageData(slug: string): FontPageData | null {
  return getFontPagesData()[slug] || null;
}
