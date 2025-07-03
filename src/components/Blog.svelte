<script>
	export let allPosts = [];
	import { onMount, tick } from "svelte";
	import { gsap } from "gsap";

	let selectedPost = null;
	let postContent = "";
	let loading = false;
	let error = "";

	console.log("All posts:", allPosts);

	async function loadPost(post) {
		loading = true;
		error = "";
		selectedPost = post;
		postContent = "";
		try {
			const res = await fetch(`/content/blog/${post.slug}.html`);
			if (!res.ok) throw new Error("Failed to load post");
			const html = await res.text();
			const temp = document.createElement("div");
			temp.innerHTML = html;
			const mainContent =
				temp.querySelector("main") ||
				temp.querySelector(".astro") ||
				temp.querySelector("article") ||
				temp;
			postContent = mainContent.innerHTML;
			await tick();
			animateEarthboundEffect();
		} catch (e) {
			error = "Error loading post.";
		}
		loading = false;
	}

	function goBack() {
		selectedPost = null;
		postContent = "";
		error = "";
	}

	function animateEarthboundEffect() {
		const blogContent = document.getElementById("blog-content");
		if (!blogContent) return;
		const lines = blogContent.querySelectorAll(
			"p, h1, h2, h3, h4, h5, h6, li",
		);
		lines.forEach((el, i) => {
			gsap.fromTo(
				el,
				{ y: 20, opacity: 0, filter: "blur(4px)" },
				{
					y: 0,
					opacity: 1,
					filter: "blur(0px)",
					duration: 0.7,
					delay: i * 0.08,
					ease: "back.out(2)",
				},
			);
			const text = el.textContent;
			el.innerHTML = "";
			text.split("").forEach((char, j) => {
				const span = document.createElement("span");
				span.textContent = char;
				span.style.display = "inline-block";
				el.appendChild(span);
				gsap.fromTo(
					span,
					{ y: 0 },
					{
						y: Math.sin(j / 2) * 4,
						repeat: -1,
						yoyo: true,
						duration: 1.2 + Math.random(),
						ease: "sine.inOut",
						delay: i * 0.08 + j * 0.01,
					},
				);
			});
		});
	}
</script>

<div class="blog {selectedPost ? 'blog-float' : ''}">
	<div class="blog-header">
		{#if selectedPost}
			<button on:click={goBack} style="margin-bottom:10px;"
				>Go Back</button
			>
			<h2 style="display:inline;margin-left:10px;">
				{selectedPost.frontmatter.title}
			</h2>
		{:else}
			<h2>My blog :D</h2>
		{/if}
	</div>

	{#if !selectedPost}
		<ul id="blog-links">
			{#each allPosts as post}
				<li>
					<a
						href="#{post.slug}"
						class="post-link cool-skew"
						on:click|preventDefault={() => loadPost(post)}
					>
						{post.frontmatter.title}
					</a>
				</li>
			{/each}
		</ul>
	{/if}

	{#if selectedPost}
		{#if loading}
			<p style="padding:1rem;">Loading…</p>
		{:else if error}
			<p class="error" style="padding:1rem;color:red;">{error}</p>
		{:else}
			<div id="blog-content" class="blog-content">
				{@html postContent}
			</div>
		{/if}
	{/if}
</div>

<style>
	.blog-header h2 {
		display: inline;
	}
	ul li {
		list-style: none;
		padding: 2vh;
	}
	.post-link {
		cursor: pointer;
		background: #111;
		color: #fff;
		padding: 1rem 1.5rem;
		border-radius: 6px;
	}
	.blog {
		height: 100%;
		flex-grow: 4;
		transition:
			box-shadow 0.3s,
			z-index 0.3s,
			transform 0.3s;
		position: relative;
	}
	.blog-content {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		overflow: auto;
		padding: 1rem;
		font-family: "Earthbound", monospace;
	}
	.blog-float {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 9999;
		background: rgba(0, 0, 0, 0.97);
		box-shadow:
			0 0 40px 10px #000,
			0 0 0 100vw rgba(0, 0, 0, 0.7);
		padding: 0;
		margin: 0;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: flex-start;
		animation: blog-slide-in-left 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
	}
	.blog-float > .blog-header,
	.blog-float > .blog-content {
		width: 100%;
		max-width: 900px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}
	.blog-float > .blog-header {
		padding-bottom: 0;
	}
	.blog-float > .blog-content {
		flex: 1 1 auto;
		overflow-y: auto;
		background: none;
	}
	@keyframes blog-slide-in-left {
		from {
			transform: translateX(-100vw);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}
</style>
