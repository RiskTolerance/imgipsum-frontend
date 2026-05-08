<script lang="ts">
	import UrlBuilder from '$lib/components/UrlBuilder.svelte';
	import Gallery from '$lib/components/Gallery.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import { CDN_BASE, COLLECTIONS, COLLECTION_KEYS, FORMATS, SIZES } from '$lib/config';
	import { pick } from '$lib/images';
	import { resolve } from '$app/paths';

	const heroPic = pick('landscapes', 7);
	const exampleHtml = `<img src="${CDN_BASE}/random/800/800/webp/landscapes" alt="" />`;

	const features = [
		{
			title: 'Edge-cached',
			body: 'Every transform is cached by Cloudflare. After the first hit, you get bytes from the closest POP.'
		},
		{
			title: 'Honest formats',
			body: 'AVIF, WebP, JPEG, PNG. Pick the one your browser likes — no negotiation, no surprises.'
		},
		{
			title: 'Predictable URLs',
			body: 'No tokens. No keys. No client SDK. Just a URL with the size, format, and image you want.'
		}
	];
</script>

<!-- HERO -->
<section class="relative overflow-hidden border-b border-line/60">
	<div class="pointer-events-none absolute inset-0 z-0 opacity-50" aria-hidden="true">
		<enhanced:img src={heroPic} alt="" sizes="100vw" class="size-full object-cover" />
		<div class="absolute inset-0 bg-linear-to-b from-paper/30 via-paper/80 to-paper"></div>
	</div>

	<div class="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
		<p
			class="mb-5 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper/70 px-3 py-1 text-xs text-ink backdrop-blur"
		>
			<span class="size-1.5 animate-pulse rounded-full bg-accent-deep"></span>
			Live · {Object.values(COLLECTIONS).reduce((a, c) => a + c.count, 0)} curated images
		</p>
		<h1 class="font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
			Lorem ipsum, <em class="text-muted italic">but for</em> images.
		</h1>
		<p class="mt-6 max-w-xl text-lg text-muted sm:text-xl">
			A tiny image CDN for prototypes, design comps, and demos. Pick a size, a format, a vibe — get
			a URL.
		</p>

		<div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
			<a
				href="#playground"
				class="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-accent transition-transform hover:scale-[1.02]"
			>
				Build a URL
				<svg class="size-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 10h10m-4-4 4 4-4 4" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</a>
			<a
				href={resolve('/docs')}
				class="inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 bg-paper/60 px-6 py-3 text-sm font-medium text-ink backdrop-blur transition-colors hover:bg-paper"
			>
				Read the docs
			</a>
		</div>

		<div class="mt-10 max-w-2xl">
			<CodeBlock code={exampleHtml} lang="html" />
		</div>
	</div>
</section>

<!-- FEATURES STRIP -->
<section class="border-b border-line/60 bg-mist/40">
	<div class="mx-auto grid max-w-6xl gap-px bg-line sm:grid-cols-3">
		{#each features as f (f.title)}
			<div class="bg-paper p-8">
				<h3 class="font-display text-2xl">{f.title}</h3>
				<p class="mt-2 text-sm text-muted">{f.body}</p>
			</div>
		{/each}
	</div>
</section>

<!-- PLAYGROUND -->
<section id="playground" class="mx-auto max-w-6xl px-6 py-20">
	<div class="mb-8 flex items-end justify-between gap-4">
		<div>
			<p class="text-sm font-medium tracking-wider text-accent-deep uppercase">Playground</p>
			<h2 class="mt-1 font-display text-4xl tracking-tight sm:text-5xl">Build a URL</h2>
		</div>
		<p class="hidden max-w-sm text-sm text-muted sm:block">
			Tweak the knobs. Copy the URL. Paste it anywhere that takes an image.
		</p>
	</div>
	<UrlBuilder />
</section>

<!-- GALLERY -->
<section class="mx-auto max-w-6xl px-6 pb-20">
	<Gallery />
</section>

<!-- COLLECTION CARDS -->
<section class="mx-auto max-w-6xl px-6 pb-20">
	<h2 class="font-display text-4xl tracking-tight sm:text-5xl">Four collections</h2>
	<p class="mt-2 max-w-xl text-muted">
		Each request to <code class="font-mono text-ink">/random</code> picks one at random within the named
		collection. More on the way.
	</p>
	<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each COLLECTION_KEYS as c (c)}
			{@const cover = pick(c, 1)}
			<a
				href="#playground"
				class="group relative overflow-hidden rounded-xl border border-line bg-paper transition-all hover:-translate-y-0.5 hover:shadow-lg"
			>
				<div class="aspect-4/5 overflow-hidden">
					<enhanced:img
						src={cover}
						alt={COLLECTIONS[c].label}
						sizes="(min-width: 1024px) 25vw, 50vw"
						class="size-full object-cover transition-transform duration-700 group-hover:scale-105"
					/>
				</div>
				<div
					class="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/90 via-ink/40 to-transparent p-4 text-paper"
				>
					<div class="font-display text-2xl">{COLLECTIONS[c].label}</div>
					<div class="text-xs text-paper/70">
						{COLLECTIONS[c].count} images · {COLLECTIONS[c].blurb}
					</div>
				</div>
			</a>
		{/each}
	</div>
</section>

<!-- QUICK REFERENCE -->
<section class="border-t border-line/60 bg-ink text-paper">
	<div class="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2">
		<div>
			<p class="text-sm font-medium tracking-wider text-accent uppercase">Quick reference</p>
			<h2 class="mt-2 font-display text-4xl tracking-tight sm:text-5xl">Two routes. That's it.</h2>
			<p class="mt-4 max-w-md text-paper/70">
				Pick a specific image when you need determinism. Pick a random one when you don't care.
			</p>
			<a
				href={resolve('/docs')}
				class="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-ink transition-transform hover:scale-[1.02]"
			>
				Full documentation
				<svg class="size-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 10h10m-4-4 4 4-4 4" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</a>
		</div>
		<div class="space-y-6 font-mono text-sm">
			<div class="rounded-lg border border-paper/15 p-4">
				<div class="text-accent">GET /one/:w/:h/:format/:collection/:n</div>
				<div class="mt-2 text-paper/60">a specific image — same URL, same bytes, forever</div>
				<div class="mt-3 break-all text-paper/90">
					{CDN_BASE}/one/800/800/webp/portraits/3
				</div>
			</div>
			<div class="rounded-lg border border-paper/15 p-4">
				<div class="text-accent">GET /random/:w/:h/:format/:collection</div>
				<div class="mt-2 text-paper/60">a random one — 302 redirects to /one/...</div>
				<div class="mt-3 break-all text-paper/90">
					{CDN_BASE}/random/1200/800/avif/landscapes
				</div>
			</div>
			<div class="grid grid-cols-2 gap-4 text-xs">
				<div>
					<div class="mb-2 tracking-wide text-paper/40 uppercase">Sizes</div>
					<div class="text-paper/80">{SIZES.join(' · ')}</div>
				</div>
				<div>
					<div class="mb-2 tracking-wide text-paper/40 uppercase">Formats</div>
					<div class="text-paper/80 uppercase">{FORMATS.join(' · ')}</div>
				</div>
			</div>
		</div>
	</div>
</section>
