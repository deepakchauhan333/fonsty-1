export const fontCategories = {
  'fancy': {
    name: 'Fancy',
    description: 'Elegant and decorative fonts for stylish text',
    styles: ['script', 'calligraphy', 'swirly', 'elegant']
  },
  'cursive': {
    name: 'Cursive',
    description: 'Beautiful flowing cursive fonts for a personal touch',
    styles: ['cursive', 'handwriting', 'signature']
  },
  'bubble': {
    name: 'Bubble',
    description: 'Fun and playful bubble letters',
    styles: ['bubble', 'rounded', 'cartoon']
  },
  'bold': {
    name: 'Bold',
    description: 'Strong and attention-grabbing bold fonts',
    styles: ['bold', 'heavy', 'black']
  },
  'italic': {
    name: 'Italic',
    description: 'Elegant slanted fonts for emphasis',
    styles: ['italic', 'oblique', 'slanted']
  },
  'strikethrough': {
    name: 'Strikethrough',
    description: 'Text with a line through it',
    styles: ['strikethrough', 'crossed']
  },
  'gaming': {
    name: 'Gaming',
    description: 'Bold and futuristic gaming fonts',
    styles: ['gaming', 'arcade', 'pixel', 'retro']
  },
  'neon': {
    name: 'Neon',
    description: 'Glowing and vibrant neon text styles',
    styles: ['neon', 'glow', 'electric']
  }
  // Add more categories as needed
} as const;

export const socialMediaPlatforms = [
  { id: 'facebook', name: 'Facebook', icon: 'facebook' },
  { id: 'twitter', name: 'Twitter', icon: 'twitter' },
  { id: 'tiktok', name: 'TikTok', icon: 'tiktok' },
  { id: 'youtube', name: 'YouTube', icon: 'youtube' },
  { id: 'pinterest', name: 'Pinterest', icon: 'pinterest' },
  { id: 'threads', name: 'Threads', icon: 'threads' },
  { id: 'instagram', name: 'Instagram', icon: 'instagram' },
  { id: 'linkedin', name: 'LinkedIn', icon: 'linkedin' },
  { id: 'reddit', name: 'Reddit', icon: 'reddit' },
  { id: 'discord', name: 'Discord', icon: 'discord' },
  { id: 'twitch', name: 'Twitch', icon: 'twitch' },
  { id: 'telegram', name: 'Telegram', icon: 'telegram' },
  { id: 'whatsapp', name: 'WhatsApp', icon: 'whatsapp' },
  { id: 'snapchat', name: 'Snapchat', icon: 'snapchat' },
  { id: 'tumblr', name: 'Tumblr', icon: 'tumblr' },
  { id: 'quora', name: 'Quora', icon: 'quora' },
  { id: 'medium', name: 'Medium', icon: 'medium' },
  { id: 'vimeo', name: 'Vimeo', icon: 'vimeo' },
  { id: 'wechat', name: 'WeChat', icon: 'wechat' },
  { id: 'line', name: 'LINE', icon: 'line' },
];

export type FontCategory = keyof typeof fontCategories;
export type SocialMediaPlatform = typeof socialMediaPlatforms[number]['id'];
