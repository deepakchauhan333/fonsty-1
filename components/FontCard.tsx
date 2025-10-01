'use client';

import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';

import { cn } from '@/lib/utils';

interface FontCardProps {
  name?: string;
  convertedText: string;
  className?: string;
}

export function FontCard({ name, convertedText, className = '' }: FontCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(convertedText);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={cn(
      "rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md flex flex-col items-center justify-center",
      className
    )}>
      {name && <h3 className="mb-4 text-sm font-semibold text-gray-600">{name}</h3>}
      <div className={cn(
        "mb-4 w-full overflow-hidden whitespace-pre-wrap rounded-md bg-gray-50 p-4 text-center",
        name ? 'text-lg' : 'text-4xl min-h-[150px] flex items-center justify-center'
      )}>
        {convertedText || <span className="text-gray-400">Type something to see the preview...</span>}
      </div>
      <button
        onClick={handleCopy}
        className={`w-full rounded-md px-4 py-3 text-sm font-medium text-white transition-colors ${copied ? 'bg-green-500' : 'bg-primary-600 hover:bg-primary-700'}`}>
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}
