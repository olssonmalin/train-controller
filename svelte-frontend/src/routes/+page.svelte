<script>
	import { afterUpdate, onMount } from 'svelte';
	import Map from './Map.svelte';
	import DelayedTable from './ViewToggler.svelte';
	import { ticketViewState, showTrainTable } from '../store.ts';

	const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

	let ticketViewStateValue = null;
	ticketViewState.subscribe((value) => {
		ticketViewStateValue = value;
	});

	let delayedTrains = [];
	let delayedTrainNumbers;
	onMount(async () => {
		const response = await fetch(`${BACKEND_URL}/delayed`);
		const result = await response.json();
		delayedTrains = result.data;
		delayedTrainNumbers = delayedTrains.map((item) => item.AdvertisedTrainIdent);
	});
</script>

<svelte:head>
	<title>TrafikLedare applikationen</title>
</svelte:head>

<section class="container">
	<DelayedTable {delayedTrains} />
	{#if ticketViewStateValue !== 'active'}
		<Map {delayedTrainNumbers} />
	{/if}
</section>
