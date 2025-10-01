'use client';

import { useState, useMemo } from 'react';
import { FontCard } from './FontCard';
import { type FontStyle } from '@/lib/unicode-data';

interface FontGeneratorProps {
  styles: FontStyle[];
  searchTerm: string;
  showSearch?: boolean;
}

export function FontGenerator({ 
  styles, 
  searchTerm, 
  showSearch = true 
}: FontGeneratorProps) {
  const [inputText, setInputText] = useState('Hello World');

  const filteredStyles = useMemo(() => {
    if (!searchTerm) return styles;
    return styles.filter(style =>
      style.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [styles, searchTerm]);

  const isSingleStyle = styles.length === 1;

  return (
    <div className="w-full">
      <div className={`mb-8 ${isSingleStyle ? 'max-w-3xl mx-auto' : ''}`}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your text here..."
          className={`w-full rounded-lg border border-gray-300 p-4 text-xl shadow-sm focus:border-primary-500 focus:ring-primary-500 ${
            isSingleStyle ? 'text-center text-2xl' : ''
          }`}
          rows={isSingleStyle ? 2 : 4}
        />
      </div>

      {showSearch && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search fonts..."
            value={searchTerm}
            onChange={(e) => {
              const params = new URLSearchParams(window.location.search);
              params.set('q', e.target.value);
              window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
            }}
            className="w-full max-w-md mx-auto block px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      )}

      <div className={`grid gap-4 ${isSingleStyle ? 'max-w-4xl mx-auto' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
        {filteredStyles.map(style => (
          <FontCard
            key={style.name}
            name={isSingleStyle ? undefined : style.name}
            convertedText={style.converter(inputText)}
            className={isSingleStyle ? 'text-4xl min-h-[200px]' : ''}
          />
        ))}
      </div>
      {filteredStyles.length === 0 && (
        <div className="col-span-full text-center text-gray-500">
            <p className="text-lg">No fonts found for "{searchTerm}".</p>
            <p>Try a different search term.</p>
        </div>
      )}
    </div>
  );
}
