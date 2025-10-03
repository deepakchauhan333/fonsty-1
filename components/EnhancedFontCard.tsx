'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { UnicodeVariation } from '@/lib/enhanced-unicode-variations';

interface EnhancedFontCardProps {
  font: UnicodeVariation;
  index: number;
  variant?: 'compact' | 'featured' | 'grid';
}

export default function EnhancedFontCard({ font, index, variant = 'grid' }: EnhancedFontCardProps) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const copyToClipboard = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(font.unicode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'featured':
        return {
          container: 'relative group bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border-2 border-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300 cursor-pointer min-h-[120px]',
          text: 'text-2xl font-medium break-words text-center',
          button: 'absolute top-3 right-3 p-3 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-600 transition-all duration-200 opacity-0 group-hover:opacity-100',
          name: 'text-xs text-gray-500 mt-2 text-center truncate'
        };
      case 'compact':
        return {
          container: 'relative group bg-white p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-200 cursor-pointer',
          text: 'text-lg font-medium break-words',
          button: 'absolute top-2 right-2 p-1.5 rounded-full bg-gray-100 hover:bg-purple-100 text-gray-600 hover:text-purple-600 transition-all duration-200 opacity-0 group-hover:opacity-100',
          name: 'text-xs text-gray-400 mt-1 truncate'
        };
      default:
        return {
          container: 'relative group bg-white p-4 rounded-lg border-2 border-gray-200 hover:border-purple-300 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer',
          text: 'text-xl font-medium break-words text-center',
          button: 'absolute top-2 right-2 p-2 rounded-full bg-gray-100 hover:bg-purple-100 text-gray-600 hover:text-purple-600 transition-all duration-200 opacity-0 group-hover:opacity-100',
          name: 'text-xs text-gray-500 mt-2 text-center truncate'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      className={styles.container}
      onClick={copyToClipboard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Font Text */}
      <div className="flex items-center justify-center min-h-[60px]">
        <span 
          className={`${styles.text} ${font.className || ''}`}
          style={{
            textShadow: font.category === 'glowing' ? '0 0 10px currentColor' : undefined,
            filter: font.category === 'corrupted' ? 'blur(0.5px)' : undefined
          }}
        >
          {font.unicode}
        </span>
      </div>

      {/* Font Name */}
      <div className={styles.name}>
        {font.name}
      </div>

      {/* Category Badge */}
      <div className="absolute top-2 left-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {font.category}
      </div>

      {/* Copy Button */}
      <button
        className={styles.button}
        onClick={copyToClipboard}
        aria-label="Copy to clipboard"
      >
        {copied ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-green-600"
          >
            <FiCheck size={variant === 'compact' ? 14 : 16} />
          </motion.div>
        ) : (
          <FiCopy size={variant === 'compact' ? 14 : 16} />
        )}
      </button>

      {/* Copied Notification */}
      {copied && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -10 }}
          className="absolute inset-0 flex items-center justify-center bg-green-500/90 rounded-lg"
        >
          <div className="text-white font-semibold flex items-center gap-2">
            <FiCheck size={20} />
            <span>Copied!</span>
          </div>
        </motion.div>
      )}

      {/* Hover Effect Overlay */}
      {isHovered && variant === 'featured' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl pointer-events-none"
        />
      )}
    </motion.div>
  );
}
