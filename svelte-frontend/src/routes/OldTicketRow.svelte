<script>
	import UpdateTicket from './UpdateTicket.svelte';
	export let ticket;
	export let codes;
	export let getTickets;
</script>

<div data-testid="delayed-row">
	<div data-testid="singular-ticket">
		{ticket._id} - {ticket.code} - {ticket.trainnumber} - {ticket.traindate}

		<UpdateTicket {ticket} {codes} {getTickets} />
	</div>
</div>

<style>
</style>
