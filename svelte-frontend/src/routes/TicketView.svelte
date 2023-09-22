<script>
  import TicketForm from "./TicketForm.svelte";
  import OldTickets from "./OldTickets.svelte";

  export let selectedTrain;
  export let renderTicketView;
  export let tickets;
  export let codes;
  export let outputDelay;
  export let backFunctionality;

  async function submitForm(event) {
    event.preventDefault();

    const reasonCodeSelect = document.getElementById("reason-code");

    const newTicket = {
      code: reasonCodeSelect.value,
      trainnumber: selectedTrain.OperationalTrainNumber,
      traindate: selectedTrain.EstimatedTimeAtLocation.substring(0, 10),
    };

    await fetch("http://localhost:1337/tickets", {
      body: JSON.stringify(newTicket),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    });

    await renderTicketView(selectedTrain);
  }
</script>

<div class="ticket-container">
  <div class="ticket">
    <a href="" id="back" on:click={() => backFunctionality()}>&lt;- Tillbaka</a>
    <h1>Nytt ärende #{tickets[1] ? tickets[1].id : 0}</h1>
    {#if selectedTrain.FromLocation}
      <h3>Tåg från {selectedTrain.FromLocation[0].LocationName} till {selectedTrain.ToLocation[0].LocationName}.
        Just nu i {selectedTrain.LocationSignature}.</h3>
    {:else}
      <h3></h3>
    {/if}
    <p><strong>Försenad:</strong> {outputDelay(selectedTrain)}</p>
    <TicketForm {submitForm} {codes} />
  </div>
  <br>
  <OldTickets {tickets} />
</div>
