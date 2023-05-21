import mongoose from 'mongoose';
import { MONGO_URI } from '../configs/index.js';

const connectDB = async () => {
	try {
		await mongoose.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			w: 'majority'
		});
		console.log('✅ Database connected successfully');
	} catch (error) {
		console.log(error);
	}
};

export { connectDB };
