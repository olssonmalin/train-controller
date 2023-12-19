<script>
	export let codes;
	export let ticket;
	import { onMount, onDestroy } from 'svelte';
	export let getTickets;
	import { loggedInUser } from '../store';
	import { io } from 'socket.io-client';
	let formData = {
		_id: ticket._id,
		code: ticket.code,
		trainnumber: ticket.trainnumber,
		traindate: ticket.traindate
	};
	import { getNotificationsContext } from 'svelte-notifications';

	const { addNotification } = getNotificationsContext();

	import Modal from '../components/Modal.svelte';
	let showEditTicket = false;
	const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
	let editable = true;
	let socket;

	function modalCloseAction() {
		socket.emit('unlockTicket', ticket._id);
		console.log('closing modal');
	}

	onDestroy(() => {
		socket.emit('unlockTicket', ticket._id);
		socket.close();
	});

	onMount(() => {
		socket = io(BACKEND_URL);

		socket.on('ticketAlreadyLocked', (data) => {
			console.log('Ticket is already locked');
			editable = false;
		});

		socket.on('ticketLocked', (data) => {
			console.log('Ticket is locked');
		});

		socket.on('ticketUnlocked', (data) => {
			console.log('Ticket is unlocked');
			getTickets();
			if (!editable) {
				editable = true;
				socket.emit('lockTicket', ticket._id, $loggedInUser);
			}
		});
	});

	async function updateTicket(event) {
		let response = await fetch(`${BACKEND_URL}/graphql`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${$loggedInUser}`
			},
			body: JSON.stringify({
				query: `mutation UpdateTicket {
                    updateTicket(input: {_id: "${formData._id}", code: "${formData.code}", trainnumber: "${formData.trainnumber}", traindate: "${formData.traindate}"}) {
                        message
                        success
                    }
                }`
			})
		});
		let result = await response.json();
		await getTickets();
		showEditTicket = false;
	}

	async function removeTicket(event) {
		let response = await fetch(`${BACKEND_URL}/graphql`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${$loggedInUser}`
			},
			body: JSON.stringify({
				query: `mutation DeleteTicket {
				    deleteTicket(ticketId: "${ticket._id}") {
				        message
				        success
				    }
				}`
			})
		});
		let result = await response.json();
		await getTickets();
		if (result.data.deleteTicket) {
			return true;
		}
		return false;
	}
</script>

<button
	class="default-button"
	on:click={() => {
		socket.emit('lockTicket', ticket._id, $loggedInUser);
		showEditTicket = true;
	}}>Ändra</button
>
<Modal bind:showModal={showEditTicket} closeAction={modalCloseAction}>
	<form
		id="update-ticket-form"
		method="POST"
		on:submit|preventDefault={() => {
			if (editable) {
				updateTicket();
			}
		}}
	>
		{#if !editable}
			<p>Detta ärende ändras av en annan användare</p>
		{/if}
		<label>Orsakskod</label><br />
		<select id="reason-code" bind:value={formData.code}>
			{#each codes as code}
				<option value={code.Code} data-testid={code.Code}
					>{code.Code} - {code.Level3Description}</option
				>
			{/each}
		</select><br /><br />
		<input type="submit" data-testid="ticket-submit" value="Uppdatera ärende" />
	</form>
</Modal>
<button
	class="blue-button"
	on:click={async () => {
		const deleted = await removeTicket();
		if (deleted) {
			addNotification({
				text: 'Ärendet är borttaget',
				type: 'success',
				removeAfter: 4000,
				position: 'top-center'
			});
		} else {
			addNotification({
				text: 'Ärendet hanteras av annan användare',
				type: 'error',
				removeAfter: 4000,
				position: 'top-center'
			});
		}
	}}>Radera</button
>
