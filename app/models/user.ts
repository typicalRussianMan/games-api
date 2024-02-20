import { userMapper } from '../mappers/user.mapper';
import { UserDb } from '../database-models/user.db';
import { database } from '../controller/database.controller';

import { UserBase } from './user-base';

/** User. */
export class User extends UserBase {

  /** ID. */
  public readonly id: number;

  public constructor(data: User) {
    super(data);
    this.id = data.id;
  }

  /**
   * Gets user by email.
   * @param email Email.
   */
  public static getByEmail(email: string): Promise<User | null> {
    return new Promise((res, rej) => {
      database.all<UserDb>(
        `SELECT * from users WHERE email='${email}' LIMIT 1;`,
        (err: Error | null, rows: UserDb[]) => {
          if (err) {
            rej(err);
          }
          const user = rows[0];

          if (user === undefined) {
            res(null);
          } else {
            res(userMapper.toUser(user));
          }
        },
      );
    });
  }

  /**
   * Gets user by ID.
   * @param id ID.
   */
  public static getById(id: number): Promise<User | null> {
    return new Promise((res, rej) => {
      database.all<UserDb>(
        `SELECT * from users where id='${id}' LIMIT 1;`,
        (err: Error | null, rows: UserDb[]) => {
          if (err) {
            rej(err);
          }

          const user = rows[0];

          if (user === undefined) {
            res(null);
          } else {
            res(userMapper.toUser(user));
          }
        },
      );
    });
  }
}
