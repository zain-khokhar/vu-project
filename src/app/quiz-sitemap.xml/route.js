import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;
  
  return NextResponse.redirect(`${baseUrl}/sitemap.xml`, {
    status: 301,
    headers: {
      'Cache-Control': 'public, max-age=3600, immutable',
    },
  });
}
