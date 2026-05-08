<script lang="ts">
	import {
		COLLECTION_KEYS,
		COLLECTIONS,
		FORMATS,
		SIZES,
		oneUrl,
		randomUrl,
		type Collection,
		type Format,
		type Size
	} from '$lib/config';
	import CopyButton from './CopyButton.svelte';
	import { pick } from '$lib/images';

	let mode = $state<'one' | 'random'>('random');
	let collection = $state<Collection>('landscapes');
	let n = $state(1);
	let w = $state<Size>(800);
	let h = $state<Size>(800);
	let fmt = $state<Format>('webp');

	const url = $derived(
		mode === 'one' ? oneUrl(collection, n, w, h, fmt) : randomUrl(collection, w, h, fmt)
	);
	const preview = $derived(pick(collection, n));
	const previewN = $derived(COLLECTIONS[collection].count);
</script>

<div class="overflow-hidden rounded-2xl border border-line bg-paper shadow-sm">
	<div class="grid gap-0 lg:grid-cols-[1fr_1.1fr]">
		<!-- preview -->
		<div class="relative aspect-square overflow-hidden bg-mist">
			{#key preview}
				<enhanced:img
					src={preview}
					alt="Preview from {collection}"
					class="absolute inset-0 size-full object-cover"
					sizes="(min-width: 1024px) 50vw, 100vw"
				/>
			{/key}
			<div
				class="absolute inset-x-0 bottom-0 flex items-center justify-between bg-linear-to-t from-ink/70 to-transparent p-4 text-xs text-paper"
			>
				<span class="font-mono">
					{w}×{h} · {fmt}
				</span>
				<span class="rounded-full bg-paper/15 px-2 py-0.5 font-mono backdrop-blur">
					{collection}{mode === 'one' ? `/${n}` : ''}
				</span>
			</div>
		</div>

		<!-- controls -->
		<div class="flex min-w-0 flex-col gap-5 p-4 sm:p-6 lg:p-8">
			<div class="flex items-center gap-1 rounded-full bg-mist p-1 text-sm">
				{#each ['random', 'one'] as const as m (m)}
					<button
						type="button"
						onclick={() => (mode = m)}
						class={[
							'flex-1 rounded-full px-4 py-1.5 transition-colors',
							mode === m ? 'bg-ink text-accent' : 'text-muted hover:text-ink'
						]}
					>
						{m === 'random' ? 'Random' : 'Specific'}
					</button>
				{/each}
			</div>

			<label class="flex flex-col gap-2 text-sm">
				<span class="text-xs font-medium tracking-wide text-muted uppercase">Collection</span>
				<div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
					{#each COLLECTION_KEYS as c (c)}
						<button
							type="button"
							onclick={() => (collection = c)}
							class={[
								'rounded-lg border px-3 py-2 text-sm transition-all',
								collection === c
									? 'border-ink bg-ink text-accent'
									: 'border-line bg-paper hover:border-ink/40'
							]}
						>
							{COLLECTIONS[c].label}
						</button>
					{/each}
				</div>
			</label>

			{#if mode === 'one'}
				<label class="flex flex-col gap-2 text-sm">
					<div class="flex items-baseline justify-between">
						<span class="text-xs font-medium tracking-wide text-muted uppercase">Image</span>
						<span class="font-mono text-xs text-muted">{n} / {previewN}</span>
					</div>
					<input type="range" min="1" max={previewN} bind:value={n} class="accent-ink" />
				</label>
			{/if}

			<div class="grid grid-cols-2 gap-4">
				<label class="flex flex-col gap-2 text-sm">
					<span class="text-xs font-medium tracking-wide text-muted uppercase">Width</span>
					<select
						bind:value={w}
						class="rounded-lg border border-line bg-paper px-3 py-2 font-mono text-sm hover:border-ink/40 focus:border-ink focus:outline-none"
					>
						{#each SIZES as s (s)}
							<option value={s}>{s}px</option>
						{/each}
					</select>
				</label>
				<label class="flex flex-col gap-2 text-sm">
					<span class="text-xs font-medium tracking-wide text-muted uppercase">Height</span>
					<select
						bind:value={h}
						class="rounded-lg border border-line bg-paper px-3 py-2 font-mono text-sm hover:border-ink/40 focus:border-ink focus:outline-none"
					>
						{#each SIZES as s (s)}
							<option value={s}>{s}px</option>
						{/each}
					</select>
				</label>
			</div>

			<label class="flex flex-col gap-2 text-sm">
				<span class="text-xs font-medium tracking-wide text-muted uppercase">Format</span>
				<div class="grid grid-cols-2 gap-2 min-[420px]:grid-cols-4">
					{#each FORMATS as f (f)}
						<button
							type="button"
							onclick={() => (fmt = f)}
							class={[
								'rounded-lg border px-3 py-2 font-mono text-sm uppercase transition-all',
								fmt === f
									? 'border-ink bg-ink text-accent'
									: 'border-line bg-paper hover:border-ink/40'
							]}
						>
							{f}
						</button>
					{/each}
				</div>
			</label>

			<div class="mt-2 flex items-center gap-2 rounded-lg border border-line bg-mist p-2">
				<code
					class="min-w-0 flex-1 overflow-x-auto px-2 py-1 font-mono text-xs whitespace-nowrap text-ink"
					>{url}</code
				>
				<CopyButton value={url} />
			</div>
		</div>
	</div>
</div>
