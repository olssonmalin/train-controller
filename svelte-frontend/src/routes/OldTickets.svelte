<script>
	export let tickets;
</script>

<div class="old-tickets" id="old-tickets">
	<h2>Befintliga ärenden</h2>
	{#each tickets as ticket}
		<div data-testid="singular-ticket">
			{ticket._id} - {ticket.code} - {ticket.trainnumber} - {ticket.traindate}
		</div>
	{/each}
</div>
