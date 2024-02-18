import { app } from '../controller/app.controller';
import { AppError } from '../models/app-error';
import { ServerResponseCode } from '../models/server-response-code';

app.get('/api/test', (_req, _res, next) => {
  try {
    throw new AppError(ServerResponseCode.BadRequest, 'Test app crash');
  } catch (err) {
    next(err);
  }
});
