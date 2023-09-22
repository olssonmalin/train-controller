import { Router } from 'express';
const router = Router();

import tickets from "../models/tickets.mjs";

router.get('/', (req, res) => tickets.getTickets(req, res));

router.post('/', (req, res) => tickets.createTicket(req, res));

export default router;
