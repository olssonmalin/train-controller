import { beforeEach, describe, expect, it } from '@jest/globals';
import fetchMock from 'jest-fetch-mock';

import codesService from './codes.service.mjs';

fetchMock.enableMocks();

describe('codesService', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('fetchCodes should make a successful API call', async () => {
        const responseData = { some: 'data' };
        fetchMock.mockResponse(JSON.stringify(responseData));
        await codesService.fetchCodes();
        expect(fetchMock).toHaveBeenCalledWith(
            'https://api.trafikinfo.trafikverket.se/v2/data.json',
            {
                method: 'POST',
                body: expect.any(String),
                headers: { 'Content-Type': 'text/xml' },
            },
        );
    });

    it('fetchCodes should handle API errors', async () => {
        fetchMock.mockReject(new Error('API request failed'));
        await expect(codesService.fetchCodes()).rejects.toThrow(Error);
    });
});
