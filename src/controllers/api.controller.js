import createHttpError from 'http-errors';
import { URL } from '../models/index.js';
const handleRedirect = async (req, res, next) => {
	try {
		const { slug } = req.params;
		const shortLink = await URL.findOne({
			slug: slug
		});

		if (!shortLink) {
			return next(new createHttpError.NotFound('Short link not found'));
		}

		res.redirect(shortLink.orignUrl);
	} catch (error) {
		next(new createHttpError.InternalServerError(error.message));
	}
};

export { handleRedirect };
