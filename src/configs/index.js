import dotenv from 'dotenv';
dotenv.config();

const NODE_ENV = process.env.NODE_ENV;

const PORT = process.env.PORT;

const MONGO_URI = process.env.MONGO_URI;

export { NODE_ENV, PORT, MONGO_URI };
