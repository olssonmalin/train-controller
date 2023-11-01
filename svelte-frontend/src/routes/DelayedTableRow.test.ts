import { render, fireEvent, screen } from '@testing-library/svelte';

import DelayedTableRow from './DelayedTableRow.svelte';

test('shows proper train number when rendered', () => {
	const train = {
		AdvertisedTrainIdent: 32,
		LocationSignature: 'Kwe',
		FromLocation: [{ LocationName: 'Ahh' }],
		ToLocation: [{ LocationName: 'Ehh' }]
	};

	const renderTicketView = () => {};
	const outputDelay = () => 10;
	render(DelayedTableRow, { train, renderTicketView, outputDelay });
	const trainNumber = screen.getByText(train.AdvertisedTrainIdent);
	expect(trainNumber).toBeInTheDocument();
});

test('shows proper location signature when rendered', () => {
	const train = {
		OperationalTrainNumber: 32,
		LocationSignature: 'Kwe',
		FromLocation: [{ LocationName: 'Ahh' }],
		ToLocation: [{ LocationName: 'Ehh' }]
	};

	const renderTicketView = () => {};
	const outputDelay = () => 10;
	render(DelayedTableRow, { train, renderTicketView, outputDelay });
	const locationSignature = screen.getByText(train.LocationSignature);
	expect(locationSignature).toBeInTheDocument();
});

test('shows proper from location name when rendered', () => {
	const train = {
		OperationalTrainNumber: 32,
		LocationSignature: 'Kwe',
		FromLocation: [{ LocationName: 'Ahh' }],
		ToLocation: [{ LocationName: 'Ehh' }]
	};

	const renderTicketView = () => {};
	const outputDelay = () => 10;
	render(DelayedTableRow, { train, renderTicketView, outputDelay });
	const fromLocationName = screen.getByTestId('location-names');
	expect(fromLocationName).toHaveTextContent(train.FromLocation[0].LocationName);
});

test('shows proper to location name when rendered', () => {
	const train = {
		OperationalTrainNumber: 32,
		LocationSignature: 'Kwe',
		FromLocation: [{ LocationName: 'Ahh' }],
		ToLocation: [{ LocationName: 'Ehh' }]
	};

	const renderTicketView = () => {};
	const outputDelay = () => 10;
	render(DelayedTableRow, { train, renderTicketView, outputDelay });
	const toLocationName = screen.getByTestId('location-names');
	expect(toLocationName).toHaveTextContent(train.ToLocation[0].LocationName);
});

test('shows proper delay when rendered', () => {
	const train = {
		OperationalTrainNumber: 32,
		LocationSignature: 'Kwe',
		FromLocation: [{ LocationName: 'Ahh' }],
		ToLocation: [{ LocationName: 'Ehh' }]
	};

	const renderTicketView = () => {};
	const outputDelay = () => 10;
	render(DelayedTableRow, { train, renderTicketView, outputDelay });
	const outputDelayElement = screen.getByTestId('output-delay');
	expect(outputDelayElement).toHaveTextContent(`${outputDelay()}`);
});
