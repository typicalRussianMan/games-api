import { APP_CONFIG } from './config/app.config';
import { app } from './controller/app.controller';
import './routes';
import './controller/database.controller';

const port = APP_CONFIG.port;

const server = app.listen(port, () => console.log(`App listening on port ${port}`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
