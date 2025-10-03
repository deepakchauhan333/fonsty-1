// lib/unicode-variations.ts
import { FONT_TYPES } from './constants';

export type UnicodeVariation = {
  id: number;
  name: string;
  unicode: string;
  preview: string;
  className?: string;
  category?: string;
  fontType?: string;
};

type FontVariations = {
  [key: string]: UnicodeVariation[];
};

type StyleFunction = (c: string, variant?: number) => string;

type StyleVariations = {
  [key: string]: {
    uppercase: string[] | StyleFunction;
    lowercase: string[] | StyleFunction;
    transform?: (text: string, variant?: number) => string;
    marks?: string[];
    variants?: number;
    className?: string;
    category?: string;
  };
};

// 21 Font Type Categories with specialized Unicode ranges
const _FONT_TYPE_CONFIGS = {
  'fancy-font-generator': {
    name: 'Fancy Font',
    category: 'decorative',
    unicodeRanges: [
      { start: 0x1D400, end: 0x1D433 }, // Mathematical Bold
      { start: 0x1D5D4, end: 0x1D607 }, // Sans-serif Bold
      { start: 0x1D63C, end: 0x1D66F }, // Sans-serif Bold Italic
    ],
    decorators: ['✨', '🌟', '💫', '⭐', '🔮', '💎', '👑', '🎭', '🎪', '🎨']
  },
  'cursive-font-generator': {
    name: 'Cursive Font',
    category: 'script',
    unicodeRanges: [
      { start: 0x1D49C, end: 0x1D4CF }, // Script
      { start: 0x1D4D0, end: 0x1D503 }, // Bold Script
    ],
    decorators: ['✍️', '📝', '🖋️', '✒️', '🖊️', '📜', '💌', '🎀', '🌸', '🦋']
  },
  'bubble-font-generator': {
    name: 'Bubble Font',
    category: 'playful',
    unicodeRanges: [
      { start: 0x24B6, end: 0x24E9 }, // Circled Latin
      { start: 0x1F150, end: 0x1F169 }, // Negative Circled
    ],
    decorators: ['🫧', '💭', '🎈', '🔵', '⚪', '🟢', '🟡', '🟠', '🔴', '🟣']
  },
  'bold-font-generator': {
    name: 'Bold Font',
    category: 'strong',
    unicodeRanges: [
      { start: 0x1D400, end: 0x1D433 }, // Mathematical Bold
      { start: 0x1D5D4, end: 0x1D607 }, // Sans-serif Bold
    ],
    decorators: ['💪', '🔥', '⚡', '💥', '🚀', '🎯', '🏆', '👊', '🔊', '📢']
  },
  'italic-font-generator': {
    name: 'Italic Font',
    category: 'elegant',
    unicodeRanges: [
      { start: 0x1D434, end: 0x1D467 }, // Mathematical Italic
      { start: 0x1D608, end: 0x1D63B }, // Sans-serif Italic
    ],
    decorators: ['🌙', '✨', '🌟', '💫', '🎭', '🎪', '🎨', '🖼️', '🎬', '📚']
  },
  'strikethrough-text-generator': {
    name: 'Strikethrough Text',
    category: 'crossed',
    unicodeRanges: [],
    decorators: ['❌', '🚫', '⛔', '🔴', '❎', '✖️', '➖', '〰️', '🚷', '🚯'],
    combiningMarks: ['̶', '̷', '̸', '̵', '̴']
  },
  'underline-text-generator': {
    name: 'Underline Text',
    category: 'emphasized',
    unicodeRanges: [],
    decorators: ['📝', '✏️', '🖊️', '✒️', '🖋️', '📋', '📄', '📃', '📑', '🗒️'],
    combiningMarks: ['̲', '̳', '̠', '̤', '̥']
  },
  'small-caps-text-generator': {
    name: 'Small Caps Text',
    category: 'compact',
    unicodeRanges: [
      { start: 0x1D18A, end: 0x1D1A9 }, // Small Caps
    ],
    decorators: ['🔤', '🔡', '🔠', '📝', '✏️', '🖊️', '📋', '📄', '🗒️', '📑']
  },
  'reverse-text-generator': {
    name: 'Reverse Text',
    category: 'flipped',
    unicodeRanges: [],
    decorators: ['🔄', '🔃', '🔁', '↩️', '↪️', '🔀', '🔂', '⤴️', '⤵️', '🔄'],
    transform: (text: string) => text.split('').reverse().join('')
  },
  'zalgo-text-generator': {
    name: 'Zalgo Text',
    category: 'chaotic',
    unicodeRanges: [],
    decorators: ['👹', '😈', '🔥', '⚡', '💀', '👻', '🎭', '🌪️', '💥', '🌋'],
    combiningMarks: [
      '̴', '̷', '̸', '̺', '̻', '̼', 'ͅ', '͇', '͈', '͉', '͍', '͎', '͓', '͔', '͕', '͖', 
      '͙', '͚', '͛', '͊', '͋', '͌', '̃', '̂', '̄', '̅', '̿', '̑', '̆', '̐', '͒', '͗', 
      '͑', '̇', '̈', '̊', '͢', '͠', '͡', '̀', '́', '̂', '̃', '̄', '̅', '̆', '̇', '̈'
    ]
  },
  'mirror-text-generator': {
    name: 'Mirror Text',
    category: 'reflected',
    unicodeRanges: [],
    decorators: ['🪞', '🔄', '↔️', '⚖️', '🎭', '👥', '🔁', '🔃', '⤴️', '⤵️'],
    mirrorMap: {
      'a': 'ɒ', 'b': 'd', 'c': 'ɔ', 'd': 'b', 'e': 'ɘ', 'f': 'Ꮈ', 'g': 'ǫ', 'h': 'ʜ',
      'i': 'i', 'j': 'ꞁ', 'k': 'ʞ', 'l': 'l', 'm': 'm', 'n': 'n', 'o': 'o', 'p': 'q',
      'q': 'p', 'r': 'ɿ', 's': 'ƨ', 't': 'ƚ', 'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x',
      'y': 'ʏ', 'z': 'z'
    }
  },
  'upside-down-text-generator': {
    name: 'Upside Down Text',
    category: 'inverted',
    unicodeRanges: [],
    decorators: ['🙃', '🔄', '↕️', '⬇️', '⬆️', '🎪', '🎭', '🌍', '🔃', '🔁'],
    upsideDownMap: {
      'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ',
      'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd',
      'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x',
      'y': 'ʎ', 'z': 'z'
    }
  },
  'emoji-text-generator': {
    name: 'Emoji Text',
    category: 'expressive',
    unicodeRanges: [
      { start: 0x1F600, end: 0x1F64F }, // Emoticons
      { start: 0x1F300, end: 0x1F5FF }, // Misc Symbols
    ],
    decorators: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃']
  },
  'unicode-text-generator': {
    name: 'Unicode Text',
    category: 'universal',
    unicodeRanges: [
      { start: 0x0100, end: 0x017F }, // Latin Extended-A
      { start: 0x0180, end: 0x024F }, // Latin Extended-B
      { start: 0x1E00, end: 0x1EFF }, // Latin Extended Additional
    ],
    decorators: ['🌐', '🔤', '🔡', '🔠', '📝', '✏️', '🖊️', '📋', '📄', '🗒️']
  },
  'symbol-text-generator': {
    name: 'Symbol Text',
    category: 'symbolic',
    unicodeRanges: [
      { start: 0x2190, end: 0x21FF }, // Arrows
      { start: 0x2200, end: 0x22FF }, // Mathematical Operators
      { start: 0x2300, end: 0x23FF }, // Miscellaneous Technical
    ],
    decorators: ['⚡', '⭐', '✨', '🔮', '💎', '👑', '🎭', '🎪', '🎨', '🖼️']
  },
  'tattoo-font-generator': {
    name: 'Tattoo Font',
    category: 'artistic',
    unicodeRanges: [
      { start: 0x1D504, end: 0x1D537 }, // Fraktur
      { start: 0x1D56C, end: 0x1D59F }, // Bold Fraktur
    ],
    decorators: ['🖤', '⚡', '🔥', '💀', '🌹', '⚔️', '🗡️', '🛡️', '👑', '🦅']
  },
  'gaming-font-generator': {
    name: 'Gaming Font',
    category: 'digital',
    unicodeRanges: [
      { start: 0x1D670, end: 0x1D6A3 }, // Monospace
      { start: 0xFF21, end: 0xFF3A }, // Fullwidth
    ],
    decorators: ['🎮', '🕹️', '👾', '🎯', '🏆', '⚡', '🔥', '💥', '🚀', '🎪']
  },
  'retro-font-generator': {
    name: 'Retro Font',
    category: 'vintage',
    unicodeRanges: [
      { start: 0x1D504, end: 0x1D537 }, // Fraktur
      { start: 0x1D49C, end: 0x1D4CF }, // Script
    ],
    decorators: ['📻', '📺', '🎞️', '📼', '💿', '📀', '🎵', '🎶', '🎤', '🎧']
  },
  'vintage-font-generator': {
    name: 'Vintage Font',
    category: 'classic',
    unicodeRanges: [
      { start: 0x1D504, end: 0x1D537 }, // Fraktur
      { start: 0x1D56C, end: 0x1D59F }, // Bold Fraktur
    ],
    decorators: ['🕰️', '⏰', '📜', '🗞️', '📰', '📖', '📚', '🖋️', '✒️', '🕯️']
  },
  'neon-font-generator': {
    name: 'Neon Font',
    category: 'glowing',
    unicodeRanges: [
      { start: 0x1D5D4, end: 0x1D607 }, // Sans-serif Bold
      { start: 0x1D63C, end: 0x1D66F }, // Sans-serif Bold Italic
    ],
    decorators: ['💡', '🌟', '✨', '💫', '⚡', '🔥', '🌈', '🎆', '🎇', '💎']
  },
  'glitch-font-generator': {
    name: 'Glitch Font',
    category: 'corrupted',
    unicodeRanges: [],
    decorators: ['⚡', '💥', '🔥', '👾', '🤖', '💻', '📺', '🎮', '🕹️', '⚠️'],
    glitchChars: ['҉', '̸', '̷', '̴', '̵', '̶', '̡', '̢', '̧', '̨', '̩', '̪', '̫', '̬', '̭', '̮']
  }
};

// Extended Unicode blocks for more variations
const UNICODE_BLOCKS = {
  // Mathematical Alphanumeric Symbols (various styles)
  MATH_BOLD: { start: 0x1D400, end: 0x1D7FF },
  MATH_ITALIC: { start: 0x1D434, end: 0x1D467 },
  MATH_BOLD_ITALIC: { start: 0x1D468, end: 0x1D49B },
  SCRIPT: { start: 0x1D49C, end: 0x1D4CF },
  BOLD_SCRIPT: { start: 0x1D4D0, end: 0x1D503 },
  FRAKTUR: { start: 0x1D504, end: 0x1D537 },
  BOLD_FRAKTUR: { start: 0x1D56C, end: 0x1D59F },
  SANS_SERIF: { start: 0x1D5A0, end: 0x1D5D3 },
  SANS_SERIF_BOLD: { start: 0x1D5D4, end: 0x1D607 },
  SANS_SERIF_ITALIC: { start: 0x1D608, end: 0x1D63B },
  SANS_SERIF_BOLD_ITALIC: { start: 0x1D63C, end: 0x1D66F },
  MONOSPACE: { start: 0x1D670, end: 0x1D6A3 },
  
  // Additional Unicode blocks
  CIRCLED: { start: 0x24B6, end: 0x24E9 }, // Circled Latin
  PARENTHESIZED: { start: 0x2474, end: 0x249B }, // Parenthesized Latin
  FULLWIDTH: { start: 0xFF21, end: 0xFF3A }, // Fullwidth Latin
  
  // Custom ranges for more variations
  CUSTOM_1: { start: 0x1F100, end: 0x1F1FF },
  CUSTOM_2: { start: 0x1F300, end: 0x1F3FF },
  CUSTOM_3: { start: 0x1F400, end: 0x1F4FF },
  CUSTOM_4: { start: 0x1F500, end: 0x1F5FF },
  CUSTOM_5: { start: 0x1F600, end: 0x1F64F },
  CUSTOM_6: { start: 0x1F680, end: 0x1F6FF },
  CUSTOM_7: { start: 0x1F900, end: 0x1F9FF }
};

// Helper function to get a character from a block with variant offset
const getCharFromBlock = (baseChar: string, block: { start: number; end: number }, variant: number = 0): string => {
  const code = baseChar.charCodeAt(0);
  
  // Handle uppercase letters (A-Z)
  if (code >= 65 && code <= 90) {
    const blockSize = block.end - block.start + 1;
    const offset = (variant * 26) % (blockSize - 25);
    const charCode = block.start + (code - 65) + offset;
    
    // Ensure the character code is within the valid range
    if (charCode <= block.end) {
      return String.fromCodePoint(charCode);
    }
  }
  // Handle lowercase letters (a-z)
  else if (code >= 97 && code <= 122) {
    const blockSize = block.end - block.start + 1;
    const offset = (variant * 26) % (blockSize - 25);
    const charCode = block.start + 26 + (code - 97) + offset;
    
    // Ensure the character code is within the valid range
    if (charCode <= block.end) {
      return String.fromCodePoint(charCode);
    }
  }
  // Handle numbers (0-9)
  else if (code >= 48 && code <= 57) {
    const blockSize = block.end - block.start + 1;
    const offset = (variant * 10) % (blockSize - 9);
    const charCode = block.start + (code - 48) + offset;
    
    // Ensure the character code is within the valid range
    if (charCode <= block.end) {
      return String.fromCodePoint(charCode);
    }
  }
  
  // Return the original character if no transformation is applied
  return baseChar;
};

// Removed unused function: getVariantChar

// Removed unused function: applyStyleWithVariant

// Function to generate unique variations for each font type
const generateFontVariations = (baseText: string, count: number, type: string): UnicodeVariation[] => {
  // If no text is provided, return an empty array
  if (!baseText || baseText.trim() === '') {
    return [];
  }
  
  // Define unicode character ranges for different styles with multiple variants
  const styles: StyleVariations = {
    // Fancy styles with multiple variants
    fancy: {
      uppercase: (c: string, variant: number = 0) => 
        getCharFromBlock(c, UNICODE_BLOCKS.SANS_SERIF_BOLD, variant),
      lowercase: (c: string, variant: number = 0) => 
        getCharFromBlock(c, { start: UNICODE_BLOCKS.SANS_SERIF_BOLD.start + 26, end: UNICODE_BLOCKS.SANS_SERIF_BOLD.end }, variant),
      variants: 50,
      className: 'font-sans font-bold'
    },
    bold: {
      uppercase: (c: string, variant: number = 0) => 
        getCharFromBlock(c, UNICODE_BLOCKS.MATH_BOLD, variant),
      lowercase: (c: string, variant: number = 0) => 
        getCharFromBlock(c, { start: UNICODE_BLOCKS.MATH_BOLD.start + 26, end: UNICODE_BLOCKS.MATH_BOLD.end }, variant),
      variants: 50,
      className: 'font-bold'
    },
    italic: {
      uppercase: (c: string, variant: number = 0) => 
        getCharFromBlock(c, UNICODE_BLOCKS.MATH_ITALIC, variant),
      lowercase: (c: string, variant: number = 0) => 
        getCharFromBlock(c, { start: UNICODE_BLOCKS.MATH_ITALIC.start + 26, end: UNICODE_BLOCKS.MATH_ITALIC.end }, variant),
      variants: 50,
      className: 'italic'
    },
    cursive: {
      uppercase: (c: string, variant: number = 0) => 
        getCharFromBlock(c, UNICODE_BLOCKS.SCRIPT, variant),
      lowercase: (c: string, variant: number = 0) => 
        getCharFromBlock(c, { start: UNICODE_BLOCKS.SCRIPT.start + 26, end: UNICODE_BLOCKS.SCRIPT.end }, variant),
      variants: 50,
      className: 'font-cursive'
    },
    bubble: {
      uppercase: (c: string, variant: number = 0) => 
        getCharFromBlock(c, UNICODE_BLOCKS.CIRCLED, variant),
      lowercase: (c: string, variant: number = 0) => 
        getCharFromBlock(c, { start: UNICODE_BLOCKS.CIRCLED.start + 26, end: UNICODE_BLOCKS.CIRCLED.end }, variant),
      variants: 30,
      className: 'rounded-full bg-blue-100 px-2 py-1 inline-block m-0.5'
    },
    // Add more styles for other font types
    strikethrough: {
      uppercase: (c: string) => `${c}̶`,
      lowercase: (c: string) => `${c}̶`,
    },
    underline: {
      uppercase: (c: string) => `${c}̲`,
      lowercase: (c: string) => `${c}̲`,
    },
    smallCaps: {
      uppercase: (c: string) => c.toUpperCase(),
      lowercase: (c: string) => c.toUpperCase(),
    },
    reverse: {
      transform: (text: string) => text.split('').reverse().join(''),
      uppercase: (c: string) => c,
      lowercase: (c: string) => c,
    },
    zalgo: {
      marks: [
        '̴', '̷', '̸', '̺', '̻', '̼', 'ͅ', '͇', '͈', '͉', '͍', '͎', '͓', '͔', '͕', '͖', '͙', '͚', '͛', '͊', '͋', '͌', '̃', '̂', '̄', '̅', '̿', '̑', '̆', '̐', '͒', '͗', '͑', '̇', '̈', '̊', '͢', '͠', '͡'
      ],
      transform: (text: string) => {
        let result = '';
        for (const c of text) {
          result += c;
          // Add 1-3 random zalgo marks after each character
          const numMarks = 1 + Math.floor(Math.random() * 3);
          for (let i = 0; i < numMarks; i++) {
            result += (styles.zalgo.marks as string[])[Math.floor(Math.random() * (styles.zalgo.marks as string[]).length)];
          }
        }
        return result;
      },
      uppercase: (c: string) => c,
      lowercase: (c: string) => c,
    },
    boldItalic: {
      uppercase: (c: string) => String.fromCharCode(0x1D63C + c.charCodeAt(0) - 65),
      lowercase: (c: string) => String.fromCharCode(0x1D656 + c.charCodeAt(0) - 97),
    },
    boldCursive: {
      uppercase: (c: string) => String.fromCharCode(0x1D4D0 + c.charCodeAt(0) - 65),
      lowercase: (c: string) => String.fromCharCode(0x1D4EA + c.charCodeAt(0) - 97),
    },
    italicCursive: {
      uppercase: (c: string) => String.fromCharCode(0x1D4D0 + c.charCodeAt(0) - 65),
      lowercase: (c: string) => String.fromCharCode(0x1D4EA + c.charCodeAt(0) - 97),
    },
  };

  // Helper function to apply style transformation with variant support
  const applyStyle = (c: string, style: { 
    uppercase: string[] | StyleFunction; 
    lowercase: string[] | StyleFunction;
    className?: string;
  }, variant: number = 0): { char: string; className?: string } => {
    const code = c.charCodeAt(0);
    let result = '';
    
    try {
      // Handle uppercase letters (A-Z)
      if (code >= 65 && code <= 90) {
        if (typeof style.uppercase === 'function') {
          result = style.uppercase(c, variant);
        } else if (Array.isArray(style.uppercase) && style.uppercase[code - 65]) {
          result = style.uppercase[code - 65];
        } else {
          result = c; // Return original character if no transformation is defined
        }
      }
      // Handle lowercase letters (a-z)
      else if (code >= 97 && code <= 122) {
        if (typeof style.lowercase === 'function') {
          result = style.lowercase(c, variant);
        } else if (Array.isArray(style.lowercase) && style.lowercase[code - 97]) {
          result = style.lowercase[code - 97];
        } else {
          result = c; // Return original character if no transformation is defined
        }
      }
      // Handle numbers (0-9)
      else if (code >= 48 && code <= 57) {
        // For numbers, we can use the same transformation as uppercase letters
        // or provide a custom transformation if needed
        if (typeof style.uppercase === 'function') {
          result = style.uppercase(String.fromCharCode(code + 17), variant);
        } else if (Array.isArray(style.uppercase) && style.uppercase[code - 48]) {
          result = style.uppercase[code - 48];
        } else {
          result = c; // Return original character if no transformation is defined
        }
      }
      // Handle other characters (spaces, punctuation, etc.)
      else {
        result = c; // Return original character for other characters
      }
      
      // Ensure the result is a valid string
      if (typeof result !== 'string' || result === '') {
        result = c;
      }
    } catch (error) {
      console.error('Error applying style:', error);
      result = c; // Return original character if an error occurs
    }
    
    return {
      char: result,
      className: style.className
    };
  };

  // Generate more variations by combining different transformations
  const generateCombinedVariations = (text: string, count: number): UnicodeVariation[] => {
    const results: UnicodeVariation[] = [];
    const fontTypeKey = type.replace('-font-generator', '');
    const style = styles[fontTypeKey as keyof typeof styles];
    
    if (!style) return [];
    
    // Generate base variations
    const baseCount = Math.min(count, 200);
    for (let i = 0; i < baseCount; i++) {
      let transformedText = '';
      const variant = i;
      const variantIndex = style.variants ? variant % style.variants : 0;
      
      // Apply style to each character with variant
      const transformedChars = text.split('').map(c => {
        const result = applyStyle(c, style, variantIndex);
        return result;
      });
      
      // Combine characters and their class names
      transformedText = transformedChars.map(t => t.char).join('');
      
      // Get unique class names from all characters
      const classNames = Array.from(new Set(
        transformedChars.map(t => t.className).filter(Boolean)
      )).join(' ');
      
      // Add decorative elements for more variety
      if (i % 5 === 0) {
        // Add decorative elements to some variations
        const decorations = ['✨', '⚡', '❄️', '★', '☆', '✧', '✦', '✪', '✯', '✵'];
        const deco = decorations[Math.floor(Math.random() * decorations.length)];
        transformedText = `${deco} ${transformedText} ${deco}`;
      }
      
      results.push({
        id: i,
        name: `${fontTypeKey.charAt(0).toUpperCase() + fontTypeKey.slice(1)} Style ${i + 1}`,
        unicode: transformedText,
        preview: transformedText.substring(0, 20) + (transformedText.length > 20 ? '...' : ''),
        className: classNames,
        fontType: type
      });
    }
    
    // If we need more variations, generate some with combined styles
    if (results.length < count) {
      const remaining = count - results.length;
      const otherStyles = Object.entries(styles).filter(([key]) => key !== fontTypeKey);
      
      for (let i = 0; i < remaining; i++) {
        const [otherKey, otherStyle] = otherStyles[i % otherStyles.length];
        const variant = i % 10;
        let combinedText = text;
        
        // Apply base style
        combinedText = combinedText.split('').map(c => applyStyle(c, style, variant)).join('');
        
        // Apply secondary style to some characters
        combinedText = combinedText.split('').map((c, idx) => {
          if (idx % 2 === 0) {
            return applyStyle(c, otherStyle as { uppercase: string[] | StyleFunction; lowercase: string[] | StyleFunction; className?: string }, variant);
          }
          return c;
        }).join('');
        
        results.push({
          id: baseCount + i,
          name: `${fontTypeKey.charAt(0).toUpperCase() + fontTypeKey.slice(1)}-${otherKey} Combo ${i + 1}`,
          unicode: combinedText,
          preview: combinedText.substring(0, 20) + (combinedText.length > 20 ? '...' : ''),
          fontType: type
        });
      }
    }
    
    return results;
  };
  
  // Generate the variations
  const generatedVariations = generateCombinedVariations(baseText, count);
  return generatedVariations.slice(0, count);
};

// Cache for generated variations
const variationCache: {[key: string]: UnicodeVariation[]} = {};

// Function to get variations for a specific font type
export const getFontVariations = (fontType: string, baseText: string, count: number = 300): UnicodeVariation[] => {
  // If no text is provided, return an empty array
  if (!baseText || baseText.trim() === '') {
    return [];
  }

  // Create a cache key that includes the font type, text, and count
  const cacheKey = `${fontType}:${baseText.substring(0, 50)}:${count}`;
  
  try {
    // Return cached result if available
    if (variationCache[cacheKey]) {
      return variationCache[cacheKey];
    }
    
    // Generate the variations
    const variations = generateFontVariations(baseText, count, fontType);
    
    // Cache the result
    variationCache[cacheKey] = variations;
    
    // Prevent memory leaks by limiting cache size
    const cacheKeys = Object.keys(variationCache);
    if (cacheKeys.length > 1000) {
      // Remove the oldest entries (first 100)
      for (let i = 0; i < 100; i++) {
        delete variationCache[cacheKeys[i]];
      }
    }
    
    return variations;
  } catch (error) {
    console.error(`Error generating font variations for type '${fontType}':`, error);
    
    // Return a default variation if there's an error
    return [{
      id: 0,
      name: 'Default',
      unicode: baseText,
      preview: baseText.length > 20 ? baseText.substring(0, 20) + '...' : baseText,
      className: '',
      fontType: fontType
    }];
  }
};

// Function to get all font variations for a platform
export const getAllFontVariations = (baseText: string): FontVariations => {
  const allVariations: FontVariations = {};
  
  // Return empty result if no text is provided
  if (!baseText || baseText.trim() === '') {
    return allVariations;
  }
  
  try {
    // Define default font types if FONT_TYPES is not available
    const fontTypes = FONT_TYPES || [
      'fancy', 'bold', 'italic', 'cursive', 'bubble', 
      'strikethrough', 'underline', 'smallCaps', 'reverse', 'zalgo',
      'boldItalic', 'boldCursive', 'italicCursive'
    ];
    
    // Generate variations for each font type
    for (const fontType of fontTypes) {
      try {
        allVariations[fontType] = getFontVariations(fontType, baseText, 300);
      } catch (error) {
        console.error(`Error generating variations for font type '${fontType}':`, error);
        // Skip this font type if there's an error
        continue;
      }
    }
    
    return allVariations;
  } catch (error) {
    console.error('Error generating all font variations:', error);
    return {};
  }
};
