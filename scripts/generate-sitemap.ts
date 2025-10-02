import { writeFileSync } from 'fs';
import { join } from 'path';

// Simple sitemap generator with just core pages
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fontys.vercel.app';

// Core pages only
const pages = [
  '', // Homepage
  'about',
  'privacy',
  'terms',
  'contact'
];

function generateSitemap() {
  console.log('Generating sitemap...');
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(page => {
      const path = page.startsWith('http') ? page : `${BASE_URL}/${page}`;
      const lastmod = new Date().toISOString();
      const changefreq = page === '' ? 'daily' : 'weekly';
      const priority = page === '' ? '1.0' : '0.7';
      
      return `
    <url>
      <loc>${path}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>`;
    })
    .join('')}
</urlset>`;

  try {
    // Ensure public directory exists
    const publicDir = join(process.cwd(), 'public');
    
    // Write sitemap to public directory
    writeFileSync(join(publicDir, 'sitemap.xml'), sitemap);
    console.log('✅ Sitemap generated successfully!');
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run the sitemap generator
generateSitemap();
