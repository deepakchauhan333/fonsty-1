// This file contains functions to generate various font styles for the text generator

// Base font style generator
export function generateFontStyles(text: string): Array<{ name: string; text: string }> {
  if (!text.trim()) return [];

  const styles: Array<{ name: string; text: string }> = [];
  
  // Basic styles
  styles.push({ name: 'Bold', text: `**${text}**` });
  styles.push({ name: 'Italic', text: `*${text}*` });
  styles.push({ name: 'Bold Italic', text: `***${text}***` });
  styles.push({ name: 'Underline', text: `__${text}__` });
  styles.push({ name: 'Strikethrough', text: `~~${text}~~` });
  styles.push({ name: 'Code', text: `\`${text}\`` });
  
  // Cursive/script styles
  styles.push({ name: 'Cursive', text: `𝒻𝒶𝓃𝒸𝓎 ${text}` });
  styles.push({ name: 'Bold Cursive', text: `𝓯𝓪𝓷𝓬𝔂 ${text}` });
  styles.push({ name: 'Script', text: `𝓯𝓻𝓮𝓮 ${text}` });
  
  // Monospace
  styles.push({ name: 'Monospace', text: `𝚖𝚘𝚗𝚘 ${text}` });
  
  // Double-struck (for math symbols)
  styles.push({ name: 'Double-struck', text: `𝕞𝕒𝕥𝕙 ${text}` });
  
  // Fullwidth (for Asian typography)
  styles.push({ name: 'Fullwidth', text: `ｆｕｌｌｗｉｄｔｈ ${text}` });
  
  // Circled
  styles.push({ name: 'Circled', text: `ⓒⓘⓡⓒⓛⓔⓓ ${text}` });
  
  // Inverted
  styles.push({ name: 'Inverted', text: `ɐᴉlɐɹʇsnⱯ ${text}` });
  
  // Bubble text
  styles.push({ name: 'Bubble', text: `ⓑⓤⓑⓑⓛⓔ ${text}` });
  
  // Small caps
  styles.push({ name: 'Small Caps', text: `sᴍᴀʟʟ ᴄᴀᴘs ${text}` });
  
  // Upside down
  styles.push({ name: 'Upside Down', text: `ʇxǝʇ uʍop ǝpᴉsdn` });
  
  // Morse code (just for fun)
  styles.push({ 
    name: 'Morse Code', 
    text: `--. . -. . .-. .- - --- .-. .-.-.-`
  });
  
  // Zalgo text (corrupted/creepy)
  styles.push({ 
    name: 'Zalgo', 
    text: `Z̴̡̧̨̡̛̛̭̖̬̬̹̩̭̑̈́̐̆̾̽͗̎̉̾͐͝͝Ä̸̬̹̰̗͉̲͉́̌̈́͌͆̈́͒̈́̈́̇L̴̡̖̤̭̀̔̿͐̈́̽̓͆̽̈́̇̑̑̉́Ģ̷̨̮̘̞̖̳͂́̈́̅̆͋͌̿̕͝͝͝O̵̹̖̖̦̦̙̙̠̝̳̳͖̒̐͑̅̽̈́̇̇͒̏͠ͅ ${text}`
  });
  
  // Vaporwave aesthetic
  styles.push({ 
    name: 'Vaporwave', 
    text: `ａｅｓｔｈｅｔｉｃ ${text} ＡＥＳＴＨＥＴＩＣ`
  });
  
  // Fraktur (gothic)
  styles.push({ 
    name: 'Gothic', 
    text: `𝔊𝔬𝔱𝔥𝔦𝔠 ${text}`
  });
  
  // Bold Fraktur
  styles.push({ 
    name: 'Bold Gothic', 
    text: `𝕲𝖔𝖙𝖍𝖎𝖈 ${text}`
  });
  
  // Squared text
  styles.push({ 
    name: 'Squared', 
    text: `🅢🅠🅤🅐🅡🅔🅓 ${text}`
  });
  
  // Negative squared text
  styles.push({ 
    name: 'Negative Squared', 
    text: `🅽🅴🅶🅰🆃🅸🆅🅴 ${text}`
  });
  
  // Parenthesized text
  styles.push({ 
    name: 'Parenthesized', 
    text: `⒫⒜⒭⒠⒩⒯⒣⒠⒮ ${text}`
  });
  
  // Circled negative text
  styles.push({ 
    name: 'Circled Negative', 
    text: `🅒🅘🅡🅒🅛🅔🅓 ${text}`
  });
  
  // Small text
  styles.push({ 
    name: 'Tiny', 
    text: `ᵗⁱⁿʸ ${text}`
  });
  
  // Strikethrough with double line
  styles.push({ 
    name: 'Double Strikethrough', 
    text: `̶S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶ ${text}`
  });
  
  // Dotted underline
  styles.push({ 
    name: 'Dotted Underline', 
    text: `D̤o̤t̤t̤e̤d̤ ${text}`
  });
  
  // Wavy underline
  styles.push({ 
    name: 'Wavy Underline', 
    text: `W̰a̰v̰y̰ ${text}`
  });
  
  // Strikethrough with wavy line
  styles.push({ 
    name: 'Wavy Strikethrough', 
    text: `S̴t̴r̴i̴k̴e̴t̴h̴r̴o̴u̴g̴h̴ ${text}`
  });
  
  // Overline
  styles.push({ 
    name: 'Overline', 
    text: `O̅v̅e̅r̅l̅i̅n̅e̅ ${text}`
  });
  
  // Double overline
  styles.push({ 
    name: 'Double Overline', 
    text: `O̿v̿e̿r̿l̿i̿n̿e̿ ${text}`
  });
  
  // Slashed text
  styles.push({ 
    name: 'Slashed', 
    text: `S̸l̸a̸s̸h̸e̸d̸ ${text}`
  });
  
  // Crossed text
  styles.push({ 
    name: 'Crossed', 
    text: `C̷r̷o̷s̷s̷e̷d̷ ${text}`
  });
  
  // Heavy cross
  styles.push({ 
    name: 'Heavy Cross', 
    text: `C͓̽r͓̽o͓̽s͓̽s͓̽e͓̽d͓̽ ${text}`
  });
  
  // Slashed with cross
  styles.push({ 
    name: 'Slashed Cross', 
    text: `S̷l̷a̷s̷h̷e̷d̷ ${text}`
  });
  
  // Tilde through
  styles.push({ 
    name: 'Tilde Through', 
    text: `T̴i̴l̴d̴e̴ ${text}`
  });
  
  // Wavy line through
  styles.push({ 
    name: 'Wavy Line', 
    text: `W̾a̾v̾y̾ ${text}`
  });
  
  // Double wavy line through
  styles.push({ 
    name: 'Double Wavy', 
    text: `D̾o̾u̾b̾l̾e̾ ${text}`
  });
  
  // Dotted text
  styles.push({ 
    name: 'Dotted', 
    text: `D̤o̤t̤t̤e̤d̤ ${text}`
  });
  
  // Dashed text
  styles.push({ 
    name: 'Dashed', 
    text: `D̠a̠s̠h̠e̠d̠ ${text}`
  });
  
  // Dotted and dashed text
  styles.push({ 
    name: 'Dotted & Dashed', 
    text: `D̤a̤s̤h̤e̤d̤ ${text}`
  });
  
  // Heavy dotted text
  styles.push({ 
    name: 'Heavy Dotted', 
    text: `H̤e̤a̤v̤y̤ ${text}`
  });
  
  // Heavy dashed text
  styles.push({ 
    name: 'Heavy Dashed', 
    text: `H̠e̠a̠v̠y̠ ${text}`
  });
  
  // Light dotted text
  styles.push({ 
    name: 'Light Dotted', 
    text: `L̤i̤g̤h̤t̤ ${text}`
  });
  
  // Light dashed text
  styles.push({ 
    name: 'Light Dashed', 
    text: `L̠i̠g̠h̠t̠ ${text}`
  });
  
  // Double strikethrough with wavy line
  styles.push({ 
    name: 'Double Wavy Strikethrough', 
    text: `D̴o̴u̴b̴l̴e̴ ${text}`
  });
  
  // Triple strikethrough
  styles.push({ 
    name: 'Triple Strikethrough', 
    text: `T̶r̶i̶p̶l̶e̶ ${text}`
  });
  
  // Triple wavy strikethrough
  styles.push({ 
    name: 'Triple Wavy', 
    text: `T̴r̴i̴p̴l̴e̴ ${text}`
  });
  
  // Heavy triple dash
  styles.push({ 
    name: 'Heavy Triple Dash', 
    text: `H̶e̶a̶v̶y̶ ${text}`
  });
  
  // Heavy triple wavy dash
  styles.push({ 
    name: 'Heavy Triple Wavy', 
    text: `H̴e̴a̴v̴y̴ ${text}`
  });
  
  // Heavy triple dash with wavy line
  styles.push({ 
    name: 'Heavy Triple Wavy Line', 
    text: `H̴e̴a̴v̴y̴ ${text}`
  });
  
  // Heavy triple dash with wavy line and dots
  styles.push({ 
    name: 'Heavy Wavy Dots', 
    text: `H̤e̤a̤v̤y̤ ${text}`
  });
  
  // Heavy triple dash with wavy line and dashes
  styles.push({ 
    name: 'Heavy Wavy Dashes', 
    text: `H̠e̠a̠v̠y̠ ${text}`
  });
  
  // Heavy triple dash with wavy line and dots and dashes
  styles.push({ 
    name: 'Heavy Wavy Dots & Dashes', 
    text: `H̤e̤a̠v̤y̠ ${text}`
  });
  
  // Heavy triple dash with wavy line and dots and dashes and more
  styles.push({ 
    name: 'Heavy Wavy Mix', 
    text: `H̤e̠a̤v̠y̤ ${text}`
  });
  
  // Add more styles as needed...
  
  return styles;
}

// Special font styles for specific categories
export function generateSpecialFontStyles(text: string, category: string): Array<{ name: string; text: string }> {
  if (!text.trim()) return [];
  
  const styles: Array<{ name: string; text: string }> = [];
  
  // Define category-specific styles
  const categoryStyles: Record<string, Array<{ name: string; transform: (t: string) => string }>> = {
    'attitude': [
      { name: 'Bold Attitude', transform: t => `𝐁𝐎𝐋𝐃 ${t.toUpperCase()}` },
      { name: 'Gothic Attitude', transform: t => `𝕲𝖔𝖙𝖍𝖎𝖈 ${t}` },
      { name: 'Strikethrough', transform: t => `S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶ ${t}` },
      { name: 'Slashed', transform: t => `S̸l̸a̸s̸h̸e̸d̸ ${t}` },
      { name: 'Crossed', transform: t => `C̷r̷o̷s̷s̷e̷d̷ ${t}` },
      { name: 'Heavy Cross', transform: t => `C͓̽r͓̽o͓̽s͓̽s͓̽e͓̽d͓̽ ${t}` },
      { name: 'Wavy', transform: t => `W̾a̾v̾y̾ ${t}` },
      { name: 'Double Wavy', transform: t => `D̾o̾u̾b̾l̾e̾ ${t}` },
    ],
    'boy': [
      { name: 'Bold', transform: t => `𝗕𝗢𝗟𝗗 ${t.toUpperCase()}` },
      { name: 'Strong', transform: t => `𝕊𝕥𝕣𝕠𝕟𝕘 ${t}` },
      { name: 'Boxed', transform: t => `🅑🅞🅧🅔🅓 ${t}` },
      { name: 'Squared', transform: t => `🆂🆀🆄🅰🆁🅴🅳 ${t}` },
      { name: 'Outline', transform: t => `🅾🆄🆃🅻🅸🅽🅴 ${t}` },
    ],
    'girl': [
      { name: 'Cute', transform: t => `𝒸𝓊𝓉𝑒 ${t}` },
      { name: 'Bubble', transform: t => `ⓑⓤⓑⓑⓛⓔ ${t}` },
      { name: 'Hearts', transform: t => `♥️ ${t} ♥️` },
      { name: 'Sparkles', transform: t => `✨ ${t} ✨` },
      { name: 'Pink', transform: t => `𝓅𝒾𝓃𝓀 ${t}` },
    ],
    'weird': [
      { name: 'Zalgo', transform: t => `Z̴A̴L̴G̴O̴ ${t}` },
      { name: 'Inverted', transform: t => `ɐᴉlɐɹʇsnⱯ ${t}` },
      { name: 'Upside Down', transform: t => `uʍop ǝpᴉsdn ${t}` },
      { name: 'Glitch', transform: t => `G̷l̷i̷t̷c̷h̷ ${t}` },
    ],
    'squiggle': [
      { name: 'Squiggle', transform: t => `s̾q̾u̾i̾g̾g̾l̾y̾ ${t}` },
      { name: 'Wavy', transform: t => `w̾a̾v̾y̾ ${t}` },
      { name: 'Curly', transform: t => `c̾u̾r̾l̾y̾ ${t}` },
    ],
    'boxed': [
      { name: 'Boxed', transform: t => `🅱🅾🆇🅴🅳 ${t}` },
      { name: 'Rounded Box', transform: t => `🄱🄾🅇🄴🄳 ${t}` },
      { name: 'Negative Box', transform: t => `🅽🅴🅶🅰🆃🅸🆅🅴 ${t}` },
    ],
    'cursive': [
      { name: 'Cursive', transform: t => `𝒸𝓊𝓇𝓈𝒾𝓋𝑒 ${t}` },
      { name: 'Bold Cursive', transform: t => `𝓫𝓸𝓵𝓭 ${t}` },
      { name: 'Script', transform: t => `𝓼𝓬𝓻𝓲𝓹𝓽 ${t}` },
    ],
    'fancy': [
      { name: 'Fancy', transform: t => `𝔉𝔞𝔫𝔠𝔶 ${t}` },
      { name: 'Gothic', transform: t => `𝕲𝖔𝖙𝖍𝖎𝖈 ${t}` },
      { name: 'Double Struck', transform: t => `𝔻𝕠𝕦𝕓𝕝𝕖 𝕊𝕥𝕣𝕦𝕔𝕜 ${t}` },
    ],
    'bubble': [
      { name: 'Bubble', transform: t => `ⓑⓤⓑⓑⓛⓔ ${t}` },
      { name: 'Circle', transform: t => `🅒🅘🅡🅒🅛🅔 ${t}` },
      { name: 'Rounded', transform: t => `🅡🅞🅤🅝🅓🅔🅓 ${t}` },
    ],
    'bio-names': [
      { name: 'Bold', transform: t => `𝗕𝗼𝗹𝗱 ${t}` },
      { name: 'Italic', transform: t => `𝙄𝙩𝙖𝙡𝙞𝙘 ${t}` },
      { name: 'Bold Italic', transform: t => `𝙱𝚘𝚕𝚍 𝙸𝚝𝚊𝚕𝚒𝚌 ${t}` },
    ],
    'bio-texts': [
      { name: 'Small Caps', transform: t => `sᴍᴀʟʟ ᴄᴀᴘs ${t}` },
      { name: 'Monospace', transform: t => `𝚖𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎 ${t}` },
      { name: 'Typewriter', transform: t => `𝚝𝚢𝚙𝚎𝚠𝚛𝚒𝚝𝚎𝚛 ${t}` },
    ],
    'blue': [
      { name: 'Bold Blue', transform: t => `🅑🅛🅤🅔 ${t}` },
      { name: 'Underline', transform: t => `🅤🅝🅓🅔🅡🅛🅘🅝🅔 ${t}` },
      { name: 'Double Underline', transform: t => `🅓🅞🅤🅑🅛🅔 ${t}` },
    ],
    'hit': [
      { name: 'Impact', transform: t => `I M P A C T ${t.toUpperCase()}` },
      { name: 'Punch', transform: t => `P̶U̶N̶C̶H̶ ${t}` },
      { name: 'Boom', transform: t => `💥 B O O M ${t.toUpperCase()}` },
    ],
    'joiner': [
      { name: 'Connected', transform: t => `C͙o͙n͙n͙e͙c͙t͙e͙d͙ ${t}` },
      { name: 'Linked', transform: t => `L͓̽i͓̽n͓̽k͓̽e͓̽d͓̽ ${t}` },
      { name: 'Chained', transform: t => `C̸h̸a̸i̸n̸e̸d̸ ${t}` },
    ],
    'arrow': [
      { name: 'Arrow Right', transform: t => `${t} →` },
      { name: 'Arrow Left', transform: t => `← ${t}` },
      { name: 'Double Arrow', transform: t => `⇨ ${t} ⇦` },
    ],
    'bricks': [
      { name: 'Brick Wall', transform: t => `🧱 ${t} 🧱` },
      { name: 'Bold Bricks', transform: t => `🅱🆁🅸🅲🅺 ${t}` },
      { name: 'Wall', transform: t => `🅦🅐🅛🅛 ${t}` },
    ],
    'strikes': [
      { name: 'Strikethrough', transform: t => `S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶ ${t}` },
      { name: 'Double Strike', transform: t => `D̶o̶u̶b̶l̶e̶ ${t}` },
      { name: 'Triple Strike', transform: t => `T̶r̶i̶p̶l̶e̶ ${t}` },
    ],
    // Default styles if category not found
    'default': [
      { name: 'Bold', transform: t => `**${t}**` },
      { name: 'Italic', transform: t => `*${t}*` },
      { name: 'Bold Italic', transform: t => `***${t}***` },
      { name: 'Underline', transform: t => `__${t}__` },
      { name: 'Strikethrough', transform: t => `~~${t}~~` },
    ]
  };

  // Get styles for the category or use default
  const selectedStyles = categoryStyles[category] || categoryStyles['default'];
  
  // Generate styles
  for (const style of selectedStyles) {
    try {
      styles.push({
        name: style.name,
        text: style.transform(text)
      });
    } catch (error) {
      console.error(`Error applying style ${style.name}:`, error);
    }
  }
  
  // Add some random styles if we don't have enough
  if (styles.length < 5) {
    const defaultStyles = categoryStyles['default'];
    for (let i = 0; i < Math.min(5 - styles.length, defaultStyles.length); i++) {
      const style = defaultStyles[i];
      styles.push({
        name: style.name,
        text: style.transform(text)
      });
    }
  }
  
  return styles;
}
