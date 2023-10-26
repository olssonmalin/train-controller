<script>
	export let tickets;
	export let codes;
	export let getTickets;
	import OldTicketRow from './OldTicketRow.svelte';
</script>

<div class="old-tickets" id="old-tickets">
	<h2>Befintliga ärenden</h2>
	{#each tickets as ticket}
		<!-- <div data-testid="singular-ticket">
			{ticket._id} - {ticket.code} - {ticket.trainnumber} - {ticket.traindate}
		</div> -->
		<OldTicketRow {ticket} {codes} {getTickets} />
	{/each}
</div>
