import { app } from '../controller/app.controller';
import { GameCategory } from '../models/game-category';

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
    const { limit, offset, lat, lng } = req.query;

    res.json({ message: 'Booba' });
  } catch (err) {
    next(err);
  }
});
