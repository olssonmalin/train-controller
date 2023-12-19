import { describe, expect, it, jest } from '@jest/globals';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import jwtUtils from './jwt.mjs';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('jwtUtils', () => {
    const mockUser = {
        id: 'mockedUserId',
        email: 'test@example.com',
    };

    const mockHashedPassword = 'mockedHashedPassword';
    const mockPassword = 'password123';

    describe('generateToken', () => {
        it('should generate a JWT token', () => {
            process.env.JWT_SECRET = 'mockedSecretKey';

            const mockToken = 'mockedToken';
            jwt.sign.mockReturnValue(mockToken);

            const token = jwtUtils.generateToken(mockUser);

            expect(jwt.sign).toHaveBeenCalledWith(
                { id: mockUser.id, email: mockUser.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' },
            );
            expect(token).toBe(mockToken);
        });
    });

    describe('verifyPassword', () => {
        it('should return true for a valid password', async () => {
            const mockCompareResult = true;
            bcrypt.compare.mockResolvedValue(mockCompareResult);

            const result = await jwtUtils.verifyPassword(mockPassword, mockHashedPassword);

            expect(bcrypt.compare).toHaveBeenCalledWith(mockPassword, mockHashedPassword);
            expect(result).toBe(true);
        });

        it('should return false for an invalid password', async () => {
            const mockCompareResult = false;
            bcrypt.compare.mockResolvedValue(mockCompareResult);

            const result = await jwtUtils.verifyPassword(mockPassword, mockHashedPassword);

            expect(bcrypt.compare).toHaveBeenCalledWith(mockPassword, mockHashedPassword);
            expect(result).toBe(false);
        });
    });
});
