// a function that checks if a passed URL is valid or not.
const validateUrl = url => {
	const urlRegex = new RegExp(/^((http|https):\/\/)?([a-z0-9]+\.)?[a-z0-9]+\.[a-z]+(\/[^\s]*)?$/i);
	return urlRegex.test(url);
};

export { validateUrl };
