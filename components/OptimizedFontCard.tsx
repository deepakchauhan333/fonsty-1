'use client';

import { memo, useState, useCallback } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { UnicodeVariation } from '@/lib/optimized-unicode-variations';

interface OptimizedFontCardProps {
  font: UnicodeVariation;
  variant?: 'compact' | 'featured' | 'grid';
}

const OptimizedFontCard = memo(({ font, variant = 'grid' }: OptimizedFontCardProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(font.unicode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [font.unicode]);

  const getStyles = () => {
    switch (variant) {
      case 'featured':
        return {
          container: 'group relative bg-gradient-to-br from-white to-purple-50/30 rounded-2xl border-2 border-purple-200/60 hover:border-purple-400 hover:shadow-[0_8px_30px_rgb(168,85,247,0.12)] transition-all duration-200 cursor-pointer overflow-hidden',
          content: 'p-4 min-h-[100px] flex flex-col items-center justify-center',
          text: 'text-xl font-semibold text-gray-800 break-words text-center leading-relaxed',
          button: 'absolute top-2 right-2 p-2.5 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-purple-500 text-purple-600 hover:text-white shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110',
        };
      case 'compact':
        return {
          container: 'group relative bg-white rounded-xl border border-gray-200/80 hover:border-purple-300 hover:shadow-lg transition-all duration-200 cursor-pointer',
          content: 'p-3 min-h-[70px] flex items-center justify-center',
          text: 'text-base font-semibold text-gray-800 break-words text-center',
          button: 'absolute top-1.5 right-1.5 p-2 rounded-lg bg-white/90 hover:bg-purple-500 text-purple-600 hover:text-white shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200',
        };
      default:
        return {
          container: 'group relative bg-white rounded-xl border border-gray-200/80 hover:border-purple-300 hover:shadow-[0_4px_20px_rgb(168,85,247,0.08)] transition-all duration-200 cursor-pointer',
          content: 'p-3.5 min-h-[85px] flex items-center justify-center',
          text: 'text-lg font-semibold text-gray-800 break-words text-center leading-relaxed',
          button: 'absolute top-2 right-2 p-2 rounded-xl bg-white/90 backdrop-blur-sm hover:bg-purple-500 text-purple-600 hover:text-white shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110',
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={styles.container} onClick={copyToClipboard}>
      <div className={styles.content}>
        <span className={styles.text}>{font.unicode}</span>
      </div>

      {/* Copy Button */}
      <button
        className={styles.button}
        onClick={copyToClipboard}
        aria-label="Copy to clipboard"
      >
        {copied ? <FiCheck size={16} className="text-green-600" /> : <FiCopy size={16} />}
      </button>

      {/* Copied Notification */}
      {copied && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
          <div className="text-white font-semibold flex items-center gap-2">
            <FiCheck size={20} />
            <span>Copied!</span>
          </div>
        </div>
      )}

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 to-pink-50/0 group-hover:from-purple-50/50 group-hover:to-pink-50/50 rounded-lg pointer-events-none transition-all duration-300" />
    </div>
  );
});

OptimizedFontCard.displayName = 'OptimizedFontCard';

export default OptimizedFontCard;
