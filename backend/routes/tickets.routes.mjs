import { Router } from 'express';

import ticketsController from '../controllers/tickets.controller.mjs';
import authMiddleware from '../middleware/auth.middleware.mjs';

const router = Router();

router.get(
    '/',
    /*
    (req, res, next) => authMiddleware(req, res, next),
*/
    (req, res) => ticketsController.getTickets(req, res),
);

router.post(
    '/',
    /*(req, res, next) => authMiddleware(req, res, next),*/
    (req, res) => ticketsController.createTicket(req, res),
);

export default router;
