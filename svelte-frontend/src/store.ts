import { writable } from 'svelte/store';

export const ticketViewState = writable(null);
export const showTrainMap = writable(null);
export const showTrainTable = writable(null);