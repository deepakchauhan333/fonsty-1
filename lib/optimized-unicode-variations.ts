// lib/optimized-unicode-variations.ts - High-performance Unicode generator
import { FONT_TYPES } from './constants';

export type UnicodeVariation = {
  id: number;
  name: string;
  unicode: string;
  preview: string;
  fontType: string;
};

// Simplified, high-performance Unicode transformations
const UNICODE_MAPS = {
  // Mathematical Bold (A-Z, a-z)
  bold: {
    upper: (c: string) => String.fromCodePoint(0x1D400 + c.charCodeAt(0) - 65),
    lower: (c: string) => String.fromCodePoint(0x1D41A + c.charCodeAt(0) - 97),
  },
  // Mathematical Italic
  italic: {
    upper: (c: string) => String.fromCodePoint(0x1D434 + c.charCodeAt(0) - 65),
    lower: (c: string) => String.fromCodePoint(0x1D44E + c.charCodeAt(0) - 97),
  },
  // Script/Cursive
  cursive: {
    upper: (c: string) => String.fromCodePoint(0x1D49C + c.charCodeAt(0) - 65),
    lower: (c: string) => String.fromCodePoint(0x1D4B6 + c.charCodeAt(0) - 97),
  },
  // Bold Script
  boldCursive: {
    upper: (c: string) => String.fromCodePoint(0x1D4D0 + c.charCodeAt(0) - 65),
    lower: (c: string) => String.fromCodePoint(0x1D4EA + c.charCodeAt(0) - 97),
  },
  // Sans-serif Bold
  fancy: {
    upper: (c: string) => String.fromCodePoint(0x1D5D4 + c.charCodeAt(0) - 65),
    lower: (c: string) => String.fromCodePoint(0x1D5EE + c.charCodeAt(0) - 97),
  },
  // Circled
  bubble: {
    upper: (c: string) => String.fromCodePoint(0x24B6 + c.charCodeAt(0) - 65),
    lower: (c: string) => String.fromCodePoint(0x24D0 + c.charCodeAt(0) - 97),
  },
  // Monospace
  gaming: {
    upper: (c: string) => String.fromCodePoint(0x1D670 + c.charCodeAt(0) - 65),
    lower: (c: string) => String.fromCodePoint(0x1D68A + c.charCodeAt(0) - 97),
  },
  // Fraktur
  tattoo: {
    upper: (c: string) => String.fromCodePoint(0x1D504 + c.charCodeAt(0) - 65),
    lower: (c: string) => String.fromCodePoint(0x1D51E + c.charCodeAt(0) - 97),
  },
};

// Special character maps
const SPECIAL_MAPS = {
  mirror: { a: 'ɒ', b: 'd', c: 'ɔ', d: 'b', e: 'ɘ', f: 'Ꮈ', g: 'ǫ', h: 'ʜ', i: 'i', j: 'ꞁ', k: 'ʞ', l: 'l', m: 'm', n: 'n', o: 'o', p: 'q', q: 'p', r: 'ɿ', s: 'ƨ', t: 'ƚ', u: 'u', v: 'v', w: 'w', x: 'x', y: 'ʏ', z: 'z' },
  upsideDown: { a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ', j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z' },
};

// Expanded decorators, including complex flourishes
const DECORATORS = [
  '✨', '⭐', '💫', '🌟', '✦', '✧', '★', '☆', '◆', '◇', '👺', '👌', '💝', '⚡', '❇️', '🪄',
  '<:::::[]=¤', '(▀̿̿Ĺ̯̿̿▀̿ ̿)', '✪', '✯', '✵', '☄️', '♛', '♜', '♞'
];

// Transform text based on font type
const transformText = (text: string, fontType: string, variant: number): string => {
  const chars = [...text];
  
  switch (fontType) {
    case 'fancy-font-generator':
      return chars.map(c => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return UNICODE_MAPS.fancy.upper(c);
        if (code >= 97 && code <= 122) return UNICODE_MAPS.fancy.lower(c);
        return c;
      }).join('');
      
    case 'bold-font-generator':
      return chars.map(c => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return UNICODE_MAPS.bold.upper(c);
        if (code >= 97 && code <= 122) return UNICODE_MAPS.bold.lower(c);
        return c;
      }).join('');
      
    case 'italic-font-generator':
      return chars.map(c => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return UNICODE_MAPS.italic.upper(c);
        if (code >= 97 && code <= 122) return UNICODE_MAPS.italic.lower(c);
        return c;
      }).join('');
      
    case 'cursive-font-generator':
      return chars.map(c => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return UNICODE_MAPS.cursive.upper(c);
        if (code >= 97 && code <= 122) return UNICODE_MAPS.cursive.lower(c);
        return c;
      }).join('');
      
    case 'bubble-font-generator':
      return chars.map(c => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return UNICODE_MAPS.bubble.upper(c);
        if (code >= 97 && code <= 122) return UNICODE_MAPS.bubble.lower(c);
        return c;
      }).join('');
      
    case 'gaming-font-generator':
      return chars.map(c => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return UNICODE_MAPS.gaming.upper(c);
        if (code >= 97 && code <= 122) return UNICODE_MAPS.gaming.lower(c);
        return c;
      }).join('');
      
    case 'tattoo-font-generator':
    case 'retro-font-generator':
    case 'vintage-font-generator':
      return chars.map(c => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return UNICODE_MAPS.tattoo.upper(c);
        if (code >= 97 && code <= 122) return UNICODE_MAPS.tattoo.lower(c);
        return c;
      }).join('');
      
    case 'strikethrough-text-generator':
      return chars.map(c => c + '\u0336').join('');
      
    case 'underline-text-generator':
      return chars.map(c => c + '\u0332').join('');
      
    case 'small-caps-text-generator':
      return text.toUpperCase();
      
    case 'reverse-text-generator':
      return chars.reverse().join('');
      
    case 'mirror-text-generator':
      return chars.map(c => SPECIAL_MAPS.mirror[c.toLowerCase() as keyof typeof SPECIAL_MAPS.mirror] || c).join('');
      
    case 'upside-down-text-generator':
      return chars.map(c => SPECIAL_MAPS.upsideDown[c.toLowerCase() as keyof typeof SPECIAL_MAPS.upsideDown] || c).reverse().join('');
      
    case 'zalgo-text-generator':
      return chars.map(c => c + '\u0336\u0334').join('');
      
    case 'neon-font-generator':
      return chars.map(c => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return UNICODE_MAPS.fancy.upper(c);
        if (code >= 97 && code <= 122) return UNICODE_MAPS.fancy.lower(c);
        return c;
      }).join('');
      
    case 'glitch-font-generator':
      return chars.map((c, i) => i % 2 === 0 ? c + '\u0336' : c).join('');
      
    default:
      return chars.map(c => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return UNICODE_MAPS.bold.upper(c);
        if (code >= 97 && code <= 122) return UNICODE_MAPS.bold.lower(c);
        return c;
      }).join('');
  }
};

// Generate variations with minimal decorations for performance
export const generateFontTypeVariations = (fontType: string, baseText: string, count: number = 200): UnicodeVariation[] => {
  const variations: UnicodeVariation[] = [];
  
  for (let i = 0; i < count; i++) {
    const transformed = transformText(baseText, fontType, i);
    
    // Always add 3–4 decorators on both sides for visual flourish
    const leftCount = 3 + (i % 2); // 3 or 4
    const rightCount = 3 + ((i + 1) % 2); // 3 or 4 (alternating)
    const left = Array.from({ length: leftCount }, (_, idx) => DECORATORS[(i + idx) % DECORATORS.length]).join(' ');
    const right = Array.from({ length: rightCount }, (_, idx) => DECORATORS[(i + leftCount + idx) % DECORATORS.length]).join(' ');
    const decorated = `${left} ${transformed} ${right}`;
    
    variations.push({
      id: i + 1,
      name: `Style ${i + 1}`,
      unicode: decorated,
      preview: decorated.length > 30 ? decorated.substring(0, 30) + '...' : decorated,
      fontType: fontType
    });
  }
  
  return variations;
};

// Get variations for homepage - mixed from all types
export const getHomepageVariations = (baseText: string, count: number = 500): UnicodeVariation[] => {
  const variations: UnicodeVariation[] = [];
  const perType = Math.ceil(count / FONT_TYPES.length);
  let id = 1;
  
  FONT_TYPES.forEach(fontType => {
    const typeVariations = generateFontTypeVariations(fontType, baseText, perType);
    typeVariations.forEach(v => {
      variations.push({ ...v, id: id++ });
    });
  });
  
  // Shuffle for variety
  for (let i = variations.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [variations[i], variations[j]] = [variations[j], variations[i]];
  }
  
  return variations.slice(0, count);
};

// Get variations for specific font type
export const getFontVariations = (fontType: string, baseText: string, count: number = 200): UnicodeVariation[] => {
  return generateFontTypeVariations(fontType, baseText, count);
};

export default {
  generateFontTypeVariations,
  getHomepageVariations,
  getFontVariations,
};
