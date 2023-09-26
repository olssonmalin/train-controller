import { render, fireEvent, screen } from '@testing-library/svelte';

import TicketView from './TicketView.svelte';

test('shows proper heading when rendered with no tickets', () => {
	const selectedTrain = {};
	const renderTicketView = vi.fn();
	const tickets = [];
	const codes = [];
	const outputDelay = vi.fn();
	const backFunctionality = vi.fn();

	render(TicketView, {
		selectedTrain,
		renderTicketView,
		tickets,
		codes,
		outputDelay,
		backFunctionality
	});

	const heading = screen.getByTestId('ticket-heading');
	expect(heading).toHaveTextContent('Nytt ärende #0');
});

test('shows proper heading when rendered with a ticket', () => {
	const selectedTrain = {};
	const renderTicketView = vi.fn();
	const tickets = [{ id: -1 }, { id: 1 }];
	const codes = [];
	const outputDelay = vi.fn();
	const backFunctionality = vi.fn();

	render(TicketView, {
		selectedTrain,
		renderTicketView,
		tickets,
		codes,
		outputDelay,
		backFunctionality
	});

	const heading = screen.getByTestId('ticket-heading');
	expect(heading).toHaveTextContent('Nytt ärende #1');
});

test('shows proper back button text content when rendered', () => {
	const selectedTrain = {};
	const renderTicketView = vi.fn();
	const tickets = [];
	const codes = [];
	const outputDelay = vi.fn();
	const backFunctionality = vi.fn();

	render(TicketView, {
		selectedTrain,
		renderTicketView,
		tickets,
		codes,
		outputDelay,
		backFunctionality
	});

	const heading = screen.getByTestId('back-button');
	expect(heading).toHaveTextContent('Tillbaka');
});

test('shows proper delay text when rendered', () => {
	const selectedTrain = {};
	const renderTicketView = vi.fn();
	const tickets = [];
	const codes = [];
	const outputDelay = vi.fn();
	const backFunctionality = vi.fn();

	render(TicketView, {
		selectedTrain,
		renderTicketView,
		tickets,
		codes,
		outputDelay,
		backFunctionality
	});

	const heading = screen.getByTestId('delayed-text');
	expect(heading).toHaveTextContent('Försenad:');
});

test('shows no h3 element if no FromLocation when rendered', () => {
	const selectedTrain = {};
	const renderTicketView = vi.fn();
	const tickets = [];
	const codes = [];
	const outputDelay = vi.fn();
	const backFunctionality = vi.fn();

	render(TicketView, {
		selectedTrain,
		renderTicketView,
		tickets,
		codes,
		outputDelay,
		backFunctionality
	});

	expect(() => screen.getByTestId('selected-train-info')).toThrow();
});

test('shows correct train info when rendered with selected train', () => {
	const selectedTrain = {
		FromLocation: [{ LocationName: 'aaa' }],
		ToLocation: [{ LocationName: 'bbb' }],
		LocationSignature: 'test'
	};
	const renderTicketView = vi.fn();
	const tickets = [];
	const codes = [];
	const outputDelay = vi.fn();
	const backFunctionality = vi.fn();

	render(TicketView, {
		selectedTrain,
		renderTicketView,
		tickets,
		codes,
		outputDelay,
		backFunctionality
	});

	const selectedTrainInfo = screen.getByTestId('selected-train-info');
	expect(selectedTrainInfo).toHaveTextContent(
		`Tåg från ${selectedTrain.FromLocation[0].LocationName} till ${selectedTrain.ToLocation[0].LocationName}. Just nu i ${selectedTrain.LocationSignature}.`
	);
});
