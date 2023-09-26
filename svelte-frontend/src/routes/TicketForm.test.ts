import { render, fireEvent, screen } from '@testing-library/svelte';

import TicketForm from './TicketForm.svelte';

test('shows proper label for select input when rendered', () => {
	const codes = [];
	const submitForm = vi.fn();

	render(TicketForm, { codes, submitForm });
	const label = screen.getByText('Orsakskod');
	expect(label).toBeInTheDocument();
});

test('shows proper option when rendered', () => {
	const codes = [
		{
			Code: 'A111',
			Level3Description: 'Test'
		}
	];
	const submitForm = vi.fn();

	render(TicketForm, { codes, submitForm });
	const option = screen.getByTestId(codes[0].Code);
	expect(option).toHaveTextContent(codes[0].Code);
});

test('shows proper level 3 description when rendered', () => {
	const codes = [
		{
			Code: 'A111',
			Level3Description: 'Test'
		}
	];
	const submitForm = vi.fn();

	render(TicketForm, { codes, submitForm });
	const option = screen.getByTestId(codes[0].Code);
	expect(option).toHaveTextContent(codes[0].Level3Description);
});

test('submit triggers submitForm', () => {
	const codes = [];
	const submitForm = vi.fn();

	render(TicketForm, { codes, submitForm });
	const ticketSubmit = screen.getByTestId('ticket-submit');
	fireEvent.click(ticketSubmit);
	expect(submitForm).toHaveBeenCalledTimes(1);
});
