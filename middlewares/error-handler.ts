import { ErrorRequestHandler } from 'express';
import { AppError } from '../models/app-error';

export function errorHandler(): ErrorRequestHandler {
  return (err, _req, res, _next) => {
    console.log('Handle error');
    if (err instanceof AppError) {
      res
        .status(err.code)
        .json(err.toJson());

      return;
    }

    res
      .status(500)
      .json(err);
  }
}