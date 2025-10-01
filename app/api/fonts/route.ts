import { NextResponse } from 'next/server';
import { getFontsByCategory } from '@/lib/font-utils';

// Cache for API responses
const cache = new Map<string, { timestamp: number; data: any }>();
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour cache

// Enable CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || '';
  const count = Math.min(parseInt(searchParams.get('count') || '500'), 1000); // Max 1000 fonts

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders
    });
  }

  if (!category) {
    return new NextResponse(
      JSON.stringify({ error: 'Category parameter is required' }),
      { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }

  // Check cache first
  const cacheKey = `${category}:${count}`;
  const cached = cache.get(cacheKey);
  
  if (cached && (Date.now() - cached.timestamp < CACHE_DURATION)) {
    return new NextResponse(JSON.stringify({
      success: true,
      count: cached.data.length,
      fonts: cached.data,
      cached: true
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-Cache': 'HIT',
        ...corsHeaders
      }
    });
  }

  try {
    console.time(`Generate fonts for ${category}`);
    const fonts = getFontsByCategory(category, count);
    console.timeEnd(`Generate fonts for ${category}`);
    
    // Cache the result
    cache.set(cacheKey, {
      timestamp: Date.now(),
      data: fonts
    });

    return new NextResponse(JSON.stringify({
      success: true,
      count: fonts.length,
      fonts,
      cached: false
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        ...corsHeaders
      }
    });
  } catch (error) {
    console.error('Error generating fonts:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to generate fonts' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
}
