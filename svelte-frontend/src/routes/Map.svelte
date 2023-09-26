<script>
	import { onMount, onDestroy } from 'svelte';
	import L from 'leaflet';
	import { io } from 'socket.io-client';

	const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

	let socket;

	let map;
	let markers = {};

	onMount(() => {
		map = L.map('map').setView([62.173276, 14.942265], 5);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19
		}).addTo(map);

		socket = io(BACKEND_URL);

		socket.on('message', (data) => {
			if (markers.hasOwnProperty(data.trainnumber)) {
				let marker = markers[data.trainnumber];

				marker.setLatLng(data.position);
			} else {
				markers[data.trainnumber] = L.marker(data.position).bindPopup(data.trainnumber).addTo(map);
			}
		});
	});

	onDestroy(() => {
		socket.close();
	});
</script>

<div id="map" class="map" />
