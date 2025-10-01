/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React's experimental features
  reactStrictMode: true,
  
  // Add support for Unicode characters
  experimental: {
    optimizeCss: true,
  },
  
  // Add headers for better font loading
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/html; charset=utf-8',
          },
        ],
      },
    ];
  },
  
  // Improve chunk loading
  webpack: (config, { isServer, dev }) => {
    // Only run this in production and on client-side
    if (!isServer && !dev) {
      // Enable webpack's chunk splitting
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          default: false,
          vendors: false,
          // Common chunks
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            priority: 40,
            enforce: true,
            reuseExistingChunk: true,
          },
          // Common modules
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'async',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      };
    }

    // Important: return the modified config
    return config;
  },
  
  // Add headers for better caching
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
