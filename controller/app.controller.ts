import bodyParser from 'body-parser';
import express from 'express';

import { cors } from '../middlewares/cors';
import { errorHandler } from '../middlewares/error-handler';
import { initRouting } from '../middlewares/routing';

/** Express application. */
export const app = express();

app.use(bodyParser.json());
app.use(cors());

initRouting();

app.use(errorHandler());
