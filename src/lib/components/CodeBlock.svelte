<script lang="ts">
	import CopyButton from './CopyButton.svelte';
	type Props = { code: string; lang?: string; class?: string };
	let { code, lang = '', class: className = '' }: Props = $props();
</script>

<div
	class={[
		'group relative overflow-hidden rounded-lg border border-line bg-ink text-paper',
		className
	]}
>
	{#if lang}
		<div
			class="flex items-center justify-between border-b border-paper/10 px-4 py-2 text-xs text-paper/50"
		>
			<span class="font-mono">{lang}</span>
			<CopyButton value={code} class="!border-paper/20 !bg-ink/50 !text-paper hover:!bg-paper/10" />
		</div>
	{:else}
		<div class="absolute top-2 right-2 z-10 opacity-0 transition-opacity group-hover:opacity-100">
			<CopyButton value={code} class="!border-paper/20 !bg-ink/50 !text-paper hover:!bg-paper/10" />
		</div>
	{/if}
	<pre class="overflow-x-auto p-4 font-mono text-sm leading-relaxed"><code>{code}</code></pre>
</div>
