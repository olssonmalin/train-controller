import db from '../db/database.mjs';

const tickets = {
    getTickets: async function getTickets(req, res) {
        const col = await db.collection('tickets');

        const cursor = col.find();

        const allTickets = await cursor.toArray();

        return res.json({
            data: allTickets,
        });
    },

    createTicket: async function createTicket(req, res) {
        const newTicket = {
            code: req.body.code,
            trainnumber: req.body.trainnumber,
            traindate: req.body.traindate,
        };
        const col = await db.collection('tickets');
        const result = await col.insertOne(newTicket);
        console.log(
            `New listing created with the following id: ${result.insertedId}`,
        );

        return res.json({
            data: {
                id: result.insertedId,
                code: req.body.code,
                trainnumber: req.body.trainnumber,
                traindate: req.body.traindate,
            },
        });
    },
};

export default tickets;
