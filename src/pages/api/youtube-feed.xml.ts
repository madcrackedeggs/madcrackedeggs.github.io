import type { APIRoute } from 'astro';

const YOUTUBE_FEED = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCcgpXr8FVngBP5xLPCPeiAA';

export const GET: APIRoute = async () => {
  try {
    const resp = await fetch(YOUTUBE_FEED);
    if (!resp.ok) {
      return new Response('Failed to fetch YouTube feed', { status: 502 });
    }

    const xml = await resp.text();

    return new Response(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=600'
      }
    });
  } catch (err) {
    return new Response('Error fetching feed', { status: 500 });
  }
}; 