<script>
	export let ticket;
	export let codes;
	export let getTickets;
	import UpdateTicket from './UpdateTicket.svelte';
	import { loggedInUser } from '../store';
	const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
</script>

<div class="delayed-row">
	<div class="width-full">
		<div>{ticket._id}</div>
		<div>{ticket.code}</div>
		<div>{ticket.trainnumber}</div>
		<div>{ticket.traindate}</div>
	</div>
	<div>
		<UpdateTicket {ticket} {codes} {getTickets} />
	</div>
</div>

<style>
	.width-full {
		width: 70%;
		display: flex;
		justify-content: space-between;
	}
</style>
