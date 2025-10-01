// lib/font-maps.ts
// Unicode-based transformers for realistic, copy-pasteable styled text.
// IMPORTANT: Only Unicode codepoints can be copied across apps. Web fonts like "Comic Sans"
// change rendering, not characters, so they can't be copied as that font. We approximate with
// visually consistent Unicode blocks (Mathematical Alphanumerics, Runic, etc.).

export type Transformer = (input: string) => string;

function mapByAlphabet(input: string, map: Partial<Record<string, string>>): string {
  let out = '';
  for (const ch of input) {
    out += map[ch] ?? map[ch.toLowerCase()] ?? ch;
  }
  return out;
}

function makeAlphaMap(lower: string, upper?: string): Partial<Record<string, string>> {
  // lower should contain 26 characters mapping for a-z
  const m: Partial<Record<string, string>> = {};
  const aCode = 'a'.charCodeAt(0);
  for (let i = 0; i < 26; i++) {
    const srcLower = String.fromCharCode(aCode + i);
    m[srcLower] = lower[i] ?? srcLower;
  }
  if (upper) {
    const ACode = 'A'.charCodeAt(0);
    for (let i = 0; i < 26; i++) {
      const srcUpper = String.fromCharCode(ACode + i);
      m[srcUpper] = upper[i] ?? srcUpper;
    }
  }
  return m;
}

// Core Unicode families
function mathBold(): Partial<Record<string, string>> {
  const m: Partial<Record<string, string>> = {};
  const A = 0x1D400, a = 0x1D41A; // Mathematical Bold A/a
  for (let i = 0; i < 26; i++) {
    m[String.fromCharCode(65 + i)] = String.fromCodePoint(A + i);
    m[String.fromCharCode(97 + i)] = String.fromCodePoint(a + i);
  }
  return m;
}

function mathItalic(): Partial<Record<string, string>> {
  const m: Partial<Record<string, string>> = {};
  const A = 0x1D434, a = 0x1D44E; // Mathematical Italic
  for (let i = 0; i < 26; i++) {
    m[String.fromCharCode(65 + i)] = String.fromCodePoint(A + i);
    m[String.fromCharCode(97 + i)] = String.fromCodePoint(a + i);
  }
  return m;
}

function mathScript(): Partial<Record<string, string>> {
  const m: Partial<Record<string, string>> = {};
  const A = 0x1D49C, a = 0x1D4B6; // Mathematical Script
  const special = new Map<number, number>([
    [0x42, 0x212C], // B
    [0x45, 0x2130], // E
    [0x46, 0x2131], // F
    [0x48, 0x210B], // H
    [0x49, 0x2110], // I
    [0x4C, 0x2112], // L
    [0x4D, 0x2133], // M
    [0x52, 0x211B], // R
  ]);
  for (let i = 0; i < 26; i++) {
    const up = 65 + i;
    m[String.fromCharCode(up)] = String.fromCodePoint(special.get(up) ?? (A + i));
    m[String.fromCharCode(97 + i)] = String.fromCodePoint(a + i);
  }
  return m;
}

function mathFraktur(bold = false): Partial<Record<string, string>> {
  const m: Partial<Record<string, string>> = {};
  const A = bold ? 0x1D56C : 0x1D504; // Bold Fraktur / Fraktur
  const a = bold ? 0x1D586 : 0x1D51E;
  const special = new Map<number, number>([
    [0x43, 0x212D], // C
    [0x48, 0x210C], // H
    [0x49, 0x2111], // I
    [0x52, 0x211C], // R
    [0x5A, 0x2128], // Z
  ]);
  for (let i = 0; i < 26; i++) {
    const up = 65 + i;
    m[String.fromCharCode(up)] = String.fromCodePoint(special.get(up) ?? (A + i));
    m[String.fromCharCode(97 + i)] = String.fromCodePoint(a + i);
  }
  return m;
}

function mathMonospace(): Partial<Record<string, string>> {
  const m: Partial<Record<string, string>> = {};
  const A = 0x1D670, a = 0x1D68A; // Mathematical Monospace
  for (let i = 0; i < 26; i++) {
    m[String.fromCharCode(65 + i)] = String.fromCodePoint(A + i);
    m[String.fromCharCode(97 + i)] = String.fromCodePoint(a + i);
  }
  return m;
}

function fullwidth(): Partial<Record<string, string>> {
  const m: Partial<Record<string, string>> = {};
  // A-Z
  for (let i = 0; i < 26; i++) {
    m[String.fromCharCode(65 + i)] = String.fromCodePoint(0xFF21 + i);
    m[String.fromCharCode(97 + i)] = String.fromCodePoint(0xFF41 + i);
  }
  // digits
  for (let i = 0; i < 10; i++) m[String.fromCharCode(48 + i)] = String.fromCodePoint(0xFF10 + i);
  return m;
}

function smallCaps(): Partial<Record<string, string>> {
  const map: Partial<Record<string, string>> = {
    a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ғ', g: 'ɢ', h: 'ʜ', i: 'ɪ', j: 'ᴊ',
    k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 's', t: 'ᴛ',
    u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ',
  };
  return map;
}

function bubble(): Partial<Record<string, string>> {
  const lower = 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ';
  const upper = 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ';
  return makeAlphaMap(lower, upper);
}

function squared(): Partial<Record<string, string>> {
  const lower = '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉'.toLowerCase();
  const upper = '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉';
  return makeAlphaMap(lower, upper);
}

function greekLookalike(): Partial<Record<string, string>> {
  return {
    A: 'Α', B: 'Β', C: 'Ͼ', D: 'Δ', E: 'Ε', F: 'Ϝ', G: 'Γ', H: 'Η', I: 'Ι', J: 'Ϳ',
    K: 'Κ', L: 'ʟ', M: 'Μ', N: 'Ν', O: 'Ο', P: 'Ρ', Q: 'Θ', R: 'ϱ', S: 'Ѕ', T: 'Τ',
    U: 'ᵾ', V: 'ν', W: 'Ѡ', X: 'Χ', Y: 'Υ', Z: 'Ζ',
    a: 'α', b: 'Ь', c: 'ς', d: 'δ', e: 'ε', f: 'ғ', g: 'ɣ', h: 'η', i: 'ι', j: 'ϳ',
    k: 'κ', l: 'ʟ', m: 'м', n: 'п', o: 'ο', p: 'ρ', q: 'φ', r: 'г', s: 'ѕ', t: 'τ',
    u: 'υ', v: 'ν', w: 'ω', x: 'χ', y: 'γ', z: 'ζ',
  };
}

function cyrillicLookalike(): Partial<Record<string, string>> {
  return {
    A: 'A', B: 'В', C: 'С', D: 'Д', E: 'Е', F: 'Ғ', G: 'Г', H: 'Н', I: 'І', J: 'Ј',
    K: 'К', L: 'Ꮮ', M: 'М', N: 'Н', O: 'О', P: 'Р', Q: 'Ԛ', R: 'Я', S: 'Ѕ', T: 'Т',
    U: 'Ⴎ', V: 'Ѵ', W: 'Ш', X: 'Х', Y: 'Ү', Z: 'Ζ',
    a: 'а', b: 'Ь', c: 'с', d: 'ԁ', e: 'е', f: 'ғ', g: 'ɡ', h: 'һ', i: 'і', j: 'ј',
    k: 'к', l: 'ӏ', m: 'м', n: 'п', o: 'о', p: 'р', q: 'զ', r: 'г', s: 'ѕ', t: 'т',
    u: 'ս', v: 'ѵ', w: 'ш', x: 'х', y: 'у', z: 'ᴢ',
  };
}

function runic(): Partial<Record<string, string>> {
  // Very approximate Latin -> Runic letters
  return {
    a: 'ᚨ', b: 'ᛒ', c: 'ᚲ', d: 'ᛞ', e: 'ᛖ', f: 'ᚠ', g: 'ᚷ', h: 'ᚺ', i: 'ᛁ', j: 'ᛃ',
    k: 'ᚲ', l: 'ᛚ', m: 'ᛗ', n: 'ᚾ', o: 'ᛟ', p: 'ᛈ', q: 'ᛩ', r: 'ᚱ', s: 'ᛊ', t: 'ᛏ',
    u: 'ᚢ', v: 'ᚡ', w: 'ᚹ', x: 'ᛪ', y: 'ᛦ', z: 'ᛉ',
    A: 'ᚨ', B: 'ᛒ', C: 'ᚲ', D: 'ᛞ', E: 'ᛖ', F: 'ᚠ', G: 'ᚷ', H: 'ᚺ', I: 'ᛁ', J: 'ᛃ',
    K: 'ᚲ', L: 'ᛚ', M: 'ᛗ', N: 'ᚾ', O: 'ᛟ', P: 'ᛈ', Q: 'ᛩ', R: 'ᚱ', S: 'ᛊ', T: 'ᛏ',
    U: 'ᚢ', V: 'ᚡ', W: 'ᚹ', X: 'ᛪ', Y: 'ᛦ', Z: 'ᛉ',
  };
}

function alienAlphabet(): Partial<Record<string, string>> {
  // Based on Misc Technical and other symbols to match example shyam -> ⌇⊑⊬⏃⋔
  return {
    a: '⏃', b: '⏚', c: '☾', d: '⎅', e: '⟟', f: '⎎', g: '⥕', h: '⊑', i: '⟇', j: '⋉',
    k: '⌰', l: '⎐', m: '⋔', n: '⋔', o: '⍜', p: '⌿', q: '⍾', r: '⟟', s: '⌇', t: '⟟',
    u: '⊎', v: '⋎', w: '⋏', x: '⌖', y: '⊬', z: '⋊',
    A: '⏃', B: '⏚', C: '☾', D: '⎅', E: '⟟', F: '⎎', G: '⥕', H: '⊑', I: '⟇', J: '⋉',
    K: '⌰', L: '⎐', M: '⋔', N: '⋔', O: '⍜', P: '⌿', Q: '⍾', R: '⟟', S: '⌇', T: '⟟',
    U: '⊎', V: '⋎', W: '⋏', X: '⌖', Y: '⊬', Z: '⋊',
  };
}

function toTransformer(map: Partial<Record<string, string>>): Transformer {
  return (input: string) => mapByAlphabet(input, map);
}

// Registry: map slug patterns to transformers
const registry: Array<{ match: (slug: string) => boolean; transformer: Transformer }> = [
  { match: (s) => s.includes('alien'), transformer: toTransformer(alienAlphabet()) },
  { match: (s) => s.includes('runic'), transformer: toTransformer(runic()) },
  { match: (s) => s.includes('greek'), transformer: toTransformer(greekLookalike()) },
  { match: (s) => s.includes('cyrillic'), transformer: toTransformer(cyrillicLookalike()) },
  { match: (s) => s.includes('bubble'), transformer: toTransformer(bubble()) },
  { match: (s) => s.includes('square') || s.includes('squared'), transformer: toTransformer(squared()) },
  { match: (s) => s.includes('fraktur') || s.includes('blackletter') || s.includes('gothic'), transformer: toTransformer(mathFraktur(false)) },
  { match: (s) => s.includes('bold-fraktur') || s.includes('bold-gothic'), transformer: toTransformer(mathFraktur(true)) },
  { match: (s) => s.includes('monospace') || s.includes('typewriter'), transformer: toTransformer(mathMonospace()) },
  { match: (s) => s.includes('fullwidth') || s.includes('wide'), transformer: toTransformer(fullwidth()) },
  { match: (s) => s.includes('small-caps') || s.includes('smallcaps'), transformer: toTransformer(smallCaps()) },
  { match: (s) => s.includes('script') || s.includes('cursive'), transformer: toTransformer(mathScript()) },
  { match: (s) => s.includes('italic'), transformer: toTransformer(mathItalic()) },
  { match: (s) => s.includes('bold'), transformer: toTransformer(mathBold()) },
];

const fallback: Transformer = (t) => `✨ ${t} ✨`;

export function transformTextBySlug(slug: string, text: string): string {
  const rule = registry.find((r) => r.match(slug));
  if (rule) return rule.transformer(text);
  // Heuristic defaults for broad buckets
  if (/run(e|i)c|rune/.test(slug)) return toTransformer(runic())(text);
  if (/greek/.test(slug)) return toTransformer(greekLookalike())(text);
  if (/cyrillic/.test(slug)) return toTransformer(cyrillicLookalike())(text);
  if (/bubble|circled/.test(slug)) return toTransformer(bubble())(text);
  if (/square|squared|box/.test(slug)) return toTransformer(squared())(text);
  return fallback(text);
}
