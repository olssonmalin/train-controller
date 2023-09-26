<script>
	import { onMount } from 'svelte';
	import Map from './Map.svelte';
	import DelayedTable from './ViewToggler.svelte';
	import { ticketViewState } from '../store.ts';

	const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

	let ticketViewStateValue = null;
	ticketViewState.subscribe((value) => {
		ticketViewStateValue = value;
	});

	let delayedTrains = [];

	onMount(async () => {
		const response = await fetch(`${BACKEND_URL}/delayed`);
		const result = await response.json();
		delayedTrains = result.data;
	});
</script>

<svelte:head>
	<title>TrafikLedare applikationen</title>
</svelte:head>

<section class="container">
	<DelayedTable {delayedTrains} />
	{#if ticketViewStateValue !== 'active'}
		<Map />
	{/if}
</section>
