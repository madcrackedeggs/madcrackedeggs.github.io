<script>
  import { onMount } from 'svelte';
  export let allImages = [];

  let selected = null;

  function openModal(front) {
    selected = front;
  }

  function closeModal() {
    selected = null;
  }

  onMount(() => {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        items.forEach((open) => {
          if (open !== item) open.classList.remove('open');
        });
        item.classList.add('open');
      });
      item.addEventListener('mouseleave', () => {
        item.classList.remove('open');
      });
    });
  });
</script>

<div class="gallery-grid">
  {#each allImages as imgObj, index}
    {#if imgObj.frontmatter}
      <div class="gallery-item" style={`z-index: ${allImages.length - index}`} on:click={() => openModal(imgObj.frontmatter)}>  
        <img src={imgObj.frontmatter.img} alt={imgObj.frontmatter.alt ?? imgObj.frontmatter.title} />
        <div class="image-title" style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0, 0, 0, 0.5); padding: 0.5rem; color: #fff; text-align: center;">
          <p>{imgObj.frontmatter.title}</p>
        </div>
        <div class="overlay">
          <h3>{imgObj.frontmatter.title}</h3>
          <p>{imgObj.frontmatter.description}</p>
        </div>
      </div>
    {/if}
  {/each}
</div>

{#if selected}
  <div class="modal-backdrop" on:click={closeModal}>
    <div class="modal" on:click|stopPropagation>
      <h2>{selected.title}</h2>
      <p>{selected.description}</p>
      <button class="close-btn" on:click={closeModal}>Close</button>
    </div>
  </div>
{/if}

<style>
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    padding: 1rem;
  }

  .gallery-item {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    cursor: pointer;
    transform: rotateY(-15deg);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.92);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    text-align: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease-in-out;
  }

  .overlay h3 {
    margin: 0 0 0.5rem;
    font-size: 1.2rem;
  }

  .overlay p {
    margin: 0;
    font-size: 0.9rem;
  }

  .gallery-item.open {
    transform: rotateY(0deg) scale(1.05);
    z-index: 1000;
    box-shadow: 0 10px 30px rgba(0,0,0,0.35);
  }

  .gallery-item.open .overlay {
    opacity: 1;
    pointer-events: auto;
  }

  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
  }

  .modal {
    background: #000;
    max-width: 90%;
    width: 400px;
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
    position: relative;
  }

  .close-btn {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: #000;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>