type TokenInfoConStructor = Pick<TokenInfo, 'createdAt' | 'email'>;

/** Token. */
export class TokenInfo {

  /** Email. */
  public readonly email: string;

  /** Date when token was generated. */
  public readonly createdAt: Date;

  public constructor(data: TokenInfoConStructor) {
    this.createdAt = data.createdAt;
    this.email = data.email;
  }

  /** Converts token to string. */
  public toString(): string {
    return `${this.createdAt.toUTCString()}|${this.email}`;
  }
}
