import dotenv from 'dotenv';
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';

const PORT = process.env.PORT;

const MONGO_URI = process.env.MONGO_URI;
const MONGO_TEST_URI = process.env.MONGO_TEST_URI;


export { NODE_ENV, PORT, MONGO_URI, MONGO_TEST_URI };
