<script>
  import { onMount } from "svelte";
  import Map from "./Map.svelte";
  import DelayedTable from "./DelayedTable.svelte";
  import { ticketViewState } from "../store.ts";

  let ticketViewStateValue = null;
  ticketViewState.subscribe(value => {
    ticketViewStateValue = value;
  });

  let delayedTrains = [];

  onMount(async () => {
    // Fetch delayed train data from the API
    const response = await fetch("http://localhost:1337/delayed");
    const result = await response.json();
    delayedTrains = result.data;
  });
</script>

<svelte:head>
  <title>TrafikLedare applikationen</title>
</svelte:head>

<section class="container">
  <DelayedTable {delayedTrains} />
  {#if ticketViewStateValue !== 'active'}
    <Map />
  {/if}
</section>

