import { app } from '../controller/app.controller';
import { AppError } from '../models/app-error';
import { Game } from '../models/game';
import { GameCategory } from '../models/game-category';
import { MapPoint } from '../models/map-point';
import { ServerResponseCode } from '../models/server-response-code';

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
    const { lat, lng, limit, offset } = req.query;

    if (typeof lat !== 'string' || typeof lng !== 'string') {
      throw new AppError(
        ServerResponseCode.BadRequest,
        'Your request should contain point coordinates',
      );
    }

    const gameList = await Game.selectGames({
      point: MapPoint.fromLatLng(Number(lat), Number(lng)),
      distance: 100,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
    });

    res.json(gameList);
  } catch (err) {
    next(err);
  }
});
