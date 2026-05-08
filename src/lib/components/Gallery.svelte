<script lang="ts">
	import { COLLECTIONS, COLLECTION_KEYS, type Collection } from '$lib/config';
	import { images } from '$lib/images';

	let active: Collection = $state('landscapes');
	const items = $derived(images[active]);
</script>

<section class="space-y-6">
	<div class="flex flex-wrap items-end justify-between gap-4">
		<div>
			<h2 class="font-display text-3xl tracking-tight sm:text-4xl">The library</h2>
			<p class="mt-1 text-muted">
				{COLLECTIONS[active].blurb} · {COLLECTIONS[active].count} images
			</p>
		</div>
		<div class="flex flex-wrap gap-1.5">
			{#each COLLECTION_KEYS as c (c)}
				<button
					type="button"
					onclick={() => (active = c)}
					class={[
						'rounded-full border px-3.5 py-1.5 text-sm transition-all',
						active === c
							? 'border-ink bg-ink text-accent'
							: 'border-line bg-paper text-ink hover:border-ink/40'
					]}
				>
					{COLLECTIONS[c].label}
				</button>
			{/each}
		</div>
	</div>

	<div class="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
		{#each items as pic, i (i)}
			<figure
				class="group relative aspect-square overflow-hidden rounded-md bg-mist transition-transform hover:z-10 hover:scale-[1.02]"
			>
				<enhanced:img
					src={pic}
					alt="{active} sample {i + 1}"
					sizes="(min-width: 1024px) 18vw, (min-width: 640px) 25vw, 50vw"
					class="absolute inset-0 size-full object-cover transition-all duration-500 group-hover:scale-105"
				/>
				<figcaption
					class="absolute bottom-1.5 left-1.5 rounded-sm bg-ink/70 px-1.5 py-0.5 font-mono text-[10px] text-paper opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
				>
					{active}/{i + 1}
				</figcaption>
			</figure>
		{/each}
	</div>
</section>
