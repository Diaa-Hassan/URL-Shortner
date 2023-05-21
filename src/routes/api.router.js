import { Router } from 'express';

import { handleRedirect } from '../controllers/index.js';

const router = Router();

router.use('/api/web/:slug', handleRedirect);
router.use('/api/ios/:slug', handleRedirect);
router.use('/api/android/:slug', handleRedirect);

export { router as apiRouter };
