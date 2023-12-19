<script>
	import Modal from '../components/Modal.svelte';
	import Cookies from 'js-cookie';
	import { loggedInUser } from '../store';
	let username = '';
	let password = '';
	let openLogIn = false;
	const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

	async function handleLogin(event) {
		// You can add your login logic here.
		console.log(username);
		console.log(event);
		console.log(password);

		let response = await fetch(`${BACKEND_URL}/graphql`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				query: `mutation Login {
					login(input: {email: "${username}", password: "${password}"}) {
        			token
       				success
    			}
				}`
			})
		});
		let result = await response.json();
		let login = result.data.login;
		let token = login.token;
		// cookies get will return undefined if unset
		const oneHour = 1 / 24;
		Cookies.set('userToken', token, { expires: oneHour });
		$loggedInUser = Cookies.get('userToken');
		openLogIn = false;
		username = '';
		password = '';
	}

	async function handleRegister(event) {
		// You can add your login logic here.
		console.log(username);
		console.log(event);
		console.log(password);

		let response = await fetch(`${BACKEND_URL}/graphql`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				query: `mutation Login {
					login(input: {email: "${username}", password: "${password}"}) {
        			token
       				success
    			}
				}`
			})
		});
		let result = await response.json();
		let login = result.data.login;
		let token = login.token;
		openLogIn = false;
		username = '';
		password = '';
	}
</script>

{#if $loggedInUser}
	<button
		class="default-button"
		on:click={() => {
			Cookies.remove('userToken');
			$loggedInUser = null;
		}}>Logga ut</button
	>
{:else}
	<button
		class="default-button"
		data-testid="log-in"
		on:click={() => {
			openLogIn = true;
		}}>Logga in</button
	>
	<Modal bind:showModal={openLogIn}>
		<form id="login-form" method="POST" on:submit|preventDefault={handleLogin}>
			<label for="username">Username:</label>
			<input type="text" name="username" id="username" bind:value={username} />

			<label for="password">Password:</label>
			<input type="password" name="password" id="password" bind:value={password} />

			<input class="default-button" type="submit" data-testid="login-submit" value="Logga in" />
		</form>
	</Modal>
{/if}

<style>
	/* Add your CSS styling here */
</style>
