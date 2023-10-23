<script>
	import { afterUpdate } from 'svelte';
	import DelayedTableRow from './DelayedTableRow.svelte';
	import { showTrainTable, showTrainMap } from '../store.ts';
	export let delayedTrains;
	export let renderTicketView;
	export let outputDelay;
	export let selected;

	afterUpdate(() => {
		if ($showTrainTable) {
			selected = delayedTrains.filter((train) => train.OperationalTrainNumber === $showTrainTable);
			console.log(selected);
		} else {
			selected = null;
		}
	});
</script>

<div class="delayed">
	<h1>Försenade tåg</h1>
	<button
		on:click={() => {
			$showTrainMap = null;
			$showTrainTable = null;
			console.log($showTrainMap);
			console.log($showTrainTable);
		}}>Nollställ vy</button
	>
	<div class="delayed-trains">
		{#if selected}
			{#each selected as train, index (index)}
				<DelayedTableRow {train} {renderTicketView} {outputDelay} />
			{/each}
		{:else}
			{#each delayedTrains as train, index (index)}
				<DelayedTableRow {train} {renderTicketView} {outputDelay} />
			{/each}
		{/if}
	</div>
</div>
