import ticketsService from '../services/tickets.service.mjs';

const ticketsController = {
    getTickets: async (req, res) => {
        const data = await ticketsService.getTickets();
        return res.json({
            data,
        });
    },
    createTicket: async (req, res) => {
        const newTicket = {
            code: req.body.code,
            trainnumber: req.body.trainnumber,
            traindate: req.body.traindate,
        };

        const result = await ticketsService.createTicket(newTicket);
        return res.json({
            data: {
                id: result.insertedId,
                code: req.body.code,
                trainnumber: req.body.trainnumber,
                traindate: req.body.traindate,
            },
        });
    },
    deleteTicket: async (req, res) => {
        const ticketId = req.body.ticketId;
        await ticketsService.deleteTicket(ticketId);
        return res.sendStatus(201);
    },
    updateTicket: async (req, res) => {

    }
};

export default ticketsController;
