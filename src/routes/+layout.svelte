<script lang="ts">
	import '@fontsource/instrument-serif/400.css';
	import '@fontsource/instrument-serif/400-italic.css';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	$effect(() => {
		const handle = (img: HTMLImageElement) => {
			if (img.complete && img.naturalHeight !== 0) img.dataset.loaded = '';
			else img.addEventListener('load', () => (img.dataset.loaded = ''), { once: true });
		};
		document.querySelectorAll<HTMLImageElement>('picture > img').forEach(handle);
		const obs = new MutationObserver((records) => {
			for (const r of records) {
				for (const n of r.addedNodes) {
					if (n instanceof HTMLImageElement && n.parentElement?.tagName === 'PICTURE') handle(n);
					else if (n instanceof Element)
						n.querySelectorAll<HTMLImageElement>('picture > img').forEach(handle);
				}
			}
		});
		obs.observe(document.body, { childList: true, subtree: true });
		return () => obs.disconnect();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>imgipsum — placeholder images, served from the edge</title>
	<meta
		name="description"
		content="Free placeholder images in any size and format. Lorem ipsum, but for images. Cached forever, served from Cloudflare."
	/>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Nav />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
