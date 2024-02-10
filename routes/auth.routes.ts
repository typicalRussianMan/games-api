import { app } from '../controller/app.controller';
import { database } from '../controller/database.controller';
import { Login } from '../models/login';
import { Token } from '../models/token';
import { User } from '../models/user';
import { UserToCreate } from '../models/user-to-create';
import { generateToken } from '../utils/token/generate-token';

app.post('/api/auth/login', async(req, res) => {
  Login.validate(req.body)
  const login = new Login(req.body);
  const isValidLogin = await Login.checkValidation(login);

  if (isValidLogin) {
    res.json(new Token({
      token: generateToken(login).toString(),
    }));
  }

  res.json({});
});

app.post('/api/auth/register', (req, res) => {
  UserToCreate.validate(req.body);

  UserToCreate.createUser(req.body);

  res.json(new Token({
    token: generateToken(req.body).toString(),
  }));
});
