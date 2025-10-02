// lib/unicode-variations.ts
import { FONT_TYPES } from './constants';

export type UnicodeVariation = {
  id: number;
  name: string;
  unicode: string;
  preview: string;
  className?: string; // Add className for custom styling
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
  };
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
  if (code >= 65 && code <= 90) { // Uppercase
    const offset = (variant * 26) % (block.end - block.start - 25);
    return String.fromCodePoint(block.start + (code - 65) + offset);
  } else if (code >= 97 && code <= 122) { // Lowercase
    const offset = (variant * 26) % (block.end - block.start - 25);
    return String.fromCodePoint(block.start + (code - 97) + 26 + offset);
  }
  return baseChar;
};

// Removed unused function: getVariantChar

// Removed unused function: applyStyleWithVariant

// Function to generate unique variations for each font type
const generateFontVariations = (baseText: string, count: number, type: string): UnicodeVariation[] => {
  
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
    
    if (code >= 65 && code <= 90) {
      result = typeof style.uppercase === 'function' 
        ? style.uppercase(c, variant)
        : (style.uppercase as string[])[code - 65] || c;
    } else if (code >= 97 && code <= 122) {
      result = typeof style.lowercase === 'function'
        ? style.lowercase(c, variant)
        : (style.lowercase as string[])[code - 97] || c;
    } else {
      result = c;
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
        className: classNames
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
          preview: combinedText.substring(0, 20) + (combinedText.length > 20 ? '...' : '')
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
  const cacheKey = `${fontType}-${baseText}`;
  
  if (!variationCache[cacheKey]) {
    variationCache[cacheKey] = generateFontVariations(baseText, count, fontType);
  }
  
  return variationCache[cacheKey];
};

// Function to get all font variations for a platform
export const getAllFontVariations = (baseText: string): FontVariations => {
  const allVariations: FontVariations = {};
  
  // Define default font types if FONT_TYPES is not available
  const fontTypes = FONT_TYPES || [
    'fancy', 'bold', 'italic', 'cursive', 'bubble', 
    'strikethrough', 'underline', 'small-caps', 'reverse', 'zalgo',
    'bold-italic', 'bold-cursive', 'italic-cursive', 'bold-italic-cursive'
  ];
  
  fontTypes.forEach(fontType => {
    allVariations[fontType] = getFontVariations(fontType, baseText, 300);
  });
  
  return allVariations;
};
