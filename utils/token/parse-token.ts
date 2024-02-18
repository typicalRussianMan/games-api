import { TokenInfo } from '../../models/token-info';

/**
 * Converts string converted with `TokenInfo.toString` to TokenInfo.
 * @param tokenString Token in string format.
 */
export function parseToken(tokenString: string): TokenInfo {
  const [utc, email] = tokenString.split('|');

  return new TokenInfo({
    createdAt: new Date(utc),
    email,
  });
}
