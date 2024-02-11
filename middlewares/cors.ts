import { Handler } from 'express';

interface CorsConfig {

  readonly origin: string;

  readonly methods: string;

  readonly maxAge: number;
}

/** Cors middleware. */
export function cors(config?: Partial<CorsConfig>): Handler {
  return (_req, res, next) => {
    res
      .setHeader('Access-Control-Allow-Origin', config?.origin ?? '*')
      .setHeader('Access-Control-Allow-Methods', config?.methods ?? 'OPTIONS, POST, GET, PUT, PATCH, DELETE')
      .setHeader('Access-Control-Max-Age', config?.maxAge ?? 2592000)
      .setHeader('Access-Control-Allow-Headers',
        'Access-Control-Allow-Headers, ' +
        'Origin, ' +
        'Accept, ' +
        'Content-Type, ' +
        'Authorization',
      );

    next();
  }
}
