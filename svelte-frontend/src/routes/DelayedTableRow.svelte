<script>
	export let train;
	export let renderTicketView;
	export let outputDelay;
</script>

<div data-testid="delayed-row" on:click={() => renderTicketView(train)}>
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
</div>

<style>
</style>
