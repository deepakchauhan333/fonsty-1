// lib/unicode-data.ts
import { STYLED_LETTERS_MAP } from './styled-letters-map';
import { ORNAMENTAL_SYMBOLS } from './ornamental-symbols';

export interface FontStyle {
  name: string;
  converter: (text: string) => string;
  baseStyle?: string;
  decorator?: string;
}

export interface FontCategory {
  slug: string;
  title: string;
  styles: FontStyle[];
  count?: number;
}

// Helper function to create a converter from the style map
const createConverter = (styleName: string, decorator?: string) => {
  const styleMap = STYLED_LETTERS_MAP[styleName];
  
  return (text: string) => {
    // Apply base style if it exists
    let result = styleMap 
      ? [...text].map(char => styleMap[char] || char).join('')
      : text;
    
    // Apply decorator if it exists
    if (decorator) {
      const [prefix, suffix] = decorator.split('|');
      result = `${prefix || ''}${result}${suffix || ''}`;
    }
    
    return result;
  };
};

// Generate base styles from the map
const baseStyles: FontStyle[] = Object.entries(STYLED_LETTERS_MAP).map(([name, _]) => ({
  name: name.charAt(0).toUpperCase() + name.slice(1),
  converter: createConverter(name),
  baseStyle: name,
}));

// Generate decorative styles with random ornaments
const generateDecorativeStyles = (count: number = 2000): FontStyle[] => {
  const styles: FontStyle[] = [];
  const baseStyleNames = Object.keys(STYLED_LETTERS_MAP);
  
  // Generate a large number of combinations
  for (let i = 0; i < count; i++) {
    const baseStyle = baseStyleNames[Math.floor(Math.random() * baseStyleNames.length)];
    const prefix = ORNAMENTAL_SYMBOLS[Math.floor(Math.random() * ORNAMENTAL_SYMBOLS.length)];
    const suffix = ORNAMENTAL_SYMBOLS[Math.floor(Math.random() * ORNAMENTAL_SYMBOLS.length)];
    
    // Only add if it's a unique combination
    const styleName = `${baseStyle} Style #${i + 1}`;
    const decorator = `${prefix}|${suffix}`;
    
    styles.push({
      name: styleName,
      converter: createConverter(baseStyle, decorator),
      baseStyle,
      decorator,
    });
  }
  
  return styles;
};

// Generate all styles
const decorativeStyles = generateDecorativeStyles(2000);
const allStyles = [...baseStyles, ...decorativeStyles];

export const allFontStyles = [...allStyles];

// Categorize the styles
export const unicodeData: FontCategory[] = [
  {
    slug: 'trending',
    title: '🔥 Trending',
    styles: allStyles.slice(0, 50),
    count: 50
  },
  {
    slug: 'decorative',
    title: '✨ Decorative',
    styles: decorativeStyles.slice(0, 500),
    count: 500
  },
  {
    slug: 'bold',
    title: '🔊 Bold',
    styles: allStyles.filter(s => s.name.toLowerCase().includes('bold')),
    count: allStyles.filter(s => s.name.toLowerCase().includes('bold')).length
  },
  {
    slug: 'cursive',
    title: '✍️ Cursive',
    styles: allStyles.filter(s => s.name.toLowerCase().includes('cursive') || s.name.toLowerCase().includes('script')),
    count: allStyles.filter(s => s.name.toLowerCase().includes('cursive') || s.name.toLowerCase().includes('script')).length
  },
  {
    slug: 'fancy',
    title: '🎀 Fancy',
    styles: allStyles.filter(s => s.name.toLowerCase().includes('fancy') || s.name.toLowerCase().includes('ornament')),
    count: allStyles.filter(s => s.name.toLowerCase().includes('fancy') || s.name.toLowerCase().includes('ornament')).length
  },
  {
    slug: 'all',
    title: '🌟 All Fonts',
    styles: allStyles,
    count: allStyles.length
  }
];

// Function to generate a random font style
export function getRandomFontStyle(): FontStyle {
  return allFontStyles[Math.floor(Math.random() * allFontStyles.length)];
}

// Cache for generated variations to improve performance
const variationCache = new Map<string, Array<{ id: number; name: string; text: string }>>();

// Function to generate multiple font variations
// Function to get random decorative symbols (2-3 on each side)
const getRandomDecorators = (): [string, string] => {
  const leftCount = 2 + Math.floor(Math.random() * 2); // 2-3 symbols
  const rightCount = 2 + Math.floor(Math.random() * 2); // 2-3 symbols
  
  const getRandomSymbols = (count: number): string => {
    let result = '';
    for (let i = 0; i < count; i++) {
      result += ORNAMENTAL_SYMBOLS[Math.floor(Math.random() * ORNAMENTAL_SYMBOLS.length)];
    }
    return result;
  };
  
  return [getRandomSymbols(leftCount), getRandomSymbols(rightCount)];
};

export function generateFontVariations(text: string, count: number = 500): Array<{ id: number; name: string; text: string }> {
  const cacheKey = `${text}-${count}`;
  
  // Return cached result if available
  if (variationCache.has(cacheKey)) {
    return [...variationCache.get(cacheKey)!];
  }
  
  const variations: Array<{ id: number; name: string; text: string }> = [];
  const usedTexts = new Set<string>();
  let idCounter = 1;
  
  // Helper to add a variation if it's unique
  const addVariation = (style: FontStyle, variantName?: string, forceAdd: boolean = false) => {
    const name = variantName || style.name;
    let decoratedText = style.converter(text);
    
    // Add decorative symbols to the text
    const [leftDecor, rightDecor] = getRandomDecorators();
    decoratedText = `${leftDecor} ${decoratedText} ${rightDecor}`;
    
    const variation = {
      id: idCounter++,
      name: name,
      text: decoratedText
    };
    
    // Only add if we haven't seen this exact text before
    if (forceAdd || !usedTexts.has(variation.text)) {
      variations.push(variation);
      usedTexts.add(variation.text);
      return true;
    }
    return false;
  };
  
  // 1. First, include all base styles with decorations
  for (const style of baseStyles) {
    if (variations.length >= count) break;
    addVariation(style);
  }
  
  // 2. Include decorative styles with variations
  const decorativeCount = Math.min(Math.floor(count * 0.6), decorativeStyles.length);
  const usedStyles = new Set<string>();
  
  // First pass: Add unique styles
  for (let i = 0; i < decorativeCount && variations.length < count; i++) {
    const style = decorativeStyles[i];
    if (!usedStyles.has(style.name)) {
      addVariation(style);
      usedStyles.add(style.name);
    }
  }
  
  // Second pass: Add variations of existing styles with different decorations
  for (let i = 0; i < decorativeCount && variations.length < count; i++) {
    const style = decorativeStyles[i];
    // Add 1-3 variations of each style with different decorations
    for (let v = 0; v < 3 && variations.length < count; v++) {
      addVariation(style, `${style.name} ✧${v + 1}`, true);
    }
  }
  
  // 3. Generate additional variations by combining styles
  const remaining = count - variations.length;
  if (remaining > 0) {
    const usedCombinations = new Set<string>();
    
    for (let i = 0; i < Math.min(200, remaining * 3) && variations.length < count; i++) {
      // Pick two different styles to combine
      let style1, style2;
      do {
        style1 = allFontStyles[Math.floor(Math.random() * allFontStyles.length)];
        style2 = allFontStyles[Math.floor(Math.random() * allFontStyles.length)];
      } while (style1.name === style2.name);
      
      const comboKey = `${style1.name}-${style2.name}`;
      if (usedCombinations.has(comboKey)) continue;
      usedCombinations.add(comboKey);
      
      const combinedStyle = {
        name: `[${style1.name} + ${style2.name}]`,
        converter: (t: string) => {
          // Alternate between styles for each character
          let result = '';
          for (let i = 0; i < t.length; i++) {
            const converter = i % 2 === 0 ? style1.converter : style2.converter;
            result += converter(t[i]);
          }
          return result;
        }
      };
      
      addVariation(combinedStyle, undefined, true);
    }
  }
  
  // 4. If we still need more, generate completely random styles with decorations
  while (variations.length < count) {
    const randomStyle = getRandomFontStyle();
    addVariation(randomStyle, `✨ ${randomStyle.name} ✨`, true);
  }
  
  // Ensure we have exactly the requested number of variations
  const result = variations.slice(0, count);
  
  // Cache the result
  variationCache.set(cacheKey, result);
  
  return result;
}

// Function to search for fonts by name or style
export function searchFonts(query: string, limit: number = 50): FontStyle[] {
  const lowerQuery = query.toLowerCase();
  return allFontStyles
    .filter(style => 
      style.name.toLowerCase().includes(lowerQuery) ||
      (style.baseStyle && style.baseStyle.toLowerCase().includes(lowerQuery))
    )
    .slice(0, limit);
}

