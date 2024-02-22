import { app } from '../controller/app.controller';
import { AppError } from '../models/app-error';
import { GameCategory } from '../models/game-category';
import { ServerResponseCode } from '../models/server-response-code';

app.get('/api/games/categories', async(_req, res, next) => {
  try {
    const categories = await GameCategory.getAll();

    res.json(categories);
  } catch (err) {
    next(err);
  }
});

app.get('/api/games', (req, res, next) => {
  try {
    const { lat, lng } = req.query;

    if (typeof lat !== 'string' || typeof lng !== 'string') {
      throw new AppError(
        ServerResponseCode.BadRequest,
        'Your request should contain point coordinates',
      );
    }

    res.json({ message: 'Booba' });
  } catch (err) {
    next(err);
  }
});
