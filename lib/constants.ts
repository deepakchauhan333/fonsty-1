// lib/constants.ts
export const PLATFORMS = [
    'facebook', 'youtube', 'whatsapp', 'instagram', 'tiktok', 'wechat',
    'telegram', 'facebook-messenger', 'snapchat', 'douyin', 'kuaishou',
    'reddit', 'pinterest', 'weibo', 'x', 'linkedin', 'qq', 'qzone',
    'quora', 'viber', 'baidu-tieba', 'discord', 'threads', 'vimeo', 'twitch'
  ] as const;
  
  export const FONT_TYPES = [
    'fancy-font-generator', 'cursive-font-generator', 'bubble-font-generator',
    'bold-font-generator', 'italic-font-generator', 'strikethrough-text-generator',
    'underline-text-generator', 'small-caps-text-generator', 'reverse-text-generator',
    'zalgo-text-generator', 'mirror-text-generator', 'upside-down-text-generator',
    'emoji-text-generator', 'unicode-text-generator', 'symbol-text-generator',
    'tattoo-font-generator', 'gaming-font-generator', 'retro-font-generator',
    'vintage-font-generator', 'neon-font-generator', 'glitch-font-generator'
  ] as const;
  
  export type PlatformType = typeof PLATFORMS[number];
  export type FontType = typeof FONT_TYPES[number];
  
  export const PLATFORM_NAMES: Record<string, string> = {
    'facebook': 'Facebook',
    'youtube': 'YouTube',
    'whatsapp': 'WhatsApp',
    'instagram': 'Instagram',
    'tiktok': 'TikTok',
    'wechat': 'WeChat',
    'telegram': 'Telegram',
    'facebook-messenger': 'Facebook Messenger',
    'snapchat': 'Snapchat',
    'douyin': 'Douyin',
    'kuaishou': 'Kuaishou',
    'reddit': 'Reddit',
    'pinterest': 'Pinterest',
    'weibo': 'Weibo',
    'x': 'X (Twitter)',
    'linkedin': 'LinkedIn',
    'qq': 'QQ',
    'qzone': 'Qzone',
    'quora': 'Quora',
    'viber': 'Viber',
    'baidu-tieba': 'Baidu Tieba',
    'discord': 'Discord',
    'threads': 'Threads',
    'vimeo': 'Vimeo',
    'twitch': 'Twitch'
  };