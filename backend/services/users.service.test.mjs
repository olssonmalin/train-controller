import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import mongoDBSingleton from '../db/database.mjs';
import usersService from './users.service.mjs';

jest.mock('../db/database.mjs');
jest.mock('bcrypt', () => ({
    hashSync: jest.fn((password, saltRounds) => 'mockedHashedPassword'),
}));

describe('usersService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('findUserByEmail', () => {
        it('should find a user by email', async () => {
            mongoDBSingleton.connect.mockResolvedValue({
                collection: jest.fn().mockReturnValue({
                    findOne: jest.fn().mockResolvedValue({
                        _id: 'mockedUserId',
                        email: 'test@example.com',
                    }),
                }),
            });

            const user = await usersService.findUserByEmail('test@example.com');

            expect(mongoDBSingleton.connect).toHaveBeenCalled();
            expect(user).toEqual({
                _id: 'mockedUserId',
                email: 'test@example.com',
            });
        });

        it('should handle errors gracefully', async () => {
            mongoDBSingleton.connect.mockRejectedValue(
                new Error('Connection error'),
            );

            await expect(
                usersService.findUserByEmail('test@example.com'),
            ).rejects.toThrowError('Connection error');
        });
    });

    describe('createUser', () => {
        it('should create a new user', async () => {
            mongoDBSingleton.connect.mockResolvedValue({
                collection: jest.fn().mockReturnValue({
                    insertOne: jest
                        .fn()
                        .mockResolvedValue({ insertedId: 'mockedUserId' }),
                }),
            });

            const newUser = {
                email: 'test@example.com',
                password: 'password123',
            };

            const result = await usersService.createUser(newUser);

            expect(mongoDBSingleton.connect).toHaveBeenCalled();
            expect(result.insertedId).toBe('mockedUserId');
        });
    });
});
