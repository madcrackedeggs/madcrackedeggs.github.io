<script lang="ts">
  import { onMount } from 'svelte';

  interface VideoItem {
    title: string;
    videoId: string;
    published: string;
    thumbnailURL: string;
    link: string;
    rotation: number;
  }

  let videos: VideoItem[] = [];
  let loading = true;
  let error: string | null = null;

  // Fetch via server-side proxy endpoint to bypass CORS
  const FEED_URL = '/api/youtube-feed.xml';

  onMount(async () => {
    try {
      const res = await fetch(FEED_URL);
      if (!res.ok) throw new Error(`Failed to fetch feed: ${res.status}`);
      const xmlText = await res.text();

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

      const entries = Array.from(xmlDoc.getElementsByTagName('entry'));

      videos = entries.map((entry) => {
        const title = entry.getElementsByTagName('title')[0]?.textContent ?? '';
        const videoId = entry.getElementsByTagName('yt:videoId')[0]?.textContent ?? '';
        const published = entry.getElementsByTagName('published')[0]?.textContent ?? '';
        const thumbnailEl = entry.getElementsByTagName('media:thumbnail')[0] as HTMLElement | undefined;
        const thumbnailURL = (thumbnailEl?.getAttribute('url')) ?? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
        const link = `https://www.youtube.com/watch?v=${videoId}`;
        const rotation = Math.random() * 10 - 5;
        return { title, videoId, published, thumbnailURL, link, rotation } as VideoItem;
      });
    } catch (e) {
      console.error(e);
      error = (e as Error).message;
    } finally {
      loading = false;
    }
  });
</script>

<style>
  .videos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
    padding: 0;
  }

  .video-card {
    list-style: none;
    border: none;
    position: relative;
  }

  .vhs-card {
    display: block;
    position: relative;
    width: 100%;
    padding-top: 100%;
    background-image: url('/vhs.png');
    background-size: cover;
    background-position: center;
    text-decoration: none;
  }

  .video-title-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    padding: 0.5rem;
    text-align: center;
    color: #000;
    font-size: 0.8rem;
    font-weight: 500;
    line-height: 1.1;
    max-width: 100%;
  }
</style>

{#if loading}
  <p>Loading videos…</p>
{:else if error}
  <p style="color: red;">{error}</p>
{:else}
  <ul class="videos-grid">
    {#each videos as video}
      <li class="video-card">
        <a href={video.link} target="_blank" rel="noopener noreferrer" class="vhs-card" style="transform: rotate({video.rotation}deg);">
          <h3 class="video-title-overlay">{video.title.length > 30 ? `${video.title.slice(0, 40)}…` : video.title}</h3>
        </a>
      </li>
    {/each}
  </ul>
{/if}