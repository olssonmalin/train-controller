<script>
	import { showTrainMap } from '../store.ts';
	import { showTrainMap } from '../store.ts';
	export let train;
	export let renderTicketView;
	export let outputDelay;
</script>

<div
	data-testid="delayed-row"
	on:click={() => {
		showTrainMap.set(train.OperationalTrainNumber);
	}}
>
	<div class="train-number">{train.OperationalTrainNumber}</div>
	<div class="current-station" data-testid="current-station">
		<div>{train.LocationSignature}</div>
		<div data-testid="location-names">
			{#if train.FromLocation}
				{train.FromLocation[0].LocationName} ->
			{/if}
			{#if train.ToLocation}
				{train.ToLocation[0].LocationName}
			{/if}
		</div>
	</div>
	<div class="delay" data-testid="output-delay">{outputDelay(train)}</div>
	<button data-testid="new-ticket" on:click={() => renderTicketView(train)}>Skapa ärende</button>
</div>

<style>
</style>
