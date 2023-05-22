import mongoose from 'mongoose';
import { MONGO_TEST_URI } from '../configs/index.js';

const connectTestDB = async () => {
	try {
		await mongoose.connect(MONGO_TEST_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			w: 'majority'
		});
	} catch (error) {
		console.log(error);
	}
};


const disconnectTestDB = async () => {
	try {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();

	} catch (error) {
		console.log(error);
	}
};

export { connectTestDB, disconnectTestDB };
