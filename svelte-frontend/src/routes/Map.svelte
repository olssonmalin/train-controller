<script>
	import { onMount, onDestroy, beforeUpdate, afterUpdate } from 'svelte';
	import { showTrainMap, showTrainTable } from '../store.ts';
	import L from 'leaflet';
    import 'leaflet/dist/leaflet.css';
	import { io } from 'socket.io-client';
    import markerIconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
    import markerIconUrl from 'leaflet/dist/images/marker-icon.png';
    import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png';

	const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

	let socket;

	let map;
	let markerLayerGroup = L.layerGroup();
	let singleMarker;
	let markers = {};
	export let delayedTrainNumbers;

    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: markerIconRetinaUrl,
        iconUrl: markerIconUrl,
        shadowUrl: markerShadowUrl
    });

	onMount(() => {
		map = L.map('map').setView([62.173276, 14.942265], 5);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19
		}).addTo(map);

		markerLayerGroup.addTo(map);
		socket = io(BACKEND_URL);

		socket.on('message', (data) => {
			const trainNumber = String(data.trainnumber);
			if (delayedTrainNumbers.includes(trainNumber)) {
				if (markers.hasOwnProperty(trainNumber)) {
					let marker = markers[trainNumber];

					marker.setLatLng(data.position);
				} else {
					let newMarker = L.marker(data.position)
						.on('click', (e) => {
							showTrainTable.set(trainNumber);
						})
						.bindPopup(trainNumber);
					markers[trainNumber] = newMarker;
					markerLayerGroup.addLayer(newMarker);
				}
			}
		});
	});

	afterUpdate(() => {
		if ($showTrainMap) {
			if (singleMarker) {
				map.removeLayer(singleMarker);
			}
			singleMarker = markers[$showTrainMap];
			if (singleMarker) {
				map.removeLayer(markerLayerGroup);
				singleMarker.addTo(map);
			}
		} else {
			markerLayerGroup.addTo(map);
		}
	});

	onDestroy(() => {
		socket.close();
	});
</script>

<div id="map" class="map" />
