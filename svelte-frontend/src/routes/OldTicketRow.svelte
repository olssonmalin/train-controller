<script>
	import UpdateTicket from './UpdateTicket.svelte';
	export let ticket;
	export let codes;
	export let getTickets;
</script>

<div class="delayed-row">
	<div class="width-full">
		<div>{ticket._id}</div>
		<div>{ticket.code}</div>
		<div>{ticket.trainnumber}</div>
		<div>{ticket.traindate}</div>
	</div>
	<div class='flex-row'>
		<UpdateTicket {ticket} {codes} {getTickets} />
	</div>
</div>

<style>
	.width-full {
		width: 70%;
		display: flex;
		justify-content: space-between;
	}

	.flex-row {
		display: flex;
	}
</style>
