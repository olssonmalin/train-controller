import { writable } from 'svelte/store';
import Cookies from 'js-cookie';

export const ticketViewState = writable(null);
export const showTrainMap = writable(null);
export const showTrainTable = writable(null);
export const loggedInUser = writable(Cookies.get("userToken") ?? null);
export const selectedTrain = writable(null);