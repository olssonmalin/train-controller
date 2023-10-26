<script>
	import TicketForm from './TicketForm.svelte';
	import OldTickets from './OldTickets.svelte';
	import { loggedInUser, selectedTrain } from '../store';

	const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

	// export let selectedTrain;
	export let getTickets;
	export let tickets;
	export let codes;
	export let outputDelay;
	export let backFunctionality;
	let formData = {
		code: 'Välj kod från listan',
		trainnumber: $selectedTrain.AdvertisedTrainIdent,
		traindate: $selectedTrain.EstimatedTimeAtLocation.substring(0, 10)
	};
	async function submitForm(event) {
		let response = await fetch(`${BACKEND_URL}/graphql`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${$loggedInUser}`
			},
			body: JSON.stringify({
				query: `mutation CreateTicket {
				    createTicket(input: {code: "${formData.code}", trainnumber: "${formData.trainnumber}", traindate: "${formData.traindate}"}) {
				        message
				        ticketId
				        success
				    }
				}`
			})
		});
		let result = await response.json();
		console.log(result);

		await getTickets();
	}
</script>

<div class="ticket-container">
	<div class="ticket">
		<a href="" id="back" data-testid="back-button" on:click={() => backFunctionality()}
			>&lt;- Tillbaka</a
		>
		<h1 data-testid="ticket-heading">Nytt ärende för tåg {$selectedTrain.AdvertisedTrainIdent}</h1>
		{#if $selectedTrain.FromLocation}
			<h3 data-testid="selected-train-info">
				Tåg från {$selectedTrain.FromLocation[0].LocationName} till {$selectedTrain.ToLocation[0]
					.LocationName}. Just nu i {$selectedTrain.LocationSignature}.
			</h3>
		{:else}
			<h3 />
		{/if}
		<p data-testid="delayed-text"><strong>Försenad:</strong> {outputDelay($selectedTrain)}</p>
		<TicketForm {submitForm} {codes} {formData} />
	</div>
	<br />
	<OldTickets {tickets} {codes} {getTickets} />
</div>
