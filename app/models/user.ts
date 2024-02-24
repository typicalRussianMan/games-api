import { userMapper } from '../mappers/user.mapper';
import { UserDb } from '../database-models/user.db';
import { allAsync } from '../controller/database/utils/all-async';

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
  public static async getByEmail(email: string): Promise<User | null> {
    const result = await allAsync<UserDb>(`SELECT * from users WHERE email='${email}' LIMIT 1;`);

    const user = result[0];

    return user === undefined ?
      null :
      userMapper.toUser(user);
  }

  /**
   * Gets user by ID.
   * @param id ID.
   */
  public static async getById(id: number): Promise<User | null> {
    const result = await allAsync<UserDb>(`SELECT * from users where id='${id}' LIMIT 1;`);

    const user = result[0];

    return user === undefined ?
      null :
      userMapper.toUser(user);
  }
}
