/**
 * Get font type from URL parameter
 */
export function getFontTypeFromParam(param: string, fontTypes: readonly string[]): string | undefined {
  const formatParam = (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };
  
  const formattedParam = formatParam(param);
  return fontTypes.find(ft => formatParam(ft) === formattedParam);
}

// Define FontPreview interface
interface FontPreview {
  id: number;
  name: string;
  text: string;
}

// Extended font style mappings with more variations for each category
const fontStyleMappings: Record<string, string[]> = {
  // Text Styles
  'italic': ['italic', 'oblique', 'slanted', 'cursive', 'script', 'handwritten', 'calligraphy', 'elegant', 'fancy'],
  'strikethrough': ['strikethrough', 'crossed', 'strike', 'line-through', 'canceled', 'deleted', 'removed'],
  'underline': ['underline', 'underlined', 'underscore', 'underbar', 'lowline'],
  'small-caps': ['smallcaps', 'small-caps', 'uppercase', 'titlecase', 'capital', 'caps'],
  'reverse': ['reverse', 'backwards', 'mirror', 'flipped', 'inverted', 'reflected'],
  'zalgo': ['zalgo', 'corrupt', 'cursed', 'glitchy', 'chaos', 'crawling', 'distorted'],
  'mirror': ['mirror', 'reflected', 'flipped', 'reverse', 'backwards', 'inverted'],
  'upside-down': ['upside-down', 'inverted', 'flipped', 'rotated', 'turned', 'reversed'],
  'emoji': ['emoji', 'emoticon', 'smiley', 'face', 'reaction', 'sticker', 'kaomoji', 'emoticon'],
  'unicode': ['unicode', 'special', 'symbol', 'character', 'glyph', 'sign', 'dingbat'],
  'symbol': ['symbol', 'icon', 'glyph', 'sign', 'dingbat', 'pictogram', 'ideogram'],
  
  // Theme Styles
  'tattoo': ['tattoo', 'ink', 'tribal', 'design', 'art', 'bodyart', 'tribal', 'maori', 'polynesian'],
  'gaming': ['gaming', 'arcade', 'pixel', '8bit', 'retro', 'pixelated', 'game', 'videogame'],
  'retro': ['retro', 'vintage', '80s', '90s', 'classic', 'nostalgic', 'throwback', 'oldschool'],
  'vintage': ['vintage', 'classic', 'retro', 'antique', 'oldstyle', 'vintage', 'retro', 'classic'],
  'neon': ['neon', 'glow', 'bright', 'light', 'colorful', 'luminous', 'vibrant', 'fluorescent'],
  'glitch': ['glitch', 'error', 'digital', 'corrupt', 'noise', 'static', 'distortion', 'artifact'],
  
  // Additional categories with more variations
  'gothic': ['gothic', 'blackletter', 'medieval', 'calligraphy', 'dark', 'vampire', 'horror'],
  'graffiti': ['graffiti', 'street', 'urban', 'tag', 'wildstyle', 'mural', 'spray'],
  'math': ['math', 'formula', 'equation', 'symbol', 'number', 'algebra', 'calculus'],
  'currency': ['currency', 'money', 'cash', 'dollar', 'euro', 'pound', 'yen', 'bitcoin', 'crypto']
};

// Map category slugs to their display names
const CATEGORY_NAMES: Record<string, string> = {
  'italic': 'Italic Font Generator',
  'strikethrough': 'Strikethrough Text Generator',
  'underline': 'Underline Text Generator',
  'small-caps': 'Small Caps Text Generator',
  'reverse': 'Reverse Text Generator',
  'zalgo': 'Zalgo Text Generator',
  'mirror': 'Mirror Text Generator',
  'upside-down': 'Upside Down Text Generator',
  'emoji': 'Emoji Text Generator',
  'unicode': 'Unicode Text Generator',
  'symbol': 'Symbol Text Generator',
  'tattoo': 'Tattoo Font Generator',
  'gaming': 'Gaming Font Generator',
  'retro': 'Retro Font Generator',
  'vintage': 'Vintage Font Generator',
  'neon': 'Neon Font Generator',
  'glitch': 'Glitch Text Generator'
};

// Cache for generated fonts to improve performance
export const fontCache = new Map<string, FontPreview[]>();

// Helper function to get demo text based on category
export function getDemoText(category: string): string {
  const demoTexts: Record<string, string> = {
    'fancy': 'Fancy Text',
    'cursive': 'Cursive Text',
    'bubble': 'Bubble Text',
    'bold': 'Bold Text',
    'italic': 'Italic Text',
    'strikethrough': 'Strikethrough',
    'underline': 'Underline',
    'small-caps': 'Small Caps',
    'double-struck': 'Double Struck',
    'reverse': 'Reverse Text',
    'mirror': 'Mirror Text',
    'upside-down': 'Upside Down',
    'zalgo': 'Zalgo Text',
    'emoji': 'Emoji Text 😊',
    'unicode': 'Unicode Text',
    'symbol': 'Symbol Text',
    'gaming': 'Gaming Text',
    'retro': 'Retro Text',
    'vintage': 'Vintage Text',
    'neon': 'Neon Text',
    'glitch': 'Glitch Text',
    'tattoo': 'Tattoo Text',
    'gothic': 'Gothic Text',
    'graffiti': 'Graffiti Text',
    'squared': 'Squared Text',
    'circled': 'Circled Text',
    'math': 'Math Symbols',
    'currency': 'Currency $€¥',
    'handwriting': 'Handwriting',
    'small': 'Small Text',
  };

  return demoTexts[category.toLowerCase()] || 'Demo Text';
}

import { allFontStyles, generateFontVariations } from './unicode-data';

// Generate extensive variations of the base text with unicode and emoji combinations
export function getTextVariations(baseText: string, count: number, category?: string): string[] {
  const variations = new Set<string>();
  
  // Basic transformations
  const basicForms = [
    baseText,
    baseText.toUpperCase(),
    baseText.toLowerCase(),
    baseText.replace(/\w\S*/g, (txt: string) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
  ];
  
  // Add basic forms
  basicForms.forEach(form => variations.add(form));
  
  // Unicode transformations
  const unicodeTransforms = [
    // Double-struck
    (s: string) => s.replace(/[A-Za-z0-9]/g, c => 
      String.fromCodePoint(c.charCodeAt(0) + 0x1D538 - (c >= 'A' && c <= 'Z' ? 65 : (c >= 'a' && c <= 'z' ? 97 : 48)))
    ),
    // Script
    (s: string) => s.replace(/[A-Za-z]/g, c => 
      String.fromCodePoint(c.charCodeAt(0) + 0x1D4D0 - (c >= 'A' && c <= 'Z' ? 65 : 97))
    ),
    // Fraktur
    (s: string) => s.replace(/[A-Za-z]/g, c => 
      String.fromCodePoint(c.charCodeAt(0) + 0x1D504 - (c >= 'A' && c <= 'Z' ? 65 : 97))
    ),
    // Monospace
    (s: string) => s.replace(/[A-Za-z0-9]/g, c => 
      String.fromCodePoint(c.charCodeAt(0) + 0x1D670 - (c >= 'A' && c <= 'Z' ? 65 : (c >= 'a' && c <= 'z' ? 97 : 48)))
    )
  ];
  
  // Apply unicode transforms
  basicForms.forEach(form => {
    unicodeTransforms.forEach(transform => {
      try {
        const transformed = transform(form);
        if (transformed && transformed !== form) {
          variations.add(transformed);
        }
      } catch (e) {
        console.warn('Error applying unicode transform:', e);
      }
    });
  });
  
  // Add emoji decorations
  const emojiCategories = {
    faces: ['😀', '😊', '😎', '🤩', '😍', '🥰', '😇', '🤠', '🤓', '🧐'],
    objects: ['🚀', '🎯', '🎨', '🎮', '🎲', '🧩', '🎭', '🎪', '🎡', '🎢'],
    nature: ['🌞', '🌈', '🌻', '🌺', '🌸', '🌊', '🌪️', '🔥', '❄️', '☃️'],
    symbols: ['✨', '⚡', '💫', '🌟', '⭐', '💥', '💯', '🎯', '🏆', '🏅']
  };
  
  // Add emoji variations
  Object.values(emojiCategories).forEach(emojis => {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    variations.add(`${emoji} ${baseText} ${emoji}`);
    variations.add(`${baseText} ${emoji.repeat(2)}`);
  });
  
  // Add category-specific decorations if category is provided
  if (category) {
    const decorators = {
      gaming: ['🎮', '👾', '🕹️', '🎲', '🎯', '🎪', '🏆', '🥇', '⚔️', '🛡️'],
      retro: ['📼', '📻', '📺', '📠', '💾', '💿', '📀', '🎞️', '📽️', '🎥'],
      vintage: ['📜', '✉️', '📝', '📖', '📚', '📜', '🏛️', '🏰', '🕰️', '⏳'],
      neon: ['✨', '🌟', '💫', '🌈', '⚡', '🔆', '🔅', '🔯', '🔮', '🎆'],
      tattoo: ['⚔️', '🗡️', '🖋️', '✒️', '🖌️', '🎨', '🖤', '💉', '🔯', '☯️'],
      gothic: ['⚰️', '🕯️', '🕸️', '🦇', '🖤', '☠️', '💀', '👻', '🎭', '🏚️']
    };
    
    const categoryDecorators = decorators[category as keyof typeof decorators] || [];
    if (categoryDecorators.length > 0) {
      const decorator = categoryDecorators[Math.floor(Math.random() * categoryDecorators.length)];
      variations.add(`${decorator} ${baseText} ${decorator}`);
      variations.add(`${decorator} ${baseText}`);
      variations.add(`${baseText} ${decorator}`);
    }
  }
  
  // Add more variations if needed
  if (variations.size < count) {
    const wrappers = ['[]', '()', '{}', '<>', '**', '__', '~~', '##', '||', '//'];
    wrappers.forEach(wrap => {
      variations.add(`${wrap[0]}${baseText}${wrap[1] || wrap[0]}`);
    });
    
    // Add reversed and mirrored versions
    variations.add(baseText.split('').reverse().join(''));
    
    // Add alternating case
    let altCase = '';
    for (let i = 0; i < baseText.length; i++) {
      altCase += i % 2 === 0 ? baseText[i].toUpperCase() : baseText[i].toLowerCase();
    }
    variations.add(altCase);
  }
  
  return Array.from(variations).slice(0, count);
}

export const getFontsByCategory = (category: string, count: number = 500): FontPreview[] => {
  const cacheKey = `${category.toLowerCase()}-${count}`;
  
  try {
    // Return cached result if available
    if (fontCache.has(cacheKey)) {
      const cached = fontCache.get(cacheKey)!;
      if (cached.length > 0) {
        return [...cached];
      }
    }
    
    // Clean up the category name
    const cleanCategory = category.toLowerCase()
      .replace(/-font-generator$/, '')
      .replace(/-text-generator$/, '')
      .replace(/-generator$/, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .trim();
    
    // Map of category variations to their canonical form
    const categoryMap: Record<string, string> = {
      // Text Styles
      'italic': 'italic',
      'strike': 'strikethrough',
      'strikethrough': 'strikethrough',
      'underline': 'underline',
      'smallcaps': 'small-caps',
      'small-caps': 'small-caps',
      'reverse': 'reverse',
      'zalgo': 'zalgo',
      'mirror': 'mirror',
      'upside': 'upside-down',
      'upside-down': 'upside-down',
      'emoticon': 'emoji',
      'emoji': 'emoji',
      'unicode': 'unicode',
      'symbol': 'symbol',
      'icon': 'symbol',
      
      // Theme Styles
      'tattoo': 'tattoo',
      'ink': 'tattoo',
      'gaming': 'gaming',
      'arcade': 'gaming',
      'retro': 'retro',
      'vintage': 'vintage',
      'classic': 'vintage',
      'neon': 'neon',
      'glow': 'neon',
      'glitch': 'glitch',
      'error': 'glitch'
    };
    
    // Find the target category from the map
    let targetCategory = categoryMap[cleanCategory] || '';
    
    // If no direct match, try to find a partial match
    if (!targetCategory) {
      for (const [variation, mainCategory] of Object.entries(categoryMap)) {
        if (cleanCategory.includes(variation)) {
          targetCategory = mainCategory;
          break;
        }
      }
    }
    
    // If still no match, use the clean category as is
    if (!targetCategory) {
      targetCategory = cleanCategory;
    }
    
    // Only use the styles explicitly defined for this category
    let styles = fontStyleMappings[targetCategory] || [];
    
    // If no styles found for this category, use a default set of styles
    if (styles.length === 0) {
      // Fallback to basic styles that work for any category
      styles = ['basic', 'standard', 'normal', 'regular'];
      
      // Add some category-specific fallbacks
      if (targetCategory.includes('bold')) styles.push('bold', 'heavy', 'thick');
      if (targetCategory.includes('italic')) styles.push('italic', 'slanted', 'oblique');
      if (targetCategory.includes('cursive')) styles.push('cursive', 'script', 'handwritten');
      if (targetCategory.includes('gaming') || targetCategory.includes('retro')) styles.push('pixel', '8bit', 'arcade');
    }
    
    const demoText = getDemoText(targetCategory);
    
    // Get all styles that match the target category
    const matchedStyles = allFontStyles.filter(style => {
      const nameLower = style.name.toLowerCase();
      
      // Check for exact match first
      if (nameLower === targetCategory) return true;
      
      // Check if any of the style keywords match
      return styles.some(styleName => {
        const styleLower = styleName.toLowerCase().trim();
        if (!styleLower) return false;
        
        // Match whole word to avoid false positives
        return new RegExp(`\\b${styleLower}\\b`).test(nameLower);
      });
    });
    
    // Generate variations for the matched styles
    const result: FontPreview[] = [];
    const usedTexts = new Set<string>();
    
    // First, try to get exact matches from the matched styles
    for (const style of matchedStyles) {
      if (result.length >= count) break;
      
      // Generate multiple variations for each style
      const baseText = style.converter(demoText);
      if (!baseText || !baseText.trim()) continue;
      
      // Generate multiple variations of this style
      const variations = getTextVariations(baseText, 10);
      
      for (const text of variations) {
        if (result.length >= count) break;
        if (text && text.trim() !== '' && !usedTexts.has(text)) {
          result.push({
            id: result.length + 1,
            name: `${style.name} ${result.length % 5 + 1}`,
            text: applyCategoryStyle(text, targetCategory)
          });
          usedTexts.add(text);
        }
      }
    }
    
    // If we need more, try to generate variations of the matched styles
    if (result.length < count) {
      const additionalNeeded = count - result.length;
      const variations = generateFontVariations(demoText, additionalNeeded * 2);
      
      for (const variation of variations) {
        if (result.length >= count) break;
        
        const nameLower = variation.name.toLowerCase();
        const isMatching = styles.some(style => 
          new RegExp(`\\b${style.toLowerCase().trim()}\\b`).test(nameLower)
        );
        
        if (isMatching && variation.text && variation.text.trim() !== '' && !usedTexts.has(variation.text)) {
          result.push({
            ...variation,
            text: applyCategoryStyle(variation.text, targetCategory)
          });
          usedTexts.add(variation.text);
        }
      }
    }
    
    // If we don't have enough results, generate more variations
    if (result.length < count) {
      const needed = count - result.length;
      const baseTexts = new Set<string>();
      
      // Collect unique base texts from existing results
      result.forEach(font => {
        baseTexts.add(font.text.replace(/[^\p{L}\p{N}\s]/gu, '').trim());
      });
      
      // If no base texts yet, use the demo text
      if (baseTexts.size === 0) {
        baseTexts.add(demoText);
      }
      
      // Generate more variations from existing base texts
      const variationsPerText = Math.ceil(needed / baseTexts.size) + 5;
      
      for (const base of baseTexts) {
        if (result.length >= count) break;
        
        const newVariations = getTextVariations(base, variationsPerText);
        
        for (const text of newVariations) {
          if (result.length >= count) break;
          if (text && text.trim() !== '' && !usedTexts.has(text)) {
            result.push({
              id: result.length + 1,
              name: `Style ${result.length + 1}`,
              text: applyCategoryStyle(text, targetCategory)
            });
            usedTexts.add(text);
          }
        }
      }
    }
    
    // If still not enough, generate completely random variations
    if (result.length < count) {
      const needed = count - result.length;
      const randomTexts = [
        'Sample', 'Example', 'Preview', 'Text', 'Font', 'Style', 'Design', 'Art', 'Creative', 'Unique'
      ];
      
      for (let i = 0; i < needed; i++) {
        const randomText = randomTexts[Math.floor(Math.random() * randomTexts.length)];
        const variations = getTextVariations(randomText, 3);
        
        for (const text of variations) {
          if (result.length >= count) break;
          if (text && text.trim() !== '' && !usedTexts.has(text)) {
            result.push({
              id: result.length + 1,
              name: `Style ${result.length + 1}`,
              text: applyCategoryStyle(text, targetCategory)
            });
            usedTexts.add(text);
          }
        }
      }
    }
    
    // Cache the result
    fontCache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error('Error in getFontsByCategory:', error);
    // Return a fallback result instead of empty array
    return [{
      id: 1,
      name: 'Default Style',
      text: 'Font preview not available'
    }];
  }
};

// Helper function to apply Zalgo text effect
const applyZalgo = (text: string): string => {
  const zalgoChars = '̷̨̡̨̢̡̨̧̧͙̻̬̪̗̼̤̥̤̗͉͎̹̺̺̼͍͖̱̗̪̭̝̼̼̪̤͓̺̘̺͍͓̱̭͉̪̭̦͚̭̳̼͕̳̬̦̞̫̼͓̞̥̲̞̙̬̝̤̟̟͇̪̪̲̞̲̦̩̭͔̱̖̘̖͇̰̜̝̤̖̟͎̦̺͙̻̤̖͓͇̲̭̦̘̲̤̥̗̗̤̺͉̘͓̪̭͚̝̪̪̩̗̠̼̘͗̅̈́͌͒̓͜ͅͅͅͅ';
  return text.split('').map(char => {
    const zalgoCount = 2 + Math.floor(Math.random() * 3);
    let result = char;
    for (let i = 0; i < zalgoCount; i++) {
      result += zalgoChars[Math.floor(Math.random() * zalgoChars.length)];
    }
    return result;
  }).join('');
};

// Helper function to reverse text
const reverseText = (text: string): string => {
  return text.split('').reverse().join('');
};

// Helper function to create mirror text
const mirrorText = (text: string): string => {
  const mirrorMap: Record<string, string> = {
    'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ',
    'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'm': 'ɯ', 'n': 'u', 'p': 'd',
    'q': 'b', 'r': 'ɹ', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'y': 'ʎ',
    'A': '∀', 'B': 'ꓭ', 'C': 'Ɔ', 'D': 'ᗡ', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': '⅁',
    'J': 'ᒋ', 'K': '⋊', 'L': '⅂', 'M': 'ꟽ', 'P': 'Ԁ', 'Q': 'Ό', 'R': 'ᴚ',
    'T': '⊥', 'U': '∩', 'V': 'Λ', 'W': 'M', 'Y': '⅄', '1': '⇂', '2': 'ᘔ',
    '3': 'Ɛ', '4': 'ᔭ', '5': '5', '6': '9', '7': 'Ɫ', '8': '8', '9': '6', '0': '0'
  };
  return text.split('').map(char => mirrorMap[char] || char).reverse().join('');
};

// Apply category-specific text transformations
const applyCategoryStyle = (text: string, category: string): string => {
  if (!text || typeof text !== 'string') return '';
  
  // Ensure text is a string and trim any extra whitespace
  text = String(text).trim();
  const lowerCategory = category.toLowerCase();
  
  // Text Styles
  switch (lowerCategory) {
    case 'bold':
      return `𝗯𝗼𝗹𝗱-${text}`.replace(/([a-zA-Z0-9])/g, match => 
        String.fromCharCode(match.charCodeAt(0) + 0x1D400 - 0x41)
      );
      
    case 'italic':
      return `𝑖𝑡𝑎𝑙𝑖𝑐-${text}`.replace(/([a-zA-Z])/g, match => 
        String.fromCharCode(match.charCodeAt(0) + 0x1D44E - 0x61)
      );
      
    case 'bold-italic':
      return `𝒃𝒐𝒍𝒅-𝒊𝒕𝒂𝒍𝒊𝒄-${text}`.replace(/([a-zA-Z])/g, match => 
        String.fromCharCode(match.charCodeAt(0) + 0x1D482 - 0x61)
      );
      
    case 'strikethrough':
      return `s̶t̶r̶i̶k̶e̶-${text}`.replace(/([a-zA-Z0-9])/g, match => match + '̶');
      
    case 'underline':
      return `u̲n̲d̲e̲r̲l̲i̲n̲e̲-${text}`.replace(/([a-zA-Z0-9])/g, match => match + '̲');
      
    case 'small-caps':
      return `sᴍᴀʟʟᴄᴀᴘs-${text}`.toLowerCase()
        .replace(/[a-z]/g, match => String.fromCharCode(match.charCodeAt(0) + 0x1D00 - 0x61));
        
    case 'double-struck':
      return `𝕕𝕠𝕦𝕓𝕝𝕖-${text}`.replace(/([A-Za-z0-9])/g, match => 
        String.fromCharCode(match.charCodeAt(0) + 0x1D538 - 0x41)
      );
      
    case 'reverse':
      return `reversed-${reverseText(text)}`;
      
    case 'mirror':
      return `mirror-${mirrorText(text)}`;
      
    case 'upside-down':
      return `uʍop-ǝpᴉsdn-${mirrorText(text).split('').reverse().join('')}`;
      
    case 'zalgo':
      return applyZalgo(`zalgo-${text}`);
      
    case 'emoji': {
      const emojiCategories = {
        faces: ['😀', '😊', '😎', '🤩', '😍', '🥰', '😇', '🤠', '🤓', '🧐'],
        objects: ['🚀', '🎯', '🎨', '🎮', '🎲', '🧩', '🎭', '🎪', '🎡', '🎢'],
        nature: ['🌞', '🌈', '🌻', '🌺', '🌸', '🌊', '🌪️', '🔥', '❄️', '☃️'],
        symbols: ['✨', '⚡', '💫', '🌟', '⭐', '💥', '💯', '🎯', '🏆', '🏅']
      };
      
      // Choose a random emoji category for consistency in each text
      const emojiType = Object.keys(emojiCategories)[Math.floor(Math.random() * Object.keys(emojiCategories).length)];
      const emojis = emojiCategories[emojiType as keyof typeof emojiCategories];
      
      // Add emojis between characters, but not too many
      return text.split('').map((char, i) => {
        if (char === ' ') return '   '; // Extra spaces for better readability
        if (i > 0 && i % 3 === 0) {
          return `${char}${emojis[Math.floor(Math.random() * emojis.length)]} `;
        }
        return char;
      }).join('');
    }
      
    // Theme Styles
    case 'gaming': {
      const gamingPrefixes = ['[PLAY]', '>>>', 'LVL UP!', 'NEW!', 'BONUS!'];
      const gamingSuffixes = ['[CONTINUE?]', '<<<', 'HIGH SCORE!', 'SAVE?', 'NEXT STAGE'];
      const prefix = gamingPrefixes[Math.floor(Math.random() * gamingPrefixes.length)];
      const suffix = gamingSuffixes[Math.floor(Math.random() * gamingSuffixes.length)];
      return `${prefix} ${text.toUpperCase()} ${suffix}`;
    }
      
    case 'retro': {
      const retroStyles = [
        `[ ${text.toUpperCase()} ]`,
        `▌${text.toUpperCase()}▐`,
        `«« ${text.toUpperCase()} »»`,
        `|\\ ${text.toUpperCase()} /|`,
        `★ ${text.toUpperCase()} ★`
      ];
      return retroStyles[Math.floor(Math.random() * retroStyles.length)];
    }
      
    case 'vintage': {
      const vintageStyles = [
        `✧ ${text.toUpperCase()} ✧`,
        `✧･ﾟ: *✧${text.toUpperCase()}✧*:･ﾟ✧`,
        `◈ ${text.toUpperCase()} ◈`,
        `✧°•∘ ${text.toUpperCase()} ∘•°✧`,
        `✧˖° ${text.toUpperCase()} °˖✧`
      ];
      return vintageStyles[Math.floor(Math.random() * vintageStyles.length)];
    }
      
    case 'neon': {
      const neonStyles = [
        `✨ ${text.toUpperCase()} ✨`,
        `✧･ﾟ: *${text.toUpperCase()}*:･ﾟ✧`,
        `✧*̥˚ ${text.toUpperCase()} *̥˚✧`,
        `⋆ ˚｡⋆୨${text.toUpperCase()}୧⋆｡˚⋆`,
        `✧˚·${text.toUpperCase()}·˚✧`
      ];
      return neonStyles[Math.floor(Math.random() * neonStyles.length)];
    }
      
    case 'glitch': {
      const glitchChars = ['!', '@', '#', '$', '%', '&', '*', '?', '/', '\\', '|', '~'];
      return text.split('').map((char, i) => {
        // Randomly replace some characters with glitch characters
        if (Math.random() > 0.7) {
          return glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }
        // Randomly change case
        if (Math.random() > 0.5) {
          return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
        }
        return char;
      }).join('');
    }
      
    case 'tattoo': {
      const tattooStyles = [
        `⚔️ ${text} ⚔️`,
        `✧ ${text} ✧`,
        `༺ ${text} ༻`,
        `✧･ﾟ: *${text}*:･ﾟ✧`,
        `✧˖° ${text} °˖✧`
      ];
      return tattooStyles[Math.floor(Math.random() * tattooStyles.length)];
    }
      
    case 'gothic':
      return `† ${text.toUpperCase()} †`;
      
    case 'graffiti':
      return `[${text.toUpperCase()}]`;
      
    case 'math':
      return `Σ(${text})`;
      
    case 'currency':
      return `$${text} USD`;
      
    default:
      return text;
  }
};

// Map of category slugs to their descriptions
const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'italic': 'Transform your text with beautiful italic fonts. Perfect for adding emphasis and style to your social media posts, bios, and messages.',
  'strikethrough': 'Create strikethrough text for a crossed-out effect. Great for showing updates, corrections, or just for fun!',
  'underline': 'Generate underlined text to make your words stand out. Perfect for emphasis and decorative purposes.',
  'small-caps': 'Create elegant small caps text for a professional and sophisticated look.',
  'reverse': 'Generate reversed text that reads correctly when mirrored. Fun for creative projects and designs.',
  'zalgo': 'Create creepy, glitchy text with Zalgo characters. Perfect for horror themes and chaotic designs.',
  'mirror': 'Generate mirrored text that creates a reflection effect. Great for artistic and creative projects.',
  'upside-down': 'Flip your text upside down for a fun and unique effect.',
  'emoji': 'Enhance your text with emoji decorations and combinations.',
  'unicode': 'Generate special Unicode characters and symbols for your text.',
  'symbol': 'Add stylish symbols and special characters to your text.',
  'tattoo': 'Find the perfect tattoo font with our collection of stylish and artistic typefaces.',
  'gaming': 'Level up your gaming profile with our collection of gaming fonts and styles.',
  'retro': 'Bring back the retro vibe with our collection of vintage and nostalgic fonts.',
  'vintage': 'Add a classic touch with our vintage font collection, perfect for timeless designs.',
  'neon': 'Make your text glow with our collection of neon and bright font styles.',
  'glitch': 'Create digital, glitchy text effects for a futuristic and edgy look.'
};

export const getPageMetadata = (platform: string, category: string) => {
  // Clean the category name to match our known categories
  const cleanCategory = category.toLowerCase()
    .replace(/-font-generator$/, '')
    .replace(/-text-generator$/, '')
    .replace(/-generator$/, '')
    .trim();
  
  // Get the display name or use a fallback
  const displayName = CATEGORY_NAMES[cleanCategory] || 
    `${cleanCategory.charAt(0).toUpperCase() + cleanCategory.slice(1)} Font Generator`;
  
  // Get the description or use a fallback
  const description = CATEGORY_DESCRIPTIONS[cleanCategory] || 
    `Generate and copy ${cleanCategory} fonts for ${platform}. Create stylish text for your ${platform} profile, bio, and posts.`;
  
  const title = `${displayName} for ${platform.charAt(0).toUpperCase() + platform.slice(1)}`;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: 'Fontys',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
};
