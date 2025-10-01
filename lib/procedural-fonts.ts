// lib/procedural-fonts.ts
// Procedural Unicode Font Style Generator
// This engine creates unique, copy-pasteable text styles for 1000+ fonts.

// A simple hashing function to convert a slug into a deterministic number.
function slugHash(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    const char = slug.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// --- Transformation Primitives ---

// 1. Character Maps (Unicode Alphabets)
const CHAR_MAPS = {
  bold: (c: string) => c.replace(/[A-Za-z]/g, l => String.fromCodePoint(l.charCodeAt(0) + (l.toLowerCase() < 'a' ? 119743 : 119737))),
  italic: (c: string) => c.replace(/[A-Za-z]/g, l => String.fromCodePoint(l.charCodeAt(0) + (l.toLowerCase() < 'a' ? 119795 : 119789))),
  boldItalic: (c: string) => c.replace(/[A-Za-z]/g, l => String.fromCodePoint(l.charCodeAt(0) + (l.toLowerCase() < 'a' ? 119847 : 119841))),
  script: (c: string) => c.replace(/[A-Za-z]/g, l => String.fromCodePoint(l.charCodeAt(0) + (l.toLowerCase() < 'a' ? 119951 : 119945))),
  boldScript: (c: string) => c.replace(/[A-Za-z]/g, l => String.fromCodePoint(l.charCodeAt(0) + 120003)),
  fraktur: (c: string) => c.replace(/[A-Za-z]/g, l => String.fromCodePoint(l.charCodeAt(0) + (l.toLowerCase() < 'a' ? 120055 : 120049))),
  boldFraktur: (c: string) => c.replace(/[A-Za-z]/g, l => String.fromCodePoint(l.charCodeAt(0) + 120107)),
  monospace: (c: string) => c.replace(/[A-Za-z]/g, l => String.fromCodePoint(l.charCodeAt(0) + (l.toLowerCase() < 'a' ? 120215 : 120209))),
  fullwidth: (c: string) => c.replace(/[A-Za-z0-9]/g, l => String.fromCodePoint(l.charCodeAt(0) + 65248)),
  bubble: (c: string) => c.replace(/[A-Za-z]/g, l => String.fromCodePoint(l.charCodeAt(0) + (l.toLowerCase() < 'a' ? 127247 : 127215))),
  invertedBubble: (c: string) => c.replace(/[A-Za-z]/g, l => String.fromCodePoint(l.charCodeAt(0) + 127327)),
  greek: (c: string) => c.replace(/[A-Za-z]/g, l => 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω'[ (l.toLowerCase().charCodeAt(0) - 97 + (l < 'a' ? 26 : 0)) % 52 ] ?? l),
};

// 2. Diacritics (Combining Characters)
const DIACRITICS = {
  strike: (c: string) => c + '\u0336', // Strike through
  underline: (c: string) => c + '\u0332', // Underline
  doubleUnderline: (c: string) => c + '\u0333',
  overline: (c: string) => c + '\u0305',
  slash: (c: string) => c + '\u0338',
  tilde: (c: string) => c + '\u0334', // Tilde through
  dotsAbove: (c: string) => c + '\u0308',
  dotsBelow: (c: string) => c + '\u0324',
  zigzag: (c: string) => c.split('').join('\u033A'),
};

// 3. Affixes (Wrappers)
const AFFIXES = {
  sparkles: (t: string) => `✨${t}✨`,
  hearts: (t: string) => `♥ ${t} ♥`,
  stars: (t: string) => `⭐${t}⭐`,
  brackets: (t: string) => `【${t}】`,
  slashes: (t: string) => `// ${t} //`,
  pointy: (t: string) => `»» ${t} ««`,
  flowy: (t: string) => `༺${t}༻`,
};

// 4. Symbol Substitutions
const SYMBOL_SUBSTITUTIONS = {
  leetspeak: (c: string) => ({ a: '4', e: '3', i: '1', o: '0', s: '5', t: '7' }[c.toLowerCase()] ?? c),
  symbols: (c: string) => ({ a: '@', s: '$', c: '©', r: '®', t: '™' }[c.toLowerCase()] ?? c),
};

const mapKeys = Object.keys(CHAR_MAPS) as (keyof typeof CHAR_MAPS)[];
const diacriticKeys = Object.keys(DIACRITICS) as (keyof typeof DIACRITICS)[];
const affixKeys = Object.keys(AFFIXES) as (keyof typeof AFFIXES)[];
const substitutionKeys = Object.keys(SYMBOL_SUBSTITUTIONS) as (keyof typeof SYMBOL_SUBSTITUTIONS)[];

export function generateProceduralStyle(slug: string, text: string): string {
  const hash = slugHash(slug);

  // Step 1: Choose a base character map
  const baseMap = CHAR_MAPS[mapKeys[hash % mapKeys.length]];
  let transformedText = baseMap(text);

  // Step 2: Decide whether to add diacritics (50% chance)
  if ((hash % 100) > 50) {
    const diacritic = DIACRITICS[diacriticKeys[hash % diacriticKeys.length]];
    transformedText = transformedText.split('').map(diacritic).join('');
  }

  // Step 3: Decide whether to add symbol substitutions (30% chance)
  if ((hash % 100) > 70) {
    const substitution = SYMBOL_SUBSTITUTIONS[substitutionKeys[hash % substitutionKeys.length]];
    transformedText = transformedText.split('').map(substitution).join('');
  }

  // Step 4: Decide whether to add an affix (40% chance)
  if ((hash % 100) > 60) {
    const affix = AFFIXES[affixKeys[hash % affixKeys.length]];
    transformedText = affix(transformedText);
  }

  // Special override for specific slugs for better matching
  if (slug.includes('slash-and-dash')) {
    return text.split('').map(c => c + '\u0338').join('-');
  }
  if (slug.includes('blippi')) {
    // Blippi is colorful, let's use bubble font with sparkles
    return AFFIXES.sparkles(CHAR_MAPS.bubble(text));
  }

  return transformedText;
}
