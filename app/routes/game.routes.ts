import { RequestHandler } from 'express';

import { app } from '../controller/app.controller';
import { AppError } from '../models/app-error';
import { Game } from '../models/game';
import { GameCategory } from '../models/game-category';
import { ServerResponseCode } from '../models/server-response-code';
import { getUserFromAuthHeader } from '../utils/get-user-from-auth-header';
import { User } from '../models/user';

app.get('/api/games/categories', async(_req, res, next) => {
  try {
    const categories = await GameCategory.getAll();

    res.json(categories);
  } catch (err) {
    next(err);
  }
});

app.get('/api/games', async(req, res, next) => {
  try {
    const { left, top, right, bottom, limit, offset } = req.query;

    if (
      typeof left !== 'string' || typeof top !== 'string' ||
      typeof right !== 'string' || typeof bottom !== 'string'
    ) {
      throw new AppError(
        ServerResponseCode.BadRequest,
        'Your request should contains bounds (left, top, right and bottom)',
      );
    }

    const gameList = await Game.selectGames({
      bounds: {
        bottom: Number(bottom),
        left: Number(left),
        right: Number(right),
        top: Number(top),
      },
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
    });

    res.json(gameList);
  } catch (err) {
    next(err);
  }
});

const handleIncrementPlayedGames: RequestHandler = async(req, _res, next) => {
  const user = await getUserFromAuthHeader(req);

  if (user !== null) {
    await User.incrementPlayedGamesCount(user);
  }

  next();
};

app.get('/api/games/:id', handleIncrementPlayedGames, async(req, res, next) => {
  try {
    const { id } = req.params;
    const { lat, lng } = req.query;

    const game = await Game.getGameById(
      Number(id),
      {
        lat: lat === undefined ? undefined : Number(lat),
        lng: lng === undefined ? undefined : Number(lng),
      },
    );

    res.json(game);

  } catch (err) {
    next(err);
  }
});
