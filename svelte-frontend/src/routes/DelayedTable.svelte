<script>
  import { onMount } from "svelte";
  import { ticketViewState } from "../store.ts";

  export let delayedTrains = [];
  let selectedTrain = null;

  function outputDelay(item) {
    let advertised = new Date(item.AdvertisedTimeAtLocation);
    let estimated = new Date(item.EstimatedTimeAtLocation);

    const diff = Math.abs(estimated - advertised);

    return Math.floor(diff / (1000 * 60)) + " minuter";
  }

  function renderTicketView(train) {
    selectedTrain = train;

    ticketViewState.set("active");
  }

  function backFunctionality() {
    selectedTrain = null;
    ticketViewState.set(null);
  }
</script>

{#if selectedTrain}
  <div class="ticket-container">
    <div class="ticket">
      <a href="" id="back" on:click={() => backFunctionality()}>Tillbaka</a>
      <h1>Nytt ärende #{selectedTrain.OperationalTrainNumber}</h1>
      <p><strong>Försenad:</strong> {outputDelay(selectedTrain)}</p>
      <!-- Add your form and other content here -->
    </div>
    <br>
    <div class="old-tickets" id="old-tickets">
      <h2>Befintliga ärenden</h2>
    </div>
  </div>
{:else}
  <div class="delayed">
    <h1>Försenade tåg</h1>
    <div class="delayed-trains">
      {#each delayedTrains as train, index (index)}
        <div on:click={() => renderTicketView(train)}>
          <div class="train-number">{train.OperationalTrainNumber}</div>
          <div class="current-station">
            <div>{train.LocationSignature}</div>
            <div>
              {#if train.FromLocation}
                {train.FromLocation[0].LocationName} ->
              {/if}
              {#if train.ToLocation}
                {train.ToLocation[0].LocationName}
              {/if}
            </div>
          </div>
          <div class="delay">{outputDelay(train)}</div>
        </div>
      {/each}
    </div>
  </div>
{/if}


<style>
    .delayed {
        height: 100vh;
        width: 40vw;
        padding: 2rem;
        overflow: scroll;
        background-color: white;
    }

    .delayed-trains {
        display: flex;
        flex-direction: column;
    }

    .delayed-trains > div {
        display: flex;
        flex-direction: row;
        border-top: 1px solid #ccc;
        padding: 0.2rem 0.8rem;
        align-items: center;
        cursor: pointer;
    }

    .delayed-trains > div:nth-of-type(2n) {
        background-color: #eee;
    }

    .train-number {
        font-size: 2rem;
        font-weight: bold;
        width: 30%;
    }

    .current-station {
        width: 30%;
    }

    .ticket-container {
        padding: 2rem;
    }
</style>
