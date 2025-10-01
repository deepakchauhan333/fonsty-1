'use client';

import { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';

interface FontConverterProps {
  fontName: string;
  fontSlug: string;
}

export default function FontConverter({ fontName, fontSlug }: FontConverterProps) {
  const [inputText, setInputText] = useState('Type your text here');
  const [convertedText, setConvertedText] = useState('');
  const [copied, setCopied] = useState(false);

  // Convert text based on font style
  const convertText = (text: string): string => {
    // Simple conversion logic - you can expand this
    const conversions: Record<string, (t: string) => string> = {
      'bold': (t) => t.split('').map(c => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCharCode(code + 119743);
        if (code >= 97 && code <= 122) return String.fromCharCode(code + 119737);
        return c;
      }).join(''),
      'italic': (t) => t.split('').map(c => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCharCode(code + 119795);
        if (code >= 97 && code <= 122) return String.fromCharCode(code + 119789);
        return c;
      }).join(''),
      'cursive': (t) => t.split('').map(c => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCharCode(code + 119951);
        if (code >= 97 && code <= 122) return String.fromCharCode(code + 119945);
        return c;
      }).join(''),
    };

    // Detect font type from slug
    if (fontSlug.includes('bold')) return conversions.bold(text);
    if (fontSlug.includes('italic')) return conversions.italic(text);
    if (fontSlug.includes('cursive')) return conversions.cursive(text);
    
    // Default: return stylized version
    return `✨ ${text} ✨`;
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputText(newText);
    setConvertedText(convertText(newText));
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(convertedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Input Text
        </label>
        <textarea
          value={inputText}
          onChange={handleTextChange}
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          rows={4}
          placeholder="Type your text here..."
        />
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-medium text-gray-700">
            {fontName} Output
          </label>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {copied ? (
              <>
                <FiCheck size={18} />
                Copied!
              </>
            ) : (
              <>
                <FiCopy size={18} />
                Copy
              </>
            )}
          </button>
        </div>
        <div className="w-full p-4 bg-white border-2 border-blue-200 rounded-lg min-h-[120px] text-lg break-words">
          {convertedText || convertText(inputText)}
        </div>
      </div>
    </div>
  );
}
