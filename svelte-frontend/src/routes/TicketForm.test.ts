import { render, fireEvent, screen } from '@testing-library/svelte';

import TicketForm from './TicketForm.svelte';
import { vi } from 'vitest';

test('shows proper label for select input when rendered', () => {
	const submitForm = vi.fn();
	const codes: never[] = [];
	const formData = {};

	render(TicketForm, { submitForm, codes, formData });
	const label = screen.getByText('Orsakskod');
	expect(label).toBeDefined();
});

test('shows proper option when rendered', () => {
	const submitForm = vi.fn();
	const codes = [
		{Code: 'A111'}
	];
	const formData = {
		code: 'hey'
	};

	render(TicketForm, { submitForm, codes, formData  });
	const option = screen.getByTestId(codes[0].Code);
	expect(option).toBeDefined();
});

test('shows proper level 3 description when rendered', () => {
	const submitForm = vi.fn();
	const codes = [
		{
			Code: 'A111',
			Level3Description: 'Test'
		}
	];
	const formData = {
		code: 'hey'
	};

	render(TicketForm, { submitForm, codes, formData });
	const option = screen.getByTestId(codes[0].Code);
	expect(option).toBeDefined();
});

test('submit triggers submitForm', () => {
	const submitForm = vi.fn();
	const codes: never[] = [];
	const formData = {
		code: 'hey'
	};

	render(TicketForm, { submitForm, codes, formData });
	const ticketSubmit = screen.getByTestId('ticket-submit');
	fireEvent.click(ticketSubmit);
	expect(submitForm).toHaveBeenCalledTimes(1);
});
