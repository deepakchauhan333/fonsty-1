// lib/platforms.ts
import { ORNAMENTAL_SYMBOLS } from './ornamental-symbols';

export type Platform =
  | 'instagram'
  | 'twitter'
  | 'facebook'
  | 'tiktok'
  | 'linkedin'
  | 'pinterest'
  | 'snapchat'
  | 'reddit'
  | 'tumblr'
  | 'youtube'
  | 'whatsapp'
  | 'discord'
  | 'telegram'
  | 'quora'
  | 'clubhouse'
  | 'beacons'
  | 'vimeo'
  | 'medium'
  | 'flickr'
  | 'twitch';

export type CategorySlug =
  | 'fancy-font-generator'
  | 'cursive-font-generator'
  | 'bubble-font-generator'
  | 'bold-font-generator'
  | 'italic-font-generator'
  | 'strikethrough-font-generator'
  | 'underline-font-generator'
  | 'small-caps-font-generator'
  | 'reverse-text-generator'
  | 'zalgo-text-generator'
  | 'mirror-text-generator'
  | 'upside-down-text-generator'
  | 'emoji-text-generator'
  | 'unicode-text-generator'
  | 'symbol-text-generator'
  | 'tattoo-font-generator'
  | 'gaming-font-generator'
  | 'retro-font-generator'
  | 'vintage-font-generator'
  | 'neon-font-generator'
  | 'glitch-font-generator';

export const PLATFORMS: Platform[] = [
  'instagram',
  'twitter',
  'facebook',
  'tiktok',
  'linkedin',
  'pinterest',
  'snapchat',
  'reddit',
  'tumblr',
  'youtube',
  'whatsapp',
  'discord',
  'telegram',
  'quora',
  'clubhouse',
  'beacons',
  'vimeo',
  'medium',
  'flickr',
  'twitch',
];

export const PLATFORM_NAMES: Record<Platform, string> = {
  instagram: 'Instagram',
  twitter: 'Twitter',
  facebook: 'Facebook',
  tiktok: 'TikTok',
  linkedin: 'LinkedIn',
  pinterest: 'Pinterest',
  snapchat: 'Snapchat',
  reddit: 'Reddit',
  tumblr: 'Tumblr',
  youtube: 'YouTube',
  whatsapp: 'WhatsApp',
  discord: 'Discord',
  telegram: 'Telegram',
  quora: 'Quora',
  clubhouse: 'Clubhouse',
  beacons: 'Beacons',
  vimeo: 'Vimeo',
  medium: 'Medium',
  flickr: 'Flickr',
  twitch: 'Twitch',
};

export const CATEGORY_TITLES: Record<CategorySlug, string> = {
  'fancy-font-generator': 'Fancy Font Generator',
  'cursive-font-generator': 'Cursive Font Generator',
  'bubble-font-generator': 'Bubble Font Generator',
  'bold-font-generator': 'Bold Font Generator',
  'italic-font-generator': 'Italic Font Generator',
  'strikethrough-font-generator': 'Strikethrough Text Generator',
  'underline-font-generator': 'Underline Text Generator',
  'small-caps-font-generator': 'Small Caps Text Generator',
  'reverse-text-generator': 'Reverse Text Generator',
  'zalgo-text-generator': 'Zalgo Text Generator',
  'mirror-text-generator': 'Mirror Text Generator',
  'upside-down-text-generator': 'Upside Down Text Generator',
  'emoji-text-generator': 'Emoji Text Generator',
  'unicode-text-generator': 'Unicode Text Generator',
  'symbol-text-generator': 'Symbol Text Generator',
  'tattoo-font-generator': 'Tattoo Font Generator',
  'gaming-font-generator': 'Gaming Font Generator',
  'retro-font-generator': 'Retro Font Generator',
  'vintage-font-generator': 'Vintage Font Generator',
  'neon-font-generator': 'Neon Font Generator',
  'glitch-font-generator': 'Glitch Font Generator',
};

// Map categories to relevant style keys and behaviors
// styleKeys correspond to keys defined in STYLED_LETTERS_MAP
export const CATEGORY_STYLE_KEYS: Record<CategorySlug, string[]> = {
  'fancy-font-generator': ['cursive', 'fraktur', 'doublestruck', 'circled', 'squared', 'monospaced', 'bold', 'italic'],
  'cursive-font-generator': ['cursive'],
  'bubble-font-generator': ['circled'],
  'bold-font-generator': ['bold'],
  'italic-font-generator': ['italic'],
  'strikethrough-font-generator': ['bold', 'italic', 'cursive', 'monospaced'],
  'underline-font-generator': ['bold', 'italic', 'cursive', 'monospaced'],
  'small-caps-font-generator': ['small_caps'],
  'reverse-text-generator': ['bold'],
  'zalgo-text-generator': ['bold'],
  'mirror-text-generator': ['bold'],
  'upside-down-text-generator': ['bold'],
  'emoji-text-generator': ['bold', 'cursive'],
  'unicode-text-generator': ['fullwidth', 'doublestruck', 'monospaced', 'circled', 'squared'],
  'symbol-text-generator': ['circled', 'squared', 'fullwidth', 'monospaced', 'doublestruck'],
  'tattoo-font-generator': ['fraktur', 'cursive'],
  'gaming-font-generator': ['monospaced', 'squared', 'doublestruck'],
  'retro-font-generator': ['fullwidth', 'monospaced'],
  'vintage-font-generator': ['fraktur', 'cursive'],
  'neon-font-generator': ['bold', 'fullwidth'],
  'glitch-font-generator': ['monospaced', 'bold'],
};

export interface CategoryJSON {
  platform: Platform;
  category: CategorySlug;
  // list of style keys (alphabets) defining how to map a-zA-Z0-9
  alphabets: string[];
  // list of ornamental wrappers to decorate text
  ornaments: string[];
  // whether to apply special effects by name on client
  effects?: ('strikethrough' | 'underline' | 'overline' | 'zalgo' | 'reverse' | 'mirror' | 'upsideDown' | 'emojiRain' | 'glitch')[];
}

// Select a large subset of ornaments (cap to 400 for performance; client will expand with combos)
const DEFAULT_ORNAMENTS = ORNAMENTAL_SYMBOLS.slice(0, 400);

export function buildCategoryJSON(platform: Platform, category: CategorySlug): CategoryJSON {
  const baseKeys = CATEGORY_STYLE_KEYS[category] ?? ['bold'];
  let effects: CategoryJSON['effects'] = [];

  switch (category) {
    case 'strikethrough-font-generator':
      effects = ['strikethrough'];
      break;
    case 'underline-font-generator':
      effects = ['underline'];
      break;
    case 'reverse-text-generator':
      effects = ['reverse'];
      break;
    case 'mirror-text-generator':
      effects = ['mirror'];
      break;
    case 'upside-down-text-generator':
      effects = ['upsideDown'];
      break;
    case 'zalgo-text-generator':
      effects = ['zalgo'];
      break;
    case 'emoji-text-generator':
      effects = ['emojiRain'];
      break;
    case 'glitch-font-generator':
      effects = ['glitch'];
      break;
    default:
      effects = [];
  }

  return {
    platform,
    category,
    alphabets: baseKeys,
    ornaments: DEFAULT_ORNAMENTS,
    effects,
  };
}

export function getAllParams() {
  const params: { platform: Platform; category: CategorySlug }[] = [];
  PLATFORMS.forEach((p) => {
    (Object.keys(CATEGORY_TITLES) as CategorySlug[]).forEach((c) => params.push({ platform: p, category: c }));
  });
  return params;
}

export const CATEGORY_SLUGS: CategorySlug[] = Object.keys(CATEGORY_TITLES) as CategorySlug[];

export function getAllCategoryParams() {
  return CATEGORY_SLUGS.map((c) => ({ category: c }));
}
