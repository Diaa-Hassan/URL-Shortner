import { Router } from 'express';

const router = Router();

router.use('/health', (_req, res) => {
	res.status(200).json({ status: 'OK' });
});

export { router };
