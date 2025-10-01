// lib/urls.ts
import { PLATFORMS, CATEGORY_SLUGS, type Platform, type CategorySlug } from './platforms';

export function generateAllUrls(): string[] {
  return PLATFORMS.flatMap((platform) => CATEGORY_SLUGS.map((category) => `/${platform}/${category}`));
}

export function generateStaticRouteParams(): { platform: Platform; category: CategorySlug }[] {
  return PLATFORMS.flatMap((platform) => CATEGORY_SLUGS.map((category) => ({ platform, category })));
}

export function generateCategoryOnlyUrls(): string[] {
  return CATEGORY_SLUGS.map((category) => `/${category}`);
}

export const ALL_PLATFORM_CATEGORY_URLS = generateAllUrls();
export const ALL_CATEGORY_ONLY_URLS = generateCategoryOnlyUrls();
