// lib/google-fonts-map.ts
import { THOUSAND_FONTS } from './thousand-fonts';

export interface FontMapping {
  fontName: string; // Google Font name
  fontUrl: string; // Google Font CSS URL
}

// --- Keyword-based Font Matching ---
const keywordMap: { [key: string]: FontMapping } = {
  'cursive': { fontName: 'Dancing Script', fontUrl: 'https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap' },
  'italic': { fontName: 'Lora', fontUrl: 'https://fonts.googleapis.com/css2?family=Lora:ital@1&display=swap' },
  'bold': { fontName: 'Roboto', fontUrl: 'https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap' },
  'sans': { fontName: 'Open Sans', fontUrl: 'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap' },
  'serif': { fontName: 'Merriweather', fontUrl: 'https://fonts.googleapis.com/css2?family=Merriweather&display=swap' },
  'monospace': { fontName: 'Fira Code', fontUrl: 'https://fonts.googleapis.com/css2?family=Fira+Code&display=swap' },
  'typewriter': { fontName: 'Special Elite', fontUrl: 'https://fonts.googleapis.com/css2?family=Special+Elite&display=swap' },
  'gothic': { fontName: 'UnifrakturMaguntia', fontUrl: 'https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&display=swap' },
  'old-english': { fontName: 'UnifrakturMaguntia', fontUrl: 'https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&display=swap' },
  'blackletter': { fontName: 'UnifrakturCook', fontUrl: 'https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&display=swap' },
  'handwriting': { fontName: 'Kalam', fontUrl: 'https://fonts.googleapis.com/css2?family=Kalam&display=swap' },
  'script': { fontName: 'Parisienne', fontUrl: 'https://fonts.googleapis.com/css2?family=Parisienne&display=swap' },
  'pixel': { fontName: 'Press Start 2P', fontUrl: 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap' },
  'y2k': { fontName: 'Press Start 2P', fontUrl: 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap' },
  'horror': { fontName: 'Creepster', fontUrl: 'https://fonts.googleapis.com/css2?family=Creepster&display=swap' },
  'grunge': { fontName: 'Rubik Glitch', fontUrl: 'https://fonts.googleapis.com/css2?family=Rubik+Glitch&display=swap' },
  'glitch': { fontName: 'Rubik Glitch', fontUrl: 'https://fonts.googleapis.com/css2?family=Rubik+Glitch&display=swap' },
  'alien': { fontName: 'Share Tech Mono', fontUrl: 'https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap' },
  'sci-fi': { fontName: 'Orbitron', fontUrl: 'https://fonts.googleapis.com/css2?family=Orbitron&display=swap' },
  'western': { fontName: 'Rye', fontUrl: 'https://fonts.googleapis.com/css2?family=Rye&display=swap' },
  'medieval': { fontName: 'Uncial Antiqua', fontUrl: 'https://fonts.googleapis.com/css2?family=Uncial+Antiqua&display=swap' },
  'doubleline': { fontName: 'Text Me One', fontUrl: 'https://fonts.googleapis.com/css2?family=Text+Me+One&display=swap' },
};

// --- Filler Fonts for Slugs without Keywords ---
const fillerFonts: FontMapping[] = [
  { fontName: 'Lobster', fontUrl: 'https://fonts.googleapis.com/css2?family=Lobster&display=swap' },
  { fontName: 'Pacifico', fontUrl: 'https://fonts.googleapis.com/css2?family=Pacifico&display=swap' },
  { fontName: 'Anton', fontUrl: 'https://fonts.googleapis.com/css2?family=Anton&display=swap' },
  { fontName: 'Bangers', fontUrl: 'https://fonts.googleapis.com/css2?family=Bangers&display=swap' },
  { fontName: 'Oswald', fontUrl: 'https://fonts.googleapis.com/css2?family=Oswald&display=swap' },
  { fontName: 'Caveat', fontUrl: 'https://fonts.googleapis.com/css2?family=Caveat&display=swap' },
  { fontName: 'Permanent Marker', fontUrl: 'https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap' },
  { fontName: 'Cinzel', fontUrl: 'https://fonts.googleapis.com/css2?family=Cinzel&display=swap' },
  { fontName: 'Amatic SC', fontUrl: 'https://fonts.googleapis.com/css2?family=Amatic+SC&display=swap' },
  { fontName: 'Sacramento', fontUrl: 'https://fonts.googleapis.com/css2?family=Sacramento&display=swap' },
  // Add more unique fonts here to increase variety
];

const generatedMap: Record<string, FontMapping> = {};
let fillerIndex = 0;

// --- Generate the Map for all 1000+ Fonts ---
THOUSAND_FONTS.forEach(slug => {
  // First, check for an exact match in the keyword map
  if (keywordMap[slug]) {
    generatedMap[slug] = keywordMap[slug];
    return;
  }

  // Second, check for partial matches in the slug string
  for (const keyword in keywordMap) {
    if (slug.includes(keyword)) {
      generatedMap[slug] = keywordMap[keyword];
      return;
    }
  }

  // If no keyword matches, assign a filler font
  generatedMap[slug] = fillerFonts[fillerIndex % fillerFonts.length];
  fillerIndex++;
});

export const googleFontsMap: Record<string, FontMapping> = generatedMap;

/**
 * Gets the Google Font mapping for a given slug.
 * @param slug The font slug from the URL.
 * @returns The FontMapping object.
 */
export function getFontMapping(slug: string): FontMapping {
  // The map is now comprehensive, so no fallback is needed.
  return googleFontsMap[slug];
}
