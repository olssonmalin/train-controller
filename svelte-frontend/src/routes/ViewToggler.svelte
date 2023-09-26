<script>
	import { ticketViewState } from '../store.ts';
	import TicketView from './TicketView.svelte';
	import DelayedTable from './DelayedTable.svelte';

	const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

	export let delayedTrains = [];
	let selectedTrain = null;
	let codes = [];
	let tickets = [];

	function outputDelay(item) {
		let advertised = new Date(item.AdvertisedTimeAtLocation);
		let estimated = new Date(item.EstimatedTimeAtLocation);

		const diff = Math.abs(estimated - advertised);

		return Math.floor(diff / (1000 * 60)) + ' minuter';
	}

	async function renderTicketView(train) {
		selectedTrain = train;

		let response = await fetch(`${BACKEND_URL}/codes`);
		let result = await response.json();
		codes = result.data;

		response = await fetch(`${BACKEND_URL}/tickets`);
		result = await response.json();
		tickets = result.data;

		ticketViewState.set('active');
	}

	function backFunctionality() {
		selectedTrain = null;
		ticketViewState.set(null);
	}
</script>

{#if selectedTrain}
	<TicketView
		{selectedTrain}
		{renderTicketView}
		{tickets}
		{codes}
		{outputDelay}
		{backFunctionality}
	/>
{:else}
	<DelayedTable {delayedTrains} {renderTicketView} {outputDelay} />
{/if}
