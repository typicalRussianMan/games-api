import { TokenInfo } from '../../models/token-info';
import { User } from '../../models/user';

/**
 * Generates token.
 * @param user User.
 * @returns
 */
export function generateToken(user: Pick<User, 'email'>): TokenInfo {
  return new TokenInfo({
    createdAt: new Date(Date.now()),
    email: user.email,
  });
}
