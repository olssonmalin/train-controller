import { Router } from 'express';

import delayedController from '../controllers/delayed.controller.mjs';
import authMiddleware from '../middleware/auth.middleware.mjs';

const router = Router();

router.get('/', (req, res) => delayedController.getDelayedTrains(req, res));

export default router;
