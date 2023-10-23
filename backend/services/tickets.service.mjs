import { ObjectId } from 'mongodb';

import mongoDBSingleton from '../db/database.mjs';

const ticketsService = {
    createTicket: async function createTicket(newTicket) {
        try {
            const db = await mongoDBSingleton.connect();
            const col = await db.collection('tickets');
            const result = await col.insertOne(newTicket);

            if (result.insertedId) {
                console.log(
                    `New ticket created with the following ID: ${result.insertedId}`,
                );
                return result;
            } else {
                console.log(`Failed to create a new ticket.`);
                return null;
            }
        } catch (error) {
            console.error('Error creating ticket:', error);
            throw error;
        }
    },
    deleteTicket: async function deleteTicket(ticketId) {
        try {
            const db = await mongoDBSingleton.connect();
            const col = await db.collection('tickets');
            const result = await col.deleteOne({ _id: new ObjectId(ticketId) });

            return result.deletedCount === 1;
        } catch (error) {
            console.error('Error deleting ticket:', error);
            throw error;
        }
    },
    getTickets: async function getTickets() {
        try {
            const db = await mongoDBSingleton.connect();
            const col = await db.collection('tickets');
            const cursor = col.find();
            return await cursor.toArray();
        } catch (error) {
            console.error('Error getting tickets:', error);
            throw error;
        }
    },
    updateTicket: async function updateTicket(updatedTicket) {
        try {
            const updatedTicketWithoutId = { ...updatedTicket };
            delete updatedTicketWithoutId._id;
            const db = await mongoDBSingleton.connect();
            const col = await db.collection('tickets');
            const result = await col.updateOne(
                { _id: new ObjectId(updatedTicket._id) },
                { $set: updatedTicketWithoutId },
            );
            if (result.matchedCount === 1) {
                console.log(
                    `Ticket with ID ${updatedTicket._id} has been updated.`,
                );
                return result;
            } else {
                console.log(`No matching ticket found for update.`);
                return null;
            }
        } catch (error) {
            console.error('Error updating ticket:', error);
            throw error;
        }
    },
};

export default ticketsService;
