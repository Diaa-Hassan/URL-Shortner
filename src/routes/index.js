import { Router } from 'express';
import { urlRouter } from './url.routes.js';
import { apiRouter } from './api.router.js';

const router = Router();

router.use('/health', (_req, res) => {
	res.status(200).json({ status: 'OK' });
});

router.use('/', urlRouter);
router.use('/', apiRouter);

export { router };
