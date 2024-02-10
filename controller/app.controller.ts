import bodyParser from 'body-parser';
import express from 'express';

/** Express application. */
export const app = express();

app.use(bodyParser.json());
