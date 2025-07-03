<script>
    import { onMount } from 'svelte';
    export let allPoems = [];
  
    let selected = null;
    let modalHtml = "";
    let loading = false;
    let error = "";
  
    async function openModal(poem) {
      loading = true;
      error = "";
      selected = poem;
      modalHtml = "";
      try {
        const res = await fetch(`/content/poetry/${poem.slug}.html`);
        if (!res.ok) throw new Error("Failed to load poem");
        const html = await res.text();
        const temp = document.createElement("div");
        temp.innerHTML = html;
        const mainContent =
          temp.querySelector("main") ||
          temp.querySelector(".astro") ||
          temp.querySelector("article") ||
          temp;
        modalHtml = mainContent.innerHTML;
      } catch (e) {
        console.error(e);
        error = "Error loading poem.";
      }
      loading = false;
    }
  
    function closeModal() {
      selected = null;
      modalHtml = "";
      loading = false;
      error = "";
    }
  
    onMount(() => {
      const esc = (e) => {
        if (e.key === 'Escape') selected = null;
      };
      window.addEventListener('keydown', esc);
      return () => window.removeEventListener('keydown', esc);
    });
  </script>
  
  <div class="poem-list">
    {#each allPoems as poem, idx}
      {#if poem.frontmatter}
        <div class="poem-card" on:click={() => openModal(poem)}>
          <h3>{poem.frontmatter.title}</h3>
          {#if poem.frontmatter.author}
            <p class="author">{poem.frontmatter.author}</p>
          {/if}
        </div>
      {/if}
    {/each}
  </div>
  
  {#if selected}
    <div class="modal-backdrop" on:click={closeModal}>
      <div class="modal" on:click|stopPropagation>
        <h2>{selected.frontmatter.title}</h2>
        {#if selected.frontmatter.author}
          <p class="author">by {selected.frontmatter.author}</p>
        {/if}
        {#if loading}
          <p style="padding:1rem;">Loading…</p>
        {:else if error}
          <p class="error" style="padding:1rem;color:red;">{error}</p>
        {:else}
          <div class="poem-body">{@html modalHtml}</div>
        {/if}
        <button class="close-btn" on:click={closeModal}>Close</button>
      </div>
    </div>
  {/if}
  
  <style>
    .poem-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 1rem;
    }
  
    .poem-card {
      background: #111;
      color: #fff;
      padding: 1rem 1.5rem;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.25s;
    }
  
    .poem-card:hover {
      background: #222;
    }
  
    .author {
      font-size: 0.9rem;
      opacity: 0.8;
    }
  
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.85);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
  
    .modal {
      background: #000;
      color: #fff;
      padding: 2rem;
      max-width: 600px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
      border-radius: 8px;
      box-shadow: 0 0 30px rgba(0,0,0,0.5);
    }
  
    .poem-body {
      white-space: pre-wrap;
      line-height: 1.6;
      font-family: "Earthbound", monospace;
    }
  
    .close-btn {
      margin-top: 1.5rem;
      padding: 0.5rem 1rem;
      background: #fff;
      color: #000;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  </style> 