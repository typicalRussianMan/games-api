import { app } from '../controller/app.controller';

app.get('users', (_req, res) => {
  res.json({ qwe: 123, asd: 456 });
});