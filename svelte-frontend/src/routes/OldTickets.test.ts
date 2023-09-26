import { render, screen } from '@testing-library/svelte';

import OldTickets from './OldTickets.svelte';

test('shows proper heading when rendered', () => {
	const tickets = [];
	render(OldTickets, { tickets });
	const heading = screen.getByText('Befintliga ärenden');
	expect(heading).toBeInTheDocument();
});

test('shows proper ticket id when rendered', () => {
	const tickets = [
		{
			id: 1,
			code: 'test001',
			trainnumber: 100,
			traindate: '2023-05-20'
		}
	];

	render(OldTickets, { tickets });
	const ticketContainer = screen.getByTestId('singular-ticket');
	expect(ticketContainer).toHaveTextContent(tickets[0].id);
});

test('shows proper ticket code when rendered', () => {
	const tickets = [
		{
			id: 1,
			code: 'test001',
			trainnumber: 100,
			traindate: '2023-05-20'
		}
	];

	render(OldTickets, { tickets });
	const ticketContainer = screen.getByTestId('singular-ticket');
	expect(ticketContainer).toHaveTextContent(tickets[0].code);
});

test('shows proper train number when rendered', () => {
	const tickets = [
		{
			id: 1,
			code: 'test001',
			trainnumber: 100,
			traindate: '2023-05-20'
		}
	];

	render(OldTickets, { tickets });
	const ticketContainer = screen.getByTestId('singular-ticket');
	expect(ticketContainer).toHaveTextContent(tickets[0].trainnumber);
});

test('shows proper train date when rendered', () => {
	const tickets = [
		{
			id: 1,
			code: 'test001',
			trainnumber: 100,
			traindate: '2023-05-20'
		}
	];

	render(OldTickets, { tickets });
	const ticketContainer = screen.getByTestId('singular-ticket');
	expect(ticketContainer).toHaveTextContent(tickets[0].traindate);
});
