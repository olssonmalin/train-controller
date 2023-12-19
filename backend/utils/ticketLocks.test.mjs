import { describe, expect, it, jest } from '@jest/globals';
import TicketLocks from './ticketLocks.mjs';

describe('TicketLocks', () => {
    let ticketLocks;
    let mockIo;

    beforeEach(() => {
        ticketLocks = TicketLocks;
        mockIo = {
            on: jest.fn(),
            emit: jest.fn(),
        };
    });

    describe('lockTicket', () => {
        it('should lock a ticket and emit a message if io is set', () => {
            ticketLocks.setIo(mockIo);

            const ticketId = 'mockedTicketId';
            const userId = 'mockedUserId';

            ticketLocks.lockTicket(ticketId, userId);

            expect(ticketLocks.isTicketLocked(ticketId)).toBe(true);
            expect(mockIo.emit).toHaveBeenCalledWith('ticketLocked', ticketId, userId);
        });
    });

    describe('unlockTicket', () => {
        it('should unlock a ticket and emit a message if io is set', () => {
            ticketLocks.setIo(mockIo);

            const ticketId = 'mockedTicketId';
            ticketLocks.lockTicket(ticketId, 'mockedUserId');

            ticketLocks.unlockTicket(ticketId);

            expect(ticketLocks.isTicketLocked(ticketId)).toBe(false);
            expect(mockIo.emit).toHaveBeenCalledWith('ticketUnlocked', ticketId);
        });
    });

    describe('isTicketLocked', () => {
        it('should return true if the ticket is locked', () => {
            const ticketId = 'mockedTicketId';
            const userId = 'mockedUserId';

            ticketLocks.lockTicket(ticketId, userId);

            expect(ticketLocks.isTicketLocked(ticketId)).toBe(true);
        });

        it('should return false if the ticket is not locked', () => {
            const ticketId = 'moccaTickaId';

            expect(ticketLocks.isTicketLocked(ticketId)).toBe(false);
        });
    });

    describe('getLockingUser', () => {
        it('should return the user who locked the ticket', () => {
            const ticketId = 'mockedTicketId';
            const userId = 'mockedUserId';

            ticketLocks.lockTicket(ticketId, userId);

            expect(ticketLocks.getLockingUser(ticketId)).toBe(userId);
        });

        it('should return undefined if the ticket is not locked', () => {
            const ticketId = 'mockaTickaId';

            expect(ticketLocks.getLockingUser(ticketId)).toBeUndefined();
        });
    });
});
