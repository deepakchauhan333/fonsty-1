// app/sitemap.ts
import { PLATFORMS, FONT_TYPES, PLATFORM_NAMES } from '@/lib/constants';
import { THOUSAND_FONTS } from '@/lib/thousand-fonts';

// Define the sitemap configuration type
type Sitemap = Array<{
  url: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}>;

// Format font type for URL display
const formatFontType = (fontType: string): string => {
  return fontType
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

export default async function sitemap(): Promise<Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
  const now = new Date().toISOString();
  
  // Static routes
  const routes: Sitemap = ['', '/about', '/privacy', '/terms', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Generate dynamic routes for all platform/font combinations
  const dynamicRoutes: Sitemap = [];
  
  for (const platform of PLATFORMS) {
    const platformPath = platform.toLowerCase();
    const platformName = PLATFORM_NAMES[platform] || platform;
    
    // Add platform page
    dynamicRoutes.push({
      url: `${baseUrl}/${platformPath}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    });
    
    // Add font generator pages for each platform
    for (const fontType of FONT_TYPES) {
      const formattedFontType = formatFontType(fontType);
      dynamicRoutes.push({
        url: `${baseUrl}/${platformPath}/${formattedFontType}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      });
    }
  }

  // Add 1000+ font pages
  const fontRoutes: Sitemap = THOUSAND_FONTS.map((fontSlug) => ({
    url: `${baseUrl}/font/${fontSlug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // Sort routes by priority (highest first) then by URL
  return [...routes, ...dynamicRoutes, ...fontRoutes].sort((a, b) => {
    if (a.priority !== b.priority) {
      return b.priority - a.priority; // Higher priority first
    }
    return a.url.localeCompare(b.url); // Then sort alphabetically by URL
  });
}