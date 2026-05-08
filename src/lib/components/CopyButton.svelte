<script lang="ts">
	type Props = { value: string; label?: string; class?: string };
	let { value, label = 'Copy', class: className = '' }: Props = $props();
	let copied = $state(false);
	let timer: ReturnType<typeof setTimeout> | null = null;

	async function copy() {
		await navigator.clipboard.writeText(value);
		copied = true;
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => (copied = false), 1500);
	}
</script>

<button
	type="button"
	onclick={copy}
	class={[
		'inline-flex items-center gap-1.5 rounded-md border border-line bg-paper px-2.5 py-1 font-mono text-xs text-ink transition-colors hover:bg-mist',
		className
	]}
>
	{#if copied}
		<svg class="size-3.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.5">
			<path d="M5 10l3 3 7-7" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
		Copied
	{:else}
		<svg class="size-3.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
			<rect x="6" y="6" width="11" height="11" rx="2" />
			<path d="M4 14V5a2 2 0 0 1 2-2h9" />
		</svg>
		{label}
	{/if}
</button>
