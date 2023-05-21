import createHttpError from 'http-errors';
import { nanoid } from 'nanoid';

import { URL } from '../models/index.js';
import { validateUrl } from '../utils/index.js';

const getAllShortLinks = async (req, res, next) => {
	try {
		const shortLinks = await URL.find();
		if (shortLinks.length === 0) {
			res.status(200).json('No short links found! Try creating some.');
		}
		res.status(200).json({ shortLinks });
	} catch (error) {
		next(new createHttpError.InternalServerError(error.message));
	}
};

const getShortLink = async (req, res, next) => {
	try {
		const { slug } = req.params;
		const shortLink = await URL.findOne({ slug: slug });
		if (!shortLink) {
			return next(new createHttpError.NotFound('Short link not found'));
		}
		res.status(200).json({ shortLink });
	} catch (error) {
		next(new createHttpError.InternalServerError(error.message));
	}
};

const createShortLink = async (req, res, next) => {
	try {
		let { url, slug } = req.body;
		let destinationUrl = '';

		const HOST = `${req.protocol}://${req.headers.host}`;
		const userAgent = req.headers['user-agent'];

		const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

		if (!url) {
			return next(new createHttpError.BadRequest('Provide url'));
		}

		if (!validateUrl(url)) {
			return next(new createHttpError.BadRequest('Provide valid url'));
		}

		if (slug) {
			// if slug is provided
			const shortLink = await URL.findOne({ slug: slug });
			if (shortLink) {
				// if slug is already in use
				return next(new createHttpError.Conflict('Slug in use'));
			}
		} else {
			// if slug is not provided
			slug = nanoid(7); // generate random slug
		}

		// create short link
		const newUrl = new URL({
			slug,
			orignUrl: url,
			shortUrl: {
				ios: `${HOST}/api/ios/${slug}`,
				android: `${HOST}/api/android/${slug}`,
				web: `${HOST}/api/web/${slug}`
			}
		});
		await newUrl.save();

		if (isMobile) {
			if (userAgent.includes('iPhone') || userAgent.includes('iPad') || userAgent.includes('iPod')) {
				// if iOS
				destinationUrl = newUrl.shortUrl.ios;
			} else {
				// if Android
				destinationUrl = newUrl.shortUrl.android;
			}
		} else {
			// if WEB
			destinationUrl = newUrl.shortUrl.web;
		}

		res.status(201).json({ slug, destinationUrl });
	} catch (error) {
		next(new createHttpError.InternalServerError(error.message));
	}
};

const updateShortLink = async (req, res, next) => {
	try {
		const { slug } = req.params;
		const { url } = req.body;

		if (!url) {
			return next(new createHttpError.BadRequest('Provide url'));
		}

		if (!validateUrl(url)) {
			return next(new createHttpError.BadRequest('Provide valid url'));
		}

		const shortLink = await URL.findOne({ slug: slug });
		if (!shortLink) {
			return next(new createHttpError.NotFound('Short link not found'));
		}

		shortLink.orignUrl = url;
		await shortLink.save();

		res.status(200).json({ shortLink });
	} catch (error) {
		next(new createHttpError.InternalServerError(error.message));
	}
};

export { getAllShortLinks, createShortLink, updateShortLink, getShortLink };
