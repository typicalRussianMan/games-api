import { app } from "../controller/app.controller";
import { AuthorizationError } from "../models/app-error";
import { User } from "../models/user";
import { parseToken } from "../utils/token/parse-token";

app.get('/api/user', async(req, res, next) => {
  try {
    const authToken = req.headers.authorization;

    if (authToken === undefined) {
      throw new AuthorizationError('No provided token in `Authorization` header');
    }

    const token = parseToken(authToken);

    const user = await User.getByEmail(token.email);

    if (user === null) {
      throw new AuthorizationError('Cannot find user with such email');
    }

    res.json(user);

  } catch (err) {
    next(err);
  }
})