<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import { COLLECTIONS, COLLECTION_KEYS, FORMATS, SIZES, oneUrl, randomUrl } from '$lib/config';
	import { resolve } from '$app/paths';

	const sections = [
		{ id: 'routes', title: 'Routes' },
		{ id: 'parameters', title: 'Parameters' },
		{ id: 'collections', title: 'Collections' },
		{ id: 'recipes', title: 'Recipes' }
	];

	const exampleHtml = `<img\n  src="${randomUrl('portraits', 800, 800, 'webp')}"\n  alt="Random portrait"\n  width="800"\n  height="800"\n  loading="lazy"\n/>`;

	const exampleSrcset = `<img\n  src="${oneUrl('landscapes', 1, 800, 800, 'webp')}"\n  srcset="\n    ${oneUrl('landscapes', 1, 400, 400, 'webp')} 400w,\n    ${oneUrl('landscapes', 1, 800, 800, 'webp')} 800w,\n    ${oneUrl('landscapes', 1, 1600, 1600, 'webp')} 1600w\n  "\n  sizes="(min-width: 1024px) 50vw, 100vw"\n  alt=""\n/>`;

	const examplePicture = `<picture>\n  <source\n    type="image/avif"\n    srcset="${oneUrl('food', 1, 800, 800, 'avif')}"\n  />\n  <source\n    type="image/webp"\n    srcset="${oneUrl('food', 1, 800, 800, 'webp')}"\n  />\n  <img src="${oneUrl('food', 1, 800, 800, 'jpeg')}" alt="" />\n</picture>`;

	const exampleFetch = `const res = await fetch(\n  '${randomUrl('architecture', 1200, 800, 'webp')}',\n  { redirect: 'follow' }\n);\nconst blob = await res.blob();`;
</script>

<svelte:head>
	<title>Docs · imgipsum</title>
</svelte:head>

<div class="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[200px_1fr]">
	<!-- TOC -->
	<aside class="lg:sticky lg:top-24 lg:self-start">
		<p class="mb-3 text-xs font-medium tracking-wider text-muted uppercase">On this page</p>
		<nav class="flex flex-col gap-1 text-sm">
			{#each sections as s (s.id)}
				<a
					href="#{s.id}"
					class="rounded px-2 py-1 text-muted transition-colors hover:bg-mist hover:text-ink"
				>
					{s.title}
				</a>
			{/each}
		</nav>
	</aside>

	<!-- BODY -->
	<article class="min-w-0 space-y-20">
		<header>
			<p class="text-sm font-medium tracking-wider text-accent-deep uppercase">Documentation</p>
			<h1 class="mt-2 font-display text-5xl tracking-tight sm:text-6xl">The whole API</h1>
			<p class="mt-4 max-w-xl text-lg text-muted">
				Two GET routes, four parameters each. No auth, no SDK. Compose a URL — get an image.
			</p>
		</header>

		<section id="routes" class="space-y-8">
			<h2 class="font-display text-3xl tracking-tight">Routes</h2>

			<div class="space-y-3">
				<div class="flex flex-wrap items-baseline gap-3">
					<span class="rounded-md bg-ink px-2 py-0.5 font-mono text-xs font-semibold text-accent"
						>GET</span
					>
					<code class="font-mono text-base break-all text-ink"
						>/one/<em class="text-muted not-italic">:w</em>/<em class="text-muted not-italic">:h</em
						>/<em class="text-muted not-italic">:format</em>/<em class="text-muted not-italic"
							>:collection</em
						>/<em class="text-muted not-italic">:n</em></code
					>
				</div>
				<p class="text-muted">
					A specific image. Same URL → same bytes, forever. Responses are immutable and cached at
					the edge — use this when you want the comp to look the same on every reload.
				</p>
				<CodeBlock code={oneUrl('portraits', 3, 800, 800, 'webp')} lang="GET" />
			</div>

			<div class="space-y-3">
				<div class="flex flex-wrap items-baseline gap-3">
					<span class="rounded-md bg-ink px-2 py-0.5 font-mono text-xs font-semibold text-accent"
						>GET</span
					>
					<code class="font-mono text-base break-all text-ink"
						>/random/<em class="text-muted not-italic">:w</em>/<em class="text-muted not-italic"
							>:h</em
						>/<em class="text-muted not-italic">:format</em>/<em class="text-muted not-italic"
							>:collection</em
						></code
					>
				</div>
				<p class="text-muted">
					Picks a random image and <strong class="text-ink">302</strong> redirects to the matching
					<code class="font-mono">/one/…</code> URL. Different image per request, but each landed URL
					is itself cached.
				</p>
				<CodeBlock code={randomUrl('landscapes', 1200, 800, 'avif')} lang="GET" />
			</div>

			<div class="rounded-lg border-l-4 border-accent-deep bg-accent/10 p-4 text-sm text-ink/80">
				Rate-limited per IP. Hitting the limit returns <code class="font-mono">429</code>; back off
				and retry — cached URLs still serve.
			</div>
		</section>

		<section id="parameters" class="space-y-6">
			<h2 class="font-display text-3xl tracking-tight">Parameters</h2>

			<div class="overflow-hidden rounded-lg border border-line">
				<table class="w-full text-left text-sm">
					<thead class="bg-mist text-xs tracking-wider text-muted uppercase">
						<tr>
							<th class="px-4 py-3">Name</th>
							<th class="px-4 py-3">Type</th>
							<th class="px-4 py-3">Description</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-line">
						<tr>
							<td class="px-4 py-3 font-mono text-ink">w</td>
							<td class="px-4 py-3 font-mono text-muted">enum</td>
							<td class="px-4 py-3">
								Width in pixels. One of <code class="font-mono">{SIZES.join(', ')}</code>.
							</td>
						</tr>
						<tr>
							<td class="px-4 py-3 font-mono text-ink">h</td>
							<td class="px-4 py-3 font-mono text-muted">enum</td>
							<td class="px-4 py-3">
								Height in pixels. Same options as <code class="font-mono">w</code>.
							</td>
						</tr>
						<tr>
							<td class="px-4 py-3 font-mono text-ink">format</td>
							<td class="px-4 py-3 font-mono text-muted">enum</td>
							<td class="px-4 py-3">
								Output format. One of <code class="font-mono">{FORMATS.join(', ')}</code>.
							</td>
						</tr>
						<tr>
							<td class="px-4 py-3 font-mono text-ink">collection</td>
							<td class="px-4 py-3 font-mono text-muted">string</td>
							<td class="px-4 py-3">
								Curated bucket. See <a href="#collections" class="underline decoration-dotted"
									>collections</a
								>.
							</td>
						</tr>
						<tr>
							<td class="px-4 py-3 font-mono text-ink">n</td>
							<td class="px-4 py-3 font-mono text-muted">int</td>
							<td class="px-4 py-3">
								<code class="font-mono">/one</code> only. 1-indexed image number within the collection.
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p class="text-sm text-muted">
				Sizes are a closed enum — anything else returns <code class="font-mono">400</code>. Keeps
				the cache predictable.
			</p>
		</section>

		<section id="collections" class="space-y-6">
			<h2 class="font-display text-3xl tracking-tight">Collections</h2>
			<p class="text-muted">
				Each collection is a fixed, curated set of images. Image <code class="font-mono">n</code> is stable
				across deploys.
			</p>
			<div class="grid gap-3 sm:grid-cols-2">
				{#each COLLECTION_KEYS as c (c)}
					<div class="rounded-lg border border-line p-4">
						<div class="flex items-baseline justify-between">
							<code class="font-mono text-ink">{c}</code>
							<span class="font-mono text-xs text-muted">{COLLECTIONS[c].count} images</span>
						</div>
						<p class="mt-1 text-sm text-muted">{COLLECTIONS[c].blurb}</p>
					</div>
				{/each}
			</div>
		</section>

		<section id="recipes" class="space-y-8">
			<h2 class="font-display text-3xl tracking-tight">Recipes</h2>

			<div class="space-y-3">
				<h3 class="font-display text-xl">Drop-in placeholder</h3>
				<p class="text-muted">Plain HTML, lazy-loaded, fixed dimensions to avoid layout shift.</p>
				<CodeBlock code={exampleHtml} lang="html" />
			</div>

			<div class="space-y-3">
				<h3 class="font-display text-xl">Responsive srcset</h3>
				<p class="text-muted">
					Pin to a specific <code class="font-mono">/one/…</code> image and let the browser pick a size.
					All three URLs share content (same n) but at different widths.
				</p>
				<CodeBlock code={exampleSrcset} lang="html" />
			</div>

			<div class="space-y-3">
				<h3 class="font-display text-xl">Format negotiation</h3>
				<p class="text-muted">
					Use <code class="font-mono">&lt;picture&gt;</code> for clients that don't support
					AVIF/WebP. The CDN doesn't sniff <code class="font-mono">Accept</code> — you pick.
				</p>
				<CodeBlock code={examplePicture} lang="html" />
			</div>

			<div class="space-y-3">
				<h3 class="font-display text-xl">Programmatic fetch</h3>
				<p class="text-muted">
					<code class="font-mono">/random</code> returns a 302. Most clients (browsers,
					<code class="font-mono">fetch</code>) follow it automatically.
				</p>
				<CodeBlock code={exampleFetch} lang="js" />
			</div>
		</section>

		<section class="rounded-2xl bg-ink p-10 text-paper">
			<h2 class="font-display text-3xl tracking-tight">That's the whole thing.</h2>
			<p class="mt-3 max-w-md text-paper/70">
				If you want a feature that isn't here — a new collection, a new format, a different size —
				open an issue.
			</p>
			<a
				href={resolve('/')}
				class="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-ink transition-transform hover:scale-[1.02]"
			>
				Back to the playground
			</a>
		</section>
	</article>
</div>
