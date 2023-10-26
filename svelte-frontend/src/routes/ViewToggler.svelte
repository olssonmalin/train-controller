<script>
	import { ticketViewState, loggedInUser, selectedTrain } from '../store.ts';
	import TicketView from './TicketView.svelte';
	import DelayedTable from './DelayedTable.svelte';
	import { onMount } from 'svelte';

	const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

	export let delayedTrains = [];
	// let selectedTrain = null;
	let codes = [];
	let tickets = [];

	function outputDelay(item) {
		let advertised = new Date(item.AdvertisedTimeAtLocation);
		let estimated = new Date(item.EstimatedTimeAtLocation);

		const diff = Math.abs(estimated - advertised);

		return Math.floor(diff / (1000 * 60)) + ' minuter';
	}

	// async function renderTicketView(train) {
	// 	let response = await fetch(`${BACKEND_URL}/graphql`, {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			Accept: 'application/json'
	// 		},
	// 		body: JSON.stringify({
	// 			query: `{
	// 	codes {
	//     Code
	//     Level1Description
	//     Level2Description
	//     Level3Description
	// }
	// }`
	// 		})
	// 	});
	// 	let result = await response.json();
	// 	codes = result.data.codes;

	// 	response = await fetch(`${BACKEND_URL}/graphql`, {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			Accept: 'application/json',
	// 			Authorization: `Bearer ${$loggedInUser}`
	// 		},
	// 		body: JSON.stringify({
	// 			query: `{tickets {
	//     _id
	//     code
	//     trainnumber
	//     traindate
	// }}`
	// 		})
	// 	});
	// 	result = await response.json();
	// 	tickets = result.data.tickets;

	// 	ticketViewState.set('active');
	// }

	async function getTickets() {
		let response = await fetch(`${BACKEND_URL}/graphql`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${$loggedInUser}`
			},
			body: JSON.stringify({
				query: `{tickets {
        _id
        code
        trainnumber
        traindate
    }}`
			})
		});
		let result = await response.json();
		tickets = result.data.tickets;
		// console.log(tickets);
	}

	async function getCodes() {
		let response = await fetch(`${BACKEND_URL}/graphql`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				query: `{
    	codes {
        Code
        Level1Description
        Level2Description
        Level3Description
    }
	}`
			})
		});
		let result = await response.json();
		codes = result.data.codes;
	}
	onMount(async () => {
		await getTickets();
		await getCodes();
	});

	function backFunctionality() {
		$selectedTrain = null;
		ticketViewState.set(null);
	}
</script>

{#if $selectedTrain}
	<TicketView {getTickets} {tickets} {codes} {outputDelay} {backFunctionality} />
{:else}
	<DelayedTable {delayedTrains} {getTickets} {outputDelay} />
{/if}
