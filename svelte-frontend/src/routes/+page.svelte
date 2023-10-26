<script>
	import { afterUpdate, onMount } from 'svelte';
	import Map from './Map.svelte';
	import DelayedTable from './ViewToggler.svelte';
	import { ticketViewState, showTrainTable, loggedInUser } from '../store.ts';
	import Login from './Login.svelte';
	import Notifications from 'svelte-notifications';

	const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

	let ticketViewStateValue = null;
	ticketViewState.subscribe((value) => {
		ticketViewStateValue = value;
	});

	let delayedTrains = [];
	let delayedTrainNumbers;
	onMount(async () => {
		let response = await fetch(`${BACKEND_URL}/graphql`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				query: `{delayed {
        ActivityId
        ActivityType
        AdvertisedTimeAtLocation
        AdvertisedTrainIdent
        Canceled
        EstimatedTimeAtLocation
        TrainOwner
        LocationSignature
    }}`
			})
		});
		const result = await response.json();
		delayedTrains = result.data.delayed;
		delayedTrains = delayedTrains.filter((train) => {
			return train.AdvertisedTrainIdent != null;
		});
		delayedTrainNumbers = delayedTrains.map((item) => item.AdvertisedTrainIdent);
	});
</script>

<svelte:head>
	<title>TrafikLedare applikationen</title>
</svelte:head>
<Notifications>
	<section class="container">
		<Login />
		{#if $loggedInUser}
			<button><a href="/editor/tickets">Ärenden</a></button>
		{/if}
		<DelayedTable {delayedTrains} />
		{#if ticketViewStateValue !== 'active'}
			<Map {delayedTrainNumbers} />
		{/if}
	</section>
</Notifications>
