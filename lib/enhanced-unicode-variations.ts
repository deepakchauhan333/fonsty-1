// lib/enhanced-unicode-variations.ts
import { FONT_TYPES } from './constants';

export type UnicodeVariation = {
  id: number;
  name: string;
  unicode: string;
  preview: string;
  className?: string;
  category: string;
  fontType: string;
};

type UnicodeRange = { start: number; end: number };

interface FontTypeConfig {
  name: string;
  category: string;
  unicodeRanges?: UnicodeRange[];
  decorators?: string[];
  className?: string;
  combiningMarks?: string[];
  mirrorMap?: Record<string, string>;
  upsideDownMap?: Record<string, string>;
  glitchChars?: string[];
}

// 21 Font Type Categories with specialized Unicode ranges
const FONT_TYPE_CONFIGS: Record<string, FontTypeConfig> = {
  'fancy-font-generator': {
    name: 'Fancy Font',
    category: 'decorative',
    unicodeRanges: [
      { start: 0x1D400, end: 0x1D433 }, // Mathematical Bold
      { start: 0x1D5D4, end: 0x1D607 }, // Sans-serif Bold
      { start: 0x1D63C, end: 0x1D66F }, // Sans-serif Bold Italic
    ],
    decorators: ['✨', '🌟', '💫', '⭐', '🔮', '💎', '👑', '🎭', '🎪', '🎨'],
    className: 'font-bold text-purple-600 shadow-lg'
  },
  'cursive-font-generator': {
    name: 'Cursive Font',
    category: 'script',
    unicodeRanges: [
      { start: 0x1D49C, end: 0x1D4CF }, // Script
      { start: 0x1D4D0, end: 0x1D503 }, // Bold Script
    ],
    decorators: ['✍️', '📝', '🖋️', '✒️', '🖊️', '📜', '💌', '🎀', '🌸', '🦋'],
    className: 'italic font-serif text-pink-600'
  },
  'bubble-font-generator': {
    name: 'Bubble Font',
    category: 'playful',
    unicodeRanges: [
      { start: 0x24B6, end: 0x24E9 }, // Circled Latin
      { start: 0x1F150, end: 0x1F169 }, // Negative Circled
    ],
    decorators: ['🫧', '💭', '🎈', '🔵', '⚪', '🟢', '🟡', '🟠', '🔴', '🟣'],
    className: 'rounded-full bg-blue-100 px-2 py-1 text-blue-700'
  },
  'bold-font-generator': {
    name: 'Bold Font',
    category: 'strong',
    unicodeRanges: [
      { start: 0x1D400, end: 0x1D433 }, // Mathematical Bold
      { start: 0x1D5D4, end: 0x1D607 }, // Sans-serif Bold
    ],
    decorators: ['💪', '🔥', '⚡', '💥', '🚀', '🎯', '🏆', '👊', '🔊', '📢'],
    className: 'font-black text-red-600 text-shadow'
  },
  'italic-font-generator': {
    name: 'Italic Font',
    category: 'elegant',
    unicodeRanges: [
      { start: 0x1D434, end: 0x1D467 }, // Mathematical Italic
      { start: 0x1D608, end: 0x1D63B }, // Sans-serif Italic
    ],
    decorators: ['🌙', '✨', '🌟', '💫', '🎭', '🎪', '🎨', '🖼️', '🎬', '📚'],
    className: 'italic font-serif text-indigo-600'
  },
  'strikethrough-text-generator': {
    name: 'Strikethrough Text',
    category: 'crossed',
    decorators: ['❌', '🚫', '⛔', '🔴', '❎', '✖️', '➖', '〰️', '🚷', '🚯'],
    combiningMarks: ['̶', '̷', '̸', '̵', '̴'],
    className: 'line-through text-gray-500'
  },
  'underline-text-generator': {
    name: 'Underline Text',
    category: 'emphasized',
    decorators: ['📝', '✏️', '🖊️', '✒️', '🖋️', '📋', '📄', '📃', '📑', '🗒️'],
    combiningMarks: ['̲', '̳', '̠', '̤', '̥'],
    className: 'underline text-blue-600 font-medium'
  },
  'small-caps-text-generator': {
    name: 'Small Caps Text',
    category: 'compact',
    unicodeRanges: [
      { start: 0x1D18A, end: 0x1D1A9 }, // Small Caps
    ],
    decorators: ['🔤', '🔡', '🔠', '📝', '✏️', '🖊️', '📋', '📄', '🗒️', '📑'],
    className: 'uppercase text-sm font-semibold tracking-wider'
  },
  'reverse-text-generator': {
    name: 'Reverse Text',
    category: 'flipped',
    decorators: ['🔄', '🔃', '🔁', '↩️', '↪️', '🔀', '🔂', '⤴️', '⤵️', '🔄'],
    className: 'text-purple-600 font-mono'
  },
  'zalgo-text-generator': {
    name: 'Zalgo Text',
    category: 'chaotic',
    decorators: ['👹', '😈', '🔥', '⚡', '💀', '👻', '🎭', '🌪️', '💥', '🌋'],
    combiningMarks: [
      '̴', '̷', '̸', '̺', '̻', '̼', 'ͅ', '͇', '͈', '͉', '͍', '͎', '͓', '͔', '͕', '͖', 
      '͙', '͚', '͛', '͊', '͋', '͌', '̃', '̂', '̄', '̅', '̿', '̑', '̆', '̐', '͒', '͗', 
      '͑', '̇', '̈', '̊', '͢', '͠', '͡', '̀', '́', '̂', '̃', '̄', '̅', '̆', '̇', '̈'
    ],
    className: 'text-red-600 font-bold'
  },
  'mirror-text-generator': {
    name: 'Mirror Text',
    category: 'reflected',
    decorators: ['🪞', '🔄', '↔️', '⚖️', '🎭', '👥', '🔁', '🔃', '⤴️', '⤵️'],
    mirrorMap: {
      'a': 'ɒ', 'b': 'd', 'c': 'ɔ', 'd': 'b', 'e': 'ɘ', 'f': 'Ꮈ', 'g': 'ǫ', 'h': 'ʜ',
      'i': 'i', 'j': 'ꞁ', 'k': 'ʞ', 'l': 'l', 'm': 'm', 'n': 'n', 'o': 'o', 'p': 'q',
      'q': 'p', 'r': 'ɿ', 's': 'ƨ', 't': 'ƚ', 'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x',
      'y': 'ʏ', 'z': 'z'
    },
    className: 'text-teal-600 font-mono'
  },
  'upside-down-text-generator': {
    name: 'Upside Down Text',
    category: 'inverted',
    decorators: ['🙃', '🔄', '↕️', '⬇️', '⬆️', '🎪', '🎭', '🌍', '🔃', '🔁'],
    upsideDownMap: {
      'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ',
      'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd',
      'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x',
      'y': 'ʎ', 'z': 'z'
    },
    className: 'text-orange-600 font-mono'
  },
  'emoji-text-generator': {
    name: 'Emoji Text',
    category: 'expressive',
    unicodeRanges: [
      { start: 0x1F600, end: 0x1F64F }, // Emoticons
      { start: 0x1F300, end: 0x1F5FF }, // Misc Symbols
    ],
    decorators: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃'],
    className: 'text-yellow-600 text-lg'
  },
  'unicode-text-generator': {
    name: 'Unicode Text',
    category: 'universal',
    unicodeRanges: [
      { start: 0x0100, end: 0x017F }, // Latin Extended-A
      { start: 0x0180, end: 0x024F }, // Latin Extended-B
      { start: 0x1E00, end: 0x1EFF }, // Latin Extended Additional
    ],
    decorators: ['🌐', '🔤', '🔡', '🔠', '📝', '✏️', '🖊️', '📋', '📄', '🗒️'],
    className: 'text-green-600 font-mono'
  },
  'symbol-text-generator': {
    name: 'Symbol Text',
    category: 'symbolic',
    unicodeRanges: [
      { start: 0x2190, end: 0x21FF }, // Arrows
      { start: 0x2200, end: 0x22FF }, // Mathematical Operators
      { start: 0x2300, end: 0x23FF }, // Miscellaneous Technical
    ],
    decorators: ['⚡', '⭐', '✨', '🔮', '💎', '👑', '🎭', '🎪', '🎨', '🖼️'],
    className: 'text-cyan-600 font-bold'
  },
  'tattoo-font-generator': {
    name: 'Tattoo Font',
    category: 'artistic',
    unicodeRanges: [
      { start: 0x1D504, end: 0x1D537 }, // Fraktur
      { start: 0x1D56C, end: 0x1D59F }, // Bold Fraktur
    ],
    decorators: ['🖤', '⚡', '🔥', '💀', '🌹', '⚔️', '🗡️', '🛡️', '👑', '🦅'],
    className: 'font-bold text-black'
  },
  'gaming-font-generator': {
    name: 'Gaming Font',
    category: 'digital',
    unicodeRanges: [
      { start: 0x1D670, end: 0x1D6A3 }, // Monospace
      { start: 0xFF21, end: 0xFF3A }, // Fullwidth
    ],
    decorators: ['🎮', '🕹️', '👾', '🎯', '🏆', '⚡', '🔥', '💥', '🚀', '🎪'],
    className: 'font-mono text-lime-600 font-bold'
  },
  'retro-font-generator': {
    name: 'Retro Font',
    category: 'vintage',
    unicodeRanges: [
      { start: 0x1D504, end: 0x1D537 }, // Fraktur
      { start: 0x1D49C, end: 0x1D4CF }, // Script
    ],
    decorators: ['📻', '📺', '🎞️', '📼', '💿', '📀', '🎵', '🎶', '🎤', '🎧'],
    className: 'font-serif text-amber-600'
  },
  'vintage-font-generator': {
    name: 'Vintage Font',
    category: 'classic',
    unicodeRanges: [
      { start: 0x1D504, end: 0x1D537 }, // Fraktur
      { start: 0x1D56C, end: 0x1D59F }, // Bold Fraktur
    ],
    decorators: ['🕰️', '⏰', '📜', '🗞️', '📰', '📖', '📚', '🖋️', '✒️', '🕯️'],
    className: 'font-serif text-amber-800 font-semibold'
  },
  'neon-font-generator': {
    name: 'Neon Font',
    category: 'glowing',
    unicodeRanges: [
      { start: 0x1D5D4, end: 0x1D607 }, // Sans-serif Bold
      { start: 0x1D63C, end: 0x1D66F }, // Sans-serif Bold Italic
    ],
    decorators: ['💡', '🌟', '✨', '💫', '⚡', '🔥', '🌈', '🎆', '🎇', '💎'],
    className: 'font-bold text-pink-500 glow-effect'
  },
  'glitch-font-generator': {
    name: 'Glitch Font',
    category: 'corrupted',
    decorators: ['⚡', '💥', '🔥', '👾', '🤖', '💻', '📺', '🎮', '🕹️', '⚠️'],
    glitchChars: ['҉', '̸', '̷', '̴', '̵', '̶', '̡', '̢', '̧', '̨', '̩', '̪', '̫', '̬', '̭', '̮'],
    className: 'font-mono text-red-500 glitch-effect'
  }
};

// Helper function to get character from Unicode range
const getCharFromUnicodeRange = (char: string, range: { start: number; end: number }, variant: number = 0): string => {
  const code = char.charCodeAt(0);
  
  if (code >= 65 && code <= 90) { // A-Z
    const offset = (code - 65) + (variant * 26) % (range.end - range.start);
    const newCode = range.start + offset;
    return newCode <= range.end ? String.fromCodePoint(newCode) : char;
  } else if (code >= 97 && code <= 122) { // a-z
    const offset = (code - 97) + (variant * 26) % (range.end - range.start);
    const newCode = range.start + 26 + offset;
    return newCode <= range.end ? String.fromCodePoint(newCode) : char;
  }
  
  return char;
};

// Generate 200 unique variations for each font type
export const generateFontTypeVariations = (fontType: string, baseText: string): UnicodeVariation[] => {
  const config = FONT_TYPE_CONFIGS[fontType as keyof typeof FONT_TYPE_CONFIGS];
  if (!config) return [];

  const variations: UnicodeVariation[] = [];
  const usedTexts = new Set<string>();

  for (let i = 0; i < 200; i++) {
    let transformedText = baseText;
    let decoratedText = '';
    
    // Apply font-specific transformations
    const ranges = config.unicodeRanges ?? [];
    if (ranges.length > 0) {
      const range = ranges[i % ranges.length];
      transformedText = [...baseText].map(char => 
        getCharFromUnicodeRange(char, range, Math.floor(i / ranges.length))
      ).join('');
    }

    // Apply special transformations
    if (fontType === 'reverse-text-generator') {
      transformedText = baseText.split('').reverse().join('');
    } else if (fontType === 'upside-down-text-generator' && config.upsideDownMap) {
      transformedText = [...baseText].map(char => 
        config.upsideDownMap?.[char.toLowerCase()] || char
      ).reverse().join('');
    } else if (fontType === 'mirror-text-generator' && config.mirrorMap) {
      transformedText = [...baseText].map(char => 
        config.mirrorMap?.[char.toLowerCase()] || char
      ).join('');
    } else if (fontType === 'small-caps-text-generator') {
      transformedText = baseText.toUpperCase();
    } else if (fontType === 'strikethrough-text-generator' && config.combiningMarks) {
      transformedText = [...baseText].map(char => 
        char + config.combiningMarks![i % config.combiningMarks!.length]
      ).join('');
    } else if (fontType === 'underline-text-generator' && config.combiningMarks) {
      transformedText = [...baseText].map(char => 
        char + config.combiningMarks![i % config.combiningMarks!.length]
      ).join('');
    } else if (fontType === 'zalgo-text-generator' && config.combiningMarks) {
      transformedText = [...baseText].map(char => {
        const numMarks = 1 + (i % 3);
        let result = char;
        for (let j = 0; j < numMarks; j++) {
          result += config.combiningMarks![(i + j) % config.combiningMarks!.length];
        }
        return result;
      }).join('');
    } else if (fontType === 'glitch-font-generator' && config.glitchChars) {
      transformedText = [...baseText].map((char, idx) => {
        if (idx % 2 === 0) {
          return char + config.glitchChars![(i + idx) % config.glitchChars!.length];
        }
        return char;
      }).join('');
    }

    // Add decorative elements
    const decorators = config.decorators ?? [];
    const decoratorCount = Math.min(2 + (i % 3), decorators.length);
    const leftDecorators = [];
    const rightDecorators = [];
    
    for (let j = 0; j < decoratorCount; j++) {
      leftDecorators.push(decorators[(i + j) % decorators.length]);
      rightDecorators.push(decorators[(i + j + decoratorCount) % decorators.length]);
    }

    // Create different decoration patterns
    if (i % 5 === 0) {
      decoratedText = `${leftDecorators.join('')} ${transformedText} ${rightDecorators.join('')}`;
    } else if (i % 5 === 1) {
      decoratedText = `${leftDecorators[0]} ${transformedText} ${rightDecorators[0]}`;
    } else if (i % 5 === 2) {
      decoratedText = `${leftDecorators.join(' ')} ${transformedText} ${rightDecorators.join(' ')}`;
    } else if (i % 5 === 3) {
      decoratedText = transformedText; // No decorators
    } else {
      decoratedText = `${leftDecorators.slice(0, 1).join('')}${transformedText}${rightDecorators.slice(0, 1).join('')}`;
    }

    // Ensure uniqueness
    if (!usedTexts.has(decoratedText)) {
      variations.push({
        id: i + 1,
        name: `${config.name} Style ${i + 1}`,
        unicode: decoratedText,
        preview: decoratedText.length > 30 ? decoratedText.substring(0, 30) + '...' : decoratedText,
        className: config.className || '',
        category: config.category,
        fontType: fontType
      });
      usedTexts.add(decoratedText);
    }
  }

  return variations;
};

// Generate all 4200 variations (200 per font type)
export const generateAllFontVariations = (baseText: string): { [key: string]: UnicodeVariation[] } => {
  const allVariations: { [key: string]: UnicodeVariation[] } = {};
  
  FONT_TYPES.forEach(fontType => {
    allVariations[fontType] = generateFontTypeVariations(fontType, baseText);
  });
  
  return allVariations;
};

// Get variations for a specific font type
export const getFontVariations = (fontType: string, baseText: string, count: number = 200): UnicodeVariation[] => {
  const variations = generateFontTypeVariations(fontType, baseText);
  return variations.slice(0, count);
};

// Get mixed variations for homepage (best fonts from all categories)
export const getHomepageVariations = (baseText: string, count: number = 2000): UnicodeVariation[] => {
  const allVariations: UnicodeVariation[] = [];
  let idCounter = 1;
  
  FONT_TYPES.forEach(fontType => {
    const variations = generateFontTypeVariations(fontType, baseText);
    // Take the best variations from each type
    const bestVariations = variations.slice(0, Math.floor(count / FONT_TYPES.length));
    bestVariations.forEach(variation => {
      allVariations.push({
        ...variation,
        id: idCounter++
      });
    });
  });
  
  // Shuffle for variety
  for (let i = allVariations.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allVariations[i], allVariations[j]] = [allVariations[j], allVariations[i]];
  }
  
  return allVariations.slice(0, count);
};

export default {
  generateFontTypeVariations,
  generateAllFontVariations,
  getFontVariations,
  getHomepageVariations,
  FONT_TYPE_CONFIGS
};
