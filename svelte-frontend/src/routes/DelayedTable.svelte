<script>
	import DelayedTableRow from './DelayedTableRow.svelte';

	export let delayedTrains;
	export let renderTicketView;
	export let outputDelay;
</script>

<div class="delayed">
	<h1>Försenade tåg</h1>
	<div class="delayed-trains">
		{#each delayedTrains as train, index (index)}
			<DelayedTableRow {train} {renderTicketView} {outputDelay} />
		{/each}
	</div>
</div>
