import { describe, expect, it, jest } from '@jest/globals';
import { ObjectId } from 'mongodb';
import mongoDBSingleton from '../db/database.mjs';
import ticketsService from './tickets.service.mjs';

jest.mock('../db/database.mjs');

describe('ticketsService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createTicket', () => {
        it('should create a new ticket', async () => {
            const mockDb = {
                collection: jest.fn().mockReturnValue({
                    insertOne: jest.fn().mockResolvedValue({
                        insertedId: 'mockedTicketId',
                    }),
                }),
            };
            mongoDBSingleton.connect.mockResolvedValue(mockDb);

            const newTicket = {
                code: 'aea001',
                trainnumber: '001',
                traindate: '2022-06-06',
            };

            const result = await ticketsService.createTicket(newTicket);

            expect(mongoDBSingleton.connect).toHaveBeenCalled();
            expect(mockDb.collection).toHaveBeenCalledWith('tickets');
            expect(result.insertedId).toBe('mockedTicketId');
        });

        it('should handle errors gracefully', async () => {
            const errorMessage = 'Failed to create a new ticket.';
            mongoDBSingleton.connect.mockRejectedValue(new Error(errorMessage));

            await expect(
                ticketsService.createTicket({
                    code: 'aea001',
                    trainnumber: '001',
                    traindate: '2022-06-06',
                }),
            ).rejects.toThrowError(errorMessage);
        });
    });

    describe('deleteTicket', () => {
        it('should delete a ticket', async () => {
            const mockDb = {
                collection: jest.fn().mockReturnValue({
                    deleteOne: jest.fn().mockResolvedValue({
                        deletedCount: 1,
                    }),
                }),
            };
            mongoDBSingleton.connect.mockResolvedValue(mockDb);

            const ticketId = 1;

            const result = await ticketsService.deleteTicket(ticketId);

            expect(mongoDBSingleton.connect).toHaveBeenCalled();
            expect(mockDb.collection).toHaveBeenCalledWith('tickets');
            expect(result).toBe(true);
        });

        it('should handle errors gracefully', async () => {
            const errorMessage = 'Failed to delete the ticket.';
            mongoDBSingleton.connect.mockRejectedValue(new Error(errorMessage));

            await expect(ticketsService.deleteTicket('invalidTicketId')).rejects.toThrowError(errorMessage);
        });
    });

    describe('getTickets', () => {
        it('should get all tickets', async () => {
            const mockDb = {
                collection: jest.fn().mockReturnValue({
                    find: jest.fn().mockReturnValue({
                        toArray: jest.fn().mockResolvedValue([
                            {
                                code: 'aea001',
                                trainnumber: '001',
                                traindate: '2022-06-06',
                            },
                        ]),
                    }),
                }),
            };
            mongoDBSingleton.connect.mockResolvedValue(mockDb);

            const tickets = await ticketsService.getTickets();

            expect(mongoDBSingleton.connect).toHaveBeenCalled();
            expect(mockDb.collection).toHaveBeenCalledWith('tickets');
            expect(tickets).toEqual([
                {
                    code: 'aea001',
                    trainnumber: '001',
                    traindate: '2022-06-06',
                }
            ]);
        });

        it('should handle errors gracefully', async () => {
            const errorMessage = 'Failed to get tickets.';
            mongoDBSingleton.connect.mockRejectedValue(new Error(errorMessage));

            await expect(ticketsService.getTickets()).rejects.toThrowError(errorMessage);
        });
    });

    describe('updateTicket', () => {
        it('should update a ticket', async () => {
            const mockDb = {
                collection: jest.fn().mockReturnValue({
                    updateOne: jest.fn().mockResolvedValue({
                        matchedCount: 1,
                    }),
                }),
            };
            mongoDBSingleton.connect.mockResolvedValue(mockDb);

            const updatedTicket = {
                _id: 1,
                code: 'aea001',
                trainnumber: '001',
                traindate: '2022-06-06',
            };

            const result = await ticketsService.updateTicket(updatedTicket);

            expect(mongoDBSingleton.connect).toHaveBeenCalled();
            expect(mockDb.collection).toHaveBeenCalledWith('tickets');
            expect(result.matchedCount).toBe(1);
        });

        it('should handle errors gracefully', async () => {
            const errorMessage = 'Failed to update the ticket.';
            mongoDBSingleton.connect.mockRejectedValue(new Error(errorMessage));

            await expect(ticketsService.updateTicket({ _id: 'mockedTicketId' })).rejects.toThrowError(errorMessage);
        });
    });
});
