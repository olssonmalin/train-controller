import tickets from './tickets'; // Update the path to your module
import db from '../db/database.mjs';

jest.mock('../db/database.mjs', () => ({
  collection: jest.fn(),
}));

describe('tickets module', () => {
  describe('getTickets', () => {
    it('should return all tickets', async () => {
      const mockFind = jest.fn().mockReturnValueOnce({
        toArray: jest.fn().mockResolvedValueOnce(['ticket1', 'ticket2']),
      });
      db.collection.mockResolvedValueOnce({
        find: mockFind,
      });

      const req = {};
      const res = {
        json: jest.fn(),
      };

      const result = await tickets.getTickets(req, res);

      expect(result).toBe(res.json({ data: ['ticket1', 'ticket2'] }))
    });
  });

  describe('createTicket', () => {
    it('should create a new ticket and return its details', async () => {
      const mockInsertOne = jest.fn().mockResolvedValueOnce({
        insertedId: 'ticketId',
      });
      db.collection.mockResolvedValueOnce({
        insertOne: mockInsertOne,
      });

      const req = {
        body: {
          code: 'ABC123',
          trainnumber: '12345',
          traindate: '2023-09-22',
        },
      };
      const res = {
        json: jest.fn(),
      };

      const result = await tickets.createTicket(req, res);

      expect(result).toBe(res.json({data:{
        id: 'ticketId',
        code: 'ABC123',
        trainnumber: '12345',
        traindate: '2023-09-22'
    }}));
    });
  });
});
