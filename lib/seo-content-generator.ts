// lib/seo-content-generator.ts
import { PLATFORM_NAMES } from './constants';

// Sanitize helper to keep content professional (no markdown bold or long dashes)
function clean(text: string): string {
  return text
    .replace(/\*\*/g, '') // remove markdown bold markers
    .replace(/[—–]/g, '-') // replace em/en dashes with hyphen
    .replace(/--+/g, '-') // collapse double or more hyphens
    .trim();
}

interface SEOContent {
  h1: string;
  introduction: string;
  whatIs: { title: string; content: string };
  howToUse: { title: string; content: string };
  examples: { title: string; items: string[] };
  benefits: { title: string; content: string };
  comparison: { title: string; content: string };
  faqs: { title: string; items: { question: string; answer: string }[] };
  relatedTools: { title: string; content: string };
}

// Font style display names
const FONT_STYLE_NAMES: Record<string, string> = {
  'fancy-font-generator': 'Fancy',
  'cursive-font-generator': 'Cursive',
  'bubble-font-generator': 'Bubble',
  'bold-font-generator': 'Bold',
  'italic-font-generator': 'Italic',
  'strikethrough-text-generator': 'Strikethrough',
  'underline-text-generator': 'Underline',
  'small-caps-text-generator': 'Small Caps',
  'reverse-text-generator': 'Reverse',
  'zalgo-text-generator': 'Zalgo',
  'mirror-text-generator': 'Mirror',
  'upside-down-text-generator': 'Upside Down',
  'emoji-text-generator': 'Emoji',
  'unicode-text-generator': 'Unicode',
  'symbol-text-generator': 'Symbol',
  'tattoo-font-generator': 'Tattoo',
  'gaming-font-generator': 'Gaming',
  'retro-font-generator': 'Retro',
  'vintage-font-generator': 'Vintage',
  'neon-font-generator': 'Neon',
  'glitch-font-generator': 'Glitch'
};

// Unicode examples for each font style
const UNICODE_EXAMPLES: Record<string, string[]> = {
  'fancy-font-generator': ['𝓕𝓪𝓷𝓬𝔂', '𝔽𝕒𝕟𝕔𝕪', '𝐅𝐚𝐧𝐜𝐲', '𝙵𝚊𝚗𝚌𝚢', '𝗙𝗮𝗻𝗰𝘆', '𝘍𝘢𝘯𝘤𝘺'],
  'cursive-font-generator': ['𝒞𝓊𝓇𝓈𝒾𝓋𝑒', '𝒸𝓊𝓇𝓈𝒾𝓋𝑒', '𝓒𝓾𝓻𝓼𝓲𝓿𝓮', '𝕮𝖚𝖗𝖘𝖎𝖛𝖊', '𝗖𝘂𝗿𝘀𝗶𝘃𝗲', '𝘊𝘶𝘳𝘴𝘪𝘷𝘦'],
  'bubble-font-generator': ['Ⓑⓤⓑⓑⓛⓔ', 'ⓑⓤⓑⓑⓛⓔ', '🅑🅤🅑🅑🅛🅔', '🄱🅄🄱🄱🄻🄴', 'ⒷⓊⒷⒷⓁⒺ', 'ⓑⓤⓑⓑⓛⓔ'],
  'bold-font-generator': ['𝐁𝐨𝐥𝐝', '𝗕𝗼𝗹𝗱', '𝘽𝙤𝙡𝙙', '𝑩𝒐𝒍𝒅', '𝓑𝓸𝓵𝓭', '𝔹𝕠𝕝𝕕'],
  'italic-font-generator': ['𝘐𝘵𝘢𝘭𝘪𝘤', '𝙄𝙩𝙖𝙡𝙞𝙘', '𝐼𝑡𝑎𝑙𝑖𝑐', '𝐼𝑡𝑎𝑙𝑖𝑐', '𝑰𝒕𝒂𝒍𝒊𝒄', '𝓘𝓽𝓪𝓵𝓲𝓬'],
  'strikethrough-text-generator': ['S̶t̶r̶i̶k̶e̶', 'S̴t̴r̴i̴k̴e̴', 'S̷t̷r̷i̷k̷e̷', 'S̸t̸r̸i̸k̸e̸', 'S̶̶t̶̶r̶̶i̶̶k̶̶e̶̶', 'S͟t͟r͟i͟k͟e͟'],
  'underline-text-generator': ['U̲n̲d̲e̲r̲l̲i̲n̲e̲', 'U̳n̳d̳e̳r̳l̳i̳n̳e̳', 'U̠n̠d̠e̠r̠l̠i̠n̠e̠', 'U͟n͟d͟e͟r͟l͟i͟n͟e͟', 'U̲̲n̲̲d̲̲e̲̲r̲̲l̲̲i̲̲n̲̲e̲̲', 'U̳̳n̳̳d̳̳e̳̳r̳̳l̳̳i̳̳n̳̳e̳̳'],
  'small-caps-text-generator': ['ꜱᴍᴀʟʟ ᴄᴀᴘꜱ', 'SMALL CAPS', 'ꜱᴍᴀʟʟ ᴄᴀᴘꜱ', 'Sᴍᴀʟʟ Cᴀᴘꜱ', 'ꜱᴍᴀʟʟ ᴄᴀᴘꜱ', 'ᏚᎷᎪᏞᏞ ᏟᎪᏢᏚ'],
  'reverse-text-generator': ['esreveR', 'txeT', 'desreveR', 'txeT esreveR', 'esreveR txeT', 'desreveR txeT'],
  'zalgo-text-generator': ['Z̴̡̛a̸̧͝l̵̨̛g̶̢̕o̴̧͝', 'T̷̨̛e̵̢͝x̴̧̛t̶̨͝', 'Z̸a̷l̴g̶o̵', 'G̴l̷i̴t̶c̵h̶', 'Z̷̧ą̴l̵̢ģ̶ǫ̴', 'C̴̨r̵̢a̶̧z̴̨y̵̢'],
  'mirror-text-generator': ['ɿoɿɿiM', 'ɈxɘT', 'bɘɿoɿɿiM', 'ɈxɘT bɘɿoɿɿiM', 'ɿoɿɿiM ɈxɘT', 'bɘqqilꟻ'],
  'upside-down-text-generator': ['uʍop ǝpᴉsd∩', 'ʇxǝ⊥', 'pǝddᴉlℲ', 'ʇxǝ⊥ uʍop ǝpᴉsd∩', 'uʍop ǝpᴉsd∩', 'pǝsɹǝʌǝɹ'],
  'emoji-text-generator': ['E̲m̲o̲j̲i̲ 😊', 'T̲e̲x̲t̲ ✨', 'S̲t̲y̲l̲e̲ 🎨', 'F̲o̲n̲t̲ 🔥', 'E̲m̲o̲j̲i̲ 💫', 'T̲e̲x̲t̲ ⭐'],
  'unicode-text-generator': ['𝕌𝕟𝕚𝕔𝕠𝕕𝕖', '𝖀𝖓𝖎𝖈𝖔𝖉𝖊', '𝗨𝗻𝗶𝗰𝗼𝗱𝗲', '𝘜𝘯𝘪𝘤𝘰𝘥𝘦', '𝙐𝙣𝙞𝙘𝙤𝙙𝙚', 'Ⓤⓝⓘⓒⓞⓓⓔ'],
  'symbol-text-generator': ['§¥mßø£', 'T€×†', '§¥mßø£§', 'T€×† §¥mßø£§', '§¥mßø£ T€×†', 'Ðê¢ðrå†ïvê'],
  'tattoo-font-generator': ['𝕿𝖆𝖙𝖙𝖔𝖔', '𝔗𝔞𝔱𝔱𝔬𝔬', '𝕋𝕒𝕥𝕥𝕠𝕠', '𝓣𝓪𝓽𝓽𝓸𝓸', '𝕿𝖆𝖙𝖙𝖔𝖔', '𝒯𝒶𝓉𝓉𝑜𝑜'],
  'gaming-font-generator': ['G̲a̲m̲i̲n̲g̲', 'G͟a͟m͟i͟n͟g͟', 'G̳a̳m̳i̳n̳g̳', 'G̲̲a̲̲m̲̲i̲̲n̲̲g̲̲', 'G͓̽a͓̽m͓̽i͓̽n͓̽g͓̽', 'G̾a̾m̾i̾n̾g̾'],
  'retro-font-generator': ['ℝ𝕖𝕥𝕣𝕠', 'Ｒｅｔｒｏ', 'R̲e̲t̲r̲o̲', 'R͟e͟t͟r͟o͟', 'R̳e̳t̳r̳o̳', 'R̾e̾t̾r̾o̾'],
  'vintage-font-generator': ['𝖁𝖎𝖓𝖙𝖆𝖌𝖊', '𝕍𝕚𝕟𝕥𝕒𝕘𝕖', '𝔙𝔦𝔫𝔱𝔞𝔤𝔢', '𝓥𝓲𝓷𝓽𝓪𝓰𝓮', 'V̲i̲n̲t̲a̲g̲e̲', 'V͟i͟n͟t͟a͟g͟e͟'],
  'neon-font-generator': ['N̲e̲o̲n̲', 'N͟e͟o͟n͟', 'N̳e̳o̳n̳', 'N̾e̾o̾n̾', 'N͓̽e͓̽o͓̽n͓̽', 'N̲̲e̲̲o̲̲n̲̲'],
  'glitch-font-generator': ['G̴l̷i̴t̶c̵h̶', 'G̸l̵i̴t̶c̷h̸', 'G̷l̴i̶t̵c̴h̷', 'G̶l̵i̷t̴c̶h̵', 'G̴̨l̵̢i̶̧t̴̨c̵̢ḩ̶', 'Ģ̷l̴̨i̵̢ţ̶c̴̨h̵̢']
};

// Generate varied introductions
function generateIntroduction(fontStyle: string, platform: string, variant: number): string {
  const intros = [
    `Transform your ${platform} presence with this ${fontStyle} font generator. Convert plain text into eye-catching Unicode ${fontStyle} fonts that you can copy and paste anywhere on ${platform}. Perfect for bios, captions, Stories, and comments, this free tool delivers instant results without downloads or signups.`,
    
    `Make your ${platform} profile stand out with stylish ${fontStyle} text. This ${fontStyle} font generator for ${platform} transforms ordinary characters into unique Unicode fonts you can use in your bio, posts, and messages. It's a fast, free Unicode converter designed for creators who want distinctive typography.`,
    
    `Elevate your ${platform} content with this ${fontStyle} font generator. Create stunning ${fontStyle} text using Unicode characters that work across all devices. Copy and paste your styled text into bios, usernames, captions, and comments to boost engagement and express your creativity.`,
    
    `Want to add personality to your ${platform} profile? This ${fontStyle} font generator converts regular text into beautiful Unicode ${fontStyle} styles instantly. Use it for your bio, display name, post captions, and more. It's completely free and works on all devices.`,
    
    `Stand out on ${platform} with unique ${fontStyle} fonts. This online ${fontStyle} text generator uses Unicode to create stylish, copy-paste-ready text for your profile, posts, and Stories. No installation required—just type, convert, and paste your creative ${fontStyle} text anywhere on ${platform}.`
  ];
  return intros[variant % intros.length];
}

// Generate "What is" section
function generateWhatIs(fontStyle: string, variant: number): string {
  const explanations = [
    `A ${fontStyle} font generator is an online tool that converts standard text into ${fontStyle}-styled Unicode characters. Unlike image-based fonts, these are actual text characters from the Unicode standard, meaning they're searchable, selectable, and compatible across platforms. The generator maps each letter to its ${fontStyle} Unicode equivalent, creating stylish text you can copy and paste into bios, captions, usernames, and comments without any special software.`,
    
    `This ${fontStyle} font generator transforms regular characters into visually distinctive ${fontStyle} Unicode glyphs. It works by replacing standard letters with their ${fontStyle} counterparts from the Unicode character set. Because the output is real text (not images), it remains fully functional—you can select it, search it, and paste it anywhere. Perfect for social media typography, profile customization, and creative content.`,
    
    `The ${fontStyle} font generator is a Unicode text converter that creates ${fontStyle}-styled characters from plain text. It leverages the vast Unicode standard, which includes thousands of special characters and symbols. By mapping standard letters to ${fontStyle} Unicode variants, this tool produces copy-paste-ready text that works in bios, posts, comments, and messages across all modern platforms and devices.`,
    
    `A ${fontStyle} font generator converts ordinary text into ${fontStyle} Unicode characters that look like custom fonts. These aren't images or special formatting—they're actual Unicode text characters that render natively on devices. This means your ${fontStyle} text is accessible, searchable, and compatible with usernames, bios, captions, and any text field that accepts Unicode input.`,
    
    `This tool is a ${fontStyle} Unicode converter that transforms plain characters into stylish ${fontStyle} text. It uses Unicode's mathematical alphanumeric symbols and other special character blocks to create ${fontStyle} typography. The result is genuine text that you can copy, paste, edit, and use anywhere—from social media bios to post captions, comments, and direct messages.`
  ];
  return explanations[variant % explanations.length];
}

// Generate "How to Use" section
function generateHowToUse(fontStyle: string, platform: string, variant: number): string {
  const guides = [
    `Using ${fontStyle} fonts on ${platform} is simple:\n1. Type your text in the input field above\n2. Browse the generated ${fontStyle} variations\n3. Click the copy button on your favorite style\n4. Paste into your ${platform} bio, caption, comment, or post\n\nYou can use ${fontStyle} text in ${platform} bios, display names, photo captions, Story text, Reels descriptions, and comments. Test different styles to find what matches your brand or personality.`,
    
    `Follow these steps to add ${fontStyle} fonts to ${platform}:\n1. Enter your desired text in the generator\n2. Select from hundreds of ${fontStyle} Unicode variations\n3. Copy the styled text with one click\n4. Apply it to your ${platform} profile, posts, or messages\n\nPro tips: Keep important info readable, mix ${fontStyle} text with plain copy for balance, and test on mobile to ensure clarity. Works in bios, usernames, captions, and comments.`,
    
    `Transform your ${platform} text in four easy steps:\n1. Input your message or phrase\n2. Choose from multiple ${fontStyle} font styles\n3. Copy your preferred variation\n4. Paste anywhere on ${platform}\n\nIdeal for ${platform} bios, profile names, post captions, Story overlays, and comment threads. The ${fontStyle} text works across all devices and ${platform} features.`,
    
    `Here's how to use ${fontStyle} fonts on ${platform}:\n1. Type or paste your text into the generator\n2. Scroll through the ${fontStyle} style options\n3. Click to copy your chosen style\n4. Insert into ${platform} bios, posts, or comments\n\nBest practices: Use ${fontStyle} text for headlines and key phrases, maintain readability for longer content, and test across devices. Compatible with all ${platform} text fields.`,
    
    `Getting started with ${fontStyle} text on ${platform}:\n1. Write your content in the input box\n2. Explore the ${fontStyle} Unicode variations\n3. Copy the style that fits your aesthetic\n4. Paste into ${platform} bios, captions, or messages\n\nUse ${fontStyle} fonts to enhance ${platform} profiles, post descriptions, Story text, Reels captions, and comment sections. The text remains editable and searchable after pasting.`
  ];
  return guides[variant % guides.length];
}

// Generate benefits section
function generateBenefits(fontStyle: string, platform: string, variant: number): string {
  const benefits = [
    `Using ${fontStyle} fonts on ${platform} offers multiple advantages. Stand out in crowded feeds with distinctive typography that catches the eye. Build brand identity by maintaining consistent ${fontStyle} styling across your profile, posts, and comments. Boost engagement as unique text formatting encourages users to stop scrolling and interact. Express creativity without design skills—transform any message into visually appealing ${fontStyle} text. Plus, it's completely free and works instantly on all devices.`,
    
    `${fontStyle} fonts enhance your ${platform} presence in several ways. Increase visibility with eye-catching text that differentiates your content from standard posts. Strengthen branding by using signature ${fontStyle} styles that followers recognize. Drive interaction as styled text naturally draws attention and curiosity. Personalize your profile with unique typography that reflects your aesthetic. The ${fontStyle} generator is free, fast, and requires no technical knowledge.`,
    
    `There are key benefits to using ${fontStyle} text on ${platform}. Capture attention with formatted text that stands out in bios and captions. Create consistency across your ${platform} content with recognizable ${fontStyle} styling. Improve engagement rates as distinctive typography encourages clicks and comments. Showcase personality through creative text choices that match your brand or mood. This ${fontStyle} tool is accessible, instant, and completely free to use.`,
    
    `${fontStyle} fonts provide tangible advantages for ${platform} users. Differentiate your profile with unique typography that separates you from competitors. Establish visual identity using consistent ${fontStyle} text across bios, posts, and Stories. Attract engagement as styled text naturally increases dwell time and interaction. Express individuality without needing graphic design tools. The ${fontStyle} generator delivers professional results instantly and at no cost.`,
    
    `Leveraging ${fontStyle} text on ${platform} brings multiple benefits. Enhance discoverability with distinctive formatting that makes profiles memorable. Build brand recognition through consistent ${fontStyle} typography across all content. Increase engagement metrics as unique text styling prompts more likes, shares, and comments. Communicate style effortlessly with ${fontStyle} fonts that match your aesthetic. This free tool makes professional typography accessible to everyone.`
  ];
  return benefits[variant % benefits.length];
}

// Generate comparison section
function generateComparison(fontStyle: string, variant: number): string {
  const comparisons = [
    `${fontStyle} Text vs Normal Text: Key Differences\n\n${fontStyle} text uses Unicode characters from extended character sets, while normal text relies on basic ASCII. The ${fontStyle} generator maps standard letters to visually styled Unicode equivalents. These are actual characters, not formatting or images. This means ${fontStyle} text remains selectable, searchable, and copy-paste compatible. Rendering depends on device fonts, so appearance may vary slightly between iOS, Android, and desktop. For best results, use ${fontStyle} text for short phrases and headlines rather than long paragraphs, ensuring readability and accessibility.`,
    
    `Understanding ${fontStyle} vs Standard Text\n\nStandard text uses the basic Latin alphabet (ASCII), while ${fontStyle} text leverages Unicode's mathematical alphanumeric symbols and special character blocks. When you use this ${fontStyle} generator, it performs character mapping, replacing each letter with its ${fontStyle} Unicode counterpart. The output is genuine text, not styling or graphics, so it works in any text field. Device and platform fonts affect rendering, meaning ${fontStyle} characters may look slightly different on various systems. Use ${fontStyle} text strategically for impact without sacrificing readability.`,
    
    `${fontStyle} Typography vs Plain Characters\n\nPlain text consists of standard ASCII characters (A-Z, a-z, 0-9). ${fontStyle} text uses Unicode code points from specialized blocks, including mathematical bold, script, fraktur, and more. This ${fontStyle} font generator performs symbol mapping, converting each character to its ${fontStyle} equivalent. Because these are real Unicode characters, they're searchable and compatible across platforms. Rendering quality depends on system fonts, so test on target devices. Best practice: use ${fontStyle} text for emphasis and branding, not entire paragraphs.`,
    
    `${fontStyle} Characters vs Regular Characters\n\nRegular text uses the standard character set built into keyboards and basic fonts. ${fontStyle} text draws from Unicode's vast library of special characters, with over 100,000 code points including styled alphabets. The ${fontStyle} generator maps your input to these decorative Unicode characters through character substitution. The result is actual text (not images), maintaining functionality for copying, pasting, and searching. Device fonts determine exact appearance, so ${fontStyle} text may render with minor variations. Use it for headlines, bios, and key phrases.`,
    
    `Comparing ${fontStyle} and Standard Text\n\nStandard text uses ASCII and basic Unicode (U+0000 to U+007F). ${fontStyle} text utilizes extended Unicode blocks containing thousands of stylized characters. This ${fontStyle} converter performs one-to-one character mapping, replacing plain letters with ${fontStyle} Unicode equivalents. The output remains text, selectable, searchable, and paste-able, not formatting or images. Rendering depends on device and platform fonts, so appearance can vary. For optimal results, apply ${fontStyle} text to short, impactful phrases rather than lengthy content.`
  ];
  return comparisons[variant % comparisons.length];
}

// Generate FAQs
function generateFAQs(fontStyle: string, platform: string, variant: number): { question: string; answer: string }[] {
  const faqSets = [
    [
      {
        question: `Can I use ${fontStyle} fonts in my ${platform} bio?`,
        answer: `Yes, absolutely. Copy the ${fontStyle} text from the generator and paste it directly into your ${platform} bio or profile description. Most ${fontStyle} Unicode characters display correctly across devices, though rendering may vary slightly between iOS and Android.`
      },
      {
        question: `Is this ${fontStyle} font generator free?`,
        answer: `Yes, this tool is completely free with no hidden costs, subscriptions, or limits. Generate unlimited ${fontStyle} text variations and use them anywhere on ${platform} or other platforms.`
      },
      {
        question: `Will ${fontStyle} text work in ${platform} usernames?`,
        answer: `It depends on ${platform}'s username policies. Some platforms restrict special characters in usernames. Test your ${fontStyle} text in the username field—if it saves successfully, you're good to go. Bios and captions typically have fewer restrictions.`
      },
      {
        question: `Why does my ${fontStyle} text look different on mobile vs desktop?`,
        answer: `Unicode rendering depends on device fonts. iOS, Android, Windows, and Mac each have slightly different font libraries, so ${fontStyle} characters may appear with minor stylistic variations. The text remains functional across all platforms.`
      }
    ],
    [
      {
        question: `Does ${fontStyle} text affect ${platform} SEO or reach?`,
        answer: `${fontStyle} text is still searchable text, so it doesn't harm discoverability. However, use it strategically—keep key hashtags and searchable terms in standard format, and apply ${fontStyle} styling to headlines and creative elements for best results.`
      },
      {
        question: `Can I edit ${fontStyle} text after pasting it on ${platform}?`,
        answer: `Yes, ${fontStyle} text is editable like any other text. You can modify, delete, or add to it after pasting. To change the style, you'll need to regenerate the text using this ${fontStyle} font generator.`
      },
      {
        question: `Is ${fontStyle} text safe to use on ${platform}?`,
        answer: `Yes, ${fontStyle} text uses standard Unicode characters that are safe and widely supported. There's no risk to your account. However, avoid excessive use in spam-like patterns, and ensure your content remains readable and compliant with ${platform}'s community guidelines.`
      },
      {
        question: `How many ${fontStyle} variations can I generate?`,
        answer: `This generator provides 300-500 unique ${fontStyle} variations per session. You can generate unlimited text—simply type new content and browse fresh ${fontStyle} styles. All variations are instantly copy-paste ready.`
      }
    ],
    [
      {
        question: `Will ${fontStyle} fonts work on ${platform} mobile app?`,
        answer: `Yes, ${fontStyle} text works perfectly in the ${platform} mobile app. Copy the styled text and paste it into bios, captions, comments, or messages. The text displays correctly on both iOS and Android devices.`
      },
      {
        question: `Can I use ${fontStyle} text in ${platform} ads or promoted posts?`,
        answer: `You can try, but some advertising platforms have stricter character restrictions. Test your ${fontStyle} text in the ad preview—if it displays correctly and passes review, you're set. For critical ad copy, consider using standard text with ${fontStyle} accents.`
      },
      {
        question: `Do ${fontStyle} fonts slow down ${platform} loading?`,
        answer: `No, ${fontStyle} text is lightweight Unicode characters, not images or custom fonts. It loads instantly and doesn't impact ${platform} performance or page speed.`
      },
      {
        question: `Can screen readers interpret ${fontStyle} text?`,
        answer: `Screen readers typically read ${fontStyle} Unicode characters, but pronunciation may vary. For accessibility, use ${fontStyle} text for decorative elements and keep essential information in standard format.`
      }
    ]
  ];
  return faqSets[variant % faqSets.length];
}

// Generate related tools section
function generateRelatedTools(fontStyle: string, platform: string, allFontTypes: string[]): string {
  const otherFonts = allFontTypes
    .filter(ft => ft !== fontStyle)
    .slice(0, 3)
    .map(ft => {
      const name = FONT_STYLE_NAMES[ft] || ft.replace('-font-generator', '').replace('-text-generator', '');
      return `<a href="/${platform}/${ft}" class="text-blue-600 hover:underline">${name} Font Generator for ${PLATFORM_NAMES[platform] || platform}</a>`;
    });
  
  return `Explore more font styles for ${PLATFORM_NAMES[platform] || platform}: ${otherFonts.join(', ')}. Each generator offers hundreds of unique Unicode variations to enhance your ${PLATFORM_NAMES[platform] || platform} content.`;
}

// Main function to generate SEO content
export function generateSEOContent(
  platform: string,
  fontType: string,
  allFontTypes: string[]
): SEOContent {
  const fontStyle = FONT_STYLE_NAMES[fontType] || fontType.replace('-font-generator', '').replace('-text-generator', '');
  const platformName = PLATFORM_NAMES[platform] || platform;
  
  // Create a deterministic variant based on platform and font type
  const variant = (platform.charCodeAt(0) + fontType.charCodeAt(0)) % 5;
  
  const examples = UNICODE_EXAMPLES[fontType] || ['Example 1', 'Example 2', 'Example 3', 'Example 4'];
  const exampleItems = examples.map((ex, idx) => {
    const useCases = [
      'Perfect for profile bios and headers',
      'Great for post captions and titles',
      'Ideal for Story text and overlays',
      'Excellent for usernames and display names',
      'Works well in comments and replies',
      'Best for highlight covers and descriptions'
    ];
    return `<li><strong>${ex}</strong> – ${useCases[idx % useCases.length]}</li>`;
  });

  const cleanedExampleItems = exampleItems.map(item => clean(item));
  return {
    h1: clean(`${fontStyle} Font Generator for ${platformName} – Free Stylish Unicode Text Tool`),
    introduction: clean(generateIntroduction(fontStyle, platformName, variant)),
    whatIs: {
      title: clean(`What is a ${fontStyle} Font Generator?`),
      content: clean(generateWhatIs(fontStyle, variant))
    },
    howToUse: {
      title: clean(`How to Use ${fontStyle} Fonts on ${platformName}`),
      content: clean(generateHowToUse(fontStyle, platformName, variant))
    },
    examples: {
      title: clean(`Popular ${fontStyle} Font Styles & Examples`),
      items: cleanedExampleItems
    },
    benefits: {
      title: clean(`Benefits of ${fontStyle} Fonts on ${platformName}`),
      content: clean(generateBenefits(fontStyle, platformName, variant))
    },
    comparison: {
      title: clean(`${fontStyle} Text vs Normal Text – Key Differences`),
      content: clean(generateComparison(fontStyle, variant))
    },
    faqs: {
      title: clean(`FAQs About ${fontStyle} Font Generator for ${platformName}`),
      items: generateFAQs(fontStyle, platformName, variant).map(f => ({ question: clean(f.question), answer: clean(f.answer) }))
    },
    relatedTools: {
      title: clean(`Try More Font Tools`),
      content: clean(generateRelatedTools(fontType, platform, allFontTypes))
    }
  };
}
