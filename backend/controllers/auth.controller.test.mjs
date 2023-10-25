// authController.test.js
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

// Import your controller
import usersService from '../services/users.service.mjs';
import jwtUtils from '../utils/jwt.mjs';
import authController from './auth.controller.mjs';

// Mock the dependencies (usersService and jwtUtils) to isolate the controller for testing.
jest.mock('../services/users.service.mjs', () => ({
    findUserByEmail: jest.fn(),
    createUser: jest.fn(),
}));
jest.mock('../utils/jwt.mjs', () => ({
    verifyPassword: jest.fn(),
    generateToken: jest.fn(),
}));

describe('authController', () => {
    beforeEach(() => {
        usersService.findUserByEmail.mockClear();
        usersService.createUser.mockClear();
        jwtUtils.verifyPassword.mockClear();
        jwtUtils.generateToken.mockClear();
    });

    describe('login', () => {
        it('should return a token when valid credentials are provided', async () => {
            const req = {
                body: {
                    email: 'validemail@example.com',
                    password: 'validpassword',
                },
            };
            const res = {
                json: jest.fn(),
                status: jest.fn(() => res),
            };

            usersService.findUserByEmail.mockResolvedValue({
                email: req.body.email,
                password: 'hashedPassword',
            });
            jwtUtils.verifyPassword.mockResolvedValue(true);
            jwtUtils.generateToken.mockReturnValue('mockedToken');

            await authController.login(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ token: 'mockedToken' });
        });

        it('should return a 401 status and an error message when invalid credentials are provided', async () => {
            const req = {
                body: {
                    email: 'invalidemail@example.com',
                    password: 'invalidpassword',
                },
            };
            const res = {
                json: jest.fn(),
                status: jest.fn(() => res),
            };

            usersService.findUserByEmail.mockResolvedValue(null);

            await authController.login(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Invalid login credentials.',
            });
        });
    });

    describe('register', () => {
        it('should return a 201 status and a success message when registering a new user', async () => {
            const req = {
                body: {
                    email: 'newuser@example.com',
                    password: 'newpassword',
                },
            };
            const res = {
                json: jest.fn(),
                status: jest.fn(() => res),
            };

            usersService.findUserByEmail.mockResolvedValue(null);
            usersService.createUser.mockResolvedValue({
                email: req.body.email,
                password: 'hashedPassword',
            });

            await authController.register(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'User successfully registered.',
            });
        });

        it('should return a 401 status and an error message when registering with missing email or password', async () => {
            const req = {
                body: {
                    email: 'missingpassword@example.com',
                },
            };
            const res = {
                json: jest.fn(),
                status: jest.fn(() => res),
            };

            await authController.register(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Email or password missing in request.',
            });
        });

        it('should return a 401 status and an error message when attempting to register with an existing email', async () => {
            const req = {
                body: {
                    email: 'existinguser@example.com',
                    password: 'existingpassword',
                },
            };
            const res = {
                json: jest.fn(),
                status: jest.fn(() => res),
            };

            usersService.findUserByEmail.mockResolvedValue({
                email: req.body.email,
                password: 'hashedPassword',
            });

            await authController.register(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Email already registered.',
            });
        });
    });
});
