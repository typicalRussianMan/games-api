import { database } from '../controller/database.controller';
import { UserDb } from '../database-models/user.db';
import { isEmail } from '../utils/is-email';

import { ValidationError } from './app-error';

/**
 * Throws login validation error.
 * @param field Field.
 * @param message Message.
 */
function throwError(field: keyof Login, message: string): never {
  throw new ValidationError(
    'Invalid login data',
    field,
    message,
  );
}

/** Login data. */
export class Login {

  /** Email. */
  public readonly email: string;

  /** Password. */
  public readonly password: string;

  public constructor(data: Login) {
    this.email = data.email;
    this.password = data.password;
  }

  /**
   * Validator function.
   * @param data Data to be validated.
   */
  public static validate(data: any): asserts data is Login {
    if (!isEmail(data.email)) {
      throwError('email', 'Invalid email');
    }

    if (typeof data.password !== 'string') {
      throwError('password', 'Invalid password');
    }
  }

  /**
   * Checks if login data is correct.
   * @param data Login data.
   */
  public static checkValidation(data: Login): Promise<boolean> {
    return new Promise((res, rej) => {
      database.all<UserDb>(
        `SELECT * from users
        WHERE email='${data.email}' and password='${data.password}'
        LIMIT 1`,
        (err: Error, rows: UserDb[]) => {
          if (err) {
            rej(err);
            return;
          }

          res(rows[0] !== undefined);
        },
      );
    });
  }
}
