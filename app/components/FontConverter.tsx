'use client';

import { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';

interface FontConverterProps {
  fontName: string;
  fontSlug: string;
  googleFontName?: string; // The CSS font-family name
}

export default function FontConverter({ fontName, fontSlug, googleFontName }: FontConverterProps) {
  const [inputText, setInputText] = useState('Type your text here');
  const [copied, setCopied] = useState(false);

  // With real fonts, the conversion is visual. The text content remains the same.
  const convertedText = inputText;

  const sanitizeInput = (text: string): string => {
    // Remove potentially dangerous characters and limit length
    return text
      .replace(/[<>]/g, '') // Remove angle brackets to prevent HTML injection
      .slice(0, 5000); // Limit to 5000 characters
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const sanitized = sanitizeInput(e.target.value);
    setInputText(sanitized);
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
        <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 mb-2">
          Input Text
        </label>
        <textarea
          id="inputText"
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
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            disabled={!inputText}
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
        <div
          className="w-full p-4 bg-white border-2 border-blue-200 rounded-lg min-h-[120px] text-2xl break-words whitespace-pre-wrap"
          style={{ fontFamily: googleFontName ? `'${googleFontName}', sans-serif` : 'sans-serif' }}
        >
          {convertedText}
        </div>
      </div>
    </div>
  );
}
