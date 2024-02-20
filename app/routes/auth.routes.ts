import { app } from '../controller/app.controller';
import { AppError } from '../models/app-error';
import { Login } from '../models/login';
import { ServerResponseCode } from '../models/server-response-code';
import { Token } from '../models/token';
import { UserRole } from '../models/user-role';
import { UserToCreate } from '../models/user-to-create';
import { generateToken } from '../utils/token/generate-token';

app.post('/api/auth/login', async(req, res, next) => {
  try {
    Login.validate(req.body);

    const login = new Login(req.body);
    const isValidLogin = await Login.checkValidation(login);

    if (isValidLogin) {
      res.json(new Token({
        token: generateToken(login).toString(),
      }));
      return;
    }

    throw new AppError(ServerResponseCode.BadRequest, 'Invalid email or password');
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/register', async(req, res, next) => {
  try {
    UserToCreate.validate(req.body);

    await UserToCreate.createUser({
      ...req.body,
      role: UserRole.Common,
    });

    res.json(new Token({
      token: generateToken(req.body).toString(),
    }));
  } catch (err) {
    next(err);
  }
});
