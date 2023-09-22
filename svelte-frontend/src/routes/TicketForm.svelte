<script>
  export let submitForm;
  export let codes;
</script>

<form id="new-ticket-form" method="POST" on:submit={submitForm}>
  <label>Orsakskod</label><br />
  <select id="reason-code">
    {#each codes as code}
      <option value="{code.Code}">{code.Code} - {code.Level3Description}</option>
    {/each}
  </select><br /><br />
  <input type="submit" value="Skapa nytt ärende" />
</form>
