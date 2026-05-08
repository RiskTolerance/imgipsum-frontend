<script lang="ts">
	import { CDN_BASE } from '$lib/config';
</script>

<footer class="mt-32 border-t border-line/60">
	<div
		class="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between"
	>
		<div>
			<div class="font-display text-2xl">imgipsum</div>
			<p class="mt-1 text-sm text-muted">Free placeholder images, served from the edge.</p>
		</div>
		<div class="flex flex-col gap-1 text-sm text-muted sm:items-end">
			<code class="font-mono">{CDN_BASE}</code>
			<span>Cached forever. Rate-limited per IP. Built on Cloudflare.</span>
		</div>
	</div>
</footer>
