import { render, screen } from '@testing-library/svelte';

import OldTickets from './OldTickets.svelte';

test('shows proper heading when rendered', () => {
	const tickets: never[] = [];
	render(OldTickets, { tickets });
	const heading = screen.getByText('Befintliga ärenden');
	expect(heading).toBeInTheDocument();
});
