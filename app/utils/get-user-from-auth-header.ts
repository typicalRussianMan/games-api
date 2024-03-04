import { Request } from 'express';

import { User } from '../models/user';

import { parseToken } from './token/parse-token';

/**
 * Gets user from auth header.
 * @param req Request.
 */
export async function getUserFromAuthHeader(
  req: Request,
): Promise<User | null> {
  const authToken = req.headers.authorization;

  if (authToken === undefined) {
    return null;
  }

  const token = parseToken(authToken);

  const user = await User.getByEmail(token.email);

  return user;
}
