import { render, screen } from '@testing-library/svelte';

import DelayedTable from './DelayedTable.svelte';

test('shows proper heading when rendered', () => {
	vi.mock('./DelayedTableRow.svelte', () => {
		return {};
	});

	const delayedTrains = [];
	const renderTicketView = vi.fn();
	const outputDelay = vi.fn();

	render(DelayedTable, { delayedTrains, renderTicketView, outputDelay });
	const heading = screen.getByText('Försenade tåg');
	expect(heading).toBeInTheDocument();
});
