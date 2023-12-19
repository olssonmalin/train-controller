<script>
	import { onMount } from 'svelte';
	import { ticketViewState, showTrainTable, loggedInUser } from '../../store';
	import OldTickets from '../OldTickets.svelte';
	const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
	import Notifications from 'svelte-notifications';
	let ticketViewStateValue = null;
	ticketViewState.subscribe((value) => {
		ticketViewStateValue = value;
	});

	let tickets = [];
	let codes = [];

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
</script>

<Notifications>
	<section class="container">
		<!-- Ticket list -->
		<button class="default-button"><a href="/editor">Försenade tåg</a></button>
		<OldTickets {tickets} {codes} {getTickets} />
	</section>
</Notifications>
