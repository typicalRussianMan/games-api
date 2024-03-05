import { app } from '../controller/app.controller';
import { AuthorizationError } from '../models/app-error';
import { Profile } from '../models/profile';
import { User } from '../models/user';
import { parseToken } from '../utils/token/parse-token';

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
});

app.get('/api/user/check-achievements', async(req, res, next) => {
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

    const newAchievements = await User.checkAchievements(user);

    res.json(newAchievements);
  } catch (err) {
    next(err);
  }
});

app.get('/api/user/profile', async(req, res, next) => {
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

    const profile = await Profile.getProfileById(user.id);

    res.json(profile);
  } catch (err) {
    next(err);
  }
});
