<script>
	import { showTrainMap, loggedInUser, selectedTrain } from '../store.ts';
	export let train;
	export let getTickets;
	export let outputDelay;
</script>

<div
	data-testid="delayed-row"
	on:click={() => {
		showTrainMap.set(train.AdvertisedTrainIdent);
	}}
>
	<div class="train-number">{train.AdvertisedTrainIdent}</div>
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
	{#if $loggedInUser}
		<button
			data-testid="new-ticket"
			on:click={() => {
				$selectedTrain = train;
				getTickets();
			}}>Skapa ärende</button
		>
	{/if}
</div>

<style>
</style>
