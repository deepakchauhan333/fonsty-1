'use client';

import { useMemo, useState } from 'react';
import { STYLED_LETTERS_MAP } from '@/lib/styled-letters-map';
import type { CategoryJSON } from '@/lib/platforms';
import { FontCard } from './FontCard';

function applyAlphabet(text: string, alphabetKey: string) {
  const map = STYLED_LETTERS_MAP[alphabetKey];
  if (!map) return text;
  return [...text].map((ch) => map[ch] ?? ch).join('');
}

function applyEffect(text: string, effects?: CategoryJSON['effects']) {
  if (!effects || effects.length === 0) return text;
  let out = text;
  for (const eff of effects) {
    if (eff === 'strikethrough') {
      out = [...out].map((c) => c + '\u0336').join('');
    } else if (eff === 'underline') {
      out = [...out].map((c) => c + '\u0332').join('');
    } else if (eff === 'overline') {
      out = [...out].map((c) => c + '\u0305').join('');
    } else if (eff === 'reverse') {
      out = [...out].reverse().join('');
    } else if (eff === 'mirror') {
      // simple mirror using flip pairs where available (basic demo)
      const pairs: Record<string, string> = { '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{', '<': '>', '>': '<' };
      out = [...out].map((c) => pairs[c] ?? c).reverse().join('');
    } else if (eff === 'upsideDown') {
      // partial upside-down mapping for demo purposes
      const map: Record<string, string> = { a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ', j: 'ɾ', k: 'ʞ', l: 'ן', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z' };
      out = [...out].map((c) => map[c] ?? map[c.toLowerCase()] ?? c).reverse().join('');
    } else if (eff === 'zalgo') {
      const diacs = ['\u0300','\u0301','\u0302','\u0303','\u0304','\u0305','\u0306','\u0307','\u0308','\u0309','\u030A','\u030B','\u030C','\u030D','\u030E','\u030F','\u0310','\u0311','\u0312','\u0313','\u0314','\u0315','\u0316','\u0317','\u0318','\u0319','\u031A','\u031B','\u031C','\u031D','\u031E','\u031F','\u0320','\u0321','\u0322','\u0323','\u0324','\u0325','\u0326','\u0327','\u0328','\u0329','\u032A','\u032B','\u032C','\u032D','\u032E','\u032F','\u0330','\u0331','\u0332','\u0333'];
      const rand = (n: number) => Math.floor(Math.random() * n);
      out = [...out].map((c) => c + Array.from({ length: 2 + rand(6) }, () => diacs[rand(diacs.length)]).join('')).join('');
    } else if (eff === 'emojiRain') {
      const emos = ['✨','💫','🌟','🔥','💖','🎉'];
      const r = emos[Math.floor(Math.random() * emos.length)];
      out = [...out].join(r);
    } else if (eff === 'glitch') {
      out = [...out].map((c) => c + '\u033f\u034f').join('');
    }
  }
  return out;
}

function makeGeneratedStyles(data: CategoryJSON) {
  // Compose 500-700 styles by combining alphabets, ornaments and effects
  const base: { name: string; converter: (t: string) => string }[] = [];
  for (const key of data.alphabets) {
    base.push({ name: key, converter: (t: string) => applyAlphabet(t, key) });
  }

  const results: { name: string; converter: (t: string) => string }[] = [];

  // 1) Raw alphabets
  results.push(...base);

  // 2) Alphabet + ornament wrappers (use up to 350 single ornaments)
  const wrap = data.ornaments.slice(0, Math.min(350, data.ornaments.length));
  wrap.forEach((orn, i) => {
    base.forEach((b) => {
      results.push({ name: `${b.name}-orn-${i}`, converter: (t) => `${orn} ${b.converter(t)} ${orn}` });
    });
  });

  // 3) Double-ornament combos to expand count (pair spaced by an offset)
  const len = data.ornaments.length;
  const offset = 13;
  for (let i = 0; i < Math.min(200, len); i++) {
    const a = data.ornaments[i];
    const b = data.ornaments[(i + offset) % len];
    base.forEach((ba) => {
      results.push({ name: `${ba.name}-orn2-${i}`, converter: (t) => `${a} ${ba.converter(t)} ${b}` });
    });
    if (results.length > 720) break;
  }

  // Ensure between 500-700 items; if still short, pad by repeating with counters
  let idx = 0;
  while (results.length < 500) {
    const b = base[idx % base.length];
    results.push({ name: `${b.name}-pad-${idx}`, converter: (t) => b.converter(t) });
    idx++;
  }

  // If effects are defined for this category, apply them uniformly to all generated styles
  if (data.effects && data.effects.length > 0) {
    for (let i = 0; i < results.length; i++) {
      const original = results[i];
      results[i] = {
        name: `${original.name}-fx`,
        converter: (t) => applyEffect(original.converter(t), data.effects),
      };
    }
  }

  // Cap to 700 styles for performance
  return results.slice(0, 700);
}

export function CategoryClient({ data, title }: { data: CategoryJSON; title: string }) {
  const [input, setInput] = useState('Hello Fonts');

  const styles = useMemo(() => makeGeneratedStyles(data), [data]);

  return (
    <section>
      <h1 className="text-3xl font-bold text-center mb-2">{title}</h1>
      <p className="text-gray-600 text-center mb-6">Live preview. Type below and copy any style you like.</p>
      <textarea
        className="w-full rounded-lg border border-gray-300 p-4 text-xl shadow-sm focus:border-primary-500 focus:ring-primary-500 mb-8"
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type here..."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {styles.map((s) => (
          <FontCard key={s.name} name={s.name} convertedText={s.converter(input)} />
        ))}
      </div>
    </section>
  );
}
