import { Router } from 'express';

import codesController from '../controllers/codes.controller.mjs';

const router = Router();

router.get('/', (req, res) => codesController.getCodes(req, res));

export default router;
