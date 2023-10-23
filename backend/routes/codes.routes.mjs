import { Router } from 'express';
const router = Router();

import codes from "../models/codes.mjs";

router.get('/', (req, res) => codes.getCodes(req, res));

export default router;
