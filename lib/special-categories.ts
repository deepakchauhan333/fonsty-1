import { CategorySlug } from './platforms';

type CategoryStyle = {
  bgColor: string;
  textColor: string;
  buttonColor: string;
  fontFamily: string;
  description: string;
  keywords: string[];
};

export const SPECIAL_CATEGORIES: Record<string, CategoryStyle> = {
  'attitude': {
    bgColor: 'bg-gradient-to-br from-gray-900 to-gray-800',
    textColor: 'text-white',
    buttonColor: 'bg-red-600 hover:bg-red-700',
    fontFamily: 'font-bold',
    description: 'Generate bold and edgy attitude text styles that make a statement.',
    keywords: ['edgy', 'bold', 'cool', 'rebel', 'attitude']
  },
  'boy': {
    bgColor: 'bg-gradient-to-br from-blue-600 to-blue-800',
    textColor: 'text-white',
    buttonColor: 'bg-blue-700 hover:bg-blue-800',
    fontFamily: 'font-bold',
    description: 'Strong and masculine text styles perfect for boys.',
    keywords: ['boy', 'male', 'masculine', 'strong', 'bold']
  },
  'girl': {
    bgColor: 'bg-gradient-to-br from-pink-400 to-purple-500',
    textColor: 'text-white',
    buttonColor: 'bg-pink-500 hover:bg-pink-600',
    fontFamily: 'font-cursive',
    description: 'Cute and girly text styles with a feminine touch.',
    keywords: ['girl', 'female', 'cute', 'girly', 'pink']
  },
  'weird': {
    bgColor: 'bg-gradient-to-br from-green-600 to-purple-700',
    textColor: 'text-white',
    buttonColor: 'bg-purple-600 hover:bg-purple-700',
    fontFamily: 'font-mono',
    description: 'Weird and unusual text styles that stand out.',
    keywords: ['weird', 'strange', 'unique', 'unusual', 'different']
  },
  'squiggle': {
    bgColor: 'bg-gradient-to-br from-yellow-400 to-orange-500',
    textColor: 'text-white',
    buttonColor: 'bg-orange-500 hover:bg-orange-600',
    fontFamily: 'font-sans',
    description: 'Fun and wavy squiggle text styles.',
    keywords: ['squiggle', 'wavy', 'fun', 'curly', 'playful']
  },
  'boxed': {
    bgColor: 'bg-gradient-to-br from-gray-200 to-gray-300',
    textColor: 'text-gray-900',
    buttonColor: 'bg-gray-800 hover:bg-gray-900',
    fontFamily: 'font-mono',
    description: 'Clean and structured boxed text styles.',
    keywords: ['boxed', 'square', 'clean', 'modern', 'geometric']
  },
  'cursive': {
    bgColor: 'bg-gradient-to-br from-rose-400 to-pink-500',
    textColor: 'text-white',
    buttonColor: 'bg-pink-600 hover:bg-pink-700',
    fontFamily: 'font-cursive',
    description: 'Elegant and flowing cursive text styles.',
    keywords: ['cursive', 'elegant', 'fancy', 'script', 'handwriting']
  },
  'fancy': {
    bgColor: 'bg-gradient-to-br from-purple-600 to-indigo-700',
    textColor: 'text-white',
    buttonColor: 'bg-indigo-600 hover:bg-indigo-700',
    fontFamily: 'font-serif',
    description: 'Fancy and decorative text styles for special occasions.',
    keywords: ['fancy', 'decorative', 'elegant', 'stylish', 'classy']
  },
  'bubble': {
    bgColor: 'bg-gradient-to-br from-blue-400 to-cyan-500',
    textColor: 'text-white',
    buttonColor: 'bg-cyan-500 hover:bg-cyan-600',
    fontFamily: 'font-sans',
    description: 'Fun and playful bubble text styles.',
    keywords: ['bubble', 'round', 'fun', 'playful', 'cartoon']
  },
  'bio-names': {
    bgColor: 'bg-gradient-to-br from-teal-500 to-green-600',
    textColor: 'text-white',
    buttonColor: 'bg-green-600 hover:bg-green-700',
    fontFamily: 'font-sans',
    description: 'Stylish text perfect for bios and names.',
    keywords: ['bio', 'name', 'username', 'profile', 'social']
  },
  'bio-texts': {
    bgColor: 'bg-gradient-to-br from-emerald-400 to-teal-500',
    textColor: 'text-white',
    buttonColor: 'bg-teal-600 hover:bg-teal-700',
    fontFamily: 'font-sans',
    description: 'Perfect text styles for your social media bios.',
    keywords: ['bio', 'description', 'about', 'profile', 'social']
  },
  'blue': {
    bgColor: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    textColor: 'text-white',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
    fontFamily: 'font-sans',
    description: 'Beautiful blue-themed text styles.',
    keywords: ['blue', 'ocean', 'sky', 'cool', 'calm']
  },
  'hit': {
    bgColor: 'bg-gradient-to-br from-red-600 to-orange-600',
    textColor: 'text-white',
    buttonColor: 'bg-red-600 hover:bg-red-700',
    fontFamily: 'font-bold',
    description: 'Bold and impactful text styles that hit hard.',
    keywords: ['hit', 'impact', 'bold', 'strong', 'power']
  },
  'joiner': {
    bgColor: 'bg-gradient-to-br from-amber-400 to-orange-500',
    textColor: 'text-white',
    buttonColor: 'bg-orange-500 hover:bg-orange-600',
    fontFamily: 'font-sans',
    description: 'Text styles that connect and join words beautifully.',
    keywords: ['joiner', 'connect', 'link', 'combine', 'merge']
  },
  'arrow': {
    bgColor: 'bg-gradient-to-br from-gray-700 to-gray-900',
    textColor: 'text-white',
    buttonColor: 'bg-gray-800 hover:bg-black',
    fontFamily: 'font-sans',
    description: 'Text styles with arrow decorations and pointers.',
    keywords: ['arrow', 'direction', 'point', 'navigate', 'guide']
  },
  'bricks': {
    bgColor: 'bg-gradient-to-br from-amber-800 to-amber-900',
    textColor: 'text-white',
    buttonColor: 'bg-amber-700 hover:bg-amber-800',
    fontFamily: 'font-sans',
    description: 'Brick-like text styles with a solid feel.',
    keywords: ['bricks', 'blocks', 'construction', 'solid', 'strong']
  },
  'strikes': {
    bgColor: 'bg-gradient-to-br from-red-700 to-red-900',
    textColor: 'text-white',
    buttonColor: 'bg-red-700 hover:bg-red-800',
    fontFamily: 'font-sans',
    description: 'Strikethrough text styles with impact.',
    keywords: ['strikes', 'strikethrough', 'crossed', 'delete', 'remove']
  }
};

export function isSpecialCategory(slug: string): boolean {
  return Object.keys(SPECIAL_CATEGORIES).includes(slug);
}

export function getSpecialCategoryStyle(slug: string): CategoryStyle | null {
  return SPECIAL_CATEGORIES[slug] || null;
}
