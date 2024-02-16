import { UserBase } from "./user-base";
import { UserMapper } from "../mappers/user.mapper";
import { UserDb } from "../database-models/user.db";
import { database } from "../controller/database.controller";

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
   * @param database Database instance.
   * @param email Email.
   */
  public static getByEmail(email: string): Promise<User | null> {
    return new Promise((res, rej) => {
      database.all<UserDb>(
        `SELECT * from users WHERE email='${email}' LIMIT 1;`,
        (err, rows) => {
          if (err) {
            rej(err);
          }
          const user = rows[0];

          if (user === undefined) {
            res(null);
          } else {
            res(UserMapper.toUser(user));
          }
        }
      );
    });
  }
}
