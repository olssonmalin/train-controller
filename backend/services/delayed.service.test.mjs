import fetchMock from 'jest-fetch-mock';

import delayedService from './delayed.service.mjs';

fetchMock.enableMocks();

describe('delayedService', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('fetchDelayedTrains should make a successful API call', async () => {
        const responseData = { some: 'data' };
        fetchMock.mockResponse(JSON.stringify(responseData));
        await delayedService.fetchDelayedTrains();
        expect(fetchMock).toHaveBeenCalledWith(
            'https://api.trafikinfo.trafikverket.se/v2/data.json',
            {
                method: 'POST',
                body: expect.any(String),
                headers: { 'Content-Type': 'text/xml' },
            },
        );
    });

    it('fetchDelayedTrains should handle API errors', async () => {
        fetchMock.mockReject(new Error('API request failed'));
        await expect(delayedService.fetchDelayedTrains()).rejects.toThrow(
            Error,
        );
    });
});
