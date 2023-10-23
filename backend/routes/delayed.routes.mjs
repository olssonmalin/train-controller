import { Router } from 'express';
const router = Router();

import delayed from "../models/delayed.mjs";

router.get('/', (req, res) => delayed.getDelayedTrains(req, res));

export default router;
