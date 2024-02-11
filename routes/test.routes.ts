import { app } from "../controller/app.controller";
import { AppError } from "../models/app-error";
import { ServerResponseCode } from "../models/server-response-code";

app.get('/api/test', (req, res) => {
  throw new AppError(ServerResponseCode.BadRequest, 'Test app crash');
});