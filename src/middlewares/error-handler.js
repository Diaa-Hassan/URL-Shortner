async function errorHandler(err, req, res, next) {
	const { statusCode, message } = err;
	res.status(statusCode || 500).json({
		status: 'error',
		statusCode,
		message
	});
}

export { errorHandler };
