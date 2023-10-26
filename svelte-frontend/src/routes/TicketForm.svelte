<script>
	export let submitForm;
	export let codes;
	export let formData;
	let defaultSelect = formData.code;
</script>

<form id="new-ticket-form" method="POST" on:submit|preventDefault={submitForm}>
	<label>Orsakskod</label><br />
	<select id="reason-code" bind:value={formData.code}>
		<option value="none" selected disabled hidden>{defaultSelect}</option>
		{#each codes as code}
			<option value={code.Code} data-testid={code.Code}
				>{code.Code} - {code.Level3Description}</option
			>
		{/each}
	</select><br /><br />
	<input type="submit" data-testid="ticket-submit" value="Skapa nytt ärende" />
</form>
