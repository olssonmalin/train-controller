import { jest } from '@jest/globals';

const database = {
    connect: jest.fn(),
};

const mockCollection = {
    findOne: jest.fn(),
    insertOne: jest.fn(),
};

database.connect.mockResolvedValue({
    collection: jest.fn().mockReturnValue(mockCollection),
});

module.exports = database;
