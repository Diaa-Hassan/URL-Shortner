import { app } from './app.js';

import { PORT } from './configs/index.js';

app.listen(PORT, () => {
	console.log(`✅ Server is listening on port ${PORT}`);
});
