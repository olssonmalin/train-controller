import { describe, expect, it, jest, afterEach } from '@jest/globals';

import codesService from '../services/codes.service.mjs';
import delayedService from '../services/delayed.service.mjs';
import ticketsService from '../services/tickets.service.mjs';
import usersService from '../services/users.service.mjs';
import jwtUtils from '../utils/jwt.mjs';
import ticketLocks from '../utils/ticketLocks.mjs';
import {
    createTicket,
    deleteTicket,
    getCodes,
    getDelayedTrains,
    getTickets,
    getUser,
    login,
    register,
    updateTicket,
} from './resolvers.mjs';

jest.mock('../services/codes.service.mjs', () => ({
    fetchCodes: jest.fn(),
}));
jest.mock('../services/delayed.service.mjs', () => ({
    fetchDelayedTrains: jest.fn(),
}));
jest.mock('../services/tickets.service.mjs', () => ({
    getTickets: jest.fn(),
    createTicket: jest.fn(),
    deleteTicket: jest.fn(),
    updateTicket: jest.fn(),
}));
jest.mock('../services/users.service.mjs', () => ({
    findUserByEmail: jest.fn(),
    createUser: jest.fn(),
}));
jest.mock('../utils/ticketLocks.mjs', () => ({
    isTicketLocked: jest.fn(),
    getLockingUser: jest.fn(),
}));
jest.mock('../utils/jwt.mjs', () => ({
    verifyPassword: jest.fn(),
    generateToken: jest.fn(),
}));

describe('GraphQL resolvers', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('getCodes should return ReasonCode', async () => {
        codesService.fetchCodes.mockResolvedValue({
            RESPONSE: {
                RESULT: [{ ReasonCode: '123' }],
            },
        });

        const result = await getCodes();
        expect(result).toBe('123');
    });

    it('getDelayedTrains should return TrainAnnouncement', async () => {
        delayedService.fetchDelayedTrains.mockResolvedValue({
            RESPONSE: {
                RESULT: [{ TrainAnnouncement: 'Train XYZ' }],
            },
        });

        const result = await getDelayedTrains();
        expect(result).toBe('Train XYZ');
    });

    it('getTickets should throw an error when user is null', async () => {
        const context = { user: null };
        await expect(getTickets(context)).rejects.toThrow('Unauthorized');
    });

    it('getUser should return user information', async () => {
        usersService.findUserByEmail.mockResolvedValue({
            email: 'test@example.com',
        });

        const result = await getUser({ email: 'test@example.com' });
        expect(result.email).toBe('test@example.com');
    });

    it('createTicket should create a new ticket', async () => {
        const input = {
            code: 'ABC123',
            trainnumber: 'XYZ456',
            traindate: '2023-10-24',
        };

        ticketsService.createTicket.mockResolvedValue({
            acknowledged: true,
            insertedId: 'ticketId',
        });

        const result = await createTicket(
            { input },
            { user: { userId: 'user123' } },
        );
        expect(result.message).toBe('Ticket created successfully');
        expect(result.success).toBe(true);
    });

    it('createTicket should throw an error when creating a new ticket fails', async () => {
        const input = {
            code: 'ABC123',
            trainnumber: 'XYZ456',
            traindate: '2023-10-24',
        };

        ticketsService.createTicket.mockResolvedValue({
            acknowledged: false,
        });

        await expect(
            createTicket({ input }, { user: { userId: 'user123' } }),
        ).rejects.toThrow('Failed to create a new ticket');
    });

    it('updateTicket should update a ticket', async () => {
        const input = {
            _id: 'ticketId',
        };

        ticketsService.updateTicket.mockResolvedValue(true);

        const result = await updateTicket(
            { input },
            { user: { userId: 'user123' } },
        );
        expect(result.message).toBe(
            'Ticket with ID ticketId has been updated.',
        );
        expect(result.success).toBe(true);
    });

    it('updateTicket should throw an error when the ticket is locked by someone else', async () => {
        const input = {
            _id: 'ticketId',
        };

        ticketLocks.isTicketLocked.mockReturnValue(true);
        ticketLocks.getLockingUser.mockReturnValue('anotherUser123');

        await expect(
            updateTicket({ input }, { user: { userId: 'user123' } }),
        ).rejects.toThrow('Ticket is locked by someone else.');
    });

    it('updateTicket should throw an error when updating the ticket fails', async () => {
        const input = {
            _id: 'ticketId',
        };

        ticketLocks.isTicketLocked.mockReturnValue(false);
        ticketsService.updateTicket.mockResolvedValue(false);

        await expect(
            updateTicket({ input }, { user: { userId: 'user123' } }),
        ).rejects.toThrow('Failed to update the ticket');
    });

    it('deleteTicket should throw an error when user is null', async () => {
        const context = { user: null };
        await expect(
            deleteTicket({ ticketId: 'ticketId' }, context),
        ).rejects.toThrow('Unauthorized');
    });

    it('deleteTicket should throw an error when the ticket is locked by someone else', async () => {
        ticketLocks.isTicketLocked.mockReturnValue(true);
        ticketLocks.getLockingUser.mockReturnValue('anotherUser123');

        await expect(
            deleteTicket(
                { ticketId: 'ticketId' },
                { user: { userId: 'user123' } },
            ),
        ).rejects.toThrow('Ticket is locked by someone else.');
    });

    it('deleteTicket should throw an error when deleting the ticket fails', async () => {
        ticketLocks.isTicketLocked.mockReturnValue(false);
        ticketsService.deleteTicket.mockResolvedValue(false);

        await expect(
            deleteTicket(
                { ticketId: 'ticketId' },
                { user: { userId: 'user123' } },
            ),
        ).rejects.toThrow('Failed to delete the ticket');
    });

    it('login should return a token for valid login credentials', async () => {
        usersService.findUserByEmail.mockResolvedValue({
            email: 'test@example.com',
            password: 'hashedPassword',
        });
        jwtUtils.verifyPassword.mockReturnValue(true);
        jwtUtils.generateToken.mockReturnValue('token123');

        const result = await login({
            input: { email: 'test@example.com', password: '123456' },
        });
        expect(result.token).toBe('token123');
        expect(result.success).toBe(true);
    });

    it('login should throw an error for invalid login credentials', async () => {
        usersService.findUserByEmail.mockResolvedValue({
            email: 'test@example.com',
            password: 'hashedPassword',
        });
        jwtUtils.verifyPassword.mockReturnValue(false);

        await expect(
            login({
                input: {
                    email: 'test@example.com',
                    password: 'invalidPassword',
                },
            }),
        ).rejects.toThrow('Invalid login credentials.');
    });

    it('register should register a new user', async () => {
        usersService.findUserByEmail.mockResolvedValue(null);
        usersService.createUser.mockResolvedValue({ success: true });

        const result = await register({
            input: { email: 'newuser@example.com', password: '123456' },
        });
        expect(result.success).toBe(true);
    });

    it('register should throw an error for an already registered email', async () => {
        usersService.findUserByEmail.mockResolvedValue({
            email: 'existing@example.com',
        });

        await expect(
            register({
                input: {
                    email: 'existing@example.com',
                    password: '123456',
                },
            }),
        ).rejects.toThrow('Email already registered.');
    });

    it('register should throw an error when user registration fails', async () => {
        usersService.findUserByEmail.mockResolvedValue(null);
        usersService.createUser.mockResolvedValue(null);

        await expect(
            register({
                input: {
                    email: 'newuser@example.com',
                    password: '123456',
                },
            }),
        ).rejects.toThrow('User could not be registered.');
    });
});
