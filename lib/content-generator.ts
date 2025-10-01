import { CATEGORY_TITLES, type CategorySlug } from './platforms';

type PlatformConfig = {
  name: string;
  description: string;
  primaryKeywords: string[];
  secondaryKeywords: string[];
  contentSections: {
    about: string;
    benefits: string[];
    useCases: string[];
    tips: string[];
    seo: {
      title: string;
      description: string;
    };
  };
};

type ContentSections = {
  h1: string;
  h2s: {
    title: string;
    content: string;
  }[];
  h3s: {
    title: string;
    content: string;
  }[];
  internalLinks: {
    title: string;
    href: string;
  }[];
};

const platformConfigs: Record<string, PlatformConfig> = {
  instagram: {
    name: 'Instagram',
    description: 'Instagram is a visual-first platform where aesthetics and branding are key to standing out in the feed and stories.',
    primaryKeywords: ['Instagram bio', 'IG captions', 'IG stories', 'IG fonts'],
    secondaryKeywords: ['aesthetic text', 'Instagram highlights', 'IG username', 'IG profile'],
    contentSections: {
      about: 'Instagram is all about visual storytelling and personal branding. With over 2 billion active users, having eye-catching text in your bio, captions, and stories can significantly boost your engagement and follower growth. Our {categoryName} generator helps you create unique text styles that make your profile stand out in the crowded Instagram space.',
      benefits: [
        'Enhance your Instagram bio with stylish {categorySlug} to make a strong first impression',
        'Create eye-catching captions that increase engagement and save time with our Instagram font generator',
        'Make your Instagram stories more engaging with custom text styles',
        'Stand out in the Instagram algorithm with unique typography',
        'Boost your Instagram marketing with branded text styles'
      ],
      useCases: [
        'Instagram bio and name styling',
        'Engaging captions for feed posts',
        'Text overlays for Instagram stories',
        'Highlight covers and names',
        'Branded content and marketing materials'
      ],
      tips: [
        'Use {categorySlug} in your Instagram bio to make a strong first impression',
        'Combine different text styles for a unique Instagram aesthetic',
        'Keep your Instagram captions readable while using stylish fonts',
        'Test how your text appears on different devices before posting',
        'Use consistent text styles across your Instagram profile for brand recognition'
      ],
      seo: {
        title: 'Best {categoryName} for Instagram Bios & Captions | Free Generator',
        description: 'Create stunning {categorySlug} for your Instagram bio, captions, and stories. Stand out with unique text styles that boost engagement and followers.'
      }
    }
  },
  linkedin: {
    name: 'LinkedIn',
    description: 'The professional network where personal branding and clear communication are essential for career growth.',
    primaryKeywords: ['LinkedIn headline', 'profile bio', 'professional text', 'LinkedIn about'],
    secondaryKeywords: ['career profile', 'resume text', 'professional branding', 'LinkedIn summary'],
    contentSections: {
      about: 'LinkedIn is the world\'s largest professional network, where your personal brand can open doors to new career opportunities. Our {categoryName} generator helps you create polished, professional text that enhances your profile\'s visibility and impact. With clean, readable styles that maintain a business-appropriate appearance, you can make your profile stand out while keeping it professional.',
      benefits: [
        'Enhance your LinkedIn headline with subtle {categorySlug} that catches recruiters\' eyes',
        'Make your LinkedIn about section more scannable with styled text formatting',
        'Stand out in LinkedIn search results with optimized profile text',
        'Create professional-looking content posts with unique section headers',
        'Improve your personal brand with consistent, polished text across your profile'
      ],
      useCases: [
        'Professional headlines and job titles',
        'About section formatting',
        'Featured posts and articles',
        'Skills and endorsements',
        'Experience section highlights'
      ],
      tips: [
        'Use {categorySlug} sparingly in your LinkedIn profile to maintain professionalism',
        'Focus on readability when styling your LinkedIn about section',
        'Test how your profile appears on both desktop and mobile',
        'Keep your headline under 120 characters for optimal display',
        'Use consistent formatting across all sections of your LinkedIn profile'
      ],
      seo: {
        title: 'Professional {categoryName} for LinkedIn Profiles & Headlines',
        description: 'Enhance your LinkedIn profile with subtle {categorySlug}. Create professional-looking text that improves visibility and makes a strong impression on recruiters.'
      }
    }
  },
  twitter: {
    name: 'Twitter',
    description: 'The fast-paced microblogging platform where concise, engaging content thrives.',
    primaryKeywords: ['Twitter bio', 'tweet text', 'X profile', 'Twitter display name'],
    secondaryKeywords: ['tweet formatting', 'X bio', 'social media text', 'tweet styling'],
    contentSections: {
      about: 'Twitter (now X) is where conversations happen in real-time, and standing out in the fast-moving feed is crucial. Our {categoryName} generator helps you create attention-grabbing text for your profile, tweets, and threads. With character limits at play, every styled character helps you make an impact and increase engagement.',
      benefits: [
        'Make your Twitter bio stand out with eye-catching {categorySlug}',
        'Increase tweet engagement with styled text that draws attention',
        'Create visual hierarchy in your Twitter threads for better readability',
        'Enhance your Twitter profile with unique display names and headers',
        'Make your tweets more scannable in the fast-moving Twitter feed'
      ],
      useCases: [
        'Twitter/X profile bio and name',
        'Engaging tweet text',
        'Thread starters and section headers',
        'Pinned tweets and announcements',
        'Twitter Spaces descriptions'
      ],
      tips: [
        'Use {categorySlug} in your Twitter bio to make a strong first impression',
        'Keep your main message in the first 125 characters for maximum visibility',
        'Combine text styles with relevant emojis for extra impact',
        'Test different text styles to see what drives the most engagement',
        'Be mindful of how your styled text appears in both light and dark modes'
      ],
      seo: {
        title: 'Best {categoryName} for Twitter (X) Bios & Tweets | Free Tool',
        description: 'Create eye-catching {categorySlug} for your Twitter profile and tweets. Stand out in the timeline and increase engagement with unique text styles.'
      }
    }
  },
  // Additional platforms will be added in the same format
  facebook: {
    name: 'Facebook',
    description: 'The world\'s largest social network where personal and business content thrives.',
    primaryKeywords: ['Facebook post', 'profile bio', 'page header', 'Facebook name'],
    secondaryKeywords: ['timeline text', 'group posts', 'event descriptions', 'Facebook stories'],
    contentSections: {
      about: 'Facebook remains the largest social network, and standing out requires more than just great content—it needs presentation. Our {categoryName} generator helps you create text that captures attention in the news feed, whether you\'re posting personal updates, managing a business page, or creating events. With Facebook\'s algorithm favoring engaging content, styled text can be the difference between being seen or scrolled past.',
      benefits: [
        'Make your Facebook posts more noticeable in the news feed with {categorySlug}',
        'Enhance your Facebook profile or page with unique text styles',
        'Create eye-catching event descriptions that increase attendance',
        'Improve engagement on your Facebook business page posts',
        'Make your Facebook stories more engaging with styled text overlays'
      ],
      useCases: [
        'Facebook post text and headers',
        'Profile and page bios',
        'Event titles and descriptions',
        'Facebook story text',
        'Group announcements and rules'
      ],
      tips: [
        'Use {categorySlug} in the first few lines of your Facebook posts to catch attention',
        'Create visual hierarchy in longer Facebook posts with styled section headers',
        'Test how your text appears on both mobile and desktop',
        'Use consistent text styles across your Facebook page for brand recognition',
        'Combine styled text with high-quality images for maximum impact'
      ],
      seo: {
        title: 'Best {categoryName} for Facebook Posts & Profiles | Free Generator',
        description: 'Create engaging {categorySlug} for your Facebook posts, profile, and page. Stand out in the news feed and increase engagement with unique text styles.'
      }
    }
  },
  tiktok: {
    name: 'TikTok',
    description: 'The short-form video platform where creativity and trends drive engagement.',
    primaryKeywords: ['TikTok bio', 'video captions', 'TikTok name', 'video text'],
    secondaryKeywords: ['TikTok username', 'profile bio', 'video overlays', 'TikTok fonts'],
    contentSections: {
      about: 'TikTok has taken the social media world by storm with its short-form video content. In this visually-driven platform, text plays a crucial role in making your content discoverable and engaging. Our {categoryName} generator helps you create text that complements your videos, enhances your profile, and follows the latest TikTok trends. Whether you\'re a content creator, business, or casual user, styled text can help your content stand out in the For You Page (FYP).',
      benefits: [
        'Enhance your TikTok bio with unique {categorySlug} that reflects your personality',
        'Create eye-catching video captions that increase watch time',
        'Make your TikTok username more memorable with stylish fonts',
        'Add engaging text overlays to your TikTok videos',
        'Improve your TikTok SEO with optimized text in your profile and captions'
      ],
      useCases: [
        'TikTok profile name and bio',
        'Video captions and descriptions',
        'On-screen text in videos',
        'Comment engagement',
        'TikTok story text'
      ],
      tips: [
        'Use {categorySlug} in your TikTok bio to make a strong first impression',
        'Keep your video captions short and engaging with styled text',
        'Use text overlays to make your TikTok videos more accessible',
        'Experiment with different text styles to match your content theme',
        'Update your TikTok profile text regularly to reflect current trends'
      ],
      seo: {
        title: 'Best {categoryName} for TikTok Bios & Captions | Free Generator',
        description: 'Create eye-catching {categorySlug} for your TikTok profile, videos, and captions. Stand out on the For You Page and increase engagement with unique text styles.'
      }
    }
  },
  // Additional platforms
  pinterest: {
    name: 'Pinterest',
    description: 'The visual discovery platform where inspiration meets action through beautiful pins and boards.',
    primaryKeywords: ['Pinterest bio', 'pin text', 'board titles', 'Pinterest fonts'],
    secondaryKeywords: ['Pinterest SEO', 'pin descriptions', 'profile bio', 'Pinterest marketing'],
    contentSections: {
      about: 'Pinterest is a visual search engine where aesthetics and discoverability are key. Our {categoryName} generator helps you create text that stands out in pin descriptions, board titles, and your profile. With Pinterest\'s unique algorithm favoring fresh, engaging content, styled text can improve your pins\' visibility and click-through rates.',
      benefits: [
        'Make your Pinterest pins more clickable with eye-catching {categorySlug}',
        'Enhance your Pinterest profile with unique text styles that reflect your brand',
        'Improve your Pinterest SEO with optimized text in pin descriptions',
        'Create cohesive board titles that attract more followers',
        'Stand out in Pinterest search results with stylized text'
      ],
      useCases: [
        'Pin titles and descriptions',
        'Board titles and sections',
        'Profile bio and name',
        'Idea pins and story text',
        'Promoted pin campaigns'
      ],
      tips: [
        'Use {categorySlug} in your pin titles to make them stand out in search results',
        'Keep your Pinterest board titles clear and descriptive with styled text',
        'Use consistent text styles across your profile for brand recognition',
        'Test different text styles to see what drives the most engagement',
        'Update your Pinterest text regularly to keep your profile fresh'
      ],
      seo: {
        title: 'Best {categoryName} for Pinterest Pins & Profiles | Free Generator',
        description: 'Create eye-catching {categorySlug} for your Pinterest pins, boards, and profile. Improve your Pinterest SEO and increase engagement with unique text styles.'
      }
    }
  },
  snapchat: {
    name: 'Snapchat',
    description: 'The multimedia messaging app known for its disappearing content and creative filters.',
    primaryKeywords: ['Snapchat username', 'snap text', 'story captions', 'Snapchat fonts'],
    secondaryKeywords: ['Snapchat bio', 'bitmoji text', 'snap captions', 'snap filters'],
    contentSections: {
      about: 'Snapchat is all about fun, creative communication through images and videos. Our {categoryName} generator helps you add personality to your snaps, stories, and profile with unique text styles. Whether you\'re sending personal snaps or creating public stories, styled text can make your content more engaging and shareable.',
      benefits: [
        'Enhance your Snapchat stories with eye-catching {categorySlug}',
        'Make your Snapchat username more memorable with stylish fonts',
        'Add creative text overlays to your snaps and videos',
        'Stand out in the Snapchat Discover feed with unique typography',
        'Increase engagement on your public stories with styled text'
      ],
      useCases: [
        'Snapchat username and display name',
        'Story captions and text overlays',
        'Snap text and captions',
        'Public profile bio',
        'Spotlight submissions'
      ],
      tips: [
        'Use {categorySlug} in your Snapchat username to make it more memorable',
        'Add text overlays to your snaps to provide context and increase engagement',
        'Experiment with different text styles to match your snap\'s mood',
        'Keep your Snapchat bio short and to the point with styled text',
        'Update your Snapchat text regularly to keep your profile fresh'
      ],
      seo: {
        title: 'Best {categoryName} for Snapchat Usernames & Stories | Free Generator',
        description: 'Create eye-catching {categorySlug} for your Snapchat username, stories, and snaps. Stand out on Snapchat with unique text styles that boost engagement.'
      }
    }
  },
  reddit: {
    name: 'Reddit',
    description: 'The front page of the internet, where communities gather to discuss every topic imaginable.',
    primaryKeywords: ['Reddit username', 'post titles', 'subreddit styling', 'Reddit fonts'],
    secondaryKeywords: ['Reddit formatting', 'comment text', 'subreddit CSS', 'Reddit markdown'],
    contentSections: {
      about: 'Reddit is a vast network of communities where text plays a crucial role in communication. Our {categoryName} generator helps you create text that stands out in post titles, comments, and your profile. Whether you\'re a casual Redditor or a subreddit moderator, styled text can help you express yourself more effectively and make your content more engaging.',
      benefits: [
        'Make your Reddit username more memorable with {categorySlug}',
        'Create eye-catching post titles that stand out in the feed',
        'Enhance your Reddit profile with unique text styles',
        'Add visual interest to your comments and posts',
        'Improve readability and engagement with styled text'
      ],
      useCases: [
        'Reddit username and profile',
        'Post titles and text',
        'Comments and replies',
        'Subreddit styling (for moderators)',
        'User and post flairs'
      ],
      tips: [
        'Use {categorySlug} in your Reddit username to make it more distinctive',
        'Create attention-grabbing post titles with styled text',
        'Use text formatting to improve readability in long comments',
        'Test how your text appears on different Reddit clients',
        'Follow subreddit rules regarding text formatting and styling'
      ],
      seo: {
        title: 'Best {categoryName} for Reddit Usernames & Posts | Free Generator',
        description: 'Create eye-catching {categorySlug} for your Reddit username, posts, and comments. Stand out on Reddit with unique text styles that boost engagement.'
      }
    }
  },
  // Additional platforms can be added here following the same pattern
  youtube: {
    name: 'YouTube',
    description: 'The leading video-sharing platform where creators share content with billions of viewers.',
    primaryKeywords: ['YouTube channel name', 'video titles', 'descriptions', 'YouTube fonts'],
    secondaryKeywords: ['YouTube SEO', 'video captions', 'channel art', 'YouTube thumbnails'],
    contentSections: {
      about: 'YouTube is the world\'s largest video platform, where standing out is key to success. Our {categoryName} generator helps you create text that captures attention in video titles, descriptions, and your channel. With millions of hours of content uploaded daily, styled text can help your videos get noticed and improve your click-through rates.',
      benefits: [
        'Make your YouTube video titles more clickable with {categorySlug}',
        'Enhance your channel name and description with unique text styles',
        'Improve your YouTube SEO with optimized text in video descriptions',
        'Create eye-catching end screens and info cards with styled text',
        'Stand out in YouTube search results with distinctive typography'
      ],
      useCases: [
        'Video titles and descriptions',
        'Channel name and about section',
        'Playlist titles and descriptions',
        'End screens and info cards',
        'Video chapters and timestamps'
      ],
      tips: [
        'Use {categorySlug} in your video titles to make them stand out in search results',
        'Keep your YouTube channel name short and memorable with styled text',
        'Use text formatting in your video descriptions to improve readability',
        'Test different text styles to see what drives the most clicks',
        'Update your YouTube text regularly to keep your channel fresh'
      ],
      seo: {
        title: 'Best {categoryName} for YouTube Channel Names & Video Titles | Free Generator',
        description: 'Create eye-catching {categorySlug} for your YouTube channel name, video titles, and descriptions. Improve your YouTube SEO and increase clicks with unique text styles.'
      }
    }
  },
  whatsapp: {
    name: 'WhatsApp',
    description: 'The popular messaging app for personal and business communication.',
    primaryKeywords: ['WhatsApp status', 'message text', 'group names', 'WhatsApp fonts'],
    secondaryKeywords: ['WhatsApp bio', 'status updates', 'chat formatting', 'WhatsApp business'],
    contentSections: {
      about: 'WhatsApp is the go-to messaging app for billions of users worldwide. Our {categoryName} generator helps you add personality to your messages, status updates, and profile with unique text styles. Whether you\'re chatting with friends or running a business, styled text can make your communication more engaging and memorable.',
      benefits: [
        'Make your WhatsApp status updates stand out with {categorySlug}',
        'Enhance your profile name and about section with unique text styles',
        'Create eye-catching group names and descriptions',
        'Add personality to your messages with styled text',
        'Improve readability and engagement in your WhatsApp Business profile'
      ],
      useCases: [
        'Profile name and about section',
        'Status updates',
        'Group names and descriptions',
        'Chat messages',
        'Business profile information'
      ],
      tips: [
        'Use {categorySlug} in your WhatsApp status to make it more noticeable',
        'Keep your profile name clear and readable with styled text',
        'Use text formatting to organize information in your messages',
        'Test how your text appears on different devices and WhatsApp versions',
        'Update your WhatsApp status regularly with fresh, engaging content'
      ],
      seo: {
        title: 'Best {categoryName} for WhatsApp Status & Messages | Free Generator',
        description: 'Create eye-catching {categorySlug} for your WhatsApp status, profile, and messages. Stand out in chats and status updates with unique text styles.'
      }
    }
  },
  discord: {
    name: 'Discord',
    description: 'The voice, video, and text communication platform for communities and friends.',
    primaryKeywords: ['Discord username', 'server names', 'channel names', 'Discord fonts'],
    secondaryKeywords: ['Discord bio', 'role names', 'server rules', 'Discord markdown'],
    contentSections: {
      about: 'Discord is the ultimate platform for communities to connect over shared interests. Our {categoryName} generator helps you create unique text for your username, server, and channels. Whether you\'re a server owner, moderator, or member, styled text can help you express yourself and make your server stand out.',
      benefits: [
        'Make your Discord username more distinctive with {categorySlug}',
        'Create eye-catching server and channel names',
        'Enhance your server\'s visual hierarchy with styled role names',
        'Add personality to your profile bio and status',
        'Improve server organization with visually distinct text styles'
      ],
      useCases: [
        'Username and nickname',
        'Server and channel names',
        'Role names and permissions',
        'Profile bio and status',
        'Server rules and announcements'
      ],
      tips: [
        'Use {categorySlug} in your Discord username to make it more memorable',
        'Create a consistent text style for your server\'s channels and categories',
        'Use text formatting to organize information in your server rules',
        'Test how your text appears in both light and dark themes',
        'Update your server\'s text styles regularly to keep it fresh'
      ],
      seo: {
        title: 'Best {categoryName} for Discord Usernames & Servers | Free Generator',
        description: 'Create eye-catching {categorySlug} for your Discord username, server, and channels. Stand out in the Discord community with unique text styles.'
      }
    }
  },
  // More platforms can be added following the same pattern
};

// Fallback configuration for platforms not explicitly defined
const defaultConfig: PlatformConfig = {
  name: '',
  description: '',
  primaryKeywords: [],
  secondaryKeywords: [],
  contentSections: {
    about: 'Enhance your {platformName} profile with unique {categorySlug} styles that make your content stand out.',
    benefits: [
      'Make your {platformName} profile stand out with {categorySlug}',
      'Increase engagement with eye-catching text styles',
      'Express your personality through unique typography',
      'Create a consistent brand identity across {platformName}',
      'Improve readability and visual hierarchy in your content'
    ],
    useCases: [
      'Profile bios and usernames',
      'Post captions and descriptions',
      'Story and highlight text',
      'Video titles and descriptions',
      'Community posts and announcements'
    ],
    tips: [
      'Use {categorySlug} to highlight important information in your {platformName} profile',
      'Combine different text styles for a unique look',
      'Test how your text appears on different devices',
      'Keep your main message clear and readable',
      'Update your text styles regularly to keep your profile fresh'
    ],
    seo: {
      title: 'Best {categoryName} for {platformName} | Free Generator',
      description: 'Create stunning {categorySlug} for your {platformName} profile, posts, and more. Stand out with unique text styles that boost engagement.'
    }
  }
};

export function generateContent(platform: string, category: CategorySlug): ContentSections {
  const platformConfig = platformConfigs[platform.toLowerCase()] || {
    ...defaultConfig,
    name: platform.charAt(0).toUpperCase() + platform.slice(1)
  };
  
  const platformName = platformConfig.name;
  const categoryName = CATEGORY_TITLES[category].replace(' Generator', '');
  const categorySlug = category.replace('-generator', '').replace(/-/g, ' ');
  
  // Get the specific configuration for this platform or use defaults
  const config = platformConfig.contentSections || defaultConfig.contentSections;
  
  // Helper function to replace placeholders in strings
  const processText = (text: string): string => {
    return text
      .replace(/\{platformName\}/g, platformName)
      .replace(/\{categoryName\}/g, categoryName)
      .replace(/\{categorySlug\}/g, categorySlug);
  };

  // Generate content sections
  const content: ContentSections = {
    h1: processText(config.seo.title),
    h2s: [
      {
        title: `About ${categoryName} for ${platformName}`,
        content: processText(config.about)
      },
      {
        title: `Benefits of Using ${categoryName} on ${platformName}`,
        content: processText(config.benefits.join(' '))
      },
      {
        title: `Best ways to Use ${categoryName} Styles on ${platformName}`,
        content: `There are countless creative ways to incorporate ${categorySlug} text into your ${platformName} presence. Use it in your bio to make a strong first impression, or add it to your story highlights for a cohesive look. Many influencers and brands use ${categorySlug} fonts to create visual hierarchy in their captions, making important information stand out. You can also use these styles for giveaways, announcements, or to highlight special offers. The key is to maintain consistency with your brand's voice and aesthetic while leveraging the power of ${categorySlug} text.`
      },
      {
        title: `Top Features of Our ${categoryName} Generator`,
        content: `Our ${categoryName} Generator comes packed with powerful features to enhance your ${platformName} game. With a vast library of over 500+ stylized unicode characters and ornamental symbols, you'll never run out of creative options. The tool is completely free to use, with no watermarks or hidden fees. The intuitive interface makes it easy to generate, preview, and copy your styled text in seconds. Plus, all generated text is compatible with ${platformName}'s platform, ensuring your text displays perfectly every time.`
      },
      {
        title: `How to Generate ${categoryName} Text Online`,
        content: `Creating ${categorySlug} text for ${platformName} is quick and easy with our generator. Simply type or paste your text into the input field, and watch as it's instantly transformed into ${categorySlug} style. You can browse through multiple font variations and preview how they'll look before copying. Once you've found the perfect style, click the copy button and paste it directly into your ${platformName} bio, caption, or story. No special apps or downloads required – our tool works right in your browser.`
      },
      {
        title: `Examples of ${categoryName} Fonts and Styles`,
        content: `Our ${categoryName} Generator offers a wide range of styles to choose from. Whether you're looking for something bold and attention-grabbing or subtle and sophisticated, you'll find the perfect match for your ${platformName} aesthetic. Some popular variations include ${categorySlug} with decorative borders, ${categorySlug} with special characters, and ${categorySlug} with unique text effects. Each style is crafted to help you stand out while maintaining readability across devices.`
      },
      {
        title: `Final Thoughts on ${categoryName} Generator`,
        content: `In today's competitive social media landscape, standing out is more important than ever. Our ${categoryName} Generator gives you the tools to create unique, eye-catching text that captures attention and enhances your ${platformName} presence. With over 500+ stylized unicode letters and ornamental symbols at your fingertips, the possibilities for customization are virtually endless. Whether you're a business looking to strengthen your brand or an individual wanting to express your creativity, our tool makes it easy to elevate your social media game with beautiful, professional-looking text.`
      }
    ],
    h3s: config.tips.map((tip, index) => ({
      title: `Tip ${index + 1}: ${tip.split(':')[0]}`,
      content: tip.includes(':') ? tip.split(':').slice(1).join(':').trim() : tip
    })),
    internalLinks: Object.entries(CATEGORY_TITLES)
      .filter(([slug]) => slug !== category) // Exclude current category
      .map(([slug, title]) => ({
        title: `${title.replace(' Generator', '')} for ${platformName}`,
        href: `/${platform}/${slug}`
      }))
      .slice(0, 6) // Limit to 6 related generators
  };

  return content;
}
