<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	const links = [
		{ href: resolve('/'), label: 'Home' },
		{ href: resolve('/docs'), label: 'Docs' }
	];
</script>

<header class="sticky top-0 z-40 border-b border-line/60 bg-paper/80 backdrop-blur-md">
	<nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
		<a href={resolve('/')} class="group flex items-baseline gap-2">
			<span class="font-display text-2xl tracking-tight">imgipsum</span>
		</a>

		<ul class="flex items-center gap-1">
			{#each links as link (link.href)}
				{@const active = page.url.pathname === link.href}
				<li>
					<a
						href={link.href}
						class={[
							'rounded-full px-4 py-1.5 text-sm transition-colors',
							active ? 'bg-ink text-accent' : 'text-ink hover:bg-mist'
						]}
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>
