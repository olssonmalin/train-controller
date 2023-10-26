<script>
	export let ticket;
	export let codes;
	export let getTickets;
	import UpdateTicket from './UpdateTicket.svelte';
	import { loggedInUser } from '../store';
	const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
</script>

<div data-testid="delayed-row">
	<div data-testid="singular-ticket">
		{ticket._id} - {ticket.code} - {ticket.trainnumber} - {ticket.traindate}

		<UpdateTicket {ticket} {codes} {getTickets} />
	</div>
</div>

<style>
</style>
