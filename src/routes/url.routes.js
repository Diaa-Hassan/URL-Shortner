import { Router } from 'express';

import { getAllShortLinks, createShortLink, updateShortLink, getShortLink } from '../controllers/index.js';

const router = Router();

router.get('/shortlinks', getAllShortLinks);
router.get('/shortlinks/:slug', getShortLink);
router.post('/shortlinks', createShortLink);
router.put('/shortlinks/:slug', updateShortLink);

export { router as urlRouter };
