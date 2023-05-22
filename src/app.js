import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import { limiter, notFoundHandler, errorHandler } from './middlewares/index.js';
import { connectDB } from './utils/index.js';
import { router } from './routes/index.js';
import { NODE_ENV } from './configs/index.js';

const app = express();

if (NODE_ENV !== 'test') {
  connectDB();
}


app.use(limiter);
app.use(morgan('logger ➡  :method :url :status \t :user-agent'));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);
app.use(notFoundHandler);

// app.use(errorHandler);

export { app };
