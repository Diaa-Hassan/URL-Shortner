import createHttpError from 'http-errors';

const notFoundHandler = (_req, _res, next) => {
	next(new createHttpError(404, 'Route not found'));
};

export { notFoundHandler };
