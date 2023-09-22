<script>
  export let train;
  export let renderTicketView;
  export let outputDelay;
</script>

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

<style>

</style>
